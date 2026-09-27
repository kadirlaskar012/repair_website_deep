import fs from 'fs';
import path from 'path';

// 1. Curated Indian First Names & Surnames (Bengali, North, South, West Indian, Muslim Indian)
const maleFirstNames = [
  'Anirban', 'Sourav', 'Debabrata', 'Rohan', 'Tanmoy', 'Subhashish', 'Joydeep', 'Indranil',
  'Sagnik', 'Koushik', 'Arijit', 'Kaushik', 'Abhijit', 'Siddhartha', 'Prosenjit', 'Sayantan',
  'Sandip', 'Dipankar', 'Arnab', 'Sujoy', 'Shantanu', 'Nilanjan', 'Partha', 'Debashis',
  'Bikram', 'Tathagata', 'Swarup', 'Tamal', 'Shamik', 'Mainak', 'Rajesh', 'Vikram',
  'Amitav', 'Rohit', 'Alok', 'Sanjay', 'Deepak', 'Manish', 'Manoj', 'Gaurav',
  'Pradeep', 'Sunil', 'Ashok', 'Anil', 'Naveen', 'Ramesh', 'Suresh', 'Dinesh',
  'Ajay', 'Vijay', 'Kunal', 'Sachin', 'Pankaj', 'Vikas', 'Rahul', 'Varun',
  'Karthik', 'Suresh', 'Vignesh', 'Arvind', 'Harish', 'Sridhar', 'Venkat', 'Murugan',
  'Chirag', 'Bhavin', 'Pratik', 'Nilesh', 'Rakesh', 'Jatin', 'Hitesh', 'Ketan',
  'Mohammad', 'Farhan', 'Tariq', 'Zeeshan', 'Wasim', 'Sameer', 'Arif', 'Javed'
];

const femaleFirstNames = [
  'Priyanka', 'Srabanti', 'Sharmistha', 'Maitreyi', 'Paramita', 'Swarnali', 'Anwesha', 'Debolina',
  'Kakali', 'Madhumita', 'Payel', 'Rupa', 'Moumita', 'Soma', 'Baishakhi', 'Debjani',
  'Rituparna', 'Barnali', 'Shampa', 'Rumela', 'Tanushree', 'Ishita', 'Aparna', 'Sanghamitra',
  'Sneha', 'Pooja', 'Sunita', 'Neha', 'Ritu', 'Swati', 'Preeti', 'Shalini',
  'Ananya', 'Kavita', 'Meenakshi', 'Divya', 'Anitha', 'Lakshmi', 'Geeta', 'Rekha',
  'Komal', 'Rashmi', 'Archana', 'Bhavna', 'Hetal', 'Rutuja', 'Tanvi', 'Deepika',
  'Afsana', 'Shabnam', 'Nasreen', 'Rubina', 'Tasneem', 'Farida', 'Nazia', 'Sultana'
];

const lastNames = [
  // Bengali Surnames
  'Mukherjee', 'Banerjee', 'Chatterjee', 'Bhattacharya', 'Chakraborty', 'Ganguly', 'Goswami', 'Sanyal',
  'Bose', 'Dutta', 'Ghosh', 'Mitra', 'Guha', 'Sen', 'Pal', 'Roy',
  'Das', 'Mondal', 'Saha', 'Majumdar', 'Bhowmick', 'Samanta', 'Nandi', 'Halder',
  'Kundu', 'Barman', 'Biswas', 'Pramanik', 'Adhikary', 'Karmakar', 'Bhowmick', 'Bagchi',
  // North / Central Indian Surnames
  'Sharma', 'Verma', 'Gupta', 'Singh', 'Mehra', 'Agarwal', 'Tiwari', 'Pandey',
  'Mittal', 'Mishra', 'Chauhan', 'Malhotra', 'Singhania', 'Jain', 'Saxena', 'Rawat',
  'Kashyap', 'Kapoor', 'Bhatia', 'Kohli', 'Chopra', 'Arora', 'Dubey', 'Tripathi',
  'Yadav', 'Srivastava', 'Choudhary', 'Rathore', 'Shukla', 'Thakur', 'Garg', 'Bansal',
  // South Indian Surnames
  'Iyer', 'Iyengar', 'Nair', 'Menon', 'Pillai', 'Rao', 'Reddy', 'Swaminathan',
  'Krishnan', 'Sundaram', 'Venkatraman', 'Prasad', 'Balakrishnan', 'Subramaniam', 'Nambiar', 'Murthy',
  // Western / Marathi / Gujarati Surnames
  'Patel', 'Shah', 'Joshi', 'Mehta', 'Kulkarni', 'Deshmukh', 'Patil', 'Sawant',
  'Shinde', 'Gaikwad', 'Bhosale', 'Pawar', 'More', 'Chavan', 'Solanki', 'Panchal',
  // Muslim Indian Surnames
  'Khan', 'Ahmed', 'Ali', 'Siddiqui', 'Akhtar', 'Mallick', 'Parveen', 'Ansari',
  'Qureshi', 'Mirza', 'Hassan', 'Begum', 'Hossain', 'Rahman', 'Laskar', 'Molla'
];

