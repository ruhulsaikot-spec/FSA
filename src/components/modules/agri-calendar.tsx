'use client';

import { calendarTasks } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CalendarDays,
  Clock,
  FlaskConical,
  Droplets,
  Bug,
  Wheat,
  Plus,
  CheckCircle,
} from 'lucide-react';

const typeConfig: Record<string, { color: string; bg: string; label: string; icon: React.ReactNode }> = {
  fertilizer: { color: 'text-green-600', bg: 'bg-green-500', label: 'সার', icon: <FlaskConical className="h-3.5 w-3.5" /> },
  irrigation: { color: 'text-blue-600', bg: 'bg-blue-500', label: 'সেচ', icon: <Droplets className="h-3.5 w-3.5" /> },
  pesticide: { color: 'text-red-600', bg: 'bg-red-500', label: 'কীটনাশক', icon: <Bug className="h-3.5 w-3.5" /> },
  harvest: { color: 'text-yellow-600', bg: 'bg-yellow-500', label: 'কাটাই', icon: <Wheat className="h-3.5 w-3.5" /> },
  sowing: { color: 'text-purple-600', bg: 'bg-purple-500', label: 'বুনট', icon: <Plus className="h-3.5 w-3.5" /> },
};

const statusConfig: Record<string, { color: string; label: string }> = {
  completed: { color: 'bg-green-100 text-green-800 border-green-200', label: 'সম্পন্ন' },
  pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'মুলতবি' },
  overdue: { color: 'bg-red-100 text-red-800 border-red-200', label: 'বিলম্বিত' },
};

const sortedTasks = [...calendarTasks].sort((a, b) => a.date.localeCompare(b.date));

const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
const toBengali = (n: number) =>
  String(n).split('').map((d) => bengaliDigits[parseInt(d)] ?? d).join('');

const dayNames = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র', 'শনি'];

// Static July 2026 — July 1 2026 is a Wednesday (index 3)
const daysInMonth = 31;
const firstDayOffset = 3; // Wednesday = index 3 (0=Sunday)
const todayDate = 12; // pretend today is the 12th

const taskDayMap = new Map<number, typeof calendarTasks>();
calendarTasks.forEach((t) => {
  const day = parseInt(t.date.split('-')[2]);
  if (!isNaN(day)) {
    const arr = taskDayMap.get(day) ?? [];
    arr.push(t);
    taskDayMap.set(day, arr);
  }
});

export function AgriCalendar() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <CalendarDays className="h-6 w-6 text-green-600" />
          কৃষি ক্যালেন্ডার
        </CardTitle>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          নতুন কাজ যোগ করুন
        </Button>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="timeline">
          <TabsList className="mb-4 w-full sm:w-auto">
            <TabsTrigger value="timeline" className="gap-1.5">
              <Clock className="h-4 w-4" />
              সময়রেখা
            </TabsTrigger>
            <TabsTrigger value="calendar" className="gap-1.5">
              <CalendarDays className="h-4 w-4" />
              ক্যালেন্ডার
            </TabsTrigger>
          </TabsList>

          {/* ── Timeline Tab ── */}
          <TabsContent value="timeline">
            <div className="relative space-y-0 max-h-[520px] overflow-y-auto pr-2">
              {/* vertical line */}
              <div className="absolute left-[108px] top-2 bottom-2 w-0.5 bg-muted sm:left-[130px]" />

              {sortedTasks.map((task, idx) => {
                const tc = typeConfig[task.type] ?? typeConfig.fertilizer;
                const sc = statusConfig[task.status] ?? statusConfig.pending;

                return (
                  <div key={idx} className="relative flex gap-4 pb-6 last:pb-0">
                    {/* Date column */}
                    <div className="w-24 shrink-0 pt-1 text-right sm:w-32">
                      <p className="text-sm font-semibold text-foreground">{task.date}</p>
                      <p className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                        <Clock className="h-3 w-3" />
                        {task.type === 'irrigation' ? 'সকাল ৬:০০' : 'সকাল ৮:০০'}
                      </p>
                    </div>

                    {/* Dot + line */}
                    <div className="relative flex flex-col items-center">
                      <span
                        className={`mt-2 h-4 w-4 rounded-full border-2 border-white ring-2 ring-offset-1 ${tc.bg} ring-offset-background`}
                      />
                    </div>

                    {/* Content card */}
                    <div className="flex-1 rounded-lg border bg-card p-3 shadow-sm transition-shadow hover:shadow-md">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h4 className="font-semibold text-foreground">{task.title}</h4>
                        <Badge variant="outline" className={`gap-1 text-xs ${tc.color} border-current/30`}>
                          {tc.icon}
                          {tc.label}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${sc.color}`}>
                          {task.status === 'completed' && <CheckCircle className="mr-1 h-3 w-3" />}
                          {sc.label}
                        </Badge>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{task.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* ── Calendar Tab ── */}
          <TabsContent value="calendar">
            <div className="rounded-lg border p-4">
              {/* Month header */}
              <h3 className="mb-3 text-center text-lg font-bold">জুলাই ২০২৬</h3>

              {/* Day-name header */}
              <div className="grid grid-cols-7 gap-1 mb-1">
                {dayNames.map((d) => (
                  <div key={d} className="py-1 text-center text-xs font-semibold text-muted-foreground">
                    {d}
                  </div>
                ))}
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7 gap-1">
                {/* empty leading cells */}
                {Array.from({ length: firstDayOffset }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-14 sm:h-16" />
                ))}

                {/* actual day cells */}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1;
                  const tasks = taskDayMap.get(day);
                  const isToday = day === todayDate;

                  return (
                    <div
                      key={day}
                      className={`relative flex h-14 flex-col items-center rounded-md border p-1 text-sm transition-colors sm:h-16
                        ${isToday ? 'border-green-500 bg-green-50 font-bold text-green-700' : 'border-transparent hover:bg-muted/50'}
                      `}
                    >
                      <span className="text-xs sm:text-sm">{toBengali(day)}</span>

                      {tasks && tasks.length > 0 && (
                        <div className="mt-auto flex gap-0.5">
                          {tasks.slice(0, 3).map((t, ti) => {
                            const cfg = typeConfig[t.type];
                            return (
                              <span
                                key={ti}
                                className={`h-1.5 w-1.5 rounded-full ${cfg.bg}`}
                                title={t.title}
                              />
                            );
                          })}
                          {tasks.length > 3 && (
                            <span className="text-[9px] leading-none text-muted-foreground">
                              +{tasks.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
                {Object.entries(typeConfig).map(([key, cfg]) => (
                  <span key={key} className="flex items-center gap-1.5">
                    <span className={`h-2.5 w-2.5 rounded-full ${cfg.bg}`} />
                    {cfg.label}
                  </span>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}