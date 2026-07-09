'use client';

import { soilProblems } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AlertTriangle, Zap, Clock, ArrowRight } from 'lucide-react';

const severityConfig = {
  high: {
    label: 'মারাত্মক',
    badgeClass: 'bg-destructive text-white border-destructive',
    icon: Zap,
  },
  medium: {
    label: 'মাঝারি',
    badgeClass: 'bg-orange-500 text-white border-orange-500',
    icon: AlertTriangle,
  },
  low: {
    label: 'সামান্য',
    badgeClass: '',
    icon: Clock,
  },
} as const;

const severityCount = {
  high: soilProblems.filter((p) => p.severity === 'high').length,
  medium: soilProblems.filter((p) => p.severity === 'medium').length,
  low: soilProblems.filter((p) => p.severity === 'low').length,
};

const toBanglaNum = (n: number) => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(n).replace(/\d/g, (d) => banglaDigits[parseInt(d)]);
};

export function SoilProblemDiagnosis() {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <AlertTriangle className="size-6 text-destructive" />
          মাটির সমস্যা নির্ণয়
        </h2>
        <p className="text-muted-foreground text-sm">
          AI স্বয়ংক্রিয়ভাবে আপনার মাটির সমস্যা চিহ্নিত করেছে
        </p>
      </div>

      {/* Summary bar */}
      <div className="flex flex-wrap gap-3">
        <Badge variant="destructive" className="text-sm px-3 py-1">
          {toBanglaNum(severityCount.high)}টি মারাত্মক
        </Badge>
        <Badge className="bg-orange-500 text-white border-orange-500 text-sm px-3 py-1">
          {toBanglaNum(severityCount.medium)}টি মাঝারি
        </Badge>
        <Badge variant="secondary" className="text-sm px-3 py-1">
          {toBanglaNum(severityCount.low)}টি সামান্য
        </Badge>
      </div>

      {/* Problems accordion */}
      <Accordion type="multiple" className="w-full">
        {soilProblems.map((problem, index) => {
          const config = severityConfig[problem.severity];
          const SevIcon = config.icon;

          return (
            <AccordionItem key={index} value={`problem-${index}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-wrap items-center gap-2">
                  <SevIcon className="size-4 text-muted-foreground" />
                  <span className="font-semibold text-sm">{problem.name}</span>
                  <Badge
                    className={`${config.badgeClass} text-xs`}
                    variant={problem.severity === 'low' ? 'secondary' : 'outline'}
                  >
                    {config.label}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Card className="border-l-4 border-l-orange-400">
                  <CardContent className="p-4 space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          কারণ
                        </p>
                        <p className="text-sm leading-relaxed">{problem.cause}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          ক্ষতি
                        </p>
                        <p className="text-sm leading-relaxed">{problem.damage}</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        সমাধান
                      </p>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="size-4 mt-0.5 text-emerald-600 shrink-0" />
                        <p className="text-sm leading-relaxed font-medium text-emerald-700 dark:text-emerald-400">
                          {problem.solution}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2 border-t">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock className="size-3.5" />
                        <span>কত দিনে উন্নতি:</span>
                        <span className="font-semibold text-foreground">
                          {toBanglaNum(problem.daysToFix)} দিন
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        অগ্রাধিকার: {toBanglaNum(problem.priority)}
                      </Badge>
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