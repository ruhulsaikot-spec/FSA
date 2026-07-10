'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useAppStore } from '@/lib/store'
import {
  MapPin,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Upload,
} from 'lucide-react'

interface FormData {
  name: string
  mouja: string
  dagNo: string
  area: string
  areaUnit: string
  latitude: string
  longitude: string
  elevation: string
  drainage: string
  soilType: string
  waterSource: string
  irrigationSystem: string
  notes: string
}

const STEPS = [
  { label: 'মৌলিক তথ্য', icon: 'file' },
  { label: 'অবস্থান', icon: 'map' },
  { label: 'কৃষি তথ্য', icon: 'agri' },
] as const

export function LandRegistration() {
  const setView = useAppStore((s) => s.setView)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mouja: '',
    dagNo: '',
    area: '',
    areaUnit: 'বিঘা',
    latitude: '',
    longitude: '',
    elevation: '',
    drainage: '',
    soilType: '',
    waterSource: '',
    irrigationSystem: '',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const canProceed = () => {
    if (currentStep === 0) {
      return formData.name.trim() !== '' && formData.area.trim() !== ''
    }
    if (currentStep === 1) {
      return true
    }
    if (currentStep === 2) {
      return formData.soilType !== '' && formData.waterSource !== ''
    }
    return true
  }

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1)
    }
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-4">
        <Card className="max-w-md w-full text-center p-8">
          <div className="mx-auto h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            জমি সফলভাবে নিবন্ধিত হয়েছে!
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            &quot;{formData.name}&quot; নামে আপনার নতুন জমি সিস্টেমে যোগ করা হয়েছে।
            এখন আপনি এই জমির মাটি পরীক্ষা ও অন্যান্য তথ্য দেখতে পারবেন।
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => setView('farm')}>
              জমি তালিকায় যান
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setSubmitted(false)}>
              আরেকটি জমি যোগ করুন
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-3xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setView('farm')}
          className="h-9 w-9"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">নতুন জমি নিবন্ধন</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            আপনার নতুন জমির তথ্য ধাপে ধাপে প্রবেশ করুন
          </p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-0 w-full">
        {STEPS.map((step, idx) => (
          <div key={step.label} className="flex items-center flex-1 last:flex-initial">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`
                  h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors
                  ${idx < currentStep
                    ? 'bg-green-500 text-white'
                    : idx === currentStep
                      ? 'bg-green-600 text-white ring-4 ring-green-100'
                      : 'bg-gray-100 text-gray-400'
                  }
                `}
              >
                {idx < currentStep ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>
              <span
                className={`text-xs font-medium text-center whitespace-nowrap ${
                  idx <= currentStep ? 'text-green-700' : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-3 mt-[-1.25rem] transition-colors ${
                  idx < currentStep ? 'bg-green-400' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Card */}
      <Card className="rounded-xl shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            {currentStep === 0 && '১. মৌলিক তথ্য'}
            {currentStep === 1 && '২. অবস্থান তথ্য'}
            {currentStep === 2 && '৩. কৃষি তথ্য'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Step 1: Basic Info */}
          {currentStep === 0 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label htmlFor="name">জমির নাম <span className="text-red-500">*</span></Label>
                  <Input
                    id="name"
                    placeholder="যেমন: উত্তর পাড়ার জমি"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="mouja">মৌজা</Label>
                  <Input
                    id="mouja"
                    placeholder="মৌজার নাম লিখুন"
                    value={formData.mouja}
                    onChange={(e) => updateField('mouja', e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="dagNo">দাগ নম্বর</Label>
                  <Input
                    id="dagNo"
                    placeholder="যেমন: ১২৩৪"
                    value={formData.dagNo}
                    onChange={(e) => updateField('dagNo', e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="area">
                    এলাকার পরিমাণ <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="area"
                    type="number"
                    placeholder="যেমন: ৫.৫"
                    value={formData.area}
                    onChange={(e) => updateField('area', e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="areaUnit">একক</Label>
                  <Select
                    value={formData.areaUnit}
                    onValueChange={(v) => updateField('areaUnit', v)}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="একক নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="বিঘা">বিঘা</SelectItem>
                      <SelectItem value="একর">একর</SelectItem>
                      <SelectItem value="কাঠা">কাঠা</SelectItem>
                      <SelectItem value="শতক">শতক</SelectItem>
                      <SelectItem value="হেক্টর">হেক্টর</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="latitude">অক্ষাংশ (Latitude)</Label>
                  <Input
                    id="latitude"
                    placeholder="যেমন: ২৩.৯৯৮৭"
                    value={formData.latitude}
                    onChange={(e) => updateField('latitude', e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="longitude">দ্রাঘিমাংশ (Longitude)</Label>
                  <Input
                    id="longitude"
                    placeholder="যেমন: ৯০.৪০৮৬"
                    value={formData.longitude}
                    onChange={(e) => updateField('longitude', e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="elevation">উচ্চতা (মিটার)</Label>
                  <Input
                    id="elevation"
                    placeholder="যেমন: ১২"
                    value={formData.elevation}
                    onChange={(e) => updateField('elevation', e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="drainage">নিষ্কাশন ব্যবস্থা</Label>
                  <Select
                    value={formData.drainage}
                    onValueChange={(v) => updateField('drainage', v)}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="good">ভালো</SelectItem>
                      <SelectItem value="moderate">মাঝারি</SelectItem>
                      <SelectItem value="poor">দুর্বল</SelectItem>
                      <SelectItem value="waterlogged">পানি জমে থাকে</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Map Placeholder */}
              <div>
                <Label>মানচিত্র</Label>
                <div className="mt-1.5 h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                  <MapPin className="h-8 w-8 text-gray-400" />
                  <p className="text-sm font-medium">মানচিত্র এখানে দেখানো হবে</p>
                  <p className="text-xs">অক্ষাংশ ও দ্রাঘিমাংশ প্রবেশ করলে স্বয়ংক্রিয়ভাবে অবস্থান দেখাবে</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Agricultural Info */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>
                    মাটির ধরন <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.soilType}
                    onValueChange={(v) => updateField('soilType', v)}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="মাটির ধরন নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="দোআঁশ মাটি">দোআঁশ মাটি</SelectItem>
                      <SelectItem value="বেলে মাটি">বেলে মাটি</SelectItem>
                      <SelectItem value="এঁটেল মাটি">এঁটেল মাটি</SelectItem>
                      <SelectItem value="বেলে দোআঁশ মাটি">বেলে দোআঁশ মাটি</SelectItem>
                      <SelectItem value="এঁটেল দোআঁশ মাটি">এঁটেল দোআঁশ মাটি</SelectItem>
                      <SelectItem value="পলি মাটি">পলি মাটি</SelectItem>
                      <SelectItem value="টিলা মাটি">টিলা মাটি</SelectItem>
                      <SelectItem value="লবণাক্ত মাটি">লবণাক্ত মাটি</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>
                    পানি উৎস <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.waterSource}
                    onValueChange={(v) => updateField('waterSource', v)}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="পানি উৎস নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="গভীর নলকূপ">গভীর নলকূপ</SelectItem>
                      <SelectItem value="অগভীর নলকূপ">অগভীর নলকূপ</SelectItem>
                      <SelectItem value="নদী/খাল">নদী / খাল</SelectItem>
                      <SelectItem value="বৃষ্টির পানি">বৃষ্টির পানি</SelectItem>
                      <SelectItem value="পুকুর">পুকুর</SelectItem>
                      <SelectItem value="খাল ও বৃষ্টির পানি">খাল ও বৃষ্টির পানি</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>সেচ ব্যবস্থা</Label>
                  <Select
                    value={formData.irrigationSystem}
                    onValueChange={(v) => updateField('irrigationSystem', v)}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="সেচ ব্যবস্থা নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="সেচ নেই">সেচ নেই (নির্ভরশীল বৃষ্টির উপর)</SelectItem>
                      <SelectItem value="পাম্প সেচ">পাম্প সেচ</SelectItem>
                      <SelectItem value="ড্রিপ সেচ">ড্রিপ সেচ</SelectItem>
                      <SelectItem value="স্প্রিংকলার">স্প্রিংকলার</SelectItem>
                      <SelectItem value="বন্যা সেচ">বন্যা সেচ</SelectItem>
                      <SelectItem value="পাইপ সেচ">পাইপ সেচ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Photo Upload Placeholder */}
              <div>
                <Label>জমির ছবি</Label>
                <div className="mt-1.5 h-40 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-muted-foreground cursor-pointer hover:bg-gray-100 transition-colors">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="text-sm font-medium">ছবি আপলোড করতে ক্লিক করুন</p>
                  <p className="text-xs">JPG, PNG বা WEBP — সর্বোচ্চ ৫MB</p>
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="notes">অতিরিক্ত তথ্য</Label>
                <Textarea
                  id="notes"
                  placeholder="যেকোনো অতিরিক্ত তথ্য বা বিশেষ বিষয় লিখুন..."
                  value={formData.notes}
                  onChange={(e) => updateField('notes', e.target.value)}
                  className="mt-1.5"
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-5 border-t">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="gap-1.5"
            >
              <ChevronLeft className="h-4 w-4" />
              পূর্ববর্তী
            </Button>

            {currentStep < STEPS.length - 1 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-green-600 hover:bg-green-700 gap-1.5"
              >
                পরবর্তী
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="bg-green-600 hover:bg-green-700 gap-1.5"
              >
                <CheckCircle2 className="h-4 w-4" />
                জমি নিবন্ধন করুন
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}