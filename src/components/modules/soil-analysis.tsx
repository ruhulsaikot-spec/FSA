'use client'

import { soilData, soilTrend } from '@/lib/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function getStatusColor(value: number, low: number, high: number): string {
  if (value >= low && value <= high) return 'bg-green-500'
  const mid = (low + high) / 2
  const dist = Math.abs(value - mid)
  const range = (high - low) / 2
  if (dist <= range * 0.3) return 'bg-yellow-500'
  if (dist <= range * 0.7) return 'bg-orange-500'
  return 'bg-red-500'
}

function getNutrientStatus(
  value: number,
  low: number,
  high: number
): { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; color: string } {
  if (value >= low && value <= high) {
    return { label: 'আদর্শ', variant: 'default', color: 'bg-green-100 text-green-800 border-green-300' }
  }
  if (value < low * 0.7) {
    return { label: 'অত্যন্ত কম', variant: 'destructive', color: 'bg-red-100 text-red-800 border-red-300' }
  }
  if (value < low) {
    return { label: 'কম', variant: 'destructive', color: 'bg-orange-100 text-orange-800 border-orange-300' }
  }
  if (value > high * 1.2) {
    return { label: 'বেশি', variant: 'secondary', color: 'bg-orange-100 text-orange-800 border-orange-300' }
  }
  return { label: 'মাঝারি', variant: 'secondary', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' }
}

// Main soil parameters for Tab 1
const mainParams = [
  { key: 'pH', name: 'পিএইচ (pH)', value: soilData.ph, unit: '', max: 14, optLow: 6.0, optHigh: 7.5 },
  { key: 'EC', name: 'ইসি (EC)', value: soilData.ec, unit: 'dS/m', max: 4, optLow: 0.8, optHigh: 2.0 },
  { key: 'moisture', name: 'আর্দ্রতা', value: soilData.moisture, unit: '%', max: 100, optLow: 25, optHigh: 45 },
  { key: 'temperature', name: 'তাপমাত্রা', value: soilData.temperature, unit: '°C', max: 50, optLow: 20, optHigh: 35 },
  { key: 'organicMatter', name: 'জৈব পদার্থ', value: soilData.organicMatter, unit: '%', max: 5, optLow: 2.5, optHigh: 4.0 },
]

// Macronutrients for Tab 2
const macroNutrients = [
  { key: 'N', name: 'নাইট্রোজেন (N)', value: soilData.nitrogen, unit: 'কেজি/হেক্টর', optLow: 40, optHigh: 60 },
  { key: 'P', name: 'ফসফরাস (P)', value: soilData.phosphorus, unit: 'কেজি/হেক্টর', optLow: 20, optHigh: 30 },
  { key: 'K', name: 'পটাশিয়াম (K)', value: soilData.potassium, unit: 'কেজি/হেক্টর', optLow: 30, optHigh: 50 },
  { key: 'S', name: 'সালফার (S)', value: soilData.sulfur, unit: 'কেজি/হেক্টর', optLow: 10, optHigh: 20 },
  { key: 'Ca', name: 'ক্যালসিয়াম (Ca)', value: soilData.calcium, unit: 'কেজি/হেক্টর', optLow: 800, optHigh: 1500 },
  { key: 'Mg', name: 'ম্যাগনেসিয়াম (Mg)', value: soilData.magnesium, unit: 'কেজি/হেক্টর', optLow: 150, optHigh: 300 },
]

// Micronutrients for Tab 3
const microNutrients = [
  { key: 'Zn', name: 'জিংক (Zn)', value: soilData.zinc, unit: 'পিপিএম', optLow: 1.5, optHigh: 3.0 },
  { key: 'Fe', name: 'আয়রন (Fe)', value: soilData.iron, unit: 'পিপিএম', optLow: 10, optHigh: 50 },
  { key: 'Cu', name: 'কপার (Cu)', value: soilData.copper, unit: 'পিপিএম', optLow: 0.5, optHigh: 3.0 },
  { key: 'B', name: 'বোরন (B)', value: soilData.boron, unit: 'পিপিএম', optLow: 0.5, optHigh: 1.0 },
  { key: 'Mn', name: 'ম্যাঙ্গানিজ (Mn)', value: soilData.manganese, unit: 'পিপিএম', optLow: 2.0, optHigh: 10.0 },
]

const maxNPK = 60

export function SoilAnalysis() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">মাটির তথ্য বিশ্লেষণ</h1>
        <p className="text-sm text-muted-foreground mt-1">
          মাটির বিভিন্ন পরামাণ ও পুষ্টি উপাদানের বিস্তারিত বিশ্লেষণ
        </p>
      </div>

      <Tabs defaultValue="main" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="main" className="text-xs sm:text-sm">
            মূল পরামাণ
          </TabsTrigger>
          <TabsTrigger value="macro" className="text-xs sm:text-sm">
            পুষ্টি উপাদান
          </TabsTrigger>
          <TabsTrigger value="micro" className="text-xs sm:text-sm">
            অণু পুষ্টি
          </TabsTrigger>
          <TabsTrigger value="trend" className="text-xs sm:text-sm">
            ট্রেন্ড
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Main Parameters */}
        <TabsContent value="main">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mainParams.map((param) => {
              const pct = Math.min((param.value / param.max) * 100, 100)
              const barColor = getStatusColor(param.value, param.optLow, param.optHigh)

              return (
                <div
                  key={param.key}
                  className="rounded-xl bg-white p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-foreground">{param.name}</h3>
                    <div className="text-right">
                      <span className="text-lg font-bold text-foreground">{param.value}</span>
                      {param.unit && (
                        <span className="text-xs text-muted-foreground ml-1">
                          {param.unit}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${barColor}`}
                      style={{ width: `${pct}%` }}
                    />
                    {/* Optimal range indicator */}
                    <div
                      className="absolute top-0 h-full bg-green-200/50 border-x-2 border-green-400 pointer-events-none"
                      style={{
                        left: `${(param.optLow / param.max) * 100}%`,
                        width: `${((param.optHigh - param.optLow) / param.max) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1.5 text-[10px] text-muted-foreground">
                    <span>আদর্শ: {param.optLow}–{param.optHigh}</span>
                    <span>সর্বোচ্চ: {param.max}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </TabsContent>

        {/* Tab 2: Macronutrients */}
        <TabsContent value="macro">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {macroNutrients.map((nutrient) => {
              const status = getNutrientStatus(nutrient.value, nutrient.optLow, nutrient.optHigh)
              const pct = Math.min((nutrient.value / (nutrient.optHigh * 1.5)) * 100, 100)

              return (
                <div
                  key={nutrient.key}
                  className="rounded-xl bg-white p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-foreground">{nutrient.name}</h3>
                    <Badge className={`${status.color} text-xs`}>{status.label}</Badge>
                  </div>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-2xl font-bold text-foreground">{nutrient.value}</span>
                    <span className="text-xs text-muted-foreground">{nutrient.unit}</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${status.label === 'আদর্শ' ? 'bg-green-500' : status.label === 'মাঝারি' ? 'bg-yellow-500' : 'bg-orange-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    আদর্শ পরিসীমা: {nutrient.optLow}–{nutrient.optHigh} {nutrient.unit}
                  </p>
                </div>
              )
            })}
          </div>
        </TabsContent>

        {/* Tab 3: Micronutrients */}
        <TabsContent value="micro">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {microNutrients.map((nutrient) => {
              const status = getNutrientStatus(nutrient.value, nutrient.optLow, nutrient.optHigh)
              const pct = Math.min((nutrient.value / (nutrient.optHigh * 1.5)) * 100, 100)

              return (
                <div
                  key={nutrient.key}
                  className="rounded-xl bg-white p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-foreground">{nutrient.name}</h3>
                    <Badge className={`${status.color} text-xs`}>{status.label}</Badge>
                  </div>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-2xl font-bold text-foreground">{nutrient.value}</span>
                    <span className="text-xs text-muted-foreground">{nutrient.unit}</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${status.label === 'আদর্শ' ? 'bg-green-500' : status.label === 'মাঝারি' ? 'bg-yellow-500' : 'bg-orange-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    আদর্শ পরিসীমা: {nutrient.optLow}–{nutrient.optHigh} {nutrient.unit}
                  </p>
                </div>
              )
            })}
          </div>
        </TabsContent>

        {/* Tab 4: Trend */}
        <TabsContent value="trend">
          <Card className="rounded-xl shadow-sm border border-gray-100">
            <CardHeader>
              <CardTitle className="text-base">
                মাসিক মাটি পুষ্টি উপাদানের পরিবর্তন (এনপিকে)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold text-foreground">মাস</th>
                      <th className="text-center py-3 px-2 font-semibold text-foreground">নাইট্রোজেন (N)</th>
                      <th className="text-center py-3 px-2 font-semibold text-foreground">ফসফরাস (P)</th>
                      <th className="text-center py-3 px-2 font-semibold text-foreground">পটাশিয়াম (K)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {soilTrend.map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-2.5 px-2 font-medium text-foreground whitespace-nowrap">
                          {row.month}
                        </td>
                        {/* Nitrogen bar */}
                        <td className="py-2.5 px-2">
                          <div className="flex items-center gap-2 min-w-[160px]">
                            <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden relative">
                              <div
                                className="h-full bg-primary rounded transition-all duration-500"
                                style={{ width: `${(row.nitrogen / maxNPK) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs font-mono text-muted-foreground w-8 text-right">
                              {row.nitrogen}
                            </span>
                          </div>
                        </td>
                        {/* Phosphorus bar */}
                        <td className="py-2.5 px-2">
                          <div className="flex items-center gap-2 min-w-[160px]">
                            <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden relative">
                              <div
                                className="h-full bg-chart-2 rounded transition-all duration-500"
                                style={{ width: `${(row.phosphorus / maxNPK) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs font-mono text-muted-foreground w-8 text-right">
                              {row.phosphorus}
                            </span>
                          </div>
                        </td>
                        {/* Potassium bar */}
                        <td className="py-2.5 px-2">
                          <div className="flex items-center gap-2 min-w-[160px]">
                            <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden relative">
                              <div
                                className="h-full bg-chart-4 rounded transition-all duration-500"
                                style={{ width: `${(row.potassium / maxNPK) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs font-mono text-muted-foreground w-8 text-right">
                              {row.potassium}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-5 mt-4 pt-4 border-t">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded bg-primary" />
                  <span className="text-xs text-muted-foreground">নাইট্রোজেন</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded bg-chart-2" />
                  <span className="text-xs text-muted-foreground">ফসফরাস</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded bg-chart-4" />
                  <span className="text-xs text-muted-foreground">পটাশিয়াম</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}