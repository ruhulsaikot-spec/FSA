'use client'

import { soilData } from '@/lib/mock-data'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Download,
  Printer,
  Share2,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from 'lucide-react'

type StatusLevel = 'good' | 'medium' | 'poor'

function getParamStatus(value: number, low: number, high: number): StatusLevel {
  if (value >= low && value <= high) return 'good'
  const mid = (low + high) / 2
  const range = (high - low) / 2
  const dist = Math.abs(value - mid)
  if (dist <= range * 0.5) return 'medium'
  return 'poor'
}

function StatusIcon({ level }: { level: StatusLevel }) {
  switch (level) {
    case 'good':
      return <CheckCircle className="h-4.5 w-4.5 text-green-600 flex-shrink-0" />
    case 'medium':
      return <AlertTriangle className="h-4.5 w-4.5 text-yellow-600 flex-shrink-0" />
    case 'poor':
      return <XCircle className="h-4.5 w-4.5 text-red-600 flex-shrink-0" />
  }
}

const toBengaliNum = (n: number) => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
  return n
    .toString()
    .split('')
    .map((d) => (bengaliDigits[parseInt(d)] ?? d))
    .join('')
}

// All soil parameters to display
const allParams = [
  { name: 'পিএইচ (pH)', value: soilData.ph, unit: '', low: 6.0, high: 7.5 },
  { name: 'ইসি (EC)', value: soilData.ec, unit: 'dS/m', low: 0.8, high: 2.0 },
  { name: 'আর্দ্রতা', value: soilData.moisture, unit: '%', low: 25, high: 45 },
  { name: 'তাপমাত্রা', value: soilData.temperature, unit: '°C', low: 20, high: 35 },
  { name: 'জৈব পদার্থ', value: soilData.organicMatter, unit: '%', low: 2.5, high: 4.0 },
  { name: 'নাইট্রোজেন (N)', value: soilData.nitrogen, unit: 'কেজি/হে', low: 40, high: 60 },
  { name: 'ফসফরাস (P)', value: soilData.phosphorus, unit: 'কেজি/হে', low: 20, high: 30 },
  { name: 'পটাশিয়াম (K)', value: soilData.potassium, unit: 'কেজি/হে', low: 30, high: 50 },
  { name: 'সালফার (S)', value: soilData.sulfur, unit: 'কেজি/হে', low: 10, high: 20 },
  { name: 'ক্যালসিয়াম (Ca)', value: soilData.calcium, unit: 'কেজি/হে', low: 800, high: 1500 },
  { name: 'ম্যাগনেসিয়াম (Mg)', value: soilData.magnesium, unit: 'কেজি/হে', low: 150, high: 300 },
  { name: 'জিংক (Zn)', value: soilData.zinc, unit: 'পিপিএম', low: 1.5, high: 3.0 },
  { name: 'আয়রন (Fe)', value: soilData.iron, unit: 'পিপিএম', low: 10, high: 50 },
  { name: 'কপার (Cu)', value: soilData.copper, unit: 'পিপিএম', low: 0.5, high: 3.0 },
  { name: 'বোরন (B)', value: soilData.boron, unit: 'পিপিএম', low: 0.5, high: 1.0 },
  { name: 'ম্যাঙ্গানিজ (Mn)', value: soilData.manganese, unit: 'পিপিএম', low: 2.0, high: 10.0 },
]

