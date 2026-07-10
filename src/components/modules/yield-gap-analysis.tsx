'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Brain,
  Sprout,
  ArrowRight,
  Target,
  Zap,
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const yieldData = [
  { season: 'বোরো ২০২৫', crop: 'ধান (ব্রি-৮৯)', expected: 5.2, actual: 4.6, area: '২.৫ একর', successRate: 88 },
  { season: 'খরিফ-১ ২০২৫', crop: 'পেঁয়াজ (বারি-৪)', expected: 12, actual: 10.5, area: '২.৫ একর', successRate: 87 },
  { season: 'আমন ২০২৪', crop: 'ধান (ব্রি-৪৭)', expected: 4.8, actual: 4.2, area: '২.৫ একর', successRate: 87 },
  { season: 'রবি ২০২৪', crop: 'সরিষা (টরি-৭)', expected: 1.8, actual: 1.5, area: '৩.০ একর', successRate: 83 },
  { season: 'খরিফ-২ ২০২৪', crop: 'মুগ ডাল (বারি-৬)', expected: 1.2, actual: 1.1, area: '৩.০ একর', successRate: 91 },
]

const aiCauses = [
  { cause: 'মাটির পুষ্টির ঘাটতি', impact: 25, recommendation: 'ইউরিয়া ৩০ কেজ/বিঘা এবং এমওপি ১৫ কেজ/বিঘা প্রয়োগ করুন', severity: 'high' },
  { cause: 'অপর্যাপ্ত সেচ', impact: 20, recommendation: 'সময়মতো ৩ ইঞ্চি সেচ নিশ্চিত করুন', severity: 'high' },
  { cause: 'রোগের আক্রমণ', impact: 15, recommendation: 'প্রতিরোধমূলক ছত্রাকনাশক প্রয়োগ করুন', severity: 'medium' },
  { cause: 'অতিরিক্ত বৃষ্টিপাত', impact: 10, recommendation: 'Drainsystem উন্নত করুন', severity: 'medium' },
  { cause: 'জলবায়ুগত প্রভাব', impact: 8, recommendation: 'আগামী মৌসুমে আবহাওয়া অনুযায়ী সময় নির্ধারণ করুন', severity: 'low' },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const severityConfig: Record<string, { label: string; badge: string; bar: string }> = {
  high: { label: 'উচ্চ', badge: 'bg-red-100 text-red-700 border-red-200', bar: 'bg-red-500' },
  medium: { label: 'মাঝারি', badge: 'bg-orange-100 text-orange-700 border-orange-200', bar: 'bg-orange-500' },
  low: { label: 'কম', badge: 'bg-yellow-100 text-yellow-700 border-yellow-200', bar: 'bg-yellow-500' },
}

function successBadge(rate: number) {
  if (rate >= 90) return 'bg-green-100 text-green-700 border-green-200'
  if (rate >= 80) return 'bg-yellow-100 text-yellow-700 border-yellow-200'
  return 'bg-red-100 text-red-700 border-red-200'
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function YieldGapAnalysis() {
  const {} = useAppStore()

  const totalGap = useMemo(
    () => yieldData.reduce((s, d) => s + (d.expected - d.actual), 0),
    [],
  )
  const avgSuccess = useMemo(
    () => Math.round(yieldData.reduce((s, d) => s + d.successRate, 0) / yieldData.length),
    [],
  )
  const bestCrop = useMemo(
    () => yieldData.reduce((a, b) => (b.successRate > a.successRate ? b : a)),
    [],
  )
  const maxVal = useMemo(
    () => Math.max(...yieldData.map((d) => d.expected)),
    [],
  )

  /* trend data: simulated improvement trajectory */
  const trendData = [72, 78, 82, 85, 87]
  const trendLabels = ['আমন ২৩', 'রবি ২৪', 'খরিফ-২ ২৪', 'আমন ২৪', 'খরিফ-১ ২৫']
  const trendMax = 100

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto space-y-6">
      {/* ---------- Header ---------- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">উৎপাদন ব্যবধান বিশ্লেষণ</h1>
            <p className="text-sm text-muted-foreground">প্রত্যাশিত ও প্রকৃত উৎপাদনের তুলনামূলক বিশ্লেষণ</p>
          </div>
        </div>
        <Button variant="outline" className="gap-2 w-fit">
          <BarChart3 className="h-4 w-4" />
          বিশ্লেষণ রিপোর্ট
        </Button>
      </div>

      {/* ==================== Section 1 — Summary Cards ==================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Target className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">মোট মৌসুম</p>
              <p className="text-2xl font-bold">{yieldData.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-sky-100 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-5 w-5 text-sky-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">গড় সফলতা</p>
              <p className="text-2xl font-bold text-sky-600">{avgSuccess}%</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">মোট উৎপাদন ব্যবধান</p>
              <p className="text-2xl font-bold text-red-500">{totalGap.toFixed(1)} টন/একর</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Sprout className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">সর্বোচ্চ লাভের ফসল</p>
              <p className="text-lg font-bold text-amber-600">{bestCrop.crop}</p>
              <p className="text-xs text-muted-foreground">{bestCrop.season} — {bestCrop.successRate}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ==================== Section 2 — Comparison Chart ==================== */}
      <Card className="rounded-xl shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-600" />
            প্রত্যাশিত বনাম প্রকৃত উৎপাদন
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-6 space-y-5">
          {/* Legend */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-sm bg-blue-500" />
              <span className="text-muted-foreground">প্রত্যাশিত</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-sm bg-emerald-500" />
              <span className="text-muted-foreground">প্রকৃত</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-sm bg-red-300" />
              <span className="text-muted-foreground">ব্যবধান</span>
            </div>
          </div>

          {yieldData.map((d) => {
            const gap = d.expected - d.actual
            const gapPct = ((gap / d.expected) * 100).toFixed(1)
            return (
              <div key={d.season} className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{d.season}</span>
                    <span className="text-xs text-muted-foreground">— {d.crop}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {gap > 0 && (
                      <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 text-xs gap-1">
                        <TrendingDown className="h-3 w-3" />
                        {gap.toFixed(1)} টন ({gapPct}%)
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Expected bar */}
                  <div className="flex-1">
                    <div className="h-8 bg-muted rounded-lg overflow-hidden relative">
                      <div
                        className="h-full bg-blue-500 rounded-lg flex items-center justify-end pr-2 transition-all"
                        style={{ width: `${(d.expected / maxVal) * 100}%` }}
                      >
                        <span className="text-xs text-white font-medium">{d.expected} টন</span>
                      </div>
                    </div>
                  </div>
                  {/* Actual bar */}
                  <div className="flex-1">
                    <div className="h-8 bg-muted rounded-lg overflow-hidden relative">
                      <div
                        className="h-full bg-emerald-500 rounded-lg flex items-center justify-end pr-2 transition-all"
                        style={{ width: `${(d.actual / maxVal) * 100}%` }}
                      >
                        <span className="text-xs text-white font-medium">{d.actual} টন</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* ==================== Section 3 — Detailed Table ==================== */}
      <Card className="rounded-xl shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-600" />
            বিস্তারিত তুলনামূলক সারণি
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="py-3 px-3 font-medium">মৌসুম</th>
                  <th className="py-3 px-3 font-medium">ফসল</th>
                  <th className="py-3 px-3 font-medium">জমি</th>
                  <th className="py-3 px-3 font-medium text-right">প্রত্যাশিত (টন/একর)</th>
                  <th className="py-3 px-3 font-medium text-right">প্রকৃত (টন/একর)</th>
                  <th className="py-3 px-3 font-medium text-right">ব্যবধান</th>
                  <th className="py-3 px-3 font-medium text-center">সফলতার হার</th>
                </tr>
              </thead>
              <tbody>
                {yieldData.map((d, i) => {
                  const gap = d.expected - d.actual
                  return (
                    <tr
                      key={d.season}
                      className={cn(
                        'border-b hover:bg-muted/50 transition-colors',
                        i % 2 === 0 ? 'bg-background' : 'bg-muted/20',
                      )}
                    >
                      <td className="py-3 px-3 font-medium">{d.season}</td>
                      <td className="py-3 px-3">{d.crop}</td>
                      <td className="py-3 px-3 text-muted-foreground">{d.area}</td>
                      <td className="py-3 px-3 text-right font-medium text-blue-600">{d.expected}</td>
                      <td className="py-3 px-3 text-right font-medium text-emerald-600">{d.actual}</td>
                      <td className="py-3 px-3 text-right">
                        <span className={cn('flex items-center justify-end gap-1', gap > 0 ? 'text-red-500' : 'text-green-500')}>
                          {gap > 0 ? (
                            <TrendingDown className="h-3.5 w-3.5" />
                          ) : (
                            <TrendingUp className="h-3.5 w-3.5" />
                          )}
                          {gap.toFixed(1)}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <Badge variant="outline" className={successBadge(d.successRate)}>
                          {d.successRate}%
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ==================== Section 4 — AI Cause Analysis ==================== */}
      <Card className="rounded-xl shadow-sm border-amber-200/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain className="h-5 w-5 text-amber-600" />
            AI উৎপাদন কম হওয়ার কারণ বিশ্লেষণ
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-6 space-y-4">
          {aiCauses.map((item, idx) => {
            const config = severityConfig[item.severity]
            return (
              <div
                key={idx}
                className={cn(
                  'rounded-xl border p-4 space-y-3 transition-shadow hover:shadow-sm',
                  item.severity === 'high' ? 'border-red-200 bg-red-50/30' : item.severity === 'medium' ? 'border-orange-200 bg-orange-50/30' : 'border-yellow-200 bg-yellow-50/30',
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-foreground">{item.cause}</span>
                    <Badge variant="outline" className={config.badge}>
                      {config.label}
                    </Badge>
                  </div>
                  <span className="text-sm font-bold text-muted-foreground">প্রভাব: {item.impact}%</span>
                </div>

                {/* Impact bar */}
                <div className="space-y-1">
                  <Progress value={item.impact} className={cn('h-2.5', config.bar)} />
                </div>

                {/* Recommendation */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-800 flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-green-600" />
                    <span>{item.recommendation}</span>
                  </p>
                </div>
              </div>
            )
          })}

          {/* AI Summary Recommendation */}
          <Card className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-600" />
                AI সুপারিশ
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-sm leading-relaxed text-foreground/90">
                আপনার জমিে উৎপাদন ব্যবধান মূলত <strong>মাটির পুষ্টির ঘাটতি (২৫%)</strong> এবং <strong>অপর্যাপ্ত সেচ (২০%)</strong> এর কারণে হচ্ছে। আগামী মৌসুমে বোরো ধানের জন্য ইউরিয়া ৩০ কেজ/বিঘা এবং এমওপি ১৫ কেজ/বিঘা নির্ধারিত সময়ে প্রয়োগ করুন। সেচের ক্ষেত্রে ফুল আসার পর থেকে পাকার আগ পর্যন্ত নিয়মিত ৩ ইঞ্চি সেচ নিশ্চিত করুন। এছাড়া প্রতিরোধমূলক ছত্রাকনাশক প্রয়োগ এবং ড্রেনেজ সিস্টেম উন্নত করলে আগামী মৌসুমে প্রায় <strong>১০-১৫% বেশি ফলন</strong> পাওয়া সম্ভব হবে।
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* ==================== Section 5 — Improvement Trend ==================== */}
      <Card className="rounded-xl shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            উৎপাদন বৃদ্ধির সম্ভাবনা
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-6">
          <p className="text-sm text-muted-foreground mb-4">সফলতার হারের ধারাবাহিক উন্নতির প্রবণতা (শতকরা হার)</p>

          <div className="space-y-3">
            {trendData.map((val, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground w-28 text-right flex-shrink-0">{trendLabels[idx]}</span>
                <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden relative">
                  <div
                    className={cn(
                      'h-full rounded-lg flex items-center justify-end pr-2 transition-all',
                      val >= 90 ? 'bg-emerald-500' : val >= 85 ? 'bg-teal-500' : val >= 80 ? 'bg-cyan-500' : 'bg-amber-500',
                    )}
                    style={{ width: `${(val / trendMax) * 100}%` }}
                  >
                    <span className="text-xs text-white font-medium">{val}%</span>
                  </div>
                </div>
                {idx < trendData.length - 1 && (
                  <span className={cn(
                    'text-xs font-medium flex-shrink-0',
                    trendData[idx + 1] >= val ? 'text-emerald-500' : 'text-red-500',
                  )}>
                    {trendData[idx + 1] >= val ? '↑' : '↓'}
                    {Math.abs(trendData[idx + 1] - val)}%
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p className="text-sm text-emerald-800 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 flex-shrink-0" />
              <strong>বিশ্লেষণ:</strong> গত ৫ মৌসুমে সফলতার হার <strong>৭২% থেকে ৮৭%-এ উন্নীত</strong> হয়েছে, যা <strong>১৫% ধারাবাহিক উন্নতি</strong> নির্দেশ করে। এই ধারা অব্যাহত রাখতে পারলে আগামী মৌসুমে ৯০%+ সফলতা অর্জন সম্ভব।
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}