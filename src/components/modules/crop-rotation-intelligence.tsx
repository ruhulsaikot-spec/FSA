'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import {
  Sprout,
  BrainCircuit,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  CalendarDays,
  Leaf,
  Beaker,
  Zap,
  History,
  RefreshCw,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CropHistoryItem {
  year: string
  season: string
  crop: string
  variety: string
  yieldVal: string
  soilHealthBefore: number
  soilHealthAfter: number
}

interface NutrientDeficiency {
  nutrient: string
  status: 'স্বাভাবিক' | 'ঘাটতি' | 'অতিরিক্ত'
  severity: 'নিম্ন' | 'মাঝারি' | 'উচ্চ'
  detail: string
}

interface RotationRecommendation {
  nextCrop: string
  nextVariety: string
  reason: string
  expectedYield: string
  expectedProfit: string
  soilRecovery: string
  score: number
}

interface RotationPattern {
  id: number
  name: string
  years: string[]
  description: string
  totalProfit: string
  avgYield: string
  soilHealthTrend: 'বৃদ্ধি' | 'স্থিতিশীল' | 'হ্রাস'
  sustainability: number
  pattern: { year: string; season: string; crop: string }[]
}

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const cropHistory: CropHistoryItem[] = [
  { year: '২০২৫', season: 'বোরো', crop: 'ধান', variety: 'ব্রি-৮৯', yieldVal: '৪.৬ টন/হে', soilHealthBefore: 77, soilHealthAfter: 82 },
  { year: '২০২৪', season: 'খরিফ-১', crop: 'পেঁয়াজ', variety: 'বারি পেঁয়াজ-৪', yieldVal: '১০.৫ টন/হে', soilHealthBefore: 72, soilHealthAfter: 77 },
  { year: '২০২৪', season: 'আমন', crop: 'ধান', variety: 'ব্রি-৪৭', yieldVal: '৪.২ টন/হে', soilHealthBefore: 68, soilHealthAfter: 72 },
  { year: '২০২৩', season: 'রবি', crop: 'সরিষা', variety: 'টরি-৭', yieldVal: '১.৫ টন/হে', soilHealthBefore: 65, soilHealthAfter: 68 },
  { year: '২০২৩', season: 'বোরো', crop: 'ধান', variety: 'ব্রি-২৮', yieldVal: '৪.০ টন/হে', soilHealthBefore: 60, soilHealthAfter: 65 },
  { year: '২০২২', season: 'খরিফ-১', crop: 'ধান', variety: 'ব্রি-২৮', yieldVal: '৩.৫ টন/হে', soilHealthBefore: 62, soilHealthAfter: 60 },
  { year: '২০২২', season: 'আমন', crop: 'ধান', variety: 'ব্রি-২৮', yieldVal: '৩.৮ টন/হে', soilHealthBefore: 58, soilHealthAfter: 62 },
  { year: '২০২১', season: 'রবি', crop: 'সরিষা', variety: 'টরি-৭', yieldVal: '১.২ টন/হে', soilHealthBefore: 55, soilHealthAfter: 58 },
  { year: '২০২১', season: 'বোরো', crop: 'ধান', variety: 'ব্রি-২৮', yieldVal: '৩.২ টন/হে', soilHealthBefore: 52, soilHealthAfter: 55 },
  { year: '২০২০', season: 'আমন', crop: 'ধান', variety: 'ব্রি-২৮', yieldVal: '৩.০ টন/হে', soilHealthBefore: 50, soilHealthAfter: 52 },
]

