import { SiteSettings, Category, Problem, Brand, LocationItem, TrustItem, Review, BlogPost, SearchKeywordItem } from './types';

export const initialSiteSettings: SiteSettings = {
  businessName: 'Home Appliance Care India',
  businessNameBn: 'হোম অ্যাপ্লায়েন্স কেয়ার ইন্ডিয়া',
  phone: '+91 6291674186',
  whatsapp: '+91 6291674186',
  email: 'applianceseva@gmail.com',
  address: 'Salt Lake Sector V, Kolkata, West Bengal - 700091',
  addressBn: 'সল্টলেক সেক্টর ৫, কলকাতা, পশ্চিমবঙ্গ - ৭০০০৯১',
  serviceArea: 'Barrackpur, Behala, Barasat, Habra, Garia, New town, Dumdum, Park street, Howrah & West Bengal',
  serviceAreaBn: 'ব্যারাকপুর, বেহালা, বারাসাত, হাবড়া, গড়িয়া, নিউ টাউন, দমদম, পার্ক স্ট্রিট, হাওড়া ও পশ্চিমবঙ্গ',
  workingHours: '8:00 AM - 9:00 PM (All 7 Days)',
  workingHoursBn: 'সকাল ৮:০০ - রাত ৯:০০ (সপ্তাহের ৭ দিনই)',
  visitFee: 0,
  currency: '₹',
  pricingDisclaimer: 'Transparent & upfront pricing. Inspection and exact repair estimates are discussed and confirmed strictly upon your approval before any repair work begins.',
  pricingDisclaimerBn: 'স্বচ্ছ ও সাশ্রয়ী সার্ভিস চার্জ। কোনো কাজ শুরুর আগে টেকনিশিয়ান স্পটে পরিদর্শন করে আপনার অনুমোদনেই চূড়ান্ত খরচের হিসাব নিশ্চিত করবেন।',
  emergencyNotice: 'Home Appliance Care India: Express 90-minute doorstep technician arrival across Barrackpur, Behala, Barasat, Habra, Garia, New town, Dumdum, Park street, Howrah & West Bengal.',
  emergencyNoticeBn: 'হোম অ্যাপ্লায়েন্স কেয়ার ইন্ডিয়া: ব্যারাকপুর, বেহালা, বারাসাত, হাবড়া, গড়িয়া, নিউ টাউন, দমদম, পার্ক স্ট্রিট, হাওড়া ও পশ্চিমবঙ্গ জুড়ে ৯০ মিনিটে ডোরস্টেপ টেকনিশিয়ান আগমন।'
};

export const initialCategories: Category[] = [
  {
    id: 'ac-repair',
    slug: 'ac-repair',
    name: 'AC Repair',
    nameBn: 'এসি মেরামত',
    shortDesc: 'Split & window AC diagnosis, cooling restoration, jet cleaning & gas refill.',
    shortDescBn: 'স্প্লিট ও উইন্ডো এসি রোগ নির্ণয়, কুলিং পুনরুদ্ধার, জেট ক্লিনিং ও গ্যাস রিফিল।',
    fullDesc: 'Certified doorstep air conditioner repair, servicing, deep jet pump cleaning, refrigerant gas leakage testing and compressor troubleshooting across West Bengal.',
    fullDescBn: 'পশ্চিমবঙ্গ জুড়ে প্রত্যয়িত ডোরস্টেপ এয়ার কন্ডিশনার মেরামত, সার্ভিসিং, ডিপ জেট পাম্প ক্লিনিং, গ্যাস লিকেজ টেস্টিং এবং কম্প্রেসার সমাধান।',
    iconName: 'air-vent',
    sortOrder: 1,
    isActive: true,
    metaTitle: 'Professional AC Repair & Servicing | Home Appliance Care India',
    metaTitleBn: 'বিশ্বস্ত এসি মেরামত ও সার্ভিসিং | Home Appliance Care India',
    metaDesc: 'Expert doorstep AC repair service by Home Appliance Care India. Split & Window AC cooling issues, jet cleaning, gas charging. Affordable rates & 90-day warranty.',
    metaDescBn: 'হোম অ্যাপ্লায়েন্স কেয়ার ইন্ডিয়া (Home Appliance Care India)-র বিশ্বস্ত এসি মেরামত ও সার্ভিসিং। স্প্লিট ও উইন্ডো এসি কুলিং সমস্যা, জেট ওয়াশ ও গ্যাস রিফিল। সাশ্রয়ী সার্ভিস ও ৯০ দিনের ওয়ারেন্টি।'
  },
  {
    id: 'fridge-repair',
    slug: 'fridge-repair',
    name: 'Fridge Repair',
    nameBn: 'ফ্রিজ মেরামত',
    shortDesc: 'Single & double door refrigerator cooling repair, gas charging & thermostat fixing.',
    shortDescBn: 'সিঙ্গেল ও ডাবল ডোর ফ্রিজের কুলিং মেরামত, গ্যাস চার্জিং ও থার্মোস্ট্যাট সমাধান।',
    fullDesc: 'Quick and reliable home refrigerator repair for single door, double door, side-by-side and inverter refrigerators. Certified multi-brand technicians with genuine parts.',
    fullDescBn: 'সিঙ্গেল ডোর, ডাবল ডোর, সাইড-বাই-সাইড ও ইনভার্টার ফ্রিজের দ্রুত ও নির্ভরযোগ্য ডোরস্টেপ মেরামত পরিষেবা। জেনুইন যন্ত্রাংশ সহ দক্ষ টেকনিশিয়ান।',
    iconName: 'refrigerator',
    sortOrder: 2,
    isActive: true,
    metaTitle: 'Doorstep Refrigerator & Fridge Repair | Home Appliance Care India',
    metaTitleBn: 'নির্ভরযোগ্য ফ্রিজ মেরামত সার্ভিস | Home Appliance Care India',
    metaDesc: 'Reliable fridge repair service by Home Appliance Care India. Fix cooling failure, gas leak, defrost issue, compressor noise. Same-day doorstep inspection visit.',
    metaDescBn: 'হোম অ্যাপ্লায়েন্স কেয়ার ইন্ডিয়া-র ডোরস্টেপ ফ্রিজ মেরামত। কুলিং বন্ধ, গ্যাস লিকেজ, কম্প্রেসার ও ডিফ্রস্ট সমস্যার দ্রুত সমাধান। সাশ্রয়ী ডোরস্টেপ পরিদর্শন।'
  },
  {
    id: 'washing-machine-repair',
    slug: 'washing-machine-repair',
    name: 'Washing Machine Repair',
    nameBn: 'ওয়াশিং মেশিন মেরামত',
    shortDesc: 'Front load, top load & semi-automatic spin, drain, drum & motor solutions.',
    shortDescBn: 'ফ্রন্ট লোড, টপ লোড ও সেমি-অটোমেটিক স্পিন, ড্রেন ও মোটর সমস্যার সমাধান।',
    fullDesc: 'Professional doorstep washing machine diagnosis and repair for front load, top load, semi-automatic and inverter models. Quick resolution for draining, spinning, motor, and PCB board errors.',
    fullDescBn: 'ফ্রন্ট লোড, টপ লোড ও সেমি-অটোমেটিক ওয়াশিং মেশিনের দক্ষ ডোরস্টেপ সার্ভিস। ড্রেন, স্পিন, মোটর ও পিসিবি বোর্ড ত্রুটির দ্রুত সমাধান।',
    iconName: 'washing-machine',
    sortOrder: 3,
    isActive: true,
    metaTitle: 'Washing Machine Repair Service | Home Appliance Care India',
    metaTitleBn: 'বিশ্বস্ত ওয়াশিং মেশিন মেরামত | Home Appliance Care India',
    metaDesc: 'Fast doorstep washing machine repair by Home Appliance Care India. Front load & top load motor, spin, drain, PCB fixes. Verified technicians.',
    metaDescBn: 'হোম অ্যাপ্লায়েন্স কেয়ার ইন্ডিয়া-র দ্রুত ওয়াশিং মেশিন মেরামত পরিষেবা। ফ্রন্ট লোড ও টপ লোড ড্রেন, মোটর ও ইলেকট্রনিক বোর্ড মেরামত। সাশ্রয়ী রেট ও ৯০ দিনের ওয়ারেন্টি।'
  },
  {
    id: 'microwave-repair',
    slug: 'microwave-repair',
    name: 'Microwave Oven Repair',
    nameBn: 'মাইক্রোওয়েভ ওভেন মেরামত',
    shortDesc: 'Solo, grill & convection microwave heating, magnetron & touch panel repair.',
    shortDescBn: 'সোলো, গ্রিল ও কনভেকশন ওভেনের হিটিং, ম্যাগনেট্রন ও টাচ প্যানেল মেরামত।',
    fullDesc: 'Specialized diagnosis and repair for convection, grill, and solo microwave ovens. Magnetron replacement, high-voltage diode fixing, turn-table motor repair, and touch panel restoration.',
    fullDescBn: 'কনভেকশন, গ্রিল ও সোলো মাইক্রোওয়েভ ওভেনের বিশেষায়িত রোগ নির্ণয় ও মেরামত। ম্যাগনেট্রন প্রতিস্থাপন, টার্নটেবল মোটর ও টাচ প্যানেল সমস্যা নিরসন।',
    iconName: 'microwave',
    sortOrder: 4,
    isActive: true,
    metaTitle: 'Microwave Oven Repair at Doorstep | Home Appliance Care India',
    metaTitleBn: 'মাইক্রোওয়েভ ওভেন মেরামত পরিষেবা | Home Appliance Care India',
    metaDesc: 'Doorstep microwave oven repair by Home Appliance Care India. Magnetron heating issues, spark repair, touchpad fixing for all leading brands. Affordable inspection & warranty.',
    metaDescBn: 'হোম অ্যাপ্লায়েন্স কেয়ার ইন্ডিয়া-র ডোরস্টেপ মাইক্রোওয়েভ ওভেন মেরামত। গরম না হওয়া, স্পার্কিং, টাচপ্যাড ত্রুটি নিরসন। সাশ্রয়ী ডোরস্টেপ পরিদর্শন ও ওয়ারেন্টি।'
  },
  {
    id: 'led-tv-repair',
    slug: 'led-tv-repair',
    name: 'LED TV Repair',
    nameBn: 'এলইডি টিভি মেরামত',
    shortDesc: 'Smart TV backlight, display panel, sound board, motherboard & power supply fix.',
    shortDescBn: 'স্মার্ট টিভির ব্যাকলাইট, ডিসপ্লে প্যানেল, সাউন্ড ও মাদারবোর্ড মেরামত।',
    fullDesc: 'Expert doorstep LED, Smart & Android TV repair and diagnosis. Comprehensive resolution for black screen, flickering backlight, no display, audio failure, and motherboard issues.',
    fullDescBn: 'দক্ষ এলইডি, স্মার্ট ও অ্যান্ড্রয়েড টিভি ডোরস্টেপ মেরামত। ব্ল্যাক স্ক্রিন, ব্যাকলাইট সমস্যা, অডিও ত্রুটি এবং মাদারবোর্ড সমস্যার নির্ভরযোগ্য সমাধান।',
    iconName: 'tv',
    sortOrder: 5,
    isActive: true,
    metaTitle: 'LED & Smart TV Repair Service | Home Appliance Care India',
    metaTitleBn: 'এলইডি ও স্মার্ট টিভি মেরামত | Home Appliance Care India',
    metaDesc: 'Professional LED & Smart TV repair by Home Appliance Care India. Fix black screen, backlight, sound issues, power supply for Samsung, Sony, LG & more.',
    metaDescBn: 'হোম অ্যাপ্লায়েন্স কেয়ার ইন্ডিয়া-র পেশাদার এলইডি ও স্মার্ট টিভি মেরামত পরিষেবা। ব্যাকলাইট, ডিসপ্লে, সাউন্ড ও মাদারবোর্ড সমস্যার সমাধান। সাশ্রয়ী ডোরস্টেপ পরিদর্শন।'
  }
];

