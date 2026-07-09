'use client';

import { useState } from 'react';
import { aiRecommendations } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  BrainCircuit,
  Sparkles,
  FlaskConical,
  Droplets,
  Bug,
  CheckCircle,
} from 'lucide-react';

type FilterType = 'all' | 'fertilizer' | 'irrigation' | 'pesticide' | 'general';

const typeConfig: Record<
  string,
  { label: string; icon: React.ElementType; color: string; filterValue: FilterType }
> = {
  fertilizer: {
    label: 'সার',
    icon: FlaskConical,
    color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400',
    filterValue: 'fertilizer',
  },
  irrigation: {
    label: 'সেচ',
    icon: Droplets,
    color: 'text-sky-600 bg-sky-50 dark:bg-sky-950 dark:text-sky-400',
    filterValue: 'irrigation',
  },
  pesticide: {
    label: 'কীটনাশক',
    icon: Bug,
    color: 'text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400',
    filterValue: 'pesticide',
  },
  general: {
    label: 'সাধারণ',
    icon: Sparkles,
    color: 'text-purple-600 bg-purple-50 dark:bg-purple-950 dark:text-purple-400',
    filterValue: 'general',
  },
};

const tabs: { label: string; value: FilterType }[] = [
  { label: 'সব', value: 'all' },
  { label: 'সার', value: 'fertilizer' },
  { label: 'সেচ', value: 'irrigation' },
  { label: 'কীটনাশক', value: 'pesticide' },
  { label: 'সাধারণ', value: 'general' },
];

const toBanglaNum = (n: number) => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(n).replace(/\d/g, (d) => banglaDigits[parseInt(d)]);
};

export function AIRecommendations() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filtered =
    activeFilter === 'all'
      ? aiRecommendations
      : aiRecommendations.filter((r) => r.type === activeFilter);

  const avgConfidence = Math.round(
    aiRecommendations.reduce((sum, r) => sum + r.confidence, 0) /
      aiRecommendations.length
  );

  return (
    <section className="p-4 md:p-6 space-y-4 max-w-[1600px] mx-auto">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <BrainCircuit className="size-6 text-emerald-600" />
          AI ভিত্তিক সুপারিশ
          <Sparkles className="size-5 text-emerald-500" />
        </h2>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Button
            key={tab.value}
            variant={activeFilter === tab.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter(tab.value)}
            className="text-xs"
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Recommendation cards */}
      <div className="grid gap-4">
        {filtered.map((rec, index) => {
          const config = typeConfig[rec.type];
          const TypeIcon = config.icon;

          return (
            <Card key={index}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`rounded-lg p-2.5 shrink-0 ${config.color}`}
                  >
                    <TypeIcon className="size-5" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-sm">{rec.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        অগ্রাধিকার: {toBanglaNum(rec.priority)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {rec.description}
                    </p>

                    {/* Confidence bar */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">আত্মবিশ্বাস স্কোর</span>
                        <span className="font-semibold">
                          {toBanglaNum(rec.confidence)}%
                        </span>
                      </div>
                      <Progress value={rec.confidence} className="h-2" />
                    </div>

                    <Button size="sm" className="mt-1">
                      <CheckCircle className="size-4" />
                      প্রয়োগ করুন
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Overall confidence */}
      <Card className="border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BrainCircuit className="size-5 text-emerald-600" />
              <span className="text-sm font-medium">
                গড় আত্মবিশ্বাস স্কোর
              </span>
            </div>
            <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
              {toBanglaNum(avgConfidence)}%
            </span>
          </div>
          <Progress
            value={avgConfidence}
            className="h-3 mt-2 [&>div]:bg-emerald-500"
          />
        </CardContent>
      </Card>
    </section>
  );
}