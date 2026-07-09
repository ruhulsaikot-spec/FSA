'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  User,
  Bell,
  Globe,
  Shield,
  Smartphone,
  Palette,
  Save,
} from 'lucide-react';

interface Settings {
  // Profile
  name: string;
  phone: string;
  email: string;
  nid: string;
  address: string;
  // Notifications
  notifIrrigation: boolean;
  notifFertilizer: boolean;
  notifDisease: boolean;
  notifWeather: boolean;
  notifPest: boolean;
  notifIoT: boolean;
  // Language & Region
  language: string;
  district: string;
  unitSystem: string;
  // Security
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  twoFactor: boolean;
  // Display
  darkMode: boolean;
  fontSize: string;
}

const defaultSettings: Settings = {
  name: 'মোহাম্মদ আলী',
  phone: '০১৭১২৩৪৫৬৭৮',
  email: 'ali.farm@example.com',
  nid: '১৯৯৫১২৩৪৫৬৭',
  address: 'গ্রাম: নবাবপুর, উপজেলা: কুমারখালী, জেলা: কুষ্টিয়া',
  notifIrrigation: true,
  notifFertilizer: true,
  notifDisease: true,
  notifWeather: true,
  notifPest: false,
  notifIoT: true,
  language: 'bn',
  district: 'kushtia',
  unitSystem: 'bigha',
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  twoFactor: false,
  darkMode: false,
  fontSize: 'medium',
};

const notificationToggles = [
  { key: 'notifIrrigation' as const, label: 'সেচ বিজ্ঞপ্তি', desc: 'সেচের সময় ও পানির স্তর সম্পর্কিত বিজ্ঞপ্তি' },
  { key: 'notifFertilizer' as const, label: 'সার বিজ্ঞপ্তি', desc: 'সার প্রয়োগের সময় ও পরিমাণ সম্পর্কিত বিজ্ঞপ্তি' },
  { key: 'notifDisease' as const, label: 'রোগ বিজ্ঞপ্তি', desc: 'রোগের প্রাদুর্ভাব ও প্রতিকার সম্পর্কিত বিজ্ঞপ্তি' },
  { key: 'notifWeather' as const, label: 'আবহাওয়া বিজ্ঞপ্তি', desc: 'আবহাওয়ার পূর্বাভাস ও সতর্কতা সম্পর্কিত বিজ্ঞপ্তি' },
  { key: 'notifPest' as const, label: 'পোকা বিজ্ঞপ্তি', desc: 'পোকামাকড়ের আক্রমণ ও ঝুঁকি সম্পর্কিত বিজ্ঞপ্তি' },
  { key: 'notifIoT' as const, label: 'IoT ডিভাইস বিজ্ঞপ্তি', desc: 'সেন্সর অফলাইন, ব্যাটারি ও ডিভাইস সমস্যা সম্পর্কিত বিজ্ঞপ্তি' },
];

