// ============================================================
// বাংলাদেশ স্মার্ট ডিজিটাল কৃষি উপদেষ্টা প্ল্যাটফর্ম
// Comprehensive Mock Data — ALL text in Bengali
// ============================================================

// -------------------------------------------------------
// 1. KPI Dashboard Cards
// -------------------------------------------------------
export const kpiData = [
  {
    label: 'মোট জমি',
    value: '১২.৫ একর',
    change: '+২.০ একর',
    changeType: 'up' as const,
    icon: 'MapPin',
  },
  {
    label: 'সক্রিয় ফসল',
    value: '৮ ধরন',
    change: '+২ নতুন',
    changeType: 'up' as const,
    icon: 'Sprout',
  },
  {
    label: 'মাটির হেলথ স্কোর',
    value: '৭৮/১০০',
    change: '+৫ পয়েন্ট',
    changeType: 'up' as const,
    icon: 'HeartPulse',
  },
  {
    label: 'খামার হেলথ',
    value: 'ভালো',
    change: 'স্থিতিশীল',
    changeType: 'up' as const,
    icon: 'ShieldCheck',
  },
  {
    label: 'শস্য উপযুক্ততা',
    value: '৮৫%',
    change: '+৩%',
    changeType: 'up' as const,
    icon: 'BarChart3',
  },
  {
    label: 'IoT ডিভাইস',
    value: '১২টি',
    change: '২টি অফলাইন',
    changeType: 'down' as const,
    icon: 'Wifi',
  },
  {
    label: 'মাসিক আয়',
    value: '৳১,২৫,০০০',
    change: '+১২%',
    changeType: 'up' as const,
    icon: 'Banknote',
  },
  {
    label: 'সেচের অবস্থা',
    value: 'স্বাভাবিক',
    change: 'পরবর্তী: ৩ দিন পর',
    changeType: 'up' as const,
    icon: 'Droplets',
  },
];

// -------------------------------------------------------
// 2. Weather Data
// -------------------------------------------------------
export const weatherData = {
  current: {
    temp: 32,
    humidity: 75,
    wind: 12,
    condition: 'আংশিক মেঘলা',
    feelsLike: 36,
    uv: 7,
    visibility: 8,
    pressure: 1008,
  },
  forecast: [
    {
      day: 'শনিবার',
      tempHigh: 33,
      tempLow: 26,
      condition: 'রৌদ্রোজ্জ্বল',
      rain: 10,
      humidity: 70,
      wind: 10,
    },
    {
      day: 'রবিবার',
      tempHigh: 34,
      tempLow: 27,
      condition: 'রৌদ্রোজ্জ্বল',
      rain: 5,
      humidity: 68,
      wind: 8,
    },
    {
      day: 'সোমবার',
      tempHigh: 31,
      tempLow: 25,
      condition: 'বজ্রপাতসহ বৃষ্টি',
      rain: 75,
      humidity: 85,
      wind: 20,
    },
    {
      day: 'মঙ্গলবার',
      tempHigh: 29,
      tempLow: 24,
      condition: 'ভারী বৃষ্টি',
      rain: 90,
      humidity: 92,
      wind: 25,
    },
    {
      day: 'বুধবার',
      tempHigh: 30,
      tempLow: 25,
      condition: 'হালকা বৃষ্টি',
      rain: 40,
      humidity: 80,
      wind: 15,
    },
    {
      day: 'বৃহস্পতিবার',
      tempHigh: 32,
      tempLow: 26,
      condition: 'আংশিক মেঘলা',
      rain: 20,
      humidity: 72,
      wind: 12,
    },
    {
      day: 'শুক্রবার',
      tempHigh: 33,
      tempLow: 26,
      condition: 'রৌদ্রোজ্জ্বল',
      rain: 5,
      humidity: 65,
      wind: 10,
    },
  ],
};

// -------------------------------------------------------
// 3. Soil Data (detailed metrics)
// -------------------------------------------------------
export const soilData = {
  healthScore: 78,
  texture: 'দোআঁশ মাটি',
  color: 'গাঢ় বাদামি',
  ph: 6.8,
  ec: 1.2,
  moisture: 35,
  temperature: 28,
  organicMatter: 2.1,
  nitrogen: 45,
  phosphorus: 18,
  potassium: 32,
  sulfur: 12,
  calcium: 850,
  magnesium: 180,
  zinc: 1.8,
  iron: 45,
  copper: 1.2,
  boron: 0.5,
  manganese: 8.5,
};

// -------------------------------------------------------
// 4. Soil Trend (12 months)
// -------------------------------------------------------
export const soilTrend = [
  { month: 'বৈশাখ', nitrogen: 42, phosphorus: 16, potassium: 28, organicMatter: 1.9 },
  { month: 'জ্যৈষ্ঠ', nitrogen: 44, phosphorus: 17, potassium: 29, organicMatter: 1.95 },
  { month: 'আষাঢ়', nitrogen: 48, phosphorus: 19, potassium: 33, organicMatter: 2.2 },
  { month: 'শ্রাবণ', nitrogen: 50, phosphorus: 20, potassium: 35, organicMatter: 2.3 },
  { month: 'ভাদ্র', nitrogen: 47, phosphorus: 19, potassium: 34, organicMatter: 2.2 },
  { month: 'আশ্বিন', nitrogen: 46, phosphorus: 18, potassium: 32, organicMatter: 2.15 },
  { month: 'কার্তিক', nitrogen: 43, phosphorus: 17, potassium: 30, organicMatter: 2.0 },
  { month: 'অগ্রহায়ণ', nitrogen: 41, phosphorus: 15, potassium: 28, organicMatter: 1.85 },
  { month: 'পৌষ', nitrogen: 40, phosphorus: 15, potassium: 27, organicMatter: 1.8 },
  { month: 'মাঘ', nitrogen: 39, phosphorus: 14, potassium: 26, organicMatter: 1.75 },
  { month: 'ফাল্গুন', nitrogen: 41, phosphorus: 16, potassium: 28, organicMatter: 1.9 },
  { month: 'চৈত্র', nitrogen: 45, phosphorus: 18, potassium: 32, organicMatter: 2.1 },
];

