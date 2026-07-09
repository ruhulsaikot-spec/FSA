'use client'

import { useAppStore } from '@/lib/store'
import LandingPage from '@/components/landing/landing-page'
import { AppShell } from '@/components/app/app-shell'

export default function Home() {
  const currentView = useAppStore((s) => s.currentView)

  if (currentView === 'landing') {
    return <LandingPage />
  }

  return <AppShell />
}