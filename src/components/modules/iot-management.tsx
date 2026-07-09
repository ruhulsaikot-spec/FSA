'use client';

import { useState } from 'react';
import { iotDevices } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  Signal,
  Settings,
  RefreshCw,
  MapPin,
  Clock,
} from 'lucide-react';

const typeColors: Record<string, string> = {
  'মাটি সেন্সর': 'bg-amber-100 text-amber-800 border-amber-200',
  'আবহাওয়া স্টেশন': 'bg-sky-100 text-sky-800 border-sky-200',
  'পানি সেন্সর': 'bg-blue-100 text-blue-800 border-blue-200',
  'সেচ নিয়ন্ত্রক': 'bg-emerald-100 text-emerald-800 border-emerald-200',
};

function getBatteryColor(level: number) {
  if (level > 50) return 'text-green-600';
  if (level >= 20) return 'text-yellow-600';
  return 'text-red-600';
}

function getBatteryProgressColor(level: number) {
  if (level > 50) return '[&>div]:bg-green-500';
  if (level >= 20) return '[&>div]:bg-yellow-500';
  return '[&>div]:bg-red-500';
}

function SignalBars({ signal }: { signal: number }) {
  const bars = [
    { threshold: 33, h: 'h-1.5' },
    { threshold: 66, h: 'h-2.5' },
    { threshold: 100, h: 'h-3.5' },
  ];

  return (
    <div className="flex items-end gap-0.5">
      {bars.map((bar, i) => {
        const active = signal > bar.threshold * 0.5;
        return (
          <div
            key={i}
            className={`w-1 rounded-sm ${bar.h} ${
              active ? 'bg-green-500' : 'bg-muted-foreground/20'
            }`}
          />
        );
      })}
    </div>
  );
}

export function IoTManagement() {
  const [devices] = useState(iotDevices);

  const totalDevices = devices.length;
  const activeDevices = devices.filter((d) => d.status === 'online').length;
  const offlineDevices = totalDevices - activeDevices;

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto">
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <Wifi className="h-6 w-6 text-green-600" />
          IoT ডিভাইস ব্যবস্থাপনা
        </CardTitle>
        <Button size="sm" className="gap-1.5">
          <Settings className="h-4 w-4" />
          ডিভাইস যোগ করুন
        </Button>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Summary bar */}
        <div className="flex flex-wrap items-center gap-4 rounded-lg border bg-muted/40 p-3 text-sm font-medium">
          <span>
            মোট ডিভাইস:{' '}
            <span className="font-bold text-foreground">{totalDevices}</span>
          </span>
          <span className="text-muted-foreground">|</span>
          <span className="flex items-center gap-1.5 text-green-600">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            সক্রিয়: <span className="font-bold">{activeDevices}</span>
          </span>
          <span className="text-muted-foreground">|</span>
          <span className="flex items-center gap-1.5 text-red-500">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            অফলাইন: <span className="font-bold">{offlineDevices}</span>
          </span>
        </div>

        {/* Device grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {devices.map((device) => {
            const isOnline = device.status === 'online';
            const typeBadge = typeColors[device.type] ?? 'bg-gray-100 text-gray-800 border-gray-200';
            const batteryColor = getBatteryColor(device.battery);
            const progressColor = getBatteryProgressColor(device.battery);
            const BatteryIcon = device.battery < 20 ? BatteryLow : Battery;

            return (
              <Card key={device.id} className="border shadow-sm transition-shadow hover:shadow-md">
                <CardContent className="space-y-3 p-4">
                  {/* Top row: name, type, status */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-sm font-semibold text-foreground">
                        {device.name}
                      </h4>
                      <Badge variant="outline" className={`mt-1 text-[10px] ${typeBadge}`}>
                        {device.type}
                      </Badge>
                    </div>
                    <span
                      className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        isOnline
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {isOnline ? (
                        <Wifi className="h-3 w-3" />
                      ) : (
                        <WifiOff className="h-3 w-3" />
                      )}
                      {isOnline ? 'সক্রিয়' : 'অফলাইন'}
                    </span>
                  </div>

                  {/* Battery & Signal row */}
                  <div className="flex items-center gap-4">
                    {/* Battery */}
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <BatteryIcon className={`h-3.5 w-3.5 ${batteryColor}`} />
                        ব্যাটারি: {device.battery}%
                      </div>
                      <Progress value={device.battery} className={`h-2 ${progressColor}`} />
                    </div>

                    {/* Signal */}
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Signal className="h-3.5 w-3.5" />
                        সিগন্যাল: {device.signal}%
                      </div>
                      <SignalBars signal={device.signal} />
                    </div>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      সর্বশেষ: {device.lastReading}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Settings className="h-3 w-3" />
                      ফার্মওয়্যার: {device.firmware}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3" />
                      ইন্সটল: {device.installDate}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <RefreshCw className="h-3 w-3" />
                      রক্ষণাবেক্ষণ: {device.maintenance}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 pt-1">
                    <Button variant="outline" size="sm" className="flex-1 text-xs">
                      বিস্তারিত
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                      disabled={!isOnline}
                    >
                      <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                      রিফ্রেশ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
    </div>
  );
}