// -------------------------------------------------------
// 5. Soil Problems
// -------------------------------------------------------
export const soilProblems = [
  {
    name: 'জৈব পদার্থের ঘাটতি',
    severity: 'high' as const,
    cause: 'দীর্ঘদিন রাসায়নিক সার ব্যবহার এবং জৈব সারের অভাব',
    damage: 'মাটির জলধারণ ক্ষমতা হ্রাস পাচ্ছে, ফসলের পুষ্টিগুণ কমে যাচ্ছে',
    solution: 'গোবর সার ও পাতা সার প্রয়োগ করুন, আবর্জনা পচানো পদ্ধতি চালু করুন',
    daysToFix: 90,
    priority: 1,
  },
  {
    name: 'বোরনের অভাব',
    severity: 'medium' as const,
    cause: 'মাটিতে বোরনের মাত্রা স্বাভাবিকের চেয়ে কম (০.৫ পিপিএম)',
    damage: 'ধানের শঙ্কু রচনায় সমস্যা, ফলে দানা কম হওয়া',
    solution: 'বোর্যাক্স সার ১০ কেজি/হেক্টর হারে প্রয়োগ করুন',
    daysToFix: 30,
    priority: 2,
  },
  {
    name: 'মাটির অম্লতা বৃদ্ধি',
    severity: 'medium' as const,
    cause: 'অতিরিক্ত ইউরিয়া সার ব্যবহার এবং বৃষ্টির পানির অপচয়',
    damage: 'পিএইচ মান কমে যাচ্ছে, পুষ্টিউপাদান শোষণ কমে যাচ্ছে',
    solution: 'চুন প্রয়োগ করুন (২-৩ টন/হেক্টর), জৈব সার ব্যবহার বাড়ান',
    daysToFix: 60,
    priority: 3,
  },
  {
    name: 'লবণাক্ততা বৃদ্ধি',
    severity: 'low' as const,
    cause: 'ভূগর্ভস্থ পানির অতিরিক্ত ব্যবহার',
    damage: 'ফসলের বৃদ্ধি ধীর হওয়া, পাতা হলুদ হয়ে যাওয়া',
    solution: 'মিষ্টি পানি সেচ দিন, জৈব সার প্রয়োগ করুন',
    daysToFix: 45,
    priority: 4,
  },
  {
    name: 'জিংকের অভাব',
    severity: 'medium' as const,
    cause: 'উচ্চ পিএইচ মাটিতে জিংকের প্রাপ্যতা কমে যাওয়া',
    damage: 'ধানের পাতায় বাদামি দাগ, উৎপাদন কমে যাওয়া',
    solution: 'জিংক সালফেট ৫ কেজি/হেক্টর মাটিতে প্রয়োগ করুন',
    daysToFix: 25,
    priority: 5,
  },
  {
    name: 'মাটি সংকোচন (Compaction)',
    severity: 'low' as const,
    cause: 'ভারী যন্ত্রপাতির ব্যবহার এবং অতিরিক্ত চাষাবাদ',
    damage: 'মূল বৃদ্ধি বাধাপ্রাপ্ত হওয়া, পানি নিষ্কাশনে সমস্যা',
    solution: 'লাঙ্গল দিয়ে মাটি ভালোভাবে চাষ করুন, সবুজ সারের ব্যবস্থা করুন',
    daysToFix: 40,
    priority: 6,
  },
];

// -------------------------------------------------------
// 6. AI Recommendations
// -------------------------------------------------------
export const aiRecommendations = [
  {
    title: 'ইউরিয়া সারের পরিমাণ বাড়ান',
    description: 'মাটি পরীক্ষায় নাইট্রোজেনের মাত্রা ৪৫ কেজি/হেক্টর পাওয়া গেছে, যা আদর্শ মাত্রার চেয়ে কম। ধানের বৃদ্ধি পর্যায়ে অতিরিক্ত ২০ কেজি/হেক্টর ইউরিয়া প্রয়োগ করুন।',
    confidence: 92,
    type: 'fertilizer' as const,
    priority: 1,
  },
  {
    title: 'আগামী ৩ দিনে সেচ দিন',
    description: 'আবহাওয়ার পূর্বাভাস অনুযায়ী আগামী সোম ও মঙ্গলবার বজ্রপাতসহ ভারী বৃষ্টি হতে পারে। তবে বর্তমানে মাটির আর্দ্রতা ৩৫% যা সর্বনিম্ন সীমার কাছাকাছি। আজই হালকা সেচ দিন যাতে বৃষ্টির আগে ফসল সুরক্ষিত থাকে।',
    confidence: 88,
    type: 'irrigation' as const,
    priority: 2,
  },
  {
    title: 'পাতা মাকড়সা দমনে প্রস্তুত থাকুন',
    description: 'বর্তমান আর্দ্র আবহাওয়া ও তাপমাত্রায় পাতা মাকড়সার আক্রমণের ঝুঁকি বেশি। নিয়মিত পর্যবেক্ষণ করুন এবং আক্রমণ দেখা দিলে অ্যাবামেকটিন প্রয়োগ করুন।',
    confidence: 75,
    type: 'pesticide' as const,
    priority: 3,
  },
  {
    title: 'বোরন সার প্রয়োগ করুন',
    description: 'মাটি পরীক্ষায় বোরনের মাত্রা ০.৫ পিপিএম পাওয়া গেছে, যা স্বাভাবিকের চেয়ে কম। ধানের শঙ্কু রচনার পর্যায়ে বোর্যাক্স সার প্রয়োগ করলে ফলন বৃদ্ধি পাবে ১৫-২০%।',
    confidence: 95,
    type: 'fertilizer' as const,
    priority: 4,
  },
  {
    title: 'ফসল রোটেশন পরিকল্পনা তৈরি করুন',
    description: 'একই জমিতে পরপর তিন মৌসুম ধরে ধান চাষ হচ্ছে। মাটির স্বাস্থ্য রক্ষার জন্য পরবর্তী মৌসুমে সরিষা বা মুগ ডাল চাষ করুন। এতে নাইট্রোজেন স্থিরীকরণ হবে এবং মাটির জৈব পদার্থ বাড়বে।',
    confidence: 82,
    type: 'general' as const,
    priority: 5,
  },
];

