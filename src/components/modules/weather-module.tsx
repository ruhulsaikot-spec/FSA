'use client'

import { weatherData } from '@/lib/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  CloudSun,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  Gauge,
  Sun,
  CloudRain,
  Cloud,
  CloudSnow,
  CloudLightning,
} from 'lucide-react'
function WeatherIcon({ condition, className }: { condition: string; className?: string }) {
  const props = { className }
  if (condition.includes('বজ্রপাত')) return <CloudLightning {...props} />
  if (condition.includes('বৃষ্টি')) return <CloudRain {...props} />
  if (condition.includes('রৌদ্রোজ্জ্বল') || condition.includes('রোদ')) return <Sun {...props} />
  if (condition.includes('মেঘলা') || condition.includes('মেঘ')) return <CloudSun {...props} />
  if (condition.includes('তুষার') || condition.includes('বরফ')) return <CloudSnow {...props} />
  return <Cloud {...props} />
}

function getWeatherIconColor(condition: string): string {
  if (condition.includes('বজ্রপাত')) return 'text-purple-600'
  if (condition.includes('বৃষ্টি')) return 'text-blue-600'
  if (condition.includes('রৌদ্রোজ্জ্বল') || condition.includes('রোদ')) return 'text-amber-500'
  if (condition.includes('মেঘলা') || condition.includes('মেঘ')) return 'text-gray-500'
  return 'text-gray-400'
}

function getWeatherBgColor(condition: string): string {
  if (condition.includes('বজ্রপাত')) return 'bg-purple-50'
  if (condition.includes('ভারী বৃষ্টি')) return 'bg-blue-100'
  if (condition.includes('বৃষ্টি')) return 'bg-blue-50'
  if (condition.includes('রৌদ্রোজ্জ্বল') || condition.includes('রোদ')) return 'bg-amber-50'
  if (condition.includes('মেঘলা') || condition.includes('মেঘ')) return 'bg-gray-50'
  return 'bg-gray-50'
}

function toBengaliNum(n: number): string {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
  return n
    .toString()
    .split('')
    .map((d) => (bengaliDigits[parseInt(d)] ?? d))
    .join('')
}