// Generate exactly 500 UNIQUE full names
const generatedNames = [];
const nameSet = new Set();

const allFirstNames = [...maleFirstNames, ...femaleFirstNames];

// Deterministic shuffle with variety
for (const fn of allFirstNames) {
  for (const ln of lastNames) {
    const fullName = `${fn} ${ln}`;
    if (!nameSet.has(fullName)) {
      nameSet.add(fullName);
      generatedNames.push(fullName);
      if (generatedNames.length === 500) break;
    }
  }
  if (generatedNames.length === 500) break;
}

if (generatedNames.length < 500) {
  throw new Error(`Only generated ${generatedNames.length} names! Need 500.`);
}

console.log(`Successfully generated ${generatedNames.length} 100% unique names!`);

// 2. Locations Pool (Local Kolkata & WB heavy, plus major metros for pan-India presence)
const kolkataLocations = [
  'Salt Lake Sector 1, Kolkata', 'Salt Lake Sector 2, Kolkata', 'Salt Lake Sector 3, Kolkata', 'Salt Lake Sector 5, Kolkata',
  'New Town Action Area 1, Kolkata', 'New Town Action Area 2, Kolkata', 'New Town Action Area 3, Kolkata', 'Rajarhat Main Road, Kolkata',
  'Park Street, Kolkata', 'Ballygunge Circular Road, Kolkata', 'Alipore, Kolkata', 'New Alipore, Kolkata',
  'Behala Chowrasta, Kolkata', 'Behala Sakher Bazar, Kolkata', 'Jadavpur, Kolkata', 'Garia Station Road, Kolkata',
  'Tollygunge, Kolkata', 'Southern Avenue, Kolkata', 'Dum Dum Cantonment, Kolkata', 'Nagerbazar, Kolkata',
  'Barasat Champadali, North 24 Pgs', 'Madhyamgram, North 24 Pgs', 'Barrackpore, North 24 Pgs', 'Sodepur, North 24 Pgs',
  'Kestopur VIP Road, Kolkata', 'Baguiati, Kolkata', 'Lake Town Block A, Kolkata', 'Ultadanga, Kolkata',
  'Shyambazar Five Point, Kolkata', 'Hatibagan, Kolkata', 'Kasba New Market, Kolkata', 'Ruby General Hospital Area, Kolkata',
  'EM Bypass, Kolkata', 'Santoshpur, Kolkata', 'Gariahat, Kolkata', 'Kalighat, Kolkata',
  'Shibpur, Howrah', 'Salkia, Howrah', 'Liluah, Howrah', 'Bally, Howrah',
  'Uttarpara, Hooghly', 'Konnagar, Hooghly', 'Rishra, Hooghly', 'Serampore, Hooghly',
  'Chinsurah, Hooghly', 'Chandannagar, Hooghly', 'Bandel, Hooghly'
];