const nutrientDeficiencies: NutrientDeficiency[] = [
  { nutrient: 'নাইট্রোজেন (N)', status: 'ঘাটতি', severity: 'মাঝারি', detail: 'ধান বারবার চাষের ফলে নাইট্রোজেনের ঘাটতি সৃষ্টি হয়েছে। দুই বছর ধরে N এর মাত্রা হ্রাস পাচ্ছে।' },
  { nutrient: 'ফসফরাস (P)', status: 'স্বাভাবিক', severity: 'নিম্ন', detail: 'পর্যাপ্ত মাত্রায় আছে। বর্তমানে কোনো সমস্যা নেই।' },
  { nutrient: 'পটাশিয়াম (K)', status: 'স্বাভাবিক', severity: 'নিম্ন', detail: 'স্বাভাবিক সীমায় আছে।' },
  { nutrient: 'জিংক (Zn)', status: 'ঘাটতি', severity: 'উচ্চ', detail: 'ধান বারবার চাষের ফলে জিংকের উল্লেখযোগ্য ঘাটতি দেখা দিয়েছে। জরুরি সংশোধন প্রয়োজন।' },
  { nutrient: 'বোরন (B)', status: 'ঘাটতি', severity: 'মাঝারি', detail: 'হ্রাস পাচ্ছে। ফসল রোটেশনে বোরন সমৃদ্ধ ফসল অন্তর্ভুক্ত করুন।' },
  { nutrient: 'জৈব পদার্থ', status: 'ঘাটতি', severity: 'উচ্চ', detail: 'গত ৫ বছরে জৈব পদার্থ ১.৫% থেকে ৩.২%-এ উন্নতি হয়েছে, তবে এখনও আদর্শ মাত্রার নিচে।' },
  { nutrient: 'ক্যালসিয়াম (Ca)', status: 'স্বাভাবিক', severity: 'নিম্ন', detail: 'স্বাভাবিক সীমায় আছে।' },
  { nutrient: 'ম্যাগনেসিয়াম (Mg)', status: 'স্বাভাবিক', severity: 'নিম্ন', detail: 'স্বাভাবিক সীমায় আছে।' },
]

const rotationRecommendations: RotationRecommendation[] = [
  {
    nextCrop: 'মুগ ডাল', nextVariety: 'বারি মুগ-৬',
    reason: 'মুগ ডাল বায়ুমণ্ডল থেকে নাইট্রোজেন সংবন্ধন করে মাটিতে যোগ করে। ধানের পর মুগ ডাল চাষ করলে মাটির নাইট্রোজেন ঘাটতি পূরণ হবে।',
    expectedYield: '১.২-১.৫ টন/হেক্টর', expectedProfit: '৳৪৮,০০০/হেক্টর',
    soilRecovery: 'নাইট্রোজেন ২০-৩০ কেজি/হেক্টর যোগ হবে', score: 95,
  },
  {
    nextCrop: 'সরিষা', nextVariety: 'টরি-৭',
    reason: 'সরিষা গভীর মূল ব্যবস্থার কারণে মাটির গঠন উন্নত করে। জৈব পদার্থ বৃদ্ধিতে সহায়ক।',
    expectedYield: '১.৫-২.০ টন/হেক্টর', expectedProfit: '৳৬০,০০০/হেক্টর',
    soilRecovery: 'মাটির গঠন উন্নতি এবং জৈব পদার্থ বৃদ্ধি', score: 88,
  },
  {
    nextCrop: 'পেঁয়াজ', nextVariety: 'বারি পেঁয়াজ-৪',
    reason: 'পেঁয়াজ চাষে ব্যবহৃত সার মাটিতে পুষ্টি উপাদান যোগ করে। উচ্চ লাভজনক ফসল।',
    expectedYield: '১২-১৫ টন/হেক্টর', expectedProfit: '৳২,৫০,০০০/হেক্টর',
    soilRecovery: 'সার প্রয়োগের মাধ্যমে পুষ্টি উপাদান সংযোজন', score: 82,
  },
]