export const initialProblems: Problem[] = [
  // AC Problems
  {
    id: 'ac-not-cooling',
    categoryId: 'ac-repair',
    title: 'AC Not Cooling or Blowing Warm Air',
    titleBn: 'এসি ঠান্ডা হচ্ছে না বা গরম বাতাস বের হচ্ছে',
    description: 'The indoor blower runs but room temperature does not drop. Often caused by refrigerant gas loss, dirty condenser coil, or faulty compressor capacitor.',
    descriptionBn: 'ইনডোর ফ্যান চলছে কিন্তু ঘরের তাপমাত্রা কমছে না। সাধারণত রেফ্রিজারেন্ট গ্যাস হ্রাস, নোংরা কনডেনসার কয়েল বা ক্যাপাসিটর ত্রুটির কারণে হয়।',
    symptoms: ['Warm airflow from vents', 'Outdoor compressor not kicking in', 'Ice accumulation on copper pipes'],
    symptomsBn: ['ভেন্ট দিয়ে গরম বাতাস বের হওয়া', 'আউটডোর কম্প্রেসার চালু না হওয়া', 'তামার পাইপে বরফ জমা'],
    commonCauses: 'Refrigerant gas leak, clogged air filters, or weak run capacitor.',
    commonCausesBn: 'রেফ্রিজারেন্ট গ্যাস লিকেজ, আটকে থাকা এয়ার ফিল্টার বা দুর্বল ক্যাপাসিটর।',
    solutionNote: 'Technician conducts leak detection pressure test, thoroughly cleans coils, and checks electrical draw.',
    solutionNoteBn: 'টেকনিশিয়ান প্রেসার টেস্টের মাধ্যমে লিকেজ পরীক্ষা করেন, কয়েল পরিষ্কার করেন এবং বৈদ্যুতিক লোড পরীক্ষা করেন।',
    diagnosticFeeNote: 'Includes full multi-point diagnostic check. Any spare parts or gas refill quoted transparently.',
    diagnosticFeeNoteBn: 'সম্পূর্ণ মাল্টি-পয়েন্ট ডায়াগনস্টিক অন্তর্ভুক্ত। খুচরা যন্ত্রাংশ বা গ্যাসের দাম আলাদা ও স্বচ্ছভাবে কাজের আগেই জানানো হয়।',
    sortOrder: 1,
    isActive: true
  },
  {
    id: 'ac-water-leakage',
    categoryId: 'ac-repair',
    title: 'Water Dripping / Leakage from Indoor Unit',
    titleBn: 'ইনডোর ইউনিট থেকে জল পড়া বা লিকেজ',
    description: 'Continuous or intermittent water drops spilling onto the floor or wall from behind the indoor AC unit.',
    descriptionBn: 'ইনডোর এসির পিছন থেকে বা সামনের ড্রেন ট্রে থেকে অনবরত মেঝে বা দেয়ালে জল পড়া।',
    symptoms: ['Water droplets on wall', 'Dripping sound during operation', 'Stagnant water in condensate tray'],
    symptomsBn: ['দেয়ালে জলের ফোঁটা বা দাগ', 'চলার সময় টপ টপ শব্দ', 'ড্রেন ট্রেতে জল জমে থাকা'],
    commonCauses: 'Blocked condensate drain pipe, algae/dust buildup, unlevel indoor installation, or broken drain tray.',
    commonCausesBn: 'ড্রেন পাইপে ধুলো বা শেওলা জমে জটলা, ইউনিট সমান না থাকা বা ড্রেন ট্রে ফেটে যাওয়া।',
    solutionNote: 'High-pressure vacuum flushing of the drain line, leveling check, and tray resealing.',
    solutionNoteBn: 'উচ্চ চাপের সাহায্যে ড্রেন লাইন ফ্লাশিং ও পরিষ্কার এবং ট্রের ত্রুটি মেরামত।',
    diagnosticFeeNote: 'Diagnosis covered under doorstep inspection. Complete unblocking and flushing cost confirmed beforehand.',
    diagnosticFeeNoteBn: 'ডোরস্টেপ পরিদর্শনের আওতায় পরীক্ষা সম্পন্ন হয়। পুরো পাইপ ক্লিনিংয়ের খরচ পূর্বেই জানিয়ে অনুমোদন নেওয়া হয়।',
    sortOrder: 2,
    isActive: true
  },
  {
    id: 'ac-gas-leakage',
    categoryId: 'ac-repair',
    title: 'AC Gas Leakage & Low Refrigerant Refill',
    titleBn: 'এসি গ্যাস লিকেজ ও গ্যাস রিফিল প্রয়োজন',
    description: 'Gradual loss of cooling efficiency over days or weeks, accompanied by hissing sound or frost on external valves.',
    descriptionBn: 'দিন দিন এসির ঠান্ডা করার ক্ষমতা কমে যাওয়া, হালকা হিস হিস শব্দ বা বাইরের ভালভে বরফ জমে থাকা।',
    symptoms: ['Hissing sound near piping', 'Frost on suction line', 'Continuous compressor running without cooling'],
    symptomsBn: ['পাইপের কাছে ফিসফিস শব্দ', 'সাকশন পাইপে বরফ', 'ঠান্ডা না হয়েও একটানা কম্প্রেসার চলা'],
    commonCauses: 'Flare nut loosening, coil pinhole corrosion, or vibration fracture on joint welds.',
    commonCausesBn: 'ফ্লেয়ার নাট আলগা হওয়া, কয়েলে ছোট ফুটো বা কম্পনের কারণে পাইপের জয়েন্টে ফাটল।',
    solutionNote: 'Nitrogen pressure testing, soap bubble inspection, brazing weld repair, vacuuming, and pure OEM refrigerant refill by weight.',
    solutionNoteBn: 'নাইট্রোজেন প্রেসার টেস্ট, ওয়েল্ডিং মেরামত, ভ্যাকুয়াম এবং ওজন মেপে খাঁটি গ্যাস রিফিল।',
    diagnosticFeeNote: 'Accurate gas pressure check. Gas charging rates vary strictly by refrigerant type (R32/R410A) and approved in advance.',
    diagnosticFeeNoteBn: 'সঠিক গ্যাস প্রেশার টেস্ট। গ্যাসের চার্জ রেফ্রিজারেন্টের ধরন অনুযায়ী কাজের আগে জানিয়ে অনুমোদন নেওয়া হয়।',
    sortOrder: 3,
    isActive: true
  },
  {
    id: 'ac-not-turning-on',
    categoryId: 'ac-repair',
    title: 'AC Not Turning On / Power Trips Immediately',
    titleBn: 'এসি চালু হচ্ছে না বা পাওয়ার ট্রিপ করছে',
    description: 'Unit shows no response to remote control, no display lights on panel, or MCB switch trips immediately on start.',
    descriptionBn: 'রিমোটে কোনো সাড়া নেই, ডিসপ্লেতে আলো জ্বলছে না, বা এসি চালু করলেই এমসিবি ট্রিপ করছে।',
    symptoms: ['No display LED', 'MCB / fuse trips when switched on', 'Clicking noise from PCB with no startup'],
    symptomsBn: ['ডিসপ্লেতে কোনো আলো নেই', 'চালু করলেই মেন সুইচ বন্ধ হওয়া', 'পিসিবি থেকে ক্লিক শব্দ কিন্তু চালু না হওয়া'],
    commonCauses: 'Main PCB fuse blown, shorted compressor winding, voltage surge damage, or faulty transformer.',
    commonCausesBn: 'পিসিবি ফিউজ কেটে যাওয়া, কম্প্রেসারে শর্ট সার্কিট, হাই ভোল্টেজ বা ট্রান্সফরমার নষ্ট হওয়া।',
    solutionNote: 'Comprehensive multimeter voltage continuity test, electrical trace isolation, and PCB component repair.',
    solutionNoteBn: 'মাল্টিমিটার দিয়ে ভোল্টেজ ও সার্কিট পরীক্ষা এবং সঠিক কম্পোনেন্ট বা পিসিবি মেরামত।',
    diagnosticFeeNote: 'Full electrical and PCB inspection by certified technician.',
    diagnosticFeeNoteBn: 'সম্পূর্ণ ইলেকট্রিক্যাল ও পিসিবি পরিদর্শন দক্ষ টেকনিশিয়ান দ্বারা সম্পন্ন।',
    sortOrder: 4,
    isActive: true
  },
  {
    id: 'ac-bad-odor',
    categoryId: 'ac-repair',
    title: 'Bad Odor & Foul Smell from AC Airflow',
    titleBn: 'এয়ারফ্লো থেকে দুর্গন্ধ ও ভ্যাপসা গন্ধ বের হওয়া',
    description: 'Musty, vinegary or foul rotten odor circulating into the room whenever the air conditioner is turned on.',
    descriptionBn: 'এসি চালু করলেই ঘর জুড়ে ভ্যাপসা বা পচা দুর্গন্ধ ছড়িয়ে পড়া।',
    symptoms: ['Musty air circulating', 'Sneezing or allergy triggers', 'Visible mold or dark slime on blower wheel'],
    symptomsBn: ['ভ্যাপসা দুর্গন্ধযুক্ত বাতাস', 'হাঁচি বা অ্যালার্জি হওয়া', 'ব্লোয়ার ফ্যানে ছত্রাক বা কালো ময়লা'],
    commonCauses: 'Fungus and bacterial colony growth inside deep cooling coil fins and condensate drain tray.',
    commonCausesBn: 'কুলিং কয়েলের গভীরে এবং ড্রেন ট্রেতে ব্যাকটেরিয়া ও ছত্রাকের সংক্রমণ।',
    solutionNote: 'Anti-bacterial foam jet pump wash, sanitized blower deep scrubbing, and deodorizing treatment.',
    solutionNoteBn: 'অ্যান্টি-ব্যাকটেরিয়াল ফোম জেট ক্লিনিং এবং ড্রেন ট্রের গভীর জীবাণুমুক্তকরণ।',
    diagnosticFeeNote: 'Thorough inspection. Deep jet cleaning packages quoted transparently.',
    diagnosticFeeNoteBn: 'ডোরস্টেপ পরিদর্শন। ডিপ জেট ক্লিনিং প্যাকেজের রেট স্বচ্ছভাবে কাজের আগে জানানো হয়।',
    sortOrder: 5,
    isActive: true
  },

  // Fridge Problems
  {
    id: 'fridge-not-cooling',
    categoryId: 'fridge-repair',
    title: 'Fridge Not Cooling / Upper Freezer Warm',
    titleBn: 'ফ্রিজ ঠান্ডা হচ্ছে না বা উপরের ডিপ গরম',
    description: 'Refrigerator cabinet warms up, causing milk or food to spoil, or ice creams in freezer compartment melt.',
    descriptionBn: 'ফ্রিজের ভিতরের তাপমাত্রা বেড়ে যাওয়া, যার ফলে দুধ বা খাবার নষ্ট হচ্ছে এবং আইসক্রিম গলে যাচ্ছে।',
    symptoms: ['Interior lights turn on but no cold air', 'Compressor silent or overheated', 'Condenser coils at back are cold'],
    symptomsBn: ['ভিতরের লাইট জ্বলছে কিন্তু ঠান্ডা নেই', 'কম্প্রেসার অতিরিক্ত গরম কিন্তু ঠান্ডা নেই', 'পেছনের কয়েল একদম ঠান্ডা'],
    commonCauses: 'Low refrigerant gas, failed start relay, blocked capillary tube, or broken thermostat.',
    commonCausesBn: 'গ্যাস শেষ হওয়া, স্টার্ট রিলে নষ্ট, ক্যাপিলারি পাইপ জ্যাম বা থার্মোস্ট্যাট খারাপ হওয়া।',
    solutionNote: 'Refrigerant pressure gauge test, relay & overload protector test, and thermal sensor calibration.',
    solutionNoteBn: 'প্রেসার গেজ দিয়ে গ্যাসের চাপ পরিমাপ, রিলে পরীক্ষা এবং থার্মাল সেন্সর চেক।',
    diagnosticFeeNote: 'Detailed diagnosis covered under doorstep inspection visit.',
    diagnosticFeeNoteBn: 'ডোরস্টেপ পরিদর্শন চার্জে পুঙ্খানুপুঙ্খ টেস্ট সম্পন্ন হয়।',
    sortOrder: 1,
    isActive: true
  },
  {
    id: 'fridge-excess-frost',
    categoryId: 'fridge-repair',
    title: 'Excess Ice & Frost Accumulation in Freezer',
    titleBn: 'ডিপে অতিরিক্ত বরফ জমা ও ড্রয়ার জ্যাম হওয়া',
    description: 'Heavy sheets of snow-like ice choking the freezer air vents and preventing cold air from reaching the lower fresh-food compartment.',
    descriptionBn: 'ডিপ ফ্রিজে অতিরিক্ত বরফ জমে এয়ার ভেন্ট বন্ধ হয়ে যাওয়া এবং নিচের চেম্বারে ঠান্ডা না পৌঁছানো।',
    symptoms: ['Thick frost on freezer walls', 'Lower cabinet warm while freezer frozen', 'Clicking defroster sounds'],
    symptomsBn: ['ডিপের দেয়ালে পুরু বরফের আস্তরণ', 'নিচে ঠান্ডা না হওয়া কিন্তু উপরে বরফ', 'ডিফ্রস্ট হিটার কাজ না করা'],
    commonCauses: 'Defrost timer failure, faulty bimetal thermostat, broken defrost heater, or door gasket leak.',
    commonCausesBn: 'ডিফ্রস্ট টাইমার বিকল, বাইমেটাল সেন্সর খারাপ, হিটার নষ্ট বা দরজার রবার লুজ হওয়া।',
    solutionNote: 'Complete circuit continuity check on the defrost heater, sensor replacement, and door seal alignment.',
    solutionNoteBn: 'ডিফ্রস্ট সার্কিট ও সেন্সর পরীক্ষা, নতুন সেন্সর লাগানো এবং দরজার রবার সিল ঠিক করা।',
    diagnosticFeeNote: 'Complete inspection visit. Component replacement charges shared prior to work.',
    diagnosticFeeNoteBn: 'পরিদর্শন ভিজিট। কোনো যন্ত্রাংশ পরিবর্তনের দরকার হলে আগেই মূল্য জানানো হয়।',
    sortOrder: 2,
    isActive: true
  },
  {
    id: 'fridge-water-leakage',
    categoryId: 'fridge-repair',
    title: 'Water Leaking on the Floor Under Fridge',
    titleBn: 'ফ্রিজের নিচে বা মেঝেতে জল জমা ও লিকেজ',
    description: 'Puddles of water pooling beneath the vegetable crisper or leaking out onto the kitchen floor.',
    descriptionBn: 'সবজির ড্রয়ারের নিচে বা রান্নাঘরের মেঝেতে ফ্রিজ থেকে জল গড়িয়ে পড়া।',
    symptoms: ['Water under vegetable tray', 'Water puddle in front of doors', 'Drain pan at back overflowing'],
    symptomsBn: ['ভেজিটেবল ট্রের নিচে জল জমা', 'দরজার সামনে মেঝেতে জল', 'পেছনের ড্রেন প্যান উপচে পড়া'],
    commonCauses: 'Frozen or clogged defrost drain hole, cracked drain pan, or broken water line connector.',
    commonCausesBn: 'ডিফ্রস্ট ড্রেন পাইপ জ্যাম বা বরফে জমে থাকা, পেছনের ট্রে ফেটে যাওয়া।',
    solutionNote: 'Hot flush clearance of internal drain hole, inspection of drain pan, and evaporator gutter clearing.',
    solutionNoteBn: 'ভেতরের ড্রেন লাইন ফ্লাশ করে জটলা ছাড়ানো এবং ড্রেন প্যান মেরামত।',
    diagnosticFeeNote: 'Full drain and gasket check under doorstep inspection.',
    diagnosticFeeNoteBn: 'সম্পূর্ণ ড্রেন ও গ্যাসকেট পরীক্ষা ডোরস্টেপ পরিদর্শনে অন্তর্ভুক্ত।',
    sortOrder: 3,
    isActive: true
  },

  // Washing Machine Problems
  {
    id: 'wm-not-spinning',
    categoryId: 'washing-machine-repair',
    title: 'Washing Machine Not Spinning / Drum Stalled',
    titleBn: 'ওয়াশিং মেশিন ঘুরছে না বা ড্রাম আটকে গেছে',
    description: 'The washer fills with water and agitates, but cannot spin to dry clothes, leaving garments soaking wet.',
    descriptionBn: 'মেশিনে জল ভরছে কিন্তু কাপড় শুকানোর স্পিন সাইকেলে ড্রাম ঘুরছে না, ফলে কাপড় ভিজে থাকছে।',
    symptoms: ['Humming noise during spin cycle', 'Clothes remain dripping wet', 'Drum does not spin freely by hand'],
    symptomsBn: ['স্পিন সাইকেলে গোঁ গোঁ শব্দ', 'কাপড় ভিজে থাকা', 'ড্রাম হাত দিয়ে ঘোরালে শক্ত লাগা'],
    commonCauses: 'Broken drive belt, worn motor carbon brushes, faulty lid/door lock switch, or drive pulley failure.',
    commonCausesBn: 'ড্রাইভ বেল্ট ছিঁড়ে যাওয়া, মোটরের কার্বন ব্রাশ ক্ষয়, দরজার লক সুইচ খারাপ বা পুলি নষ্ট।',
    solutionNote: 'Belt tension inspection, motor test, door safety interlock switch verification, and clutch check.',
    solutionNoteBn: 'বেল্ট টেনশন চেক, মোটর টেস্ট, ডোর ইন্টারলক সুইচ এবং ড্রাম বিয়ারিং পরীক্ষা।',
    diagnosticFeeNote: 'Affordable doorstep diagnosis. Genuine drive belt or switch replacement quoted upfront on call or on-spot.',
    diagnosticFeeNoteBn: 'সাশ্রয়ী ডোরস্টেপ ডায়াগনোসিস। নতুন ড্রাইভ বেল্ট বা সুইচের সঠিক খরচ কাজে হাত দেওয়ার আগেই জানানো হয়।',
    sortOrder: 1,
    isActive: true
  },
  {
    id: 'wm-not-draining',
    categoryId: 'washing-machine-repair',
    title: 'Water Not Draining / Machine Stopping Mid-Cycle',
    titleBn: 'জল ড্রেন হচ্ছে না বা মাঝপথে বন্ধ হয়ে যাচ্ছে',
    description: 'Washing machine halts with dirty water trapped inside the tub, showing an error code (such as OE, 5E, or E20).',
    descriptionBn: 'টাবের মধ্যে নোংরা জল আটকে মেশিন বন্ধ হয়ে যায় এবং ডিসপ্লেতে এরর কোড (যেমন OE, 5E, E20) দেখায়।',
    symptoms: ['Water trapped inside tub', 'Drain pump humming without pumping out', 'Door stays locked due to water level'],
    symptomsBn: ['টাবের মধ্যে জল জমে থাকা', 'ড্রেন পাম্প থেকে শব্দ কিন্তু জল না বেরোনো', 'জল থাকার কারণে দরজা না খোলা'],
    commonCauses: 'Foreign object (coins, safety pins, lint) stuck in drain filter or drain pump impeller seized.',
    commonCausesBn: 'ড্রেন ফিল্টারে কয়েন, আলপিন বা সুতো আটকে যাওয়া অথবা ড্রেন পাম্পের মোটর জ্যাম হওয়া।',
    solutionNote: 'Emergency tub drain, filter extraction, pump impeller rotation test, and hose clearance.',
    solutionNoteBn: 'ম্যানুয়াল ড্রেন, ফিল্টার ও পাম্প থেকে ময়লা পরিষ্কার এবং ড্রেন হোস পরীক্ষা।',
    diagnosticFeeNote: 'Comprehensive drain assembly inspection with clear, upfront quotation before repair.',
    diagnosticFeeNoteBn: 'সম্পূর্ণ ড্রেন সিস্টেম নিখুঁত পরীক্ষা এবং কাজ শুরুর আগেই স্বচ্ছ কোটেশন।',
    sortOrder: 2,
    isActive: true
  },
  {
    id: 'wm-excessive-vibration',
    categoryId: 'washing-machine-repair',
    title: 'Excessive Shaking, Violent Vibration & Loud Rattling',
    titleBn: 'অতিরিক্ত কাঁপাকাঁপি ও বিকট ঘড়ঘড় শব্দ',
    description: 'Washing machine violently bangs against walls or walks across the floor during high-speed spinning.',
    descriptionBn: 'স্পিন করার সময় মেশিন বিকট শব্দে কাঁপতে থাকা এবং মেঝেতে সরে যাওয়া।',
    symptoms: ['Loud metal clatter or jet engine roar', 'Washer moves across floor', 'Drum wobbles loose inside outer tub'],
    symptomsBn: ['জেট প্লেনের মতো বিকট গোঁ গোঁ শব্দ', 'মেশিন নিজের জায়গা থেকে নড়ে যাওয়া', 'ড্রাম লুজ হয়ে নড়বড়ে হওয়া'],
    commonCauses: 'Worn-out shock absorbers, snapped suspension springs, or rusted drum spider arm and bearings.',
    commonCausesBn: 'শক অ্যাবজরবার নষ্ট হওয়া, সাসপেনশন স্প্রিং কাটা বা ড্রামের বিয়ারিং ও স্পাইডার আর্ম ভেঙে যাওয়া।',
    solutionNote: 'Shock absorber dampening check, suspension balance leveling, and drum bearing shaft inspection.',
    solutionNoteBn: 'শক অ্যাবজরবার ও সাসপেনশন টেস্ট এবং বিয়ারিং শ্যাফ্ট পরীক্ষা।',
    diagnosticFeeNote: 'Complete mechanical inspection with transparent estimate provided upfront.',
    diagnosticFeeNoteBn: 'সম্পূর্ণ মেকানিক্যাল ড্রাম ও সাসপেনশন পরীক্ষা এবং কাজ শুরুর আগেই স্পষ্ট খরচের ধারণা।',
    sortOrder: 3,
    isActive: true
  },

  // Microwave Problems
  {
    id: 'mw-not-heating',
    categoryId: 'microwave-repair',
    title: 'Microwave Runs But Does Not Heat Food',
    titleBn: 'মাইক্রোওয়েভ চলছে কিন্তু খাবার গরম হচ্ছে না',
    description: 'The light turns on, turntable spins and timer counts down, but food placed inside remains stone cold.',
    descriptionBn: 'ভেতরের লাইট জ্বলছে, প্লেট ঘুরছে এবং টাইমার চলছে, কিন্তু রাখা খাবার সম্পূর্ণ ঠান্ডা থাকছে।',
    symptoms: ['Timer counts down with zero warmth', 'Buzzing hum louder than usual', 'No heat after minutes of running'],
    symptomsBn: ['টাইমার শেষ হচ্ছে কিন্তু খাবার গরম নেই', 'স্বাভাবিকের চেয়ে বেশি গুঞ্জন শব্দ', 'কয়েক মিনিট চলার পরেও কোনো তাপ নেই'],
    commonCauses: 'Blown high-voltage diode, failed magnetron tube, or burnt high-voltage capacitor.',
    commonCausesBn: 'হাই-ভোল্টেজ ডায়োড বা ফিউজ উড়ে যাওয়া, ম্যাগনেট্রন নষ্ট বা ক্যাপাসিটর খারাপ হওয়া।',
    solutionNote: 'Discharge capacitor safely, test diode with multimeter, check magnetron resistance, and replace faulty high-voltage component.',
    solutionNoteBn: 'ক্যাপাসিটর ডিসচার্জ করে সাবধানে পরীক্ষা, ডায়োড ও ম্যাগনেট্রন রেজিস্ট্যান্স টেস্ট এবং সমাধান।',
    diagnosticFeeNote: 'High-voltage safety inspection and accurate repair estimate provided upfront.',
    diagnosticFeeNoteBn: 'হাই-ভোল্টেজ নিরাপত্তা পরীক্ষা ও কাজ শুরুর আগেই নির্ভরযোগ্য খরচের বিবরণ।',
    sortOrder: 1,
    isActive: true
  },
  {
    id: 'mw-sparks-inside',
    categoryId: 'microwave-repair',
    title: 'Sparks & Electrical Arcing Inside Cavity',
    titleBn: 'মাইক্রোওয়েভের ভেতরে আগুনের ফুলকি বা স্পার্কিং',
    description: 'Bright electrical sparks and crackling sounds erupting inside the cooking cavity near the mica waveguide cover.',
    descriptionBn: 'ওভেনের ভেতরে মাইকা শিট বা কোণার দিকে আগুনের ফুলকি ও পট পট শব্দ হওয়া।',
    symptoms: ['Visible electrical flash inside', 'Charred or burnt spot on side wall', 'Burning smell'],
    symptomsBn: ['ভেতরে বিদ্যুতের চমকের মতো আলো', 'দেয়ালে বা মাইকা শিটে পোড়া দাগ', 'পোড়া গন্ধ বের হওয়া'],
    commonCauses: 'Grease burnt onto the mica waveguide cover sheet, chipped cavity paint exposing bare metal, or stir blade defect.',
    commonCausesBn: 'ওয়েভগাইড মাইকা শিটে তেল বা ঝোল জমে পুড়ে যাওয়া বা ভেতরের এনামেল কোটিং উঠে মেটাল বেরিয়ে পড়া।',
    solutionNote: 'Replace burnt mica waveguide cover, polish cavity paint burns, and sanitize cooking chamber.',
    solutionNoteBn: 'নতুন মাইকা শিট প্রতিস্থাপন এবং ভেতরের ক্যাভিটি পুঙ্খানুপুঙ্খ মেরামত।',
    diagnosticFeeNote: 'Doorstep cavity inspection. Affordable waveguide cover replacement quoted transparently.',
    diagnosticFeeNoteBn: 'ডোরস্টেপ পরিদর্শন। নতুন মাইকা কভারের সাশ্রয়ী খরচ কাজের আগেই জানানো হয়।',
    sortOrder: 2,
    isActive: true
  },
  {
    id: 'mw-touchpad-unresponsive',
    categoryId: 'microwave-repair',
    title: 'Touchpad / Membrane Keypad Unresponsive',
    titleBn: 'টাচপ্যাড বা কিপ্যাড কাজ করছে না / বাটন জাম',
    description: 'Buttons like Start, Stop, or number keys do not register touch inputs, or beep erratically on their own.',
    descriptionBn: 'স্টার্ট, স্টপ বা টাইমার বোতাম চাপলে কাজ না করা বা নিজে থেকেই বিপ শব্দ হওয়া।',
    symptoms: ['Specific keys like Start not working', 'Beeping continuously without input', 'Error code on front display'],
    symptomsBn: ['স্টার্ট বাটন কাজ না করা', 'না ছুঁলেও বিপ বিপ শব্দ', 'ডিসপ্লেতে এরর কোড দেখানো'],
    commonCauses: 'Moisture ingress, conductive trace ribbon corrosion, or membrane keypad wear and tear.',
    commonCausesBn: 'কিপ্যাডের ভেতরে জলীয় বাষ্প ঢোকা, রিবন তারে মরচে ধরা বা মেমব্রেন সুইচ নষ্ট হওয়া।',
    solutionNote: 'Ribbon cable cleaning, connection seating verification, or keypad membrane panel replacement.',
    solutionNoteBn: 'রিবন কেবল পরিষ্কার, কানেক্টর চেক অথবা নতুন মেমব্রেন কিপ্যাড প্যানেল প্রতিস্থাপন।',
    diagnosticFeeNote: 'Touchpad and motherboard testing with transparent price estimate upfront.',
    diagnosticFeeNoteBn: 'টাচপ্যাড ও সার্কিট বোর্ড টেস্টিং এবং কাজ শুরুর আগেই স্পষ্ট খরচের বিবরণ।',
    sortOrder: 3,
    isActive: true
  },

  // LED TV Problems
  {
    id: 'tv-sound-no-picture',
    categoryId: 'led-tv-repair',
    title: 'TV Has Sound But Screen Is Completely Black',
    titleBn: 'টিভিতে সাউন্ড আসছে কিন্তু ছবি নেই (ব্ল্যাক স্ক্রিন)',
    description: 'You can hear the audio channel clearly and change channels with remote, but the display remains pitch dark.',
    descriptionBn: 'টিভির সাউন্ড স্পষ্ট শোনা যাচ্ছে এবং রিমোট দিয়ে চ্যানেল বদলানো যাচ্ছে, কিন্তু পর্দায় কোনো ছবি নেই।',
    symptoms: ['Audio playing normally', 'Torch flashlight test shows faint image on panel', 'Power LED stays solid blue/green'],
    symptomsBn: ['শব্দ স্বাভাবিকভাবে চলছে', 'মোবাইলের টর্চ ফেললে হালকা আবছা ছবি দেখা যায়', 'পাওয়ার লাইট অন রয়েছে'],
    commonCauses: 'Burnt LED backlight strips inside display panel or failed backlight LED driver inverter board.',
    commonCausesBn: 'প্যানেলের ভেতরের এলইডি ব্যাকলাইট স্ট্রিপ কেটে যাওয়া বা ব্যাকলাইট ড্রাইভার বোর্ড খারাপ হওয়া।',
    solutionNote: 'Panel teardown test, individual LED voltage diode probe, and full set OEM backlight replacement with thermal tape.',
    solutionNoteBn: 'প্যানেল খুলে ব্যাকলাইট ভোল্টেজ পরীক্ষা এবং ব্র্যান্ডের আসল ব্যাকলাইট সেট প্রতিস্থাপন।',
    diagnosticFeeNote: 'Panel inspection and diagnostic check with transparent quotation before repair.',
    diagnosticFeeNoteBn: 'প্যানেল ও ব্যাকলাইট পুঙ্খানুপুঙ্খ পরিদর্শন এবং কাজ শুরুর আগেই সঠিক খরচের ধারণা।',
    sortOrder: 1,
    isActive: true
  },
  {
    id: 'tv-lines-on-display',
    categoryId: 'led-tv-repair',
    title: 'Vertical / Horizontal Colored Lines on Screen',
    titleBn: 'স্ক্রিনে খাড়া বা আড়াআড়ি রঙিন লাইন ও দাগ',
    description: 'Thin or thick rainbow-colored vertical or horizontal lines streaking across the picture, distorting the image.',
    descriptionBn: 'ডিসপ্লের ওপর পাতলা বা মোটা রঙিন দাগ, লাইন বা ঝিরঝির ছবি ভেসে ওঠা।',
    symptoms: ['Colored lines fixed in place', 'Flickering image half-screen', 'Distorted colors on one side'],
    symptomsBn: ['পর্দায় নির্দিষ্ট জায়গায় রঙিন লাইন', 'অর্ধেক স্ক্রিন কাঁপতে থাকা', 'ছবির রঙ বিকৃত হয়ে যাওয়া'],
    commonCauses: 'T-Con board signal failure, loose LVDS ribbon cable, or COF bonding tape failure on glass panel.',
    commonCausesBn: 'টি-কন বোর্ড ত্রুটি, এলভিডিএস তার লুজ হওয়া বা প্যানেল সিওএফ বন্ডিংয়ের সমস্যা।',
    solutionNote: 'T-Con board test, ribbon terminal de-oxidation, and voltage clock line bypass or bonding diagnostic.',
    solutionNoteBn: 'টি-কন বোর্ড পরীক্ষা, কেবল পরিষ্কার এবং সিওএফ ভোল্টেজ লাইন চেক।',
    diagnosticFeeNote: 'Detailed screen diagnostics with clear, upfront estimate before proceeding.',
    diagnosticFeeNoteBn: 'সম্পূর্ণ স্ক্রিন নিখুঁত রোগ নির্ণয় এবং যেকোনো কাজ শুরুর আগেই স্বচ্ছ কোটেশন।',
    sortOrder: 2,
    isActive: true
  },
  {
    id: 'tv-not-turning-on',
    categoryId: 'led-tv-repair',
    title: 'TV Not Turning On / Red Standby LED Blinking',
    titleBn: 'টিভি অন হচ্ছে না / লাল লাইট ব্লিংক করছে',
    description: 'The television remains in standby mode. Pressing power causes the red light to blink rapidly without display or sound.',
    descriptionBn: 'টিভি স্ট্যান্ডবাই মোডে আটকে আছে। অন করার চেষ্টা করলে লাল লাইট কয়েকবার জ্বলে নিভে যায় কিন্তু টিভি চালু হয় না।',
    symptoms: ['Red standby indicator blinks code sequence', 'Dead TV with no response', 'Power supply clicking sound'],
    symptomsBn: ['লাল লাইট বার বার ব্লিংক করা', 'কোনো সাড়া না দেওয়া', 'পাওয়ার সাপ্লাই বোর্ড থেকে মৃদু শব্দ'],
    commonCauses: 'Blown capacitors on power supply board (SMPS), short circuit in mainboard processor, or corrupted firmware.',
    commonCausesBn: 'পাওয়ার সাপ্লাই বোর্ডে (SMPS) ক্যাপাসিটর বা ডায়োড নষ্ট, মাদারবোর্ড শর্ট বা সফটওয়্যার ক্র্যাশ।',
    solutionNote: 'SMPS secondary output rail voltage measurement (12V, 5V, 24V), motherboard repair, and firmware re-flash.',
    solutionNoteBn: 'পাওয়ার বোর্ডের ভোল্টেজ পরীক্ষা এবং মাদারবোর্ড বা সফটওয়্যার পুনরুদ্ধার।',
    diagnosticFeeNote: 'Power and motherboard diagnostic check with transparent, budget-friendly quotation.',
    diagnosticFeeNoteBn: 'পাওয়ার বোর্ড ও মাদারবোর্ড নিখুঁত পরীক্ষা এবং সাশ্রয়ী ও স্বচ্ছ কোটেশন।',
    sortOrder: 3,
    isActive: true
  }
];

