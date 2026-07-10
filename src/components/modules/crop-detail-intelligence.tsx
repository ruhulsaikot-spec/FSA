'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  Sprout,
  Thermometer,
  Droplets,
  Sun,
  Wheat,
  FlaskConical,
  Bug,
  Leaf,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowLeft,
} from 'lucide-react'
import { useAppStore } from '@/lib/store'

const cropDetail = {
  name: 'বোরো ধান',
  variety: 'ব্রি-৮৯',
  type: 'মুখ্য খাদ্যশস্য',
  season: 'বোরো (নভেম্বর - এপ্রিল)',
  duration: '১৫০-১৬০ দিন',
  avgYield: '৪.৫-৫.৫ টন/হেক্টর',
  idealSoil: {
    ph: '৬.০-৭.০',
    moisture: '৪০-৬০%',
    organicMatter: '২.৫-৩.৫%',
    nitrogen: '৪০-৬০ mg/kg',
    phosphorus: '২০-৩০ mg/kg',
    potassium: '৮০-১২০ mg/kg',
    sulfur: '১০-২০ mg/kg',
    calcium: '৮০০-১২০০ mg/kg',
    magnesium: '১০০-২০০ mg/kg',
    zinc: '১.৫-৩.০ mg/kg',
    boron: '০.৫-১.৫ mg/kg',
    iron: '৩০-৬০ mg/kg',
  },
  environment: {
    temp: '২০-৩০°C',
    rainfall: '১০০-১৫০ মিমি',
    sunlight: '৬-৮ ঘণ্টা/দিন',
    waterNeed: 'উচ্চ',
    irrigationCount: '১২-১৫ বার',
    waterlogging: 'মাঝারি',
    droughtTolerance: 'নিম্ন',
  },
  production: {
    seedRate: '৪০-৪৫ কেজ/হেক্টর',
    fertilizer:
      'ইউরিয়া ২৬০, টিএসপি ১০০, এমওপি ৭৫ কেজ/হেক্টর',
    irrigation: '৩ দিন অন্তর',
    weedMgmt: 'হাতে ও কেমিক্যাল',
    diseaseMgmt: 'প্রতিরোধমূলক স্প্রে',
    pestMgmt: 'আইপিএম পদ্ধতি',
    harvestTime: 'এপ্রিল মাস',
  },
}

const currentSoil = {
  ph: 6.8,
  moisture: '৩৫%',
  organicMatter: '২.১%',
  nitrogen: 45,
  phosphorus: 18,
  potassium: 32,
  sulfur: 12,
  calcium: 850,
  magnesium: 180,
  zinc: 1.8,
  boron: 0.5,
  iron: 45,
}

const soilComparison = [
  { param: 'পিএইচ (pH)', current: '৬.৮', ideal: '৬.০-৭.০', status: 'ideal', score: 95 },
  { param: 'আর্দ্রতা', current: '৩৫%', ideal: '৪০-৬০%', status: 'low', score: 58 },
  { param: 'জৈব পদার্থ', current: '২.১%', ideal: '২.৫-৩.৫%', status: 'low', score: 60 },
  { param: 'নাইট্রোজেন', current: '৪৫ mg/kg', ideal: '৪০-৬০ mg/kg', status: 'ideal', score: 90 },
  { param: 'ফসফরাস', current: '১৮ mg/kg', ideal: '২০-৩০ mg/kg', status: 'low', score: 65 },
  { param: 'পটাশিয়াম', current: '৩২ mg/kg', ideal: '৮০-১২০ mg/kg', status: 'low', score: 35 },
  { param: 'সালফার', current: '১২ mg/kg', ideal: '১০-২০ mg/kg', status: 'ideal', score: 85 },
  { param: 'ক্যালসিয়াম', current: '৮৫০ mg/kg', ideal: '৮০০-১২০০ mg/kg', status: 'ideal', score: 88 },
  { param: 'ম্যাগনেসিয়াম', current: '১৮০ mg/kg', ideal: '১০০-২০০ mg/kg', status: 'ideal', score: 92 },
  { param: 'জিংক', current: '১.৮ mg/kg', ideal: '১.৫-৩.০ mg/kg', status: 'ideal', score: 85 },
  { param: 'বোরন', current: '০.৫ mg/kg', ideal: '০.৫-১.৫ mg/kg', status: 'low', score: 55 },
  { param: 'আয়রন', current: '৪৫ mg/kg', ideal: '৩০-৬০ mg/kg', status: 'ideal', score: 95 },
]

