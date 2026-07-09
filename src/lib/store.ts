import { create } from 'zustand'

export type UserRole = 'farmer' | 'officer' | 'lab' | 'expert' | 'upazila' | 'district' | 'admin' | 'gov' | 'super_admin'
export type AppView = 'landing' | 'dashboard' | 'farm' | 'land-register' | 'soil' | 'soil-health-card' | 'soil-problem' | 'ai-recommend' | 'fertilizer' | 'irrigation' | 'crop' | 'disease' | 'pest' | 'weather' | 'market' | 'calendar' | 'chat' | 'iot' | 'notification' | 'report' | 'gov-dashboard' | 'settings'

interface AppState {
  currentView: AppView
  sidebarOpen: boolean
  currentUserRole: UserRole
  currentUserName: string
  notificationCount: number
  setView: (view: AppView) => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  setRole: (role: UserRole) => void
  setUserName: (name: string) => void
  setNotificationCount: (count: number) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentView: 'landing',
  sidebarOpen: true,
  currentUserRole: 'farmer',
  currentUserName: 'মোহাম্মদ আলী',
  notificationCount: 7,
  setView: (view) => set({ currentView: view }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setRole: (role) => set({ currentUserRole: role }),
  setUserName: (name) => set({ currentUserName: name }),
  setNotificationCount: (count) => set({ notificationCount: count }),
}))