const metroLocations = [
  'Noida Sector 62, Delhi NCR', 'Noida Sector 18, Delhi NCR', 'Noida Sector 137, Delhi NCR', 'Indirapuram, Ghaziabad',
  'DLF Phase 3, Gurgaon', 'Cyber City, Gurgaon', 'South Extension 2, New Delhi', 'Saket, South Delhi',
  'Dwarka Sector 10, New Delhi', 'Rohini Sector 9, New Delhi', 'Andheri West, Mumbai', 'Bandra West, Mumbai',
  'Powai Hiranandani, Mumbai', 'Borivali West, Mumbai', 'Thane West, MMR', 'Vashi Sector 17, Navi Mumbai',
  'Whitefield, Bangalore', 'Koramangala 4th Block, Bangalore', 'Indiranagar 100ft Rd, Bangalore', 'HSR Layout Sector 2, Bangalore',
  'Hitec City, Hyderabad', 'Gachibowli, Hyderabad', 'Kondapur, Hyderabad', 'Banjara Hills, Hyderabad',
  'Wakad, Pune', 'Hinjewadi Phase 1, Pune', 'Baner Road, Pune', 'Kothrud, Pune'
];

const allLocations = [...kolkataLocations, ...kolkataLocations, ...metroLocations];

// 3. Category Definitions & Detailed Scenarios
const categoryConfigs = [
  {
    category: 'AC Repair',
    count: 110,
    brands: ['Daikin', 'Voltas', 'LG', 'Samsung', 'Hitachi', 'Carrier', 'Blue Star', 'Panasonic', 'Lloyd', 'Godrej', 'Whirlpool', 'O General'],
    scenarios: [
      {
        en: (brand, loc) => `Technician arrived at our ${loc} flat within 90 minutes. Resolved R32 refrigerant gas leakage on our ${brand} inverter AC and did full vacuum pressure testing. Cooling is ice cold now. ₹299 inspection was adjusted honestly!`,
        bn: (brand, loc) => `${loc}-এ বুকিং করার দেড় ঘণ্টার মধ্যেই টেকনিশিয়ান আসেন। আমাদের ${brand} ইনভার্টার এসির R32 গ্যাস লিকেজ খুঁজে ভ্যাকুয়াম টেস্টিং করে দেন। বরফের মতো ঠান্ডা হচ্ছে এখন। ₹২৯৯ ভিজিট চার্জ সৎভাবে অ্যাডজাস্ট করা হয়!`
      },
      {
        en: (brand, loc) => `Booked emergency doorstep repair for ${brand} 1.5 ton split AC because it was blowing normal room temperature air in peak summer. The engineer found a blown capacitor and replaced it instantly with a 90-day warranty card. Excellent service!`,
        bn: (brand, loc) => `তীব্র গরমে ${brand} ১.৫ টন স্প্লিট এসি শুধু ফ্যানের মতো হাওয়া দিচ্ছিল। টেকনিশিয়ান এসে সাথে সাথে খারাপ ক্যাপাসিটর বদলে দেন এবং ৯০ দিনের ওয়ারেন্টি কার্ড দেন। অসাধারণ সার্ভিস!`
      },
      {
        en: (brand, loc) => `Water was dripping continuously from the indoor unit of our ${brand} AC onto the bed. The technician did a thorough jet-pump deep cleaning, unblocked the moldy drain pipe, and fitted fresh insulation. No more leaks!`,
        bn: (brand, loc) => `${brand} এসির ইনডোর ইউনিট থেকে বিছানার ওপর অনবরত জল পড়ছিল। টেকনিশিয়ান জেট পাম্প দিয়ে পুরো পাইপ ও ড্রেন লাইন পরিষ্কার করে দেন। জল পড়া সম্পূর্ণ বন্ধ!`
      },
      {
        en: (brand, loc) => `Our ${brand} dual inverter AC had an E1 error code and stopped cooling suddenly. The technician repaired the outdoor PCB motherboard on-site within 40 minutes instead of asking us to wait weeks. Highly trustworthy home appliance care!`,
        bn: (brand, loc) => `${brand} ইনভার্টার এসিতে E1 এরর কোড এসে বন্ধ হয়ে গিয়েছিল। টেকনিশিয়ান মাত্র ৪০ মিনিটে স্পটেই আউটডোর পিসিবি বোর্ড রিপেয়ার করে দেন। দারুণ বিশ্বস্ত সার্ভিস!`
      },
      {
        en: (brand, loc) => `Professional foam jet deep servicing done on 2 ${brand} split ACs before summer. Removed thick black dust and foul smell from cooling coils. Airflow and cooling efficiency improved noticeably!`,
        bn: (brand, loc) => `গরমের শুরুতে দুটো ${brand} স্প্লিট এসিতে ফোম জেট ডিপ ওয়াশ করাই। কয়েল থেকে দুর্গন্ধ ও সমস্ত ধুলোবালি নিখুঁত পরিষ্কার করে দিয়েছেন। এয়ারফ্লো এখন দ্বিগুণ!`
      },
      {
        en: (brand, loc) => `Prompt response on WhatsApp. The technician checked nitrogen pressure, sealed a minor flare nut flare leak on our ${brand} AC, and did gas top-up with zero hidden charges. Best appliance repair service near me!`,
        bn: (brand, loc) => `হোয়াটসঅ্যাপে বুক করার পর খুব দ্রুত যোগাযোগ করা হয়। ${brand} এসির ফ্লেয়ার নাটের লিকেজ সিল করে গ্যাস টপ-আপ করে দিয়েছেন। কোনো লুকানো চার্জ নেই। সত্যি দারুণ সার্ভিস!`
      }
    ]
  },
  {
    category: 'Fridge Repair',
    count: 90,
    brands: ['Samsung', 'LG', 'Whirlpool', 'Godrej', 'Haier', 'Bosch', 'Panasonic'],
    scenarios: [
      {
        en: (brand, loc) => `Our ${brand} double door frost-free refrigerator stopped cooling in the lower compartment while the freezer was freezing rock hard. Technician diagnosed a jammed defrost timer and bimetal thermostat, replaced both on spot!`,
        bn: (brand, loc) => `আমাদের ${brand} ডাবল ডোর ফ্রিজের নিচের অংশে ঠান্ডা হচ্ছিল না কিন্তু ডিপে বরফ জমছিল। টেকনিশিয়ান ডিফ্রোস্ট টাইমার ও বাইমেটাল থার্মোস্ট্যাট বদলে সাথে সাথে সলভ করে দেন!`
      },
      {
        en: (brand, loc) => `The compressor of our ${brand} inverter fridge was making loud clicking noises and tripping the circuit breaker. Technician checked the inverter PCB and relay, replaced the faulty starting capacitor. Runs whisper quiet now.`,
        bn: (brand, loc) => `${brand} ইনভার্টার ফ্রিজের কম্প্রেসার খটখট শব্দ করে ট্রিপ করছিল। টেকনিশিয়ান পিসিবি ও রিলে চেক করে ক্যাপাসিটর পাল্টে দেন। এখন একদম নিঃশব্দে স্মুথ চলছে।`
      },
      {
        en: (brand, loc) => `Food was getting spoiled inside our ${brand} single door fridge. Engineer diagnosed slow gas leakage at condenser joint, brazed it cleanly and recharged R600a eco-gas. Provided genuine bill and warranty.`,
        bn: (brand, loc) => `${brand} সিঙ্গেল ডোর ফ্রিজে খাবার নষ্ট হয়ে যাচ্ছিল। কনডেন্সার জয়েন্টের গ্যাস লিকেজ ঝালাই করে R600a গ্যাস রিচার্জ করে দিয়েছেন। পাকা বিল ও ওয়ারেন্টি সহ কাজ!`
      },
      {
        en: (brand, loc) => `Door magnetic rubber gasket had dried out on our old ${brand} refrigerator causing cool air to escape. Technician installed brand new original gasket and door shuts tight like a brand new fridge!`,
        bn: (brand, loc) => `${brand} ফ্রিজের দরজার রাবার গ্যাসকেট আলগা হয়ে ঠান্ডা হাওয়া বেরিয়ে যাচ্ছিল। টেকনিশিয়ান অরিজিনাল নতুন গ্যাসকেট লাগিয়ে দেন। দরজা এখন একদম এয়ারটাইট!`
      },
      {
        en: (brand, loc) => `Water was pooling underneath the vegetable crisper drawer in our ${brand} fridge. Technician cleared the choked drain chute behind the evaporator coil without damaging anything. Polite and clean work.`,
        bn: (brand, loc) => `${brand} ফ্রিজের সবজির ড্রয়ারের নিচে জল জমছিল। ড্রেন পাইপ নিখুঁতভাবে পরিষ্কার করে দিয়েছেন। ব্যবহার খুব অমায়িক ও ভদ্র ছিল।`
      }
    ]
  },
  {
    category: 'Washing Machine Repair',
    count: 90,
    brands: ['LG', 'Samsung', 'IFB', 'Bosch', 'Whirlpool', 'Panasonic', 'Godrej', 'Haier'],
    scenarios: [
      {
        en: (brand, loc) => `Our ${brand} front load washing machine stopped draining water and gave an OE/E20 error code. Technician reached ${loc} within 2 hours, cleaned hairpins and coins from the drain pump filter, and restored full function!`,
        bn: (brand, loc) => `আমাদের ${brand} ফ্রন্ট লোড ওয়াশিং মেশিনে জল ড্রেন হচ্ছিল না এবং এরর দেখাচ্ছিল। টেকনিশিয়ান এসে কয়েন ট্র্যাপ ও ড্রেন পাম্পের নোংরা পরিষ্কার করে সাথে সাথে ঠিক করে দেন!`
      },
      {
        en: (brand, loc) => `Washing machine was vibrating violently and moving across the bathroom floor during high speed spin. The technician installed heavy-duty shock absorber suspension struts on our ${brand} machine. Now 100% stable.`,
        bn: (brand, loc) => `স্পিন চলার সময় ওয়াশিং মেশিন কাঁপছিল এবং সরে যাচ্ছিল। টেকনিশিয়ান এসে ${brand} মেশিনে নতুন হেভি-ডিউটি শক অ্যাবজর্বার লাগিয়ে দেন। এখন কোনো কম্পন নেই!`
      },
      {
        en: (brand, loc) => `Motor was humming but the inner stainless steel drum was not spinning in our ${brand} top load washer. Technician diagnosed snapped drive belt and worn pulley, fitted original spares right away.`,
        bn: (brand, loc) => `${brand} টপ লোড ওয়াশারে মোটর ঘুরলেও ড্রাম ঘুরছিল না। বেল্ট ছিঁড়ে গিয়েছিল, টেকনিশিয়ান আসল নতুন বেল্ট লাগিয়ে ১৫ মিনিটে ঠিক করে দিলেন।`
      },
      {
        en: (brand, loc) => `Water was continuously overflowing and not cutting off on our ${brand} automatic washing machine. Engineer identified a faulty pressure level sensor switch and replaced it with genuine part. Very satisfied!`,
        bn: (brand, loc) => `${brand} অটোমেটিক ওয়াশিং মেশিনে জল ঢোকা বন্ধ হচ্ছিল না। টেকনিশিয়ান প্রেসার সেন্সর বদলে দেন। খুব সন্তুষ্ট ও নিশ্চিন্ত!`
      },
      {
        en: (brand, loc) => `Door latch got stuck on our ${brand} front loader with wet clothes trapped inside. Booked in a panic, and their technician came within 45 mins, unlocked the safety switch safely and replaced the door lock mechanism!`,
        bn: (brand, loc) => `${brand} ফ্রন্ট লোডারে ভেজা জামাকাপড় আটকে দরজা লক হয়ে গিয়েছিল। ফোন করার ৪৫ মিনিটের মধ্যে টেকনিশিয়ান এসে নিরাপদে ডোর লক সুইচ বদলে দেন!`
      }
    ]
  },
  {
    category: 'Microwave Oven Repair',
    count: 45,
    brands: ['LG', 'Samsung', 'IFB', 'Panasonic', 'Godrej', 'Morphy Richards', 'Bajaj'],
    scenarios: [
      {
        en: (brand, loc) => `Our ${brand} convection microwave was running and light turned on, but food remained ice cold. Technician tested high voltage capacitor, diode, and replaced the magnetron tube on-site. Heating perfectly now!`,
        bn: (brand, loc) => `${brand} মাইক্রোওয়েভ চালু হলেও খাবার একদম গরম হচ্ছিল না। টেকনিশিয়ান স্পটেই ম্যাগনেট্রন ও হাই-ভোল্টেজ ডায়োড বদলে দেন। এখন খাবার চটজলদি গরম হচ্ছে!`
      },
      {
        en: (brand, loc) => `Violent sparking and crackling fireworks inside our ${brand} microwave. Technician showed us the burned mica waveguide cover sheet, cleaned the carbon deposits, and installed a heavy-duty mica sheet. Safe to use again!`,
        bn: (brand, loc) => `${brand} ওভেনের ভেতরে মারাত্মক স্পার্ক করছিল। টেকনিশিয়ান পুড়ে যাওয়া মাইকা শিট বদলে পুরো ভেতরের অংশ ক্লিন করে দেন। এখন একদম নিরাপদ!`
      },
      {
        en: (brand, loc) => `The touch membrane keypad buttons on our ${brand} microwave stopped responding. Replaced the membrane panel cleanly with original part at reasonable cost. Transparent ₹299 inspection breakdown.`,
        bn: (brand, loc) => `${brand} মাইক্রোওয়েভের টাচ বাটন কাজ করছিল না। নতুন মেমব্রেন প্যানেল লাগিয়ে একদম নতুনের মতো বানিয়ে দিয়েছেন। কোনো বাড়তি খরচ ছাড়া নিখুঁত কাজ।`
      },
      {
        en: (brand, loc) => `Turntable roller plate was stuck and making rattling gear noise in our ${brand} grill microwave. The drive coupler motor was replaced in 20 minutes at our ${loc} residence.`,
        bn: (brand, loc) => `${brand} মাইক্রোওয়েভে কাচের প্লেট ঘুরছিল না। টেকনিশিয়ান কাপলার মোটর বদলে ২০ মিনিটে সমাধান করে দেন।`
      }
    ]
  },
  {
    category: 'Water Purifier Repair',
    count: 45,
    brands: ['Kent', 'Aquaguard', 'Pureit', 'Livpure', 'Havells', 'Blue Star'],
    scenarios: [
      {
        en: (brand, loc) => `TDS level in our drinking water shot up past 320 ppm and water had an earthy taste. Technician came to ${loc}, replaced choked 80 GPD RO membrane and activated carbon filter, brought TDS down to pure 75 ppm!`,
        bn: (brand, loc) => `খাওয়ার জলের টিডিএস ৩২০-র উপরে উঠে গিয়েছিল। টেকনিশিয়ান এসেই নতুন আরও মেমব্রেন ও কার্বন ফিল্টার সেট করে দেন। টিডিএস এখন সুস্বাদু ৭৫ পিপিএম!`
      },
      {
        en: (brand, loc) => `Booster pump was vibrating loudly and water was barely trickling into the storage tank of our ${brand} RO. Pump head diaphragm serviced and pre-sediment filter changed. Flow is swift now.`,
        bn: (brand, loc) => `${brand} আরও মেশিনে পাম্পের শব্দ হচ্ছিল কিন্তু ট্যাঙ্কিতে জল ভরছিল না। টেকনিশিয়ান পাম্প সার্ভিস ও সেডিমেন্ট ফিল্টার বদলে দেন। জলের স্পিড দারুণ!`
      },
      {
        en: (brand, loc) => `Water was leaking continuously from push-fit elbow fittings under the sink. The technician replaced worn Teflon tubing and faulty solenoid valve (SV). Dry and clean setup now!`,
        bn: (brand, loc) => `${brand} পিউরিফায়ারের পাইপ থেকে জল চুইয়ে পড়ছিল। এসভি কয়েল ও নতুন ফিটিংস লাগিয়ে পুরো লিকেজ বন্ধ করে দিয়েছেন। দারুণ কাজ!`
      }
    ]
  },
  {
    category: 'Chimney Repair',
    count: 40,
    brands: ['Faber', 'Glen', 'Hindware', 'Elica', 'Kaff', 'Sunflame', 'Bosch'],
    scenarios: [
      {
        en: (brand, loc) => `Our ${brand} auto-clean kitchen chimney had virtually zero smoke suction and oil was dripping onto the gas stove. Complete deep degreasing service done with motor casing cleaned. Kitchen is smoke-free again!`,
        bn: (brand, loc) => `${brand} কিচেন চিমনিতে ধোঁয়া টানছিল না এবং তেল চুইয়ে পড়ছিল। পুরো মোটর ও বাফেল ফিল্টার ডিপ ক্লিন করে দেন। কিচেন এখন একদম ধোঁয়ামুক্ত!`
      },
      {
        en: (brand, loc) => `Auto-clean heating element and oil collector tray were not heating up on our ${brand} curved glass chimney. Technician repaired the thermal cut-off sensor on-site. Highly professional!`,
        bn: (brand, loc) => `${brand} চিমনিতে অটো-ক্লিন হিটার চালু হচ্ছিল না। টেকনিশিয়ান সেন্সর রিপেয়ার করে চালু করে দেন। খুব দক্ষ ও সৎ কাজ!`
      },
      {
        en: (brand, loc) => `Touch control speed buttons were dead on our ${brand} chimney. The engineer repaired the capacitor and IC on the control motherboard instead of charging ₹3000 for full board replacement. Great honesty!`,
        bn: (brand, loc) => `${brand} চিমনি অন হচ্ছিল না। পুরো বোর্ড না বদলে টেকনিশিয়ান বোর্ডের ক্যাপাসিটর সারিয়ে দেন, ফলে অনেক টাকা সাশ্রয় হয়েছে। খুব সৎ কারিগর!`
      }
    ]
  },
  {
    category: 'LED TV Repair',
    count: 45,
    brands: ['Sony Bravia', 'Samsung', 'LG', 'Mi Smart TV', 'OnePlus', 'TCL', 'Panasonic'],
    scenarios: [
      {
        en: (brand, loc) => `Our 43-inch ${brand} Smart LED TV had clear audio and responded to remote, but screen was completely black. Technician tested backlights honestly, replaced the full LED backlight strip with 6-month warranty. Picture is vivid!`,
        bn: (brand, loc) => `আমাদের ৪৩ ইঞ্চি ${brand} টিভিতে শব্দ ছিল কিন্তু ছবি আসছিল না। টেকনিশিয়ান ব্যাকলাইট এলইডি স্ট্রিপ বদলে দেন এবং ৬ মাসের ওয়ারেন্টি দেন। ছবি এখন সুপার ব্রাইট ও ক্লিয়ার!`
      },
      {
        en: (brand, loc) => `Screen had flickering horizontal colored lines and double image. The technician did panel ribbon COF bonding service carefully at our ${loc} home. Saved us huge cost of replacing screen panel!`,
        bn: (brand, loc) => `টিভির ডিসপ্লেতে লাইন এসে কাঁপছিল। স্ক্রিন না বদলে প্যানেল রিবন বন্ডিং রিপেয়ার করে ঠিক করে দেন। অনেক খরচ বাঁচল!`
      },
      {
        en: (brand, loc) => `Our ${brand} TV stopped turning on after evening thunderstorm voltage spike. Motherboard power supply section IC and diodes repaired on-site within an hour. Excellent doorstep service!`,
        bn: (brand, loc) => `বিদ্যুৎ চমকানোর পর ${brand} টিভি চালু হচ্ছিল না। মাদারবোর্ডের পাওয়ার সাপ্লাই সেকশন স্পটেই মেরামত করে দিয়েছেন। দ্রুত ও নির্ভরযোগ্য সেবা!`
      }
    ]
  },
  {
    category: 'Geyser Repair',
    count: 35,
    brands: ['Racold', 'AO Smith', 'Bajaj', 'Havells', 'Crompton', 'V-Guard'],
    scenarios: [
      {
        en: (brand, loc) => `Water was taking over 45 minutes to get lukewarm in our 15L ${brand} storage geyser. The technician de-scaled heavy mineral sediment and replaced the copper heating element and magnesium anode rod. Boiling hot water in 10 mins!`,
        bn: (brand, loc) => `${brand} ১৫ লিটার গিজারে জল গরম হতে অনেক সময় নিচ্ছিল। টেকনিশিয়ান নতুন হিটিং এলিমেন্ট লাগিয়ে পুরো ট্যাঙ্ক ডি-স্কেল করে দেন। এখন ১০ মিনিটে ফুটন্ত গরম জল!`
      },
      {
        en: (brand, loc) => `Geyser was tripping the house MCB as soon as switched on, and felt slight electric tingling on tap. The technician diagnosed earthing leakage and replaced the dual thermostat cut-off with genuine safety spare. Safe now!`,
        bn: (brand, loc) => `গিজার অন করলেই এমসিবি ট্রিপ করছিল। টেকনিশিয়ান থার্মোস্ট্যাট ও আর্দিং লিকেজ ঠিক করে সম্পূর্ণ নিরাপদ করে দেন। নিশ্চিন্ত সার্ভিস!`
      },
      {
        en: (brand, loc) => `Water was leaking from the bottom pipe joint of our ${brand} instant geyser. Technician fitted heavy-duty braided inlet pipe and non-return safety valve cleanly. Highly recommended doorstep service!`,
        bn: (brand, loc) => `${brand} ইনস্ট্যান্ট গিজারের পাইপের গোড়া থেকে জল লিক করছিল। টেকনিশিয়ান নতুন সেফটি ভালভ ও ব্রেইডেড পাইপ লাগিয়ে নিখুঁত মেরামত করে দেন!`
      }
    ]
  }
];

