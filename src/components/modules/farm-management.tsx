'use client'

import { farms } from '@/lib/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Plus, Sprout, Droplets } from 'lucide-react'
import { useAppStore } from '@/lib/store'

function getHealthBadge(score: number) {
  if (score > 70) {
    return <Badge className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200">সুস্থ — {score}</Badge>
  }
  if (score >= 40) {
    return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200">মাঝারি — {score}</Badge>
  }
  return <Badge className="bg-red-100 text-red-800 border-red-300 hover:bg-red-200">দুর্বল — {score}</Badge>
}

export function FarmManagement() {
  const setView = useAppStore((s) => s.setView)

  const totalFarms = farms.length
  const totalArea = farms.reduce((sum, f) => sum + f.area, 0)
  const avgHealth = Math.round(farms.reduce((sum, f) => sum + f.healthScore, 0) / totalFarms)

  const toBengaliNum = (n: number) => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
    return n
      .toString()
      .split('')
      .map((d) => (bengaliDigits[parseInt(d)] ?? d))
      .join('')
  }

  const toBengaliFloat = (n: number) => {
    const intPart = Math.floor(n)
    const decPart = Math.round((n - intPart) * 10)
    return `${toBengaliNum(intPart)}.${toBengaliNum(decPart)}`
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">আমার খামার</h1>
          <p className="text-sm text-muted-foreground mt-1">
            আপনার সকল খামারের তথ্য ও অবস্থা দেখুন
          </p>
        </div>
        <Button
          onClick={() => setView('land-register')}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          নতুন খামার যোগ করুন
        </Button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-green-700" />
            </div>
            <div>
              <p className="text-xs text-green-700 font-medium">মোট খামার</p>
              <p className="text-xl font-bold text-green-900">{toBengaliNum(totalFarms)}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <Sprout className="h-5 w-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-xs text-emerald-700 font-medium">মোট এলাকা</p>
              <p className="text-xl font-bold text-emerald-900">
                {toBengaliFloat(totalArea)} একর
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-teal-50 border-teal-200">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
              <Droplets className="h-5 w-5 text-teal-700" />
            </div>
            <div>
              <p className="text-xs text-teal-700 font-medium">গড় হেলথ</p>
              <p className="text-xl font-bold text-teal-900">
                {toBengaliNum(avgHealth)}/১০০
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Farm Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farms.map((farm) => (
          <Card
            key={farm.id}
            className="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 overflow-hidden"
          >
            {/* Green top accent */}
            <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-500" />

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg font-bold text-foreground leading-snug">
                  {farm.name}
                </CardTitle>
                {getHealthBadge(farm.healthScore)}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">{farm.location}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 pt-0">
              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">এলাকা</p>
                  <p className="font-medium text-foreground">
                    {toBengaliFloat(farm.area)} {farm.areaUnit}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">মাটির ধরন</p>
                  <p className="font-medium text-foreground">{farm.soilType}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">বর্তমান ফসল</p>
                  <p className="font-medium text-foreground truncate">{farm.currentCrop}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">পূর্বের ফসল</p>
                  <p className="font-medium text-foreground truncate">{farm.previousCrop}</p>
                </div>
              </div>

              {/* Water Source */}
              <div className="flex items-center gap-1.5 text-sm">
                <Droplets className="h-3.5 w-3.5 text-blue-500" />
                <span className="text-muted-foreground text-xs">পানি উৎস:</span>
                <span className="font-medium text-foreground text-xs">{farm.waterSource}</span>
              </div>

              {/* GPS Coordinates */}
              <div className="bg-gray-50 rounded-lg p-2.5 text-xs text-muted-foreground">
                <span className="font-medium">GPS:</span>{' '}
                {farm.gpsLat.toFixed(4)}°N, {farm.gpsLng.toFixed(4)}°E
              </div>

              {/* Detail Button */}
              <Button
                variant="outline"
                className="w-full mt-2 border-green-300 text-green-700 hover:bg-green-50 hover:text-green-800"
                onClick={() => setView('soil')}
              >
                বিস্তারিত দেখুন
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}