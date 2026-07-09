'use client';

import { irrigationPlan } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Droplets,
  CloudRain,
  Clock,
  TrendingDown,
  AlertCircle,
} from 'lucide-react';

const toBanglaNum = (n: number) => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(n).replace(/\d/g, (d) => banglaDigits[parseInt(d)]);
};

const schedule = [
  { date: 'আগামী সোমবার', time: 'সকাল ৬:০০', amount: '২.৫ ইঞ্চি' },
  { date: 'আগামী বৃহস্পতিবার', time: 'সকাল ৫:৩০', amount: '২.০ ইঞ্চি' },
  { date: 'আগামী রবিবার', time: 'সন্ধ্যা ৬:০০', amount: '১.৫ ইঞ্চি' },
  { date: 'আগামী বুধবার', time: 'সকাল ৬:৩০', amount: '২.০ ইঞ্চি' },
];

export function IrrigationPlan() {
  const moistureColor =
    irrigationPlan.currentMoisture < 40
      ? '[&>div]:bg-orange-500'
      : '[&>div]:bg-emerald-500';

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Droplets className="size-6 text-sky-600" />
          সেচ পরিকল্পনা
        </h2>
      </div>

      {/* Big moisture card */}
      <Card className="border-sky-200 dark:border-sky-900">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="size-5 text-sky-600" />
              <span className="font-semibold text-sm">বর্তমান মাটির আর্দ্রতা</span>
            </div>
            <span className="text-3xl font-bold text-sky-700 dark:text-sky-400">
              {toBanglaNum(irrigationPlan.currentMoisture)}%
            </span>
          </div>
          <Progress
            value={irrigationPlan.currentMoisture}
            className={`h-4 ${moistureColor}`}
          />
          {irrigationPlan.currentMoisture < 40 && (
            <div className="flex items-center gap-1.5 text-xs text-orange-600 dark:text-orange-400">
              <AlertCircle className="size-3.5" />
              আর্দ্রতা স্বাভাবিকের চেয়ে কম, শীঘ্রই সেচ দিন
            </div>
          )}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="size-4" />
            <span>পরবর্তী সেচ:</span>
            <span className="font-semibold text-foreground">
              {irrigationPlan.nextIrrigation}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Info cards row */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <CloudRain className="size-4 text-sky-500" />
              <span className="text-xs font-medium text-muted-foreground">
                বৃষ্টির সম্ভাবনা
              </span>
            </div>
            <p className="text-2xl font-bold">
              {toBanglaNum(irrigationPlan.rainChance)}%
            </p>
            <Badge
              variant="secondary"
              className="text-xs bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300"
            >
              আগামী ৩ দিনে
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Droplets className="size-4 text-blue-500" />
              <span className="text-xs font-medium text-muted-foreground">
                পানির পরিমাণ
              </span>
            </div>
            <p className="text-2xl font-bold">{irrigationPlan.waterAmount}</p>
            <Badge variant="secondary" className="text-xs">
              প্রতি সেচে
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <TrendingDown className="size-4 text-emerald-500" />
              <span className="text-xs font-medium text-muted-foreground">
                সাশ্রয়ের পরামর্শ
              </span>
            </div>
            <p className="text-sm font-medium leading-relaxed">
              {irrigationPlan.savings}
            </p>
            <Badge
              variant="secondary"
              className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
            >
              <TrendingDown className="size-3 mr-1" />
              সাশ্রয়ী
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Irrigation schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="size-4" />
            আসন্ন সেচের সময়সূচী
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            {schedule.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 rounded-lg border p-3 text-sm hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex size-8 items-center justify-center rounded-full bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300 shrink-0 text-xs font-bold">
                    {toBanglaNum(idx + 1)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">{item.date}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.time}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="shrink-0 text-xs">
                  <Droplets className="size-3 mr-1" />
                  {item.amount}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}