const rotationPatterns: RotationPattern[] = [
  {
    id: 1, name: 'টেকসই ফসল রোটেশন (৫ বছর)',
    years: ['২০২৫-২৬', '২০২৬-২৭', '২০২৭-২৮', '২০২৮-২৯', '২০২৯-৩০'],
    description: 'ধান → পেঁয়াজ → মুগ ডাল → সরিষা → ধান — মাটির স্বাস্থ্য পুনরুদ্ধার ও সর্বোচ্চ লাভের জন্য সর্বোত্তম প্যাটার্ন।',
    totalProfit: '৳৫,৮০,০০০/হেক্টর (৫ বছরে)', avgYield: 'মিশ্র ফসলে গড় ১.৫% বৃদ্ধি',
    soilHealthTrend: 'বৃদ্ধি', sustainability: 92,
    pattern: [
      { year: '১ম বছর', season: 'বোরো', crop: 'ধান (ব্রি-৮৯)' },
      { year: '১ম বছর', season: 'খরিফ-১', crop: 'পেঁয়াজ' },
      { year: '২য় বছর', season: 'আমন', crop: 'মুগ ডাল' },
      { year: '২য় বছর', season: 'রবি', crop: 'সরিষা (টরি-৭)' },
      { year: '৩য় বছর', season: 'বোরো', crop: 'ধান (ব্রি-৮৯)' },
      { year: '৩য় বছর', season: 'খরিফ-১', crop: 'মরিচ' },
      { year: '৪র্থ বছর', season: 'আমন', crop: 'ধান (ব্রি-৪৭)' },
      { year: '৪র্থ বছর', season: 'রবি', crop: 'ছোলা' },
      { year: '৫ম বছর', season: 'বোরো', crop: 'ধান (ব্রি-৮৯)' },
      { year: '৫ম বছর', season: 'খরিফ-১', crop: 'পেঁয়াজ' },
    ],
  },
  {
    id: 2, name: 'দ্রুত মাটি পুনরুদ্ধার (৩ বছর)',
    years: ['২০২৫-২৬', '২০২৬-২৭', '২০২৭-২৮'],
    description: 'মুগ ডাল → সরিষা → ধান — জৈব পদার্থ ও নাইট্রোজেন দ্রুত পুনরুদ্ধারের জন্য।',
    totalProfit: '৳৩,৫০,০০০/হেক্টর (৩ বছরে)', avgYield: 'ধানে ৮% ফলন বৃদ্ধি প্রত্যাশিত',
    soilHealthTrend: 'বৃদ্ধি', sustainability: 88,
    pattern: [
      { year: '১ম বছর', season: 'খরিফ-২', crop: 'মুগ ডাল' },
      { year: '১ম বছর', season: 'রবি', crop: 'সরিষা (টরি-৭)' },
      { year: '২য় বছর', season: 'বোরো', crop: 'ধান (ব্রি-৮৯)' },
      { year: '২য় বছর', season: 'খরিফ-১', crop: 'পেঁয়াজ' },
      { year: '৩য় বছর', season: 'আমন', crop: 'ধান (ব্রি-৪৭)' },
      { year: '৩য় বছর', season: 'রবি', crop: 'মুগ ডাল' },
    ],
  },
  {
    id: 3, name: 'লাভজনক রোটেশন (৩ বছর)',
    years: ['২০২৫-২৬', '২০২৬-২৭', '২০২৭-২৮'],
    description: 'ধান → পেঁয়াজ → ধান — সর্বোচ্চ লাভের জন্য, তবে মাটির স্বাস্থ্যে মনোযোগ দিতে হবে।',
    totalProfit: '৳৬,২০,০০০/হেক্টর (৩ বছরে)', avgYield: 'ধানে ৩% ফলন বৃদ্ধি প্রত্যাশিত',
    soilHealthTrend: 'স্থিতিশীল', sustainability: 72,
    pattern: [
      { year: '১ম বছর', season: 'বোরো', crop: 'ধান (ব্রি-৮৯)' },
      { year: '১ম বছর', season: 'খরিফ-১', crop: 'পেঁয়াজ' },
      { year: '২য় বছর', season: 'আমন', crop: 'ধান (ব্রি-৪৭)' },
      { year: '২য় বছর', season: 'রবি', crop: 'সরিষা' },
      { year: '৩য় বছর', season: 'বোরো', crop: 'ধান (হাইব্রিড)' },
      { year: '৩য় বছর', season: 'খরিফ-১', crop: 'পেঁয়াজ' },
    ],
  },
]

const defStatusColors: Record<string, string> = {
  'স্বাভাবিক': 'bg-green-100 text-green-700 border-green-200',
  'ঘাটতি': 'bg-red-100 text-red-700 border-red-200',
  'অতিরিক্ত': 'bg-orange-100 text-orange-700 border-orange-200',
}

