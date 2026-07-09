'use client'

import { kpiData, weatherData, aiRecommendations, soilData, calendarTasks, notifications } from '@/lib/mock-data'
import { irrigationPlan } from '@/lib/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import {
  Sprout,
  Droplets,
  Sun,
  Thermometer,
  Wind,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Wheat,
  Wifi,
  Activity,
  Clock,
  AlertTriangle,
  BrainCircuit,
  CloudRain,
  MapPin,
} from 'lucide-react'
import { motion } from 'framer-motion'

// ---------- icon resolver for KPI cards ----------
const iconMap: Record<string, React.ElementType> = {
  MapPin,
  Sprout,
  HeartPulse: Activity,
  ShieldCheck: Activity,
  BarChart3: TrendingUp,
  Wifi,
  Banknote: TrendingUp,
  Droplets,
}

const iconColorMap: Record<string, string> = {
  MapPin: 'bg-green-50 text-green-600',
  Sprout: 'bg-emerald-50 text-emerald-600',
  HeartPulse: 'bg-rose-50 text-rose-500',
  ShieldCheck: 'bg-teal-50 text-teal-600',
  BarChart3: 'bg-amber-50 text-amber-600',
  Wifi: 'bg-blue-50 text-blue-600',
  Banknote: 'bg-yellow-50 text-yellow-600',
  Droplets: 'bg-cyan-50 text-cyan-600',
}

// ---------- task dot color by type ----------
const taskDotColor: Record<string, string> = {
  fertilizer: 'bg-green-500',
  irrigation: 'bg-blue-500',
  pesticide: 'bg-red-500',
  harvest: 'bg-yellow-500',
  sowing: 'bg-emerald-500',
}

// ---------- AI recommendation icon by type ----------
function recIcon(type: string) {
  switch (type) {
    case 'fertilizer': return <Wheat className="h-5 w-5 text-green-600" />
    case 'irrigation': return <Droplets className="h-5 w-5 text-blue-600" />
    case 'pesticide': return <AlertTriangle className="h-5 w-5 text-red-500" />
    default: return <BrainCircuit className="h-5 w-5 text-purple-600" />
  }
}

// ---------- notification color scheme ----------
const notifStyle: Record<string, string> = {
  danger: 'border-l-4 border-red-500 bg-red-50/60',
  warning: 'border-l-4 border-orange-500 bg-orange-50/60',
  info: 'border-l-4 border-blue-500 bg-blue-50/60',
  success: 'border-l-4 border-green-500 bg-green-50/60',
}

const notifIconColor: Record<string, string> = {
  danger: 'text-red-600',
  warning: 'text-orange-600',
  info: 'text-blue-600',
  success: 'text-green-600',
}

// ---------- weather condition icon ----------
function weatherIcon(condition: string) {
  if (condition.includes('বৃষ্টি')) return <CloudRain className="h-5 w-5 text-blue-500" />
  if (condition.includes('মেঘলা')) return <CloudRain className="h-5 w-5 text-gray-400" />
  return <Sun className="h-5 w-5 text-amber-500" />
}

// ---------- status badge ----------
function statusBadge(status: string) {
  switch (status) {
    case 'completed': return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0 text-xs">সম্পন্ন</Badge>
    case 'pending': return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0 text-xs">অপেক্ষমাণ</Badge>
    case 'overdue': return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0 text-xs">বিলম্বিত</Badge>
    default: return <Badge variant="outline" className="text-xs">{status}</Badge>
  }
}

// ---------- animation variants ----------
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

