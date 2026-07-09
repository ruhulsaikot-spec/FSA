'use client';

import { diseasePredictions } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Bug, ShieldAlert, Thermometer, Eye, Pill, Activity } from 'lucide-react';

const toBanglaNum = (n: number) => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(n).replace(/\d/g, (d) => banglaDigits[parseInt(d)]);
};

const riskConfig: Record<
  string,
  { label: string; badgeClass: string; icon: React.ElementType }
> = {
  'উচ্চ': {
    label: 'উচ্চ ঝুঁকি',
    badgeClass: 'bg-destructive text-white border-destructive',
    icon: ShieldAlert,
  },
  'মাঝারি': {
    label: 'মাঝারি ঝুঁকি',
    badgeClass: 'bg-orange-500 text-white border-orange-500',
    icon: Thermometer,
  },
  'কম': {
    label: 'নিম্ন ঝুঁকি',
    badgeClass: '',
    icon: Eye,
  },
};

export function DiseasePrediction() {
  const highCount = diseasePredictions.filter(
    (d) => d.riskLevel === 'উচ্চ'
  ).length;
  const medCount = diseasePredictions.filter(
    (d) => d.riskLevel === 'মাঝারি'
  ).length;
  const lowCount = diseasePredictions.filter(
    (d) => d.riskLevel === 'কম'
  ).length;

  return (
    <section className="p-4 md:p-6 space-y-4 max-w-[1600px] mx-auto">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Bug className="size-6 text-red-600" />
          রোগ পূর্বাভাস
        </h2>
        <p className="text-muted-foreground text-sm">
          AI বিশ্লেষণের ভিত্তিতে সম্ভাব্য রোগ সমূহ
        </p>
      </div>

      {/* Risk summary cards */}
      <div className="grid gap-3 grid-cols-3">
        <Card className="border-red-200 dark:border-red-900">
          <CardContent className="p-4 text-center space-y-1">
            <ShieldAlert className="size-5 text-destructive mx-auto" />
            <p className="text-2xl font-bold text-destructive">
              {toBanglaNum(highCount)}
            </p>
            <p className="text-xs text-muted-foreground">উচ্চ ঝুঁকি</p>
          </CardContent>
        </Card>
        <Card className="border-orange-200 dark:border-orange-900">
          <CardContent className="p-4 text-center space-y-1">
            <Thermometer className="size-5 text-orange-500 mx-auto" />
            <p className="text-2xl font-bold text-orange-600">
              {toBanglaNum(medCount)}
            </p>
            <p className="text-xs text-muted-foreground">মাঝারি</p>
          </CardContent>
        </Card>
        <Card className="border-emerald-200 dark:border-emerald-900">
          <CardContent className="p-4 text-center space-y-1">
            <Eye className="size-5 text-emerald-500 mx-auto" />
            <p className="text-2xl font-bold text-emerald-600">
              {toBanglaNum(lowCount)}
            </p>
            <p className="text-xs text-muted-foreground">নিম্ন</p>
          </CardContent>
        </Card>
      </div>

      {/* Disease accordion */}
      <Accordion type="multiple" className="w-full">
        {diseasePredictions.map((disease, index) => {
          const config = riskConfig[disease.riskLevel] || riskConfig['কম'];
          const RiskIcon = config.icon;

          return (
            <AccordionItem key={index} value={`disease-${index}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-wrap items-center gap-2">
                  <Bug className="size-4 text-muted-foreground" />
                  <span className="font-semibold text-sm">{disease.name}</span>
                  <Badge
                    className={`${config.badgeClass} text-xs`}
                    variant={disease.riskLevel === 'কম' ? 'secondary' : 'outline'}
                  >
                    {config.label}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Card className="border-l-4 border-l-red-400">
                  <CardContent className="p-4 space-y-4">
                    {/* Cause */}
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                        <ShieldAlert className="size-3" />
                        কারণ
                      </p>
                      <p className="text-sm leading-relaxed">{disease.cause}</p>
                    </div>

                    {/* Symptoms */}
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                        <Eye className="size-3" />
                        লক্ষণ
                      </p>
                      <p className="text-sm leading-relaxed">
                        {disease.symptoms}
                      </p>
                    </div>

                    {/* Prevention */}
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                        <Thermometer className="size-3" />
                        প্রতিরোধ ব্যবস্থা
                      </p>
                      <p className="text-sm leading-relaxed">
                        {disease.prevention}
                      </p>
                    </div>

                    {/* Action items */}
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                        <Pill className="size-3" />
                        প্রস্তাবিত ব্যবস্থা
                      </p>
                      <div className="rounded-md bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 p-3 text-sm font-medium text-orange-800 dark:text-orange-300">
                        {disease.action}
                      </div>
                    </div>

                    {/* Confidence score */}
                    <div className="flex items-center gap-2 pt-2 border-t">
                      <Activity className="size-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        আত্মবিশ্বাস স্কোর:
                      </span>
                      <span className="text-sm font-bold">
                        {toBanglaNum(disease.confidence)}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}