const soilImprovements = [
  {
    name: 'আর্দ্রতা বৃদ্ধি',
    detail: 'নিয়মিত সেচ ব্যবস্থা বাড়ান এবং জমিতে পানি ধরে রাখুন',
    time: 'ভর্তির পর ২ সপ্তাহ',
    severity: 'মাঝারি',
  },
  {
    name: 'জৈব সার প্রয়োগ',
    detail: 'প্রতি হেক্টরে ৫ টন গোবর বা কম্পোস্ট সার প্রয়োগ করুন',
    time: 'চাষ শুরুর ৩ সপ্তাহ আগে',
    severity: 'মাঝারি',
  },
  {
    name: 'পটাশ সার বৃদ্ধি',
    detail: 'প্রস্তাবিত পরিমাণের চেয়ে ২০% বেশি এমওপি সার প্রয়োগ করুন',
    time: 'চাষাবাদ চলাকালীন',
    severity: 'উচ্চ',
  },
  {
    name: 'বোরন সার প্রয়োগ',
    detail: 'বোরিক অ্যাসিড বা বোর্যাক্স ১০-১৫ কেজি/হেক্টর প্রয়োগ করুন',
    time: 'বীজ বপনের আগে',
    severity: 'মাঝারি',
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case 'ideal':
      return (
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          আদর্শ
        </Badge>
      )
    case 'low':
      return (
        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200">
          <AlertTriangle className="h-3 w-3 mr-1" />
          কম
        </Badge>
      )
    case 'medium':
      return (
        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200">
          <AlertTriangle className="h-3 w-3 mr-1" />
          মাঝারি
        </Badge>
      )
    default:
      return <Badge variant="secondary">অজানা</Badge>
  }
}

function getProgressColor(score: number): string {
  if (score >= 80) return '[&>div]:bg-emerald-500'
  if (score >= 60) return '[&>div]:bg-yellow-500'
  if (score >= 40) return '[&>div]:bg-orange-500'
  return '[&>div]:bg-red-500'
}

function getWaterNeedBadge(level: string) {
  switch (level) {
    case 'উচ্চ':
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">উচ্চ</Badge>
    case 'মাঝারি':
      return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200">মাঝারি</Badge>
    case 'নিম্ন':
      return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200">নিম্ন</Badge>
    default:
      return <Badge variant="secondary">{level}</Badge>
  }
}

function getSeverityBadge(severity: string) {
  switch (severity) {
    case 'উচ্চ':
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200 text-xs">উচ্চ অগ্রাধিকার</Badge>
    case 'মাঝারি':
      return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200 text-xs">মাঝারি অগ্রাধিকার</Badge>
    default:
      return <Badge variant="secondary" className="text-xs">{severity}</Badge>
  }
}

