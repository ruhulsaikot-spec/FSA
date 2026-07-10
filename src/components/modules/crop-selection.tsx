'use client';

import { cropSuggestions } from '@/lib/mock-data';
import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Sprout,
  TrendingUp,
  Clock,
  Droplets,
  FlaskConical,
  Shield,
  Star,
} from 'lucide-react';

const toBanglaNum = (n: number) => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(n).replace(/\d/g, (d) => banglaDigits[parseInt(d)]);
};

function getScoreColor(score: number): string {
  if (score > 80) return '[&>div]:bg-emerald-500';
  if (score >= 60) return '[&>div]:bg-yellow-500';
  return '[&>div]:bg-orange-500';
}

function getRiskBadgeClass(risk: string): string {
  switch (risk) {
    case 'কম':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    case 'মাঝারি':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
    case 'উচ্চ':
      return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 border-red-200 dark:border-red-800';
    default:
      return '';
  }
}

export function CropSelection() {
  const { setView } = useAppStore();
  return (
    <section className="p-4 md:p-6 space-y-4 max-w-[1600px] mx-auto">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Sprout className="size-6 text-emerald-600" />
          ফসল নির্বাচন
        </h2>
        <p className="text-muted-foreground text-sm">
          AI আপনার মাটি ও আবহাওয়া বিশ্লেষণ করে সবচেয়ে উপযুক্ত ফসল সুপারিশ করছে
        </p>
      </div>

      {/* Crop grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cropSuggestions.map((crop, index) => (
          <Card
            key={index}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4 space-y-4">
              {/* Crop name & score */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-base leading-tight">
                    {crop.name}
                  </h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="size-3.5 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold">
                      {toBanglaNum(crop.suitabilityScore)}%
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>উপযুক্ততা স্কোর</span>
                  </div>
                  <Progress
                    value={crop.suitabilityScore}
                    className={`h-2.5 ${getScoreColor(crop.suitabilityScore)}`}
                  />
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <TrendingUp className="size-3.5 text-emerald-500" />
                  <div>
                    <p className="font-medium text-foreground">{crop.yield}</p>
                    <p>ফলন</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <TrendingUp className="size-3.5 text-yellow-500" />
                  <div>
                    <p className="font-medium text-foreground">{crop.profit}</p>
                    <p>লাভ</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="size-3.5 text-blue-500" />
                  <div>
                    <p className="font-medium text-foreground">{crop.duration}</p>
                    <p>সময়কাল</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Droplets className="size-3.5 text-sky-500" />
                  <div>
                    <p className="font-medium text-foreground">
                      {crop.waterNeed}
                    </p>
                    <p>পানির চাহিদা</p>
                  </div>
                </div>
              </div>

              {/* Fertilizer need & risk */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <FlaskConical className="size-3.5 text-orange-500" />
                <span>
                  সারের চাহিদা:{' '}
                  <span className="font-medium text-foreground">
                    {crop.fertilizerNeed}
                  </span>
                </span>
                <span className="mx-1">·</span>
                <Shield className="size-3.5 text-red-400" />
                <span>
                  রোগের ঝুঁকি:{' '}
                  <span className="font-medium text-foreground">
                    {crop.riskLevel}
                  </span>
                </span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5">
                <Badge
                  variant="outline"
                  className="text-xs bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                >
                  <TrendingUp className="size-3 mr-1" />
                  ROI: {crop.roi}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {crop.season}
                </Badge>
                <Badge
                  variant="outline"
                  className={`text-xs ${getRiskBadgeClass(crop.riskLevel)}`}
                >
                  <Shield className="size-3 mr-1" />
                  {crop.riskLevel} ঝুঁকি
                </Badge>
              </div>

              {/* Action button */}
              <Button className="w-full" size="sm" onClick={() => setView('crop-detail')}>
                <Sprout className="size-4" />
                বিস্তারিত দেখুন
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}