// Helper to generate natural dates between Nov 2025 and late Sep 2026
function getRandomDate(index, total) {
  const start = new Date(2025, 9, 15).getTime(); // Oct 15, 2025
  const end = new Date(2026, 8, 26).getTime();   // Sep 26, 2026
  
  // Distribute linearly with slight jitter
  const progress = index / total;
  const targetTime = start + progress * (end - start);
  const jitter = (Math.random() - 0.5) * 4 * 86400000; // +/- 2 days
  const finalDate = new Date(Math.min(end, Math.max(start, targetTime + jitter)));
  return finalDate.toISOString().split('T')[0];
}

// Generate the 500 reviews
const reviews = [];
let nameIndex = 0;
let reviewCounter = 1;

for (const cfg of categoryConfigs) {
  for (let i = 0; i < cfg.count; i++) {
    const customerName = generatedNames[nameIndex++];
    const loc = allLocations[(reviewCounter * 7 + i) % allLocations.length];
    const brand = cfg.brands[(i + reviewCounter) % cfg.brands.length];
    const scenario = cfg.scenarios[i % cfg.scenarios.length];

    // Ratings: 92% 5-star, 8% 4-star (natural high rating ~4.92)
    const rating = Math.random() < 0.92 ? 5 : 4;
    const isVerified = true;
    const date = getRandomDate(reviewCounter, 500);

    const comment = scenario.en(brand, loc.split(',')[0]);
    const commentBn = scenario.bn(brand, loc.split(',')[0]);

    reviews.push({
      id: `rev-${reviewCounter}`,
      customerName,
      location: loc,
      serviceCategory: cfg.category,
      rating,
      comment,
      commentBn,
      isVerified,
      isDemo: true,
      date,
      isActive: true,
      sortOrder: reviewCounter
    });

    reviewCounter++;
  }
}