// -------------------------------------------------------
// 7. Fertilizer Plan
// -------------------------------------------------------
export const fertilizerPlan = [
  {
    name: 'ইউরিয়া',
    amount: 65,
    unit: 'কেজি/বিঘা',
    stage: 'প্রথম সারি (টিলিং)',
    date: '২০২৫ আষাঢ় ৫',
    benefit: 'ধানের প্রাথমিক বৃদ্ধি ও কণিক গঠনে সহায়তা',
  },
  {
    name: 'টিএসপি (ট্রিপল সুপার ফসফেট)',
    amount: 20,
    unit: 'কেজি/বিঘা',
    stage: 'চূড়ান্ত চাষের সময়',
    date: '২০২৫ আষাঢ় ৩',
    benefit: 'মূল বিকাশ ও শক্তি সঞ্চয়ে সহায়তা',
  },
  {
    name: 'এমওপি (মিউরিয়েট অফ পটাশ)',
    amount: 15,
    unit: 'কেজি/বিঘা',
    stage: 'চূড়ান্ত চাষের সময়',
    date: '২০২৫ আষাঢ় ৩',
    benefit: 'রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি ও শস্যের মান উন্নয়ন',
  },
  {
    name: 'জিংক সালফেট',
    amount: 5,
    unit: 'কেজি/বিঘা',
    stage: 'রোপণের সময়',
    date: '২০২৫ আষাঢ় ১০',
    benefit: 'ধানের পাতার সবুজতা বৃদ্ধি ও দানার ওজন বাড়াতে সহায়তা',
  },
  {
    name: 'বোর্যাক্স',
    amount: 10,
    unit: 'কেজি/বিঘা',
    stage: 'শঙ্কু রচনার পর্যায়',
    date: '২০২৫ শ্রাবণ ১৫',
    benefit: 'ফলন বৃদ্ধি ও দানার গুণমান উন্নয়ন',
  },
  {
    name: 'গোবর সার',
    amount: 500,
    unit: 'কেজি/বিঘা',
    stage: 'জমি তৈরির সময়',
    date: '২০২৫ জ্যৈষ্ঠ ২৫',
    benefit: 'মাটির জৈব পদার্থ বৃদ্ধি ও জলধারণ ক্ষমতা উন্নয়ন',
  },
  {
    name: 'ইউরিয়া (দ্বিতীয় ডোজ)',
    amount: 35,
    unit: 'কেজি/বিঘা',
    stage: 'পিকিং পর্যায়',
    date: '২০২৫ শ্রাবণ ৫',
    benefit: 'শঙ্কু গঠন ও দানা ভরাট হতে সহায়তা',
  },
];

// -------------------------------------------------------
// 8. Irrigation Plan
// -------------------------------------------------------
export const irrigationPlan = {
  currentMoisture: 35,
  nextIrrigation: '৩ দিন পর (সোমবার)',
  waterAmount: '২.৫ ইঞ্চি',
  rainChance: 75,
  savings: '২০% পানি সাশ্রয় হয়েছে এই মাসে',
};

