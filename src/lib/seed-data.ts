import { SiteSettings, Category, Problem, Brand, LocationItem, TrustItem, Review, BlogPost, SearchKeywordItem } from './types';

export const initialSiteSettings: SiteSettings = {
  businessName: 'AC Repair Service',
  businessNameBn: 'এসি মেরামত পরিষেবা',
  phone: '+91 6291674186',
  whatsapp: '+91 6291674186',
  email: 'service@acrepairservice.com',
  address: 'Salt Lake Sector V, Kolkata, West Bengal - 700091',
  addressBn: 'সল্টলেক সেক্টর ৫, কলকাতা, পশ্চিমবঙ্গ - ৭০০০৯১',
  serviceArea: 'West Bengal, India (Kolkata, Howrah, Durgapur, Siliguri, Asansol & surrounding regions)',
  serviceAreaBn: 'পশ্চিমবঙ্গ, ভারত (কলকাতা, হাওড়া, দুর্গাপুর, শিলিগুড়ি, আসানসোল ও পার্শ্ববর্তী অঞ্চল)',
  workingHours: '8:00 AM - 9:00 PM (All 7 Days)',
  workingHoursBn: 'সকাল ৮:০০ - রাত ৯:০০ (সপ্তাহের ৭ দিনই)',
  visitFee: 299,
  currency: '₹',
  pricingDisclaimer: '₹299 is ONLY the visit & diagnosis fee. The actual repair cost is confirmed after thorough inspection by the certified technician and strictly upon your approval before any repair work begins.',
  pricingDisclaimerBn: '₹২৯৯ শুধুমাত্র ভিজিট এবং রোগ নির্ণয় ফি। কোনো মেরামতের কাজ শুরু করার আগে প্রত্যয়িত টেকনিশিয়ানের পুঙ্খানুপুঙ্খ পরিদর্শনের পরে এবং সম্পূর্ণ আপনার অনুমোদনের পরেই প্রকৃত মেরামতের খরচ চূড়ান্ত করা হয়।',
  emergencyNotice: 'Same-day technician visit available across Kolkata and major West Bengal hubs.',
  emergencyNoticeBn: 'কলকাতা এবং পশ্চিমবঙ্গের প্রধান প্রধান শহরে একই দিনে টেকনিশিয়ান ভিজিটের সুবিধা উপলব্ধ।'
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
    metaTitle: 'Professional AC Repair & Servicing in West Bengal | ₹299 Visit',
    metaTitleBn: 'পশ্চিমবঙ্গে বিশ্বস্ত এসি মেরামত ও সার্ভিসিং | ₹২৯৯ ভিজিট ফি',
    metaDesc: 'Expert doorstep AC repair service in Kolkata & West Bengal. Split & Window AC cooling issues, jet cleaning, gas charging. Transparent ₹299 inspection fee.',
    metaDescBn: 'কলকাতা ও পশ্চিমবঙ্গে বিশ্বস্ত এসি মেরামত ও সার্ভিসিং। স্প্লিট ও উইন্ডো এসি কুলিং সমস্যা, জেট ওয়াশ ও গ্যাস রিফিল। স্বচ্ছ ₹২৯৯ পরিদর্শন ফি।'
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
    metaTitle: 'Doorstep Refrigerator & Fridge Repair in West Bengal | ₹299 Diagnosis',
    metaTitleBn: 'পশ্চিমবঙ্গে নির্ভরযোগ্য ফ্রিজ মেরামত সার্ভিস | ₹২৯৯ পরিদর্শন ফি',
    metaDesc: 'Reliable fridge repair service in West Bengal. Fix cooling failure, gas leak, defrost issue, compressor noise. Same-day ₹299 inspection visit.',
    metaDescBn: 'পশ্চিমবঙ্গে নির্ভরযোগ্য ডোরস্টেপ ফ্রিজ মেরামত। কুলিং বন্ধ, গ্যাস লিকেজ, কম্প্রেসার ও ডিফ্রস্ট সমস্যার দ্রুত সমাধান। মাত্র ₹২৯৯ ভিজিট চার্জ।'
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
    metaTitle: 'Washing Machine Repair Service in West Bengal | ₹299 Inspection',
    metaTitleBn: 'পশ্চিমবঙ্গে বিশ্বস্ত ওয়াশিং মেশিন মেরামত | ₹২৯৯ ভিজিট ফি',
    metaDesc: 'Fast doorstep washing machine repair in Kolkata & West Bengal. Front load & top load motor, spin, drain, PCB fixes. Verified technicians.',
    metaDescBn: 'কলকাতা ও পশ্চিমবঙ্গে দ্রুত ওয়াশিং মেশিন মেরামত পরিষেবা। ফ্রন্ট লোড ও টপ লোড ড্রেন, মোটর ও ইলেকট্রনিক বোর্ড মেরামত। স্বচ্ছ ₹২৯৯ ফি।'
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
    metaTitle: 'Microwave Oven Repair at Doorstep in West Bengal | ₹299 Visit',
    metaTitleBn: 'পশ্চিমবঙ্গে মাইক্রোওয়েভ ওভেন মেরামত পরিষেবা | ₹২৯৯ ভিজিট ফি',
    metaDesc: 'Doorstep microwave oven repair in West Bengal. Magnetron heating issues, spark repair, touchpad fixing for all leading brands. Only ₹299 inspection.',
    metaDescBn: 'পশ্চিমবঙ্গে ডোরস্টেপ মাইক্রোওয়েভ ওভেন মেরামত। গরম না হওয়া, স্পার্কিং, টাচপ্যাড ত্রুটি নিরসন। ₹২৯৯ স্বচ্ছ ভিজিট ও রোগ নির্ণয় চার্জ।'
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
    metaTitle: 'LED & Smart TV Repair Service in West Bengal | ₹299 Inspection',
    metaTitleBn: 'পশ্চিমবঙ্গে এলইডি ও স্মার্ট টিভি মেরামত | ₹২৯৯ ভিজিট ফি',
    metaDesc: 'Professional LED & Smart TV repair in West Bengal. Fix black screen, backlight, sound issues, power supply for Samsung, Sony, LG & more.',
    metaDescBn: 'পশ্চিমবঙ্গে পেশাদার এলইডি ও স্মার্ট টিভি মেরামত পরিষেবা। ব্যাকলাইট, ডিসপ্লে, সাউন্ড ও মাদারবোর্ড সমস্যার সমাধান। মাত্র ₹২৯৯ পরিদর্শন ফি।'
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
    diagnosticFeeNote: 'Includes full multi-point diagnostic check for ₹299. Any spare parts or gas refill quoted transparently.',
    diagnosticFeeNoteBn: '₹২৯৯ ফিতে সম্পূর্ণ মাল্টি-পয়েন্ট ডায়াগনস্টিক অন্তর্ভুক্ত। খুচরা যন্ত্রাংশ বা গ্যাসের দাম আলাদা ও স্বচ্ছভাবে জানানো হয়।',
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
    diagnosticFeeNote: 'Diagnosis covered under ₹299 visit fee. Complete unblocking and flushing cost confirmed beforehand.',
    diagnosticFeeNoteBn: '₹২৯৯ পরিদর্শন ফির আওতায় পরীক্ষা সম্পন্ন হয়। পুরো পাইপ ক্লিনিংয়ের খরচ পূর্বেই জানিয়ে অনুমোদন নেওয়া হয়।',
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
    diagnosticFeeNote: 'Diagnosis is ₹299. Gas charging rates vary strictly by refrigerant type (R32/R410A) and approved in advance.',
    diagnosticFeeNoteBn: 'ডায়াগনোসিস মাত্র ₹২৯৯। গ্যাসের চার্জ রেফ্রিজারেন্টের ধরন অনুযায়ী কাজের আগে জানিয়ে দেওয়া হয়।',
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
    diagnosticFeeNote: 'Full electrical and PCB inspection under ₹299 fee.',
    diagnosticFeeNoteBn: 'সম্পূর্ণ ইলেকট্রিক্যাল ও পিসিবি পরিদর্শন মাত্র ₹২৯৯ ফি-তে অন্তর্ভুক্ত।',
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
    diagnosticFeeNote: 'Diagnosis ₹299. Deep jet cleaning packages quoted transparently.',
    diagnosticFeeNoteBn: 'পরিদর্শন ₹২৯৯। ডিপ জেট ক্লিনিং প্যাকেজের রেট স্বচ্ছভাবে জানানো হয়।',
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
    diagnosticFeeNote: 'Detailed diagnosis covered under ₹299 inspection visit.',
    diagnosticFeeNoteBn: '₹২৯৯ পরিদর্শন চার্জে পুঙ্খানুপুঙ্খ টেস্ট সম্পন্ন হয়।',
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
    diagnosticFeeNote: 'Diagnosis visit ₹299. Component replacement charges shared prior to work.',
    diagnosticFeeNoteBn: 'ভিজিট ফি ₹২৯৯। কোনো যন্ত্রাংশ পরিবর্তনের দরকার হলে আগেই মূল্য জানানো হয়।',
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
    diagnosticFeeNote: 'Full drain and gasket check under ₹299 inspection fee.',
    diagnosticFeeNoteBn: 'সম্পূর্ণ ড্রেন ও গ্যাসকেট পরীক্ষা ₹২৯৯ ফি-তে অন্তর্ভুক্ত।',
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
    diagnosticFeeNote: 'Diagnosis visit ₹299. Original drive belt or switch replacement quoted on spot.',
    diagnosticFeeNoteBn: 'পরিদর্শন ফি মাত্র ₹২৯৯। নতুন বেল্ট বা সুইচের খরচ টেকনিশিয়ান স্পটেই জানিয়ে দেন।',
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
    diagnosticFeeNote: 'Comprehensive drain assembly diagnosis for ₹299.',
    diagnosticFeeNoteBn: 'সম্পূর্ণ ড্রেন সিস্টেম পরিদর্শন ₹২৯৯ ফি-তে অন্তর্ভুক্ত।',
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
    diagnosticFeeNote: 'Complete mechanical diagnosis covered under ₹299 visit fee.',
    diagnosticFeeNoteBn: 'সম্পূর্ণ মেকানিক্যাল ডায়াগনস্টিক ₹২৯৯ ফি-তে অন্তর্ভুক্ত।',
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
    diagnosticFeeNote: 'High-voltage safety inspection and diagnosis under ₹299 visit fee.',
    diagnosticFeeNoteBn: 'হাই-ভোল্টেজ নিরাপত্তা পরীক্ষা ও ডায়াগনোসিস মাত্র ₹২৯৯ ফি।',
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
    diagnosticFeeNote: 'Diagnosis visit ₹299. Waveguide cover replacement charged transparently.',
    diagnosticFeeNoteBn: 'পরিদর্শন ফি ₹২৯৯। নতুন মাইকা কভারের খরচ সামান্য এবং কাজের আগে জানানো হয়।',
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
    diagnosticFeeNote: 'Touchpad and motherboard testing under ₹299 inspection fee.',
    diagnosticFeeNoteBn: 'টাচপ্যাড ও সার্কিট বোর্ড টেস্টিং ₹২৯৯ ফি-তে অন্তর্ভুক্ত।',
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
    diagnosticFeeNote: 'Panel inspection and bench diagnostic covered under ₹299 fee.',
    diagnosticFeeNoteBn: 'প্যানেল ও ব্যাকলাইট পরিদর্শন ₹২৯৯ ফি-তে অন্তর্ভুক্ত।',
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
    diagnosticFeeNote: 'Detailed screen diagnostics under ₹299 visit fee.',
    diagnosticFeeNoteBn: 'সম্পূর্ণ স্ক্রিন রোগ নির্ণয় ₹২৯৯ ফি-তে অন্তর্ভুক্ত।',
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
    diagnosticFeeNote: 'Power and motherboard diagnostic check under ₹299 visit fee.',
    diagnosticFeeNoteBn: 'পাওয়ার বোর্ড ও মাদারবোর্ড পরিদর্শন ₹২৯৯ ফি-তে অন্তর্ভুক্ত।',
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
  {"id":"pureit","name":"Pureit","logoUrl":"/images/brands/pureit.svg","categoryIds":["fridge-repair"],"sortOrder":28,"isActive":true,"isPopular":true}
];