export const initialBrands: Brand[] = [
  {"id":"voltas","name":"Voltas","logoUrl":"/images/brands/voltas.svg","categoryIds":["ac-repair","fridge-repair"],"sortOrder":1,"isActive":true,"isPopular":true},
  {"id":"daikin","name":"Daikin","logoUrl":"/images/brands/daikin.svg","categoryIds":["ac-repair"],"sortOrder":2,"isActive":true,"isPopular":true},
  {"id":"hitachi","name":"Hitachi","logoUrl":"/images/brands/hitachi.svg","categoryIds":["ac-repair","fridge-repair"],"sortOrder":3,"isActive":true,"isPopular":true},
  {"id":"samsung","name":"Samsung","logoUrl":"/images/brands/samsung.svg","categoryIds":["ac-repair","fridge-repair","washing-machine-repair","microwave-repair","led-tv-repair"],"sortOrder":4,"isActive":true,"isPopular":true},
  {"id":"lg","name":"LG","logoUrl":"/images/brands/lg.svg","categoryIds":["ac-repair","fridge-repair","washing-machine-repair","microwave-repair","led-tv-repair"],"sortOrder":5,"isActive":true,"isPopular":true},
  {"id":"whirlpool","name":"Whirlpool","logoUrl":"/images/brands/whirlpool.svg","categoryIds":["ac-repair","fridge-repair","washing-machine-repair","microwave-repair"],"sortOrder":6,"isActive":true,"isPopular":true},
  {"id":"carrier","name":"Carrier","logoUrl":"/images/brands/carrier.svg","categoryIds":["ac-repair"],"sortOrder":7,"isActive":true,"isPopular":true},
  {"id":"blue-star","name":"Blue Star","logoUrl":"/images/brands/blue-star.svg","categoryIds":["ac-repair","fridge-repair"],"sortOrder":8,"isActive":true,"isPopular":true},
  {"id":"o-general","name":"O General","logoUrl":"/images/brands/o-general.svg","categoryIds":["ac-repair"],"sortOrder":9,"isActive":true,"isPopular":true},
  {"id":"mitsubishi","name":"Mitsubishi","logoUrl":"/images/brands/mitsubishi.svg","categoryIds":["ac-repair"],"sortOrder":10,"isActive":true,"isPopular":true},
  {"id":"lloyd","name":"Lloyd","logoUrl":"/images/brands/lloyd.svg","categoryIds":["ac-repair","fridge-repair","washing-machine-repair","led-tv-repair"],"sortOrder":11,"isActive":true,"isPopular":true},
  {"id":"godrej","name":"Godrej","logoUrl":"/images/brands/godrej.svg","categoryIds":["ac-repair","fridge-repair","washing-machine-repair","microwave-repair"],"sortOrder":12,"isActive":true,"isPopular":true},
  {"id":"haier","name":"Haier","logoUrl":"/images/brands/haier.svg","categoryIds":["ac-repair","fridge-repair","washing-machine-repair","microwave-repair","led-tv-repair"],"sortOrder":13,"isActive":true,"isPopular":true},
  {"id":"panasonic","name":"Panasonic","logoUrl":"/images/brands/panasonic.svg","categoryIds":["ac-repair","fridge-repair","washing-machine-repair","microwave-repair","led-tv-repair"],"sortOrder":14,"isActive":true,"isPopular":true},
  {"id":"ifb","name":"IFB","logoUrl":"/images/brands/ifb.svg","categoryIds":["ac-repair","washing-machine-repair","microwave-repair"],"sortOrder":15,"isActive":true,"isPopular":true},
  {"id":"bosch","name":"Bosch","logoUrl":"/images/brands/bosch.svg","categoryIds":["fridge-repair","washing-machine-repair","microwave-repair"],"sortOrder":16,"isActive":true,"isPopular":true},
  {"id":"siemens","name":"Siemens","logoUrl":"/images/brands/siemens.svg","categoryIds":["fridge-repair","washing-machine-repair","microwave-repair"],"sortOrder":17,"isActive":true,"isPopular":true},
  {"id":"toshiba","name":"Toshiba","logoUrl":"/images/brands/toshiba.svg","categoryIds":["ac-repair","fridge-repair","washing-machine-repair"],"sortOrder":18,"isActive":true,"isPopular":true},
  {"id":"sony","name":"Sony","logoUrl":"/images/brands/sony.svg","categoryIds":["led-tv-repair"],"sortOrder":19,"isActive":true,"isPopular":true},
  {"id":"tcl","name":"TCL","logoUrl":"/images/brands/tcl.svg","categoryIds":["led-tv-repair","ac-repair","washing-machine-repair"],"sortOrder":20,"isActive":true,"isPopular":true},
  {"id":"mi","name":"Mi / Xiaomi","logoUrl":"/images/brands/mi.svg","categoryIds":["led-tv-repair"],"sortOrder":21,"isActive":true,"isPopular":true},
  {"id":"oneplus","name":"OnePlus","logoUrl":"/images/brands/oneplus.svg","categoryIds":["led-tv-repair"],"sortOrder":22,"isActive":true,"isPopular":true},
  {"id":"kelvinator","name":"Kelvinator","logoUrl":"/images/brands/kelvinator.svg","categoryIds":["fridge-repair","ac-repair","washing-machine-repair"],"sortOrder":23,"isActive":true,"isPopular":true},
  {"id":"electrolux","name":"Electrolux","logoUrl":"/images/brands/electrolux.svg","categoryIds":["washing-machine-repair","fridge-repair"],"sortOrder":24,"isActive":true,"isPopular":true},
  {"id":"kent","name":"Kent RO","logoUrl":"/images/brands/kent.svg","categoryIds":["fridge-repair"],"sortOrder":25,"isActive":true,"isPopular":true},
  {"id":"aquaguard","name":"Aquaguard","logoUrl":"/images/brands/aquaguard.svg","categoryIds":["fridge-repair"],"sortOrder":26,"isActive":true,"isPopular":true},
  {"id":"livpure","name":"Livpure","logoUrl":"/images/brands/livpure.svg","categoryIds":["fridge-repair"],"sortOrder":27,"isActive":true,"isPopular":true},
  {"id":"pureit","name":"Pureit","logoUrl":"/images/brands/pureit.svg","categoryIds":["fridge-repair"],"sortOrder":28,"isActive":true,"isPopular":true},
  {"id":"akai","name":"Akai","logoUrl":"/images/brands/akai.svg","categoryIds":["led-tv-repair","washing-machine-repair","ac-repair"],"sortOrder":29,"isActive":true,"isPopular":true},
  {"id":"videocon","name":"Videocon","logoUrl":"/images/brands/videocon.svg","categoryIds":["washing-machine-repair","fridge-repair","ac-repair","led-tv-repair"],"sortOrder":30,"isActive":true,"isPopular":true},
  {"id":"onida","name":"Onida","logoUrl":"/images/brands/onida.svg","categoryIds":["ac-repair","led-tv-repair","washing-machine-repair","microwave-repair"],"sortOrder":31,"isActive":true,"isPopular":true},
  {"id":"midea","name":"Midea","logoUrl":"/images/brands/midea.svg","categoryIds":["ac-repair","washing-machine-repair","microwave-repair"],"sortOrder":32,"isActive":true,"isPopular":true},
  {"id":"marq","name":"MarQ","logoUrl":"/images/brands/marq.svg","categoryIds":["ac-repair","washing-machine-repair","fridge-repair","led-tv-repair","microwave-repair"],"sortOrder":33,"isActive":true,"isPopular":true},
  {"id":"croma","name":"Croma","logoUrl":"/images/brands/croma.svg","categoryIds":["ac-repair","washing-machine-repair","fridge-repair","led-tv-repair","microwave-repair"],"sortOrder":34,"isActive":true,"isPopular":true}
];