const seasonColors: Record<string, string> = {
  'বোরো': 'bg-emerald-100 text-emerald-700',
  'খরিফ-১': 'bg-amber-100 text-amber-700',
  'খরিফ-২': 'bg-orange-100 text-orange-700',
  'আমন': 'bg-sky-100 text-sky-700',
  'রবি': 'bg-violet-100 text-violet-700',
  'আউশ': 'bg-lime-100 text-lime-700',
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function CropRotationIntelligence() {
  const [activeTab, setActiveTab] = useState('analysis')
  const [selectedPattern, setSelectedPattern] = useState<string>(rotationPatterns[0].id.toString())

  const currentPattern = useMemo(() => rotationPatterns.find(p => p.id === Number(selectedPattern)) || rotationPatterns[0], [selectedPattern])

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <RefreshCw className="w-6 h-6 text-emerald-600" />
          ফসল রোটেশন বুদ্ধিমত্তা
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          AI ভিত্তিক ফসল রোটেশন বিশ্লেষণ ও সুপারিশ — মাটির উর্বরতা পুনরুদ্ধার ও টেকসই কৃষি
        </p>
      </div>

      {/* Quick Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="rounded-xl shadow-sm border border-gray-100">
          <CardContent className="p-3 text-center">
            <History className="w-5 h-5 mx-auto text-blue-500 mb-1" />
            <p className="text-lg font-bold">১০ বছর</p>
            <p className="text-[10px] text-muted-foreground">বিশ্লেষণের সময়কাল</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm border border-gray-100">
          <CardContent className="p-3 text-center">
            <AlertTriangle className="w-5 h-5 mx-auto text-orange-500 mb-1" />
            <p className="text-lg font-bold text-orange-600">৩টি</p>
            <p className="text-[10px] text-muted-foreground">পুষ্টি উপাদানে ঘাটতি</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm border border-gray-100">
          <CardContent className="p-3 text-center">
            <CheckCircle2 className="w-5 h-5 mx-auto text-green-500 mb-1" />
            <p className="text-lg font-bold text-green-600">হ্যাঁ</p>
            <p className="text-[10px] text-muted-foreground">রোটেশন প্রয়োজন</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm border border-gray-100">
          <CardContent className="p-3 text-center">
            <TrendingUp className="w-5 h-5 mx-auto text-emerald-500 mb-1" />
            <p className="text-lg font-bold text-emerald-600">+৩২</p>
            <p className="text-[10px] text-muted-foreground">মাটি স্বাস্থ্য উন্নতি</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="analysis" className="text-xs sm:text-sm">AI বিশ্লেষণ</TabsTrigger>
          <TabsTrigger value="deficiency" className="text-xs sm:text-sm">পুষ্টি ঘাটতি</TabsTrigger>
          <TabsTrigger value="recommendation" className="text-xs sm:text-sm">সুপারিশ</TabsTrigger>
          <TabsTrigger value="pattern" className="text-xs sm:text-sm">রোটেশন প্যাটার্ন</TabsTrigger>
        </TabsList>

        {/* AI Analysis - Crop History */}
        <TabsContent value="analysis">
          <div className="space-y-4">
            {/* Crop History Timeline */}
            <Card className="rounded-xl shadow-sm border border-gray-100">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <History className="w-4 h-4 text-emerald-600" />
                  গত ১০ বছরের ফসল ইতিহাস ও মাটির স্বাস্থ্য
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2 text-xs">বছর</th>
                        <th className="text-left py-2 px-2 text-xs">মৌসুম</th>
                        <th className="text-left py-2 px-2 text-xs">ফসল (জাত)</th>
                        <th className="text-center py-2 px-2 text-xs">ফলন</th>
                        <th className="text-center py-2 px-2 text-xs">আগে</th>
                        <th className="text-center py-2 px-2 text-xs">পরে</th>
                        <th className="text-center py-2 px-2 text-xs">পরিবর্তন</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cropHistory.map((item, i) => {
                        const diff = item.soilHealthAfter - item.soilHealthBefore
                        return (
                          <tr key={i} className="border-b last:border-b-0 hover:bg-gray-50">
                            <td className="py-2 px-2 font-medium">{item.year}</td>
                            <td className="py-2 px-2">
                              <Badge className={cn('text-[10px]', seasonColors[item.season] || 'bg-gray-100 text-gray-700')}>
                                {item.season}
                              </Badge>
                            </td>
                            <td className="py-2 px-2 text-xs">{item.crop} ({item.variety})</td>
                            <td className="text-center py-2 px-2 text-xs font-mono">{item.yieldVal}</td>
                            <td className="text-center py-2 px-2 text-xs font-mono">{item.soilHealthBefore}</td>
                            <td className="text-center py-2 px-2 text-xs font-mono">{item.soilHealthAfter}</td>
                            <td className="text-center py-2 px-2">
                              <span className={cn('text-xs font-mono', diff > 0 ? 'text-green-600' : 'text-red-600')}>
                                {diff > 0 ? '+' : ''}{diff}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* AI Summary */}
            <Card className="rounded-xl shadow-sm border border-gray-100">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-emerald-600" />
                  AI বিশ্লেষণ সারসংক্ষেপ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="text-xs font-semibold text-red-800 mb-1 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> সমস্যা চিহ্নিত
                    </h4>
                    <ul className="text-xs text-red-700 space-y-0.5">
                      <li>• ২০২০-২০২২ সালে ধান বারবার চাষে মাটির স্বাস্থ্য হ্রাস</li>
                      <li>• নাইট্রোজেন ও জিংকের উল্লেখযোগ্য ঘাটতি</li>
                      <li>• ২০২২ সালে মাটির স্বাস্থ্য সর্বনিম্ন ৫০-তে নেমে আসে</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="text-xs font-semibold text-green-800 mb-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> ইতিবাচক পরিবর্তন
                    </h4>
                    <ul className="text-xs text-green-700 space-y-0.5">
                      <li>• ফসল রোটেশন শুরুর পর থেকে স্বাস্থ্য উন্নতি</li>
                      <li>• ২০২৩ থেকে সরিষা ও পেঁয়াজ চাষে সুফল</li>
                      <li>• ৫ বছরে ৩২ পয়েন্ট স্বাস্থ্য স্কোর বৃদ্ধি</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="text-xs font-semibold text-blue-800 mb-1 flex items-center gap-1">
                      <BrainCircuit className="w-3.5 h-3.5" /> AI সিদ্ধান্ত
                    </h4>
                    <ul className="text-xs text-blue-700 space-y-0.5">
                      <li>• ফসল রোটেশন অব্যাহত রাখা বাধ্যতামূলক</li>
                      <li>• আগামী মৌসুমে মুগ ডাল সুপারিশ</li>
                      <li>• জিংক ও বোরন সার প্রয়োগ জরুরি</li>
                    </ul>
                  </div>
                </div>

                {/* Soil Health Trend Visual */}
                <div className="mt-4">
                  <h4 className="text-sm font-semibold mb-3">মাটির স্বাস্থ্য স্কোরের পরিবর্তন</h4>
                  <div className="flex items-end gap-1 h-32">
                    {cropHistory.slice().reverse().map((item, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-[9px] font-mono">{item.soilHealthAfter}</span>
                        <div
                          className={cn('w-full rounded-t transition-all', item.soilHealthAfter >= 70 ? 'bg-green-400' : item.soilHealthAfter >= 55 ? 'bg-yellow-400' : 'bg-red-400')}
                          style={{ height: `${(item.soilHealthAfter / 100) * 100}%` }}
                        />
                        <span className="text-[8px] text-muted-foreground">{item.year.slice(-2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Nutrient Deficiency */}
        <TabsContent value="deficiency">
          <Card className="rounded-xl shadow-sm border border-gray-100">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Beaker className="w-4 h-4 text-emerald-600" />
                পুষ্টি উপাদানের ঘাটতি বিশ্লেষণ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {nutrientDeficiencies.map((nd, i) => (
                  <div key={i} className="p-4 bg-muted/30 rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold">{nd.nutrient}</h4>
                      <div className="flex items-center gap-2">
                        <Badge className={cn('text-xs border', defStatusColors[nd.status])}>{nd.status}</Badge>
                        <Badge variant="outline" className="text-[10px]">
                          তীব্রতা: {nd.severity}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{nd.detail}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recommendations */}
        <TabsContent value="recommendation">
          <div className="space-y-4">
            <Card className="rounded-xl shadow-sm border border-gray-100">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-emerald-600" />
                  পরবর্তী মৌসুমে AI সুপারিশ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  পূর্ববর্তী ফসলের ইতিহাস ও মাটির বর্তমান অবস্থা বিশ্লেষণ করে AI নিম্নলিখিত ফসল সুপারিশ করছে:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {rotationRecommendations.map((rec, i) => (
                    <Card key={i} className={cn(
                      'rounded-xl shadow-sm border cursor-pointer transition-all hover:shadow-md',
                      i === 0 ? 'border-emerald-400 ring-2 ring-emerald-100' : 'border-gray-100'
                    )}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={cn('text-xs', i === 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700')}>
                            {i === 0 ? 'সর্বোচ্চ সুপারিশ' : `বিকল্প ${i}`}
                          </Badge>
                          <span className={cn('text-lg font-bold', rec.score >= 90 ? 'text-green-600' : 'text-emerald-600')}>
                            {rec.score}/১০০
                          </span>
                        </div>
                        <h3 className="text-base font-bold mb-1">{rec.nextCrop}</h3>
                        <p className="text-xs text-muted-foreground mb-3">জাত: {rec.nextVariety}</p>
                        <p className="text-xs text-foreground mb-3">{rec.reason}</p>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">প্রত্যাশিত ফলন:</span>
                            <span className="font-semibold">{rec.expectedYield}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">প্রত্যাশিত লাভ:</span>
                            <span className="font-semibold text-green-600">{rec.expectedProfit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">মাটি পুনরুদ্ধার:</span>
                            <span className="font-semibold text-emerald-600">{rec.soilRecovery}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recovery & Yield Improvement */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <h4 className="text-sm font-semibold text-emerald-800 mb-2 flex items-center gap-1.5">
                      <Leaf className="w-4 h-4" /> Soil Recovery সম্ভাবনা
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>নাইট্রোজেন পুনরুদ্ধার</span>
                        <div className="flex items-center gap-1">
                          <div className="w-24 h-2 bg-emerald-200 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '75%' }} />
                          </div>
                          <span className="font-mono">৭৫%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>জৈব পদার্থ বৃদ্ধি</span>
                        <div className="flex items-center gap-1">
                          <div className="w-24 h-2 bg-emerald-200 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '60%' }} />
                          </div>
                          <span className="font-mono">৬০%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>মাটি গঠন উন্নতি</span>
                        <div className="flex items-center gap-1">
                          <div className="w-24 h-2 bg-emerald-200 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '50%' }} />
                          </div>
                          <span className="font-mono">৫০%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <h4 className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4" /> Expected Yield Improvement
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>ধান ফলন বৃদ্ধি (১ বছরে)</span>
                        <span className="font-semibold text-green-600">+৮% → ৫.০ টন/হে</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>ধান ফলন বৃদ্ধি (৩ বছরে)</span>
                        <span className="font-semibold text-green-600">+১৫% → ৫.৩ টন/হে</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>সামগ্রিক মাটি স্বাস্থ্য স্কোর</span>
                        <span className="font-semibold text-green-600">৮৫/১০০ (আগামী ২ বছরে)</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>পুষ্টি উপাদানের ভারসাম্য</span>
                        <span className="font-semibold text-green-600">পুনরুদ্ধার প্রত্যাশিত</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Rotation Patterns */}
        <TabsContent value="pattern">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">রোটেশন প্যাটার্ন নির্বাচন করুন:</span>
              <Select value={selectedPattern} onValueChange={setSelectedPattern}>
                <SelectTrigger className="w-[300px] h-9 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {rotationPatterns.map(p => (
                    <SelectItem key={p.id} value={p.id.toString()}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Card className="rounded-xl shadow-sm border border-gray-100">
              <CardHeader>
                <CardTitle className="text-base">{currentPattern.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{currentPattern.description}</p>

                {/* Pattern Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-center">
                    <p className="text-xs text-muted-foreground">মোট লাভ</p>
                    <p className="text-sm font-bold text-amber-700">{currentPattern.totalProfit}</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200 text-center">
                    <p className="text-xs text-muted-foreground">গড় ফলন উন্নতি</p>
                    <p className="text-sm font-bold text-green-700">{currentPattern.avgYield}</p>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-center">
                    <p className="text-xs text-muted-foreground">মাটি স্বাস্থ্য ট্রেন্ড</p>
                    <p className="text-sm font-bold text-emerald-700">{currentPattern.soilHealthTrend}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
                    <p className="text-xs text-muted-foreground">টেকসইতা স্কোর</p>
                    <p className="text-sm font-bold text-blue-700">{currentPattern.sustainability}/১০০</p>
                  </div>
                </div>

                {/* Visual Pattern */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">রোটেশন প্যাটার্ন ভিজ্যুয়াল</h4>
                  <div className="flex flex-wrap gap-2 items-center">
                    {currentPattern.pattern.map((step, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="p-2 rounded-lg border text-center min-w-[120px]">
                          <p className="text-[10px] text-muted-foreground">{step.year}</p>
                          <Badge className={cn('text-[10px] mt-1', seasonColors[step.season] || 'bg-gray-100')}>
                            {step.season}
                          </Badge>
                          <p className="text-xs font-semibold mt-1">{step.crop}</p>
                        </div>
                        {i < currentPattern.pattern.length - 1 && (
                          <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Years */}
                <div className="flex flex-wrap gap-2">
                  {currentPattern.years.map((year, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      <CalendarDays className="w-3 h-3 mr-1" />
                      {year}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}