export function WeatherModule() {
  const { current, forecast } = weatherData
  const currentIconColor = getWeatherIconColor(current.condition)

  const alerts = [
    {
      type: 'storm' as const,
      title: 'ঝড় সতর্কতা',
      message: 'আগামী সোম ও মঙ্গলবার বজ্রপাতসহ ভারী বৃষ্টি হতে পারে। জমির পানি নিষ্কাশন ব্যবস্থা পরীক্ষা করুন।',
      severity: 'উচ্চ',
    },
    {
      type: 'heat' as const,
      title: 'তাপপ্রবাহ সতর্কতা',
      message: 'শুক্রবার তাপমাত্রা ৩৩°সে পর্যন্ত বাড়তে পারে। ফসলে অতিরিক্ত সেচ দিন ও ছায়া ব্যবস্থা করুন।',
      severity: 'মাঝারি',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center">
            <CloudSun className="h-5 w-5 text-sky-700" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">আবহাওয়ার তথ্য</h1>
            <p className="text-sm text-muted-foreground mt-1">
              বর্তমান আবহাওয়া, ৭ দিনের পূর্বাভাস ও সতর্কতা
            </p>
          </div>
        </div>
      </div>

      {/* Current Weather */}
      <Card className="rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-red-500" />
            বর্তমান আবহাওয়া
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Temperature & Condition */}
            <div className="flex items-center gap-5">
              <div className={`${currentIconColor} transition-colors`}>
                <WeatherIcon condition={current.condition} className="h-20 w-20 md:h-24 md:w-24" />
              </div>
              <div>
                <div className="flex items-start gap-1">
                  <span className="text-5xl md:text-6xl font-bold text-foreground leading-none">
                    {toBengaliNum(current.temp)}
                  </span>
                  <span className="text-2xl md:text-3xl font-medium text-muted-foreground mt-1">°সে</span>
                </div>
                <p className="text-lg font-medium text-foreground mt-2">{current.condition}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  অনুভূত তাপমাত্রা: <span className="font-medium text-foreground">{toBengaliNum(current.feelsLike)}°সে</span>
                </p>
              </div>
            </div>

            {/* Weather Details Grid */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <Droplets className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                <p className="text-xs text-blue-700 font-medium">আর্দ্রতা</p>
                <p className="text-lg font-bold text-blue-900">{toBengaliNum(current.humidity)}%</p>
              </div>
              <div className="bg-teal-50 rounded-lg p-3 text-center">
                <Wind className="h-5 w-5 text-teal-600 mx-auto mb-1" />
                <p className="text-xs text-teal-700 font-medium">বাতাস</p>
                <p className="text-lg font-bold text-teal-900">{toBengaliNum(current.wind)} কিমি/ঘ</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <Eye className="h-5 w-5 text-gray-600 mx-auto mb-1" />
                <p className="text-xs text-gray-700 font-medium">দৃশ্যমানতা</p>
                <p className="text-lg font-bold text-gray-900">{toBengaliNum(current.visibility)} কিমি</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 text-center">
                <Gauge className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                <p className="text-xs text-purple-700 font-medium">চাপ</p>
                <p className="text-lg font-bold text-purple-900">{toBengaliNum(current.pressure)} hPa</p>
              </div>
            </div>
          </div>

          {/* UV Index Bar */}
          <div className="mt-4 bg-gradient-to-r from-green-50 via-yellow-50 to-red-50 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-medium text-foreground">UV সূচক</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-32 sm:w-48 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 transition-all"
                  style={{ width: `${(current.uv / 11) * 100}%` }}
                />
              </div>
              <span className="text-sm font-bold text-foreground">{toBengaliNum(current.uv)}/১১</span>
              <Badge
                className={
                  current.uv >= 8
                    ? 'bg-red-100 text-red-800 border-red-300'
                    : current.uv >= 6
                      ? 'bg-orange-100 text-orange-800 border-orange-300'
                      : current.uv >= 3
                        ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                        : 'bg-green-100 text-green-800 border-green-300'
                }
              >
                {current.uv >= 8 ? 'অত্যন্ত উচ্চ' : current.uv >= 6 ? 'উচ্চ' : current.uv >= 3 ? 'মাঝারি' : 'কম'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ৭ দিনের পূর্বাভাস */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <CloudSun className="h-5 w-5 text-sky-600" />
          ৭ দিনের পূর্বাভাস
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-thin">
          {forecast.map((day, index) => {
            const iconColor = getWeatherIconColor(day.condition)
            const bgColor = getWeatherBgColor(day.condition)
            const isToday = index === 0

            return (
              <Card
                key={index}
                className={`flex-shrink-0 w-44 rounded-xl shadow-sm transition-shadow duration-200 border ${
                  isToday ? 'border-green-400 ring-2 ring-green-200' : 'border-gray-200'
                } hover:shadow-md`}
              >
                <CardContent className={`p-4 text-center ${bgColor} rounded-t-xl`}>
                  <p
                    className={`text-sm font-bold mb-2 ${isToday ? 'text-green-700' : 'text-foreground'}`}
                  >
                    {isToday ? 'আজ' : day.day}
                  </p>
                  <WeatherIcon condition={day.condition} className={`h-10 w-10 mx-auto mb-2 ${iconColor}`} />
                  <p className="text-xs text-muted-foreground mb-2">{day.condition}</p>
                  <div className="flex items-center justify-center gap-1 text-sm font-bold text-foreground">
                    <span>{toBengaliNum(day.tempHigh)}°</span>
                    <span className="text-muted-foreground font-normal">/</span>
                    <span className="text-muted-foreground font-medium">{toBengaliNum(day.tempLow)}°</span>
                  </div>
                </CardContent>
                <CardContent className="p-3 space-y-1.5">
                  {day.rain > 0 && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">বৃষ্টি</span>
                      <Badge
                        className={`text-xs px-1.5 py-0 ${
                          day.rain >= 70
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : day.rain >= 30
                              ? 'bg-sky-100 text-sky-800 border-sky-300'
                              : 'bg-gray-100 text-gray-700 border-gray-300'
                        }`}
                      >
                        {toBengaliNum(day.rain)}%
                      </Badge>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">আর্দ্রতা</span>
                    <span className="font-medium text-foreground">{toBengaliNum(day.humidity)}%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">বাতাস</span>
                    <span className="font-medium text-foreground">{toBengaliNum(day.wind)} কিমি/ঘ</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* সতর্কতা */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <CloudLightning className="h-5 w-5 text-amber-600" />
          সতর্কতা
        </h2>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <Card
              key={index}
              className={`rounded-xl shadow-sm border overflow-hidden ${
                alert.severity === 'উচ্চ'
                  ? 'border-red-300'
                  : 'border-orange-300'
              }`}
            >
              <div
                className={`h-1.5 ${
                  alert.severity === 'উচ্চ'
                    ? 'bg-gradient-to-r from-red-500 to-orange-500'
                    : 'bg-gradient-to-r from-orange-400 to-yellow-400'
                }`}
              />
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      alert.severity === 'উচ্চ' ? 'bg-red-100' : 'bg-orange-100'
                    }`}
                  >
                    {alert.type === 'storm' ? (
                      <CloudLightning
                        className={`h-5 w-5 ${alert.severity === 'উচ্চ' ? 'text-red-600' : 'text-orange-600'}`}
                      />
                    ) : (
                      <Sun
                        className={`h-5 w-5 ${alert.severity === 'উচ্চ' ? 'text-red-600' : 'text-orange-600'}`}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-bold text-foreground">{alert.title}</h3>
                      <Badge
                        className={`text-xs ${
                          alert.severity === 'উচ্চ'
                            ? 'bg-red-100 text-red-800 border-red-300'
                            : 'bg-orange-100 text-orange-800 border-orange-300'
                        }`}
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{alert.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}