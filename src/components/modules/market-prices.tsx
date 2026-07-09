'use client'

import { marketPrices } from '@/lib/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Minus, BarChart3, MapPin } from 'lucide-react'

function getTrendBadge(trend: string) {
  switch (trend) {
    case 'up':
      return (
        <Badge className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200 text-xs">
          বাড়ছে
        </Badge>
      )
    case 'down':
      return (
        <Badge className="bg-red-100 text-red-800 border-red-300 hover:bg-red-200 text-xs">
          কমছে
        </Badge>
      )
    case 'stable':
      return (
        <Badge className="bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 text-xs">
          স্থিতিশীল
        </Badge>
      )
    default:
      return <Badge variant="secondary">{trend}</Badge>
  }
}

function getDemandBadge(demand: string) {
  switch (demand) {
    case 'চাহিদা বেশি':
      return (
        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200 text-xs">
          {demand}
        </Badge>
      )
    case 'কম':
      return (
        <Badge className="bg-red-100 text-red-800 border-red-300 hover:bg-red-200 text-xs">
          {demand}
        </Badge>
      )
    case 'স্বাভাবিক':
      return (
        <Badge variant="secondary" className="text-xs">
          {demand}
        </Badge>
      )
    default:
      return <Badge variant="secondary" className="text-xs">{demand}</Badge>
  }
}

function ChangeIndicator({ change }: { change: string }) {
  const isUp = change.startsWith('+')
  const isDown = change.startsWith('-')
  const isZero = change === '০'

  if (isZero) {
    return (
      <span className="inline-flex items-center gap-1 text-gray-500 font-medium">
        <Minus className="h-3.5 w-3.5" />
        <span>০</span>
      </span>
    )
  }

  if (isUp) {
    return (
      <span className="inline-flex items-center gap-1 text-green-600 font-medium">
        <TrendingUp className="h-3.5 w-3.5" />
        <span>{change}</span>
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 text-red-600 font-medium">
      <TrendingDown className="h-3.5 w-3.5" />
      <span>{change}</span>
    </span>
  )
}

export function MarketPrices() {
  // Find crops with highest profit and highest demand
  const upCrops = marketPrices.filter((p) => p.trend === 'up')
  const maxProfitCrop = upCrops.length > 0
    ? upCrops.reduce((max, curr) =>
        parseFloat(curr.change) > parseFloat(max.change) ? curr : max
      )
    : null

  const highDemandCrops = marketPrices.filter((p) => p.demand === 'চাহিদা বেশি')
  const maxDemandCrop = highDemandCrops.length > 0 ? highDemandCrops[0] : null

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-emerald-700" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">বাজারদর তথ্য</h1>
            <p className="text-sm text-muted-foreground mt-1">
              আজকের ফসলের বাজারদর, প্রবণতা ও চাহিদা
            </p>
          </div>
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {maxProfitCrop && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-5 w-5 text-green-700" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-green-700 font-medium">সর্বোচ্চ লাভ</p>
                <p className="text-lg font-bold text-green-900 truncate">
                  {maxProfitCrop.crop}
                </p>
                <p className="text-xs text-green-600">
                  দাম বেড়েছে {maxProfitCrop.change} {maxProfitCrop.unit}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {maxDemandCrop && (
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <BarChart3 className="h-5 w-5 text-emerald-700" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-emerald-700 font-medium">সর্বোচ্চ চাহিদা</p>
                <p className="text-lg font-bold text-emerald-900 truncate">
                  {maxDemandCrop.crop}
                </p>
                <p className="text-xs text-emerald-600">
                  বর্তমান মূল্য: ৳{maxDemandCrop.todayPrice} {maxDemandCrop.unit}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Data Table */}
      <Card className="rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
            <MapPin className="h-5 w-5 text-red-500" />
            বিস্তারিত বাজারদর
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wide">
                      ফসল
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wide">
                      আজকের মূল্য
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wide">
                      গতকাল
                    </th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wide">
                      পরিবর্তন
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wide">
                      জেলা
                    </th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wide">
                      চাহিদা
                    </th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wide">
                      প্রবণতা
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {marketPrices.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-100 transition-colors duration-150 hover:bg-gray-50 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                    >
                      <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                        {item.crop}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-foreground whitespace-nowrap">
                        ৳{item.todayPrice}
                      </td>
                      <td className="px-4 py-3 text-right text-muted-foreground whitespace-nowrap">
                        ৳{item.yesterdayPrice}
                      </td>
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        <ChangeIndicator change={item.change} />
                      </td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          {item.district}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        {getDemandBadge(item.demand)}
                      </td>
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        {getTrendBadge(item.trend)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}