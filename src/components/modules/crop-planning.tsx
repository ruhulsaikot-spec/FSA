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
  CalendarDays,
  Sprout,
  TrendingUp,
  Droplets,
  FlaskConical,
  AlertTriangle,
  BrainCircuit,
  Wheat,
  Clock,
  BarChart3,
  BadgeDollarSign,
  CloudSun,
  Sun,
  Zap,
  Waves,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CropPlan {
  id: number
  season: string
  seasonBn: string
  seasonMonths: string
  cropName: string
  altCrops: string[]
  suitabilityScore: number
  expectedYield: string
  expectedProfit: string
  duration: string
  sowTime: string
  harvestTime: string
  waterNeeded: string
  fertilizer: string
  diseaseRisk: string
  pestRisk: string
  riskLevel: 'নিম্ন' | 'মাঝারি' | 'উচ্চ'
  roi: string
  // AI analysis factors
  soilCondition: string
  prevCropHistory: string
  weatherForecast: string
  rainfall: string
  waterAvailability: string
  marketPrice: string
  farmerPrevYield: string
  regionalAgri: string
  aiPlan: string
}

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const cropPlans: CropPlan[] = [
  {
    id: 1, season: 'boro', seasonBn: 'বোরো', seasonMonths: 'নভেম্বর - মার্চ',
    cropName: 'ধান (ব্রি-৮৯)', altCrops: ['ধান (হাইব্রিড)', 'গম', 'সরিষা'],
    suitabilityScore: 92, expectedYield: '৫.২ টন/হেক্টর', expectedProfit: '৳৯৫,০০০/হেক্টর',
    duration: '১৪৫ দিন', sowTime: '১৫ নভেম্বর', harvestTime: '১০ মার্চ',
    waterNeeded: '১২,০০০ ঘনমিটার/হেক্টর', fertilizer: 'ইউরিয়া ২৬০, টিএসপি ১০০, এমওপি ১০০ কেজি/হে',
    diseaseRisk: 'ব্লাস্ট রোগ (মাঝারি)', pestRisk: 'বাল্ব মাথা (মাঝারি)', riskLevel: 'মাঝারি',
    roi: '১৮০%',
    soilCondition: 'pH ৬.৮, জৈব পদার্থ ৩.২% — ধান চাষের জন্য উপযুক্ত।',
    prevCropHistory: 'গত বছর বোরো ধানের ফলন ছিল ৪.৬ টন/হেক্টর।',
    weatherForecast: 'আগামী ৩ মাসে স্বাভাবিক তাপমাত্রা ও বৃষ্টিপাত প্রত্যাশিত।',
    rainfall: 'বোরো মৌসুমে স্বাভাবিক বৃষ্টিপাত প্রত্যাশিত।',
    waterAvailability: 'সেচ সুবিধা আছে। ভূগর্ভস্থ পানির স্তর স্বাভাবিক।',
    marketPrice: 'বর্তমান ধানের বাজারদর ৳১,৮০০/মণ, গত বছরের চেয়ে ৫% বেশি।',
    farmerPrevYield: 'আপনার গত মৌসুমের ফলন: ৪.৬ টন/হেক্টর।',
    regionalAgri: 'রাজশাহী অঞ্চলে বোরো ধান চাষের জন্য অত্যন্ত উপযুক্ত।',
    aiPlan: 'ব্রি-৮৯ জাত নির্বাচন করুন। সময়মতো চারা রোপণ করুন। ইউরিয়া সার তিন কিস্তিতে প্রয়োগ করুন। প্রথম কিস্তি রোপণের ১৫ দিন পর, দ্বিতীয় কিস্তি টিলিং পর্যায়ে এবং তৃতীয় কিস্তি পানিবন্ধ পর্যায়ে। সেচের সময় মনোযোগী থাকুন।',
  },
  {
    id: 2, season: 'kharif1', seasonBn: 'খরিফ-১', seasonMonths: 'মার্চ - জুলাই',
    cropName: 'পেঁয়াজ (বারি পেঁয়াজ-৪)', altCrops: ['রসুন', 'মরিচ', 'তরমুজ'],
    suitabilityScore: 88, expectedYield: '১৪ টন/হেক্টর', expectedProfit: '৳২,৮০,০০০/হেক্টর',
    duration: '১২০ দিন', sowTime: '০১ নভেম্বর', harvestTime: '২৮ ফেব্রুয়ারি',
    waterNeeded: '৬,০০০ ঘনমিটার/হেক্টর', fertilizer: 'ইউরিয়া ২০০, টিএসপি ১২০, এমওপি ১২০ কেজি/হে',
    diseaseRisk: 'পাতা পোড়া রোগ (মাঝারি)', pestRisk: 'থ্রিপ্স (উচ্চ)', riskLevel: 'মাঝারি',
    roi: '৩৫০%',
    soilCondition: 'দোঁয়াশ মাটি পেঁয়াজ চাষের জন্য আদর্শ। ভালো ড্রেনেজ আছে।',
    prevCropHistory: 'গত বছর খরিফ-১-এ পেঁয়াজের ফলন ছিল ১০.৫ টন/হেক্টর।',
    weatherForecast: 'মার্চ-এপ্রিলে তাপমাত্রা কিছুটা বেশি হতে পারে।',
    rainfall: 'খরিফ-১ মৌসুমে বৃষ্টিপাত কম প্রত্যাশিত।',
    waterAvailability: 'সেচের প্রয়োজন হবে। সেচ সুবিধা নিশ্চিত করুন।',
    marketPrice: 'পেঁয়াজের বাজারদর স্থিতিশীল। সরবরাহ কম থাকলে দাম বাড়তে পারে।',
    farmerPrevYield: 'আপনার গত মৌসুমের ফলন: ১০.৫ টন/হেক্টর।',
    regionalAgri: 'রাজশাহী পেঁয়াজ চাষের জন্য দেশের অন্যতম সেরা অঞ্চল।',
    aiPlan: 'বারি পেঁয়াজ-৪ জাত ব্যবহার করুন। নভেম্বরের প্রথম সপ্তাহে বীজ বপন করুন। থ্রিপ্স নিয়ন্ত্রণে ইমিডাক্লোপ্রিড প্রয়োগ করুন। পাতা পোড়া রোগ প্রতিরোধে ম্যানকোজেব স্প্রে করুন। সেচ নিয়মিত দিন।',
  },
  {
    id: 3, season: 'aman', seasonBn: 'আমন', seasonMonths: 'জুলাই - নভেম্বর',
    cropName: 'ধান (ব্রি-৪৭)', altCrops: ['ধান (ব্রি-৬৭)', 'আউশ ধান', 'জুম ধান'],
    suitabilityScore: 85, expectedYield: '৪.৮ টন/হেক্টর', expectedProfit: '৮৫,০০০/হেক্টর',
    duration: '১৩৫ দিন', sowTime: '১০ জুলাই', harvestTime: '১৫ নভেম্বর',
    waterNeeded: '১৫,০০০ ঘনমিটার/হেক্টর', fertilizer: 'ইউরিয়া ২৪০, টিএসপি ৮০, এমওপি ৮০ কেজি/হে',
    diseaseRisk: 'ব্লাস্ট রোগ (উচ্চ)', pestRisk: 'সাদা মাথা (মাঝারি)', riskLevel: 'মাঝারি',
    roi: '১৭০%',
    soilCondition: 'আমন মৌসুমে বৃষ্টির পানিতে মাটির pH স্বাভাবিক থাকে।',
    prevCropHistory: 'গত বছর আমন ধানের ফলন ছিল ৪.২ টন/হেক্টর।',
    weatherForecast: 'আগামী মৌসুমে স্বাভাবিক বর্ষা প্রত্যাশিত।',
    rainfall: 'পর্যাপ্ত বৃষ্টিপাত প্রত্যাশিত। সেচের প্রয়োজন কম হবে।',
    waterAvailability: 'বর্ষার পানিতে পর্যাপ্ত। অতিরিক্ত বৃষ্টিতে জলাবদ্ধতা সম্ভাব্য।',
    marketPrice: 'আমন ধানের দাম স্থিতিশীল। বাজারে চাহিদা বেশি।',
    farmerPrevYield: 'আপনার গত মৌসুমের ফলন: ৪.২ টন/হেক্টর।',
    regionalAgri: 'রাজশাহী অঞ্চলে আমন ধান সফলভাবে চাষ করা যায়।',
    aiPlan: 'ব্রি-৪৭ জাত নির্বাচন করুন। সময়মতো চারা রোপণ করুন। ব্লাস্ট রোগ প্রতিরোধে ট্রাইসাইক্লাজোল প্রয়োগ করুন। জলাবদ্ধতা এড়াতে ড্রেনেজ ব্যবস্থা রাখুন।',
  },
  {
    id: 4, season: 'rabi', seasonBn: 'রবি', seasonMonths: 'অক্টোবর - মার্চ',
    cropName: 'সরিষা (টরি-৭)', altCrops: ['মুগ ডাল', 'ছোলা', 'মটর'],
    suitabilityScore: 80, expectedYield: '১.৮ টন/হেক্টর', expectedProfit: '৳৬০,০০০/হেক্টর',
    duration: '১১০ দিন', sowTime: '১৫ অক্টোবর', harvestTime: '১৫ ফেব্রুয়ারি',
    waterNeeded: '৩,০০০ ঘনমিটার/হেক্টর', fertilizer: 'ইউরিয়া ৪০, টিএসপি ৬০, এমওপি ৪০ কেজি/হে',
    diseaseRisk: 'ফুসারিয়াম উইল্ট (কম)', pestRisk: 'অ্যাফিড (মাঝারি)', riskLevel: 'নিম্ন',
    roi: '২৫০%',
    soilCondition: 'রবি মৌসুমে মাটির আর্দ্রতা কম থাকে, সরিষার জন্য উপযুক্ত।',
    prevCropHistory: 'গত বছর রবি মৌসুমে সরিষার ফলন ছিল ১.৫ টন/হেক্টর।',
    weatherForecast: 'শীতকালে তাপমাত্রা স্বাভাবিক থাকবে।',
    rainfall: 'রবি মৌসুমে বৃষ্টিপাত কম। সেচের প্রয়োজন হতে পারে।',
    waterAvailability: 'সীমিত সেচ প্রয়োজন। বৃষ্টিনির্ভর চাষ সম্ভব।',
    marketPrice: 'সরিষার তেলের দাম ভালো। বাজারে চাহিদা বেশি।',
    farmerPrevYield: 'আপনার গত মৌসুমের ফলন: ১.৫ টন/হেক্টর।',
    regionalAgri: 'রাজশাহী অঞ্চল সরিষা চাষের জন্য উপযুক্ত।',
    aiPlan: 'টরি-৭ জাত ব্যবহার করুন। অক্টোবরের মাঝামাঝি বীজ বপন করুন। বীজ শোধন করে বপন করুন। সার সময়মতো প্রয়োগ করুন।',
  },
]

