'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import {
  Globe,
  MapPin,
  Layers,
  ZoomIn,
  ZoomOut,
  ChevronRight,
  Filter,
  BarChart3,
  Users,
  Droplets,
  Bug,
  Wheat,
  Activity,
  ArrowLeft,
  LandPlot,
  TreePine,
  Home,
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────

type HierarchyLevel = 'division' | 'district' | 'upazila' | 'union'

interface RegionBase {
  id: string
  name: string
  soilHealth: number
  farmers: number
  area: string
  mainCrop: string
  season: string
  expectedYield: string
  actualYield: string
  ph: number
  moisture: string
  organicMatter: string
  nitrogen: string
  mainProblem: string
}

interface Division extends RegionBase {
  districts: District[]
}

interface District extends RegionBase {
  upazilas: Upazila[]
}

interface Upazila extends RegionBase {
  unions: Union[]
}

interface Union extends RegionBase {
  population: string
  literacyRate: string
}

// ─── Mock Data ───────────────────────────────────────────────────────

const divisions: Division[] = [
  {
    id: 'rangpur', name: 'রংপুর বিভাগ', soilHealth: 68, farmers: 20000, area: '১৬,১৮৫ বর্গ কি.মি.', mainCrop: 'ধান', season: 'আমন', expectedYield: '৪.২ টন/হে.', actualYield: '৩.৮ টন/হে.', ph: 6.2, moisture: '৩৮%', organicMatter: '২.২%', nitrogen: 'মাঝারি', mainProblem: 'শীতের প্রভাব',
    districts: [
      { id: 'rangpur-d', name: 'রংপুর জেলা', soilHealth: 70, farmers: 5200, area: '২,৪২৮ বর্গ কি.মি.', mainCrop: 'ধান', season: 'আমন', expectedYield: '৪.৩ টন/হে.', actualYield: '৩.৯ টন/হে.', ph: 6.3, moisture: '৩৯%', organicMatter: '২.১%', nitrogen: 'মাঝারি', mainProblem: 'শীতের প্রভাব',
        upazilas: [
          { id: 'rangpur-d-p', name: 'পবা উপজেলা', soilHealth: 72, farmers: 1100, area: '২৫৯ বর্গ কি.মি.', mainCrop: 'ধান', season: 'আমন', expectedYield: '৪.৫ টন/হে.', actualYield: '৪.১ টন/হে.', ph: 6.4, moisture: '৪০%', organicMatter: '২.৩%', nitrogen: 'পর্যাপ্ত', mainProblem: 'সামান্য শীতকালীন ক্ষতি',
            unions: [
              { id: 'poba-u1', name: 'চন্দনই ইউনিয়ন', soilHealth: 74, farmers: 280, area: '২৮ বর্গ কি.মি.', mainCrop: 'ধান', season: 'আমন', expectedYield: '৪.৬ টন/হে.', actualYield: '৪.২ টন/হে.', ph: 6.5, moisture: '৪১%', organicMatter: '২.৪%', nitrogen: 'পর্যাপ্ত', mainProblem: 'সেচের ঘাটতি', population: '৩২,৫০০', literacyRate: '৬৫%' },
              { id: 'poba-u2', name: 'মাহিগঞ্জ ইউনিয়ন', soilHealth: 69, farmers: 310, area: '৩১ বর্গ কি.মি.', mainCrop: 'ধান', season: 'আমন', expectedYield: '৪.৪ টন/হে.', actualYield: '৩.৯ টন/হে.', ph: 6.2, moisture: '৩৯%', organicMatter: '২.১%', nitrogen: 'মাঝারি', mainProblem: 'শীতের প্রভাব', population: '২৮,৭০০', literacyRate: '৬২%' },
            ]},
          { id: 'rangpur-d-m', name: 'মিঠাপুকুর উপজেলা', soilHealth: 67, farmers: 980, area: '২২৮ বর্গ কি.মি.', mainCrop: 'গম', season: 'রবি', expectedYield: '৩.৮ টন/হে.', actualYield: '৩.৪ টন/হে.', ph: 6.1, moisture: '৩৭%', organicMatter: '২.০%', nitrogen: 'মাঝারি', mainProblem: 'আর্দ্রতার ঘাটতি',
            unions: [
              { id: 'mithapukur-u1', name: 'ভেলাগাজী ইউনিয়ন', soilHealth: 65, farmers: 240, area: '২৬ বর্গ কি.মি.', mainCrop: 'গম', season: 'রবি', expectedYield: '৩.৭ টন/হে.', actualYield: '৩.২ টন/হে.', ph: 6.0, moisture: '৩৬%', organicMatter: '১.৯%', nitrogen: 'মাঝারি', mainProblem: 'আর্দ্রতার ঘাটতি', population: '২৫,৩০০', literacyRate: '৫৮%' },
            ]},
        ]},
      { id: 'dinajpur-d', name: 'দিনাজপুর জেলা', soilHealth: 66, farmers: 4800, area: '৩,৪৩৮ বর্গ কি.মি.', mainCrop: 'ধান', season: 'বোরো', expectedYield: '৪.০ টন/হে.', actualYield: '৩.৬ টন/হে.', ph: 6.1, moisture: '৩৭%', organicMatter: '২.১%', nitrogen: 'মাঝারি', mainProblem: 'শীতের প্রভাব',
        upazilas: [
          { id: 'dinajpur-d-b', name: 'বিরামপুর উপজেলা', soilHealth: 64, farmers: 900, area: '২১৫ বর্গ কি.মি.', mainCrop: 'ধান', season: 'বোরো', expectedYield: '৩.৯ টন/হে.', actualYield: '৩.৫ টন/হে.', ph: 6.0, moisture: '৩৬%', organicMatter: '২.০%', nitrogen: 'মাঝারি', mainProblem: 'শীতকালীন ক্ষতি',
            unions: [
              { id: 'birampur-u1', name: 'পলাশবাড়ী ইউনিয়ন', soilHealth: 62, farmers: 200, area: '২৪ বর্গ কি.মি.', mainCrop: 'ধান', season: 'বোরো', expectedYield: '৩.৮ টন/হে.', actualYield: '৩.৪ টন/হে.', ph: 5.9, moisture: '৩৫%', organicMatter: '১.৯%', nitrogen: 'কম', mainProblem: 'শীতকালীন ক্ষতি', population: '২২,১০০', literacyRate: '৫৫%' },
            ]},
        ]},
    ]},
  {
    id: 'rajshahi', name: 'রাজশাহী বিভাগ', soilHealth: 78, farmers: 32000, area: '১৮,১৭৪ বর্গ কি.মি.', mainCrop: 'ধান', season: 'বোরো', expectedYield: '৫.০ টন/হে.', actualYield: '৪.৬ টন/হে.', ph: 6.8, moisture: '৩৫%', organicMatter: '২.১%', nitrogen: 'পর্যাপ্ত', mainProblem: 'আর্দ্রতার ঘাটতি',
    districts: [
      { id: 'rajshahi-d', name: 'রাজশাহী জেলা', soilHealth: 80, farmers: 7500, area: '২,৪২৭ বর্গ কি.মি.', mainCrop: 'ধান', season: 'বোরো', expectedYield: '৫.২ টন/হে.', actualYield: '৪.৮ টন/হে.', ph: 6.9, moisture: '৩৬%', organicMatter: '২.২%', nitrogen: 'পর্যাপ্ত', mainProblem: 'আর্দ্রতার ঘাটতি',
        upazilas: [
          { id: 'rajshahi-d-p', name: 'পবা উপজেলা', soilHealth: 82, farmers: 1600, area: '২৮২ বর্গ কি.মি.', mainCrop: 'ধান', season: 'বোরো', expectedYield: '৫.৩ টন/হে.', actualYield: '৫.০ টন/হে.', ph: 7.0, moisture: '৩৭%', organicMatter: '২.৩%', nitrogen: 'পর্যাপ্ত', mainProblem: 'সামান্য সেচ সমস্যা',
            unions: [
              { id: 'poba-ra-u1', name: 'দারুশা ইউনিয়ন', soilHealth: 84, farmers: 350, area: '৩০ বর্গ কি.মি.', mainCrop: 'ধান', season: 'বোরো', expectedYield: '৫.৫ টন/হে.', actualYield: '৫.১ টন/হে.', ph: 7.1, moisture: '৩৮%', organicMatter: '২.৪%', nitrogen: 'পর্যাপ্ত', mainProblem: 'সামান্য সেচ সমস্যা', population: '৩৫,২০০', literacyRate: '৭২%' },
              { id: 'poba-ra-u2', name: 'হরিপুর ইউনিয়ন', soilHealth: 79, farmers: 320, area: '২৮ বর্গ কি.মি.', mainCrop: 'আম', season: 'গ্রীষ্ম', expectedYield: '৫.০ টন/হে.', actualYield: '৪.৭ টন/হে.', ph: 6.8, moisture: '৩৫%', organicMatter: '২.১%', nitrogen: 'পর্যাপ্ত', mainProblem: 'আর্দ্রতার ঘাটতি', population: '৩০,৮০০', literacyRate: '৬৯%' },
            ]},
          { id: 'rajshahi-d-g', name: 'গোদাগাড়ী উপজেলা', soilHealth: 77, farmers: 1200, area: '২৭৪ বর্গ কি.মি.', mainCrop: 'ধান', season: 'বোরো', expectedYield: '৫.১ টন/হে.', actualYield: '৪.৬ টন/হে.', ph: 6.8, moisture: '৩৪%', organicMatter: '২.১%', nitrogen: 'পর্যাপ্ত', mainProblem: 'আর্দ্রতার ঘাটতি',
            unions: [
              { id: 'godagari-u1', name: 'মাটিয়াপাড়া ইউনিয়ন', soilHealth: 75, farmers: 260, area: '২৫ বর্গ কি.মি.', mainCrop: 'ধান', season: 'বোরো', expectedYield: '৪.৯ টন/হে.', actualYield: '৪.৫ টন/হে.', ph: 6.7, moisture: '৩৩%', organicMatter: '২.০%', nitrogen: 'মাঝারি', mainProblem: 'আর্দ্রতার ঘাটতি', population: '২৭,৬০০', literacyRate: '৬৭%' },
            ]},
        ]},
      { id: 'natore-d', name: 'নাটোর জেলা', soilHealth: 76, farmers: 5800, area: '১,৮৯৬ বর্গ কি.মি.', mainCrop: 'ধান', season: 'বোরো', expectedYield: '৪.৮ টন/হে.', actualYield: '৪.৪ টন/হে.', ph: 6.7, moisture: '৩৫%', organicMatter: '২.১%', nitrogen: 'পর্যাপ্ত', mainProblem: 'আর্দ্রতার ঘাটতি',
        upazilas: [
          { id: 'natore-d-b', name: 'বড়াইগ্রাম উপজেলা', soilHealth: 74, farmers: 1100, area: '২২৫ বর্গ কি.মি.', mainCrop: 'ধান', season: 'বোরো', expectedYield: '৪.৬ টন/হে.', actualYield: '৪.২ টন/হে.', ph: 6.6, moisture: '৩৪%', organicMatter: '২.০%', nitrogen: 'মাঝারি', mainProblem: 'আর্দ্রতার ঘাটতি',
            unions: [
              { id: 'baraigram-u1', name: 'বড়াইগ্রাম ইউনিয়ন', soilHealth: 73, farmers: 240, area: '২৭ বর্গ কি.মি.', mainCrop: 'ধান', season: 'বোরো', expectedYield: '৪.৫ টন/হে.', actualYield: '৪.১ টন/হে.', ph: 6.5, moisture: '৩৪%', organicMatter: '২.০%', nitrogen: 'মাঝারি', mainProblem: 'আর্দ্রতার ঘাটতি', population: '২৪,৯০০', literacyRate: '৬৪%' },
            ]},
        ]},
    ]},
  {
    id: 'mymensingh', name: 'ময়মনসিংহ বিভাগ', soilHealth: 74, farmers: 25000, area: '১০,৪৮৫ বর্গ কি.মি.', mainCrop: 'ধান', season: 'বোরো', expectedYield: '৪.৮ টন/হে.', actualYield: '৪.৪ টন/হে.', ph: 6.4, moisture: '৪০%', organicMatter: '২.৩%', nitrogen: 'পর্যাপ্ত', mainProblem: 'ফসফরাসের ঘাটতি',
    districts: [
      { id: 'mymensingh-d', name: 'ময়মনসিংহ জেলা', soilHealth: 75, farmers: 6200, area: '৪,৩৬৩ বর্গ কি.মি.', mainCrop: 'ধান', season: 'বোরো', expectedYield: '৪.৯ টন/হে.', actualYield: '৪.৫ টন/হে.', ph: 6.4, moisture: '৪১%', organicMatter: '২.৩%', nitrogen: 'পর্যাপ্ত', mainProblem: 'ফসফরাসের ঘাটতি',
        upazilas: [
          { id: 'mymensingh-d-t', name: 'ত্রিশাল উপজেলা', soilHealth: 76, farmers: 1300, area: '৩৩৮ বর্গ কি.মি.', mainCrop: 'ধান', season: 'বোরো', expectedYield: '৫.০ টন/হে.', actualYield: '৪.৬ টন/হে.', ph: 6.5, moisture: '৪২%', organicMatter: '২.৪%', nitrogen: 'পর্যাপ্ত', mainProblem: 'সামান্য ফসফরাস ঘাটতি',
            unions: [
              { id: 'trishal-u1', name: 'বৈলর ইউনিয়ন', soilHealth: 78, farmers: 290, area: '৩২ বর্গ কি.মি.', mainCrop: 'ধান', season: 'বোরো', expectedYield: '৫.১ টন/হে.', actualYield: '৪.৭ টন/হে.', ph: 6.6, moisture: '৪৩%', organicMatter: '২.৫%', nitrogen: 'পর্যাপ্ত', mainProblem: 'সামান্য ফসফরাস ঘাটতি', population: '৩৩,৪০০', literacyRate: '৭০%' },
            ]},
        ]},
    ]},
  {
    id: 'dhaka', name: 'ঢাকা বিভাগ', soilHealth: 72, farmers: 45000, area: '৩১,০৫১ বর্গ কি.মি.', mainCrop: 'ধান', season: 'বোরো', expectedYield: '৪.৫ টন/হে.', actualYield: '৪.০ টন/হে.', ph: 6.5, moisture: '৪২%', organicMatter: '২.০%', nitrogen: 'মাঝারি', mainProblem: 'জৈব পদার্থের ঘাটতি',
    districts: [
      { id: 'dhaka-d', name: 'ঢাকা জেলা', soilHealth: 60, farmers: 5200, area: '১,৪৬৪ বর্গ কি.মি.', mainCrop: 'ধান', season: 'বোরো', expectedYield: '৪.০ টন/হে.', actualYield: '৩.৫ টন/হে.', ph: 6.3, moisture: '৪৫%', organicMatter: '১.৬%', nitrogen: 'মাঝারি', mainProblem: 'দূষণ ও নগরায়ন',
        upazilas: [
          { id: 'dhaka-d-d', name: 'দোহার উপজেলা', soilHealth: 64, farmers: 1100, area: '২০১ বর্গ কি.মি.', mainCrop: 'ধান', season: 'বোরো', expectedYield: '৪.২ টন/হে.', actualYield: '৩.৮ টন/হে.', ph: 6.4, moisture: '৪৪%', organicMatter: '১.৮%', nitrogen: 'মাঝারি', mainProblem: 'নগরায়নের প্রভাব',
            unions: [
              { id: 'dohar-u1', name: 'জয়পাড়া ইউনিয়ন', soilHealth: 66, farmers: 250, area: '২২ বর্গ কি.মি.', mainCrop: 'ধান', season: 'বোরো', expectedYield: '৪.৩ টন/হে.', actualYield: '৩.৯ টন/হে.', ph: 6.5, moisture: '৪৩%', organicMatter: '১.৯%', nitrogen: 'মাঝারি', mainProblem: 'নগরায়নের প্রভাব', population: '২৯,৮০০', literacyRate: '৬৮%' },
            ]},
        ]},
      { id: 'manikganj-d', name: 'মানিকগঞ্জ জেলা', soilHealth: 74, farmers: 4800, area: '১,৩৭৯ বর্গ কি.মি.', mainCrop: 'ধান', season: 'বোরো', expectedYield: '৪.৭ টন/হে.', actualYield: '৪.৩ টন/হে.', ph: 6.6, moisture: '৪০%', organicMatter: '২.১%', nitrogen: 'পর্যাপ্ত', mainProblem: 'বন্যা ঝুঁকি',
        upazilas: [
          { id: 'manikganj-d-s', name: 'সাটুরিয়া উপজেলা', soilHealth: 72, farmers: 900, area: '১৮৪ বর্গ কি.মি.', mainCrop: 'ধান', season: 'বোরো', expectedYield: '৪.৫ টন/হে.', actualYield: '৪.১ টন/হে.', ph: 6.5, moisture: '৩৯%', organicMatter: '২.০%', nitrogen: 'মাঝারি', mainProblem: 'বন্যা ঝুঁকি',
            unions: [
              { id: 'saturia-u1', name: 'সাটুরিয়া ইউনিয়ন', soilHealth: 71, farmers: 210, area: '২০ বর্গ কি.মি.', mainCrop: 'ধান', season: 'বোরো', expectedYield: '৪.৪ টন/হে.', actualYield: '৪.০ টন/হে.', ph: 6.5, moisture: '৩৮%', organicMatter: '২.০%', nitrogen: 'মাঝারি', mainProblem: 'বন্যা ঝুঁকি', population: '২৬,১০০', literacyRate: '৬৩%' },
            ]},
        ]},
    ]},
  {
    id: 'sylhet', name: 'সিলেট বিভাগ', soilHealth: 70, farmers: 15000, area: '১২,৬৩৬ বর্গ কি.মি.', mainCrop: 'চা', season: 'সারা বছর', expectedYield: '১.৮ টন/হে.', actualYield: '১.৬ টন/হে.', ph: 5.5, moisture: '৫২%', organicMatter: '২.৮%', nitrogen: 'পর্যাপ্ত', mainProblem: 'অতিরিক্ত বৃষ্টি',
    districts: [
      { id: 'sylhet-d', name: 'সিলেট জেলা', soilHealth: 71, farmers: 5200, area: '৩,৪৯০ বর্গ কি.মি.', mainCrop: 'চা', season: 'সারা বছর', expectedYield: '১.৯ টন/হে.', actualYield: '১.৭ টন/হে.', ph: 5.6, moisture: '৫৩%', organicMatter: '২.৯%', nitrogen: 'পর্যাপ্ত', mainProblem: 'অতিরিক্ত বৃষ্টি',
        upazilas: [
          { id: 'sylhet-d-b', name: 'বিশ্বনাথ উপজেলা', soilHealth: 69, farmers: 1100, area: '২১৮ বর্গ কি.মি.', mainCrop: 'চা', season: 'সারা বছর', expectedYield: '১.৮ টন/হে.', actualYield: '১.৫ টন/হে.', ph: 5.5, moisture: '৫৪%', organicMatter: '২.৮%', nitrogen: 'পর্যাপ্ত', mainProblem: 'অতিরিক্ত বৃষ্টি ও ভূমিক্ষয়',
            unions: [
              { id: 'bishwanath-u1', name: 'বিশ্বনাথ ইউনিয়ন', soilHealth: 67, farmers: 240, area: '২৩ বর্গ কি.মি.', mainCrop: 'চা', season: 'সারা বছর', expectedYield: '১.৭ টন/হে.', actualYield: '১.৪ টন/হে.', ph: 5.4, moisture: '৫৫%', organicMatter: '২.৭%', nitrogen: 'পর্যাপ্ত', mainProblem: 'অতিরিক্ত বৃষ্টি ও ভূমিক্ষয়', population: '২৭,৩০০', literacyRate: '৬৬%' },
            ]},
        ]},
    ]},
  {
    id: 'chittagong', name: 'চট্টগ্রাম বিভাগ', soilHealth: 65, farmers: 28000, area: '৩৩,৭৭১ বর্গ কি.মি.', mainCrop: 'চা', season: 'চৈত্র-ভাদ্র', expectedYield: '১.৫ টন/হে.', actualYield: '১.৩ টন/হে.', ph: 5.8, moisture: '৪৮%', organicMatter: '২.৪%', nitrogen: 'পর্যাপ্ত', mainProblem: 'অম্লীয় মাটি',
    districts: [
      { id: 'chittagong-d', name: 'চট্টগ্রাম জেলা', soilHealth: 63, farmers: 6800, area: '৫,২৮২ বর্গ কি.মি.', mainCrop: 'চা', season: 'চৈত্র-ভাদ্র', expectedYield: '১.৪ টন/হে.', actualYield: '১.২ টন/হে.', ph: 5.7, moisture: '৪৯%', organicMatter: '২.৩%', nitrogen: 'পর্যাপ্ত', mainProblem: 'অম্লীয় মাটি',
        upazilas: [
          { id: 'chittagong-d-f', name: 'ফটিকছড়ি উপজেলা', soilHealth: 60, farmers: 1200, area: '২৭৬ বর্গ কি.মি.', mainCrop: 'চা', season: 'চৈত্র-ভাদ্র', expectedYield: '১.৩ টন/হে.', actualYield: '১.১ টন/হে.', ph: 5.6, moisture: '৫০%', organicMatter: '২.২%', nitrogen: 'মাঝারি', mainProblem: 'অম্লীয় মাটি ও ভূমিক্ষয়',
            unions: [
              { id: 'fatikchhari-u1', name: 'ফটিকছড়ি ইউনিয়ন', soilHealth: 58, farmers: 260, area: '২৫ বর্গ কি.মি.', mainCrop: 'চা', season: 'চৈত্র-ভাদ্র', expectedYield: '১.২ টন/হে.', actualYield: '১.০ টন/হে.', ph: 5.5, moisture: '৫১%', organicMatter: '২.১%', nitrogen: 'মাঝারি', mainProblem: 'অম্লীয় মাটি ও ভূমিক্ষয়', population: '২৪,৫০০', literacyRate: '৬১%' },
            ]},
        ]},
    ]},
  {
    id: 'barishal', name: 'বরিশাল বিভাগ', soilHealth: 48, farmers: 18000, area: '১৩,২২৫ বর্গ কি.মি.', mainCrop: 'ধান', season: 'আমন', expectedYield: '৩.৮ টন/হে.', actualYield: '২.৮ টন/হে.', ph: 7.8, moisture: '৬০%', organicMatter: '১.৫%', nitrogen: 'কম', mainProblem: 'লবণাক্ততা ও জলাবদ্ধতা',
    districts: [
      { id: 'barishal-d', name: 'বরিশাল জেলা', soilHealth: 50, farmers: 4200, area: '২,৭৮৪ বর্গ কি.মি.', mainCrop: 'ধান', season: 'আমন', expectedYield: '৩.৯ টন/হে.', actualYield: '২.৯ টন/হে.', ph: 7.7, moisture: '৫৯%', organicMatter: '১.৬%', nitrogen: 'কম', mainProblem: 'লবণাক্ততা ও জলাবদ্ধতা',
        upazilas: [
          { id: 'barishal-d-b', name: 'বাকেরগঞ্জ উপজেলা', soilHealth: 46, farmers: 1100, area: '৩২৩ বর্গ কি.মি.', mainCrop: 'ধান', season: 'আমন', expectedYield: '৩.৬ টন/হে.', actualYield: '২.৫ টন/হে.', ph: 7.9, moisture: '৬২%', organicMatter: '১.৪%', nitrogen: 'কম', mainProblem: 'লবণাক্ততা ও জলাবদ্ধতা',
            unions: [
              { id: 'bakerganj-u1', name: 'বাকেরগঞ্জ ইউনিয়ন', soilHealth: 44, farmers: 250, area: '২৮ বর্গ কি.মি.', mainCrop: 'ধান', season: 'আমন', expectedYield: '৩.৫ টন/হে.', actualYield: '২.৪ টন/হে.', ph: 8.0, moisture: '৬৩%', organicMatter: '১.৩%', nitrogen: 'কম', mainProblem: 'লবণাক্ততা ও জলাবদ্ধতা', population: '২১,৯০০', literacyRate: '৫২%' },
            ]},
        ]},
    ]},
  {
    id: 'khulna', name: 'খুলনা বিভাগ', soilHealth: 55, farmers: 22000, area: '২২,২৮৫ বর্গ কি.মি.', mainCrop: 'ধান', season: 'আমন', expectedYield: '৪.০ টন/হে.', actualYield: '৩.২ টন/হে.', ph: 7.5, moisture: '৫৫%', organicMatter: '১.৮%', nitrogen: 'কম', mainProblem: 'লবণাক্ততা',
    districts: [
      { id: 'khulna-d', name: 'খুলনা জেলা', soilHealth: 57, farmers: 5200, area: '৪,৩৮৯ বর্গ কি.মি.', mainCrop: 'ধান', season: 'আমন', expectedYield: '৪.১ টন/হে.', actualYield: '৩.৩ টন/হে.', ph: 7.4, moisture: '৫৪%', organicMatter: '১.৭%', nitrogen: 'কম', mainProblem: 'লবণাক্ততা',
        upazilas: [
          { id: 'khulna-d-d', name: 'দাকোপ উপজেলা', soilHealth: 52, farmers: 1100, area: '৩০৫ বর্গ কি.মি.', mainCrop: 'ধান', season: 'আমন', expectedYield: '৩.৮ টন/হে.', actualYield: '২.৮ টন/হে.', ph: 7.6, moisture: '৫৭%', organicMatter: '১.৫%', nitrogen: 'কম', mainProblem: 'লবণাক্ততা',
            unions: [
              { id: 'dakop-u1', name: 'দাকোপ ইউনিয়ন', soilHealth: 50, farmers: 240, area: '২৬ বর্গ কি.মি.', mainCrop: 'ধান', season: 'আমন', expectedYield: '৩.৭ টন/হে.', actualYield: '২.৬ টন/হে.', ph: 7.7, moisture: '৫৮%', organicMatter: '১.৪%', nitrogen: 'কম', mainProblem: 'লবণাক্ততা', population: '২৩,৪০০', literacyRate: '৫৪%' },
            ]},
        ]},
    ]},
]