export const initialLocations: LocationItem[] = [
  {
    id: 'loc-saltlake',
    name: 'Salt Lake',
    nameBn: 'সল্টলেক',
    hashSlug: 'salt-lake',
    pincode: '700091',
    address: 'Sector V, Salt Lake, Bidhannagar, Kolkata - 700091',
    addressBn: 'সেক্টর ৫, সল্টলেক, বিধাননগর, কলকাতা - ৭০০০৯১',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 1,
    isActive: true,
    responseTime: '45 - 60 Mins',
    responseTimeBn: '৪৫ - ৬০ মিনিট',
    popularLocalities: [
      'Sector 1', 'Sector 2', 'Sector 3', 'Sector 5', 'Karunamoyee', 'City Centre 1',
      'Salt Lake Stadium', 'Ultadanga Hudco', 'Labony Estate', 'Baisakhi', 'Duttabad',
      'Central Park', 'Nicco Park area', 'Sukanta Nagar', 'FD Block', 'GD Block', 'BJ Block'
    ],
    popularLocalitiesBn: [
      'সেক্টর ১', 'সেক্টর ২', 'সেক্টর ৩', 'সেক্টর ৫', 'করুণাময়ী', 'সিটি সেন্টার ১',
      'সল্টলেক স্টেডিয়াম', 'উল্টোডাঙা হুডকো', 'লাবণ্য এস্টেট', 'বৈশাখী', 'দত্তাবাদ',
      'সেন্ট্রাল পার্ক', 'নিকো পার্ক চত্বর', 'সুকান্ত নগর', 'এফডি ব্লক', 'জিডি ব্লক', 'বিজে ব্লক'
    ]
  },
  {
    id: 'loc-newtown',
    name: 'New Town',
    nameBn: 'নিউ টাউন',
    hashSlug: 'new-town',
    pincode: '700156',
    address: 'Action Area I, New Town, Rajarhat, Kolkata - 700156',
    addressBn: 'অ্যাকশন এরিয়া ১, নিউ টাউন, রাজারহাট, কলকাতা - ৭০০১৫৬',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 2,
    isActive: true,
    responseTime: '45 - 60 Mins',
    responseTimeBn: '৪৫ - ৬০ মিনিট',
    popularLocalities: [
      'Action Area 1', 'Action Area 2', 'Action Area 3', 'Eco Space', 'DLF IT Park',
      'Shapoorji Pallonji Complex', 'Uniworld City', 'Akankha More', 'Candor TechSpace',
      'Jatragachi', 'Kadambagachi', 'Swapno Bhor', 'Rosedale', 'Eco Park Area', 'Biswa Bangla Gate'
    ],
    popularLocalitiesBn: [
      'অ্যাকশন এরিয়া ১', 'অ্যাকশন এরিয়া ২', 'অ্যাকশন এরিয়া ৩', 'ইকো স্পেস', 'ডিএলএফ পার্ক',
      'শাপুর্জি কমপ্লেক্স', 'ইউনিওয়ার্ল্ড সিটি', 'আকাঙ্ক্ষা মোড়', 'ক্যান্ডর টেকস্পেস',
      'যাত্রাডাঙ্গা', 'কদম্বগাছি', 'স্বপ্ন ভোর', 'রোজডেল', 'ইকো পার্ক চত্বর', 'বিশ্ব বাংলা গেট'
    ]
  },
  {
    id: 'loc-rajarhat',
    name: 'Rajarhat',
    nameBn: 'রাজারহাট',
    hashSlug: 'rajarhat',
    pincode: '700135',
    address: 'Chinar Park, Rajarhat Main Road, Kolkata - 700135',
    addressBn: 'চিনার পার্ক, রাজারহাট মেইন রোড, কলকাতা - ৭০০১৩৫',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 3,
    isActive: true,
    responseTime: '45 - 60 Mins',
    responseTimeBn: '৪৫ - ৬০ মিনিট',
    popularLocalities: [
      'Chinar Park', 'City Centre 2', 'Rajarhat Chowmatha', 'Dashadrone', 'Kalipark',
      'Atghara', 'Teghoria Crossing', 'Bablatala', 'Reckjoani', 'Salua', 'Lohar Bridge', 'Narayanpur'
    ],
    popularLocalitiesBn: [
      'চিনার পার্ক', 'সিটি সেন্টার ২', 'রাজারহাট চৌমাথা', 'দশদ্রোণ', 'কালীপার্ক',
      'আটঘরা', 'তেঘড়িয়া ক্রসিং', 'বাবলাতলা', 'রেকজোয়ানি', 'সালুয়া', 'লোহার ব্রিজ', 'নারায়নপুর'
    ]
  },
  {
    id: 'loc-behala',
    name: 'Behala',
    nameBn: 'বেহালা',
    hashSlug: 'behala',
    pincode: '700034',
    address: 'Diamond Harbour Road, Behala Chowrasta, Kolkata - 700034',
    addressBn: 'ডায়মন্ড হারবার রোড, বেহালা চৌরাস্তা, কলকাতা - ৭০০০৩৪',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 4,
    isActive: true,
    responseTime: '60 - 90 Mins',
    responseTimeBn: '৬০ - ৯০ মিনিট',
    popularLocalities: [
      'Behala Chowrasta', 'Taratala', 'Parnasree Pally', 'Manton', 'Sakherbazar',
      'Silpara', 'James Long Sarani', 'Bakultala', 'Kadamtala Behala', 'Biren Roy Road',
      'Behala Tram Depot', 'Sarsuna', 'Pathakpara', 'Dharpara'
    ],
    popularLocalitiesBn: [
      'বেহালা চৌরাস্তা', 'তারাতলা', 'পর্ণশ্রী পল্লী', 'ম্যান্টন', 'সখেরবাজার',
      'শীলপাড়া', 'জেমস লং সরণি', 'বকুলতলা', 'কদমতলা বেহালা', 'বীরেন রায় রোড',
      'বেহালা ট্রাম ডিপো', 'সরসুনা', 'পাঠকপাড়া', 'ধারপাড়া'
    ]
  },
  {
    id: 'loc-garia',
    name: 'Garia',
    nameBn: 'গড়িয়া',
    hashSlug: 'garia',
    pincode: '700084',
    address: 'Garia Main Road, Mahamayatala, Kolkata - 700084',
    addressBn: 'গড়িয়া মেইন রোড, মহামায়াতলা, কলকাতা - ৭০০০৮৪',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 5,
    isActive: true,
    responseTime: '60 - 90 Mins',
    responseTimeBn: '৬০ - ৯০ মিনিট',
    popularLocalities: [
      'Mahamayatala', 'Patuli', 'Kavi Nazrul Metro', 'Baishnabghata', 'Briji', 'Naktala',
      'Garia Station Road', 'Kamalgazi', 'Rajpur Sonarpur border', 'Dhalua', 'Brahmapur', 'Boral', 'Kavi Subhash Metro'
    ],
    popularLocalitiesBn: [
      'মহামায়াতলা', 'পাটুলী', 'কবি নজরুল মেট্রো', 'বৈষ্ণবঘাটা', 'ব্রিজি', 'নাকতলা',
      'গড়িয়া স্টেশন রোড', 'কমলগাজী', 'রাজপুর সোনারপুর সীমান্ত', 'ঢালুয়া', 'ব্রহ্মপুর', 'বোড়াল', 'কবি সুভাষ মেট্রো'
    ]
  },
  {
    id: 'loc-jadavpur',
    name: 'Jadavpur',
    nameBn: 'যাদবপুর',
    hashSlug: 'jadavpur',
    pincode: '700032',
    address: '8B Bus Stand, Central Road, Jadavpur, Kolkata - 700032',
    addressBn: '৮বি বাস স্ট্যান্ড, সেন্ট্রাল রোড, যাদবপুর, কলকাতা - ৭০০০৩২',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 6,
    isActive: true,
    responseTime: '60 - 90 Mins',
    responseTimeBn: '৬০ - ৯০ মিনিট',
    popularLocalities: [
      '8B Bus Stand', 'Sulekha More', 'Santoshpur', 'Ajoy Nagar', 'Baghajatin',
      'Sukanta Setu', 'Ganguly Bagan', 'Central Road', 'Jadavpur University Area',
      'Ramgarh', 'Bikramgarh', 'Poddar Nagar', 'Peerless Hospital Area'
    ],
    popularLocalitiesBn: [
      '৮বি বাস স্ট্যান্ড', 'সুলেখা মোড়', 'সন্তোষপুর', 'অজয় নগর', 'বাঘাযতীন',
      'সুকান্ত সেতু', 'গাঙ্গুলী বাগান', 'সেন্ট্রাল রোড', 'যাদবপুর বিশ্ববিদ্যালয় চত্বর',
      'রামগড়', 'বিক্রমগড়', 'পোদ্দার নগর', 'পিয়ারলেস হাসপাতাল চত্বর'
    ]
  },
  {
    id: 'loc-tollygunge',
    name: 'Tollygunge',
    nameBn: 'টালিগঞ্জ',
    hashSlug: 'tollygunge',
    pincode: '700040',
    address: 'Deshapran Sasmal Road, Tollygunge, Kolkata - 700040',
    addressBn: 'দেশপ্রাণ শাসমল রোড, টালিগঞ্জ, কলকাতা - ৭০০০৪০',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 7,
    isActive: true,
    responseTime: '60 - 90 Mins',
    responseTimeBn: '৬০ - ৯০ মিনিট',
    popularLocalities: [
      'Ranikuthi', 'Karunamoyee Tollygunge', 'Netaji Nagar', 'Bansdroni', 'Haridevpur',
      'Mahanayak Uttam Kumar Metro', 'Kudghat', 'Regent Park', 'Golf Green', 'Moore Avenue', 'Swiss Park', 'Masterda Surya Sen Metro'
    ],
    popularLocalitiesBn: [
      'রানীকুঠি', 'করুণাময়ী টালিগঞ্জ', 'নেতাজী নগর', 'বাঁশদ্রোণী', 'হরিদেবপুর',
      'উত্তম কুমার মেট্রো', 'কুদঘাট', 'রিজেন্ট পার্ক', 'গল্ফ গ্রিন', 'মুর অ্যাভিনিউ', 'সুইস পার্ক', 'মাস্টারদা সূর্য সেন মেট্রো'
    ]
  },
  {
    id: 'loc-ballygunge',
    name: 'Ballygunge',
    nameBn: 'বালিগঞ্জ',
    hashSlug: 'ballygunge',
    pincode: '700019',
    address: 'Ballygunge Circular Road, Gariahat, Kolkata - 700019',
    addressBn: 'বালিগঞ্জ সার্কুলার রোড, গড়িয়াহাট, কলকাতা - ৭০০০১৯',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 8,
    isActive: true,
    responseTime: '60 - 90 Mins',
    responseTimeBn: '৬০ - ৯০ মিনিট',
    popularLocalities: [
      'Ballygunge Circular Rd', 'Dover Lane', 'Golpark', 'Gariahat Market', 'Southern Avenue',
      'Lake Gardens', 'Broad Street', 'Hazra Road', 'Maddox Square', 'Mandeville Gardens', 'Fern Road', 'Cornfield Road'
    ],
    popularLocalitiesBn: [
      'বালিগঞ্জ সার্কুলার রোড', 'ডোভার লেন', 'গোলপার্ক', 'গড়িয়াহাট মার্কেট', 'সাউদার্ন অ্যাভিনিউ',
      'লেক গার্ডেনস', 'ব্রড স্ট্রিট', 'হাজরা রোড', 'ম্যাডক্স স্কয়ার', 'ম্যান্ডেভিলে গার্ডেনস', 'ফার্ন রোড', 'কর্নফিল্ড রোড'
    ]
  },
  {
    id: 'loc-alipore',
    name: 'Alipore',
    nameBn: 'আলিপুর',
    hashSlug: 'alipore',
    pincode: '700027',
    address: 'Burdwan Road, Alipore, Kolkata - 700027',
    addressBn: 'বর্ধমান রোড, আলিপুর, কলকাতা - ৭০০০২৭',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 9,
    isActive: true,
    responseTime: '60 - 90 Mins',
    responseTimeBn: '৬০ - ৯০ মিনিট',
    popularLocalities: [
      'Burdwan Road', 'New Alipore Block B/C/D', 'Chetla', 'Taratala Crossing', 'National Library',
      'Majerhat', 'Judges Court Road', 'Hastings', 'Alipore Park Road', 'Belvedere Road', 'Zoological Garden Area'
    ],
    popularLocalitiesBn: [
      'বর্ধমান রোড', 'নিউ আলিপুর', 'চেতলা', 'তারাতলা ক্রসিং', 'ন্যাশনাল লাইব্রেরি',
      'মাজেরহাট', 'জাজেস কোর্ট রোড', 'হেস্টিংস', 'আলিপুর পার্ক রোড', 'বেলভেডিয়ার রোড', 'চিড়িয়াখানা চত্বর'
    ]
  },
  {
    id: 'loc-parkstreet',
    name: 'Park Street',
    nameBn: 'পার্ক স্ট্রিট',
    hashSlug: 'park-street',
    pincode: '700016',
    address: 'Mother Teresa Sarani, Park Street, Kolkata - 700016',
    addressBn: 'মাদার টেরিজা সরণি, পার্ক স্ট্রিট, কলকাতা - ৭০০০১৬',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 10,
    isActive: true,
    responseTime: '60 - 90 Mins',
    responseTimeBn: '৬০ - ৯০ মিনিট',
    popularLocalities: [
      'Camac Street', 'Theatre Road (Shakespeare Sarani)', 'Elgin Road', 'Park Circus 7 Point',
      'Mullick Bazar', 'Bhawanipore', 'Ripon Street', 'Russell Street', 'Middleton Row', 'Entally', 'Nonapukur', 'AJC Bose Road'
    ],
    popularLocalitiesBn: [
      'ক্যামাক স্ট্রিট', 'থিয়েটার রোড (শেক্সপিয়র সরণি)', 'এলগিন রোড', 'পার্ক সার্কাস ৭ পয়েন্ট',
      'মল্লিক বাজার', 'ভবানীপুর', 'রিপন স্ট্রিট', 'রাসেল স্ট্রিট', 'মিডলটন রো', 'এন্টালী', 'নোনাপুকুর', 'এজেসি বোস রোড'
    ]
  },
  {
    id: 'loc-kasba',
    name: 'Kasba',
    nameBn: 'কসবা',
    hashSlug: 'kasba',
    pincode: '700042',
    address: 'Bosepukur Road, Kasba, Kolkata - 700042',
    addressBn: 'বোসপুকুর রোড, কসবা, কলকাতা - ৭০০০৪২',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 11,
    isActive: true,
    responseTime: '60 - 90 Mins',
    responseTimeBn: '৬০ - ৯০ মিনিট',
    popularLocalities: [
      'Rajdanga', 'Bosepukur', 'Ruby Hospital More', 'Anandapur', 'Acropolis Mall Area',
      'Kasba New Market', 'Haltu', 'Swinhoe Street', 'Tribarna', 'Narkelbagan', 'VIP Nagar', 'Kalikapur', 'Tagore Park'
    ],
    popularLocalitiesBn: [
      'রাজডাঙ্গা', 'বোসপুকুর', 'রুবি হাসপাতাল মোড়', 'আনন্দপুর', 'অ্যাক্রোপলিস মল চত্বর',
      'কসবা নিউ মার্কেট', 'হালতু', 'সুইনহো স্ট্রিট', 'ত্রিবর্ণ', 'নারকেলবাগান', 'ভিআইপি নগর', 'কালিকাপুর', 'টেগোর পার্ক'
    ]
  },
  {
    id: 'loc-thakurpukur',
    name: 'Thakurpukur',
    nameBn: 'ঠাকুরপুকুর',
    hashSlug: 'thakurpukur',
    pincode: '700063',
    address: 'Diamond Harbour Road, Thakurpukur, Kolkata - 700063',
    addressBn: 'ডায়মন্ড হারবার রোড, ঠাকুরপুকুর, কলকাতা - ৭০০০৬৩',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 12,
    isActive: true,
    responseTime: '60 - 90 Mins',
    responseTimeBn: '৬০ - ৯০ মিনিট',
    popularLocalities: [
      'IIM Calcutta Joka', 'Kabardanga', 'Diamond Park', 'Joka Metro Depot', 'Silpara',
      'Thakurpukur 3A', 'Vivekananda Mission Area', 'Samali', 'Raspunja', 'Bakrahat Road', 'Chowhati Joka'
    ],
    popularLocalitiesBn: [
      'আইআইএম ক্যালকাটা জোকা', 'কবরডাঙ্গা', 'ডায়মন্ড পার্ক', 'জোকা মেট্রো ডিপো', 'শীলপাড়া',
      'ঠাকুরপুকুর ৩এ', 'বিবেকানন্দ মিশন চত্বর', 'সামালী', 'রাসপুঞ্জ', 'বাকরাহাট রোড', 'চৌহাটি জোকা'
    ]
  },
  {
    id: 'loc-dumdum',
    name: 'Dumdum',
    nameBn: 'দমদম',
    hashSlug: 'dumdum',
    pincode: '700028',
    address: 'Nagerbazar More, Dumdum, Kolkata - 700028',
    addressBn: 'নাগেরবাজার মোড়, দমদম, কলকাতা - ৭০০০২৮',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 13,
    isActive: true,
    responseTime: '60 - 90 Mins',
    responseTimeBn: '৬০ - ৯০ মিনিট',
    popularLocalities: [
      'Nagerbazar', 'Dum Dum Jn', 'Dum Dum Cantonment', 'Airport 1 No Gate', 'Motijheel',
      'Gorabazar', 'Seth Bagan', 'Clive House', 'Mall Road', 'Bangur Avenue', 'Amarpalli', 'Jessore Road Dum Dum'
    ],
    popularLocalitiesBn: [
      'নাগেরবাজার', 'দমদম জংশন', 'দমদম ক্যান্টনমেন্ট', 'এয়ারপোর্ট ১ নম্বর গেট', 'মতিঝিল',
      'গোরাবাজার', 'শেঠ বাগান', 'ক্লাইভ হাউস', 'মল রোড', 'বাঙুর অ্যাভিনিউ', 'অমরপল্লী', 'যশোর রোড দমদম'
    ]
  },
  {
    id: 'loc-ultadanga',
    name: 'Ultadanga',
    nameBn: 'উল্টোডাঙা',
    hashSlug: 'ultadanga',
    pincode: '700054',
    address: 'VIP Road Crossing, Ultadanga, Kolkata - 700054',
    addressBn: 'ভিআইপি রোড ক্রসিং, উল্টোডাঙা, কলকাতা - ৭০০০৫৪',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 14,
    isActive: true,
    responseTime: '60 - 90 Mins',
    responseTimeBn: '৬০ - ৯০ মিনিট',
    popularLocalities: [
      'Phoolbagan', 'VIP Crossing Ultadanga', 'Maniktala', 'Bidhannagar Road Station',
      'Kankurgachi CIT Scheme', 'Telengabagan', 'Gouribari', 'Muraripukur', 'Bagmari', 'Khanna Cinema More', 'Kankurgachi Pantaloons'
    ],
    popularLocalitiesBn: [
      'ফুলবাগান', 'ভিআইপি ক্রসিং উল্টোডাঙা', 'মানিকতলা', 'বিধাননগর রোড স্টেশন',
      'কাঁকুড়গাছি সিআইটি স্কিম', 'তেলেঙ্গাবাগান', 'গৌরীবাড়ি', 'মুরারিপুকুর', 'বাগমারি', 'খান্না সিনেমা মোড়', 'কাঁকুড়গাছি প্যান্টালুনস'
    ]
  },
  {
    id: 'loc-shyambazar',
    name: 'Shyambazar',
    nameBn: 'শ্যামবাজার',
    hashSlug: 'shyambazar',
    pincode: '700004',
    address: 'Five Point Crossing, Shyambazar, Kolkata - 700004',
    addressBn: 'পাঁচ মাথার মোড়, শ্যামবাজার, কলকাতা - ৭০০০০৪',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 15,
    isActive: true,
    responseTime: '60 - 90 Mins',
    responseTimeBn: '৬০ - ৯০ মিনিট',
    popularLocalities: [
      'Five Point Crossing', 'Hatibagan Market', 'Fariapukur', 'Sovabazar Rajbari', 'Bagbazar Ghat',
      'Girish Park', 'Central Avenue North', 'Bidhan Sarani', 'Hedua Park', 'Kumartuli', 'Shobhabazar Metro', 'Girish Ghosh Sarani'
    ],
    popularLocalitiesBn: [
      'পাঁচ মাথার মোড়', 'হাতিবাগান মার্কেট', 'ফারিয়াপুকুর', 'শোভাবাজার রাজবাড়ি', 'বাগবাজার ঘাট',
      'গিরিশ পার্ক', 'সেন্ট্রাল অ্যাভিনিউ নর্থ', 'বিধান সরণি', 'হেদুয়া পার্ক', 'কুমোরটুলি', 'শোভাবাজার মেট্রো', 'গিরিশ ঘোষ সরণি'
    ]
  },
  {
    id: 'loc-baranagar',
    name: 'Baranagar',
    nameBn: 'বরানগর',
    hashSlug: 'baranagar',
    pincode: '700036',
    address: 'Dunlop More, BT Road, Baranagar, Kolkata - 700036',
    addressBn: 'ডানলপ মোড়, বিটি রোড, বরানগর, কলকাতা - ৭০০০৩৬',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 16,
    isActive: true,
    responseTime: '60 - 90 Mins',
    responseTimeBn: '৬০ - ৯০ মিনিট',
    popularLocalities: [
      'Dunlop More', 'Tobin Road', 'Sinthee More', 'Bonhooghly', 'Alambazar',
      'Baranagar Bazar', 'Kutighat', 'Ananya Cinema Area', 'Neogipara', 'Mondalpara', 'Noapara Metro', 'Palpara'
    ],
    popularLocalitiesBn: [
      'ডানলপ মোড়', 'টবিন রোড', 'সাঁথি মোড়', 'বনহুগলী', 'আলমবাজার',
      'বরানগর বাজার', 'কুঠিঘাট', 'অনন্যা সিনেমা চত্বর', 'নিওগিপাড়া', 'মন্ডলপাড়া', 'নোয়াপাড়া মেট্রো', 'পালপাড়া'
    ]
  },
  {
    id: 'loc-belgharia',
    name: 'Belgharia',
    nameBn: 'বেলঘরিয়া',
    hashSlug: 'belgharia',
    pincode: '700056',
    address: 'Feeder Road, Rathtala, Belgharia, Kolkata - 700056',
    addressBn: 'ফিডার রোড, রথতলা, বেলঘরিয়া, কলকাতা - ৭০০০৫৬',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 17,
    isActive: true,
    responseTime: '60 - 90 Mins',
    responseTimeBn: '৬০ - ৯০ মিনিট',
    popularLocalities: [
      'Rathtala', 'Nilganj Road', 'Feeder Road', 'Texmaco Area', 'Prafulla Nagar',
      'Nimta Crossing', 'Deshapriya Nagar', 'Rabindranagar', 'Jadu Colony', 'Senpara', 'Belgharia Station Road'
    ],
    popularLocalitiesBn: [
      'রথতলা', 'নীলগঞ্জ রোড', 'ফিডার রোড', 'টেক্সম্যাকো এরিয়া', 'প্রফুল্ল নগর',
      'নিমতা ক্রসিং', 'দেশপ্রিয় নগর', 'রবীন্দ্রনগর', 'যদু কলোনি', 'সেনপাড়া', 'বেলঘরিয়া স্টেশন রোড'
    ]
  },
  {
    id: 'loc-sodepur',
    name: 'Sodepur',
    nameBn: 'সোদেপুর',
    hashSlug: 'sodepur',
    pincode: '700110',
    address: 'BT Road Crossing, Sodepur, North 24 Parganas - 700110',
    addressBn: 'বিটি রোড ক্রসিং, সোদেপুর, উত্তর ২৪ পরগনা - ৭০০১১০',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 18,
    isActive: true,
    responseTime: '60 - 90 Mins',
    responseTimeBn: '৬০ - ৯০ মিনিট',
    popularLocalities: [
      'Ghola', 'HB Town', 'Amarabati', 'Peerless Nagar', 'Panihati',
      'Sodepur Station Road', 'Sukchar', 'Agarpara Border', 'Natagarh', 'Deshbandhu Nagar', 'Traffic More Sodepur'
    ],
    popularLocalitiesBn: [
      'ঘোলা', 'এইচ বি টাউন', 'অমরাবতী', 'পিয়ারলেস নগর', 'পানিহাটি',
      'সোদেপুর স্টেশন রোড', 'সুকচর', 'আগরপাড়া সীমান্ত', 'নাটগড়', 'দেশবন্ধু নগর', 'ট্র্যাফিক মোড় সোদেপুর'
    ]
  },
  {
    id: 'loc-khardah',
    name: 'Khardah',
    nameBn: 'খড়দহ',
    hashSlug: 'khardah',
    pincode: '700117',
    address: 'Station Road, Khardah, North 24 Parganas - 700117',
    addressBn: 'স্টেশন রোড, খড়দহ, উত্তর ২৪ পরগনা - ৭০০১১৭',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 19,
    isActive: true,
    responseTime: '60 - 90 Mins',
    responseTimeBn: '৬০ - ৯০ মিনিট',
    popularLocalities: [
      'Khardah Station Rd', 'Surya Sen Nagar', 'Patulia', 'Rahara Chowmatha', 'BT Road Khardah',
      'Titagarh Road', 'Balaram Hospital Area', 'Usha Colony', 'Sadhanpur', 'Khardah Ferry Ghat'
    ],
    popularLocalitiesBn: [
      'খড়দহ স্টেশন রোড', 'সূর্য সেন নগর', 'পাতুলিয়া', 'রহড়া চৌমাথা', 'বিটি রোড খড়দহ',
      'টিটাগড় রোড', 'বলরাম হাসপাতাল চত্বর', 'ঊষা কলোনি', 'সাধনপুর', 'খড়দহ ফেরিঘাট'
    ]
  },
  {
    id: 'loc-barrackpur',
    name: 'Barrackpur',
    nameBn: 'ব্যারাকপুর',
    hashSlug: 'barrackpur',
    pincode: '700120',
    address: 'Station Road, Barrackpur, North 24 Parganas - 700120',
    addressBn: 'স্টেশন রোড, ব্যারাকপুর, উত্তর ২৪ পরগনা - ৭০০১২০',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 20,
    isActive: true,
    responseTime: '60 - 90 Mins',
    responseTimeBn: '৬০ - ৯০ মিনিট',
    popularLocalities: [
      'Chiria More', 'Anandapuri', 'Palashi', 'Barrackpore Cantonment', 'Titagarh',
      'Wireless More', 'Lalkuthi', 'Talpukur', 'SN Banerjee Road', 'Mangal Pandey Ghat', 'Sukanta Sadan', 'Dhobi Ghat'
    ],
    popularLocalitiesBn: [
      'চিড়িয়া মোড়', 'আনন্দপুরী', 'পলাশী', 'ব্যারাকপুর ক্যান্টনমেন্ট', 'টিটাগড়',
      'ওয়ারলেস মোড়', 'লালকুঠি', 'তালপুকুর', 'এসএন ব্যানার্জি রোড', 'মঙ্গল পান্ডে ঘাট', 'সুকান্ত সদন', 'ধোবি ঘাট'
    ]
  },
  {
    id: 'loc-naihati',
    name: 'Naihati',
    nameBn: 'নৈহাটি',
    hashSlug: 'naihati',
    pincode: '743165',
    address: 'Naihati Station Road, North 24 Parganas - 743165',
    addressBn: 'নৈহাটি স্টেশন রোড, উত্তর ২৪ পরগনা - ৭৪৩১৬৫',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 21,
    isActive: true,
    responseTime: '60 - 90 Mins',
    responseTimeBn: '৬০ - ৯০ মিনিট',
    popularLocalities: [
      'Naihati Station Rd', 'Bhatpara', 'Garifa', 'Kankinara', 'Bijpur',
      'Gouripore', 'Hazinagar', 'Mitrabagan', 'Anandamath', 'Debok', 'Ramchandrapur'
    ],
    popularLocalitiesBn: [
      'নৈহাটি স্টেশন রোড', 'ভাটপাড়া', 'গরিফা', 'কাঁকিনাড়া', 'বীজপুর',
      'গৌরীপুর', 'হাজিনগর', 'মিত্রবাগান', 'আনন্দমঠ', 'দেবক', 'রামচন্দ্রপুর'
    ]
  },
  {
    id: 'loc-kaikhali',
    name: 'Kaikhali',
    nameBn: 'কৈখালী',
    hashSlug: 'kaikhali',
    pincode: '700052',
    address: 'VIP Road, Kaikhali More, Kolkata - 700052',
    addressBn: 'ভিআইপি রোড, কৈখালী মোড়, কলকাতা - ৭০০০৫২',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 22,
    isActive: true,
    responseTime: '45 - 60 Mins',
    responseTimeBn: '৪৫ - ৬০ মিনিট',
    popularLocalities: [
      'Haldiram Crossing', 'Loknath Mandir', 'Teghoria', 'Raghunathpur', 'VIP Road Kaikhali',
      'Chiriamore VIP', 'Baguiati Jora Mandir', 'Ashwininagar', 'Mondal Ganti', 'Deshbandhu Nagar VIP'
    ],
    popularLocalitiesBn: [
      'হলদিরাম ক্রসিং', 'লোকনাথ মন্দির', 'তেঘড়িয়া', 'রঘুনাথপুর', 'ভিআইপি রোড কৈখালী',
      'চিড়িয়া মোড় ভিআইপি', 'বাগুইআটি জোড়া মন্দির', 'অশ্বিনীনগর', 'মন্ডল গাতি', 'দেশবন্ধু নগর ভিআইপি'
    ]
  },
  {
    id: 'loc-birati',
    name: 'Birati',
    nameBn: 'বিরাটি',
    hashSlug: 'birati',
    pincode: '700051',
    address: 'M.B. Road, Birati, North 24 Parganas - 700051',
    addressBn: 'এম বি রোড, বিরাটি, উত্তর ২৪ পরগনা - ৭০০০৫১',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 23,
    isActive: true,
    responseTime: '60 - 90 Mins',
    responseTimeBn: '৬০ - ৯০ মিনিট',
    popularLocalities: [
      'Nimta', 'Gouripur', 'Airport Gate 2.5', 'Birati Station More', 'Michael Nagar',
      'Mahajati Nagar', 'Bisharpara', 'Khalisakota', 'Sukanta Pally', 'Sarat Bose Nagar'
    ],
    popularLocalitiesBn: [
      'নিমতা', 'গৌরীপুর', 'এয়ারপোর্ট ২.৫ গেট', 'বিরাটি স্টেশন মোড়', 'মাইকেল নগর',
      'মহাজাতি নগর', 'বিশারপাড়া', 'খালিসাকোটা', 'সুকান্ত পল্লী', 'শরৎ বোস নগর'
    ]
  },
  {
    id: 'loc-madhyamgram',
    name: 'Madhyamgram',
    nameBn: 'মধ্যমগ্রাম',
    hashSlug: 'madhyamgram',
    pincode: '700129',
    address: 'Jessore Road Chowmatha, Madhyamgram - 700129',
    addressBn: 'যশোর রোড চৌমাথা, মধ্যমগ্রাম - ৭০০১২৯',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 24,
    isActive: true,
    responseTime: '60 - 90 Mins',
    responseTimeBn: '৬০ - ৯০ মিনিট',
    popularLocalities: [
      'Doltala', 'Madhyamgram Chowmatha', 'Sodepur Road', 'Badu Road', 'Basunagar',
      'Bankimpally', 'Udayrajpur', 'Michael Nagar Border', 'Sajirhat', 'Netaji Nagar Madhyamgram'
    ],
    popularLocalitiesBn: [
      'দোলতলা', 'মধ্যমগ্রাম চৌমাথা', 'সোদেপুর রোড', 'বাদু রোড', 'বসু নগর',
      'বঙ্কিমপল্লী', 'উদয়রাজপুর', 'মাইকেল নগর সীমান্ত', 'সাজিরহাট', 'নেতাজী নগর মধ্যমগ্রাম'
    ]
  },
  {
    id: 'loc-barasat',
    name: 'Barasat',
    nameBn: 'বারাসাত',
    hashSlug: 'barasat',
    pincode: '700124',
    address: 'Champadali More, Barasat, North 24 Parganas - 700124',
    addressBn: 'চাঁপাডালি মোড়, বারাসাত, উত্তর ২৪ পরগনা - ৭০০১২৪',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 25,
    isActive: true,
    responseTime: '60 - 90 Mins',
    responseTimeBn: '৬০ - ৯০ মিনিট',
    popularLocalities: [
      'Champadali More', 'Duckbangla', 'Colony More', 'Hridaypur', 'Sethpukur',
      'Barasat Station', 'Pioneer Park', 'Kazipara', 'Nabapally', 'Kadamgachi', 'Choto Jagulia'
    ],
    popularLocalitiesBn: [
      'চাঁপাডালি মোড়', 'ডাকবাংলো', 'কলোনি মোড়', 'হৃদয়পুর', 'শেঠপুকুর',
      'বারাসাত স্টেশন', 'পায়োনিয়ার পার্ক', 'কাজিপাড়া', 'নবপল্লী', 'কদমগাছি', 'ছোট জাগুলিয়া'
    ]
  },
  {
    id: 'loc-habra',
    name: 'Habra',
    nameBn: 'হাবড়া',
    hashSlug: 'habra',
    pincode: '743263',
    address: 'Jessore Road, Habra, North 24 Parganas - 743263',
    addressBn: 'যশোর রোড, হাবড়া, উত্তর ২৪ পরগনা - ৭৪৩২৬৩',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 26,
    isActive: true,
    responseTime: '60 - 90 Mins',
    responseTimeBn: '৬০ - ৯০ মিনিট',
    popularLocalities: [
      'Habra Town', 'Jessore Road', 'Banipur', 'Ashoknagar Building More', 'Guma',
      'Prithiba', 'Kalyangarh', 'Golabari', 'Joygachi', 'Hijalpukuria', 'Manashatala'
    ],
    popularLocalitiesBn: [
      'হাবড়া টাউন', 'যশোর রোড', 'বাণীপুর', 'অশোকনগর বিল্ডিং মোড়', 'গুমা',
      'পৃথীবা', 'কল্যাণগড়', 'গোলাবাড়ি', 'জয়গাছি', 'হিজলপুকুরিয়া', 'মনসাতলা'
    ]
  },
  {
    id: 'loc-kalyani',
    name: 'Kalyani',
    nameBn: 'কল্যাণী',
    hashSlug: 'kalyani',
    pincode: '741235',
    address: 'Central Park, Block B, Kalyani, Nadia - 741235',
    addressBn: 'সেন্ট্রাল পার্ক, ব্লক বি, কল্যাণী, নদীয়া - ৭৪১২৩৫',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 27,
    isActive: true,
    responseTime: '60 - 90 Mins',
    responseTimeBn: '৬০ - ৯০ মিনিট',
    popularLocalities: [
      'Kalyani Block A', 'Kalyani Block B', 'Kalyani Block C', 'Kalyani Block D', 'Central Park',
      'Kanchrapara Station', 'Halisahar', 'Kalyani Ghoshpara', 'AIIMS Kalyani Area', 'Buddha Park', 'Gayeshpur'
    ],
    popularLocalitiesBn: [
      'কল্যাণী ব্লক এ', 'কল্যাণী ব্লক বি', 'কল্যাণী ব্লক সি', 'কল্যাণী ব্লক ডি', 'সেন্ট্রাল পার্ক',
      'কাঁচরাপাড়া স্টেশন', 'হালিশহর', 'কল্যাণী ঘোষপাড়া', 'এইমস কল্যাণী চত্বর', 'বুদ্ধ পার্ক', 'গয়েশপুর'
    ]
  },
  {
    id: 'loc-howrah',
    name: 'Howrah',
    nameBn: 'হাওড়া',
    hashSlug: 'howrah',
    pincode: '711101',
    address: 'GT Road, Howrah Maidan, Howrah - 711101',
    addressBn: 'জি টি রোড, হাওড়া ময়দান, হাওড়া - ৭১১১০১',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 28,
    isActive: true,
    responseTime: '60 - 90 Mins',
    responseTimeBn: '৬০ - ৯০ মিনিট',
    popularLocalities: [
      'Howrah Maidan', 'Mandirtala', 'Shibpur Tram Depot', 'B.Garden', 'Kadamtala',
      'Avani Riverside Mall', 'Kona Expressway', 'Nabanna Area', 'Chatterjeehat', 'Ichapur Howrah'
    ],
    popularLocalitiesBn: [
      'হাওড়া ময়দান', 'মন্দিরতলা', 'শিবপুর ট্রাম ডিপো', 'বি গার্ডেন', 'কদমতলা',
      'অবনী রিভারসাইড মল', 'কোনা এক্সপ্রেসওয়ে', 'নবান্ন চত্বর', 'চ্যাটার্জীহাট', 'ইছাপুর হাওড়া'
    ]
  },
  {
    id: 'loc-salkia',
    name: 'Salkia & Bally',
    nameBn: 'সালকিয়া ও বালি',
    hashSlug: 'salkia',
    pincode: '711106',
    address: 'Bandhaghat, Salkia, Howrah - 711106',
    addressBn: 'বাঁধাঘাট, সালকিয়া, হাওড়া - ৭১১১০৬',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 29,
    isActive: true,
    responseTime: '60 - 90 Mins',
    responseTimeBn: '৬০ - ৯০ মিনিট',
    popularLocalities: [
      'Bandhaghat', 'Belur Math', 'Liluah', 'Malipanchghara', 'Bally Bazar',
      'Ghusuri', 'Salkia Chowrasta', 'Haragunge Bazar', 'Don Bosco Liluah', 'Pilkhana Howrah'
    ],
    popularLocalitiesBn: [
      'বাঁধাঘাট', 'বেলুড় মঠ', 'লিলুয়া', 'মালীপাঁচঘড়া', 'বালি বাজার',
      'ঘোষুড়ি', 'সালকিয়া চৌরাস্তা', 'হরগঞ্জ বাজার', 'ডন বস্কো লিলুয়া', 'পিলখানা হাওড়া'
    ]
  },
  {
    id: 'loc-uttarpara',
    name: 'Uttarpara & Serampore',
    nameBn: 'উত্তরপাড়া ও শ্রীরামপুর',
    hashSlug: 'uttarpara',
    pincode: '712258',
    address: 'GT Road, Uttarpara, Hooghly - 712258',
    addressBn: 'জি টি রোড, উত্তরপাড়া, হুগলি - ৭১২২৫৮',
    state: 'West Bengal',
    stateBn: 'পশ্চিমবঙ্গ',
    sortOrder: 30,
    isActive: true,
    responseTime: '60 - 90 Mins',
    responseTimeBn: '৬০ - ৯০ মিনিট',
    popularLocalities: [
      'Hindmotor', 'Konnagar', 'Kotrung', 'Serampore Court', 'Rishra',
      'Battala Serampore', 'Mahesh', 'Rajballavpur', 'Uttarpara Station Road', 'Pearabagan', 'Nabagram Hooghly'
    ],
    popularLocalitiesBn: [
      'হিন্দমোটর', 'কোন্নগর', 'কটরুং', 'শ্রীরামপুর কোর্ট', 'রিষড়া',
      'বটতলা শ্রীরামপুর', 'মাহেশ', 'রাজবল্লভপুর', 'উত্তরপাড়া স্টেশন রোড', 'পয়রাবাগান', 'নবগ্রাম হুগলি'
    ]
  }
];