// ============================================================
// Main Dashboard View Component
// ============================================================
export function DashboardView() {
  const setView = useAppStore((s) => s.setView)
  const topKpis = kpiData.slice(0, 4)
  const todayTasks = calendarTasks.slice(0, 5)
  const topRecommendations = aiRecommendations.slice(0, 3)
  const topAlerts = notifications.slice(0, 3)

  // extract time from date string
  const taskTime = (dateStr: string) => {
    const parts = dateStr.split('-')
    return `${parts[2] || ''} জুলাই`
  }

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* ============ 1. WELCOME BANNER ============ */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 text-white p-6 md:p-8 shadow-lg"
      >
        {/* decorative circles */}
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -right-20 h-32 w-32 rounded-full bg-white/5" />
        <div className="absolute top-1/2 -left-8 h-24 w-24 rounded-full bg-white/10" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              স্বাগতম, মোহাম্মদ আলী
            </h1>
            <p className="text-green-100 text-sm md:text-base">
              আজ ৯ জুলাই ২০২৬, বুধবার
            </p>
            <p className="text-green-50/80 text-xs md:text-sm mt-2 max-w-xl leading-relaxed">
              🌾 আপনার খামারের সামগ্রিক স্বাস্থ্য <span className="font-semibold text-white">ভালো</span>। মাটির হেলথ স্কোর বৃদ্ধি পাচ্ছে এবং এই মৌসুমে ফলনের সম্ভাবনা অত্যন্ত ইতিবাচক।
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-bold">৭৮</p>
              <p className="text-xs text-green-100">হেলথ স্কোর</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-bold">৮</p>
              <p className="text-xs text-green-100">সক্রিয় ফসল</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ============ 2. KPI CARDS ROW ============ */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {topKpis.map((kpi, i) => {
          const IconComp = iconMap[kpi.icon] || Activity
          const colorClass = iconColorMap[kpi.icon] || 'bg-gray-50 text-gray-600'
          const isUp = kpi.changeType === 'up'

          return (
            <motion.div key={kpi.label} variants={itemVariants}>
              <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow border-0 p-0 overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className={cn('h-12 w-12 rounded-xl flex items-center justify-center', colorClass)}>
                      <IconComp className="h-6 w-6" />
                    </div>
                    <Badge
                      variant="secondary"
                      className={cn(
                        'flex items-center gap-0.5 text-xs font-medium border-0 px-2 py-0.5',
                        isUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                      )}
                    >
                      {isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {kpi.change}
                    </Badge>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-muted-foreground">{kpi.label}</p>
                    <p className="text-3xl font-bold mt-1 tracking-tight">{kpi.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* ============ 3. MAIN CONTENT GRID ============ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* ---- LEFT COLUMN (spans 2) ---- */}
        <div className="lg:col-span-2 space-y-4">

          {/* 3a. Soil Health Score */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow border-0 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-600" />
                  মাটির হেলথ স্কোর
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Circular indicator */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="h-32 w-32 rounded-full flex items-center justify-center"
                      style={{
                        background: `conic-gradient(#16a34a ${soilData.healthScore}%, #e5e7eb ${soilData.healthScore}%)`,
                      }}
                    >
                      <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center shadow-inner">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-green-700">{soilData.healthScore}</p>
                          <p className="text-[10px] text-muted-foreground -mt-1">/১০০</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-3 w-full">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-green-50/60 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">মাটির ধরন</p>
                        <p className="text-sm font-semibold text-green-800 mt-0.5">{soilData.texture}</p>
                      </div>
                      <div className="bg-blue-50/60 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">pH মান</p>
                        <p className="text-sm font-semibold text-blue-800 mt-0.5">{soilData.ph}</p>
                      </div>
                      <div className="bg-amber-50/60 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">আর্দ্রতা</p>
                        <p className="text-sm font-semibold text-amber-800 mt-0.5">{soilData.moisture}%</p>
                      </div>
                      <div className="bg-rose-50/60 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">জৈব পদার্থ</p>
                        <p className="text-sm font-semibold text-rose-800 mt-0.5">{soilData.organicMatter}%</p>
                      </div>
                    </div>
                    <Progress value={soilData.healthScore} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 3b. Today's Tasks */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow border-0">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Clock className="h-5 w-5 text-amber-500" />
                    আজকের করণীয়
                  </CardTitle>
                  <button
                    onClick={() => setView('calendar')}
                    className="text-xs text-green-600 hover:text-green-800 font-medium transition-colors"
                  >
                    সব দেখুন →
                  </button>
                </div>
              </CardHeader>
              <CardContent className="p-5 pt-0 space-y-3 max-h-[340px] overflow-y-auto pr-1">
                {todayTasks.map((task, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/70 hover:bg-gray-100/70 transition-colors"
                  >
                    <div className={cn('h-3 w-3 rounded-full flex-shrink-0', taskDotColor[task.type] || 'bg-gray-400')} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{taskTime(task.date)}</p>
                    </div>
                    {statusBadge(task.status)}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* ---- RIGHT COLUMN ---- */}
        <div className="space-y-4">

          {/* 3c. Weather Summary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Sun className="h-5 w-5 text-amber-500" />
                  আবহাওয়ার সারসংক্ষেপ
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0 space-y-4">
                {/* Current weather */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-4xl font-bold">{weatherData.current.temp}°C</p>
                    <p className="text-sm text-muted-foreground">{weatherData.current.condition}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">সর্বোচ্চ অনুভূতি: {weatherData.current.feelsLike}°C</p>
                  </div>
                  <div className="text-5xl text-amber-400">
                    {weatherData.current.condition.includes('বৃষ্টি') ? (
                      <CloudRain className="h-14 w-14" />
                    ) : (
                      <Sun className="h-14 w-14" />
                    )}
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 bg-blue-50/60 rounded-lg p-2.5">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">আর্দ্রতা</p>
                      <p className="text-sm font-semibold">{weatherData.current.humidity}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-teal-50/60 rounded-lg p-2.5">
                    <Wind className="h-4 w-4 text-teal-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">বাতাস</p>
                      <p className="text-sm font-semibold">{weatherData.current.wind} কিমি/ঘ</p>
                    </div>
                  </div>
                </div>

                {/* 3-day mini forecast */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-medium">৩ দিনের পূর্বাভাস</p>
                  <div className="flex gap-2">
                    {weatherData.forecast.slice(0, 3).map((day, i) => (
                      <div
                        key={i}
                        className="flex-1 text-center bg-gray-50/70 rounded-lg py-2.5 px-1"
                      >
                        <p className="text-[10px] text-muted-foreground font-medium">{day.day}</p>
                        <div className="flex justify-center my-1">{weatherIcon(day.condition)}</div>
                        <p className="text-xs font-semibold">{day.tempHigh}°/{day.tempLow}°</p>
                        {day.rain > 30 && (
                          <p className="text-[9px] text-blue-500 mt-0.5">{day.rain}% বৃষ্টি</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setView('weather')}
                  className="w-full text-center text-sm text-green-600 hover:text-green-800 font-medium py-2 rounded-lg bg-green-50/60 hover:bg-green-50 transition-colors"
                >
                  বিস্তারিত দেখুন →
                </button>
              </CardContent>
            </Card>
          </motion.div>

          {/* 3d. AI Recommendations */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow border-0">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <BrainCircuit className="h-5 w-5 text-purple-600" />
                    AI সুপারিশ
                  </CardTitle>
                  <button
                    onClick={() => setView('ai-recommend')}
                    className="text-xs text-green-600 hover:text-green-800 font-medium transition-colors"
                  >
                    সব দেখুন →
                  </button>
                </div>
              </CardHeader>
              <CardContent className="p-5 pt-0 space-y-3">
                {topRecommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-gray-50/70 hover:bg-gray-100/70 transition-colors cursor-pointer"
                    onClick={() => setView('ai-recommend')}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0">{recIcon(rec.type)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-tight">{rec.title}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{rec.description}</p>
                        <Badge
                          variant="secondary"
                          className={cn(
                            'mt-2 text-[10px] border-0 font-medium',
                            rec.confidence >= 90
                              ? 'bg-green-50 text-green-700'
                              : rec.confidence >= 80
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-amber-50 text-amber-700'
                          )}
                        >
                          আত্মবিশ্বাস: {rec.confidence}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* ============ 4. SECOND ROW ============ */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {/* 4a. Active IoT Devices */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow border-0 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Wifi className="h-5 w-5 text-blue-600" />
                সক্রিয় IoT ডিভাইস
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-4">
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium">৪টি সক্রিয়</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  <span className="text-sm font-medium">১টি অফলাইন</span>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { name: 'মাটির আর্দ্রতা সেন্সর', online: true },
                  { name: 'আবহাওয়া স্টেশন', online: true },
                  { name: 'পানির স্তর সেন্সর', online: false },
                  { name: 'স্বয়ংক্রিয় সেচ ভাল্ব', online: true },
                ].map((dev, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-sm truncate mr-2">{dev.name}</span>
                    <span
                      className={cn(
                        'text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0',
                        dev.online
                          ? 'bg-green-50 text-green-700'
                          : 'bg-red-50 text-red-600'
                      )}
                    >
                      {dev.online ? 'সক্রিয়' : 'অফলাইন'}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 4b. Irrigation Status */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow border-0 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Droplets className="h-5 w-5 text-cyan-600" />
                সেচের অবস্থা
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-4">
              {/* Moisture progress */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm text-muted-foreground">মাটির আর্দ্রতা</p>
                  <p className="text-sm font-bold text-cyan-700">{irrigationPlan.currentMoisture}%</p>
                </div>
                <Progress
                  value={irrigationPlan.currentMoisture}
                  className="h-3"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-muted-foreground">নিম্ন সীমা: ২৫%</span>
                  <span className="text-[10px] text-muted-foreground">অপ্টিমাল: ৪৫-৬০%</span>
                </div>
              </div>

              {/* Next irrigation */}
              <div className="bg-cyan-50/60 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">পরবর্তী সেচ</p>
                <p className="text-sm font-semibold text-cyan-800 mt-0.5">{irrigationPlan.nextIrrigation}</p>
                <p className="text-xs text-muted-foreground mt-0.5">পরিমাণ: {irrigationPlan.waterAmount}</p>
              </div>

              {/* Savings tip */}
              <div className="bg-green-50/60 rounded-lg p-3 flex items-start gap-2">
                <TrendingUp className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-green-800">পানি সাশ্রয়</p>
                  <p className="text-[11px] text-green-700/80 mt-0.5">{irrigationPlan.savings}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 4c. Estimated Yield & Profit */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow border-0 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Wheat className="h-5 w-5 text-amber-600" />
                সম্ভাব্য ফলন ও লাভ
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-4">
              {/* Yield */}
              <div className="bg-amber-50/60 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">আনুমানিক ফলন</p>
                    <p className="text-xl font-bold text-amber-800 mt-0.5">৪.৮ টন/হেক্টর</p>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-xs font-medium">+৫%</span>
                  </div>
                </div>
              </div>

              {/* Profit */}
              <div className="bg-green-50/60 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">আনুমানিক লাভ</p>
                    <p className="text-xl font-bold text-green-800 mt-0.5">৳৮৫,০০০/হেক্টর</p>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-xs font-medium">+১২%</span>
                  </div>
                </div>
              </div>

              {/* Monthly income trend */}
              <div className="bg-blue-50/60 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">মাসিক আয় (এই মাসে)</p>
                    <p className="text-xl font-bold text-blue-800 mt-0.5">৳১,২৫,০০০</p>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="text-xs font-medium">+১২%</span>
                  </div>
                </div>
              </div>

              {/* ROI */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-muted-foreground">আরওআই (ROI)</span>
                <span className="text-sm font-bold text-green-700">১৮০%</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* ============ 5. ALERTS SECTION ============ */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          সতর্কতা
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          {topAlerts.map((alert, i) => (
            <Card
              key={alert.id}
              className={cn(
                'rounded-xl shadow-sm hover:shadow-md transition-shadow border-0 min-w-[300px] max-w-[360px] flex-shrink-0 cursor-pointer',
                notifStyle[alert.type] || 'border-l-4 border-gray-400'
              )}
              onClick={() => setView('notification')}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={cn('mt-0.5 flex-shrink-0', notifIconColor[alert.type])}>
                    {alert.type === 'danger' && <AlertTriangle className="h-5 w-5" />}
                    {alert.type === 'warning' && <CloudRain className="h-5 w-5" />}
                    {alert.type === 'info' && <Activity className="h-5 w-5" />}
                    {alert.type === 'success' && <TrendingUp className="h-5 w-5" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-tight">{alert.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{alert.message}</p>
                    <p className="text-[10px] text-muted-foreground mt-2 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {alert.time}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  )
}