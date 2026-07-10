'use client'

import { Menu, Search, Bell, ChevronDown, User, Settings } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAppStore, type AppView } from '@/lib/store'

const viewNameMap: Record<string, string> = {
  dashboard: 'ড্যাশবোর্ড',
  farm: 'জমি ব্যবস্থাপনা',
  'land-register': 'জমি নিবন্ধন',
  soil: 'মাটি বিশ্লেষণ',
  'soil-health-card': 'মাটি স্বাস্থ্য কার্ড',
  'soil-problem': 'মাটির সমস্যা নির্ণয়',
  'ai-recommend': 'এআই সুপারিশ',
  fertilizer: 'সার পরিকল্পনা',
  irrigation: 'সেচ ব্যবস্থাপনা',
  crop: 'ফসল নির্বাচন',
  disease: 'রোগ পূর্বাভাস',
  pest: 'পোকামাকড় পূর্বাভাস',
  weather: 'আবহাওয়া',
  market: 'বাজার মূল্য',
  calendar: 'কৃষি ক্যালেন্ডার',
  chat: 'এআই চ্যাট',
  iot: 'আইওটি ব্যবস্থাপনা',
  notification: 'বিজ্ঞপ্তি কেন্দ্র',
  report: 'প্রতিবেদন কেন্দ্র',
  'gov-dashboard': 'প্রশাসনিক ড্যাশবোর্ড',
  'gov-gis': 'GIS মানচিত্র',
  'crop-history': 'ফসলের ইতিহাস',
  'yield-gap': 'উৎপাদন ব্যবধান বিশ্লেষণ',
  'crop-detail': 'ফসল বিস্তারিত',
  settings: 'সেটিংস',
}

const roleLabels: Record<string, string> = {
  farmer: 'কৃষক',
  officer: 'কৃষি কর্মকর্তা',
  lab: 'ল্যাব টেকনিশিয়ান',
  expert: 'কৃষি বিশেষজ্ঞ',
  upazila: 'উপজেলা কৃষি অফিসার',
  district: 'জেলা কৃষি অফিসার',
  admin: 'প্রশাসক',
  gov: 'সরকারি দপ্তর',
  super_admin: 'সুপার অ্যাডমিন',
}

export function TopBar() {
  const { currentView, toggleSidebar, notificationCount, currentUserName, currentUserRole, setView } =
    useAppStore()

  const currentViewName = viewNameMap[currentView] || 'ড্যাশবোর্ড'
  const userInitial = currentUserName?.charAt(0) || 'ক'
  const roleLabel = roleLabels[currentUserRole] || 'কৃষক'

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-white/80 px-4 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 sm:px-6">
      {/* Left section */}
      <div className="flex items-center gap-3">
        {/* Hamburger menu — visible on mobile, acts as toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleSidebar}
          aria-label="মেনু টগল করুন"
        >
          <Menu className="size-5" />
        </Button>

        {/* Breadcrumb */}
        <nav aria-label="ব্রেডক্রাম্ব" className="flex items-center gap-1.5 text-sm">
          <span className="text-muted-foreground">কৃষি উপদেষ্টা</span>
          <span className="text-muted-foreground/50">/</span>
          <span className="font-medium text-foreground">{currentViewName}</span>
        </nav>
      </div>

      {/* Right section */}
      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        {/* Search input */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="খুঁজুন..."
            className="h-9 w-48 rounded-full pl-8 lg:w-64"
          />
        </div>

        {/* Notification bell */}
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => setView('notification' as AppView)}
          aria-label="বিজ্ঞপ্তি"
        >
          <Bell className="size-5" />
          {notificationCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center p-0 text-[10px]"
            >
              {notificationCount > 99 ? '৯৯+' : notificationCount}
            </Badge>
          )}
        </Button>

        {/* User avatar dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-2"
              aria-label="ব্যবহারকারী মেনু"
            >
              <Avatar className="h-8 w-8 border border-green-300">
                <AvatarFallback className="bg-green-600 text-xs font-semibold text-white">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium md:inline-block">
                {currentUserName}
              </span>
              <ChevronDown className="hidden size-3.5 text-muted-foreground md:inline-block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">{currentUserName}</p>
                <p className="text-xs text-muted-foreground">{roleLabel}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setView('settings' as AppView)}>
              <User className="mr-2 size-4" />
              প্রোফাইল দেখুন
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setView('settings' as AppView)}>
              <Settings className="mr-2 size-4" />
              সেটিংস
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setView('landing' as AppView)}
              className="text-red-600 focus:text-red-600"
            >
              প্রস্থান
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}