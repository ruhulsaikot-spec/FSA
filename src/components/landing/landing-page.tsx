'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Sprout,
  Brain,
  Droplets,
  BarChart3,
  Shield,
  Zap,
  MapPin,
  TestTubes,
  Sparkles,
  Menu,
  Users,
  Map,
  Cpu,
  Target,
  Quote,
  ArrowRight,
  Phone,
  Mail,
  MapPinned,
  ChevronRight,
  Leaf,
  Tractor,
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'

const navLinks = [
  { label: 'বৈশিষ্ট্য', href: '#features' },
  { label: 'কিভাবে কাজ করে', href: '#how-it-works' },
  { label: 'মূল্য', href: '#stats' },
  { label: 'যোগাযোগ', href: '#contact' },
]

const features = [
  {
    icon: Sprout,
    title: 'মাটির বুদ্ধিমান বিশ্লেষণ',
    description:
      'AI-চালিত মাটি পরীক্ষা দিয়ে আপনার জমির স্বাস্থ্য, পুষ্টি উপাদান ও উর্বরতা সম্পর্কে বিস্তারিত জানুন।',
    color: 'text-agri-green',
    bg: 'bg-agri-green/10',
  },
  {
    icon: Brain,
    title: 'AI ফসল সুপারিশ',
    description:
      'মাটির ধরন, ঋতু ও বাজার চাহিদা বিশ্লেষণ করে সর্বোত্তম ফসল চাষের সুপারিশ পান।',
    color: 'text-agri-blue',
    bg: 'bg-agri-blue/10',
  },
  {
    icon: Droplets,
    title: 'স্বয়ংক্রিয় সেচ ব্যবস্থা',
    description:
      'IoT সেন্সরের মাধ্যমে মাটির আর্দ্রতা পরিমাপ করে সঠিক সময়ে সেচ নিশ্চিত করুন।',
    color: 'text-agri-orange',
    bg: 'bg-agri-orange/10',
  },
  {
    icon: BarChart3,
    title: 'রিয়েল-টাইম মনিটরিং',
    description:
      'আপনার জমির সকল তথ্য লাইভ ড্যাশবোর্ডে দেখুন — তাপমাত্রা, আর্দ্রতা, pH মান এবং আরও অনেক কিছু।',
    color: 'text-agri-red',
    bg: 'bg-agri-red/10',
  },
  {
    icon: Shield,
    title: 'রোগ পূর্বাভাস',
    description:
      'প্রারম্ভিক পর্যায়েই ফসলের রোগ শনাক্ত করুন এবং প্রতিকারমূলক ব্যবস্থা নিন।',
    color: 'text-agri-yellow',
    bg: 'bg-agri-yellow/10',
  },
  {
    icon: Zap,
    title: 'বাজারদর বিশ্লেষণ',
    description:
      'বর্তমান ও ভবিষ্যৎ বাজারদর বিশ্লেষণ করে সঠিক সময়ে ফসল বিক্রির সিদ্ধান্ত নিন।',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
]

const steps = [
  {
    icon: MapPin,
    title: 'জমি নিবন্ধন করুন',
    description: 'আপনার জমির অবস্থান ও আয়তন প্রদান করুন',
    step: '১',
  },
  {
    icon: TestTubes,
    title: 'মাটি পরীক্ষা করুন',
    description: 'স্বয়ংক্রিয়ভাবে মাটির গুণাগুণ বিশ্লেষণ হবে',
    step: '২',
  },
  {
    icon: Sparkles,
    title: 'সুপারিশ গ্রহণ করুন',
    description: 'AI থেকে ব্যক্তিগতকৃত কৃষি পরামর্শ পান',
    step: '৩',
  },
]

const statsData = [
  { icon: Users, label: 'নিবন্ধিত কৃষক', value: '৫০,০০০+' },
  { icon: Map, label: 'আবৃত এলাকা', value: '২ লক্ষ একর' },
  { icon: Cpu, label: 'IoT সেন্সর', value: '১০,০০০+' },
  { icon: Target, label: 'সঠিক পূর্বাভাস', value: '৯৫%' },
]

const testimonials = [
  {
    name: 'আব্দুল করিম',
    location: 'রাজশাহী',
    avatar: 'আ',
    quote:
      'এই প্ল্যাটফর্ম আমার ধানের ফলন ৩০% বৃদ্ধি করেছে। মাটি পরীক্ষার রিপোর্ট দেখে সঠিক সার ব্যবহার করতে পেরেছি।',
  },
  {
    name: 'ফাতেমা বেগম',
    location: 'বগুড়া',
    avatar: 'ফ',
    quote:
      'রোগ পূর্বাভাস ফিচারটি অসাধারণ! আগে টমেটোতে পোকার আক্রমণ হলে অনেক ক্ষতি হতো, এখন আগেই প্রতিকার নিতে পারি।',
  },
  {
    name: 'রফিকুল ইসলাম',
    location: 'যশোর',
    avatar: 'র',
    quote:
      'বাজারদর বিশ্লেষণ দেখে সঠিক সময়ে আমার আম বিক্রি করেছি। গত বছরের চেয়ে ৪০% বেশি দাম পেয়েছি!',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function LandingPage() {
  const { setRole, setView } = useAppStore()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogin = () => {
    setRole('farmer')
    setView('dashboard')
  }

  const handleRegister = () => {
    setRole('farmer')
    setView('dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* ===== NAVBAR ===== */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 text-lg font-bold text-primary">
              <span className="text-2xl">🌾</span>
              <span className="hidden sm:inline">কৃষক অ্যাডভাইজর</span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="প্রধান নেভিগেশন">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-primary/5"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={handleLogin}>
                প্রবেশ করুন
              </Button>
              <Button size="sm" onClick={handleRegister}>
                নিবন্ধন করুন
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="মেনু খুলুন">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 text-primary">
                    <span>🌾</span> কৃষক অ্যাডভাইজর
                  </SheetTitle>
                  <SheetDescription>স্মার্ট ডিজিটাল কৃষক অ্যাডভাইজর</SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-4 mt-4" aria-label="মোবাইল নেভিগেশন">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-primary/5"
                    >
                      {link.label}
                      <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                    </a>
                  ))}
                </nav>
                <div className="flex flex-col gap-2 px-4 mt-6">
                  <Button variant="outline" className="w-full" onClick={() => { handleLogin(); setMobileOpen(false) }}>
                    প্রবেশ করুন
                  </Button>
                  <Button className="w-full" onClick={() => { handleRegister(); setMobileOpen(false) }}>
                    নিবন্ধন করুন
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ===== HERO SECTION ===== */}
        <section className="gradient-hero relative overflow-hidden">
          {/* Floating decorative elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="animate-float absolute top-20 left-[10%] text-4xl opacity-20">🌿</div>
            <div className="animate-float animate-delay-200 absolute top-40 right-[15%] text-5xl opacity-15">🌱</div>
            <div className="animate-float animate-delay-300 absolute bottom-32 left-[20%] text-3xl opacity-20">🍃</div>
            <div className="animate-float animate-delay-100 absolute bottom-20 right-[10%] text-4xl opacity-15">🌾</div>
            <div className="animate-float animate-delay-400 absolute top-60 left-[60%] text-3xl opacity-10">☀️</div>
            <div className="animate-float animate-delay-500 absolute top-32 left-[40%] text-2xl opacity-15">💧</div>
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium bg-white/10 text-white/90 border-white/20 backdrop-blur-sm">
                <Leaf className="h-3.5 w-3.5 mr-1.5" />
                বাংলাদেশের প্রথম AI-চালিত কৃষি প্ল্যাটফর্ম
              </Badge>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                আপনার জমির{' '}
                <span className="text-agri-yellow">স্মার্ট সমাধান</span>
              </h1>

              <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-white/80 leading-relaxed">
                কৃত্রিম বুদ্ধিমত্তা ও IoT প্রযুক্তির সাহায্যে আপনার জমির মাটি বিশ্লেষণ,
                ফসল সুপারিশ, সেচ ব্যবস্থাপনা ও বাজারদর তথ্য — সব এক জায়গায়।
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-semibold px-8 h-12 text-base shadow-lg shadow-black/10"
                  onClick={handleRegister}
                >
                  বিনামূল্যে শুরু করুন
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white px-8 h-12 text-base backdrop-blur-sm"
                  onClick={handleLogin}
                >
                  ডেমো দেখুন
                </Button>
              </div>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-xl mx-auto"
            >
              {[
                { value: '৫০,০০০+', label: 'কৃষক' },
                { value: '১,০০০+', label: 'উপজেলা' },
                { value: '৯৫%', label: 'নির্ভুলতা' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-white/60 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== FEATURES SECTION ===== */}
        <section id="features" className="py-16 sm:py-20 lg:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12 lg:mb-16"
            >
              <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm bg-agri-green-light text-primary font-medium">
                <Sprout className="h-3.5 w-3.5 mr-1.5" />
                আমাদের বৈশিষ্ট্যসমূহ
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                আধুনিক প্রযুক্তিতে সমৃদ্ধ <span className="text-primary">কৃষি ব্যবস্থা</span>
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                প্রতিটি ফিচার সাবলীলভাবে কাজ করে আপনার কৃষি যাত্রাকে সহজ ও লাভজনক করতে।
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <motion.div key={feature.title} variants={itemVariants}>
                    <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 h-full border-border/60 hover:border-primary/20">
                      <CardContent className="p-0">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bg} ${feature.color} mb-4`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12 lg:mb-16"
            >
              <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm bg-agri-green-light text-primary font-medium">
                <Zap className="h-3.5 w-3.5 mr-1.5" />
                কিভাবে কাজ করে
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                মাত্র <span className="text-primary">৩টি ধাপে</span> শুরু করুন
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                জটিল প্রক্রিয়া নয়, সহজ ও দ্রুত উপায়ে আপনার কৃষি যাত্রা শুরু হবে।
              </p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              {/* Dashed connecting line (desktop only) */}
              <div className="hidden md:block absolute top-20 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] border-t-2 border-dashed border-primary/20" aria-hidden="true" />

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
              >
                {steps.map((step) => {
                  const Icon = step.icon
                  return (
                    <motion.div key={step.title} variants={itemVariants} className="flex flex-col items-center text-center">
                      <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 mb-5">
                        <Icon className="h-7 w-7" />
                        <span className="absolute -top-2 -right-2 flex items-center justify-center w-7 h-7 rounded-full bg-agri-orange text-white text-xs font-bold shadow-sm">
                          {step.step}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== STATS SECTION ===== */}
        <section id="stats" className="py-16 sm:py-20 lg:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12 lg:mb-16"
            >
              <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm bg-agri-green-light text-primary font-medium">
                <BarChart3 className="h-3.5 w-3.5 mr-1.5" />
                আমাদের সাফল্য
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                সংখ্যায় <span className="text-primary">বিশ্বাসযোগ্যতা</span>
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {statsData.map((stat) => {
                const Icon = stat.icon
                return (
                  <motion.div key={stat.label} variants={itemVariants}>
                    <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 text-center border-border/60">
                      <CardContent className="p-0 flex flex-col items-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</div>
                        <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        <section className="py-16 sm:py-20 lg:py-24 bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12 lg:mb-16"
            >
              <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm bg-agri-green-light text-primary font-medium">
                <Quote className="h-3.5 w-3.5 mr-1.5" />
                কৃষকদের মতামত
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                তারা কি <span className="text-primary">বলছেন</span>
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                হাজারো কৃষক আমাদের প্ল্যাটফর্ম ব্যবহার করে তাদের ফসলের ফলন বৃদ্ধি করছেন।
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {testimonials.map((t) => (
                <motion.div key={t.name} variants={itemVariants}>
                  <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 h-full border-border/60">
                    <CardContent className="p-0">
                      <Quote className="h-8 w-8 text-primary/15 mb-4" />
                      <p className="text-sm text-foreground/90 leading-relaxed mb-6">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                        <Avatar className="h-10 w-10 bg-primary/10 text-primary">
                          <AvatarFallback className="text-sm font-semibold">{t.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-semibold text-foreground">{t.name}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPinned className="h-3 w-3" />
                            {t.location}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className="gradient-green relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="animate-float absolute top-10 left-[5%] text-3xl opacity-20">🌾</div>
            <div className="animate-float animate-delay-200 absolute bottom-10 right-[8%] text-4xl opacity-15">🌱</div>
            <div className="animate-float animate-delay-300 absolute top-1/2 left-[50%] text-2xl opacity-10">🍃</div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm mb-6">
              <Tractor className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              আজই শুরু করুন
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
              বিনামূল্যে অ্যাকাউন্ট তৈরি করুন এবং AI-চালিত স্মার্ট কৃষি উপদেষ্টা পেতে শুরু করুন।
              আপনার ফসলের ফলন বৃদ্ধির যাত্রা এখাই থেকে শুরু।
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 h-12 text-base shadow-lg shadow-black/10"
                onClick={handleRegister}
              >
                বিনামূল্যে নিবন্ধন করুন
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer id="contact" className="bg-sidebar text-sidebar-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Column 1: Platform */}
            <div>
              <h3 className="text-sm font-semibold text-sidebar-primary-foreground mb-4">প্ল্যাটফর্ম</h3>
              <ul className="space-y-2.5">
                {['আমাদের সম্পর্কে', 'বৈশিষ্ট্যসমূহ', 'মূল্য তালিকা', 'ব্লগ', 'ক্যারিয়ার'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-sidebar-foreground/60 hover:text-sidebar-primary-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Services */}
            <div>
              <h3 className="text-sm font-semibold text-sidebar-primary-foreground mb-4">সেবাসমূহ</h3>
              <ul className="space-y-2.5">
                {['মাটি পরীক্ষা', 'ফসল সুপারিশ', 'সেচ ব্যবস্থাপনা', 'রোগ নির্ণয়', 'বাজারদর তথ্য'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-sidebar-foreground/60 hover:text-sidebar-primary-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Government */}
            <div>
              <h3 className="text-sm font-semibold text-sidebar-primary-foreground mb-4">সরকারি সংযোগ</h3>
              <ul className="space-y-2.5">
                {['কৃষি মন্ত্রণালয়', 'বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট', 'কৃষি সম্প্রসারণ অধিদপ্তর', 'উপজেলা কৃষি অফিস', 'ডিজিটাল বাংলাদেশ'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-sidebar-foreground/60 hover:text-sidebar-primary-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h3 className="text-sm font-semibold text-sidebar-primary-foreground mb-4">যোগাযোগ</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <Phone className="h-4 w-4 text-sidebar-foreground/40 mt-0.5 shrink-0" />
                  <span className="text-sm text-sidebar-foreground/60">+৮৮০ ১৭০০-০০০০০০</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="h-4 w-4 text-sidebar-foreground/40 mt-0.5 shrink-0" />
                  <span className="text-sm text-sidebar-foreground/60">info@krishak-advisor.bd</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPinned className="h-4 w-4 text-sidebar-foreground/40 mt-0.5 shrink-0" />
                  <span className="text-sm text-sidebar-foreground/60">
                    কৃষি তথ্য ভবন, ফার্মগেট, ঢাকা-১২১৫
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider + Copyright */}
          <div className="mt-12 pt-8 border-t border-sidebar-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-sidebar-foreground/50">
              <span>🌾</span>
              <span>কৃষক অ্যাডভাইজর © {new Date().getFullYear()}. সর্বস্বত্ব সংরক্ষিত।</span>
            </div>
            <div className="flex items-center gap-4">
              {['গোপনীয়তা নীতি', 'শর্তাবলী'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-xs text-sidebar-foreground/40 hover:text-sidebar-foreground/70 transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}