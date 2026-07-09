'use client'

import { useAppStore, type AppView } from '@/lib/store'
import { navItems } from '@/lib/mock-data'
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { LogOut, ChevronLeft } from 'lucide-react'
import {
  Sprout,
  Droplets,
  TestTube2,
  HeartPulse,
  AlertTriangle,
  BrainCircuit,
  FlaskConical,
  Waves,
  Wheat,
  Bug,
  ShieldAlert,
  CloudSun,
  TrendingUp,
  CalendarDays,
  MessageSquare,
  Wifi,
  Bell,
  FileBarChart2,
  Building2,
  Settings,
  LayoutDashboard,
  MapPin,
  Leaf,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Sprout,
  Droplets,
  TestTube2,
  HeartPulse,
  AlertTriangle,
  BrainCircuit,
  FlaskConical,
  Waves,
  Wheat,
  Bug,
  ShieldAlert,
  CloudSun,
  TrendingUp,
  CalendarDays,
  MessageSquare,
  Wifi,
  Bell,
  FileBarChart2,
  Building2,
  Settings,
  LayoutDashboard,
  MapPin,
  Leaf,
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

export function AppSidebar() {
  const { currentView, setView, currentUserName, currentUserRole, toggleSidebar } =
    useAppStore()

  const userInitial = currentUserName?.charAt(0) || 'ক'
  const roleLabel = roleLabels[currentUserRole] || 'কৃষক'

  // Group nav items by their group field
  const groupedItems: Record<string, typeof navItems> = {}
  for (const item of navItems) {
    const group = item.group || 'সাধারণ'
    if (!groupedItems[group]) groupedItems[group] = []
    groupedItems[group].push(item)
  }

  return (
    <SidebarProvider>
      <Sidebar
        collapsible="icon"
        className="border-r-0 bg-[#1a3a2a] text-green-100 [--sidebar-accent:rgba(34,197,94,0.15)] [--sidebar-accent-foreground:#bbf7d0] [--sidebar-border:rgba(34,197,94,0.2)] [--sidebar-foreground:#bbf7d0] [--sidebar-primary:#22c55e] [--sidebar-primary-foreground:#052e16] [--sidebar-ring:#22c55e]"
      >
        {/* User info header */}
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 shrink-0 border-2 border-green-400/50">
              <AvatarFallback className="bg-green-600 text-lg font-bold text-white">
                {userInitial}
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
              <span className="truncate text-sm font-semibold text-green-50">
                {currentUserName}
              </span>
              <span className="truncate text-xs text-green-300/80">{roleLabel}</span>
            </div>
          </div>
        </SidebarHeader>

        {/* Navigation groups */}
        <SidebarContent className="px-2">
          {Object.entries(groupedItems).map(([groupLabel, items]) => (
            <SidebarGroup key={groupLabel}>
              <SidebarGroupLabel className="text-green-300/70">
                {groupLabel}
              </SidebarGroupLabel>
              <SidebarMenu>
                {items.map((item) => {
                  const IconComponent = iconMap[item.icon]
                  const isActive = currentView === item.view
                  return (
                    <SidebarMenuItem key={item.view}>
                      <SidebarMenuButton
                        isActive={isActive}
                        onClick={() => setView(item.view as AppView)}
                        tooltip={item.label}
                      >
                        {IconComponent && <IconComponent className="size-4" />}
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>

        {/* Footer with logout and collapse */}
        <SidebarFooter className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setView('landing')}
                tooltip="প্রস্থান"
                className="text-red-300 hover:bg-red-500/20 hover:text-red-200"
              >
                <LogOut className="size-4" />
                <span>প্রস্থান</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>              
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}