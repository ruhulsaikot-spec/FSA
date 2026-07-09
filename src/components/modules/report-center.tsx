'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileBarChart2,
  Download,
  FileText,
  Printer,
  Calendar,
} from 'lucide-react';

interface ReportCategory {
  id: string;
  title: string;
  description: string;
  iconColor: string;
  iconBg: string;
}

const reportCategories: ReportCategory[] = [
  {
    id: 'soil',
    title: 'মাটি স্বাস্থ্য প্রতিবেদন',
    description: 'মাটির pH, NPK মাত্রা, জৈব পদার্থ ও সামগ্রিক স্বাস্থ্য স্কোরের বিশদ বিবরণ।',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/50',
  },
  {
    id: 'farm',
    title: 'খামার প্রতিবেদন',
    description: 'সকল খামারের ফসলের অবস্থা, আয়-ব্যয় ও উৎপাদন সারসংক্ষেপ।',
    iconColor: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-100 dark:bg-blue-900/50',
  },
  {
    id: 'seasonal',
    title: 'মৌসুমী প্রতিবেদন',
    description: 'চলতি মৌসুমের ফসল উৎপাদন, আবহাওয়ার প্রভাব ও পরবর্তী পরিকল্পনা।',
    iconColor: 'text-orange-600 dark:text-orange-400',
    iconBg: 'bg-orange-100 dark:bg-orange-900/50',
  },
  {
    id: 'yield',
    title: 'ফলন প্রতিবেদন',
    description: 'বিগত সময়ের ফলন তুলনা, লক্ষ্যমাত্রা অর্জন ও প্রবণতা বিশ্লেষণ।',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    iconBg: 'bg-yellow-100 dark:bg-yellow-900/50',
  },
  {
    id: 'fertilizer',
    title: 'সার ব্যবহার প্রতিবেদন',
    description: 'সারের ব্যবহার পরিসংখ্যান, ব্যয় ও সুপারিশকৃত অনুপাত বিশ্লেষণ।',
    iconColor: 'text-purple-600 dark:text-purple-400',
    iconBg: 'bg-purple-100 dark:bg-purple-900/50',
  },
  {
    id: 'irrigation',
    title: 'সেচ প্রতিবেদন',
    description: 'সেচের পানি ব্যবহার, সাশ্রয় ও IoT সেন্সর ভিত্তিক সুপারিশ।',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    iconBg: 'bg-cyan-100 dark:bg-cyan-900/50',
  },
  {
    id: 'disease',
    title: 'রোগ প্রতিবেদন',
    description: 'রোগের প্রাদুর্ভাব, প্রভাবিত এলাকা ও প্রতিকারমূলক ব্যবস্থার বিবরণ।',
    iconColor: 'text-red-600 dark:text-red-400',
    iconBg: 'bg-red-100 dark:bg-red-900/50',
  },
  {
    id: 'gov',
    title: 'সরকারি বিশ্লেষণ প্রতিবেদন',
    description: 'জেলা ও বিভাগ ভিত্তিক কৃষি পরিসংখ্যান ও নীতিমালা বিশ্লেষণ।',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    iconBg: 'bg-indigo-100 dark:bg-indigo-900/50',
  },
];

interface RecentReport {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
  typeColor: string;
}

const recentReports: RecentReport[] = [
  {
    id: 'r1',
    name: 'মাটি স্বাস্থ্য প্রতিবেদন - বোরো ২০২৫',
    type: 'মাটি',
    date: '১৫ মার্চ ২০২৫',
    size: '২.৪ MB',
    typeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300',
  },
  {
    id: 'r2',
    name: 'মাসিক ফলন বিশ্লেষণ - ফেব্রুয়ারি',
    type: 'ফলন',
    date: '১ মার্চ ২০২৫',
    size: '১.৮ MB',
    typeColor: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  },
  {
    id: 'r3',
    name: 'সেচ সাশ্রয় সারসংক্ষেপ - ফেব্রুয়ারি',
    type: 'সেচ',
    date: '২৮ ফেব্রুয়ারি ২০২৫',
    size: '১.২ MB',
    typeColor: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300',
  },
  {
    id: 'r4',
    name: 'রোগ পূর্বাভাস রিপোর্ট - মৌসুমী',
    type: 'রোগ',
    date: '২৫ ফেব্রুয়ারি ২০২৫',
    size: '৩.১ MB',
    typeColor: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  },
  {
    id: 'r5',
    name: 'সরকারি কৃষি পরিসংখ্যান - কুষ্টিয়া',
    type: 'সরকারি',
    date: '২০ ফেব্রুয়ারি ২০২৫',
    size: '৪.৭ MB',
    typeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
  },
];

export function ReportCenter() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileBarChart2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">প্রতিবেদন কেন্দ্র</CardTitle>
              <p className="text-sm text-muted-foreground">
                আপনার সকল কৃষি প্রতিবেদন এক জায়গায় দেখুন ও ডাউনলোড করুন
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Report Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportCategories.map((category) => (
          <Card
            key={category.id}
            className={`group relative transition-all duration-200 hover:shadow-lg cursor-pointer ${
              selectedReport === category.id
                ? 'ring-2 ring-primary border-primary/30'
                : 'hover:border-primary/20'
            }`}
            onClick={() =>
              setSelectedReport(
                selectedReport === category.id ? null : category.id
              )
            }
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${category.iconBg}`}
                >
                  <FileText className={`h-5 w-5 ${category.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm leading-tight">
                    {category.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1.5 text-xs flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Download className="h-3.5 w-3.5" />
                  PDF ডাউনলোড
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1.5 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <FileText className="h-3.5 w-3.5" />
                  এক্সেল
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1.5 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Printer className="h-3.5 w-3.5" />
                  প্রিন্ট
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Reports Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg">সাম্প্রতিক প্রতিবেদন</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            সর্বশেষ তৈরি করা ৫টি প্রতিবেদনের তালিকা
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-semibold text-muted-foreground">
                    প্রতিবেদনের নাম
                  </th>
                  <th className="pb-3 font-semibold text-muted-foreground">
                    ধরন
                  </th>
                  <th className="pb-3 font-semibold text-muted-foreground hidden sm:table-cell">
                    তারিখ
                  </th>
                  <th className="pb-3 font-semibold text-muted-foreground hidden md:table-cell">
                    আকার
                  </th>
                  <th className="pb-3 font-semibold text-muted-foreground text-right">
                    ডাউনলোড
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentReports.map((report) => (
                  <tr
                    key={report.id}
                    className="group hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="font-medium truncate max-w-[200px] sm:max-w-[300px]">
                          {report.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${report.typeColor}`}
                      >
                        {report.type}
                      </Badge>
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground hidden sm:table-cell">
                      {report.date}
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground hidden md:table-cell">
                      {report.size}
                    </td>
                    <td className="py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1.5 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Download className="h-3.5 w-3.5" />
                        ডাউনলোড
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}