export function SettingsModule() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [saved, setSaved] = useState(false);

  const handleSettingChange = <K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Palette className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">সেটিংস</CardTitle>
              <p className="text-sm text-muted-foreground">
                আপনার অ্যাকাউন্ট ও প্ল্যাটফর্ম সেটিংস পরিচালনা করুন
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 h-auto gap-1 p-1">
          <TabsTrigger value="profile" className="gap-1.5 text-xs sm:text-sm py-2">
            <User className="h-4 w-4 hidden sm:block" />
            প্রোফাইল
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5 text-xs sm:text-sm py-2">
            <Bell className="h-4 w-4 hidden sm:block" />
            বিজ্ঞপ্তি
          </TabsTrigger>
          <TabsTrigger value="language" className="gap-1.5 text-xs sm:text-sm py-2">
            <Globe className="h-4 w-4 hidden sm:block" />
            ভাষা ও অঞ্চল
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-1.5 text-xs sm:text-sm py-2">
            <Shield className="h-4 w-4 hidden sm:block" />
            নিরাপত্তা
          </TabsTrigger>
          <TabsTrigger value="display" className="gap-1.5 text-xs sm:text-sm py-2">
            <Palette className="h-4 w-4 hidden sm:block" />
            প্রদর্শন
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">প্রোফাইল তথ্য</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">পূর্ণ নাম</Label>
                  <Input
                    id="name"
                    value={settings.name}
                    onChange={(e) => handleSettingChange('name', e.target.value)}
                    placeholder="আপনার পূর্ণ নাম"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">মোবাইল নম্বর</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => handleSettingChange('phone', e.target.value)}
                    placeholder="০১XXXXXXXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">ইমেইল</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleSettingChange('email', e.target.value)}
                    placeholder="example@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nid">জাতীয় পরিচয়পত্র নম্বর</Label>
                  <Input
                    id="nid"
                    value={settings.nid}
                    onChange={(e) => handleSettingChange('nid', e.target.value)}
                    placeholder="আপনার NID নম্বর"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">ঠিকানা</Label>
                <Input
                  id="address"
                  value={settings.address}
                  onChange={(e) => handleSettingChange('address', e.target.value)}
                  placeholder="গ্রাম, উপজেলা, জেলা"
                />
              </div>
              <div className="flex justify-end pt-2">
                <Button onClick={handleSave} className="gap-2 min-w-[120px]">
                  <Save className="h-4 w-4" />
                  {saved ? 'সংরক্ষিত!' : 'সংরক্ষণ করুন'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">বিজ্ঞপ্তি সেটিংস</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                কোন ধরনের বিজ্ঞপ্তি পেতে চান তা নির্বাচন করুন
              </p>
            </CardHeader>
            <CardContent className="space-y-1">
              {notificationToggles.map((toggle) => (
                <div
                  key={toggle.key}
                  className="flex items-center justify-between py-3 border-b last:border-0"
                >
                  <div className="space-y-0.5 pr-4">
                    <Label className="text-sm font-medium">{toggle.label}</Label>
                    <p className="text-xs text-muted-foreground">{toggle.desc}</p>
                  </div>
                  <Switch
                    checked={settings[toggle.key] as boolean}
                    onCheckedChange={(checked) =>
                      handleSettingChange(toggle.key, checked as boolean)
                    }
                  />
                </div>
              ))}
              <div className="flex justify-end pt-4">
                <Button onClick={handleSave} className="gap-2 min-w-[120px]">
                  <Save className="h-4 w-4" />
                  {saved ? 'সংরক্ষিত!' : 'সংরক্ষণ করুন'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Language & Region Tab */}
        <TabsContent value="language">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">ভাষা ও অঞ্চল</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                আপনার পছন্দের ভাষা, অঞ্চল ও একক পদ্ধতি নির্বাচন করুন
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>ভাষা</Label>
                  <Select
                    value={settings.language}
                    onValueChange={(value) =>
                      handleSettingChange('language', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="ভাষা নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bn">বাংলা</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>জেলা</Label>
                  <Select
                    value={settings.district}
                    onValueChange={(value) =>
                      handleSettingChange('district', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="জেলা নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kushtia">কুষ্টিয়া</SelectItem>
                      <SelectItem value="rajshahi">রাজশাহী</SelectItem>
                      <SelectItem value="bogra">বগুড়া</SelectItem>
                      <SelectItem value=" Jessore">যশোর</SelectItem>
                      <SelectItem value="rangpur">রংপুর</SelectItem>
                      <SelectItem value="dhaka">ঢাকা</SelectItem>
                      <SelectItem value="chittagong">চট্টগ্রাম</SelectItem>
                      <SelectItem value="sylhet">সিলেট</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>জমির একক পদ্ধতি</Label>
                  <Select
                    value={settings.unitSystem}
                    onValueChange={(value) =>
                      handleSettingChange('unitSystem', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="একক নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bigha">একর / বিঘা</SelectItem>
                      <SelectItem value="hectare">হেক্টর</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button onClick={handleSave} className="gap-2 min-w-[120px]">
                  <Save className="h-4 w-4" />
                  {saved ? 'সংরক্ষিত!' : 'সংরক্ষণ করুন'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">নিরাপত্তা</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                আপনার পাসওয়ার্ড পরিবর্তন ও নিরাপত্তা সেটিংস পরিচালনা করুন
              </p>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto">
              {/* Password Change */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  পাসওয়ার্ড পরিবর্তন
                </h4>
                <div className="space-y-2">
                  <Label htmlFor="old-password">বর্তমান পাসওয়ার্ড</Label>
                  <Input
                    id="old-password"
                    type="password"
                    value={settings.oldPassword}
                    onChange={(e) =>
                      handleSettingChange('oldPassword', e.target.value)
                    }
                    placeholder="বর্তমান পাসওয়ার্ড লিখুন"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">নতুন পাসওয়ার্ড</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={settings.newPassword}
                      onChange={(e) =>
                        handleSettingChange('newPassword', e.target.value)
                      }
                      placeholder="নতুন পাসওয়ার্ড লিখুন"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">পাসওয়ার্ড নিশ্চিত করুন</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={settings.confirmPassword}
                      onChange={(e) =>
                        handleSettingChange('confirmPassword', e.target.value)
                      }
                      placeholder="নতুন পাসওয়ার্ড আবার লিখুন"
                    />
                  </div>
                </div>
              </div>

              {/* 2FA Toggle */}
              <div className="flex items-center justify-between py-3 border-t border-b">
                <div className="space-y-0.5 pr-4">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    দুই-ধাপ যাচাইকরণ (২FA)
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    আপনার অ্যাকাউন্ট আরও সুরক্ষিত করতে দুই-ধাপ যাচাইকরণ সক্রিয় করুন
                  </p>
                </div>
                <Switch
                  checked={settings.twoFactor}
                  onCheckedChange={(checked) =>
                    handleSettingChange('twoFactor', checked)
                  }
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} className="gap-2 min-w-[120px]">
                  <Save className="h-4 w-4" />
                  {saved ? 'সংরক্ষিত!' : 'সংরক্ষণ করুন'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Display Tab */}
        <TabsContent value="display">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">প্রদর্শন সেটিংস</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                থিম, ফন্ট সাইজ ও অন্যান্য প্রদর্শন সেটিংস পরিবর্তন করুন
              </p>
            </CardHeader>
            <CardContent className="space-y-1">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between py-3 border-b">
                <div className="space-y-0.5 pr-4">
                  <Label className="text-sm font-medium">থিম</Label>
                  <p className="text-xs text-muted-foreground">
                    {settings.darkMode ? 'অন্ধকার মোড সক্রিয়' : 'আলো মোড সক্রিয়'}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className={settings.darkMode ? '' : 'font-semibold text-foreground'}>
                    আলো
                  </span>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={(checked) =>
                      handleSettingChange('darkMode', checked)
                    }
                  />
                  <span className={settings.darkMode ? 'font-semibold text-foreground' : ''}>
                    অন্ধকার
                  </span>
                </div>
              </div>

              {/* Font Size */}
              <div className="flex items-center justify-between py-3 border-b">
                <div className="space-y-0.5 pr-4">
                  <Label className="text-sm font-medium">ফন্ট সাইজ</Label>
                  <p className="text-xs text-muted-foreground">
                    টেক্সটের আকার বড় বা ছোট করুন
                  </p>
                </div>
                <Select
                  value={settings.fontSize}
                  onValueChange={(value) =>
                    handleSettingChange('fontSize', value)
                  }
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="সাইজ নির্বাচন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">ছোট</SelectItem>
                    <SelectItem value="medium">মাঝারি</SelectItem>
                    <SelectItem value="large">বড়</SelectItem>
                    <SelectItem value="xlarge">অতি বড়</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleSave} className="gap-2 min-w-[120px]">
                  <Save className="h-4 w-4" />
                  {saved ? 'সংরক্ষিত!' : 'সংরক্ষণ করুন'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}