// ─── Bangladesh Map SVG Paths ──────────────────────────────────────
// ViewBox: 0 0 520 640
// Accurate outline paths for each of the 8 divisions

const divisionSVGPaths: Record<string, string> = {
  // রংপুর বিভাগ - Northwest
  rangpur:
    'M85,15 L135,10 L185,15 L225,25 L260,45 L280,70 L275,100 L260,125 L240,140 L210,150 L175,148 L140,138 L110,120 L85,95 L70,65 L72,35 Z',
  // রাজশাহী বিভাগ - West
  rajshahi:
    'M70,65 L85,95 L110,120 L140,138 L145,165 L140,195 L130,225 L115,250 L100,275 L90,305 L100,335 L115,355 L105,370 L80,360 L55,330 L40,295 L35,255 L40,215 L50,175 L58,135 L65,100 Z',
  // ময়মনসিংহ বিভাগ - North-central
  mymensingh:
    'M175,148 L210,150 L240,140 L260,125 L275,100 L305,95 L335,105 L350,130 L340,165 L315,190 L285,205 L255,210 L225,205 L200,190 L175,170 L155,160 Z',
  // ঢাকা বিভাগ - Central
  dhaka:
    'M175,170 L200,190 L225,205 L255,210 L285,205 L315,190 L330,210 L325,245 L310,280 L285,305 L255,320 L225,325 L200,315 L180,295 L165,265 L158,230 L160,195 Z',
  // সিলেট বিভাগ - Northeast
  sylhet:
    'M350,130 L335,105 L355,85 L385,75 L415,80 L435,100 L440,135 L430,170 L410,195 L380,205 L355,195 L340,165 Z',
  // চট্টগ্রাম বিভাগ - Southeast
  chittagong:
    'M330,210 L355,195 L380,205 L410,195 L430,220 L450,260 L460,310 L455,360 L440,405 L420,440 L395,465 L365,475 L335,465 L310,440 L290,405 L280,365 L275,325 L285,305 L310,280 L325,245 Z',
  // বরিশাল বিভাগ - South-central
  barishal:
    'M115,355 L100,335 L130,325 L160,320 L190,330 L210,350 L220,380 L215,410 L195,435 L170,450 L140,455 L115,440 L100,415 L95,385 L100,365 Z',
  // খুলনা বিভাগ - Southwest
  khulna:
    'M105,370 L115,355 L100,365 L95,385 L100,415 L115,440 L140,455 L145,480 L140,510 L130,535 L120,555 L100,570 L75,565 L55,545 L40,515 L30,480 L28,440 L35,400 L50,375 L80,360 Z',
}

