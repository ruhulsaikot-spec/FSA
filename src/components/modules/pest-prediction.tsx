'use client'

import { pestPredictions } from '@/lib/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShieldAlert, Bug, Clock, Shield, AlertTriangle } from 'lucide-react'

function getRiskBadge(level: string) {
  switch (level) {
    case 'উচ্চ':
      return <Badge variant="destructive">উচ্চ ঝুঁকি</Badge>
    case 'মাঝারি':
      return (
        <Badge className="bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200">
          মাঝারি ঝুঁকি
        </Badge>
      )
    case 'কম':
      return <Badge variant="secondary">নিম্ন ঝুঁকি</Badge>
    default:
      return <Badge variant="secondary">{level}</Badge>
  }
}

function getBorderColor(level: string) {
  switch (level) {
    case 'উচ্চ':
      return 'border-l-4 border-l-red-500'
    case 'মাঝারি':
      return 'border-l-4 border-l-orange-500'
    case 'কম':
      return 'border-l-4 border-l-green-500'
    default:
      return 'border-l-4 border-l-gray-300'
  }
}

function getRiskIcon(level: string) {
  switch (level) {
    case 'উচ্চ':
      return <AlertTriangle className="h-5 w-5 text-red-500" />
    case 'মাঝারি':
      return <ShieldAlert className="h-5 w-5 text-orange-500" />
    case 'কম':
      return <Shield className="h-5 w-5 text-green-500" />
    default:
      return <Bug className="h-5 w-5 text-gray-400" />
  }
}

export function PestPrediction() {
  const highRisk = pestPredictions.filter((p) => p.riskLevel === 'উচ্চ').length
  const mediumRisk = pestPredictions.filter((p) => p.riskLevel === 'মাঝারি').length
  const lowRisk = pestPredictions.filter((p) => p.riskLevel === 'কম').length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
            <Bug className="h-5 w-5 text-red-700" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">পোকামাকড় আক্রমণ পূর্বাভাস</h1>
            <p className="text-sm text-muted-foreground mt-1">
              AI ভিত্তিক পোকামাকড় আক্রমণের পূর্বাভাস ও প্রতিকার
            </p>
          </div>
        </div>
      </div>

      {/* Risk Summary Badges */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground">ঝুঁকি সারসংক্ষেপ:</span>
        {highRisk > 0 && (
          <Badge variant="destructive" className="text-sm px-3 py-1">
            <AlertTriangle className="h-3.5 w-3.5 mr-1" />
            উচ্চ — {highRisk}টি
          </Badge>
        )}
        {mediumRisk > 0 && (
          <Badge className="bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200 text-sm px-3 py-1">
            <ShieldAlert className="h-3.5 w-3.5 mr-1" />
            মাঝারি — {mediumRisk}টি
          </Badge>
        )}
        {lowRisk > 0 && (
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <Shield className="h-3.5 w-3.5 mr-1" />
            নিম্ন — {lowRisk}টি
          </Badge>
        )}
      </div>

      {/* Pest Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pestPredictions.map((pest, index) => (
          <Card
            key={index}
            className={`rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 overflow-hidden ${getBorderColor(pest.riskLevel)}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  {getRiskIcon(pest.riskLevel)}
                  <CardTitle className="text-lg font-bold text-foreground leading-snug">
                    {pest.name}
                  </CardTitle>
                </div>
                {getRiskBadge(pest.riskLevel)}
              </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-0">
              {/* Estimated Attack Time */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-gray-50 rounded-lg px-3 py-2">
                <Clock className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <span>
                  আনুমানিক আক্রমণের সময়:{' '}
                  <span className="font-medium text-foreground">{pest.attackTime}</span>
                </span>
              </div>

              {/* Prevention Measures */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  প্রতিরোধ ব্যবস্থা
                </p>
                <ul className="space-y-1.5">
                  {pest.prevention.split('،').map((measure, i) => (
                    <li
                      key={i}
                      className="text-sm text-foreground flex items-start gap-2"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                      <span>{measure.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Items */}
              <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2.5">
                <div className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-green-700 mb-1">
                      প্রস্তাবিত ব্যবস্থা
                    </p>
                    <p className="text-sm text-green-800">{pest.action}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}