// -------------------------------------------------------
// 9. Crop Suggestions
// -------------------------------------------------------
export const cropSuggestions = [
  {
    name: 'বোরো ধান (ব্রি-৮৯)',
    suitabilityScore: 95,
    yield: '৪.৫ টন/হেক্টর',
    profit: '৳৮৫,০০০/হেক্টর',
    duration: '১৫০-১৬০ দিন',
    waterNeed: 'উচ্চ',
    fertilizerNeed: 'মাঝারি',
    riskLevel: 'কম',
    roi: '১৮০%',
    season: 'বোরো (শীতকালীন)',
  },
  {
    name: 'আমন ধান (ব্রি-৪৭)',
    suitabilityScore: 91,
    yield: '৫.০ টন/হেক্টর',
    profit: '৳৯৫,০০০/হেক্টর',
    duration: '১৪০-১৫০ দিন',
    waterNeed: 'উচ্চ',
    fertilizerNeed: 'মাঝারি',
    riskLevel: 'কম',
    roi: '১৯৫%',
    season: 'আমন (মৌসুমী)',
  },
  {
    name: 'সরিষা (টরি-৭)',
    suitabilityScore: 82,
    yield: '১.২ টন/হেক্টর',
    profit: '৳৬০,০০০/হেক্টর',
    duration: '৯০-১০০ দিন',
    waterNeed: 'কম',
    fertilizerNeed: 'কম',
    riskLevel: 'মাঝারি',
    roi: '২২০%',
    season: 'রবি (শীতকালীন)',
  },
  {
    name: 'মুগ ডাল (বারি মুগ-৬)',
    suitabilityScore: 78,
    yield: '১.৫ টন/হেক্টর',
    profit: '৳৭৫,০০০/হেক্টর',
    duration: '৬০-৭০ দিন',
    waterNeed: 'কম',
    fertilizerNeed: 'অত্যন্ত কম',
    riskLevel: 'মাঝারি',
    roi: '২৫০%',
    season: 'খরিফ-১ (গ্রীষ্মকালীন)',
  },
  {
    name: 'পেঁয়াজ (বারি পেঁয়াজ-৪)',
    suitabilityScore: 74,
    yield: '১২ টন/হেক্টর',
    profit: '৳২,০০,০০০/হেক্টর',
    duration: '১২০-১৩০ দিন',
    waterNeed: 'মাঝারি',
    fertilizerNeed: 'মাঝারি',
    riskLevel: 'উচ্চ',
    roi: '৩০০%',
    season: 'রবি (শীতকালীন)',
  },
  {
    name: 'আলু (কার্ডিনাল)',
    suitabilityScore: 70,
    yield: '২৫ টন/হেক্টর',
    profit: '৳১,৮০,০০০/হেক্টর',
    duration: '৯০-১০০ দিন',
    waterNeed: 'মাঝারি',
    fertilizerNeed: 'উচ্চ',
    riskLevel: 'মাঝারি',
    roi: '২১০%',
    season: 'রবি (শীতকালীন)',
  },
];

// -------------------------------------------------------
// 10. Disease Predictions
// -------------------------------------------------------
export const diseasePredictions = [
  {
    name: 'ধানের ব্লাস্ট রোগ',
    riskLevel: 'মাঝারি',
    cause: 'উচ্চ আর্দ্রতা ও তাপমাত্রার তারতম্য, ম্যাগনাপোর্থি গ্রাইসিয়া ছত্রাক',
    symptoms: 'পাতায় ডিম্বাকৃতি বাদামি দাগ, গাছের কণ্ড শুকিয়ে যাওয়া',
    prevention: 'রোগ প্রতিরোধী জাত ব্যবহার করুন, নাইট্রোজেন সারের ব্যবহার নিয়ন্ত্রণ করুন',
    action: 'ট্রাইসাইক্লাজোল ছত্রাকনাশক ০.৬ মিলি/লিটার হারে স্প্রে করুন',
    confidence: 82,
  },
  {
    name: 'ধানের পাতা ঝলসানো রোগ (ব্যাক্টেরিয়াল লিফ ব্লাইট)',
    riskLevel: 'উচ্চ',
    cause: 'জেরোমোনাস অরিজি ব্যাকটেরিয়া, ঝড়ো বৃষ্টি ও উচ্চ আর্দ্রতা',
    symptoms: 'পাতার কিনারা থেকে হলুদ-বাদামি রঙের জলযুক্ত দাগ',
    prevention: 'রোগ মুক্ত বীজ ব্যবহার করুন, জমিতে অতিরিক্ত নাইট্রোজেন সার প্রয়োগ এড়িয়ে চলুন',
    action: 'স্ট্রেপ্টোসাইক্লিন + কপার অক্সিক্লোরাইড মিশ্রণ স্প্রে করুন',
    confidence: 88,
  },
  {
    name: 'ধানের খরা রোগ (শিয়াট ব্লাইট)',
    riskLevel: 'কম',
    cause: 'রাইজোকটোনিয়া সোলানি ছত্রাক, মাটিতে অতিরিক্ত আর্দ্রতা',
    symptoms: 'গাছের গোড়ায় পানি ধরা, পাতা হলুদ হয়ে শুকিয়ে যাওয়া',
    prevention: 'চারা রোপণের আগে জমি ভালোভাবে শুকান, সুষম সার ব্যবস্থাপনা করুন',
    action: 'ট্রাইডেমিফন বা হেক্সাকোনাজোল ছত্রাকনাশক প্রয়োগ করুন',
    confidence: 65,
  },
  {
    name: 'ধানের স্টেম রট রোগ',
    riskLevel: 'মাঝারি',
    cause: 'স্ক্লেরোটিয়াম অরিজি ছত্রাক, জমিতে অতিরিক্ত নাইট্রোজেন ও ঘন রোপণ',
    symptoms: 'গাছের কণ্ডের ভেতরে কালো দাগ, শঙ্কু শূন্য হওয়া',
    prevention: 'সঠিক দূরত্বে চারা রোপণ করুন, অতিরিক্ত সার প্রয়োগ এড়িয়ে চলুন',
    action: 'প্রোপিকোনাজোল ছত্রাকনাশক স্প্রে করুন',
    confidence: 73,
  },
];