export const initialLocations: LocationItem[] = [
  { id: 'loc-wb', name: 'West Bengal (All Hubs)', nameBn: 'পশ্চিমবঙ্গ (সকল অঞ্চল)', hashSlug: 'west-bengal', state: 'West Bengal', stateBn: 'পশ্চিমবঙ্গ', sortOrder: 1, isActive: true },
  { id: 'loc-kol', name: 'Kolkata', nameBn: 'কলকাতা', hashSlug: 'kolkata', state: 'West Bengal', stateBn: 'পশ্চিমবঙ্গ', sortOrder: 2, isActive: true },
  { id: 'loc-hwh', name: 'Howrah', nameBn: 'হাওড়া', hashSlug: 'howrah', state: 'West Bengal', stateBn: 'পশ্চিমবঙ্গ', sortOrder: 3, isActive: true },
  { id: 'loc-dgp', name: 'Durgapur', nameBn: 'দুর্গাপুর', hashSlug: 'durgapur', state: 'West Bengal', stateBn: 'পশ্চিমবঙ্গ', sortOrder: 4, isActive: true },
  { id: 'loc-slg', name: 'Siliguri', nameBn: 'শিলিগুড়ি', hashSlug: 'siliguri', state: 'West Bengal', stateBn: 'পশ্চিমবঙ্গ', sortOrder: 5, isActive: true },
  { id: 'loc-asl', name: 'Asansol', nameBn: 'আসানসোল', hashSlug: 'asansol', state: 'West Bengal', stateBn: 'পশ্চিমবঙ্গ', sortOrder: 6, isActive: true },
  { id: 'loc-bdn', name: 'Bardhaman', nameBn: 'বর্ধমান', hashSlug: 'bardhaman', state: 'West Bengal', stateBn: 'পশ্চিমবঙ্গ', sortOrder: 7, isActive: true },
  { id: 'loc-kly', name: 'Kalyani', nameBn: 'কল্যাণী', hashSlug: 'kalyani', state: 'West Bengal', stateBn: 'পশ্চিমবঙ্গ', sortOrder: 8, isActive: true },
  { id: 'loc-bst', name: 'Barasat', nameBn: 'বারাসাত', hashSlug: 'barasat', state: 'West Bengal', stateBn: 'পশ্চিমবঙ্গ', sortOrder: 9, isActive: true },
  { id: 'loc-kgp', name: 'Kharagpur', nameBn: 'খড়গপুর', hashSlug: 'kharagpur', state: 'West Bengal', stateBn: 'পশ্চিমবঙ্গ', sortOrder: 10, isActive: true }
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
    subtitle: 'Flat ₹299 inspection fee. Exact repair quotation provided upfront before any work commences.',
    subtitleBn: 'মাত্র ₹২৯৯ ভিজিট ও ডায়াগনোসিস ফি। কোনো কাজ শুরুর আগেই সম্পূর্ণ কোটেশন প্রদান।',
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

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    customerName: 'Anirban Mukherjee',
    location: 'Salt Lake, Kolkata',
    serviceCategory: 'AC Repair',
    rating: 5,
    comment: 'Technician reached within 2 hours of booking. Fixed the gas leak on my Daikin inverter AC and explained the ₹299 diagnosis breakdown clearly. Highly recommended!',
    commentBn: 'বুকিংয়ের ২ ঘণ্টার মধ্যেই টেকনিশিয়ান উপস্থিত হন। ডাইকিন এসির গ্যাস লিকেজ খুব দক্ষতার সাথে মেরামত করেন এবং ₹২৯৯ ফির নিয়ম সুন্দরভাবে জানান। দারুণ সার্ভিস!',
    isVerified: true,
    isDemo: true,
    date: '2026-08-14',
    isActive: true,
    sortOrder: 1
  },
  {
    id: 'rev-2',
    customerName: 'Sourav Roy',
    location: 'Shibpur, Howrah',
    serviceCategory: 'Fridge Repair',
    rating: 5,
    comment: 'My Samsung double-door refrigerator was not cooling and food was spoiling. The technician tested the compressor relay, replaced a faulty capacitor, and it is working like brand new.',
    commentBn: 'আমার স্যামসাং ডাবল-ডোর ফ্রিজে ঠান্ডা হচ্ছিল না। টেকনিশিয়ান নিখুঁতভাবে কম্প্রেসার রিলে ও ক্যাপাসিটর ঠিক করে দেন। এখন একদম নতুনের মতো কাজ করছে।',
    isVerified: true,
    isDemo: true,
    date: '2026-08-22',
    isActive: true,
    sortOrder: 2
  },
  {
    id: 'rev-3',
    customerName: 'Priyanka Banerjee',
    location: 'City Centre, Durgapur',
    serviceCategory: 'Washing Machine Repair',
    rating: 5,
    comment: 'LG front load washer was giving an OE error code and refusing to drain. Booking through the website was smooth, technician cleared the coin trap cleanly without mess.',
    commentBn: 'এলজি ফ্রন্ট লোড ওয়াশিং মেশিনে OE এরর কোড আসছিল এবং জল বেরোচ্ছিল না। ওয়েবসাইট থেকে সহজে বুক করি, টেকনিশিয়ান কোনো নোংরা না করে পরিষ্কার করে সমাধান করে দেন।',
    isVerified: true,
    isDemo: true,
    date: '2026-09-02',
    isActive: true,
    sortOrder: 3
  },
  {
    id: 'rev-4',
    customerName: 'Debabrata Sen',
    location: 'Pradhan Nagar, Siliguri',
    serviceCategory: 'LED TV Repair',
    rating: 5,
    comment: 'Sony Bravia had sound but black screen. They diagnosed the backlight LED issue honestly and replaced the full strip with a genuine part. Professional behavior.',
    commentBn: 'সোনি ব্রাভিয়া টিভিতে সাউন্ড ছিল কিন্তু ছবি আসছিল না। ওনারা সততার সাথে ব্যাকলাইটের সমস্যা শনাক্ত করেন এবং আসল পার্টস দিয়ে ঠিক করেন। অমায়িক ব্যবহার।',
    isVerified: true,
    isDemo: true,
    date: '2026-09-10',
    isActive: true,
    sortOrder: 4
  }
];