const riskColors: Record<string, string> = {
  'নিম্ন': 'bg-green-100 text-green-700 border-green-200',
  'মাঝারি': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'উচ্চ': 'bg-red-100 text-red-700 border-red-200',
}

function getScoreColor(score: number): string {
  if (score >= 85) return 'text-green-600'
  if (score >= 70) return 'text-emerald-600'
  if (score >= 55) return 'text-yellow-600'
  return 'text-orange-600'
}

function getScoreBarColor(score: number): string {
  if (score >= 85) return 'bg-green-500'
  if (score >= 70) return 'bg-emerald-500'
  if (score >= 55) return 'bg-yellow-500'
  return 'bg-orange-500'
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function CropPlanning() {
  const [selectedSeason, setSelectedSeason] = useState<string>(cropPlans[0].season)
  const [activeTab, setActiveTab] = useState('overview')

  const plan = useMemo(() => cropPlans.find(p => p.season === selectedSeason) || cropPlans[0], [selectedSeason])

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-emerald-600" />
            মৌসুমভিত্তিক ফসল পরিকল্পনা
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            কৃষি মৌসুম, আবহাওয়া ও মৃত্তিকার ভিত্তিতে AI চালিত সর্বোত্তম ফসল পরিকল্পনা
          </p>
        </div>
        <Select value={selectedSeason} onValueChange={setSelectedSeason}>
          <SelectTrigger className="w-[220px] h-10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {cropPlans.map(p => (
              <SelectItem key={p.season} value={p.season}>
                {p.seasonBn} ({p.seasonMonths})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Season Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {cropPlans.map(p => (
          <Card
            key={p.id}
            className={cn(
              'rounded-xl shadow-sm border cursor-pointer transition-all hover:shadow-md',
              p.season === selectedSeason ? 'border-emerald-400 bg-emerald-50/50' : 'border-gray-100'
            )}
            onClick={() => { setSelectedSeason(p.season); setActiveTab('overview') }}
          >
            <CardContent className="p-3 text-center">
              <p className="text-sm font-semibold">{p.seasonBn}</p>
              <p className="text-[10px] text-muted-foreground">{p.seasonMonths}</p>
              <div className="mt-2 flex items-center justify-center gap-1">
                <span className={cn('text-xl font-bold', getScoreColor(p.suitabilityScore))}>{p.suitabilityScore}</span>
                <span className="text-[10px] text-muted-foreground">/১০০</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">উপযোগিতা স্কোর</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">ফসলের বিবরণ</TabsTrigger>
          <TabsTrigger value="analysis" className="text-xs sm:text-sm">AI বিশ্লেষণ</TabsTrigger>
          <TabsTrigger value="plan" className="text-xs sm:text-sm">AI পরিকল্পনা</TabsTrigger>
        </TabsList>

        {/* Crop Overview */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main crop info */}
            <Card className="rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Wheat className="w-4 h-4 text-amber-500" />
                  {plan.cropName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Score and Risk */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className={cn('w-14 h-14 rounded-full flex items-center justify-center border-2',
                      plan.suitabilityScore >= 85 ? 'border-green-400 bg-green-50' : 'border-yellow-400 bg-yellow-50'
                    )}>
                      <span className={cn('text-lg font-bold', getScoreColor(plan.suitabilityScore))}>{plan.suitabilityScore}</span>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">উপযোগিতা স্কোর</p>
                      <Badge className={cn('text-xs border', riskColors[plan.riskLevel])}>
                        ঝুঁকি: {plan.riskLevel}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Crop Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { icon: Sprout, label: 'উপযুক্ত ফসল', value: plan.cropName },
                    { icon: Clock, label: 'উৎপাদনকাল', value: plan.duration },
                    { icon: CalendarDays, label: 'বপনের সময়', value: plan.sowTime },
                    { icon: CalendarDays, label: 'ফসল কাটার সময়', value: plan.harvestTime },
                    { icon: Droplets, label: 'পানির প্রয়োজন', value: plan.waterNeeded },
                    { icon: FlaskConical, label: 'প্রয়োজনীয় সার', value: plan.fertilizer },
                    { icon: AlertTriangle, label: 'রোগের সম্ভাবনা', value: plan.diseaseRisk },
                    { icon: AlertTriangle, label: 'পোকার ঝুঁকি', value: plan.pestRisk },
                    { icon: TrendingUp, label: 'সম্ভাব্য ফলন', value: plan.expectedYield },
                    { icon: BadgeDollarSign, label: 'সম্ভাব্য লাভ', value: plan.expectedProfit },
                    { icon: BarChart3, label: 'ROI', value: plan.roi },
                  ].map((item, i) => (
                    <div key={i} className="p-2.5 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-1 mb-0.5">
                        <item.icon className="w-3.5 h-3.5 text-muted-foreground" />
                        <p className="text-[10px] text-muted-foreground">{item.label}</p>
                      </div>
                      <p className="text-xs font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Alternative Crops */}
                <div className="mt-4">
                  <h4 className="text-sm font-semibold mb-2">বিকল্প ফসল</h4>
                  <div className="flex flex-wrap gap-2">
                    {plan.altCrops.map(crop => (
                      <Badge key={crop} variant="outline" className="text-xs">
                        <Sprout className="w-3 h-3 mr-1" />{crop}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats Sidebar */}
            <div className="space-y-3">
              <Card className="rounded-xl shadow-sm border border-gray-100">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-green-600">{plan.expectedProfit}</p>
                  <p className="text-xs text-muted-foreground mt-1">সম্ভাব্য লাভ/হেক্টর</p>
                </CardContent>
              </Card>
              <Card className="rounded-xl shadow-sm border border-gray-100">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-emerald-600">{plan.roi}</p>
                  <p className="text-xs text-muted-foreground mt-1">ROI (বিনিয়োগ প্রতিফলন)</p>
                </CardContent>
              </Card>
              <Card className="rounded-xl shadow-sm border border-gray-100">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-amber-600">{plan.expectedYield}</p>
                  <p className="text-xs text-muted-foreground mt-1">সম্ভাব্য ফলন</p>
                </CardContent>
              </Card>
              <Card className={cn('rounded-xl shadow-sm border', riskColors[plan.riskLevel])}>
                <CardContent className="p-4 text-center">
                  <p className="text-sm font-bold">ঝুঁকির মাত্রা</p>
                  <p className="text-2xl font-bold mt-1">{plan.riskLevel}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* AI Analysis */}
        <TabsContent value="analysis">
          <Card className="rounded-xl shadow-sm border border-gray-100">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-emerald-600" />
                AI ভিত্তিক বিশ্লেষণ — {plan.seasonBn} মৌসুম
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: Sprout, label: 'বর্তমান মাটির অবস্থা', value: plan.soilCondition, color: 'bg-green-50 border-green-200' },
                  { icon: Clock, label: 'পূর্ববর্তী ফসলের ইতিহাস', value: plan.prevCropHistory, color: 'bg-blue-50 border-blue-200' },
                  { icon: CloudSun, label: 'আবহাওয়ার পূর্বাভাস', value: plan.weatherForecast, color: 'bg-sky-50 border-sky-200' },
                  { icon: Droplets, label: 'বৃষ্টিপাত', value: plan.rainfall, color: 'bg-cyan-50 border-cyan-200' },
                  { icon: Waves, label: 'পানি প্রাপ্যতা', value: plan.waterAvailability, color: 'bg-indigo-50 border-indigo-200' },
                  { icon: BarChart3, label: 'বাজারদর', value: plan.marketPrice, color: 'bg-amber-50 border-amber-200' },
                  { icon: TrendingUp, label: 'কৃষকের পূর্ববর্তী উৎপাদন', value: plan.farmerPrevYield, color: 'bg-purple-50 border-purple-200' },
                  { icon: Sun, label: 'আঞ্চলিক কৃষি বৈশিষ্ট্য', value: plan.regionalAgri, color: 'bg-orange-50 border-orange-200' },
                ].map((item, i) => (
                  <div key={i} className={cn('p-3 rounded-lg border', item.color)}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <item.icon className="w-4 h-4" />
                      <p className="text-xs font-semibold">{item.label}</p>
                    </div>
                    <p className="text-xs">{item.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Plan */}
        <TabsContent value="plan">
          <Card className="rounded-xl shadow-sm border border-gray-100">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-emerald-600" />
                AI স্বয়ংক্রিয় ফসল পরিকল্পনা — {plan.seasonBn}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <h4 className="text-sm font-semibold text-emerald-800 mb-2 flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  সুপারিশকৃত ফসল
                </h4>
                <p className="text-lg font-bold text-emerald-900">{plan.cropName}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge className="bg-emerald-200 text-emerald-800 text-xs">স্কোর: {plan.suitabilityScore}/১০০</Badge>
                  <Badge className="bg-blue-200 text-blue-800 text-xs">ফলন: {plan.expectedYield}</Badge>
                  <Badge className="bg-amber-200 text-amber-800 text-xs">লাভ: {plan.expectedProfit}</Badge>
                  <Badge className={cn('text-xs border', riskColors[plan.riskLevel])}>ঝুঁকি: {plan.riskLevel}</Badge>
                </div>
              </div>

              {/* AI Plan Details */}
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-200">
                <h4 className="text-sm font-semibold text-emerald-800 mb-2">বিস্তারিত পরিকল্পনা</h4>
                <p className="text-sm text-foreground leading-relaxed">{plan.aiPlan}</p>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="text-sm font-semibold mb-3">মৌসুম টাইমলাইন</h4>
                <div className="flex items-center gap-0 overflow-x-auto pb-2">
                  <div className="flex flex-col items-center shrink-0 w-28">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs font-bold">১</div>
                    <p className="text-[10px] text-center mt-1 font-medium">বীজ বপন</p>
                    <p className="text-[10px] text-muted-foreground">{plan.sowTime}</p>
                  </div>
                  <div className="w-8 border-t-2 border-dashed border-gray-300 shrink-0" />
                  <div className="flex flex-col items-center shrink-0 w-28">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold">২</div>
                    <p className="text-[10px] text-center mt-1 font-medium">সার প্রয়োগ</p>
                    <p className="text-[10px] text-muted-foreground">নির্ধারিত সময়ে</p>
                  </div>
                  <div className="w-8 border-t-2 border-dashed border-gray-300 shrink-0" />
                  <div className="flex flex-col items-center shrink-0 w-28">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-xs font-bold">৩</div>
                    <p className="text-[10px] text-center mt-1 font-medium">পরিচর্যা</p>
                    <p className="text-[10px] text-muted-foreground">সেচ ও পোকা নিয়ন্ত্রণ</p>
                  </div>
                  <div className="w-8 border-t-2 border-dashed border-gray-300 shrink-0" />
                  <div className="flex flex-col items-center shrink-0 w-28">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold">৪</div>
                    <p className="text-[10px] text-center mt-1 font-medium">ফসল কাটা</p>
                    <p className="text-[10px] text-muted-foreground">{plan.harvestTime}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}