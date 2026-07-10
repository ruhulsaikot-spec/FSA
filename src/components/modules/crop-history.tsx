'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import {
  History,
  CalendarDays,
  TableProperties,
  TrendingUp,
  Filter,
  Download,
  Eye,
  Sprout,
  Wheat,
  X,
  MapPin,
  Landmark,
  Clock,
  Leaf,
  Scale,
  BadgeDollarSign,
  Truck,
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const cropHistoryData = [
  { id: 1, year: '২০২৫', season: 'বোরো', farmName: 'উত্তর জমি', location: 'রাজশাহী', area: '২.৫ একর', crop: 'ধান', variety: 'ব্রি-৮৯', seedSource: 'বিএডিএ', sowDate: '১৫ ডিসেম্বর ২০২৪', germDate: '২২ ডিসেম্বর ২০২৪', transplantDate: '১০ জানুয়ারি ২০২৫', flowerDate: '২৫ ফেব্রুয়ারি ২০২৫', harvestDate: '২০ এপ্রিল ২০২৫', collectDate: '২৫ এপ্রিল ২০২৫', expectedYield: '৫.২ টন', actualYield: '৪.৬ টন', totalProduced: '১১.৫ টন', soldQty: '৯.৫ টন', selfUse: '২.০ টন', totalCost: '৪৫,০০০ টাকা', salePrice: '৮৫,৫০০ টাকা', totalIncome: '৮৫,৫০০ টাকা', profit: '৪০,৫০০ টাকা', successRate: 88 },
  { id: 2, year: '২০২৫', season: 'খরিফ-১', farmName: 'উত্তর জমি', location: 'রাজশাহী', area: '২.৫ একর', crop: 'পেঁয়াজ', variety: 'বারি পেঁয়াজ-৪', seedSource: 'নিজস্ব', sowDate: '০১ নভেম্বর ২০২৪', germDate: '০৭ নভেম্বর ২০২৪', transplantDate: '২৫ নভেম্বর ২০২৪', flowerDate: '১৫ জানুয়ারি ২০২৫', harvestDate: '২৮ ফেব্রুয়ারি ২০২৫', collectDate: '০৫ মার্চ ২০২৫', expectedYield: '১২ টন', actualYield: '১০.৫ টন', totalProduced: '২৬.২ টন', soldQty: '২৪ টন', selfUse: '২.২ টন', totalCost: '৬২,০০০ টাকা', salePrice: '১,৮০,০০০ টাকা', totalIncome: '১,৮০,০০০ টাকা', profit: '১,১৮,০০০ টাকা', successRate: 87 },
  { id: 3, year: '২০২৪', season: 'আমন', farmName: 'উত্তর জমি', location: 'রাজশাহী', area: '২.৫ একর', crop: 'ধান', variety: 'ব্রি-৪৭', seedSource: 'বিএডিএ', sowDate: '১০ জুলাই ২০২৪', germDate: '১৭ জুলাই ২০২৪', transplantDate: '০৫ আগস্ট ২০২৪', flowerDate: '২০ সেপ্টেম্বর ২০২৪', harvestDate: '১৫ নভেম্বর ২০২৪', collectDate: '২০ নভেম্বর ২০২৪', expectedYield: '৪.৮ টন', actualYield: '৪.২ টন', totalProduced: '১০.৫ টন', soldQty: '৮.০ টন', selfUse: '২.৫ টন', totalCost: '৪০,০০০ টাকা', salePrice: '৭২,০০০ টাকা', totalIncome: '৭২,০০০ টাকা', profit: '৩২,০০০ টাকা', successRate: 87 },
  { id: 4, year: '২০২৪', season: 'রবি', farmName: 'দক্ষিণ জমি', location: 'রাজশাহী', area: '৩.০ একর', crop: 'সরিষা', variety: 'টরি-৭', seedSource: 'বিএআরসি', sowDate: '১৫ অক্টোবর ২০২৩', germDate: '২২ অক্টোবর ২০২৩', transplantDate: '-', flowerDate: '২০ ডিসেম্বর ২০২৩', harvestDate: '১৫ ফেব্রুয়ারি ২০২৪', collectDate: '২০ ফেব্রুয়ারি ২০২৪', expectedYield: '১.৮ টন', actualYield: '১.৫ টন', totalProduced: '৪.৫ টন', soldQty: '৪.০ টন', selfUse: '০.৫ টন', totalCost: '২২,০০০ টাকা', salePrice: '৫৪,০০০ টাকা', totalIncome: '৫৪,০০০ টাকা', profit: '৩২,০০০ টাকা', successRate: 83 },
  { id: 5, year: '২০২৪', season: 'খরিফ-২', farmName: 'দক্ষিণ জমি', location: 'রাজশাহী', area: '৩.০ একর', crop: 'মুগ ডাল', variety: 'বারি মুগ-৬', seedSource: 'বিএডিএ', sowDate: '১৫ মার্চ ২০২৪', germDate: '২০ মার্চ ২০২৪', transplantDate: '-', flowerDate: '২৫ এপ্রিল ২০২৪', harvestDate: '২০ মে ২০২৪', collectDate: '২৫ মে ২০২৪', expectedYield: '১.২ টন', actualYield: '১.১ টন', totalProduced: '৩.৩ টন', soldQty: '২.৮ টন', selfUse: '০.৫ টন', totalCost: '১৮,০০০ টাকা', salePrice: '৬৬,০০০ টাকা', totalIncome: '৬৬,০০০ টাকা', profit: '৪৮,০০০ টাকা', successRate: 91 },
]