// -------------------------------------------------------
// 11. Pest Predictions
// -------------------------------------------------------
export const pestPredictions = [
  {
    name: 'বাদামী উদ্ভিদ মাকড়সা (Brown Plant Hopper)',
    riskLevel: 'উচ্চ',
    attackTime: 'সন্ধ্যা থেকে ভোর পর্যন্ত',
    prevention: 'জমির পাশে ফাঁকা জায়গা রাখুন, পোকার প্রাকৃতিক শত্রু (তেলাপোকা, মাকড়সা) সংরক্ষণ করুন',
    action: 'বিপন্ন এলাকায় ইমিডাক্লোপ্রিড বা ফিপ্রোনিল কীটনাশক স্প্রে করুন',
  },
  {
    name: 'সবুজ পাতা ছিদ্রকারী (Green Leafhopper)',
    riskLevel: 'মাঝারি',
    attackTime: 'সকাল ও বিকেলে',
    prevention: 'পাতার নিচের দিকে নিয়মিত পর্যবেক্ষণ করুন, আলোক ফাঁদ ব্যবহার করুন',
    action: 'ডায়নোনেক বা এসিফেট কীটনাশক প্রয়োগ করুন',
  },
  {
    name: 'ধানের কাণ্ড মাকড়সা (Stem Borer)',
    riskLevel: 'মাঝারি',
    attackTime: 'রাতের বেলা',
    prevention: 'আগাম রোপণ করুন, জমি পরিষ্কার রাখুন, ফেরোমন ফাঁদ স্থাপন করুন',
    action: 'ক্লোরানট্রানিলিপ্রোল বা ফিপ্রোনিল কীটনাশক স্প্রে করুন',
  },
  {
    name: 'গান্ধি পোকা (Rice Hispa)',
    riskLevel: 'কম',
    attackTime: 'দিনের বেলা',
    prevention: 'পাতায় সাদা সুতার মতো চিহ্ন খুঁজে দেখুন, নিয়মিত পর্যবেক্ষণ করুন',
    action: 'সাইপারমেথ্রিন কীটনাশক স্প্রে করুন',
  },
];

// -------------------------------------------------------
// 12. Market Prices
// -------------------------------------------------------
export const marketPrices = [
  {
    crop: 'চাল (মিনিকেট)',
    todayPrice: 75,
    yesterdayPrice: 73,
    change: '+২',
    unit: 'টাকা/কেজি',
    district: 'দিনাজপুর',
    trend: 'up' as const,
    demand: 'চাহিদা বেশি',
  },
  {
    crop: 'ধান (বোরো)',
    todayPrice: 32,
    yesterdayPrice: 33,
    change: '-১',
    unit: 'টাকা/কেজি',
    district: 'রাজশাহী',
    trend: 'down' as const,
    demand: 'স্বাভাবিক',
  },
  {
    crop: 'সরিষার তেল',
    todayPrice: 185,
    yesterdayPrice: 185,
    change: '০',
    unit: 'টাকা/লিটার',
    district: 'যশোর',
    trend: 'stable' as const,
    demand: 'স্বাভাবিক',
  },
  {
    crop: 'পেঁয়াজ',
    todayPrice: 65,
    yesterdayPrice: 60,
    change: '+৫',
    unit: 'টাকা/কেজি',
    district: 'রাজশাহী',
    trend: 'up' as const,
    demand: 'চাহিদা বেশি',
  },
  {
    crop: 'আলু',
    todayPrice: 35,
    yesterdayPrice: 38,
    change: '-৩',
    unit: 'টাকা/কেজি',
    district: 'বগুড়া',
    trend: 'down' as const,
    demand: 'কম',
  },
  {
    crop: 'মরিচ (শুকনো)',
    todayPrice: 320,
    yesterdayPrice: 310,
    change: '+১০',
    unit: 'টাকা/কেজি',
    district: 'বগুড়া',
    trend: 'up' as const,
    demand: 'চাহিদা বেশি',
  },
  {
    crop: 'ডাল (মুগ)',
    todayPrice: 140,
    yesterdayPrice: 142,
    change: '-২',
    unit: 'টাকা/কেজি',
    district: 'রাজশাহী',
    trend: 'down' as const,
    demand: 'স্বাভাবিক',
  },
  {
    crop: 'সাজনা শাক',
    todayPrice: 30,
    yesterdayPrice: 25,
    change: '+৫',
    unit: 'টাকা/কেজি',
    district: 'ঢাকা',
    trend: 'up' as const,
    demand: 'চাহিদা বেশি',
  },
];

// -------------------------------------------------------
// 13. Calendar Tasks
// -------------------------------------------------------
export const calendarTasks = [
  {
    date: '২০২৫-০৭-০৩',
    title: 'ইউরিয়া সার প্রয়োগ',
    type: 'fertilizer' as const,
    status: 'completed' as const,
    description: 'ধানের জমিতে প্রথম ডোজ ইউরিয়া সার প্রয়োগ (২৫ কেজি/বিঘা)',
  },
  {
    date: '২০২৫-০৭-০৫',
    title: 'হালকা সেচ দেওয়া',
    type: 'irrigation' as const,
    status: 'completed' as const,
    description: 'মাটির আর্দ্রতা বজায় রাখতে ২ ইঞ্চি পানি দেওয়া',
  },
  {
    date: '২০২৫-০৭-০৮',
    title: 'পাতা মাকড়সা দমন',
    type: 'pesticide' as const,
    status: 'completed' as const,
    description: 'অ্যাবামেকটিন কীটনাশক স্প্রে করা হয়েছে',
  },
  {
    date: '২০২৫-০৭-১২',
    title: 'দ্বিতীয় ডোজ সার প্রয়োগ',
    type: 'fertilizer' as const,
    status: 'pending' as const,
    description: 'পিকিং পর্যায়ে ইউরিয়া সার প্রয়োগ (২০ কেজি/বিঘা)',
  },
  {
    date: '২০২৫-০৭-১৫',
    title: 'সেচ দেওয়া',
    type: 'irrigation' as const,
    status: 'pending' as const,
    description: 'শঙ্কু রচনার পর্যায়ে ৩ ইঞ্চি পানি দেওয়া',
  },
  {
    date: '২০২৫-০৭-২০',
    title: 'বোর্যাক্স সার প্রয়োগ',
    type: 'fertilizer' as const,
    status: 'pending' as const,
    description: 'শঙ্কু রচনার সময় বোরন সার প্রয়োগ (১০ কেজি/বিঘা)',
  },
  {
    date: '২০২৫-০৭-২৫',
    title: 'ছত্রাকনাশক স্প্রে',
    type: 'pesticide' as const,
    status: 'pending' as const,
    description: 'ব্লাস্ট রোগ প্রতিরোধে ট্রাইসাইক্লাজোল স্প্রে করা',
  },
  {
    date: '২০২৫-০৬-২৫',
    title: 'চারা রোপণ',
    type: 'sowing' as const,
    status: 'completed' as const,
    description: 'বোরো ধান ব্রি-৮৯ এর চারা রোপণ সম্পন্ন',
  },
  {
    date: '২০২৫-০৬-২০',
    title: 'জমি তৈরি ও সার প্রয়োগ',
    type: 'fertilizer' as const,
    status: 'completed' as const,
    description: 'চূড়ান্ত চাষ ও টিএসপি, এমওপি সার প্রয়োগ',
  },
  {
    date: '২০২৫-০৬-১৫',
    title: 'পূর্ববর্তী ফসল কাটাই',
    type: 'harvest' as const,
    status: 'overdue' as const,
    description: 'রবি মৌসুমের সরিষা ফসল কাটাই ও জমি পরিষ্কার',
  },
];