export function CropDetailIntelligence() {
  const setView = useAppStore((s) => s.setView)

  const overallScore = 85
  const lowParams = soilComparison.filter((s) => s.status === 'low').length

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setView('crop')}
          className="w-fit gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>ফসল নির্বাচনে ফিরুন</span>
        </Button>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 flex-1">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            বোরো ধান — সম্পূর্ণ কৃষি বিশ্লেষণ
          </h1>
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200 w-fit text-sm px-3 py-1">
            <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
            {overallScore}% উপযুক্ত
          </Badge>
        </div>
      </div>

      {/* Overall Suitability */}
      <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Score Circle */}
            <div className="relative flex-shrink-0">
              <div className="w-32 h-32 rounded-full border-[6px] border-emerald-200 flex items-center justify-center bg-white shadow-sm">
                <div className="text-center">
                  <span className="text-3xl font-bold text-emerald-600">{overallScore}</span>
                  <span className="text-lg text-emerald-500">%</span>
                  <p className="text-xs text-muted-foreground mt-0.5">উপযুক্ততা</p>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                <Sprout className="h-4 w-4" />
              </div>
            </div>

            <div className="flex-1 space-y-2 text-center md:text-left">
              <h2 className="text-lg font-semibold text-foreground">
                আপনার জমি বোরো ধান চাষের জন্য মোটামুটি উপযুক্ত
              </h2>
              <p className="text-sm text-muted-foreground">
                মোট ১২টি পরামাণের মধ্যে{' '}
                <span className="font-medium text-emerald-600">
                  {12 - lowParams}টি আদর্শ
                </span>{' '}
                এবং{' '}
                <span className="font-medium text-orange-600">
                  {lowParams}টি উন্নতি প্রয়োজন
                </span>
                । নিচের মাটি উন্নয়ন পরিকল্পনা অনুসরণ করলে ফলন বৃদ্ধি সম্ভব।
              </p>

              {/* Quick stat badges */}
              <div className="flex flex-wrap gap-2 pt-2 justify-center md:justify-start">
                <Badge variant="outline" className="gap-1.5 bg-white">
                  <CheckCircle className="h-3 w-3 text-emerald-500" />
                  {12 - lowParams}টি আদর্শ
                </Badge>
                <Badge variant="outline" className="gap-1.5 bg-white">
                  <AlertTriangle className="h-3 w-3 text-orange-500" />
                  {lowParams}টি উন্নয়ন প্রয়োজন
                </Badge>
                <Badge variant="outline" className="gap-1.5 bg-white">
                  <Wheat className="h-3 w-3 text-amber-500" />
                  গড় ফলন: ৪.৫-৫.৫ টন/হেক্টর
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 w-full h-auto gap-1 bg-muted/50 p-1">
          <TabsTrigger value="general" className="text-xs sm:text-sm gap-1.5 data-[state=active]:bg-white shadow-sm">
            <Sprout className="h-3.5 w-3.5 hidden sm:block" />
            সাধারণ তথ্য
          </TabsTrigger>
          <TabsTrigger value="soil-ideal" className="text-xs sm:text-sm gap-1.5 data-[state=active]:bg-white shadow-sm">
            <FlaskConical className="h-3.5 w-3.5 hidden sm:block" />
            আদর্শ মাটি
          </TabsTrigger>
          <TabsTrigger value="environment" className="text-xs sm:text-sm gap-1.5 data-[state=active]:bg-white shadow-sm">
            <Sun className="h-3.5 w-3.5 hidden sm:block" />
            পরিবেশগত চাহিদা
          </TabsTrigger>
          <TabsTrigger value="comparison" className="text-xs sm:text-sm gap-1.5 data-[state=active]:bg-white shadow-sm">
            <TrendingUp className="h-3.5 w-3.5 hidden sm:block" />
            মাটির তুলনা
          </TabsTrigger>
          <TabsTrigger value="production" className="text-xs sm:text-sm gap-1.5 data-[state=active]:bg-white shadow-sm">
            <Wheat className="h-3.5 w-3.5 hidden sm:block" />
            উৎপাদন ব্যবস্থা
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: সাধারণ তথ্য */}
        <TabsContent value="general" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-100">
                  <Sprout className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">ফসলের নাম</p>
                  <p className="font-semibold text-foreground mt-0.5">{cropDetail.name}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Leaf className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">জাত</p>
                  <p className="font-semibold text-foreground mt-0.5">{cropDetail.variety}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-100">
                  <Wheat className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">ধরন</p>
                  <p className="font-semibold text-foreground mt-0.5">{cropDetail.type}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-100">
                  <Sun className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">উৎপাদন মৌসুম</p>
                  <p className="font-semibold text-foreground mt-0.5">{cropDetail.season}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-teal-100">
                  <Thermometer className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">উৎপাদনকাল</p>
                  <p className="font-semibold text-foreground mt-0.5">{cropDetail.duration}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-orange-100">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">গড় ফলন</p>
                  <p className="font-semibold text-foreground mt-0.5">{cropDetail.avgYield}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 2: আদর্শ মাটির বৈশিষ্ট্য */}
        <TabsContent value="soil-ideal" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-emerald-600" />
                বোরো ধানের আদর্শ মাটির বৈশিষ্ট্য
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-3 font-semibold text-muted-foreground">ক্রম</th>
                      <th className="text-left p-3 font-semibold text-muted-foreground">পরামাণ</th>
                      <th className="text-left p-3 font-semibold text-muted-foreground">আদর্শ পরিসীমা</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: 'পিএইচ (pH)', value: cropDetail.idealSoil.ph },
                      { label: 'আর্দ্রতা', value: cropDetail.idealSoil.moisture },
                      { label: 'জৈব পদার্থ', value: cropDetail.idealSoil.organicMatter },
                      { label: 'নাইট্রোজেন (N)', value: cropDetail.idealSoil.nitrogen },
                      { label: 'ফসফরাস (P)', value: cropDetail.idealSoil.phosphorus },
                      { label: 'পটাশিয়াম (K)', value: cropDetail.idealSoil.potassium },
                      { label: 'সালফার (S)', value: cropDetail.idealSoil.sulfur },
                      { label: 'ক্যালসিয়াম (Ca)', value: cropDetail.idealSoil.calcium },
                      { label: 'ম্যাগনেসিয়াম (Mg)', value: cropDetail.idealSoil.magnesium },
                      { label: 'জিংক (Zn)', value: cropDetail.idealSoil.zinc },
                      { label: 'বোরন (B)', value: cropDetail.idealSoil.boron },
                    ].map((item, i) => (
                      <tr
                        key={item.label}
                        className={i % 2 === 0 ? 'bg-white' : 'bg-muted/20'}
                      >
                        <td className="p-3 text-muted-foreground">{i + 1}</td>
                        <td className="p-3 font-medium text-foreground">{item.label}</td>
                        <td className="p-3">
                          <Badge variant="outline" className="font-mono">
                            {item.value}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: পরিবেশগত চাহিদা */}
        <TabsContent value="environment" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-red-100">
                    <Thermometer className="h-5 w-5 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">উপযুক্ত তাপমাত্রা</h3>
                </div>
                <p className="text-2xl font-bold text-foreground">{cropDetail.environment.temp}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  বোরো ধানের জন্য এই তাপমাত্রায় সেরা ফলন পাওয়া যায়
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Droplets className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">প্রয়োজনীয় বৃষ্টিপাত</h3>
                </div>
                <p className="text-2xl font-bold text-foreground">{cropDetail.environment.rainfall}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  মোট মৌসুমে প্রয়োজনীয় বৃষ্টিপাতের পরিমাণ
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-yellow-100">
                    <Sun className="h-5 w-5 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">সূর্যালোক</h3>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {cropDetail.environment.sunlight}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  প্রতিদিন প্রয়োজনীয় সূর্যালোকের সময়কাল
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-cyan-100">
                    <Droplets className="h-5 w-5 text-cyan-600" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">পানি প্রয়োজনীয়তা</h3>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-2xl font-bold text-foreground">
                    {cropDetail.environment.waterNeed}
                  </p>
                  {getWaterNeedBadge(cropDetail.environment.waterNeed)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  এই ফসলে প্রচুর পরিমাণে সেচের প্রয়োজন
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-indigo-100">
                    <Droplets className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">সেচের সংখ্যা</h3>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {cropDetail.environment.irrigationCount}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  পুরো মৌসুমে মোট প্রয়োজনীয় সেচের সংখ্যা
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-emerald-100">
                    <Droplets className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">জলাবদ্ধতা সহনশীলতা</h3>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-2xl font-bold text-foreground">
                    {cropDetail.environment.waterlogging}
                  </p>
                  {getWaterNeedBadge(cropDetail.environment.waterlogging)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  জলাবদ্ধতায় মাঝারি মাত্রায় টিকে থাকতে পারে
                </p>
              </CardContent>
            </Card>

            <Card className="sm:col-span-2 lg:col-span-1">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-orange-100">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">খরা সহনশীলতা</h3>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-2xl font-bold text-foreground">
                    {cropDetail.environment.droughtTolerance}
                  </p>
                  {getWaterNeedBadge(cropDetail.environment.droughtTolerance)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  খরার প্রতি সংবেদনশীল — নিয়মিত সেচ অপরিহার্য
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 4: মাটির সাথে তুলনা */}
        <TabsContent value="comparison" className="mt-4 space-y-6">
          {/* Comparison Table */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                বর্তমান মাটি বনাম আদর্শ মাটি
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 z-10">
                    <tr className="border-b bg-muted/80 backdrop-blur-sm">
                      <th className="text-left p-3 font-semibold text-muted-foreground min-w-[120px]">
                        পরামাণ
                      </th>
                      <th className="text-left p-3 font-semibold text-muted-foreground min-w-[100px]">
                        বর্তমান
                      </th>
                      <th className="text-left p-3 font-semibold text-muted-foreground min-w-[110px]">
                        আদর্শ
                      </th>
                      <th className="text-left p-3 font-semibold text-muted-foreground min-w-[90px]">
                        মানদণ্ড
                      </th>
                      <th className="text-left p-3 font-semibold text-muted-foreground min-w-[160px]">
                        স্কোর
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {soilComparison.map((item, i) => (
                      <tr
                        key={item.param}
                        className={
                          item.status === 'low'
                            ? 'bg-orange-50/60'
                            : i % 2 === 0
                              ? 'bg-white'
                              : 'bg-muted/20'
                        }
                      >
                        <td className="p-3 font-medium text-foreground">{item.param}</td>
                        <td className="p-3 font-mono text-foreground">{item.current}</td>
                        <td className="p-3 font-mono text-muted-foreground">{item.ideal}</td>
                        <td className="p-3">{getStatusBadge(item.status)}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Progress
                              value={item.score}
                              className={`h-2.5 flex-1 ${getProgressColor(item.score)}`}
                            />
                            <span
                              className={`text-xs font-semibold min-w-[32px] text-right ${
                                item.score >= 80
                                  ? 'text-emerald-600'
                                  : item.score >= 60
                                    ? 'text-yellow-600'
                                    : item.score >= 40
                                      ? 'text-orange-600'
                                      : 'text-red-600'
                              }`}
                            >
                              {item.score}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Soil Improvement Plan */}
          <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50/50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-orange-700">
                <FlaskConical className="h-5 w-5" />
                মাটি উন্নয়ন পরিকল্পনা
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                নিচের পদক্ষেপগুলো অনুসরণ করলে আপনার মাটির গুণমান উন্নত হবে এবং ফলন বৃদ্ধি পাবে
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {soilImprovements.map((item, i) => (
                <div
                  key={item.name}
                  className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 rounded-xl bg-white border shadow-sm"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h4 className="font-semibold text-foreground">{item.name}</h4>
                      {getSeverityBadge(item.severity)}
                    </div>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs gap-1">
                        <Thermometer className="h-3 w-3" />
                        উন্নয়নের সময়: {item.time}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 5: উৎপাদন ব্যবস্থাপনা */}
        <TabsContent value="production" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-emerald-100">
                    <Sprout className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">বীজের হার</h3>
                </div>
                <p className="text-lg font-bold text-foreground">{cropDetail.production.seedRate}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  প্রতি হেক্টরে প্রয়োজনীয় বীজের পরিমাণ
                </p>
              </CardContent>
            </Card>

            <Card className="sm:col-span-2">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-amber-100">
                    <FlaskConical className="h-5 w-5 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">সার ব্যবস্থাপনা</h3>
                </div>
                <p className="text-lg font-bold text-foreground">
                  {cropDetail.production.fertilizer}
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div className="bg-emerald-50 rounded-lg p-2 text-center">
                    <p className="text-xs text-muted-foreground">নাইট্রোজেন (N)</p>
                    <p className="font-bold text-emerald-700">২৬০ কেজ/হে</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2 text-center">
                    <p className="text-xs text-muted-foreground">ফসফরাস (P)</p>
                    <p className="font-bold text-blue-700">১০০ কেজ/হে</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-2 text-center">
                    <p className="text-xs text-muted-foreground">পটাশিয়াম (K)</p>
                    <p className="font-bold text-purple-700">৭৫ কেজ/হে</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Droplets className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">সেচ ব্যবস্থাপনা</h3>
                </div>
                <p className="text-lg font-bold text-foreground">{cropDetail.production.irrigation}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  নিয়মিত সেচ দিন এবং জমিতে পানি ধরে রাখুন
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-green-100">
                    <Leaf className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">আগাছা ব্যবস্থাপনা</h3>
                </div>
                <p className="text-lg font-bold text-foreground">{cropDetail.production.weedMgmt}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  হাতে ও কেমিক্যাল উভয় পদ্ধতিতে আগাছা দমন করুন
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-red-100">
                    <Bug className="h-5 w-5 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">রোগ ব্যবস্থাপনা</h3>
                </div>
                <p className="text-lg font-bold text-foreground">
                  {cropDetail.production.diseaseMgmt}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  প্রতিরোধমূলক ব্যবস্থা নিন এবং আক্রান্ত হলে দ্রুত ব্যবস্থা নিন
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-orange-100">
                    <Bug className="h-5 w-5 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">পোকা ব্যবস্থাপনা</h3>
                </div>
                <p className="text-lg font-bold text-foreground">
                  {cropDetail.production.pestMgmt}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  সমন্বিত পোকা ব্যবস্থাপনা (আইপিএম) পদ্ধতি অনুসরণ করুন
                </p>
              </CardContent>
            </Card>

            <Card className="sm:col-span-2 lg:col-span-3">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-yellow-100">
                    <Wheat className="h-5 w-5 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">
                    ফসল সংগ্রহের সময়
                  </h3>
                </div>
                <p className="text-lg font-bold text-foreground">
                  {cropDetail.production.harvestTime}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  ধানের ৮০% শস্য হলুদ হলে ফসল সংগ্রহ করুন। অকাল বা বিলম্বিত ফসল সংগ্রহ ফলন কমাতে পারে।
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Separator />

      {/* Bottom Summary */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-2">
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200 gap-1.5 px-4 py-2 text-sm">
          <TrendingUp className="h-4 w-4" />
          প্রত্যাশিত ফলন: ৪.৮ টন/হেক্টর
        </Badge>
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200 gap-1.5 px-4 py-2 text-sm">
          <CheckCircle className="h-4 w-4" />
          সম্ভাব্য লাভ: ৪৫,০০০ টাকা
        </Badge>
        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200 gap-1.5 px-4 py-2 text-sm">
          <AlertTriangle className="h-4 w-4" />
          সম্ভাব্য ঝুঁকি: মাঝারি
        </Badge>
      </div>
    </div>
  )
}