export const initialTrustItems: TrustItem[] = [
  {
    id: 'trust-1',
    title: 'Verified Technicians',
    titleBn: 'প্রত্যয়িত টেকনিশিয়ান',
    subtitle: 'Background-verified, certified repair specialists with 5+ years of multi-brand field experience.',
    subtitleBn: 'ব্যাকগ্রাউন্ড-ভেরিফাইড এবং ৫+ বছরের অভিজ্ঞতা সম্পন্ন দক্ষ টেকনিশিয়ান।',
    iconName: 'shield-check',
    sortOrder: 1
  },
  {
    id: 'trust-2',
    title: 'Transparent Pricing',
    titleBn: 'স্বচ্ছ মূল্য নির্ধারণ',
    subtitle: 'Transparent, budget-friendly pricing. Get clear estimates on call and upfront quotation before any work commences.',
    subtitleBn: 'স্বচ্ছ ও সাশ্রয়ী সার্ভিস চার্জ। ফোনে কথা বলে সঠিক খরচের ধারণা এবং কাজের আগেই স্পষ্ট কোটেশন।',
    iconName: 'badge-percent',
    sortOrder: 2
  },
  {
    id: 'trust-3',
    title: '30-Day Service Warranty',
    titleBn: '৩০ দিনের সার্ভিস ওয়ারেন্টি',
    subtitle: 'Every completed repair is covered by our hassle-free 30-day workmanship and genuine parts warranty.',
    subtitleBn: 'প্রতিটি সফল মেরামতে পাচ্ছেন ৩০ দিনের কাজের নিশ্চয়তা এবং জেনুইন পার্টসের ওয়ারেন্টি।',
    iconName: 'clock-check',
    sortOrder: 3
  }
];

