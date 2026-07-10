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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  History,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Filter,
  FileText,
  BrainCircuit,
  ArrowUpDown,
  Activity,
  Beaker,
  MapPin,
  CalendarDays,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type DataSource = 'iot' | 'lab' | 'officer' | 'farmer'
type HealthStatus = 'অত্যন্ত ভালো' | 'ভালো' | 'মাঝারি' | 'ঝুঁকিপূর্ণ' | 'অত্যন্ত খারাপ'

interface SoilRecord {
  id: number
  recordNo: string
  testDate: string
  collectTime: string
  source: DataSource
  sourceLabel: string
  landName: string
  gps: string
  season: string
  fiscalYear: string
  // Physical
  moisture: number
  temperature: number
  texture: string
  structure: string
  bulkDensity: number
  compaction: string
  waterCapacity: number
  drainage: string
  // Chemical
  ph: number
  ec: number
  organicMatter: number
  organicCarbon: number
  nitrogen: number
  phosphorus: number
  potassium: number
  sulfur: number
  calcium: number
  magnesium: number
  zinc: number
  boron: number
  iron: number
  copper: number
  manganese: number
  // Health
  healthScore: number
  healthStatus: HealthStatus
  overallAssessment: string
  mainProblem: string
  priorityAction: string
  // Timeline
  majorChange: string
  newProblem: string
  solutionProgress: string
  officerComment: string
  aiAnalysis: string
}

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const sourceLabels: Record<DataSource, string> = {
  iot: 'IoT Sensor',
  lab: 'মৃত্তিকা পরীক্ষাগার',
  officer: 'কৃষি কর্মকর্তা',
  farmer: 'কৃষক কর্তৃক তথ্য প্রদান',
}

const sourceColors: Record<DataSource, string> = {
  iot: 'bg-blue-100 text-blue-700 border-blue-200',
  lab: 'bg-purple-100 text-purple-700 border-purple-200',
  officer: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  farmer: 'bg-amber-100 text-amber-700 border-amber-200',
}

const healthStatusConfig: Record<HealthStatus, { color: string; bg: string; border: string }> = {
  'অত্যন্ত ভালো': { color: 'text-green-700', bg: 'bg-green-100', border: 'border-green-300' },
  'ভালো': { color: 'text-emerald-700', bg: 'bg-emerald-100', border: 'border-emerald-300' },
  'মাঝারি': { color: 'text-yellow-700', bg: 'bg-yellow-100', border: 'border-yellow-300' },
  'ঝুঁকিপূর্ণ': { color: 'text-orange-700', bg: 'bg-orange-100', border: 'border-orange-300' },
  'অত্যন্ত খারাপ': { color: 'text-red-700', bg: 'bg-red-100', border: 'border-red-300' },
}