// -------------------------------------------------------
// 14. Farms
// -------------------------------------------------------
export const farms = [
  {
    id: 'farm-001',
    name: 'মূল খামার — উত্তর পাড়া',
    location: 'গ্রাম: চাঁদপুর, উপজেলা: গাজীপুর, জেলা: ঢাকা',
    area: 5.5,
    areaUnit: 'বিঘা',
    currentCrop: 'বোরো ধান (ব্রি-৮৯)',
    previousCrop: 'সরিষা (টরি-৭)',
    soilType: 'দোআঁশ মাটি',
    waterSource: 'গভীর নলকূপ',
    healthScore: 82,
    gpsLat: 23.9987,
    gpsLng: 90.4086,
  },
  {
    id: 'farm-002',
    name: 'দক্ষিণ খামার — বিলের ধার',
    location: 'গ্রাম: নলডাঙ্গা, উপজেলা: কালীগঞ্জ, জেলা: গাজীপুর',
    area: 4.0,
    areaUnit: 'বিঘা',
    currentCrop: 'আমন ধান (ব্রি-৪৭)',
    previousCrop: 'জুম পদ্ধতিতে মুগ ডাল',
    soilType: 'বেলে দোআঁশ মাটি',
    waterSource: 'খাল ও বৃষ্টির পানি',
    healthScore: 74,
    gpsLat: 23.9856,
    gpsLng: 90.4231,
  },
  {
    id: 'farm-003',
    name: 'নতুন জমি — মাঠপাড়া',
    location: 'গ্রাম: টেংরা, উপজেলা: শ্রীপুর, জেলা: মানিকগঞ্জ',
    area: 3.0,
    areaUnit: 'বিঘা',
    currentCrop: 'পেঁয়াজ (বারি পেঁয়াজ-৪)',
    previousCrop: 'আলু (কার্ডিনাল)',
    soilType: 'এঁটেল দোআঁশ মাটি',
    waterSource: 'অগভীর নলকূপ',
    healthScore: 68,
    gpsLat: 23.8614,
    gpsLng: 90.0152,
  },
];

// -------------------------------------------------------
// 15. IoT Devices
// -------------------------------------------------------
export const iotDevices = [
  {
    id: 'iot-001',
    name: 'মাটির আর্দ্রতা সেন্সর (ক্ষেত্র ১)',
    type: 'মাটি সেন্সর',
    status: 'online' as const,
    battery: 87,
    signal: 92,
    firmware: 'v2.4.1',
    lastReading: '২ মিনিট আগে',
    installDate: '২০২৪-১২-১৫',
    maintenance: '২০২৫-১২-১৫',
  },
  {
    id: 'iot-002',
    name: 'আবহাওয়া স্টেশন (মূল খামার)',
    type: 'আবহাওয়া স্টেশন',
    status: 'online' as const,
    battery: 95,
    signal: 98,
    firmware: 'v3.1.0',
    lastReading: '১ মিনিট আগে',
    installDate: '২০২৪-১১-০১',
    maintenance: '২০২৫-১১-০১',
  },
  {
    id: 'iot-003',
    name: 'পানির স্তর সেন্সর (নলকূপ)',
    type: 'পানি সেন্সর',
    status: 'offline' as const,
    battery: 12,
    signal: 0,
    firmware: 'v1.8.3',
    lastReading: '৩ ঘন্টা আগে',
    installDate: '২০২৫-০১-২০',
    maintenance: '২০২৫-০৭-২০',
  },
  {
    id: 'iot-004',
    name: 'স্বয়ংক্রিয় সেচ ভাল্ব (ক্ষেত্র ২)',
    type: 'সেচ নিয়ন্ত্রক',
    status: 'online' as const,
    battery: 72,
    signal: 85,
    firmware: 'v2.2.0',
    lastReading: '৫ মিনিট আগে',
    installDate: '২০২৫-০২-১০',
    maintenance: '২০২৬-০২-১০',
  },
];

