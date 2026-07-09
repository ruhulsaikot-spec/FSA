'use client';

import { govStats, monthlyYieldData } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Building2,
  Users,
  Map,
  Activity,
  Bug,
  Droplets,
  FlaskConical,
  BarChart3,
  TrendingUp,
} from 'lucide-react';

interface KpiCard {
  label: string;
  value: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  subtitle?: string;
}

const kpiCards: KpiCard[] = [
  {
    label: 'নিবন্দিত কৃষক',
    value: govStats.totalFarmers,
    icon: Users,
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/50',
    iconColor: 'text-emerald-700 dark:text-emerald-300',
    subtitle: 'মোট নিবন্ধিত',
  },
  {
    label: 'আবৃত এলাকা',
    value: govStats.totalArea,
    icon: Map,
    iconBg: 'bg-green-100 dark:bg-green-900/50',
    iconColor: 'text-green-700 dark:text-green-300',
    subtitle: 'সর্বমোট জমি',
  },
  {
    label: 'গড় মাটি স্বাস্থ্য',
    value: govStats.avgSoilHealth,
    icon: Activity,
    iconBg: 'bg-teal-100 dark:bg-teal-900/50',
    iconColor: 'text-teal-700 dark:text-teal-300',
    subtitle: 'সার্বিক স্কোর',
  },
  {
    label: 'IoT কভারেজ',
    value: govStats.iotCoverage,
    icon: Activity,
    iconBg: 'bg-lime-100 dark:bg-lime-900/50',
    iconColor: 'text-lime-700 dark:text-lime-300',
    subtitle: 'সক্রিয় সেন্সর',
  },
];

const secondaryCards = [
  {
    label: 'রোগ হটস্পট',
    value: `${govStats.diseaseHotspots}টি`,
    icon: Bug,
    iconBg: 'bg-red-100 dark:bg-red-900/50',
    iconColor: 'text-red-700 dark:text-red-300',
    progress: 38,
    progressLabel: 'সক্রিয় হটস্পট',
    statusColor: 'text-red-600',
  },
  {
    label: 'পানি ব্যবহার',
    value: govStats.waterUsage,
    icon: Droplets,
    iconBg: 'bg-sky-100 dark:bg-sky-900/50',
    iconColor: 'text-sky-700 dark:text-sky-300',
    progress: 65,
    progressLabel: 'সাশ্রয় লক্ষ্যমাত্রা',
    statusColor: 'text-sky-600',
  },
  {
    label: 'সার চাহিদা',
    value: govStats.fertilizerDemand,
    icon: FlaskConical,
    iconBg: 'bg-amber-100 dark:bg-amber-900/50',
    iconColor: 'text-amber-700 dark:text-amber-300',
    progress: 72,
    progressLabel: 'সরবরাহ পূরণ',
    statusColor: 'text-amber-600',
  },
];

interface DistrictData {
  district: string;
  soilHealth: number;
  cropDistribution: string;
  farmerCount: string;
}

const districtData: DistrictData[] = [
  {
    district: 'কুষ্টিয়া',
    soilHealth: 78,
    cropDistribution: 'ধান ৫৫%, গম ২৫%, সরিষা ২০%',
    farmerCount: '২৩,৫০০',
  },
  {
    district: 'রাজশাহী',
    soilHealth: 82,
    cropDistribution: 'আম ৪০%, ধান ৩৫%, সবজি ২৫%',
    farmerCount: '১৮,২০০',
  },
  {
    district: 'বগুড়া',
    soilHealth: 71,
    cropDistribution: 'ধান ৬০%, আলু ২০%, ভুট্টা ২০%',
    farmerCount: '১৫,৮০০',
  },
  {
    district: 'যশোর',
    soilHealth: 75,
    cropDistribution: 'পেঁয়াজ ৩০%, ধান ৪০%, মসলা ৩০%',
    farmerCount: '১২,৪০০',
  },
  {
    district: 'রংপুর',
    soilHealth: 68,
    cropDistribution: 'ধান ৫০%, তামাক ২০%, ভুট্টা ৩০%',
    farmerCount: '১৯,৬০০',
  },
];

const maxYield = Math.max(
  ...monthlyYieldData.map((d) => Math.max(d.yield, d.target))
);