const activityHistory = [
  { date: '১২ জানুয়ারি ২০২৫', type: 'সার', detail: 'ইউরিয়া ২৫ কেজ/বিঘা প্রয়োগ', officer: 'আহমেদ কবীর' },
  { date: '২৫ জানুয়ারি ২০২৫', type: 'সেচ', detail: 'প্রথম সেচ — ৩ ইঞ্চি পানি', officer: '-' },
  { date: '০৫ ফেব্রুয়ারি ২০২৫', type: 'কীটনাশক', detail: 'ইমিডাক্লোপ্রিড প্রয়োগ', officer: 'আহমেদ কবীর' },
  { date: '১০ ফেব্রুয়ারি ২০২৫', type: 'পরিদর্শন', detail: 'কৃষি কর্মকর্তার পরিদর্শন', officer: 'আহমেদ কবীর' },
  { date: '১৫ ফেব্রুয়ারি ২০২৫', type: 'সার', detail: 'এমওপি ১০ কেজ/বিঘা প্রয়োগ', officer: 'আহমেদ কবীর' },
  { date: '২০ ফেব্রুয়ারি ২০২৫', type: 'সেচ', detail: 'দ্বিতীয় সেচ — ২.৫ ইঞ্চি পানি', officer: '-' },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const seasonColor: Record<string, string> = {
  'বোরো': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'খরিফ-১': 'bg-amber-100 text-amber-700 border-amber-200',
  'খরিফ-২': 'bg-orange-100 text-orange-700 border-orange-200',
  'আমন': 'bg-sky-100 text-sky-700 border-sky-200',
  'রবি': 'bg-violet-100 text-violet-700 border-violet-200',
  'আউশ': 'bg-lime-100 text-lime-700 border-lime-200',
}

const seasonDot: Record<string, string> = {
  'বোরো': 'bg-emerald-500',
  'খরিফ-১': 'bg-amber-500',
  'খরিফ-২': 'bg-orange-500',
  'আমন': 'bg-sky-500',
  'রবি': 'bg-violet-500',
  'আউশ': 'bg-lime-500',
}

const seasonLine: Record<string, string> = {
  'বোরো': 'border-emerald-400',
  'খরিফ-১': 'border-amber-400',
  'খরিফ-২': 'border-orange-400',
  'আমন': 'border-sky-400',
  'রবি': 'border-violet-400',
  'আউশ': 'border-lime-400',
}

function successBadge(rate: number) {
  if (rate >= 90) return 'bg-green-100 text-green-700 border-green-200'
  if (rate >= 80) return 'bg-yellow-100 text-yellow-700 border-yellow-200'
  return 'bg-red-100 text-red-700 border-red-200'
}

const activityTypeBadge: Record<string, string> = {
  'সার': 'bg-green-100 text-green-700',
  'সেচ': 'bg-blue-100 text-blue-700',
  'কীটনাশক': 'bg-red-100 text-red-700',
  'পরিদর্শন': 'bg-purple-100 text-purple-700',
}

/* months for calendar view */
const bengaliMonths = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর',
]