// -------------------------------------------------------
// 16. Notifications
// -------------------------------------------------------
export const notifications = [
  {
    id: 'notif-001',
    title: 'পানির স্তর সেন্সর অফলাইন',
    message: 'আপনার নলকূপের পানি সেন্সরটি ৩ ঘন্টা ধরে অফলাইন আছে। ব্যাটারি ১২%-এ নেমে গেছে। দ্রুত ব্যাটারি পরিবর্তন করুন।',
    type: 'danger' as const,
    time: '৩ ঘন্টা আগে',
    read: false,
  },
  {
    id: 'notif-002',
    title: 'ভারী বৃষ্টির সতর্কতা',
    message: 'আগামী সোম ও মঙ্গলবার আপনার এলাকায় বজ্রপাতসহ ভারী বৃষ্টি হতে পারে। সেচ ব্যবস্থা পরীক্ষা করুন এবং জমিতে অতিরিক্ত পানি জমতে না দিন।',
    type: 'warning' as const,
    time: '১ ঘন্টা আগে',
    read: false,
  },
  {
    id: 'notif-003',
    title: 'মাটির পরীক্ষা রিপোর্ট প্রস্তুত',
    message: 'আপনার মূল খামারের মাটি পরীক্ষার রিপোর্ট প্রস্তুত হয়েছে। স্বাস্থ্য স্কোর ৭৮/১০০। বোরনের অভাব ও জৈব পদার্থের ঘাটতি চিহ্নিত হয়েছে।',
    type: 'info' as const,
    time: '৫ ঘন্টা আগে',
    read: true,
  },
  {
    id: 'notif-004',
    title: 'সার প্রয়োগের সময় এসেছে',
    message: 'আগামী ১২ তারিখে পিকিং পর্যায়ে দ্বিতীয় ডোজ ইউরিয়া সার প্রয়োগ করতে হবে। পরিমাণ: ২০ কেজি/বিঘা।',
    type: 'info' as const,
    time: '১ দিন আগে',
    read: true,
  },
  {
    id: 'notif-005',
    title: 'ফসলের বৃদ্ধি ভালো হচ্ছে',
    message: 'আপনার বোরো ধানের ক্ষেত্রে ফসলের বৃদ্ধি সন্তোষজনক। গড় উচ্চতা স্বাভাবিকের চেয়ে ৫% বেশি।',
    type: 'success' as const,
    time: '২ দিন আগে',
    read: true,
  },
  {
    id: 'notif-006',
    title: 'পোকার ঝুঁকি সতর্কতা',
    message: 'আপনার এলাকায় বাদামী উদ্ভিদ মাকড়সার আক্রমণের ঝুঁকি বেশি। নিয়মিত পর্যবেক্ষণ করুন এবং প্রয়োজনে কীটনাশক প্রয়োগ করুন।',
    type: 'warning' as const,
    time: '২ দিন আগে',
    read: false,
  },
  {
    id: 'notif-007',
    title: 'বাজারদর আপডেট',
    message: 'চালের দাম গতকালের চেয়ে ২ টাকা বেড়ে ৭৫ টাকা/কেজি হয়েছে। পেঁয়াজের দামও বাড়ছে। এটি বিক্রির জন্য ভালো সময় হতে পারে।',
    type: 'info' as const,
    time: '৩ দিন আগে',
    read: true,
  },
  {
    id: 'notif-008',
    title: 'সেচ সাশ্রয় সাফল্য',
    message: 'এই মাসে IoT সেন্সর ভিত্তিক সেচ ব্যবস্থাপনায় ২০% পানি সাশ্রয় হয়েছে। মোট সাশ্রয়: ৫,০০০ লিটার।',
    type: 'success' as const,
    time: '৫ দিন আগে',
    read: true,
  },
];

// -------------------------------------------------------
// 17. Chat Messages
// -------------------------------------------------------
export const chatMessages = [
  {
    role: 'user' as const,
    content: 'আমার ধানের জমিতে পাতায় বাদামি দাগ দেখা যাচ্ছে। এটা কী রোগ?',
    time: 'সকাল ১০:৩০',
  },
  {
    role: 'assistant' as const,
    content: 'আপনার বর্ণনা অনুযায়ী এটি ধানের ব্লাস্ট রোগ (Blast Disease) হতে পারে। এই রোগে পাতায় ডিম্বাকৃতি বাদামি দাগ দেখা যায়। আপনার মাটির আর্দ্রতা ও তাপমাত্রার তথ্য দেখে এই রোগের ঝুঁকি মাঝারি পর্যায়ে রয়েছে। আমি সুপারিশ করছি ট্রাইসাইক্লাজোল ছত্রাকনাশক ০.৬ মিলি/লিটার হারে স্প্রে করতে। এছাড়া নাইট্রোজেন সারের পরিমাণ নিয়ন্ত্রণে রাখুন।',
    time: 'সকাল ১০:৩১',
  },
  {
    role: 'user' as const,
    content: 'আগামী মৌসুমে কোন ফসল চাষ করলে বেশি লাভ হবে?',
    time: 'সকাল ১০:৩৫',
  },
  {
    role: 'assistant' as const,
    content: 'আপনার জমির মাটির ধরন (দোআঁশ মাটি) ও বর্তমান মৌসুম বিবেচনা করে আমি নিম্নলিখিত ফসলগুলো সুপারিশ করছি:\n\n১. **বোরো ধান (ব্রি-৮৯)** — উপযুক্ততা ৯৫%, আনুমানিক লাভ ৳৮৫,০০০/হেক্টর\n২. **সরিষা (টরি-৭)** — উপযুক্ততা ৮২%, আনুমানিক লাভ ৳৬০,০০০/হেক্টর\n৩. **পেঁয়াজ (বারি পেঁয়াজ-৪)** — উপযুক্ততা ৭৪%, আনুমানিক লাভ ৳২,০০,০০০/হেক্টর (ঝুঁকি বেশি কিন্তু লাভও বেশি)\n\nআপনি "ফসল নির্বাচন" পৃষ্ঠায় বিস্তারিত তথ্য দেখতে পারেন।',
    time: 'সকাল ১০:৩৬',
  },
  {
    role: 'user' as const,
    content: 'আমার জমিতে কবে সেচ দেওয়া উচিত?',
    time: 'সকাল ১০:৪০',
  },
  {
    role: 'assistant' as const,
    content: 'আপনার IoT মাটির আর্দ্রতা সেন্সর অনুযায়ী বর্তমানে মাটির আর্দ্রতা ৩৫% আছে, যা সর্বনিম্ন সীমার কাছাকাছি। তবে আবহাওয়ার পূর্বাভাস অনুযায়ী আগামী সোম ও মঙ্গলবার ৭৫-৯০% সম্ভাবনা বৃষ্টি হবে।\n\nআমার সুপারিশ: আজই হালকা সেচ (১.৫ ইঞ্চি) দিন যাতে বৃষ্টি শুরু হওয়ার আগে ফসল সুরক্ষিত থাকে। বৃষ্টির পরে পরবর্তী সেচের সিদ্ধান্ত নেওয়া হবে। এতে পানির অপচয় কমবে এবং আনুমানিক ২০% পানি সাশ্রয় হবে।',
    time: 'সকাল ১০:৪১',
  },
];