export function SoilHealthCard() {
  const setView = useAppStore((s) => s.setView)

  const goodCount = allParams.filter((p) => getParamStatus(p.value, p.low, p.high) === 'good').length
  const mediumCount = allParams.filter((p) => getParamStatus(p.value, p.low, p.high) === 'medium').length
  const poorCount = allParams.filter((p) => getParamStatus(p.value, p.low, p.high) === 'poor').length

  const scoreColor =
    soilData.healthScore >= 70
      ? 'text-green-700 border-green-400'
      : soilData.healthScore >= 40
        ? 'text-yellow-700 border-yellow-400'
        : 'text-red-700 border-red-400'

  const scoreBg =
    soilData.healthScore >= 70
      ? 'bg-green-50'
      : soilData.healthScore >= 40
        ? 'bg-yellow-50'
        : 'bg-red-50'

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="rounded-2xl shadow-lg border-2 border-green-200 overflow-hidden">
        {/* Green Government Header */}
        <div className="bg-gradient-to-r from-green-700 to-green-600 px-6 py-5 text-center">
          <p className="text-green-100 text-xs font-medium tracking-wider uppercase">
            গণপ্রজাতন্ত্রী বাংলাদেশ
          </p>
          <h1 className="text-white text-xl sm:text-2xl font-bold mt-1">
            🌾 মাটি স্বাস্থ্য কার্ড
          </h1>
          <p className="text-green-200 text-xs mt-1">
            কৃষি সম্প্রসারণ অধিদপ্তর
          </p>
        </div>

        <CardContent className="p-6 space-y-6">
          {/* Health Score Circle */}
          <div className="flex justify-center">
            <div
              className={`h-32 w-32 rounded-full border-4 ${scoreColor} ${scoreBg} flex flex-col items-center justify-center`}
            >
              <span className={`text-3xl font-black ${scoreColor.replace('border-', 'text-')}`}>
                {toBengaliNum(soilData.healthScore)}
              </span>
              <span className={`text-sm font-medium ${scoreColor.replace('border-', 'text-')}`}>
                /১০০
              </span>
            </div>
          </div>

          {/* Summary Badges */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Badge className="bg-green-100 text-green-800 border-green-300 text-xs">
              <CheckCircle className="h-3 w-3 mr-1" />
              ভালো: {toBengaliNum(goodCount)}
            </Badge>
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" />
              মাঝারি: {toBengaliNum(mediumCount)}
            </Badge>
            <Badge className="bg-red-100 text-red-800 border-red-300 text-xs">
              <XCircle className="h-3 w-3 mr-1" />
              দুর্বল: {toBengaliNum(poorCount)}
            </Badge>
          </div>

          {/* Soil Texture & Color Info */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
            <div>
              <p className="text-xs text-muted-foreground">মাটির ধরন</p>
              <p className="text-sm font-semibold text-foreground mt-0.5">
                {soilData.texture}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">মাটির রং</p>
              <p className="text-sm font-semibold text-foreground mt-0.5">
                {soilData.color}
              </p>
            </div>
          </div>

          {/* Parameter Grid */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              পরামাণ বিশ্লেষণ
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {allParams.map((param) => {
                const status = getParamStatus(param.value, param.low, param.high)
                return (
                  <div
                    key={param.name}
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm border ${
                      status === 'good'
                        ? 'bg-green-50/50 border-green-100'
                        : status === 'medium'
                          ? 'bg-yellow-50/50 border-yellow-100'
                          : 'bg-red-50/50 border-red-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <StatusIcon level={status} />
                      <span className="text-foreground truncate text-xs font-medium">
                        {param.name}
                      </span>
                    </div>
                    <span className="text-foreground font-semibold text-xs ml-2 whitespace-nowrap">
                      {param.value} {param.unit}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Overall Assessment */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-green-900 mb-2">
              সামগ্রিক মূল্যায়ন
            </h3>
            <p className="text-xs text-green-800 leading-relaxed">
              আপনার মাটির স্বাস্থ্য স্কোর {toBengaliNum(soilData.healthScore)}/১০০,
              যা সামগ্রিকভাবে{' '}
              {soilData.healthScore >= 70 ? 'ভালো' : soilData.healthScore >= 40 ? 'মাঝারি' : 'দুর্বল'}{' '}
              অবস্থায় রয়েছে।{' '}
              {soilData.healthScore >= 70
                ? 'পিএইচ মান ও জৈব পদার্থের মাত্রা সন্তোষজনক। বোরন ও জৈব পদার্থের মাত্রা আরও বৃদ্ধি করলে ফসলের উৎপাদন আরও বাড়বে।'
                : soilData.healthScore >= 40
                  ? 'কিছু পুষ্টি উপাদানের ঘাটতি রয়েছে। সুপারিশ অনুযায়ী সার প্রয়োগ করুন এবং জৈব সার ব্যবহার বাড়ান।'
                  : 'মাটির অবস্থা উদ্বেগজনক। দ্রুত ব্যবস্থা নিন এবং নিকটতম কৃষি কর্মকর্তার সাথে পরামর্শ করুন।'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1 gap-2 border-green-300 text-green-700 hover:bg-green-50"
            >
              <Download className="h-4 w-4" />
              PDF ডাউনলোড
            </Button>
            <Button
              variant="outline"
              className="flex-1 gap-2 border-green-300 text-green-700 hover:bg-green-50"
            >
              <Printer className="h-4 w-4" />
              প্রিন্ট
            </Button>
            <Button
              variant="outline"
              className="flex-1 gap-2 border-green-300 text-green-700 hover:bg-green-50"
            >
              <Share2 className="h-4 w-4" />
              শেয়ার করুন
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center pt-2 border-t">
            <p className="text-[10px] text-muted-foreground">
              তারিখ: ২৫ বৈশাখ ১৪৩২ । পরীক্ষা কেন্দ্র: গাজীপুর মাটি পরীক্ষাগার । রিপোর্ট আইডি: SHC-২০২৫-০৪৫৮৭
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              এই কার্ডটি তথ্যবহুল উদ্দেশ্যে প্রস্তুত করা হয়েছে
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}