export function GovDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-green-200 dark:border-green-900/50 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white shadow-lg shadow-green-600/20">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-green-900 dark:text-green-100">
                সরকারি ড্যাশবোর্ড
              </CardTitle>
              <p className="text-green-700 dark:text-green-300 font-medium mt-0.5">
                গণপ্রজাতন্ত্রী বাংলাদেশ
              </p>
              <p className="text-sm text-green-600/70 dark:text-green-400/70">
                কৃষি তথ্য ও পরিসংখ্যান ব্যবস্থাপনা প্ল্যাটফর্ম
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">
                      {kpi.label}
                    </p>
                    <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                    {kpi.subtitle && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {kpi.subtitle}
                      </p>
                    )}
                  </div>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${kpi.iconBg}`}
                  >
                    <Icon className={`h-5 w-5 ${kpi.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Secondary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {secondaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.label} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">
                      {card.label}
                    </p>
                    <p className="text-xl font-bold mt-1">{card.value}</p>
                  </div>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.iconBg}`}
                  >
                    <Icon className={`h-5 w-5 ${card.iconColor}`} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {card.progressLabel}
                    </span>
                    <span className={`font-semibold ${card.statusColor}`}>
                      {card.progress}%
                    </span>
                  </div>
                  <Progress value={card.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ফলন বিশ্লেষণ Section */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-green-700 dark:text-green-400" />
            <CardTitle className="text-lg">ফলন বিশ্লেষণ</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            মাসিক ফলন বনাম লক্ষ্যমাত্রা (টন/হেক্টর)
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyYieldData.map((data) => {
              const yieldPercent = (data.yield / maxYield) * 100;
              const targetPercent = (data.target / maxYield) * 100;
              const achieved = data.yield >= data.target;
              return (
                <div key={data.month} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium min-w-[60px]">
                      {data.month}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <span className="inline-block h-2.5 w-2.5 rounded-sm bg-green-600 dark:bg-green-500" />
                        ফলন: {data.yield} টন
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="inline-block h-2.5 w-2.5 rounded-sm bg-emerald-300 dark:bg-emerald-700" />
                        লক্ষ্য: {data.target} টন
                      </span>
                      <Badge
                        variant={achieved ? 'default' : 'secondary'}
                        className={`text-[10px] px-1.5 py-0 ${
                          achieved
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'
                        }`}
                      >
                        {achieved ? 'লক্ষ্য অর্জিত' : 'ঘাটতি'}
                      </Badge>
                    </div>
                  </div>
                  {/* Target bar (background) */}
                  <div className="relative h-7 w-full rounded-md bg-muted/50 overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-emerald-200/60 dark:bg-emerald-800/40 rounded-md transition-all duration-500"
                      style={{ width: `${targetPercent}%` }}
                    />
                    {/* Actual yield bar */}
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-600 to-emerald-500 dark:from-green-500 dark:to-emerald-400 rounded-md transition-all duration-700 flex items-center pl-2"
                      style={{ width: `${yieldPercent}%` }}
                    >
                      <span className="text-[11px] font-bold text-white drop-shadow-sm">
                        {data.yield}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-green-600" />
              <span>গড় ফলন: ৪.৩৫ টন/হেক্টর</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-green-600" />
              <span>প্রকৃত ফলন</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-emerald-300 dark:bg-emerald-700" />
              <span>লক্ষ্যমাত্রা</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* জেলা ভিত্তিক বিশ্লেষণ Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Map className="h-5 w-5 text-green-700 dark:text-green-400" />
            <CardTitle className="text-lg">জেলা ভিত্তিক বিশ্লেষণ</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            নির্বাচিত ৫টি জেলার কৃষি তথ্য ও পরিসংখ্যান
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-green-200 dark:border-green-900/50">
                  <th className="pb-3 text-left font-semibold text-green-800 dark:text-green-300">
                    জেলা
                  </th>
                  <th className="pb-3 text-left font-semibold text-green-800 dark:text-green-300">
                    মাটি স্বাস্থ্য
                  </th>
                  <th className="pb-3 text-left font-semibold text-green-800 dark:text-green-300 hidden sm:table-cell">
                    ফসল বণ্টন
                  </th>
                  <th className="pb-3 text-right font-semibold text-green-800 dark:text-green-300">
                    কৃষক সংখ্যা
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {districtData.map((district) => {
                  const healthColor =
                    district.soilHealth >= 80
                      ? 'text-green-600'
                      : district.soilHealth >= 70
                        ? 'text-amber-600'
                        : 'text-red-600';
                  const healthBg =
                    district.soilHealth >= 80
                      ? 'bg-green-100 dark:bg-green-900/40'
                      : district.soilHealth >= 70
                        ? 'bg-amber-100 dark:bg-amber-900/40'
                        : 'bg-red-100 dark:bg-red-900/40';
                  return (
                    <tr
                      key={district.district}
                      className="hover:bg-green-50/50 dark:hover:bg-green-950/20 transition-colors"
                    >
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-600 dark:bg-green-400" />
                          <span className="font-semibold">
                            {district.district}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="w-20">
                            <Progress
                              value={district.soilHealth}
                              className="h-2"
                            />
                          </div>
                          <Badge
                            variant="secondary"
                            className={`text-xs font-semibold ${healthBg} ${healthColor}`}
                          >
                            {district.soilHealth}/১০০
                          </Badge>
                        </div>
                      </td>
                      <td className="py-3.5 pr-4 text-muted-foreground hidden sm:table-cell">
                        <span className="text-xs">
                          {district.cropDistribution}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <span className="font-semibold">
                          {district.farmerCount}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}