// -------------------------------------------------------
// 18. Navigation Items
// -------------------------------------------------------
export const navItems = [
  { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: 'LayoutDashboard', view: 'dashboard', group: 'প্রধান' },
  { id: 'my-farms', label: 'আমার খামার', icon: 'MapPin', view: 'farm', group: 'খামার ও জমি' },
  { id: 'land-registration', label: 'জমি নিবন্ধন', icon: 'Leaf', view: 'land-register', group: 'খামার ও জমি' },
  { id: 'soil-info', label: 'মাটির তথ্য', icon: 'TestTube2', view: 'soil', group: 'মাটি বিশ্লেষণ' },
  { id: 'soil-health-card', label: 'মাটির হেলথ কার্ড', icon: 'HeartPulse', view: 'soil-health-card', group: 'মাটি বিশ্লেষণ' },
  { id: 'soil-problems', label: 'মাটির সমস্যা', icon: 'AlertTriangle', view: 'soil-problem', group: 'মাটি বিশ্লেষণ' },
  { id: 'iot-devices', label: 'IoT ডিভাইস', icon: 'Wifi', view: 'iot', group: 'প্রযুক্তি' },
  { id: 'weather', label: 'আবহাওয়া', icon: 'CloudSun', view: 'weather', group: 'প্রযুক্তি' },
  { id: 'ai-recommendations', label: 'AI সুপারিশ', icon: 'BrainCircuit', view: 'ai-recommend', group: 'AI ও পরামর্শ' },
  { id: 'fertilizer-plan', label: 'সার পরিকল্পনা', icon: 'FlaskConical', view: 'fertilizer', group: 'AI ও পরামর্শ' },
  { id: 'irrigation-plan', label: 'সেচ পরিকল্পনা', icon: 'Waves', view: 'irrigation', group: 'AI ও পরামর্শ' },
  { id: 'crop-selection', label: 'ফসল নির্বাচন', icon: 'Sprout', view: 'crop', group: 'ফসল ও বাজার' },
  { id: 'disease-prediction', label: 'রোগ পূর্বাভাস', icon: 'Bug', view: 'disease', group: 'ফসল ও বাজার' },
  { id: 'pest-risk', label: 'পোকার ঝুঁকি', icon: 'ShieldAlert', view: 'pest', group: 'ফসল ও বাজার' },
  { id: 'market-prices', label: 'বাজারদর', icon: 'TrendingUp', view: 'market', group: 'ফসল ও বাজার' },
  { id: 'agri-calendar', label: 'কৃষি ক্যালেন্ডার', icon: 'CalendarDays', view: 'calendar', group: 'সরঞ্জাম' },
  { id: 'ai-assistant', label: 'AI সহকারী', icon: 'MessageSquare', view: 'chat', group: 'সরঞ্জাম' },
  { id: 'notification', label: 'নোটিফিকেশন', icon: 'Bell', view: 'notification', group: 'সরঞ্জাম' },
  { id: 'reports', label: 'রিপোর্ট', icon: 'FileBarChart2', view: 'report', group: 'সরঞ্জাম' },
  { id: 'gov-dashboard', label: 'সরকারি ড্যাশবোর্ড', icon: 'Building2', view: 'gov-dashboard', group: 'প্রশাসন' },
  { id: 'settings', label: 'সেটিংস', icon: 'Settings', view: 'settings', group: 'প্রশাসন' },
];

// -------------------------------------------------------
// 19. Government Statistics
// -------------------------------------------------------
export const govStats = {
  totalFarmers: '১,৭৫,০০০',
  totalArea: '৪৫,০০০ হেক্টর',
  avgSoilHealth: '৭২/১০০',
  iotCoverage: '১৮%',
  diseaseHotspots: 23,
  waterUsage: '২.৮ বিলিয়ন লিটার/মাস',
  fertilizerDemand: '৫,২০০ মেট্রিক টন/মাস',
};

// -------------------------------------------------------
// 20. Monthly Yield Data
// -------------------------------------------------------
export const monthlyYieldData = [
  { month: 'বৈশাখ', yield: 3.8, target: 4.2 },
  { month: 'জ্যৈষ্ঠ', yield: 4.1, target: 4.5 },
  { month: 'আষাঢ়', yield: 4.5, target: 4.8 },
  { month: 'শ্রাবণ', yield: 4.8, target: 5.0 },
  { month: 'ভাদ্র', yield: 4.6, target: 4.8 },
  { month: 'আশ্বিন', yield: 4.3, target: 4.5 },
];