export { initialReviews } from './reviews-data';

export const initialSearchKeywords: SearchKeywordItem[] = [
  { id: 'kw-haci-1', keyword: 'home Appliance Care India', keywordBn: 'হোম অ্যাপ্লায়েন্স কেয়ার ইন্ডিয়া', categoryId: 'ac-repair', targetUrl: '/' },
  { id: 'kw-haci-2', keyword: 'Home appliance care india near me', keywordBn: 'হোম অ্যাপ্লায়েন্স কেয়ার ইন্ডিয়া নিকটবর্তী সার্ভিস', categoryId: 'ac-repair', targetUrl: '/' },
  { id: 'kw-haci-3', keyword: 'Home appliance care india reviews', keywordBn: 'হোম অ্যাপ্লায়েন্স কেয়ার ইন্ডিয়া গ্রাহক রিভিউ', categoryId: 'ac-repair', targetUrl: '/reviews' },
  { id: 'kw-haci-4', keyword: 'Home appliance care india phone number', keywordBn: 'হোম অ্যাপ্লায়েন্স কেয়ার ইন্ডিয়া ফোন নম্বর', categoryId: 'ac-repair', targetUrl: '/' },
  { id: 'kw-1', keyword: 'AC gas refill', keywordBn: 'এসি গ্যাস রিফিল', categoryId: 'ac-repair', problemId: 'ac-gas-leakage', targetUrl: '/ac-repair' },
  { id: 'kw-2', keyword: 'AC not cooling', keywordBn: 'এসি ঠান্ডা হচ্ছে না', categoryId: 'ac-repair', problemId: 'ac-not-cooling', targetUrl: '/ac-repair' },
  { id: 'kw-3', keyword: 'AC water leakage', keywordBn: 'এসি থেকে জল পড়া', categoryId: 'ac-repair', problemId: 'ac-water-leakage', targetUrl: '/ac-repair' },
  { id: 'kw-4', keyword: 'AC jet cleaning', keywordBn: 'এসি জেট ক্লিনিং', categoryId: 'ac-repair', problemId: 'ac-bad-odor', targetUrl: '/ac-repair' },
  { id: 'kw-5', keyword: 'Fridge not cooling', keywordBn: 'ফ্রিজ ঠান্ডা হচ্ছে না', categoryId: 'fridge-repair', problemId: 'fridge-not-cooling', targetUrl: '/fridge-repair' },
  { id: 'kw-6', keyword: 'Refrigerator gas charging', keywordBn: 'ফ্রিজ গ্যাস চার্জিং', categoryId: 'fridge-repair', problemId: 'fridge-not-cooling', targetUrl: '/fridge-repair' },
  { id: 'kw-7', keyword: 'Fridge ice accumulation', keywordBn: 'ফ্রিজে বরফ জমা', categoryId: 'fridge-repair', problemId: 'fridge-excess-frost', targetUrl: '/fridge-repair' },
  { id: 'kw-8', keyword: 'Washing machine not spinning', keywordBn: 'ওয়াশিং মেশিন ঘুরছে না', categoryId: 'washing-machine-repair', problemId: 'wm-not-spinning', targetUrl: '/washing-machine-repair' },
  { id: 'kw-9', keyword: 'Washing machine OE drain error', keywordBn: 'ওয়াশিং মেশিন ড্রেন সমস্যা', categoryId: 'washing-machine-repair', problemId: 'wm-not-draining', targetUrl: '/washing-machine-repair' },
  { id: 'kw-10', keyword: 'Microwave not heating', keywordBn: 'মাইক্রোওয়েভ গরম হচ্ছে না', categoryId: 'microwave-repair', problemId: 'mw-not-heating', targetUrl: '/microwave-repair' },
  { id: 'kw-11', keyword: 'Microwave sparks', keywordBn: 'মাইক্রোওয়েভে স্পার্কিং', categoryId: 'microwave-repair', problemId: 'mw-sparks-inside', targetUrl: '/microwave-repair' },
  { id: 'kw-12', keyword: 'LED TV screen black sound only', keywordBn: 'টিভিতে ছবি নেই শব্দ আছে', categoryId: 'led-tv-repair', problemId: 'tv-sound-no-picture', targetUrl: '/led-tv-repair' },
  { id: 'kw-13', keyword: 'LED TV lines on display', keywordBn: 'টিভির পর্দায় রঙিন লাইন', categoryId: 'led-tv-repair', problemId: 'tv-lines-on-display', targetUrl: '/led-tv-repair' },
  // Brand specific search keywords
  { id: 'kw-og-1', keyword: 'General service centre kolkata', keywordBn: 'জেনারেল সার্ভিস সেন্টার কলকাতা', categoryId: 'ac-repair', targetUrl: '/brands/o-general' },
  { id: 'kw-og-2', keyword: 'General customer care number', keywordBn: 'জেনারেল কাস্টমার কেয়ার নম্বর', categoryId: 'ac-repair', targetUrl: '/brands/o-general' },
  { id: 'kw-og-3', keyword: 'General ac not cooling properly', keywordBn: 'জেনারেল এসি ঠান্ডা হচ্ছে না', categoryId: 'ac-repair', targetUrl: '/brands/o-general' },
  { id: 'kw-og-4', keyword: 'General ac inverter error code', keywordBn: 'জেনারেল এসি ইনভার্টার এরর কোড', categoryId: 'ac-repair', targetUrl: '/brands/o-general' },
  { id: 'kw-ly-1', keyword: 'Lloyd service centre number', keywordBn: 'লয়েড সার্ভিস সেন্টার নম্বর', categoryId: 'ac-repair', targetUrl: '/brands/lloyd' },
  { id: 'kw-ly-2', keyword: 'Lloyd ac not cooling but fan is running', keywordBn: 'লয়েড এসি ফ্যান চলছে কিন্তু ঠান্ডা হচ্ছে না', categoryId: 'ac-repair', targetUrl: '/brands/lloyd' },
  { id: 'kw-ly-3', keyword: 'Lloyd washing machine e3 f8 error', keywordBn: 'লয়েড ওয়াশিং মেশিন এরর কোড', categoryId: 'washing-machine-repair', targetUrl: '/brands/lloyd' },
  { id: 'kw-ly-4', keyword: 'Lloyd fridge double door repair', keywordBn: 'লয়েড ফ্রিজ মেরামত', categoryId: 'fridge-repair', targetUrl: '/brands/lloyd' },
  { id: 'kw-bs-1', keyword: 'Blue star service centre kolkata', keywordBn: 'ব্লু স্টার সার্ভিস সেন্টার কলকাতা', categoryId: 'ac-repair', targetUrl: '/brands/blue-star' },
  { id: 'kw-bs-2', keyword: 'Blue star inverter ac e6 error code', keywordBn: 'ব্লু স্টার ইনভার্টার এসি E6 এরর', categoryId: 'ac-repair', targetUrl: '/brands/blue-star' },
  { id: 'kw-bs-3', keyword: 'Blue star ac not working with remote', keywordBn: 'ব্লু স্টার এসি রিমোট কাজ করছে না', categoryId: 'ac-repair', targetUrl: '/brands/blue-star' },
  { id: 'kw-dk-1', keyword: 'Daikin service centre kolkata phone number', keywordBn: 'ডাইকিন সার্ভিস সেন্টার কলকাতা ফোন নম্বর', categoryId: 'ac-repair', targetUrl: '/brands/daikin' },
  { id: 'kw-dk-2', keyword: 'Daikin customer care 24x7', keywordBn: 'ডাইকিন কাস্টমার কেয়ার', categoryId: 'ac-repair', targetUrl: '/brands/daikin' },
  { id: 'kw-dk-3', keyword: 'Daikin ac repair near me', keywordBn: 'ডাইকিন এসি মেরামত', categoryId: 'ac-repair', targetUrl: '/brands/daikin' },
  { id: 'kw-mb-1', keyword: 'Mitsubishi service centre kolkata', keywordBn: 'মিৎসবিশি সার্ভিস সেন্টার কলকাতা', categoryId: 'ac-repair', targetUrl: '/brands/mitsubishi' },
  { id: 'kw-mb-2', keyword: 'Mitsubishi ac repair and service', keywordBn: 'মিৎসবিশি এসি মেরামত ও সার্ভিসিং', categoryId: 'ac-repair', targetUrl: '/brands/mitsubishi' },
  { id: 'kw-ifb-1', keyword: 'IFB customer care number 24x7', keywordBn: 'আইএফবি কাস্টমার কেয়ার নম্বর', categoryId: 'washing-machine-repair', targetUrl: '/brands/ifb' },
  { id: 'kw-ifb-2', keyword: 'IFB service centre kolkata contact', keywordBn: 'আইএফবি সার্ভিস সেন্টার কলকাতা', categoryId: 'washing-machine-repair', targetUrl: '/brands/ifb' },
  { id: 'kw-ifb-3', keyword: 'IFB front load washing machine repair', keywordBn: 'আইএফবি ফ্রন্ট লোড ওয়াশিং মেশিন মেরামত', categoryId: 'washing-machine-repair', targetUrl: '/brands/ifb' },
  { id: 'kw-ifb-4', keyword: 'IFB micro oven repair', keywordBn: 'আইএফবি মাইক্রোওয়েভ ওভেন মেরামত', categoryId: 'microwave-repair', targetUrl: '/brands/ifb' },
  { id: 'kw-wp-1', keyword: 'Whirlpool service centre kolkata phone number', keywordBn: 'ওয়ার্লপুল সার্ভিস সেন্টার কলকাতা', categoryId: 'fridge-repair', targetUrl: '/brands/whirlpool' },
  { id: 'kw-wp-2', keyword: 'Whirlpool fridge refrigerator repair', keywordBn: 'ওয়ার্লপুল ফ্রিজ মেরামত', categoryId: 'fridge-repair', targetUrl: '/brands/whirlpool' },
  { id: 'kw-wp-3', keyword: 'Whirlpool washing machine e1 error', keywordBn: 'ওয়ার্লপুল ওয়াশিং মেশিন E1 এরর', categoryId: 'washing-machine-repair', targetUrl: '/brands/whirlpool' },
  { id: 'kw-ht-1', keyword: 'Hitachi service centre kolkata phone number', keywordBn: 'হিটাচি সার্ভিস সেন্টার কলকাতা', categoryId: 'ac-repair', targetUrl: '/brands/hitachi' },
  { id: 'kw-ht-2', keyword: 'Hitachi ac repair service near me', keywordBn: 'হিটাচি এসি মেরামত সার্ভিস', categoryId: 'ac-repair', targetUrl: '/brands/hitachi' },
  { id: 'kw-ht-3', keyword: 'Hitachi inverter fridge repair', keywordBn: 'হিটাচি ইনভার্টার ফ্রিজ মেরামত', categoryId: 'fridge-repair', targetUrl: '/brands/hitachi' },
  // Voltas
  { id: 'kw-vt-1', keyword: 'Voltas service centre kolkata contact number', keywordBn: 'ভোল্টাস সার্ভিস সেন্টার কলকাতা', categoryId: 'ac-repair', targetUrl: '/brands/voltas' },
  { id: 'kw-vt-2', keyword: 'Voltas customer care number 24x7', keywordBn: 'ভোল্টাস কাস্টমার কেয়ার নম্বর', categoryId: 'ac-repair', targetUrl: '/brands/voltas' },
  { id: 'kw-vt-3', keyword: 'Voltas ac not cooling but fan is running', keywordBn: 'ভোল্টাস এসি ফ্যান চলছে কিন্তু ঠান্ডা হচ্ছে না', categoryId: 'ac-repair', targetUrl: '/brands/voltas' },
  { id: 'kw-vt-4', keyword: 'Voltas ac inverter e6 f1 error code', keywordBn: 'ভোল্টাস এসি ইনভার্টার এরর কোড', categoryId: 'ac-repair', targetUrl: '/brands/voltas' },
  // Samsung
  { id: 'kw-sm-1', keyword: 'Samsung service centre kolkata phone number', keywordBn: 'স্যামসাং সার্ভিস সেন্টার কলকাতা', categoryId: 'ac-repair', targetUrl: '/brands/samsung' },
  { id: 'kw-sm-2', keyword: 'Samsung customer care number 24x7', keywordBn: 'স্যামসাং কাস্টমার কেয়ার নম্বর', categoryId: 'ac-repair', targetUrl: '/brands/samsung' },
  { id: 'kw-sm-3', keyword: 'Samsung washing machine 4e 5e error', keywordBn: 'স্যামসাং ওয়াশিং মেশিন 4E 5E এরর', categoryId: 'washing-machine-repair', targetUrl: '/brands/samsung' },
  { id: 'kw-sm-4', keyword: 'Samsung double door fridge not cooling bottom', keywordBn: 'স্যামসাং ফ্রিজের নিচের অংশ ঠান্ডা হচ্ছে না', categoryId: 'fridge-repair', targetUrl: '/brands/samsung' },
  { id: 'kw-sm-5', keyword: 'Samsung led tv screen black sound coming', keywordBn: 'স্যামসাং টিভিতে শব্দ আছে কিন্তু পর্দা কালো', categoryId: 'led-tv-repair', targetUrl: '/brands/samsung' },
  // LG
  { id: 'kw-lg-1', keyword: 'LG service centre kolkata phone number', keywordBn: 'এলজি সার্ভিস সেন্টার কলকাতা', categoryId: 'ac-repair', targetUrl: '/brands/lg' },
  { id: 'kw-lg-2', keyword: 'LG customer care number 24x7', keywordBn: 'এলজি কাস্টমার কেয়ার নম্বর', categoryId: 'ac-repair', targetUrl: '/brands/lg' },
  { id: 'kw-lg-3', keyword: 'LG dual inverter ac ch05 ch10 error', keywordBn: 'এলজি ডুয়াল ইনভার্টার এসি CH05 এরর', categoryId: 'ac-repair', targetUrl: '/brands/lg' },
  { id: 'kw-lg-4', keyword: 'LG washing machine OE IE dE error', keywordBn: 'এলজি ওয়াশিং মেশিন OE IE এরর', categoryId: 'washing-machine-repair', targetUrl: '/brands/lg' },
  { id: 'kw-lg-5', keyword: 'LG linear inverter fridge cooling problem', keywordBn: 'এলজি লিনিয়ার ইনভার্টার ফ্রিজ মেরামত', categoryId: 'fridge-repair', targetUrl: '/brands/lg' },
  // Carrier
  { id: 'kw-cr-1', keyword: 'Carrier service centre kolkata contact number', keywordBn: 'ক্যারিয়ার সার্ভিস সেন্টার কলকাতা', categoryId: 'ac-repair', targetUrl: '/brands/carrier' },
  { id: 'kw-cr-2', keyword: 'Carrier customer care number 24x7', keywordBn: 'ক্যারিয়ার কাস্টমার কেয়ার নম্বর', categoryId: 'ac-repair', targetUrl: '/brands/carrier' },
  { id: 'kw-cr-3', keyword: 'Carrier ac not cooling but fan is running', keywordBn: 'ক্যারিয়ার এসি ফ্যান চলছে ঠান্ডা হচ্ছে না', categoryId: 'ac-repair', targetUrl: '/brands/carrier' },
  { id: 'kw-cr-4', keyword: 'Carrier inverter ac e1 e4 error code', keywordBn: 'ক্যারিয়ার ইনভার্টার এসি E1 E4 এরর', categoryId: 'ac-repair', targetUrl: '/brands/carrier' },
  // Godrej
  { id: 'kw-gd-1', keyword: 'Godrej service centre kolkata phone number', keywordBn: 'গোদরেজ সার্ভিস সেন্টার কলকাতা', categoryId: 'fridge-repair', targetUrl: '/brands/godrej' },
  { id: 'kw-gd-2', keyword: 'Godrej customer care number 24x7', keywordBn: 'গোদরেজ কাস্টমার কেয়ার নম্বর', categoryId: 'fridge-repair', targetUrl: '/brands/godrej' },
  { id: 'kw-gd-3', keyword: 'Godrej double door fridge not cooling', keywordBn: 'গোদরেজ ডাবল ডোর ফ্রিজ ঠান্ডা হচ্ছে না', categoryId: 'fridge-repair', targetUrl: '/brands/godrej' },
  // Haier
  { id: 'kw-hr-1', keyword: 'Haier service centre kolkata contact number', keywordBn: 'হায়ার সার্ভিস সেন্টার কলকাতা', categoryId: 'ac-repair', targetUrl: '/brands/haier' },
  { id: 'kw-hr-2', keyword: 'Haier customer care number 24x7', keywordBn: 'হায়ার কাস্টমার কেয়ার নম্বর', categoryId: 'ac-repair', targetUrl: '/brands/haier' },
  { id: 'kw-hr-3', keyword: 'Haier inverter ac e7 error code', keywordBn: 'হায়ার ইনভার্টার এসি E7 এরর', categoryId: 'ac-repair', targetUrl: '/brands/haier' },
  // Panasonic
  { id: 'kw-pn-1', keyword: 'Panasonic service centre kolkata phone number', keywordBn: 'প্যানাসনিক সার্ভিস সেন্টার কলকাতা', categoryId: 'ac-repair', targetUrl: '/brands/panasonic' },
  { id: 'kw-pn-2', keyword: 'Panasonic inverter ac h11 error code', keywordBn: 'প্যানাসনিক ইনভার্টার এসি H11 এরর', categoryId: 'ac-repair', targetUrl: '/brands/panasonic' },
  // Bosch & Siemens
  { id: 'kw-bs-w1', keyword: 'Bosch washing machine repair service kolkata', keywordBn: 'বশ ওয়াশিং মেশিন মেরামত কলকাতা', categoryId: 'washing-machine-repair', targetUrl: '/brands/bosch' },
  { id: 'kw-bs-w2', keyword: 'Bosch washing machine e18 e29 error code', keywordBn: 'বশ ওয়াশিং মেশিন E18 এরর', categoryId: 'washing-machine-repair', targetUrl: '/brands/bosch' },
  { id: 'kw-sm-w1', keyword: 'Siemens washing machine service kolkata', keywordBn: 'সিমেন্স ওয়াশিং মেশিন মেরামত কলকাতা', categoryId: 'washing-machine-repair', targetUrl: '/brands/siemens' },
  // Sony
  { id: 'kw-sn-1', keyword: 'Sony service centre kolkata tv led repair', keywordBn: 'সোনি সার্ভিস সেন্টার কলকাতা টিভি মেরামত', categoryId: 'led-tv-repair', targetUrl: '/brands/sony' },
  { id: 'kw-sn-2', keyword: 'Sony bravia tv red light blinking 6 times', keywordBn: 'সোনি ব্রাভিয়া টিভি লাল লাইট ৬ বার ব্লিংক', categoryId: 'led-tv-repair', targetUrl: '/brands/sony' },
  { id: 'kw-sn-3', keyword: 'Sony tv screen black sound coming', keywordBn: 'সোনি টিভিতে শব্দ আছে ছবি নেই', categoryId: 'led-tv-repair', targetUrl: '/brands/sony' },
  // Toshiba
  { id: 'kw-ts-1', keyword: 'Toshiba service centre kolkata contact number', keywordBn: 'তোশিবা সার্ভিস সেন্টার কলকাতা', categoryId: 'ac-repair', targetUrl: '/brands/toshiba' },
  { id: 'kw-ts-2', keyword: 'Toshiba washing machine e23 error repair', keywordBn: 'তোশিবা ওয়াশিং মেশিন E23 এরর', categoryId: 'washing-machine-repair', targetUrl: '/brands/toshiba' },
  // TCL
  { id: 'kw-tcl-1', keyword: 'TCL service centre kolkata tv repair', keywordBn: 'টিসিএল সার্ভিস সেন্টার কলকাতা টিভি মেরামত', categoryId: 'led-tv-repair', targetUrl: '/brands/tcl' },
  { id: 'kw-tcl-2', keyword: 'TCL smart tv screen black sound coming', keywordBn: 'টিসিএল টিভিতে শব্দ আছে স্ক্রিন কালো', categoryId: 'led-tv-repair', targetUrl: '/brands/tcl' },
  // Mi / Xiaomi
  { id: 'kw-mi-1', keyword: 'Mi service centre kolkata tv repair doorstep', keywordBn: 'এমআই সার্ভিস সেন্টার কলকাতা টিভি মেরামত', categoryId: 'led-tv-repair', targetUrl: '/brands/mi' },
  { id: 'kw-mi-2', keyword: 'Mi tv sound ok no picture black screen', keywordBn: 'এমআই টিভি সাউন্ড আসছে স্ক্রিন কালো', categoryId: 'led-tv-repair', targetUrl: '/brands/mi' },
  { id: 'kw-mi-3', keyword: 'Mi tv stuck on mi logo reboot loop', keywordBn: 'এমআই লোগোতে আটকে থাকা টিভি ঠিক করা', categoryId: 'led-tv-repair', targetUrl: '/brands/mi' },
  // OnePlus
  { id: 'kw-op-1', keyword: 'OnePlus service centre kolkata tv repair', keywordBn: 'ওয়ানপ্লাস সার্ভিস সেন্টার কলকাতা টিভি মেরামত', categoryId: 'led-tv-repair', targetUrl: '/brands/oneplus' },
  { id: 'kw-op-2', keyword: 'OnePlus tv green line on screen repair', keywordBn: 'ওয়ানপ্লাস টিভি স্ক্রিনে সবুজ দাগ ঠিক করা', categoryId: 'led-tv-repair', targetUrl: '/brands/oneplus' },
  // Kelvinator
  { id: 'kw-kv-1', keyword: 'Kelvinator service centre kolkata fridge repair', keywordBn: 'কেলভিনেটর সার্ভিস সেন্টার কলকাতা ফ্রিজ মেরামত', categoryId: 'fridge-repair', targetUrl: '/brands/kelvinator' },
  { id: 'kw-kv-2', keyword: 'Kelvinator fridge not cooling properly', keywordBn: 'কেলভিনেটর ফ্রিজ ঠান্ডা হচ্ছে না', categoryId: 'fridge-repair', targetUrl: '/brands/kelvinator' },
  // Electrolux
  { id: 'kw-el-1', keyword: 'Electrolux service centre kolkata washing machine', keywordBn: 'ইলেকট্রোলাক্স সার্ভিস সেন্টার কলকাতা ওয়াশিং মেশিন', categoryId: 'washing-machine-repair', targetUrl: '/brands/electrolux' },
  { id: 'kw-el-2', keyword: 'Electrolux front load washing machine e20 error', keywordBn: 'ইলেকট্রোলাক্স ওয়াশিং মেশিন E20 এরর', categoryId: 'washing-machine-repair', targetUrl: '/brands/electrolux' },
  // Kent RO
  { id: 'kw-kt-1', keyword: 'Kent service centre kolkata ro water purifier', keywordBn: 'কেন্ট সার্ভিস সেন্টার কলকাতা ওয়াটার পিউরিফায়ার', categoryId: 'fridge-repair', targetUrl: '/brands/kent' },
  { id: 'kw-kt-2', keyword: 'Kent ro continuous beeping sound alarm', keywordBn: 'কেন্ট আরও একটানা বিপ শব্দ অ্যালার্ম', categoryId: 'fridge-repair', targetUrl: '/brands/kent' },
  { id: 'kw-kt-3', keyword: 'Kent ro filter membrane change near me', keywordBn: 'কেন্ট ফিল্টার ও মেমব্রেন পরিবর্তন', categoryId: 'fridge-repair', targetUrl: '/brands/kent' },
  // Aquaguard
  { id: 'kw-aq-1', keyword: 'Aquaguard service centre kolkata eureka forbes', keywordBn: 'অ্যাকোয়াগার্ড সার্ভিস সেন্টার কলকাতা ইউরেকা ফোর্বস', categoryId: 'fridge-repair', targetUrl: '/brands/aquaguard' },
  { id: 'kw-aq-2', keyword: 'Aquaguard red light blinking water purifier', keywordBn: 'অ্যাকোয়াগার্ড লাল বাতি ব্লিংকিং সমস্যা', categoryId: 'fridge-repair', targetUrl: '/brands/aquaguard' },
  // Livpure
  { id: 'kw-lp-1', keyword: 'Livpure service centre kolkata ro repair', keywordBn: 'লিভপিওর সার্ভিস সেন্টার কলকাতা আরও মেরামত', categoryId: 'fridge-repair', targetUrl: '/brands/livpure' },
  { id: 'kw-lp-2', keyword: 'Livpure ro water not filling in tank', keywordBn: 'লিভপিওর আরও ওয়াটার ট্যাঙ্ক ভরছে না', categoryId: 'fridge-repair', targetUrl: '/brands/livpure' },
  // Pureit
  { id: 'kw-pi-1', keyword: 'Pureit service centre kolkata water purifier', keywordBn: 'পিউরিট সার্ভিস সেন্টার কলকাতা ওয়াটার পিউরিফায়ার', categoryId: 'fridge-repair', targetUrl: '/brands/pureit' },
  { id: 'kw-pi-2', keyword: 'Pureit gkk replacement red alert lock', keywordBn: 'পিউরিট জিকেকে কিট পরিবর্তন লাল অ্যালার্ট', categoryId: 'fridge-repair', targetUrl: '/brands/pureit' },
  // Akai
  { id: 'kw-ak-1', keyword: 'Akai service centre near me', keywordBn: 'আকাই সার্ভিস সেন্টার আমার কাছে', categoryId: 'led-tv-repair', targetUrl: '/brands/akai' },
  { id: 'kw-ak-2', keyword: 'Akai service centre in kolkata', keywordBn: 'আকাই সার্ভিস সেন্টার কলকাতা', categoryId: 'led-tv-repair', targetUrl: '/brands/akai' },
  { id: 'kw-ak-3', keyword: 'Akai customer care number', keywordBn: 'আকাই কাস্টমার কেয়ার নম্বর', categoryId: 'led-tv-repair', targetUrl: '/brands/akai' },
  { id: 'kw-ak-4', keyword: 'Akai customer care toll free number', keywordBn: 'আকাই কাস্টমার কেয়ার টোল ফ্রি নম্বর', categoryId: 'washing-machine-repair', targetUrl: '/brands/akai' },
  // Videocon
  { id: 'kw-vc-1', keyword: 'Videocon service centre near me', keywordBn: 'ভিডিওকন সার্ভিস সেন্টার আমার কাছে', categoryId: 'washing-machine-repair', targetUrl: '/brands/videocon' },
  { id: 'kw-vc-2', keyword: 'Videocon service centre barrackpore', keywordBn: 'ভিডিওকন সার্ভিস সেন্টার ব্যারাকপুর', categoryId: 'washing-machine-repair', targetUrl: '/brands/videocon' },
  { id: 'kw-vc-3', keyword: 'Videocon customer care number 24x7', keywordBn: 'ভিডিওকন কাস্টমার কেয়ার নম্বর ২৪x৭', categoryId: 'fridge-repair', targetUrl: '/brands/videocon' },
  { id: 'kw-vc-4', keyword: 'Videocon customer care number washing machine', keywordBn: 'ভিডিওকন ওয়াশিং মেশিন কাস্টমার কেয়ার নম্বর', categoryId: 'washing-machine-repair', targetUrl: '/brands/videocon' },
  { id: 'kw-vc-5', keyword: 'Videocon service centre number', keywordBn: 'ভিডিওকন সার্ভিস সেন্টার নম্বর', categoryId: 'led-tv-repair', targetUrl: '/brands/videocon' },
  // Onida
  { id: 'kw-on-1', keyword: 'Onida customer care number kolkata', keywordBn: 'ওনিডা কাস্টমার কেয়ার নম্বর কলকাতা', categoryId: 'ac-repair', targetUrl: '/brands/onida' },
  { id: 'kw-on-2', keyword: 'Onida service centre near me', keywordBn: 'ওনিডা সার্ভিস সেন্টার আমার কাছে', categoryId: 'ac-repair', targetUrl: '/brands/onida' },
  { id: 'kw-on-3', keyword: 'Onida service centre in kolkata', keywordBn: 'ওনিডা সার্ভিস সেন্টার কলকাতা', categoryId: 'led-tv-repair', targetUrl: '/brands/onida' },
  { id: 'kw-on-4', keyword: 'Onida customer care toll free number', keywordBn: 'ওনিডা কাস্টমার কেয়ার টোল ফ্রি নম্বর', categoryId: 'washing-machine-repair', targetUrl: '/brands/onida' },
  // Midea / Carrier Midea
  { id: 'kw-md-1', keyword: 'Carrier midea customer care number', keywordBn: 'ক্যারিয়ার মিডিয়া কাস্টমার কেয়ার নম্বর', categoryId: 'ac-repair', targetUrl: '/brands/midea' },
  { id: 'kw-md-2', keyword: 'Midea customer care toll free number india', keywordBn: 'মিডিয়া কাস্টমার কেয়ার টোল ফ্রি নম্বর ভারত', categoryId: 'ac-repair', targetUrl: '/brands/midea' },
  { id: 'kw-md-3', keyword: 'Midea customer care whatsapp number', keywordBn: 'মিডিয়া কাস্টমার কেয়ার হোয়াটসঅ্যাপ নম্বর', categoryId: 'ac-repair', targetUrl: '/brands/midea' },
  { id: 'kw-md-4', keyword: 'Midea service centre near me', keywordBn: 'মিডিয়া সার্ভিস সেন্টার আমার কাছে', categoryId: 'washing-machine-repair', targetUrl: '/brands/midea' },
  // Additional Kelvinator & Brand Customer Care & Service Centre Searches
  { id: 'kw-kv-3', keyword: 'Kelvinator service centre near me contact number', keywordBn: 'কেলভিনেটর সার্ভিস সেন্টার কন্টাক্ট নম্বর', categoryId: 'fridge-repair', targetUrl: '/brands/kelvinator' },
  { id: 'kw-kv-4', keyword: 'Kelvinator customer care toll free number india', keywordBn: 'কেলভিনেটর কাস্টমার কেয়ার টোল ফ্রি নম্বর ভারত', categoryId: 'fridge-repair', targetUrl: '/brands/kelvinator' },
  { id: 'kw-hr-4', keyword: 'Haier customer care number kolkata', keywordBn: 'হায়ার কাস্টমার কেয়ার নম্বর কলকাতা', categoryId: 'fridge-repair', targetUrl: '/brands/haier' },
  { id: 'kw-dk-4', keyword: 'Daikin customer care toll free number india 24x7', keywordBn: 'ডাইকিন কাস্টমার কেয়ার টোল ফ্রি নম্বর ২৪x৭', categoryId: 'ac-repair', targetUrl: '/brands/daikin' },
  { id: 'kw-pn-3', keyword: 'Panasonic customer care number kolkata 24x7', keywordBn: 'প্যানাসনিক কাস্টমার কেয়ার নম্বর কলকাতা', categoryId: 'ac-repair', targetUrl: '/brands/panasonic' },
  { id: 'kw-ht-4', keyword: 'Hitachi customer care toll free number india 24x7', keywordBn: 'হিটাচি কাস্টমার কেয়ার টোল ফ্রি নম্বর ২৪x৭', categoryId: 'ac-repair', targetUrl: '/brands/hitachi' },
  { id: 'kw-bs-4', keyword: 'Blue star customer care toll free number kolkata', keywordBn: 'ব্লু স্টার কাস্টমার কেয়ার টোল ফ্রি নম্বর কলকাতা', categoryId: 'ac-repair', targetUrl: '/brands/blue-star' },
  { id: 'kw-cr-5', keyword: 'Carrier customer care toll free number india 24x7', keywordBn: 'ক্যারিয়ার কাস্টমার কেয়ার টোল ফ্রি নম্বর ভারত ২৪x৭', categoryId: 'ac-repair', targetUrl: '/brands/carrier' },
  { id: 'kw-mb-3', keyword: 'Mitsubishi customer care toll free number india', keywordBn: 'মিৎসুবিশি কাস্টমার কেয়ার টোল ফ্রি নম্বর ভারত', categoryId: 'ac-repair', targetUrl: '/brands/mitsubishi' },
  // MarQ by Flipkart
  { id: 'kw-mq-1', keyword: 'Marq service centre near me', keywordBn: 'মার্ক সার্ভিস সেন্টার আমার কাছে', categoryId: 'ac-repair', targetUrl: '/brands/marq' },
  { id: 'kw-mq-2', keyword: 'Flipkart marq customer care number 24x7', keywordBn: 'ফ্লিপকার্ট মার্ক কাস্টমার কেয়ার নম্বর ২৪x৭', categoryId: 'washing-machine-repair', targetUrl: '/brands/marq' },
  { id: 'kw-mq-3', keyword: 'Marq customer care kolkata', keywordBn: 'মার্ক কাস্টমার কেয়ার কলকাতা', categoryId: 'led-tv-repair', targetUrl: '/brands/marq' },
  { id: 'kw-mq-4', keyword: 'Marq customer care whatsapp number', keywordBn: 'মার্ক কাস্টমার কেয়ার হোয়াটসঅ্যাপ নম্বর', categoryId: 'fridge-repair', targetUrl: '/brands/marq' },
  // Croma / Tata Croma
  { id: 'kw-cr-c1', keyword: 'Croma service centre in kolkata', keywordBn: 'ক্রোমা সার্ভিস সেন্টার কলকাতা', categoryId: 'ac-repair', targetUrl: '/brands/croma' },
  { id: 'kw-cr-c2', keyword: 'Tata croma customer care toll free number', keywordBn: 'টাটা ক্রোমা কাস্টমার কেয়ার টোল ফ্রি নম্বর', categoryId: 'ac-repair', targetUrl: '/brands/croma' },
  { id: 'kw-cr-c3', keyword: 'Croma customer care whatsapp number', keywordBn: 'ক্রোমা কাস্টমার কেয়ার হোয়াটসঅ্যাপ নম্বর', categoryId: 'washing-machine-repair', targetUrl: '/brands/croma' },
  { id: 'kw-cr-c4', keyword: 'Croma service centre near me', keywordBn: 'ক্রোমা সার্ভিস সেন্টার আমার কাছে', categoryId: 'led-tv-repair', targetUrl: '/brands/croma' },
  // Additional batch keywords
  { id: 'kw-gd-4', keyword: 'Godrej customer care number 24x7', keywordBn: 'গোদরেজ কাস্টমার কেয়ার নম্বর ২৪x৭', categoryId: 'fridge-repair', targetUrl: '/brands/godrej' },
  { id: 'kw-ly-5', keyword: 'Lloyd customer care toll free number india 24x7', keywordBn: 'লয়েড কাস্টমার কেয়ার টোল ফ্রি নম্বর ভারত ২৪x৭', categoryId: 'ac-repair', targetUrl: '/brands/lloyd' },
  { id: 'kw-ly-6', keyword: 'Lloyd customer care number kolkata', keywordBn: 'লয়েড কাস্টমার কেয়ার নম্বর কলকাতা', categoryId: 'ac-repair', targetUrl: '/brands/lloyd' },
  { id: 'kw-sm-6', keyword: 'Samsung service centre kolkata', keywordBn: 'স্যামসাং সার্ভিস সেন্টার কলকাতা', categoryId: 'washing-machine-repair', targetUrl: '/brands/samsung' },
  { id: 'kw-ifb-5', keyword: 'IFB customer care toll free number india 24x7', keywordBn: 'আইএফবি কাস্টমার কেয়ার টোল ফ্রি নম্বর ভারত ২৪x৭', categoryId: 'washing-machine-repair', targetUrl: '/brands/ifb' },
  { id: 'kw-vt-5', keyword: 'Tata voltas customer care number', keywordBn: 'টাটা ভোল্টাস কাস্টমার কেয়ার নম্বর', categoryId: 'ac-repair', targetUrl: '/brands/voltas' },
  { id: 'kw-vt-6', keyword: 'Voltas customer care whatsapp number', keywordBn: 'ভোল্টাস কাস্টমার কেয়ার হোয়াটসঅ্যাপ নম্বর', categoryId: 'ac-repair', targetUrl: '/brands/voltas' },
  { id: 'kw-wp-4', keyword: 'Whirlpool customer care number 24x7 near me', keywordBn: 'হোয়ার্লপুল কাস্টমার কেয়ার নম্বর ২৪x৭', categoryId: 'fridge-repair', targetUrl: '/brands/whirlpool' },
  { id: 'kw-lg-6', keyword: 'LG customer care toll free number india 24x7', keywordBn: 'এলজি কাস্টমার কেয়ার টোল ফ্রি নম্বর ভারত ২৪x৭', categoryId: 'washing-machine-repair', targetUrl: '/brands/lg' },
  { id: 'kw-lg-7', keyword: 'LG service centre near me phone number', keywordBn: 'এলজি সার্ভিস সেন্টার ফোন নম্বর', categoryId: 'ac-repair', targetUrl: '/brands/lg' }
];

