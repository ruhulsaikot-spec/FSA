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
  Globe,
  CloudSun,
  Droplets,
  Mountain,
  Waves,
  TreePine,
  ThermometerSun,
  Sun,
  Sprout,
  AlertTriangle,
  CheckCircle2,
  BrainCircuit,
  MapPin,
  Beaker,
  TrendingUp,
  ShieldAlert,
  Wheat,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface RegionalData {
  id: number
  division: string
  district: string
  upazila: string
  union: string
  village: string
  mauza: string
  aez: string
  // Geographic
  climateType: string
  avgRainfall: string
  avgTemp: string
  maxTemp: string
  minTemp: string
  humidity: string
  avgSunlight: string
  elevation: string
  topography: string
  riverProximity: string
  // Soil
  soilType: string
  soilTexture: string
  avgPh: string
  organicMatter: string
  fertilityIndex: string
  waterCapacity: string
  drainageStatus: string
  salinity: string
  avgMoisture: string
  nutrientStatus: string
  // Agri characteristics
  characteristics: string[]
  // AI recommendations
  recommendedCrops: string[]
  avoidCrops: string[]
  seasonalBest: { season: string; crop: string }[]
  bestVariety: string
  expectedYield: string
  expectedProfit: string
  risks: string[]
  altCrops: string[]
  climateImpact: string
  longTermPlan: string
}

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const regionalData: RegionalData[] = [
  {
    id: 1, division: 'রাজশাহী', district: 'রাজশাহী', upazila: 'পবা', union: 'হরিপুর', village: 'দক্ষিণ হরিপুর', mauza: 'হরিপুর', aez: 'AEZ-১১ (উত্তর পশ্চিম উচ্চভূমি)',
    climateType: 'গ্রীষ্মকালীন আর্দ্র উষ্ণ', avgRainfall: '১,৫০০ মিমি/বছর', avgTemp: '২৫.৫°C', maxTemp: '৪২°C', minTemp: '৮°C', humidity: '৬৫%', avgSunlight: '৭.৫ ঘণ্টা/দিন', elevation: '২০-৩০ মিটার', topography: 'সমতল উচ্চভূমি', riverProximity: 'পদ্মা নদী (১৫ কি.মি.)',
    soilType: 'লাল দোঁয়াশ মাটি', soilTexture: 'গুঁড়ো দোঁয়াশ', avgPh: '৬.৫', organicMatter: '১.৮%', fertilityIndex: 'মাঝারি (৫৫/১০০)', waterCapacity: '৩৫%', drainageStatus: 'ভালো', salinity: 'নগণ্য', avgMoisture: '২২%', nutrientStatus: 'N ও Zn এর ঘাটতি রয়েছে',
    characteristics: ['খরা প্রবণ এলাকা', 'সেচ সুবিধাপ্রাপ্ত', 'বৃষ্টিনির্ভর কৃষি'],
    recommendedCrops: ['ধান (বোরো ও আমন)', 'আম', 'পেঁয়াজ', 'রসুন', 'মরিচ', 'সরিষা', 'গম'],
    avoidCrops: ['বিটি ধান (পানির অভাবে)', 'নারকেল'],
    seasonalBest: [
      { season: 'বোরো (নভেম্বর-মার্চ)', crop: 'ধান (ব্রি-২৮, ব্রি-৮৯)' },
      { season: 'খরিফ-১ (মার্চ-জুলাই)', crop: 'পেঁয়াজ, রসুন, মরিচ' },
      { season: 'আমন (জুলাই-নভেম্বর)', crop: 'ধান (ব্রি-৪৭, ব্রি-৬৭)' },
      { season: 'রবি (অক্টোবর-মার্চ)', crop: 'সরিষা, মুগ ডাল' },
    ],
    bestVariety: 'ব্রি-৮৯ (বোরো), ব্রি-৪৭ (আমন), হাইব্রিড পেঁয়াজ',
    expectedYield: 'ধান: ৪.৫-৫.৫ টন/হেক্টর, পেঁয়াজ: ১২-১৫ টন/হেক্টর',
    expectedProfit: 'ধান: ৳৮০,০০০-১,০০,০০০/হেক্টর, পেঁয়াজ: ৳২,৫০,০০০-৩,৫০,০০০/হেক্টর',
    risks: ['খরার ঝুঁকি (বোরো মৌসুমে)', 'তাপপ্রবাহ', 'পোকামাকড়ের আক্রমণ'],
    altCrops: ['মুগ ডাল', 'ছোলা', 'তিল', 'মরিচ'],
    climateImpact: 'বৃদ্ধি পাচ্ছে তাপমাত্রা এবং অনিয়মিত বৃষ্টিপাত। খরার ঝুঁকি বাড়ছে। সেচের ওপর নির্ভরতা বাড়বে।',
    longTermPlan: 'সেচ সুবিধা বৃদ্ধি, জল সংরক্ষণ প্রযুক্তি প্রয়োগ, খরা সহনশীল জাত ব্যবহার এবং ফসল বৈচিত্র্যায়ন করুন।',
  },
  {
    id: 2, division: 'খুলনা', district: 'বাগেরহাট', upazila: 'মোল্লাহাট', union: 'কুলিয়া', village: 'কুলিয়া গ্রাম', mauza: 'কুলিয়া', aez: 'AEZ-১৩ (গঙ্গা তীরবর্তী সমভূমি)',
    climateType: 'গ্রীষ্মকালীন আর্দ্র উষ্ণ', avgRainfall: '১,৮০০ মিমি/বছর', avgTemp: '২৬.২°C', maxTemp: '৩৮°C', minTemp: '১২°C', humidity: '৭৮%', avgSunlight: '৬.৫ ঘণ্টা/দিন', elevation: '১-৫ মিটার', topography: 'নিচু সমভূমি', riverProximity: 'পদ্মা নদী (৫ কি.মি.)',
    soilType: 'পলল মাটি', soilTexture: 'সিল্ট লোম', avgPh: '৭.২', organicMatter: '২.১%', fertilityIndex: 'ভালো (৬৫/১০০)', waterCapacity: '৪৫%', drainageStatus: 'ধীর', salinity: 'মাঝারি-বেশি', avgMoisture: '৩৫%', nutrientStatus: 'সামগ্রিকভাবে ভালো, K এর অতিরিক্ততা',
    characteristics: ['উপকূলীয় এলাকা', 'লবণাক্ত এলাকা', 'বন্যা প্রবণ এলাকা', 'জলাবদ্ধতা'],
    recommendedCrops: ['ধান (আমন)', 'পান', 'খেজুর', 'নারকেল', 'সুন্দরবন মধু'],
    avoidCrops: ['গম (লবণাক্ততার কারণে)', 'আপেল'],
    seasonalBest: [
      { season: 'খরিফ-১ (মার্চ-জুলাই)', crop: 'পান, সবজি' },
      { season: 'আমন (জুলাই-নভেম্বর)', crop: 'লবণাক্ত সহনশীল ধান (ব্রি-৪৭)' },
      { season: 'রবি (অক্টোবর-মার্চ)', crop: 'সরিষা, শসা, মিষ্টি কুমড়া' },
    ],
    bestVariety: 'ব্রি-৪৭ (আমন), লবণাক্ত সহনশীল জাত',
    expectedYield: 'ধান: ৩.৫-৪.৫ টন/হেক্টর, পান: ৫০-৬০ মণ/হেক্টর',
    expectedProfit: 'ধান: ৳৬০,০০০-৮০,০০০/হেক্টর, পান: ৳১,৫০,০০০-২,০০,০০০/হেক্টর',
    risks: ['লবণাক্ততা বৃদ্ধি', 'বন্যা', 'ঝড় ও জলোচ্ছ্বাস', 'জলাবদ্ধতা'],
    altCrops: ['লবণাক্ত সহনশীল সবজি', 'কলা'],
    climateImpact: 'সমুদ্রপৃষ্ঠের উচ্চতা বৃদ্ধির কারণে লবণাক্ততা বাড়ছে। ঘূর্ণিঝড়ের ঝুঁকি বাড়বে।',
    longTermPlan: 'লবণাক্ততা সহনশীল জাত ব্যবহার, উঁচু বিছানায় চাষ, সেচ ব্যবস্থায় মিঠা পানি সংরক্ষণ, বাঁধ নির্মাণ ও রক্ষণাবেক্ষণ।',
  },
  {
    id: 3, division: 'সিলেট', district: 'সিলেট', upazila: 'বিশ্বনাথ', union: 'রামপাশা', village: 'রামপাশা', mauza: 'রামপাশা', aez: 'AEZ-২০ (সিলেট অববাহিকা)',
    climateType: 'গ্রীষ্মকালীন আর্দ্র উষ্ণ', avgRainfall: '২,৫০০ মিমি/বছর', avgTemp: '২৪.৫°C', maxTemp: '৩৫°C', minTemp: '১০°C', humidity: '৮২%', avgSunlight: '৫.৫ ঘণ্টা/দিন', elevation: '১০-৫০ মিটার', topography: 'টিলাযুক্ত সমভূমি', riverProximity: 'সুরমা নদী (৩ কি.মি.)',
    soilType: 'পাহাড়ি মাটি', soilTexture: 'বেলে দোঁয়াশ', avgPh: '৫.৫', organicMatter: '৩.৫%', fertilityIndex: 'ভালো (৭০/১০০)', waterCapacity: '৪০%', drainageStatus: 'দ্রুত', salinity: 'নগণ্য', avgMoisture: '৩৮%', nutrientStatus: 'pH কম, Ca ও Mg এর ঘাটতি',
    characteristics: ['পাহাড়ি এলাকা', 'উচ্চ বৃষ্টিপাত', 'চা বাগান অঞ্চল'],
    recommendedCrops: ['চা', 'ধান (আউশ ও আমন)', 'লেমু', 'কমলা', 'আনারস', 'কাঁঠাল'],
    avoidCrops: ['গম (অতিরিক্ত বৃষ্টির কারণে)', 'তুলা'],
    seasonalBest: [
      { season: 'আউশ (মার্চ-জুলাই)', crop: 'ধান (লোকাল জাত)' },
      { season: 'আমন (জুলাই-নভেম্বর)', crop: 'উচ্চ ফলনশীল ধান' },
      { season: 'রবি (অক্টোবর-মার্চ)', crop: 'সরিষা, শাকসবজি' },
    ],
    bestVariety: 'লোকাল আউশ, ব্রি-৬৭ (আমন)',
    expectedYield: 'ধান: ৪.০-৫.০ টন/হেক্টর, চা: ১,৫০০ কেজি/হেক্টর',
    expectedProfit: 'ধান: ৳৭০,০০০-৯০,০০০/হেক্টর, চা: ৳২,০০,০০০/হেক্টর',
    risks: ['ভূমিধস', 'অতিরিক্ত বৃষ্টিপাত', 'বন্যা'],
    altCrops: ['আদা', 'হলুদ', 'কালো মরিচ'],
    climateImpact: 'বৃষ্টিপাতের ধরন পরিবর্তন হচ্ছে। অসময়ে বন্যার ঝুঁকি বাড়ছে।',
    longTermPlan: 'পাহাড়ি ঢালে সংরক্ষণমূলক কৃষি, বৃষ্টির পানি সংরক্ষণ, ভূমিধস প্রতিরোধে বনায়ন।',
  },
  {
    id: 4, division: 'রংপুর', district: 'রংপুর', upazila: 'মিঠাপুকুর', union: 'ভেলাবাড়ী', village: 'ভেলাবাড়ী', mauza: 'ভেলাবাড়ী', aez: 'AEZ-৩ (তিস্তা প্লাবন ভূমি)',
    climateType: 'উষ্ণ মৌসুমী', avgRainfall: '২,১০০ মিমি/বছর', avgTemp: '২৪.৮°C', maxTemp: '৩৬°C', minTemp: '৫°C', humidity: '৭০%', avgSunlight: '৭.০ ঘণ্টা/দিন', elevation: '২০-৪০ মিটার', topography: 'সমতল প্লাবন ভূমি', riverProximity: 'তিস্তা নদী (৮ কি.মি.)',
    soilType: 'বালুকা মাটি', soilTexture: 'বালুকা লোম', avgPh: '৬.০', organicMatter: '১.২%', fertilityIndex: 'মাঝারি (৫০/১০০)', waterCapacity: '২৫%', drainageStatus: 'দ্রুত', salinity: 'নগণ্য', avgMoisture: '১৮%', nutrientStatus: 'জৈব পদার্থ ও N, P, Zn এর ঘাটতি',
    characteristics: ['খরা প্রবণ এলাকা', 'নদীভাঙন প্রবণ', 'চরাঞ্চল', 'বন্যা প্রবণ'],
    recommendedCrops: ['ধান (আমন)', 'গম', 'সরিষা', 'ভুট্টা', 'আলু', 'পেঁয়াজ'],
    avoidCrops: ['পান (বালুকা মাটিতে অনুপযুক্ত)', 'কফি'],
    seasonalBest: [
      { season: 'খরিফ-১ (মার্চ-জুলাই)', crop: 'পেঁয়াজ, মরিচ, তরমুজ' },
      { season: 'আমন (জুলাই-নভেম্বর)', crop: 'ধান (ব্রি-৪৭)' },
      { season: 'রবি (অক্টোবর-মার্চ)', crop: 'গম, সরিষা, আলু' },
    ],
    bestVariety: 'ব্রি-৪৭ (আমন), বিনা গম-৭ (গম)',
    expectedYield: 'ধান: ৩.৫-৪.৫ টন/হেক্টর, গম: ২.৫-৩.৫ টন/হেক্টর',
    expectedProfit: 'ধান: ৫০,০০০-৭০,০০০/হেক্টর, গম: ৳৪০,০০০-৬০,০০০/হেক্টর',
    risks: ['নদীভাঙন', 'খরা', 'অতিরিক্ত বৃষ্টিতে বন্যা', 'শীতল তরঙ্গ'],
    altCrops: ['মুগ ডাল', 'ছোলা', 'মটর', 'শসা'],
    climateImpact: 'শীতল তরঙ্গের প্রভাব বাড়ছে। অনিয়মিত বৃষ্টিপাত বৃদ্ধি পাচ্ছে।',
    longTermPlan: 'বালুকা মাটিতে জৈব পদার্থ বৃদ্ধি, সেচ সুবিধা উন্নতকরণ, নদীভাঙন রোধে বাঁধ নির্মাণ।',
  },
]

