'use client';

import { fertilizerPlan } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FlaskConical, Calendar, CheckCircle, Download } from 'lucide-react';

const toBanglaNum = (n: number) => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(n).replace(/\d/g, (d) => banglaDigits[parseInt(d)]);
};

export function FertilizerPlan() {
  const uniqueFertilizers = [...new Set(fertilizerPlan.map((f) => f.name))];
  const totalTypes = uniqueFertilizers.length;
  const totalCost = '৳১২,৫০০';

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <FlaskConical className="size-6 text-emerald-600" />
          সার পরিকল্পনা
        </h2>
        <p className="text-muted-foreground text-sm">
          AI স্বয়ংক্রিয়ভাবে তৈরি করা হয়েছে
        </p>
      </div>

      {/* Summary */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-1.5">
          <FlaskConical className="size-4 text-muted-foreground" />
          <span className="text-muted-foreground">মোট সার:</span>
          <span className="font-semibold">
            {toBanglaNum(totalTypes)} ধরন
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="size-4 text-muted-foreground" />
          <span className="text-muted-foreground">মোট খরচ:</span>
          <span className="font-semibold">{totalCost}</span>
        </div>
      </div>

      {/* Timeline view grouped by growth stage */}
      <div className="space-y-6">
        {(() => {
          const stages = [...new Set(fertilizerPlan.map((f) => f.stage))];
          return stages.map((stage) => {
            const items = fertilizerPlan.filter((f) => f.stage === stage);
            return (
              <div key={stage} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-border" />
                  <Badge variant="outline" className="text-xs font-medium">
                    <Calendar className="size-3 mr-1" />
                    {stage}
                  </Badge>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {items.map((item, idx) => (
                    <Card key={idx}>
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-sm flex items-center gap-1.5">
                            <FlaskConical className="size-4 text-emerald-500" />
                            {item.name}
                          </h3>
                          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 text-xs">
                            {toBanglaNum(item.amount)} {item.unit}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <Calendar className="size-3" />
                          প্রয়োগের তারিখ: {item.date}
                        </div>
                        <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                          <CheckCircle className="size-3.5 mt-0.5 text-emerald-500 shrink-0" />
                          <span>{item.benefit}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          });
        })()}
      </div>

      {/* Bottom actions */}
      <div className="flex flex-wrap gap-3 pt-2">
        <Button variant="outline" className="gap-2">
          <Download className="size-4" />
          পিডিএফ ডাউনলোড
        </Button>
        <Button variant="outline" className="gap-2">
          <Calendar className="size-4" />
          ক্যালেন্ডারে যোগ করুন
        </Button>
      </div>
    </section>
  );
}