export const initialCategoryFaqs: Record<string, { en: { q: string; a: string }[]; bn: { q: string; a: string }[] }> = {
  'ac-repair': {
    en: [
      {
        q: 'How are AC inspection and repair charges calculated?',
        a: 'We believe in 100% transparent and affordable pricing. You can discuss the issue over phone to get an initial estimate, and our certified technician inspects compressor amp draw, gas pressure, electrical wiring, filter status, and PCB operation at your doorstep. You will receive an exact quote before any repair work begins.'
      },
      {
        q: 'How fast can a technician arrive in Kolkata and West Bengal?',
        a: 'We provide same-day service across Kolkata, Howrah, Salt Lake, New Town, and major district hubs when booked before 5:00 PM.'
      },
      {
        q: 'Do you provide a warranty on AC repair work?',
        a: 'Yes, we provide a 30-day workmanship and service warranty on all completed repairs, plus manufacturer warranties on any genuine spare parts replaced.'
      },
      {
        q: 'What types of air conditioners do you service?',
        a: 'We service Split ACs, Inverter ACs, Window ACs, and 5-Star Cassette units from all major brands including Voltas, Daikin, LG, Samsung, Blue Star, and Carrier.'
      }
    ],
    bn: [
      {
        q: 'এসি সার্ভিস ও মেরামতের খরচ কীভাবে নির্ধারিত হয়?',
        a: 'আমরা সম্পূর্ণ স্বচ্ছ ও সাশ্রয়ী মূল্যে বিশ্বাসী। আপনি ফোনে কথা বলেই প্রাথমিক খরচের ধারণা পেতে পারেন। এরপর সার্টিফাইড টেকনিশিয়ান দরজায় এসে কম্প্রেসার লোড, গ্যাস প্রেশার, ওয়্যারিং ও পিসিবি চেক করে কাজ শুরুর আগেই সঠিক কোটেশন জানিয়ে দেন।'
      },
      {
        q: 'কলকাতা এবং পশ্চিমবঙ্গে কত দ্রুত টেকনিশিয়ান পাওয়া যায়?',
        a: 'বিকেল ৫টার আগে বুকিং করলে আমরা কলকাতা, হাওড়া, সল্টলেক, নিউ টাউন এবং প্রধান শহরগুলিতে একই দিনে পরিষেবা প্রদান করি।'
      },
      {
        q: 'আপনারা কি এসি মেরামতের ওপর কোনো ওয়ারেন্টি দেন?',
        a: 'হ্যাঁ, আমরা প্রতিটি সফল মেরামতে ৩০ দিনের সার্ভিস ওয়ারেন্টি প্রদান করি এবং নতুন যন্ত্রাংশের ওপর প্রস্তুতকারকের ওয়ারেন্টি থাকে।'
      },
      {
        q: 'আপনারা কোন ধরণের এসি মেরামত করেন?',
        a: 'আমরা স্প্লিট এসি, ইনভার্টার এসি, উইন্ডো এসি সহ ভোল্টাস, ডাইকিন, এলজি, স্যামসাং ও ব্লু স্টারের মতো সকল শীর্ষ ব্র্যান্ডের এসি সার্ভিসিং করি।'
      }
    ]
  },
  'fridge-repair': {
    en: [
      {
        q: 'Why is my refrigerator not cooling while the light is on?',
        a: 'This usually indicates a malfunctioning compressor relay, a tripped overload protector, loss of refrigerant gas, or a failed thermostat. Our technician diagnoses the root cause during doorstep inspection and gives an upfront quote before repair.'
      },
      {
        q: 'Is it safe to repair inverter refrigerators at home?',
        a: 'Yes, our technicians are specially certified for inverter and digital inverter refrigerators with modern diagnostic meters for inverter PCB boards and DC variable-speed compressors.'
      },
      {
        q: 'Do you provide genuine manufacturer spare parts?',
        a: 'We only use OEM and original grade compressors, relays, thermostats, and sensors with full billing and guarantee.'
      }
    ],
    bn: [
      {
        q: 'ফ্রিজের লাইট জ্বলছে কিন্তু ঠান্ডা হচ্ছে না কেন?',
        a: 'সাধারণত কম্প্রেসার রিলে খারাপ হওয়া, গ্যাস লিক হওয়া বা থার্মোস্ট্যাট বিকল হওয়ার কারণে এটি ঘটে। আমাদের টেকনিশিয়ান ডোরস্টেপ পরিদর্শনে রোগ নির্ণয় করে কাজ শুরুর আগেই স্পষ্ট কোটেশন দেন।'
      },
      {
        q: 'বাড়িতে ইনভার্টার ফ্রিজ মেরামত করা কি নিরাপদ?',
        a: 'হ্যাঁ, আমাদের টেকনিশিয়ানরা ইনভার্টার ও ডিজিটাল ইনভার্টার ফ্রিজের পিসিবি ও ডিসি কম্প্রেসার মেরামতের জন্য বিশেষভাবে প্রশিক্ষিত।'
      },
      {
        q: 'আপনারা কি আসল যন্ত্রাংশ ব্যবহার করেন?',
        a: 'আমরা কেবলমাত্র জেনুইন এবং ব্র্যান্ড অনুমোদিত রিলে, থার্মোস্ট্যাট ও পার্টস ব্যবহার করি।'
      }
    ]
  },
  'washing-machine-repair': {
    en: [
      {
        q: 'Why is my washing machine shaking violently during spin cycle?',
        a: 'Violent vibration is typically caused by worn shock absorbers, weakened suspension springs, an uneven floor balance, or a damaged drum bearing spider. Our technician inspects the assembly and provides a transparent quote before repair.'
      },
      {
        q: 'Can you fix error codes on digital front load washing machines?',
        a: 'Yes, we diagnose and clear error codes (OE, dE, UE, IE, E20, etc.) for IFB, Bosch, LG, Samsung, Whirlpool, and all modern washers.'
      }
    ],
    bn: [
      {
        q: 'স্পিন করার সময় ওয়াশিং মেশিন অতিরিক্ত কাঁপছে কেন?',
        a: 'শক অ্যাবজরবার দুর্বল হওয়া, সাসপেনশন স্প্রিং ক্ষতিগ্রস্ত হওয়া বা ড্রামের বিয়ারিং লুজ হওয়ার কারণে এমন হয়। টেকনিশিয়ান ডোরস্টেপ পরিদর্শনে এটি পুঙ্খানুপুঙ্খ পরীক্ষা করে কাজ শুরুর আগেই সঠিক কোটেশন দেন।'
      },
      {
        q: 'আপনারা কি ফ্রন্ট লোড মেশিনের ডিজিটাল এরর কোড ঠিক করতে পারেন?',
        a: 'হ্যাঁ, আইএফবি, বশ, এলজি, স্যামসাং সহ সকল আধুনিক ফ্রন্ট ও টপ লোড ওয়াশারের এরর কোড ও পিসিবি আমরা সাফল্যের সাথে মেরামত করি।'
      }
    ]
  },
  'microwave-repair': {
    en: [
      {
        q: 'Is it worth repairing a microwave oven that is not heating?',
        a: 'In most cases, yes! Non-heating is usually caused by a high-voltage diode, fuse, or magnetron failure, which can be repaired at a fraction of the cost of buying a new microwave.'
      },
      {
        q: 'Is high-voltage microwave repair dangerous?',
        a: 'Microwave capacitors hold dangerous voltage even when unplugged. You should never open a microwave yourself. Our technicians follow strict safety discharge protocols.'
      }
    ],
    bn: [
      {
        q: 'মাইক্রোওয়েভ গরম না হলে তা মেরামত করা কি লাভজনক?',
        a: 'হ্যাঁ! সাধারণত একটি ডায়োড, ফিউজ বা ম্যাগনেট্রন পরিবর্তনের মাধ্যমেই নতুন ওভেনের খরচের একাংশেই এটি মেরামত করা সম্ভব।'
      },
      {
        q: 'মাইক্রোওয়েভ মেরামত কি বিপজ্জনক?',
        a: 'মাইক্রোওয়েভের ক্যাপাসিটরে প্লাগ খোলার পরও বিপজ্জনক ভোল্টেজ থাকে। নিজে ওভেন খোলা অনুচিত। আমাদের দক্ষ টেকনিশিয়ানরা নিরাপত্তা মেনে কাজ করেন।'
      }
    ]
  },
  'led-tv-repair': {
    en: [
      {
        q: 'Why does my LED TV have sound but no picture?',
        a: 'This is the classic symptom of a burnt LED backlight strip inside the screen assembly. The TV still receives audio and video signals, but the panel cannot illuminate. We replace the LED backlight set with a warranty.'
      },
      {
        q: 'Can physical panel cracks be repaired?',
        a: 'No, if the glass LCD panel is physically shattered or cracked, the panel cannot be glued or repaired. However, backlight, motherboard, power supply, and T-Con board problems are 100% repairable.'
      }
    ],
    bn: [
      {
        q: 'টিভিতে সাউন্ড আছে কিন্তু ছবি নেই কেন?',
        a: 'এটি ভেতরের ব্যাকলাইট এলইডি কেটে যাওয়ার প্রধান লক্ষণ। সাউন্ড ও ভিডিও সিগন্যাল ঠিক থাকলেও আলো না থাকায় ছবি দেখা যায় না। আমরা ওয়ারেন্টি সহ আসল ব্যাকলাইট সেট লাগাই।'
      },
      {
        q: 'পর্দার কাঁচ ভেঙে গেলে কি ঠিক করা যায়?',
        a: 'না, কাঁচ সরাসরি ভেঙে গেলে তা মেরামত সম্ভব নয়। কিন্তু ব্যাকলাইট, মাদারবোর্ড, পাওয়ার সাপ্লাই ও সার্কিটের সমস্যা সম্পূর্ণ মেরামতযোগ্য।'
      }
    ]
  }
};

export { initialBlogPosts } from './blog-data';
