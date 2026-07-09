'use client'

import { useAppStore } from '@/lib/store'
import { AppSidebar } from '@/components/app/app-sidebar'
import { TopBar } from '@/components/app/top-bar'
import { cn } from '@/lib/utils'

// Module components — lazy loaded for performance
import dynamic from 'next/dynamic'

const DashboardView = dynamic(() => import('@/components/modules/dashboard-view').then(m => ({ default: m.DashboardView })), { ssr: false })
const FarmManagement = dynamic(() => import('@/components/modules/farm-management').then(m => ({ default: m.FarmManagement })), { ssr: false })
const LandRegistration = dynamic(() => import('@/components/modules/land-registration').then(m => ({ default: m.LandRegistration })), { ssr: false })
const SoilAnalysis = dynamic(() => import('@/components/modules/soil-analysis').then(m => ({ default: m.SoilAnalysis })), { ssr: false })
const SoilHealthCard = dynamic(() => import('@/components/modules/soil-health-card').then(m => ({ default: m.SoilHealthCard })), { ssr: false })
const SoilProblemDiagnosis = dynamic(() => import('@/components/modules/soil-problem-diagnosis').then(m => ({ default: m.SoilProblemDiagnosis })), { ssr: false })
const AIRecommendations = dynamic(() => import('@/components/modules/ai-recommendations').then(m => ({ default: m.AIRecommendations })), { ssr: false })
const FertilizerPlan = dynamic(() => import('@/components/modules/fertilizer-plan').then(m => ({ default: m.FertilizerPlan })), { ssr: false })
const IrrigationPlan = dynamic(() => import('@/components/modules/irrigation-plan').then(m => ({ default: m.IrrigationPlan })), { ssr: false })
const CropSelection = dynamic(() => import('@/components/modules/crop-selection').then(m => ({ default: m.CropSelection })), { ssr: false })
const DiseasePrediction = dynamic(() => import('@/components/modules/disease-prediction').then(m => ({ default: m.DiseasePrediction })), { ssr: false })
const PestPrediction = dynamic(() => import('@/components/modules/pest-prediction').then(m => ({ default: m.PestPrediction })), { ssr: false })
const WeatherModule = dynamic(() => import('@/components/modules/weather-module').then(m => ({ default: m.WeatherModule })), { ssr: false })
const MarketPrices = dynamic(() => import('@/components/modules/market-prices').then(m => ({ default: m.MarketPrices })), { ssr: false })
const AgriCalendar = dynamic(() => import('@/components/modules/agri-calendar').then(m => ({ default: m.AgriCalendar })), { ssr: false })
const AIChat = dynamic(() => import('@/components/modules/ai-chat').then(m => ({ default: m.AIChat })), { ssr: false })
const IoTManagement = dynamic(() => import('@/components/modules/iot-management').then(m => ({ default: m.IoTManagement })), { ssr: false })
const NotificationCenter = dynamic(() => import('@/components/modules/notification-center').then(m => ({ default: m.NotificationCenter })), { ssr: false })
const ReportCenter = dynamic(() => import('@/components/modules/report-center').then(m => ({ default: m.ReportCenter })), { ssr: false })
const GovDashboard = dynamic(() => import('@/components/modules/gov-dashboard').then(m => ({ default: m.GovDashboard })), { ssr: false })
const SettingsModule = dynamic(() => import('@/components/modules/settings-module').then(m => ({ default: m.SettingsModule })), { ssr: false })

function ModuleRouter() {
  const currentView = useAppStore((s) => s.currentView)

  switch (currentView) {
    case 'dashboard':
      return <DashboardView />
    case 'farm':
      return <FarmManagement />
    case 'land-register':
      return <LandRegistration />
    case 'soil':
      return <SoilAnalysis />
    case 'soil-health-card':
      return <SoilHealthCard />
    case 'soil-problem':
      return <SoilProblemDiagnosis />
    case 'ai-recommend':
      return <AIRecommendations />
    case 'fertilizer':
      return <FertilizerPlan />
    case 'irrigation':
      return <IrrigationPlan />
    case 'crop':
      return <CropSelection />
    case 'disease':
      return <DiseasePrediction />
    case 'pest':
      return <PestPrediction />
    case 'weather':
      return <WeatherModule />
    case 'market':
      return <MarketPrices />
    case 'calendar':
      return <AgriCalendar />
    case 'chat':
      return <AIChat />
    case 'iot':
      return <IoTManagement />
    case 'notification':
      return <NotificationCenter />
    case 'report':
      return <ReportCenter />
    case 'gov-dashboard':
      return <GovDashboard />
    case 'settings':
      return <SettingsModule />
    default:
      return <DashboardView />
  }
}

export function AppShell() {
  const sidebarOpen = useAppStore((s) => s.sidebarOpen)

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar — hidden on mobile unless explicitly opened */}
      <div
        className={cn(
          'shrink-0 transition-all duration-300 ease-in-out',
          // On mobile: overlay sidebar that slides in/out
          'md:relative md:block',
          !sidebarOpen && 'hidden md:block'
        )}
      >
        <AppSidebar />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar fixed at the top */}
        <TopBar />

        {/* Scrollable content */}
        <main className="flex-1 overflow-auto bg-muted/30">
          <ModuleRouter />
        </main>
      </div>
    </div>
  )
}