/* Map crop season to active months (0-indexed) */
const seasonMonths: Record<string, number[]> = {
  'রবি': [9, 10, 11, 0, 1],       // Oct - Feb
  'বোরো': [11, 0, 1, 2, 3],        // Dec - Apr
  'আউশ': [2, 3, 4, 5, 6],          // Mar - Jul
  'খরিফ-১': [9, 10, 11, 0, 1],    // Nov - Mar
  'আমন': [6, 7, 8, 9, 10],        // Jul - Nov
  'খরিফ-২': [2, 3, 4, 5],         // Mar - Jun
}

const seasonCalendarBg: Record<string, string> = {
  'রবি': 'bg-violet-100 border-violet-300 text-violet-800',
  'বোরো': 'bg-emerald-100 border-emerald-300 text-emerald-800',
  'আউশ': 'bg-lime-100 border-lime-300 text-lime-800',
  'খরিফ-১': 'bg-amber-100 border-amber-300 text-amber-800',
  'আমন': 'bg-sky-100 border-sky-300 text-sky-800',
  'খরিফ-২': 'bg-orange-100 border-orange-300 text-orange-800',
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function CropHistory() {
  const { setView } = useAppStore()
  const [yearFilter, setYearFilter] = useState('সব')
  const [seasonFilter, setSeasonFilter] = useState('সব মৌসুম')
  const [farmFilter, setFarmFilter] = useState('সব জমি')
  const [selectedCrop, setSelectedCrop] = useState<(typeof cropHistoryData)[0] | null>(null)

  const filtered = useMemo(() => {
    return cropHistoryData.filter((c) => {
      if (yearFilter !== 'সব' && c.year !== yearFilter) return false
      if (seasonFilter !== 'সব মৌসুম' && c.season !== seasonFilter) return false
      if (farmFilter !== 'সব জমি' && c.farmName !== farmFilter) return false
      return true
    })
  }, [yearFilter, seasonFilter, farmFilter])

  const farms = useMemo(
    () => [...new Set(cropHistoryData.map((c) => c.farmName))],
    [],
  )

  /* Season analysis summary */
  const seasonSummary = useMemo(() => {
    const map = new Map<string, (typeof cropHistoryData)[]>()
    filtered.forEach((c) => {
      const list = map.get(c.season) || []
      list.push(c)
      map.set(c.season, list)
    })
    return Array.from(map.entries()).map(([season, items]) => {
      const avgSuccess = Math.round(items.reduce((s, i) => s + i.successRate, 0) / items.length)
      const totalProfit = items.reduce((s, i) => {
        const num = i.profit.replace(/[^\d]/g, '')
        return s + (Number(num) || 0)
      }, 0)
      const best = items.reduce((a, b) => (b.successRate > a.successRate ? b : a))
      return { season, count: items.length, avgSuccess, totalProfit, bestCrop: best.crop, items }
    })
  }, [filtered])

  const maxExpected = Math.max(...cropHistoryData.map((c) => parseFloat(c.expectedYield)))

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto space-y-6">
      {/* ---------- Header ---------- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center">
            <History className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">ফসলের ইতিহাস</h1>
            <p className="text-sm text-muted-foreground">মৌসুমভিত্তিক ফসল উৎপাদনের পূর্ণাঙ্গ ইতিহাস</p>
          </div>
        </div>
        <Button variant="outline" className="gap-2 w-fit">
          <Download className="h-4 w-4" />
          রিপোর্ট ডাউনলোড
        </Button>
      </div>

      {/* ---------- Filter Bar ---------- */}
      <Card className="rounded-xl shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Filter className="h-4 w-4" />
              ফিল্টার:
            </div>
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="শালা" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="সব">সব বছর</SelectItem>
                <SelectItem value="২০২৫">২০২৫</SelectItem>
                <SelectItem value="২০২৪">২০২৪</SelectItem>
              </SelectContent>
            </Select>
            <Select value={seasonFilter} onValueChange={setSeasonFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="মৌসুম" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="সব মৌসুম">সব মৌসুম</SelectItem>
                <SelectItem value="রবি">রবি</SelectItem>
                <SelectItem value="খরিফ-১">খরিফ-১</SelectItem>
                <SelectItem value="খরিফ-২">খরিফ-২</SelectItem>
                <SelectItem value="বোরো">বোরো</SelectItem>
                <SelectItem value="আমন">আমন</SelectItem>
                <SelectItem value="আউশ">আউশ</SelectItem>
              </SelectContent>
            </Select>
            <Select value={farmFilter} onValueChange={setFarmFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="জমি" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="সব জমি">সব জমি</SelectItem>
                {farms.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* ---------- Tabs ---------- */}
      <Tabs defaultValue="timeline" className="space-y-4">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/60 p-1">
          <TabsTrigger value="timeline" className="gap-1.5 text-xs sm:text-sm">
            <Clock className="h-3.5 w-3.5" /> টাইমলাইন ভিউ
          </TabsTrigger>
          <TabsTrigger value="table" className="gap-1.5 text-xs sm:text-sm">
            <TableProperties className="h-3.5 w-3.5" /> টেবিল ভিউ
          </TabsTrigger>
          <TabsTrigger value="calendar" className="gap-1.5 text-xs sm:text-sm">
            <CalendarDays className="h-3.5 w-3.5" /> ক্যালেন্ডার ভিউ
          </TabsTrigger>
          <TabsTrigger value="analysis" className="gap-1.5 text-xs sm:text-sm">
            <TrendingUp className="h-3.5 w-3.5" /> মৌসুমভিত্তিক বিশ্লেষণ
          </TabsTrigger>
          <TabsTrigger value="activity" className="gap-1.5 text-xs sm:text-sm">
            <Sprout className="h-3.5 w-3.5" /> কৃষি কর্মক্রম
          </TabsTrigger>
        </TabsList>

        {/* ==================== 1. TIMELINE VIEW ==================== */}
        <TabsContent value="timeline">
          <Card className="rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald-600" />
                ফসল উৎপাদনের টাইমলাইন
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-6">
              {filtered.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">কোনো তথ্য পাওয়া যায়নি</p>
              ) : (
                <div className="relative pl-8">
                  {/* vertical line */}
                  <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-border" />
                  <div className="space-y-6">
                    {filtered.map((crop, idx) => {
                      const profitNum = parseFloat(crop.profit.replace(/[^\d.]/g, ''))
                      const isGood = profitNum >= 40000
                      return (
                        <div key={crop.id} className="relative flex gap-4">
                          {/* dot */}
                          <div
                            className={cn(
                              'absolute -left-8 top-1.5 h-6 w-6 rounded-full border-2 border-background flex items-center justify-center z-10',
                              isGood ? 'bg-green-500' : 'bg-orange-500',
                            )}
                          >
                            <div className="h-2 w-2 rounded-full bg-white" />
                          </div>
                          {/* card */}
                          <Card
                            className={cn(
                              'flex-1 rounded-xl border transition-shadow hover:shadow-md cursor-pointer',
                              seasonColor[crop.season]?.replace(/text-\S+/, '').replace(/bg-\S+/, '') || '',
                            )}
                            onClick={() => setSelectedCrop(crop)}
                          >
                            <CardContent className="p-4">
                              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Badge variant="outline" className={seasonColor[crop.season]}>
                                    {crop.season} — {crop.year}
                                  </Badge>
                                  <span className="font-semibold text-foreground flex items-center gap-1">
                                    <Sprout className="h-4 w-4 text-emerald-500" />
                                    {crop.crop}
                                  </span>
                                  <span className="text-sm text-muted-foreground">({crop.variety})</span>
                                </div>
                                <Badge className={isGood ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}>
                                  {crop.profit}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                  <CalendarDays className="h-3.5 w-3.5" />
                                  বপন: {crop.sowDate}
                                </div>
                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                  <Wheat className="h-3.5 w-3.5" />
                                  কাটা: {crop.harvestDate}
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                                  <span className="font-medium">{crop.totalProduced} উৎপাদন</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ==================== 2. TABLE VIEW ==================== */}
        <TabsContent value="table">
          <Card className="rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <TableProperties className="h-5 w-5 text-emerald-600" />
                ফসলের তথ্য সারণি
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="py-3 px-3 font-medium">মৌসুম</th>
                      <th className="py-3 px-3 font-medium">ফসল</th>
                      <th className="py-3 px-3 font-medium">জাত</th>
                      <th className="py-3 px-3 font-medium">বপন</th>
                      <th className="py-3 px-3 font-medium">ফসল কাটা</th>
                      <th className="py-3 px-3 font-medium text-right">প্রত্যাশিত ফলন</th>
                      <th className="py-3 px-3 font-medium text-right">প্রকৃত ফলন</th>
                      <th className="py-3 px-3 font-medium text-center">সফলতা</th>
                      <th className="py-3 px-3 font-medium text-right">মোট আয়</th>
                      <th className="py-3 px-3 font-medium text-right">লাভ</th>
                      <th className="py-3 px-3 font-medium text-center">বিস্তারিত</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((c, i) => (
                      <tr
                        key={c.id}
                        className={cn(
                          'border-b hover:bg-muted/50 transition-colors cursor-pointer',
                          i % 2 === 0 ? 'bg-background' : 'bg-muted/20',
                        )}
                        onClick={() => setSelectedCrop(c)}
                      >
                        <td className="py-3 px-3">
                          <Badge variant="outline" className={seasonColor[c.season]}>
                            {c.season}
                          </Badge>
                        </td>
                        <td className="py-3 px-3 font-medium">{c.crop}</td>
                        <td className="py-3 px-3 text-muted-foreground">{c.variety}</td>
                        <td className="py-3 px-3 text-muted-foreground text-xs">{c.sowDate}</td>
                        <td className="py-3 px-3 text-muted-foreground text-xs">{c.harvestDate}</td>
                        <td className="py-3 px-3 text-right">{c.expectedYield}</td>
                        <td className="py-3 px-3 text-right font-medium">{c.actualYield}</td>
                        <td className="py-3 px-3 text-center">
                          <Badge variant="outline" className={successBadge(c.successRate)}>
                            {c.successRate}%
                          </Badge>
                        </td>
                        <td className="py-3 px-3 text-right font-medium text-emerald-600">{c.totalIncome}</td>
                        <td className="py-3 px-3 text-right font-semibold">{c.profit}</td>
                        <td className="py-3 px-3 text-center">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setSelectedCrop(c)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <p className="text-center text-muted-foreground py-12">কোনো তথ্য পাওয়া যায়নি</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ==================== 3. CALENDAR VIEW ==================== */}
        <TabsContent value="calendar">
          <Card className="rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-emerald-600" />
                মৌসুমভিত্তিক ক্যালেন্ডার
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-6">
              {/* Legend */}
              <div className="flex flex-wrap gap-2 mb-4">
                {Object.entries(seasonColor).map(([s, cls]) => (
                  <Badge key={s} variant="outline" className={cls}>
                    {s}
                  </Badge>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="overflow-x-auto">
                <div className="min-w-[700px]">
                  {/* Header row with months */}
                  <div className="grid grid-cols-12 gap-1 mb-1">
                    {bengaliMonths.map((m) => (
                      <div key={m} className="text-center text-xs font-medium text-muted-foreground py-1">
                        {m}
                      </div>
                    ))}
                  </div>
                  {/* Rows for each filtered crop */}
                  {filtered.map((c) => (
                    <div key={c.id} className="mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className={seasonColor[c.season]}>
                          {c.season}
                        </Badge>
                        <span className="text-sm font-medium">
                          {c.crop} ({c.variety}) — {c.year}
                        </span>
                      </div>
                      <div className="grid grid-cols-12 gap-1">
                        {bengaliMonths.map((m, mi) => {
                          const active = (seasonMonths[c.season] || []).includes(mi)
                          return (
                            <div
                              key={mi}
                              className={cn(
                                'h-10 rounded-md border text-center text-xs flex items-center justify-center transition-colors',
                                active
                                  ? seasonCalendarBg[c.season] || 'bg-muted border-border text-muted-foreground'
                                  : 'bg-background border-border/50 text-transparent',
                              )}
                            >
                              {active ? c.crop : ''}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                  {filtered.length === 0 && (
                    <p className="text-center text-muted-foreground py-12">কোনো তথ্য পাওয়া যায়নি</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ==================== 4. SEASON ANALYSIS ==================== */}
        <TabsContent value="analysis">
          <div className="space-y-4">
            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="rounded-xl shadow-sm">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">মোট মৌসুম</p>
                  <p className="text-2xl font-bold">{seasonSummary.length}</p>
                </CardContent>
              </Card>
              <Card className="rounded-xl shadow-sm">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">গড় সফলতার হার</p>
                  <p className="text-2xl font-bold text-emerald-600">
                    {seasonSummary.length
                      ? Math.round(seasonSummary.reduce((s, d) => s + d.avgSuccess, 0) / seasonSummary.length)
                      : 0}
                    %
                  </p>
                </CardContent>
              </Card>
              <Card className="rounded-xl shadow-sm">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">মোট লাভ</p>
                  <p className="text-2xl font-bold">
                    ৳{seasonSummary.reduce((s, d) => s + d.totalProfit, 0).toLocaleString('bn-BD')}
                  </p>
                </CardContent>
              </Card>
              <Card className="rounded-xl shadow-sm">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">সর্বোচ্চ সফল ফসল</p>
                  <p className="text-lg font-bold text-amber-600">
                    {seasonSummary.length
                      ? seasonSummary.reduce((a, b) => (a.avgSuccess > b.avgSuccess ? a : b)).bestCrop
                      : '-'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Per-season detail cards with bar chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {seasonSummary.map((s) => (
                <Card key={s.season} className="rounded-xl shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <div className={cn('h-3 w-3 rounded-full', seasonDot[s.season])} />
                      {s.season}
                      <Badge variant="outline" className="ml-auto">{s.count} মৌসুম</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pb-4">
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">গড় সফলতা</p>
                        <p className="font-semibold">{s.avgSuccess}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">মোট লাভ</p>
                        <p className="font-semibold text-emerald-600">৳{s.totalProfit.toLocaleString('bn-BD')}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">সেরা ফসল</p>
                        <p className="font-semibold">{s.bestCrop}</p>
                      </div>
                    </div>
                    {/* Bar chart comparing yields */}
                    <div className="space-y-2 pt-2">
                      {s.items.map((item) => {
                        const expected = parseFloat(item.expectedYield)
                        const actual = parseFloat(item.actualYield)
                        return (
                          <div key={item.id} className="space-y-1">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{item.crop} ({item.year})</span>
                              <span>{item.expectedYield} → {item.actualYield}</span>
                            </div>
                            <div className="flex gap-1 items-center">
                              <div className="flex-1 h-5 bg-muted rounded-md overflow-hidden">
                                <div
                                  className="h-full bg-blue-400 rounded-md flex items-center justify-end pr-1"
                                  style={{ width: `${(expected / maxExpected) * 100}%` }}
                                >
                                  <span className="text-[10px] text-white font-medium">প্রত্যাশিত</span>
                                </div>
                              </div>
                              <div className="flex-1 h-5 bg-muted rounded-md overflow-hidden">
                                <div
                                  className="h-full bg-emerald-500 rounded-md flex items-center justify-end pr-1"
                                  style={{ width: `${(actual / maxExpected) * 100}%` }}
                                >
                                  <span className="text-[10px] text-white font-medium">প্রকৃত</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {seasonSummary.length === 0 && (
              <Card className="rounded-xl shadow-sm">
                <CardContent className="py-12 text-center text-muted-foreground">
                  কোনো তথ্য পাওয়া যায়নি
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* ==================== 5. ACTIVITY HISTORY ==================== */}
        <TabsContent value="activity">
          <Card className="rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sprout className="h-5 w-5 text-emerald-600" />
                কৃষি কর্মক্রম ইতিহাস
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="py-3 px-3 font-medium">তারিখ</th>
                      <th className="py-3 px-3 font-medium">ধরন</th>
                      <th className="py-3 px-3 font-medium">বিবরণ</th>
                      <th className="py-3 px-3 font-medium">কর্মকর্তা</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activityHistory.map((a, i) => (
                      <tr
                        key={i}
                        className={cn(
                          'border-b transition-colors',
                          i % 2 === 0 ? 'bg-background' : 'bg-muted/20',
                        )}
                      >
                        <td className="py-3 px-3 whitespace-nowrap">{a.date}</td>
                        <td className="py-3 px-3">
                          <Badge className={activityTypeBadge[a.type] || ''}>{a.type}</Badge>
                        </td>
                        <td className="py-3 px-3">{a.detail}</td>
                        <td className="py-3 px-3 text-muted-foreground">{a.officer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ==================== DETAIL DIALOG ==================== */}
      <Dialog open={!!selectedCrop} onOpenChange={() => setSelectedCrop(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedCrop && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Sprout className="h-5 w-5 text-emerald-600" />
                  {selectedCrop.crop} — {selectedCrop.season} {selectedCrop.year}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-2">
                {/* General info */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                    <Leaf className="h-4 w-4" /> সাধারণ তথ্য
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      ['জমি', selectedCrop.farmName],
                      ['অবস্থান', selectedCrop.location],
                      ['জমির পরিমাণ', selectedCrop.area],
                      ['ফসল', selectedCrop.crop],
                      ['জাত', selectedCrop.variety],
                      ['বীজের উৎস', selectedCrop.seedSource],
                    ].map(([label, val]) => (
                      <div key={label} className="bg-muted/50 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">{label}</p>
                        <p className="text-sm font-medium">{val}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Production info */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                    <Wheat className="h-4 w-4" /> উৎপাদন তথ্য
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      ['বপনের তারিখ', selectedCrop.sowDate],
                      ['অঙ্কুরোদ্গম', selectedCrop.germDate],
                      ['রোপণ', selectedCrop.transplantDate],
                      ['ফুল আসা', selectedCrop.flowerDate],
                      ['ফসল কাটা', selectedCrop.harvestDate],
                      ['সংগ্রহ', selectedCrop.collectDate],
                    ].map(([label, val]) => (
                      <div key={label} className="bg-muted/50 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">{label}</p>
                        <p className="text-sm font-medium">{val}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Yield info */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                    <Scale className="h-4 w-4" /> ফলন তথ্য
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      ['প্রত্যাশিত ফলন', selectedCrop.expectedYield],
                      ['প্রকৃত ফলন', selectedCrop.actualYield],
                      ['মোট উৎপাদন', selectedCrop.totalProduced],
                      ['সফলতার হার', `${selectedCrop.successRate}%`],
                    ].map(([label, val]) => (
                      <div key={label} className="bg-muted/50 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">{label}</p>
                        <p className="text-sm font-semibold">{val}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <Progress value={selectedCrop.successRate} className="h-2" />
                  </div>
                </div>

                {/* Cost breakdown */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                    <BadgeDollarSign className="h-4 w-4" /> আর্থিক তথ্য
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      ['মোট খরচ', selectedCrop.totalCost],
                      ['বিক্রয় পরিমাণ', selectedCrop.soldQty],
                      ['নিজ ব্যবহার', selectedCrop.selfUse],
                      ['বিক্রয় মূল্য', selectedCrop.salePrice],
                      ['মোট আয়', selectedCrop.totalIncome],
                      ['লাভ', selectedCrop.profit],
                    ].map(([label, val]) => (
                      <div key={label} className="bg-muted/50 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">{label}</p>
                        <p className={cn('text-sm font-semibold', label === 'লাভ' ? 'text-emerald-600' : '')}>{val}</p>
                      </div>
                    ))}
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