const soilRecords: SoilRecord[] = [
  {
    id: 1, recordNo: 'SHR-2025-001', testDate: '২০২৫-০৬-১৫', collectTime: 'সকাল ০৬:৩০',
    source: 'lab', sourceLabel: 'মৃত্তিকা পরীক্ষাগার', landName: 'উত্তর জমি',
    gps: '২৪.৩৭৪৫°N, ৮৮.৬০৪২°E', season: 'খরিফ-১', fiscalYear: '২০২৫-২৬',
    moisture: 32, temperature: 28, texture: 'দোঁয়াশ মাটি', structure: 'কণাকৃতি',
    bulkDensity: 1.35, compaction: 'মাঝারি', waterCapacity: 42, drainage: 'মাঝারি',
    ph: 6.8, ec: 1.2, organicMatter: 3.2, organicCarbon: 1.86,
    nitrogen: 52, phosphorus: 24, potassium: 42, sulfur: 14,
    calcium: 1200, magnesium: 220, zinc: 2.1, boron: 0.7,
    iron: 35, copper: 1.8, manganese: 6.5,
    healthScore: 82, healthStatus: 'ভালো',
    overallAssessment: 'মাটির সামগ্রিক অবস্থা ভালো। জৈব পদার্থের মাত্রা উন্নতি পাচ্ছে।',
    mainProblem: 'বোরনের সামান্য ঘাটতি রয়েছে।',
    priorityAction: 'বোরিক সার ১.৫ কেজি/বিঘা প্রয়োগ করুন।',
    majorChange: 'জৈব পদার্থ ০.৩% বৃদ্ধি পেয়েছে।',
    newProblem: 'কোনো নতুন সমস্যা নেই।',
    solutionProgress: 'বোরন সার প্রয়োগের ফলে বোরনের মাত্রা উন্নতি পাচ্ছে।',
    officerComment: 'মাটির অবস্থা সন্তোষজনক। নিয়মিত পর্যবেক্ষণ চালিয়ে যান।',
    aiAnalysis: 'বিগত ৬ মাসে মাটির স্বাস্থ্য স্কোর ৫ পয়েন্ট বৃদ্ধি পেয়েছে। জৈব সার ব্যবহারের ইতিবাচক প্রভাব লক্ষ্য করা যাচ্ছে। আগামী ৩ মাসে pH সামান্য হ্রাস পেতে পারে।',
  },
  {
    id: 2, recordNo: 'SHR-2025-002', testDate: '২০২৫-০৩-১০', collectTime: 'সকাল ০৭:০০',
    source: 'iot', sourceLabel: 'IoT Sensor', landName: 'উত্তর জমি',
    gps: '২৪.৩৭৪৫°N, ৮৮.৬০৪২°E', season: 'রবি', fiscalYear: '২০২৪-২৫',
    moisture: 28, temperature: 22, texture: 'দোঁয়াশ মাটি', structure: 'কণাকৃতি',
    bulkDensity: 1.38, compaction: 'মাঝারি', waterCapacity: 40, drainage: 'মাঝারি',
    ph: 6.5, ec: 1.1, organicMatter: 2.9, organicCarbon: 1.68,
    nitrogen: 48, phosphorus: 22, potassium: 38, sulfur: 12,
    calcium: 1100, magnesium: 200, zinc: 1.8, boron: 0.5,
    iron: 32, copper: 1.5, manganese: 5.8,
    healthScore: 77, healthStatus: 'ভালো',
    overallAssessment: 'মাটির অবস্থা সামগ্রিকভাবে ভালো তবে বোরনের ঘাটতি উদ্বেগজনক।',
    mainProblem: 'বোরনের মাত্রা নিম্ন সীমার নিচে।',
    priorityAction: 'জরুরি ভিত্তিতে বোরিক সার প্রয়োগ করুন।',
    majorChange: 'জৈব পদার্থ ০.২% বৃদ্ধি।',
    newProblem: 'বোরনের ঘাটতি চিহ্নিত।',
    solutionProgress: 'জৈব সার নিয়মিত প্রয়োগ চলছে।',
    officerComment: 'বোরিক সার দ্রুত প্রয়োগ করুন।',
    aiAnalysis: 'বোরনের ঘাটতি ফসলের ফলন কমাতে পারে। দ্রুত সংশোধনমূলক ব্যবস্থা গ্রহণ করুন।',
  },
  {
    id: 3, recordNo: 'SHR-2024-008', testDate: '২০২৪-১২-০৫', collectTime: 'সকাল ০৬:৪৫',
    source: 'lab', sourceLabel: 'মৃত্তিকা পরীক্ষাগার', landName: 'উত্তর জমি',
    gps: '২৪.৩৭৪৫°N, ৮৮.৬০৪২°E', season: 'রবি', fiscalYear: '২০২৪-২৫',
    moisture: 35, temperature: 18, texture: 'দোঁয়াশ মাটি', structure: 'কণাকৃতি',
    bulkDensity: 1.40, compaction: 'মাঝারি', waterCapacity: 38, drainage: 'ধীর',
    ph: 6.2, ec: 1.0, organicMatter: 2.7, organicCarbon: 1.57,
    nitrogen: 45, phosphorus: 20, potassium: 35, sulfur: 11,
    calcium: 1050, magnesium: 190, zinc: 1.6, boron: 0.4,
    iron: 30, copper: 1.4, manganese: 5.2,
    healthScore: 72, healthStatus: 'মাঝারি',
    overallAssessment: 'মাটির অবস্থা মাঝারি। জৈব পদার্থ কমতে থাকায় উদ্বেগ রয়েছে।',
    mainProblem: 'জৈব পদার্থের মাত্রা হ্রাস এবং বোরনের ঘাটতি।',
    priorityAction: 'জৈব সার বৃদ্ধি করুন এবং বোরিক সার প্রয়োগ করুন।',
    majorChange: 'জৈব পদার্থ ০.১% হ্রাস।',
    newProblem: 'ড্রেনেজ ধীরগতির হচ্ছে।',
    solutionProgress: 'জৈব সার প্রয়োগ শুরু হয়েছে।',
    officerComment: 'জৈব সার বৃদ্ধি করুন এবং ড্রেনেজ ব্যবস্থা উন্নত করুন।',
    aiAnalysis: 'মাটির স্বাস্থ্য হ্রাস পাচ্ছে। দীর্ঘমেয়াদে ফসল রোটেশন বিবেচনা করুন।',
  },
  {
    id: 4, recordNo: 'SHR-2024-005', testDate: '২০২৪-০৯-২০', collectTime: 'সকাল ০৭:১৫',
    source: 'officer', sourceLabel: 'কৃষি কর্মকর্তা', landName: 'উত্তর জমি',
    gps: '২৪.৩৭৪৫°N, ৮৮.৬০৪২°E', season: 'আমন', fiscalYear: '২০২৪-২৫',
    moisture: 42, temperature: 30, texture: 'দোঁয়াশ মাটি', structure: 'কণাকৃতি',
    bulkDensity: 1.42, compaction: 'মাঝারি-বেশি', waterCapacity: 36, drainage: 'ধীর',
    ph: 5.9, ec: 0.9, organicMatter: 2.4, organicCarbon: 1.39,
    nitrogen: 40, phosphorus: 18, potassium: 32, sulfur: 10,
    calcium: 980, magnesium: 175, zinc: 1.4, boron: 0.35,
    iron: 28, copper: 1.2, manganese: 4.8,
    healthScore: 65, healthStatus: 'মাঝারি',
    overallAssessment: 'মাটির স্বাস্থ্য হ্রাস পেয়েছে। একাধিক পুষ্টি উপাদানের ঘাটতি দেখা দিয়েছে।',
    mainProblem: 'pH হ্রাস, জৈব পদার্থ কম, বোরন ও জিংকের ঘাটতি।',
    priorityAction: 'চুন প্রয়োগ, জৈব সার বৃদ্ধি, মাইক্রোনিউট্রিয়েন্ট সার প্রয়োগ।',
    majorChange: 'pH ০.৩ পয়েন্ট হ্রাস।',
    newProblem: 'মাটি আবদ্ধতা বৃদ্ধি পেয়েছে।',
    solutionProgress: 'চুন প্রয়োগ শুরু হয়েছে।',
    officerComment: 'দ্রুত সংশোধনমূলক ব্যবস্থা প্রয়োগ করুন।',
    aiAnalysis: 'মাটির অম্লতা বৃদ্ধি পাচ্ছে। চুন প্রয়োগ ছাড়াও ক্ষারীয় সার ব্যবহার বিবেচনা করুন।',
  },
  {
    id: 5, recordNo: 'SHR-2024-002', testDate: '২০২৪-০৬-১০', collectTime: 'সকাল ০৬:৩০',
    source: 'lab', sourceLabel: 'মৃত্তিকা পরীক্ষাগার', landName: 'উত্তর জমি',
    gps: '২৪.৩৭৪৫°N, ৮৮.৬০৪২°E', season: 'খরিফ-১', fiscalYear: '২০২৪-২৫',
    moisture: 30, temperature: 32, texture: 'দোঁয়াশ মাটি', structure: 'কণাকৃতি',
    bulkDensity: 1.38, compaction: 'মাঝারি', waterCapacity: 39, drainage: 'মাঝারি',
    ph: 6.2, ec: 1.0, organicMatter: 2.5, organicCarbon: 1.45,
    nitrogen: 42, phosphorus: 19, potassium: 34, sulfur: 10,
    calcium: 1000, magnesium: 180, zinc: 1.5, boron: 0.4,
    iron: 29, copper: 1.3, manganese: 5.0,
    healthScore: 68, healthStatus: 'মাঝারি',
    overallAssessment: 'মাটির অবস্থা মাঝারি। পূর্বের তুলনায় কিছুটা উন্নতি হয়েছে।',
    mainProblem: 'জৈব পদার্থের ঘাটতি এবং মাইক্রোনিউট্রিয়েন্টের অভাব।',
    priorityAction: 'জৈব সার এবং মাইক্রোনিউট্রিয়েন্ট সার প্রয়োগ করুন।',
    majorChange: 'pH স্থিতিশীল রয়েছে।',
    newProblem: 'কোনো নতুন সমস্যা নেই।',
    solutionProgress: 'সংশোধনমূলক ব্যবস্থায় উন্নতি হচ্ছে।',
    officerComment: 'বর্তমান চিকিৎসা অব্যাহত রাখুন।',
    aiAnalysis: 'ধীরে ধীরে উন্নতি হচ্ছে। আগামী ৬ মাসে উল্লেখযোগ্য উন্নতি প্রত্যাশিত।',
  },
  {
    id: 6, recordNo: 'SHR-2024-001', testDate: '২০২৪-০৩-১৫', collectTime: 'সকাল ০৭:০০',
    source: 'farmer', sourceLabel: 'কৃষক কর্তৃক তথ্য প্রদান', landName: 'উত্তর জমি',
    gps: '২৪.৩৭৪৫°N, ৮৮.৬০৪২°E', season: 'বোরো', fiscalYear: '২০২৩-২৪',
    moisture: 25, temperature: 20, texture: 'দোঁয়াশ মাটি', structure: 'কণাকৃতি',
    bulkDensity: 1.45, compaction: 'বেশি', waterCapacity: 35, drainage: 'ধীর',
    ph: 5.8, ec: 0.8, organicMatter: 2.1, organicCarbon: 1.22,
    nitrogen: 35, phosphorus: 16, potassium: 28, sulfur: 8,
    calcium: 900, magnesium: 160, zinc: 1.2, boron: 0.3,
    iron: 25, copper: 1.0, manganese: 4.2,
    healthScore: 55, healthStatus: 'ঝুঁকিপূর্ণ',
    overallAssessment: 'মাটির স্বাস্থ্য ঝুঁকিপূর্ণ। দ্রুত হস্তক্ষেপ প্রয়োজন।',
    mainProblem: 'pH অনেক কম, জৈব পদার্থ কম, একাধিক পুষ্টি উপাদানের ঘাটতি।',
    priorityAction: 'চুন প্রয়োগ, জৈব সার, এনপিকে সার এবং মাইক্রোনিউট্রিয়েন্ট সার প্রয়োগ।',
    majorChange: 'pH ০.৫ পয়েন্ট হ্রাস এবং জৈব পদার্থ ০.৪% হ্রাস।',
    newProblem: 'মাটি আবদ্ধতা বৃদ্ধি এবং ড্রেনেজ সমস্যা।',
    solutionProgress: 'চিকিৎসা শুরু হয়নি।',
    officerComment: 'জরুরি ভিত্তিতে মাটি পরীক্ষাগারে পরীক্ষা করান এবং সংশোধনমূলক ব্যবস্থা নিন।',
    aiAnalysis: 'মাটির স্বাস্থ্য দ্রুত হ্রাস পাচ্ছে। মাটি পুনরুদ্ধারে কয়েক বছর সময় লাগতে পারে। ফসল রোটেশন বাধ্যতামূলক।',
  },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getScoreColor(score: number): string {
  if (score >= 85) return 'text-green-600'
  if (score >= 70) return 'text-emerald-600'
  if (score >= 55) return 'text-yellow-600'
  if (score >= 40) return 'text-orange-600'
  return 'text-red-600'
}

function getScoreBarColor(score: number): string {
  if (score >= 85) return 'bg-green-500'
  if (score >= 70) return 'bg-emerald-500'
  if (score >= 55) return 'bg-yellow-500'
  if (score >= 40) return 'bg-orange-500'
  return 'bg-red-500'
}

function getTrendIcon(direction: 'up' | 'down' | 'stable' | 'risk') {
  if (direction === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />
  if (direction === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />
  if (direction === 'risk') return <AlertTriangle className="w-4 h-4 text-orange-500" />
  return <Minus className="w-4 h-4 text-gray-400" />
}

function getParamTrend(records: SoilRecord[], param: keyof SoilRecord): 'up' | 'down' | 'stable' | 'risk' {
  if (records.length < 2) return 'stable'
  const val = typeof records[0][param] === 'number' ? records[0][param] as number : 0
  const prev = typeof records[1][param] === 'number' ? records[1][param] as number : 0
  const diff = val - prev
  if (Math.abs(diff) < 0.5) return 'stable'
  if (diff > 0) return 'up'
  return 'down'
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function SoilHealthTimeline() {
  const [selectedRecord, setSelectedRecord] = useState<SoilRecord | null>(null)
  const [activeTab, setActiveTab] = useState('timeline')
  const [landFilter, setLandFilter] = useState('all')
  const [sourceFilter, setSourceFilter] = useState('all')
  const [yearFilter, setYearFilter] = useState('all')
  const [timeRange, setTimeRange] = useState('all')
  const [compareMode, setCompareMode] = useState(false)
  const [compareRecords, setCompareRecords] = useState<number[]>([])

  const filteredRecords = useMemo(() => {
    let result = [...soilRecords]
    if (landFilter !== 'all') result = result.filter(r => r.landName === landFilter)
    if (sourceFilter !== 'all') result = result.filter(r => r.source === sourceFilter)
    if (yearFilter !== 'all') result = result.filter(r => r.fiscalYear === yearFilter)
    if (timeRange !== 'all') {
      const now = new Date('2025-07-10')
      const rangeMap: Record<string, number> = { '30d': 30, '90d': 90, '6m': 180, '1y': 365, '3y': 1095, '5y': 1825 }
      const days = rangeMap[timeRange] || 99999
      result = result.filter(r => {
        const d = new Date(r.testDate.replace(/০১২৩৪৫৬৭৮৯/g, d => '০১২৩৪৫৬৭৮৯'.indexOf(d)))
        return (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24) <= days
      })
    }
    return result
  }, [landFilter, sourceFilter, yearFilter, timeRange])

  const uniqueLands = [...new Set(soilRecords.map(r => r.landName))]
  const uniqueYears = [...new Set(soilRecords.map(r => r.fiscalYear))].reverse()

  const trendParams = [
    { key: 'ph' as const, label: 'pH', unit: '' },
    { key: 'moisture' as const, label: 'আর্দ্রতা', unit: '%' },
    { key: 'organicMatter' as const, label: 'জৈব পদার্থ', unit: '%' },
    { key: 'nitrogen' as const, label: 'নাইট্রোজেন', unit: 'কেজি/হে' },
    { key: 'phosphorus' as const, label: 'ফসফরাস', unit: 'কেজি/হে' },
    { key: 'potassium' as const, label: 'পটাশিয়াম', unit: 'কেজি/হে' },
    { key: 'zinc' as const, label: 'জিংক', unit: 'পিপিএম' },
    { key: 'boron' as const, label: 'বোরন', unit: 'পিপিএম' },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <History className="w-6 h-6 text-emerald-600" />
            মাটির স্বাস্থ্য
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            জমির মাটির স্বাস্থ্য সময়ের সাথে পরিবর্তনের সম্পূর্ণ ইতিহাস ও বিশ্লেষণ
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="rounded-xl shadow-sm border border-gray-100">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={landFilter} onValueChange={setLandFilter}>
              <SelectTrigger className="w-[160px] h-9 text-xs"><SelectValue placeholder="জমি নির্বাচন" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সকল জমি</SelectItem>
                {uniqueLands.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-[170px] h-9 text-xs"><SelectValue placeholder="তথ্যের উৎস" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সকল উৎস</SelectItem>
                <SelectItem value="iot">IoT Sensor</SelectItem>
                <SelectItem value="lab">পরীক্ষাগার</SelectItem>
                <SelectItem value="officer">কৃষি কর্মকর্তা</SelectItem>
                <SelectItem value="farmer">কৃষক</SelectItem>
              </SelectContent>
            </Select>
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-[150px] h-9 text-xs"><SelectValue placeholder="অর্থবছর" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সকল বছর</SelectItem>
                {uniqueYears.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[170px] h-9 text-xs"><SelectValue placeholder="সময়সীমা" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সম্পূর্ণ ইতিহাস</SelectItem>
                <SelectItem value="30d">সর্বশেষ ৩০ দিন</SelectItem>
                <SelectItem value="90d">সর্বশেষ ৯০ দিন</SelectItem>
                <SelectItem value="6m">সর্বশেষ ৬ মাস</SelectItem>
                <SelectItem value="1y">সর্বশেষ ১ বছর</SelectItem>
                <SelectItem value="3y">সর্বশেষ ৩ বছর</SelectItem>
                <SelectItem value="5y">সর্বশেষ ৫ বছর</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="timeline" className="text-xs sm:text-sm">টাইমলাইন</TabsTrigger>
          <TabsTrigger value="historical" className="text-xs sm:text-sm">ঐতিহাসিক বিশ্লেষণ</TabsTrigger>
          <TabsTrigger value="comparative" className="text-xs sm:text-sm">তুলনামূলক</TabsTrigger>
          <TabsTrigger value="trend" className="text-xs sm:text-sm">ট্রেন্ড বিশ্লেষণ</TabsTrigger>
        </TabsList>

        {/* ========== TAB 1: Timeline ========== */}
        <TabsContent value="timeline">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 hidden sm:block" />

            <div className="space-y-4">
              {filteredRecords.map((record) => {
                const hcfg = healthStatusConfig[record.healthStatus]
                return (
                  <div key={record.id} className="relative sm:pl-16">
                    {/* Timeline dot */}
                    <div className={cn(
                      'absolute left-4 top-6 w-4 h-4 rounded-full border-2 border-white shadow hidden sm:block',
                      getScoreBarColor(record.healthScore)
                    )} />

                    <Card className="rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedRecord(record)}>
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs font-mono">{record.recordNo}</Badge>
                              <Badge className={cn('text-xs', sourceColors[record.source])}>{record.sourceLabel}</Badge>
                              <Badge className={cn('text-xs', hcfg.bg, hcfg.color, hcfg.border, 'border')}>{record.healthStatus}</Badge>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1 text-sm">
                              <div className="flex items-center gap-1.5 text-muted-foreground">
                                <CalendarDays className="w-3.5 h-3.5" />
                                <span>{record.testDate}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-muted-foreground">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>{record.landName}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-muted-foreground">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{record.season} | {record.fiscalYear}</span>
                              </div>
                            </div>
                            <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xs font-medium text-muted-foreground">প্রধান পরিবর্তন</span>
                                {getParamTrend(filteredRecords, 'healthScore') === 'up' ? (
                                  <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                                ) : getParamTrend(filteredRecords, 'healthScore') === 'down' ? (
                                  <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                                ) : null}
                              </div>
                              <p className="text-sm text-foreground">{record.majorChange}</p>
                              {record.newProblem !== 'কোনো নতুন সমস্যা নেই।' && (
                                <p className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                                  <AlertTriangle className="w-3 h-3" />
                                  নতুন সমস্যা: {record.newProblem}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Score Circle */}
                          <div className="flex flex-col items-center gap-1 shrink-0">
                            <div className={cn('w-16 h-16 rounded-full flex items-center justify-center border-2',
                              record.healthScore >= 70 ? 'border-green-400 bg-green-50' :
                              record.healthScore >= 55 ? 'border-yellow-400 bg-yellow-50' :
                              'border-red-400 bg-red-50'
                            )}>
                              <span className={cn('text-xl font-bold', getScoreColor(record.healthScore))}>
                                {record.healthScore}
                              </span>
                            </div>
                            <span className="text-[10px] text-muted-foreground">স্কোর</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </TabsContent>

        {/* ========== TAB 2: Historical Analysis ========== */}
        <TabsContent value="historical">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Score Progression */}
            <Card className="rounded-xl shadow-sm border border-gray-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  স্বাস্থ্য স্কোরের পরিবর্তন
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredRecords.map((r, i) => (
                    <div key={r.id} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-24 shrink-0">{r.testDate}</span>
                      <div className="flex-1 h-7 bg-gray-100 rounded-full overflow-hidden relative">
                        <div className={cn('h-full rounded-full transition-all duration-500', getScoreBarColor(r.healthScore))}
                          style={{ width: `${r.healthScore}%` }} />
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">{r.healthScore}</span>
                      </div>
                      <Badge className={cn('text-[10px] shrink-0', healthStatusConfig[r.healthStatus].bg, healthStatusConfig[r.healthStatus].color)}>{r.healthStatus}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Parameters over time */}
            <Card className="rounded-xl shadow-sm border border-gray-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Beaker className="w-4 h-4 text-emerald-600" />
                  প্রধান পরামাণের পরিবর্তন
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-1">পরামাণ</th>
                        {filteredRecords.slice(0, 4).map(r => (
                          <th key={r.id} className="text-center py-2 px-1 font-normal text-muted-foreground">{r.testDate.slice(5)}</th>
                        ))}
                        <th className="text-center py-2 px-1">ট্রেন্ড</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trendParams.map(tp => (
                        <tr key={tp.key} className="border-b last:border-b-0 hover:bg-gray-50">
                          <td className="py-2 px-1 font-medium">{tp.label}</td>
                          {filteredRecords.slice(0, 4).map(r => (
                            <td key={r.id} className="text-center py-2 px-1 font-mono">{r[tp.key]}</td>
                          ))}
                          <td className="text-center py-2 px-1">{getParamTrend(filteredRecords, tp.key) === 'up' ? '↑' : getParamTrend(filteredRecords, tp.key) === 'down' ? '↓' : '→'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* AI Summary */}
            <Card className="rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-emerald-600" />
                  AI ঐতিহাসিক বিশ্লেষণ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="text-sm font-semibold text-green-800 mb-1">ইতিবাচক দিক</h4>
                    <ul className="text-xs text-green-700 space-y-1">
                      <li>• জৈব পদার্থ ধীরে ধীরে বৃদ্ধি পাচ্ছে</li>
                      <li>• pH স্থিতিশীল হয়েছে</li>
                      <li>• সামগ্রিক স্কোর ২৭ পয়েন্ট বৃদ্ধি</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="text-sm font-semibold text-orange-800 mb-1">উদ্বেগজনক দিক</h4>
                    <ul className="text-xs text-orange-700 space-y-1">
                      <li>• বোরন এখনও ঘাটতিতে</li>
                      <li>• মাটি আবদ্ধতা মাঝারি পর্যায়ে</li>
                      <li>• ড্রেনেজ উন্নতি প্রয়োজন</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="text-sm font-semibold text-blue-800 mb-1">AI পূর্বাভাস</h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• আগামী ৬ মাসে স্কোর ৮৫+ প্রত্যাশিত</li>
                      <li>• বোরন স্বাভাবিক স্তরে ফিরবে</li>
                      <li>• জৈব পদার্থ ৩.৫% ছাড়াতে পারে</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ========== TAB 3: Comparative Analysis ========== */}
        <TabsContent value="comparative">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">তুলনার জন্য দুটি রেকর্ড নির্বাচন করুন:</span>
              <Select value={compareRecords[0]?.toString() || '_'} onValueChange={v => setCompareRecords(p => [Number(v), p[1] || 0])}>
                <SelectTrigger className="w-[200px] h-9 text-xs"><SelectValue placeholder="প্রথম রেকর্ড" /></SelectTrigger>
                <SelectContent>
                  {soilRecords.map(r => <SelectItem key={r.id} value={r.id.toString()}>{r.recordNo} ({r.testDate})</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={compareRecords[1]?.toString() || '_'} onValueChange={v => setCompareRecords(p => [p[0] || 0, Number(v)])}>
                <SelectTrigger className="w-[200px] h-9 text-xs"><SelectValue placeholder="দ্বিতীয় রেকর্ড" /></SelectTrigger>
                <SelectContent>
                  {soilRecords.map(r => <SelectItem key={r.id} value={r.id.toString()}>{r.recordNo} ({r.testDate})</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {compareRecords[0] && compareRecords[1] && (() => {
              const r1 = soilRecords.find(r => r.id === compareRecords[0])!
              const r2 = soilRecords.find(r => r.id === compareRecords[1])!
              const compareItems = [
                { label: 'Soil Health Score', v1: r1.healthScore, v2: r2.healthScore, unit: '' },
                { label: 'pH', v1: r1.ph, v2: r2.ph, unit: '' },
                { label: 'আর্দ্রতা', v1: r1.moisture, v2: r2.moisture, unit: '%' },
                { label: 'জৈব পদার্থ', v1: r1.organicMatter, v2: r2.organicMatter, unit: '%' },
                { label: 'নাইট্রোজেন (N)', v1: r1.nitrogen, v2: r2.nitrogen, unit: 'কেজি/হে' },
                { label: 'ফসফরাস (P)', v1: r1.phosphorus, v2: r2.phosphorus, unit: 'কেজি/হে' },
                { label: 'পটাশিয়াম (K)', v1: r1.potassium, v2: r2.potassium, unit: 'কেজি/হে' },
                { label: 'জিংক (Zn)', v1: r1.zinc, v2: r2.zinc, unit: 'পিপিএম' },
                { label: 'বোরন (B)', v1: r1.boron, v2: r2.boron, unit: 'পিপিএম' },
                { label: 'আয়রন (Fe)', v1: r1.iron, v2: r2.iron, unit: 'পিপিএম' },
              ]
              return (
                <Card className="rounded-xl shadow-sm border border-gray-100">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">তুলনামূলক বিশ্লেষণ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 px-3">পরামাণ</th>
                            <th className="text-center py-2 px-3">{r1.testDate}</th>
                            <th className="text-center py-2 px-3">{r2.testDate}</th>
                            <th className="text-center py-2 px-3">পরিবর্তন</th>
                          </tr>
                        </thead>
                        <tbody>
                          {compareItems.map(item => {
                            const diff = item.v2 - item.v1
                            const pct = item.v1 !== 0 ? ((diff / item.v1) * 100).toFixed(1) : '—'
                            return (
                              <tr key={item.label} className="border-b last:border-b-0 hover:bg-gray-50">
                                <td className="py-2.5 px-3 font-medium">{item.label}</td>
                                <td className="text-center py-2.5 px-3 font-mono">{item.v1} {item.unit}</td>
                                <td className="text-center py-2.5 px-3 font-mono">{item.v2} {item.unit}</td>
                                <td className="text-center py-2.5 px-3">
                                  <span className={cn('font-mono text-xs', diff > 0 ? 'text-green-600' : diff < 0 ? 'text-red-600' : 'text-gray-500')}>
                                    {diff > 0 ? '+' : ''}{diff} ({diff > 0 ? '+' : ''}{pct}%)
                                  </span>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                    {/* AI Comparative Insight */}
                    <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                      <div className="flex items-center gap-1.5 mb-1">
                        <BrainCircuit className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-semibold text-emerald-800">AI তুলনামূলক বিশ্লেষণ</span>
                      </div>
                      <p className="text-xs text-emerald-700">
                        {r1.testDate} থেকে {r2.testDate} পর্যন্ত মাটির স্বাস্থ্য স্কোর {r2.healthScore - r1.healthScore > 0 ? '+' : ''}{r2.healthScore - r1.healthScore} পয়েন্ট পরিবর্তন হয়েছে।
                        জৈব পদার্থ {(r2.organicMatter - r1.organicMatter).toFixed(1)}% পরিবর্তন হয়েছে। pH {(r2.ph - r1.ph).toFixed(1)} পয়েন্ট পরিবর্তন পেয়েছে।
                        সামগ্রিকভাবে মাটির অবস্থা {r2.healthScore > r1.healthScore ? 'উন্নতি' : 'হ্রাস'} পাচ্ছে।
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })()}
          </div>
        </TabsContent>

        {/* ========== TAB 4: Trend Analysis ========== */}
        <TabsContent value="trend">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trendParams.map(tp => {
              const trend = getParamTrend(filteredRecords, tp.key)
              const trendLabel = trend === 'up' ? 'বৃদ্ধি পাচ্ছে' : trend === 'down' ? 'হ্রাস পাচ্ছে' : 'স্থিতিশীল রয়েছে'
              return (
                <Card key={tp.key} className="rounded-xl shadow-sm border border-gray-100">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold">{tp.label}</CardTitle>
                      <div className="flex items-center gap-1.5">
                        {getTrendIcon(trend)}
                        <span className={cn('text-xs font-medium',
                          trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'
                        )}>{trendLabel}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1.5">
                      {filteredRecords.slice(0, 6).map((r, i) => {
                        const val = r[tp.key] as number
                        const maxVal = Math.max(...filteredRecords.map(x => x[tp.key] as number), 1)
                        const pct = (val / maxVal) * 100
                        return (
                          <div key={r.id} className="flex items-center gap-2">
                            <span className="text-[10px] text-muted-foreground w-20 shrink-0">{r.testDate.slice(5)}</span>
                            <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                              <div className={cn('h-full rounded-full transition-all',
                                trend === 'up' ? 'bg-green-400' : trend === 'down' ? 'bg-red-400' : 'bg-gray-400'
                              )} style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-xs font-mono w-12 text-right">{val}{tp.unit}</span>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {/* AI Trend Prediction */}
            <Card className="rounded-xl shadow-sm border border-gray-100 md:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-emerald-600" />
                  AI ভবিষ্যৎ পূর্বাভাস
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg border">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Zap className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-sm font-medium">pH</span>
                    </div>
                    <p className="text-xs text-muted-foreground">আগামী ৩ মাসে ৬.৫-৭.০ এর মধ্যে স্থিতিশীল থাকবে।</p>
                  </div>
                  <div className="p-3 rounded-lg border">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Zap className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-sm font-medium">জৈব পদার্থ</span>
                    </div>
                    <p className="text-xs text-muted-foreground">আগামী ৬ মাসে ৩.৫% ছাড়াতে পারে বর্তমান হারে উন্নতি হলে।</p>
                  </div>
                  <div className="p-3 rounded-lg border">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Zap className="w-3.5 h-3.5 text-orange-500" />
                      <span className="text-sm font-medium">বোরন</span>
                    </div>
                    <p className="text-xs text-muted-foreground">বোরন স্বাভাবিক স্তরে ফিরতে আরও ২-৩ মাস লাগতে পারে।</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* ========== Detail Dialog ========== */}
      <Dialog open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          {selectedRecord && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-lg">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  মাটির স্বাস্থ্য রিপোর্ট — {selectedRecord.recordNo}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                {/* General Info */}
                <div>
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    সাধারণ তথ্য
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                    <div><span className="text-muted-foreground">রেকর্ড নম্বর:</span> <span className="font-medium">{selectedRecord.recordNo}</span></div>
                    <div><span className="text-muted-foreground">পরীক্ষার তারিখ:</span> <span className="font-medium">{selectedRecord.testDate}</span></div>
                    <div><span className="text-muted-foreground">সময়:</span> <span className="font-medium">{selectedRecord.collectTime}</span></div>
                    <div><span className="text-muted-foreground">উৎস:</span> <Badge className={cn('text-xs', sourceColors[selectedRecord.source])}>{selectedRecord.sourceLabel}</Badge></div>
                    <div><span className="text-muted-foreground">জমি:</span> <span className="font-medium">{selectedRecord.landName}</span></div>
                    <div><span className="text-muted-foreground">GPS:</span> <span className="font-medium text-xs">{selectedRecord.gps}</span></div>
                    <div><span className="text-muted-foreground">মৌসুম:</span> <span className="font-medium">{selectedRecord.season}</span></div>
                    <div><span className="text-muted-foreground">অর্থবছর:</span> <span className="font-medium">{selectedRecord.fiscalYear}</span></div>
                  </div>
                </div>

                {/* Health Score */}
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className={cn('w-20 h-20 rounded-full flex items-center justify-center border-3 shrink-0',
                    selectedRecord.healthScore >= 70 ? 'border-green-400 bg-green-50' :
                    selectedRecord.healthScore >= 55 ? 'border-yellow-400 bg-yellow-50' :
                    'border-red-400 bg-red-50'
                  )}>
                    <span className={cn('text-2xl font-bold', getScoreColor(selectedRecord.healthScore))}>
                      {selectedRecord.healthScore}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={cn('text-xs', healthStatusConfig[selectedRecord.healthStatus].bg, healthStatusConfig[selectedRecord.healthStatus].color)}>
                        {selectedRecord.healthStatus}
                      </Badge>
                    </div>
                    <p className="text-sm">{selectedRecord.overallAssessment}</p>
                    <p className="text-xs text-orange-600 mt-1">প্রধান সমস্যা: {selectedRecord.mainProblem}</p>
                    <p className="text-xs text-emerald-600">অগ্রাধিকার: {selectedRecord.priorityAction}</p>
                  </div>
                </div>

                {/* Physical Properties */}
                <div>
                  <h3 className="text-sm font-semibold mb-2">মাটির ভৌত বৈশিষ্ট্য</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div className="p-2 bg-muted/30 rounded-lg"><span className="text-muted-foreground">আর্দ্রতা:</span> <span className="font-semibold">{selectedRecord.moisture}%</span></div>
                    <div className="p-2 bg-muted/30 rounded-lg"><span className="text-muted-foreground">তাপমাত্রা:</span> <span className="font-semibold">{selectedRecord.temperature}°C</span></div>
                    <div className="p-2 bg-muted/30 rounded-lg"><span className="text-muted-foreground">গঠন:</span> <span className="font-semibold">{selectedRecord.texture}</span></div>
                    <div className="p-2 bg-muted/30 rounded-lg"><span className="text-muted-foreground">কাঠামো:</span> <span className="font-semibold">{selectedRecord.structure}</span></div>
                    <div className="p-2 bg-muted/30 rounded-lg"><span className="text-muted-foreground">ঘনত্ব:</span> <span className="font-semibold">{selectedRecord.bulkDensity} g/cm³</span></div>
                    <div className="p-2 bg-muted/30 rounded-lg"><span className="text-muted-foreground">আবদ্ধতা:</span> <span className="font-semibold">{selectedRecord.compaction}</span></div>
                    <div className="p-2 bg-muted/30 rounded-lg"><span className="text-muted-foreground">পানি ধারণ:</span> <span className="font-semibold">{selectedRecord.waterCapacity}%</span></div>
                    <div className="p-2 bg-muted/30 rounded-lg"><span className="text-muted-foreground">ড্রেনেজ:</span> <span className="font-semibold">{selectedRecord.drainage}</span></div>
                  </div>
                </div>

                {/* Chemical Properties */}
                <div>
                  <h3 className="text-sm font-semibold mb-2">মাটির রাসায়নিক বৈশিষ্ট্য</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div className="p-2 bg-muted/30 rounded-lg"><span className="text-muted-foreground">pH:</span> <span className="font-semibold">{selectedRecord.ph}</span></div>
                    <div className="p-2 bg-muted/30 rounded-lg"><span className="text-muted-foreground">EC:</span> <span className="font-semibold">{selectedRecord.ec} dS/m</span></div>
                    <div className="p-2 bg-muted/30 rounded-lg"><span className="text-muted-foreground">জৈব পদার্থ:</span> <span className="font-semibold">{selectedRecord.organicMatter}%</span></div>
                    <div className="p-2 bg-muted/30 rounded-lg"><span className="text-muted-foreground">জৈব কার্বন:</span> <span className="font-semibold">{selectedRecord.organicCarbon}%</span></div>
                    <div className="p-2 bg-muted/30 rounded-lg"><span className="text-muted-foreground">নাইট্রোজেন:</span> <span className="font-semibold">{selectedRecord.nitrogen} কেজি/হে</span></div>
                    <div className="p-2 bg-muted/30 rounded-lg"><span className="text-muted-foreground">ফসফরাস:</span> <span className="font-semibold">{selectedRecord.phosphorus} কেজি/হে</span></div>
                    <div className="p-2 bg-muted/30 rounded-lg"><span className="text-muted-foreground">পটাশিয়াম:</span> <span className="font-semibold">{selectedRecord.potassium} কেজি/হে</span></div>
                    <div className="p-2 bg-muted/30 rounded-lg"><span className="text-muted-foreground">সালফার:</span> <span className="font-semibold">{selectedRecord.sulfur} কেজি/হে</span></div>
                    <div className="p-2 bg-muted/30 rounded-lg"><span className="text-muted-foreground">ক্যালসিয়াম:</span> <span className="font-semibold">{selectedRecord.calcium} কেজি/হে</span></div>
                    <div className="p-2 bg-muted/30 rounded-lg"><span className="text-muted-foreground">ম্যাগনেসিয়াম:</span> <span className="font-semibold">{selectedRecord.magnesium} কেজি/হে</span></div>
                    <div className="p-2 bg-muted/30 rounded-lg"><span className="text-muted-foreground">জিংক:</span> <span className="font-semibold">{selectedRecord.zinc} পিপিএম</span></div>
                    <div className="p-2 bg-muted/30 rounded-lg"><span className="text-muted-foreground">বোরন:</span> <span className="font-semibold">{selectedRecord.boron} পিপিএম</span></div>
                    <div className="p-2 bg-muted/30 rounded-lg"><span className="text-muted-foreground">আয়রন:</span> <span className="font-semibold">{selectedRecord.iron} পিপিএম</span></div>
                    <div className="p-2 bg-muted/30 rounded-lg"><span className="text-muted-foreground">কপার:</span> <span className="font-semibold">{selectedRecord.copper} পিপিএম</span></div>
                    <div className="p-2 bg-muted/30 rounded-lg"><span className="text-muted-foreground">ম্যাঙ্গানিজ:</span> <span className="font-semibold">{selectedRecord.manganese} পিপিএম</span></div>
                  </div>
                </div>

                {/* Comments & AI Analysis */}
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="text-xs font-semibold text-blue-800 mb-1 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" /> কৃষি কর্মকর্তার মন্তব্য
                    </h4>
                    <p className="text-xs text-blue-700">{selectedRecord.officerComment}</p>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <h4 className="text-xs font-semibold text-emerald-800 mb-1 flex items-center gap-1">
                      <BrainCircuit className="w-3.5 h-3.5" /> AI বিশ্লেষণ
                    </h4>
                    <p className="text-xs text-emerald-700">{selectedRecord.aiAnalysis}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}