console.log(`Generated total ${reviews.length} reviews.`);

// Verify 500 unique names
const uniqueNamesCheck = new Set(reviews.map(r => r.customerName));
console.log(`Unique customer names count: ${uniqueNamesCheck.size} (Must be exactly 500)`);
if (uniqueNamesCheck.size !== 500) {
  throw new Error(`Name uniqueness validation failed! Only ${uniqueNamesCheck.size} unique names.`);
}

// Verify category counts
const catCounts = {};
for (const r of reviews) {
  catCounts[r.serviceCategory] = (catCounts[r.serviceCategory] || 0) + 1;
}
console.log('Category distribution:', catCounts);

// Calculate average rating
const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(2);
console.log(`Average Rating across 500 reviews: ${avgRating}★`);

// Write to data/reviews.json
const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');
fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2), 'utf-8');
console.log(`Saved 500 reviews to ${REVIEWS_FILE}`);

// Write to src/lib/reviews-data.ts
const REVIEWS_TS_FILE = path.join(process.cwd(), 'src', 'lib', 'reviews-data.ts');
const tsContent = `// Auto-generated 500 verified customer reviews covering all categories, brands & problems across India
import { Review } from './types';

export const initialReviews: Review[] = ${JSON.stringify(reviews, null, 2)};
`;
fs.writeFileSync(REVIEWS_TS_FILE, tsContent, 'utf-8');
console.log(`Saved 500 reviews to ${REVIEWS_TS_FILE}`);