const charIcons: Record<string, typeof Globe> = {
  'সেচ সুবিধাপ্রাত্র এলাকা': Droplets,
  'সেচ সুবিধাপ্রাপ্ত': Droplets,
  'বৃষ্টিনির্ভর কৃষি এলাকা': CloudSun,
  'বৃষ্টিনির্ভর কৃষি': CloudSun,
  'জলাবদ্ধ এলাকা': Waves,
  'জলাবদ্ধতা': Waves,
  'খরা প্রবণ এলাকা': Sun,
  'খরা প্রবণ': Sun,
  'পাহাড়ি এলাকা': Mountain,
  'চরাঞ্চল': TreePine,
  'উপকূলীয় এলাকা': Waves,
  'লবণাক্ত এলাকা': AlertTriangle,
  'বন্যা প্রবণ এলাকা': ShieldAlert,
  'বন্যা প্রবণ': ShieldAlert,
  'নদীভাঙন প্রবণ এলাকা': Waves,
  'নদীভাঙন প্রবণ': Waves,
  'উচ্চ বৃষ্টিপাত': CloudSun,
  'চা বাগান অঞ্চল': TreePine,
}

const charColors: Record<string, string> = {
  'সেচ সুবিধাপ্রাত্র এলাকা': 'bg-blue-100 text-blue-700 border-blue-200',
  'সেচ সুবিধাপ্রাপ্ত': 'bg-blue-100 text-blue-700 border-blue-200',
  'বৃষ্টিনির্ভর কৃষি এলাকা': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  'বৃষ্টিনির্ভর কৃষি': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  'জলাবদ্ধ এলাকা': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'জলাবদ্ধতা': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'খরা প্রবণ এলাকা': 'bg-amber-100 text-amber-700 border-amber-200',
  'খরা প্রবণ': 'bg-amber-100 text-amber-700 border-amber-200',
  'পাহাড়ি এলাকা': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'চরাঞ্চল': 'bg-lime-100 text-lime-700 border-lime-200',
  'উপকূলীয় এলাকা': 'bg-sky-100 text-sky-700 border-sky-200',
  'লবণাক্ত এলাকা': 'bg-orange-100 text-orange-700 border-orange-200',
  'বন্যা প্রবণ এলাকা': 'bg-red-100 text-red-700 border-red-200',
  'বন্যা প্রবণ': 'bg-red-100 text-red-700 border-red-200',
  'নদীভাঙন প্রবণ এলাকা': 'bg-rose-100 text-rose-700 border-rose-200',
  'নদীভাঙন প্রবণ': 'bg-rose-100 text-rose-700 border-rose-200',
  'উচ্চ বৃষ্টিপাত': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  'চা বাগান অঞ্চল': 'bg-green-100 text-green-700 border-green-200',
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function RegionalAgriIntelligence() {
  const [selectedRegion, setSelectedRegion] = useState<string>(regionalData[0].id.toString())
  const [activeTab, setActiveTab] = useState('admin')

  const data = useMemo(() => regionalData.find(r => r.id === Number(selectedRegion)) || regionalData[0], [selectedRegion])

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Globe className="w-6 h-6 text-emerald-600" />
            আঞ্চলিক কৃষি অবস্থা
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            বাংলাদেশের বিভিন্ন অঞ্চলের ভৌগোলিক, মৃত্তিকা ও কৃষি বৈশিষ্ট্যের তথ্যভাণ্ডার
          </p>
        </div>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-[250px] h-10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {regionalData.map(r => (
              <SelectItem key={r.id} value={r.id.toString()}>
                {r.division} &gt; {r.district} &gt; {r.upazila}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="rounded-xl shadow-sm border border-gray-100">
          <CardContent className="p-3 text-center">
            <ThermometerSun className="w-5 h-5 mx-auto text-orange-500 mb-1" />
            <p className="text-lg font-bold">{data.avgTemp}</p>
            <p className="text-[10px] text-muted-foreground">গড় তাপমাত্রা</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm border border-gray-100">
          <CardContent className="p-3 text-center">
            <CloudSun className="w-5 h-5 mx-auto text-blue-500 mb-1" />
            <p className="text-lg font-bold">{data.avgRainfall}</p>
            <p className="text-[10px] text-muted-foreground">বার্ষিক বৃষ্টিপাত</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm border border-gray-100">
          <CardContent className="p-3 text-center">
            <Beaker className="w-5 h-5 mx-auto text-emerald-500 mb-1" />
            <p className="text-lg font-bold">{data.fertilityIndex}</p>
            <p className="text-[10px] text-muted-foreground">মাটির উর্বরতা সূচক</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm border border-gray-100">
          <CardContent className="p-3 text-center">
            <Sprout className="w-5 h-5 mx-auto text-green-500 mb-1" />
            <p className="text-lg font-bold">{data.recommendedCrops.length}টি</p>
            <p className="text-[10px] text-muted-foreground">সুপারিশকৃত ফসল</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="admin" className="text-xs sm:text-sm">প্রশাসনিক</TabsTrigger>
          <TabsTrigger value="geo" className="text-xs sm:text-sm">ভৌগোলিক ও মৃত্তিকা</TabsTrigger>
          <TabsTrigger value="agri" className="text-xs sm:text-sm">কৃষি বৈশিষ্ট্য</TabsTrigger>
          <TabsTrigger value="ai" className="text-xs sm:text-sm">AI পরামর্শ</TabsTrigger>
        </TabsList>

        {/* Administrative Info */}
        <TabsContent value="admin">
          <Card className="rounded-xl shadow-sm border border-gray-100">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                প্রশাসনিক তথ্য
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'বিভাগ', value: data.division },
                  { label: 'জেলা', value: data.district },
                  { label: 'উপজেলা', value: data.upazila },
                  { label: 'ইউনিয়ন', value: data.union },
                  { label: 'গ্রাম', value: data.village },
                  { label: 'মৌজা', value: data.mauza },
                  { label: 'Agro-Ecological Zone', value: data.aez },
                ].map(item => (
                  <div key={item.label} className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-[10px] text-muted-foreground mb-0.5">{item.label}</p>
                    <p className="text-sm font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Geographic & Soil Info */}
        <TabsContent value="geo">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="rounded-xl shadow-sm border border-gray-100">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CloudSun className="w-4 h-4 text-blue-500" />
                  ভৌগোলিক ও পরিবেশগত তথ্য
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'জলবায়ুর ধরন', value: data.climateType },
                    { label: 'বার্ষিক গড় বৃষ্টিপাত', value: data.avgRainfall },
                    { label: 'গড় তাপমাত্রা', value: data.avgTemp },
                    { label: 'সর্বোচ্চ তাপমাত্রা', value: data.maxTemp },
                    { label: 'সর্বনিম্ন তাপমাত্রা', value: data.minTemp },
                    { label: 'আর্দ্রতা', value: data.humidity },
                    { label: 'সূর্যালোকের গড় সময়', value: data.avgSunlight },
                    { label: 'উচ্চতা', value: data.elevation },
                    { label: 'ভূ-প্রকৃতি', value: data.topography },
                    { label: 'নদী/জলাশয়', value: data.riverProximity },
                  ].map(item => (
                    <div key={item.label} className="p-2.5 bg-muted/30 rounded-lg">
                      <p className="text-[10px] text-muted-foreground">{item.label}</p>
                      <p className="text-xs font-semibold mt-0.5">{item.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm border border-gray-100">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Beaker className="w-4 h-4 text-emerald-500" />
                  মৃত্তিকা সম্পর্কিত তথ্য
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'মাটির ধরন', value: data.soilType },
                    { label: 'মাটির গঠন', value: data.soilTexture },
                    { label: 'গড় pH', value: data.avgPh },
                    { label: 'জৈব পদার্থ', value: data.organicMatter },
                    { label: 'উর্বরতা সূচক', value: data.fertilityIndex },
                    { label: 'পানি ধারণ ক্ষমতা', value: data.waterCapacity },
                    { label: 'ড্রেনেজ অবস্থা', value: data.drainageStatus },
                    { label: 'লবণাক্ততা', value: data.salinity },
                    { label: 'গড় আর্দ্রতা', value: data.avgMoisture },
                  ].map(item => (
                    <div key={item.label} className="p-2.5 bg-muted/30 rounded-lg">
                      <p className="text-[10px] text-muted-foreground">{item.label}</p>
                      <p className="text-xs font-semibold mt-0.5">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-xs font-semibold text-amber-800 mb-0.5">পুষ্টি উপাদানের অবস্থা</p>
                  <p className="text-xs text-amber-700">{data.nutrientStatus}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Agricultural Characteristics */}
        <TabsContent value="agri">
          <Card className="rounded-xl shadow-sm border border-gray-100">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Wheat className="w-4 h-4 text-amber-500" />
                কৃষি ও পরিবেশগত বৈশিষ্ট্য
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-6">
                {data.characteristics.map(ch => {
                  const IconComp = charIcons[ch] || Globe
                  const colorClass = charColors[ch] || 'bg-gray-100 text-gray-700 border-gray-200'
                  return (
                    <Badge key={ch} className={cn('py-1.5 px-3 text-xs border', colorClass)}>
                      <IconComp className="w-3.5 h-3.5 mr-1" />
                      {ch}
                    </Badge>
                  )
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-green-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    সুপারিশকৃত ফসল
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {data.recommendedCrops.map(crop => (
                      <div key={crop} className="p-2 bg-green-50 rounded-lg border border-green-200 text-xs text-green-800">
                        <Sprout className="w-3 h-3 inline mr-1" />{crop}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-red-700 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    এড়িয়ে চলার ফসল
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {data.avoidCrops.map(crop => (
                      <div key={crop} className="p-2 bg-red-50 rounded-lg border border-red-200 text-xs text-red-800">
                        {crop}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Recommendations */}
        <TabsContent value="ai">
          <div className="space-y-4">
            {/* Seasonal Best */}
            <Card className="rounded-xl shadow-sm border border-gray-100">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-emerald-600" />
                  AI ভিত্তিক আঞ্চলিক কৃষি পরামর্শ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-3">মৌসুম অনুযায়ী সর্বোত্তম ফসল</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {data.seasonalBest.map((sb, i) => (
                      <div key={i} className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                        <p className="text-xs text-emerald-700 font-medium mb-1">{sb.season}</p>
                        <p className="text-sm font-semibold text-emerald-900">{sb.crop}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs font-semibold text-blue-800 mb-1">সবচেয়ে উপযোগী জাত</p>
                      <p className="text-sm text-blue-700">{data.bestVariety}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-xs font-semibold text-green-800 mb-1">সম্ভাব্য ফলন</p>
                      <p className="text-sm text-green-700">{data.expectedYield}</p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="text-xs font-semibold text-amber-800 mb-1">সম্ভাব্য লাভ</p>
                      <p className="text-sm text-amber-700">{data.expectedProfit}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                      <p className="text-xs font-semibold text-red-800 mb-1">সম্ভাব্য ঝুঁকি</p>
                      <ul className="text-xs text-red-700 space-y-0.5">
                        {data.risks.map((risk, i) => <li key={i}>• {risk}</li>)}
                      </ul>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-xs font-semibold text-purple-800 mb-1">বিকল্প ফসল</p>
                      <p className="text-sm text-purple-700">{data.altCrops.join(', ')}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-xs font-semibold text-orange-800 mb-1 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> জলবায়ু পরিবর্তনের প্রভাব
                    </p>
                    <p className="text-xs text-orange-700">{data.climateImpact}</p>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <p className="text-xs font-semibold text-emerald-800 mb-1 flex items-center gap-1">
                      <BrainCircuit className="w-3.5 h-3.5" /> দীর্ঘমেয়াদি কৃষি পরিকল্পনা
                    </p>
                    <p className="text-xs text-emerald-700">{data.longTermPlan}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}