export const initialSearchKeywords: SearchKeywordItem[] = [
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
  { id: 'kw-ht-3', keyword: 'Hitachi inverter fridge repair', keywordBn: 'হিটাচি ইনভার্টার ফ্রিজ মেরামত', categoryId: 'fridge-repair', targetUrl: '/brands/hitachi' }
];

export const initialCategoryFaqs: Record<string, { en: { q: string; a: string }[]; bn: { q: string; a: string }[] }> = {
  'ac-repair': {
    en: [
      {
        q: 'What does the ₹299 AC visit fee include?',
        a: 'The ₹299 fee covers a complete physical diagnosis at your doorstep by our certified technician. The technician checks compressor amp draw, gas pressure, electrical wiring, filter status, and PCB operation. You will receive an exact quote before any repair work or parts replacement begins.'
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
        q: '₹২৯৯ এসি ভিজিট ফির মধ্যে কী কী অন্তর্ভুক্ত?',
        a: '₹২৯৯ ফিতে আপনার দরজায় এসে সার্টিফাইড টেকনিশিয়ান দ্বারা সম্পূর্ণ রোগ নির্ণয় করা হয়। এতে কম্প্রেসার লোড, গ্যাস প্রেশার, ওয়্যারিং, ফিল্টার এবং পিসিবি চেক অন্তর্ভুক্ত। কোনো যন্ত্রাংশ প্রতিস্থাপন বা মেরামতের আগে আপনাকে সঠিক কোটেশন জানানো হয়।'
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
        a: 'This usually indicates a malfunctioning compressor relay, a tripped overload protector, loss of refrigerant gas, or a failed thermostat. Our technician diagnoses the exact root cause during the ₹299 inspection visit.'
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
        a: 'সাধারণত কম্প্রেসার রিলে খারাপ হওয়া, গ্যাস লিক হওয়া বা থার্মোস্ট্যাট বিকল হওয়ার কারণে এটি ঘটে। আমাদের টেকনিশিয়ান ₹২৯৯ ভিজিটেই সঠিক কারণ চিহ্নিত করেন।'
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
        a: 'Violent vibration is typically caused by worn shock absorbers, weakened suspension springs, an uneven floor balance, or a damaged drum bearing spider. Our technician inspects the suspension during the ₹299 visit.'
      },
      {
        q: 'Can you fix error codes on digital front load washing machines?',
        a: 'Yes, we diagnose and clear error codes (OE, dE, UE, IE, E20, etc.) for IFB, Bosch, LG, Samsung, Whirlpool, and all modern washers.'
      }
    ],
    bn: [
      {
        q: 'স্পিন করার সময় ওয়াশিং মেশিন অতিরিক্ত কাঁপছে কেন?',
        a: 'শক অ্যাবজরবার দুর্বল হওয়া, সাসপেনশন স্প্রিং ক্ষতিগ্রস্ত হওয়া বা ড্রামের বিয়ারিং লুজ হওয়ার কারণে এমন হয়। ₹২৯৯ পরিদর্শনে টেকনিশিয়ান এটি পুঙ্খানুপুঙ্খ পরীক্ষা করেন।'
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

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'ac-not-cooling-top-reasons-solutions-kolkata',
    title: 'AC Not Cooling? Top 5 Reasons & How to Fix Them Fast in West Bengal',
    titleBn: 'এসি ঠান্ডা হচ্ছে না? শীর্ষ ৫টি কারণ ও দ্রুত সমাধানের উপায়',
    excerpt: 'Facing hot air blowing from your split AC in sultry Kolkata heat? Discover the most common culprits like gas leakage, clogged coils, and dirty filters before calling a technician.',
    excerptBn: 'পশ্চিমবঙ্গের ভ্যাপসা গরমে এসি থেকে ঠান্ডা বাতাস বের হচ্ছে না? গ্যাস লিকেজ, নোংরা কয়েল এবং ফিল্টারের মতো সাধারণ কারণগুলি জানুন।',
    content: `## Why Is Your AC Blowing Warm Air?

During the scorching summer and humid monsoon months in Kolkata and West Bengal, an air conditioner running without cooling is a true household emergency. When the compressor hums or the indoor blower spins, but the room temperature stubbornly remains high, one of several common failures is usually responsible.

### 1. Clogged and Dust-Choked Air Filters
In West Bengal's urban areas with high ambient particulate matter, indoor filters can choke with fine dust within 30 to 45 days of daily operation. When airflow across the indoor evaporator coil is severely restricted:
- The coil temperature plummets and forms ice sheets.
- Air circulation drops drastically.
- The compressor overheats and cycles off prematurely.

**Solution:** Remove and gently wash the plastic mesh filters under running lukewarm water every 2 to 3 weeks.

### 2. Refrigerant Gas Leakage
Refrigerant (Freon/R32/R410A) does not get "consumed" like petrol; an AC only needs a gas recharge if there is a physical pinhole leak in the copper condenser or evaporator coils. Exposure to moisture and industrial air pollutants in Kolkata and Howrah can corrode copper joints over time.

**Symptoms of a Gas Leak:**
- Hissing sounds around indoor or outdoor valves.
- Ice or frost frosting up the thin liquid copper pipe.
- Compressor running continuously without cooling.

**Solution:** Professional nitrogen pressure testing, joint brazing, vacuuming, and precision gas recharging.

### 3. Dirty Condenser Coils on the Outdoor Unit
The outdoor unit dispels all the heat extracted from your bedroom. When the aluminum fins are choked with bird feathers, dust, and grime, heat cannot escape. The compressor thermal overload switch then trips every few minutes to save itself from burning out.

**Solution:** Professional high-pressure jet pump chemical wash by a certified technician.

### 4. Defective Run Capacitor
The run capacitor provides the continuous torque needed by the compressor motor. Voltage fluctuations common during storms can weaken or bulge the capacitor, leaving the outdoor fan spinning while the heavy compressor remains silent.

---

### Transparent Diagnosis at ₹299
Never pay arbitrary diagnostic charges. AC Repair Service offers complete doorstep multi-point inspection across West Bengal for a flat ₹299 visit fee. Any repair or gas recharge is quoted upfront and executed only upon your confirmation.`,
    contentBn: `## আপনার এসি কেন পর্যাপ্ত ঠান্ডা বাতাস দিচ্ছে না?

পশ্চিমবঙ্গের তীব্র গরম এবং বর্ষার আর্দ্র আবহাওয়ায় এসি না চলা একটি অত্যন্ত কষ্টকর অভিজ্ঞতা। ইনডোর ফ্যান চলার পরও ঘরের তাপমাত্রা না কমার পেছনে কিছু সুনির্দিষ্ট প্রযুক্তিগত কারণ থাকে।

### ১. এয়ার ফিল্টারে ধুলোবালি জমা
শহরাঞ্চলের বাতাসে থাকা ধুলোবালির কারণে মাত্র ৩-৪ সপ্তাহের মধ্যেই এসির ভেতরের ফিল্টার আটকে যায়। বাতাস চলাচল বাধাগ্রস্ত হলে ভেতরের কয়েলে বরফ জমে যায় এবং ঠান্ডা বাতাস বের হতে পারে না।
**সমাধান:** প্রতি দুই থেকে তিন সপ্তাহ অন্তর ফিল্টারটি খুলে সাধারণ জলে ধুয়ে পরিষ্কার করুন।

### ২. রেফ্রিজারেন্ট গ্যাস লিকেজ
মনে রাখবেন, গাড়ির তেলের মতো এসির গ্যাস নিজে থেকে খরচ হয় না। গ্যাস কমে যাওয়ার অর্থ পাইপে কোথাও সূক্ষ্ম ছিদ্র বা লিকেজ তৈরি হয়েছে।
**লক্ষণ:** তামার পাইপে বরফ জমা, ফিসফিস শব্দ এবং কম্প্রেসার একটানা চলার পরও ঘর ঠান্ডা না হওয়া।
**সমাধান:** অভিজ্ঞ টেকনিশিয়ানের মাধ্যমে নাইট্রোজেন প্রেশার টেস্ট করে লিকেজ মেরামত এবং খাঁটি গ্যাস রিফিল করা।

### ৩. আউটডোর ইউনিটের কয়েল নোংরা হওয়া
ঘরের ভেতরের তাপ বাইরে বের করে দেওয়ার কাজ করে আউটডোর ইউনিট। বাইরের ইউনিটের জালিতে অতিরিক্ত ধুলো ও ঝুল জমলে কম্প্রেসার অতিরিক্ত গরম হয়ে ট্রিপ করে বন্ধ হয়ে যায়।
**সমাধান:** জেট পাম্পের সাহায্যে গভীর ওয়াটার ওয়াশ করানো।

---

### মাত্র ₹২৯৯-এ বিশ্বস্ত ডোরস্টেপ ডায়াগনোসিস
আমাদের দক্ষ টেকনিশিয়ান আপনার বাড়িতে এসে সম্পূর্ণ এসি পরীক্ষা করেন মাত্র ₹২৯৯ ভিজিট ফিতে। মেরামতের খরচ আগেই জানানো হয় এবং আপনার অনুমোদনের পরেই কাজ সম্পন্ন হয়।`,
    focusKeyword: 'AC not cooling Kolkata West Bengal',
    secondaryKeywords: ['AC gas refill price Kolkata', 'split AC cooling repair', 'AC servicing West Bengal', 'air conditioner repair Salt Lake'],
    metaTitle: 'AC Not Cooling? 5 Common Causes & Solutions in Kolkata | AC Repair Service',
    metaDesc: 'Split AC blowing warm air in West Bengal heat? Learn the top 5 causes from gas leaks to dirty coils and get certified doorstep diagnosis at just ₹299.',
    ogTitle: 'Why Your AC Is Not Cooling - Top 5 Causes Explained',
    ogDesc: 'Expert guide to diagnosing and fixing AC cooling problems in West Bengal.',
    faqs: [
      {
        question: 'Does an AC consume gas over time naturally?',
        questionBn: 'সময়ের সাথে সাথে কি এসির গ্যাস নিজে থেকেই কমে যায়?',
        answer: 'No, an air conditioner is a sealed closed-loop refrigeration system. Gas only decreases if there is a microscopic leak in the coils, flare nuts, or connecting valves.',
        answerBn: 'না, এসি একটি সম্পূর্ণ সিল করা সিস্টেম। পাইপ, কয়েল বা ভালভে সূক্ষ্ম ফুটো না থাকলে গ্যাস কখনো কমে না।'
      },
      {
        question: 'How often should an AC undergo deep jet pump cleaning?',
        questionBn: 'কতদিন পর পর এসি ডিপ জেট ক্লিনিং করানো উচিত?',
        answer: 'In dusty urban environments across West Bengal, a deep foam jet wash is strongly recommended once before peak summer and once halfway through the monsoon season.',
        answerBn: 'পশ্চিমবঙ্গের আবহাওয়ায় গরমের শুরুতে একবার এবং বর্ষার মাঝামাঝি সময়ে একবার ডিপ জেট ওয়াশ করানো সবচেয়ে ভালো।'
      }
    ],
    status: 'published',
    author: 'Chief HVAC Technician',
    publishedAt: '2026-08-10',
    createdAt: '2026-08-10',
    updatedAt: '2026-08-10'
  },
  {
    id: 'post-2',
    slug: 'refrigerator-maintenance-tips-prevent-food-spoilage',
    title: 'How to Prevent Refrigerator Breakdown During Hot Summers in West Bengal',
    titleBn: 'তীব্র গরমে ফ্রিজ ভালো রাখার ও খাবার নষ্ট হওয়া ঠেকানোর উপায়',
    excerpt: 'Simple maintenance habits to keep your refrigerator compressor healthy, save electricity bills, and prevent costly breakdowns in high ambient humidity.',
    excerptBn: 'পশ্চিমবঙ্গের আর্দ্র ও গরম আবহাওয়ায় ফ্রিজের কম্প্রেসার সুরক্ষিত রাখার এবং বিদ্যুৎ বিল কমানোর সহজ কিছু নির্দেশিকা।',
    content: `## Keeping Your Refrigerator Efficient in High Humidity

During peak West Bengal summers, ambient temperatures frequently surpass 40°C with high relative humidity. Under these demanding conditions, home refrigerators work twice as hard to maintain food safety temperatures between 2°C and 4°C.

### Key Maintenance Habits

1. **Maintain Proper Clearance from Walls:**
   Never push your refrigerator flush against the kitchen wall. Ensure at least 3 to 4 inches of clear space behind and along the sides so heat radiating from the condenser can disperse naturally.

2. **Inspect the Rubber Door Gasket:**
   Over time, food crumbs and moisture allow mildew to build up on the magnetic door gasket. A loose seal allows humid room air to pour into the cabinet, causing heavy frost buildup and forcing the compressor to run nonstop. Test your seal by closing the door on a currency note—if it slides out easily without resistance, your gasket needs cleaning or replacement.

3. **Avoid Storing Steaming Hot Vessels:**
   Placing freshly cooked boiling pots directly into the fridge introduces massive thermal shock and humidity, spiking interior temperature and spoiling surrounding dairy items.

4. **Defrost Manual Units Promptly:**
   In single-door refrigerators, never allow the frost layer inside the freezer compartment to exceed 6mm. Thick ice acts as an insulator, blocking cooling from circulating downward.

---

### When to Seek Professional Diagnosis
If you notice clicking noises from the back, water pooling under the crisper, or the freezer failing to solidify ice cubes, book a certified inspection immediately. Our verified technicians diagnose inverter and conventional refrigerators across West Bengal for a transparent ₹299 visit fee.`,
    contentBn: `## তীব্র গরমে ফ্রিজের কার্যক্ষমতা ধরে রাখার নিয়ম

পশ্চিমবঙ্গের গ্রীষ্মকালে তাপমাত্রা প্রায়শই ৪০ ডিগ্রি ছাড়িয়ে যায়। এই সময় ফ্রিজের ভেতরের তাপমাত্রা ২ থেকে ৪ ডিগ্রিতে ধরে রাখতে কম্প্রেসারকে দ্বিগুণ কাজ করতে হয়।

### গুরুত্বপূর্ণ যত্ন ও সতর্কতা

১. **দেয়াল থেকে সঠিক দূরত্ব বজায় রাখুন:**
ফ্রিজকে কখনো রান্নাঘরের দেয়ালের সাথে একদম লাগিয়ে রাখবেন না। পেছনের এবং পাশের অংশ থেকে কমপক্ষে ৩-৪ ইঞ্চি ফাঁকা রাখুন যাতে তাপ সহজে নির্গত হতে পারে।

২. **দরজার রবার গ্যাসকেট পরীক্ষা করুন:**
দরজার রবার সিল লুজ হয়ে গেলে বাইরের গরম বাতাস ভেতরে প্রবেশ করে এবং ভেতরের জিনিসপত্র নষ্ট হয়। রবার সিল সর্বদা পরিষ্কার ও টানটান রাখুন।

৩. **গরম খাবার সরাসরি রাখবেন না:**
রান্নার পর পরই ফুটন্ত খাবার ফ্রিজে রাখলে ভেতরের তাপমাত্রা বেড়ে যায় এবং কম্প্রেসারের ওপর অতিরিক্ত চাপ পড়ে।

---

### পেশাদার মেরামতের সুবিধা
যদি ফ্রিজের পেছন থেকে অস্বাভাবিক শব্দ পান বা মেঝেতে জল জমতে দেখেন, তবে আর দেরি করবেন না। আমাদের প্রত্যয়িত টেকনিশিয়ান মাত্র ₹২৯৯ ডায়াগনস্টিক ফিতে আপনার বাড়িতে পৌঁছে সঠিক সমাধান করে দেবেন।`,
    focusKeyword: 'refrigerator maintenance tips West Bengal',
    secondaryKeywords: ['fridge not cooling solutions', 'fridge repair Kolkata', 'refrigerator compressor protection'],
    metaTitle: 'Refrigerator Care Tips in Summer | AC Repair Service West Bengal',
    metaDesc: 'Protect your fridge from breaking down in hot West Bengal weather. Practical tips to save electricity, maintain compressor life, and prevent food spoilage.',
    ogTitle: 'How to Prevent Refrigerator Breakdowns in Summer',
    ogDesc: 'Expert tips on keeping your fridge in peak condition throughout humid summer months.',
    faqs: [
      {
        question: 'What is the ideal temperature setting for a refrigerator in summer?',
        questionBn: 'গ্রীষ্মকালে ফ্রিজের সঠিক তাপমাত্রা কত হওয়া উচিত?',
        answer: 'Set the fresh food compartment to 3°C to 4°C and the freezer compartment to -18°C for optimal food preservation and energy efficiency.',
        answerBn: 'খাবার ভালো রাখতে সাধারণ অংশের তাপমাত্রা ৩-৪ ডিগ্রি এবং ডিপ অংশের তাপমাত্রা মাইনাস ১৮ ডিগ্রিতে রাখা আদর্শ।'
      }
    ],
    status: 'published',
    author: 'Senior Appliance Specialist',
    publishedAt: '2026-08-18',
    createdAt: '2026-08-18',
    updatedAt: '2026-08-18'
  }
];