// Label positions for each division (cx, cy)
const divisionLabelPositions: Record<string, { x: number; y: number }> = {
  rangpur:    { x: 170, y: 80 },
  rajshahi:   { x: 75,  y: 215 },
  mymensingh: { x: 260, y: 155 },
  dhaka:      { x: 245, y: 265 },
  sylhet:     { x: 390, y: 145 },
  chittagong: { x: 375, y: 345 },
  barishal:   { x: 160, y: 390 },
  khulna:     { x: 80,  y: 470 },
}

// ─── Color Utilities ────────────────────────────────────────────────

function getSoilHealthColor(score: number): string {
  if (score >= 75) return '#22c55e'
  if (score >= 60) return '#eab308'
  if (score >= 45) return '#f97316'
  return '#ef4444'
}

function getSoilHealthLabel(score: number): string {
  if (score >= 75) return 'চমৎকার'
  if (score >= 60) return 'মাঝারি'
  if (score >= 45) return 'দুর্বল'
  return 'অত্যন্ত দুর্বল'
}

// ─── Component ──────────────────────────────────────────────────────

export function GovGISDashboard() {
  const [currentLevel, setCurrentLevel] = useState<HierarchyLevel>('division')
  const [selectedDivision, setSelectedDivision] = useState<Division | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null)
  const [selectedUpazila, setSelectedUpazila] = useState<Upazila | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<RegionBase | null>(null)
  const [hoveredDivision, setHoveredDivision] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [filterMetric, setFilterMetric] = useState<string>('soilHealth')

  const breadcrumb = useMemo(() => {
    const items: { label: string; level: HierarchyLevel; action?: () => void }[] = [
      { label: 'বাংলাদেশ', level: 'division' },
    ]
    if (selectedDivision) {
      items.push({
        label: selectedDivision.name,
        level: 'district',
        action: () => {
          setCurrentLevel('district')
          setSelectedDistrict(null)
          setSelectedUpazila(null)
        },
      })
    }
    if (selectedDistrict) {
      items.push({
        label: selectedDistrict.name,
        level: 'upazila',
        action: () => {
          setCurrentLevel('upazila')
          setSelectedUpazila(null)
        },
      })
    }
    if (selectedUpazila) {
      items.push({
        label: selectedUpazila.name,
        level: 'union',
      })
    }
    return items
  }, [selectedDivision, selectedDistrict, selectedUpazila])

  const currentItems = useMemo(() => {
    if (currentLevel === 'division') return divisions
    if (currentLevel === 'district' && selectedDivision) return selectedDivision.districts
    if (currentLevel === 'upazila' && selectedDistrict) return selectedDistrict.upazilas
    if (currentLevel === 'union' && selectedUpazila) return selectedUpazila.unions
    return []
  }, [currentLevel, selectedDivision, selectedDistrict, selectedUpazila])

  const handleDivisionClick = (id: string) => {
    const div = divisions.find((d) => d.id === id)
    if (div) {
      setSelectedDivision(div)
      setSelectedRegion(div)
      setCurrentLevel('district')
    }
  }

  const handleDistrictClick = (district: District) => {
    setSelectedDistrict(district)
    setSelectedRegion(district)
    setCurrentLevel('upazila')
  }

  const handleUpazilaClick = (upazila: Upazila) => {
    setSelectedUpazila(upazila)
    setSelectedRegion(upazila)
    setCurrentLevel('union')
  }

  const handleUnionClick = (union: Union) => {
    setSelectedRegion(union)
  }

  const handleBack = () => {
    if (currentLevel === 'union') {
      setCurrentLevel('upazila')
      setSelectedUpazila(null)
      setSelectedRegion(selectedDistrict)
    } else if (currentLevel === 'upazila') {
      setCurrentLevel('district')
      setSelectedDistrict(null)
      setSelectedRegion(selectedDivision)
    } else if (currentLevel === 'district') {
      setCurrentLevel('division')
      setSelectedDivision(null)
      setSelectedRegion(null)
    }
  }

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 3))
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5))

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Globe className="h-6 w-6 text-green-600" />
            মাটির স্বাস্থ্য মানচিত্র
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            বিভাগ অনুযায়ী মাটির স্বাস্থ্য ও কৃষি তথ্য
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleZoomOut} title="ছোট করুন">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium w-12 text-center">{Math.round(zoom * 100)}%</span>
          <Button variant="outline" size="icon" onClick={handleZoomIn} title="বড় করুন">
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm flex-wrap">
        {breadcrumb.map((item, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
            {item.action ? (
              <button
                onClick={item.action}
                className="text-blue-600 hover:underline font-medium"
              >
                {item.label}
              </button>
            ) : (
              <span className="font-semibold">{item.label}</span>
            )}
          </span>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">প্রদর্শন:</span>
        </div>
        <Select value={filterMetric} onValueChange={setFilterMetric}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="soilHealth">মাটির স্বাস্থ্য সূচক</SelectItem>
            <SelectItem value="farmers">কৃষক সংখ্যা</SelectItem>
            <SelectItem value="ph">pH মান</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              {currentLevel === 'division'
                ? 'বাংলাদেশ মানচিত্র'
                : currentLevel === 'district'
                  ? selectedDivision?.name
                  : currentLevel === 'upazila'
                    ? selectedDistrict?.name
                    : selectedUpazila?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentLevel === 'division' ? (
              <div className="overflow-auto border rounded-lg bg-gradient-to-b from-green-50 to-blue-50">
                <svg
                  viewBox="0 0 520 640"
                  className="w-full h-auto"
                  style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
                >
                  {divisions.map((div) => (
                    <g key={div.id}>
                      <path
                        d={divisionSVGPaths[div.id]}
                        fill={
                          hoveredDivision === div.id
                            ? getSoilHealthColor(div.soilHealth) + 'cc'
                            : getSoilHealthColor(div.soilHealth) + '99'
                        }
                        stroke="white"
                        strokeWidth={hoveredDivision === div.id ? 3 : 2}
                        className="cursor-pointer transition-all duration-200"
                        onClick={() => handleDivisionClick(div.id)}
                        onMouseEnter={() => setHoveredDivision(div.id)}
                        onMouseLeave={() => setHoveredDivision(null)}
                      />
                      {divisionLabelPositions[div.id] && (
                        <>
                          <text
                            x={divisionLabelPositions[div.id].x}
                            y={divisionLabelPositions[div.id].y}
                            textAnchor="middle"
                            className="text-[11px] font-bold fill-gray-800 pointer-events-none select-none"
                          >
                            {div.name.replace(' বিভাগ', '')}
                          </text>
                          <text
                            x={divisionLabelPositions[div.id].x}
                            y={divisionLabelPositions[div.id].y + 14}
                            textAnchor="middle"
                            className="text-[9px] fill-gray-600 pointer-events-none select-none"
                          >
                            {getSoilHealthLabel(div.soilHealth)} ({div.soilHealth})
                          </text>
                        </>
                      )}
                    </g>
                  ))}
                </svg>
              </div>
            ) : (
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {currentLevel === 'district' &&
                  selectedDivision?.districts.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => handleDistrictClick(d)}
                      className="w-full text-left p-4 rounded-lg border bg-card hover:bg-accent transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getSoilHealthColor(d.soilHealth) }}
                        />
                        <div>
                          <p className="font-medium">{d.name}</p>
                          <p className="text-xs text-muted-foreground">{d.area}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            d.soilHealth >= 75 ? 'default' : d.soilHealth >= 60 ? 'secondary' : 'destructive'
                          }
                        >
                          {d.soilHealth}
                        </Badge>
                        <ChevronRight className="h-4 w-4 text-muted-foreground ml-2 inline" />
                      </div>
                    </button>
                  ))}
                {currentLevel === 'upazila' &&
                  selectedDistrict?.upazilas.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => handleUpazilaClick(u)}
                      className="w-full text-left p-4 rounded-lg border bg-card hover:bg-accent transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getSoilHealthColor(u.soilHealth) }}
                        />
                        <div>
                          <p className="font-medium">{u.name}</p>
                          <p className="text-xs text-muted-foreground">{u.area}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            u.soilHealth >= 75 ? 'default' : u.soilHealth >= 60 ? 'secondary' : 'destructive'
                          }
                        >
                          {u.soilHealth}
                        </Badge>
                        <ChevronRight className="h-4 w-4 text-muted-foreground ml-2 inline" />
                      </div>
                    </button>
                  ))}
                {currentLevel === 'union' &&
                  selectedUpazila?.unions.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => handleUnionClick(u)}
                      className="w-full text-left p-4 rounded-lg border bg-card hover:bg-accent transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getSoilHealthColor(u.soilHealth) }}
                        />
                        <div>
                          <p className="font-medium">{u.name}</p>
                          <p className="text-xs text-muted-foreground">{u.area}</p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          u.soilHealth >= 75 ? 'default' : u.soilHealth >= 60 ? 'secondary' : 'destructive'
                        }
                      >
                        {u.soilHealth}
                      </Badge>
                    </button>
                  ))}
              </div>
            )}

            {currentLevel !== 'division' && (
              <Button
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={handleBack}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                পিছনে যান
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Detail Panel */}
        <div className="space-y-4">
          {selectedRegion ? (
            <>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <LandPlot className="h-4 w-4 text-green-600" />
                    {selectedRegion.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Soil Health Score */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">মাটির স্বাস্থ্য</span>
                    <Badge
                      variant={
                        selectedRegion.soilHealth >= 75
                          ? 'default'
                          : selectedRegion.soilHealth >= 60
                            ? 'secondary'
                            : 'destructive'
                      }
                      className="text-lg px-3 py-1"
                    >
                      {selectedRegion.soilHealth}/100
                    </Badge>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full transition-all duration-500"
                      style={{
                        width: `${selectedRegion.soilHealth}%`,
                        backgroundColor: getSoilHealthColor(selectedRegion.soilHealth),
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="space-y-1">
                      <p className="text-muted-foreground">pH মান</p>
                      <p className="font-semibold">{selectedRegion.ph}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">আর্দ্রতা</p>
                      <p className="font-semibold">{selectedRegion.moisture}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">জৈব পদার্থ</p>
                      <p className="font-semibold">{selectedRegion.organicMatter}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">নাইট্রোজেন</p>
                      <p className="font-semibold">{selectedRegion.nitrogen}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Wheat className="h-4 w-4 text-amber-600" />
                    কৃষি তথ্য
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">প্রধান ফসল</span>
                    <span className="font-medium">{selectedRegion.mainCrop}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">মৌসুম</span>
                    <span className="font-medium">{selectedRegion.season}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">প্রত্যাশিত ফলন</span>
                    <span className="font-medium">{selectedRegion.expectedYield}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">প্রকৃত ফলন</span>
                    <span className="font-medium text-orange-600">
                      {selectedRegion.actualYield}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">কৃষক সংখ্যা</span>
                    <span className="font-medium">{selectedRegion.farmers.toLocaleString('bn-BD')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">মোট এলাকা</span>
                    <span className="font-medium">{selectedRegion.area}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Bug className="h-4 w-4 text-red-500" />
                    প্রধান সমস্যা
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-red-600 font-medium">{selectedRegion.mainProblem}</p>
                </CardContent>
              </Card>

              {/* Union-level extra info */}
              {'population' in selectedRegion && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      জনসংখ্যা তথ্য
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">জনসংখ্যা</span>
                      <span className="font-medium">
                        {(selectedRegion as Union).population}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">সাক্ষরতার হার</span>
                      <span className="font-medium">
                        {(selectedRegion as Union).literacyRate}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <MapPin className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
                <p className="text-muted-foreground text-sm">
                  মানচিত্রে একটি বিভাগ নির্বাচন করুন
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Legend */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Layers className="h-4 w-4" />
            মাটির স্বাস্থ্য সূচক লিজেন্ড
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#22c55e' }} />
              <span>চমৎকার (৭৫-১০০)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#eab308' }} />
              <span>মাঝারি (৬০-৭৪)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#f97316' }} />
              <span>দুর্বল (৪৫-৫৯)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ef4444' }} />
              <span>অত্যন্ত দুর্বল (০-৪৪)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <LandPlot className="h-4 w-4" />
              মোট বিভাগ
            </div>
            <p className="text-2xl font-bold mt-1">৮</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              মোট কৃষক
            </div>
            <p className="text-2xl font-bold mt-1">
              {divisions.reduce((sum, d) => sum + d.farmers, 0).toLocaleString('bn-BD')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="h-4 w-4" />
              গড় স্বাস্থ্য সূচক
            </div>
            <p className="text-2xl font-bold mt-1">
              {Math.round(divisions.reduce((sum, d) => sum + d.soilHealth, 0) / divisions.length)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Droplets className="h-4 w-4" />
              গড় pH মান
            </div>
            <p className="text-2xl font-bold mt-1">
              {(divisions.reduce((sum, d) => sum + d.ph, 0) / divisions.length).toFixed(1)}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

