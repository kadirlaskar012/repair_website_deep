export interface BrandSeoDetail {
  slug: string;
  name: string;
  headlineEn: string;
  headlineBn: string;
  subheadlineEn: string;
  subheadlineBn: string;
  coverageDescEn: string;
  coverageDescBn: string;
  errorCodes: {
    code: string;
    issueEn: string;
    issueBn: string;
    solutionEn: string;
    solutionBn: string;
  }[];
  searchedKeywords: string[];
  faqs: {
    qEn: string;
    qBn: string;
    aEn: string;
    aBn: string;
  }[];
}

export const brandSeoCatalog: Record<string, BrandSeoDetail> = {
  'o-general': {
    slug: 'o-general',
    name: 'O General',
    headlineEn: 'O General AC Repair & Service Centre Support in Kolkata & West Bengal',
    headlineBn: 'কলকাতায় ও জেনারেল এসি মেরামত ও ডোরস্টেপ সার্ভিস সেন্টার সাপোর্ট',
    subheadlineEn: 'Certified doorstep service for O General Inverter, Split & Heavy-Duty ACs. Fast 90-minute arrival across Kolkata, Salt Lake & Howrah with flat ₹299 inspection fee.',
    subheadlineBn: 'ও জেনারেল ইনভার্টার, স্প্লিট ও হেভি-ডিউটি এসির সার্টিফাইড ডোরস্টেপ সার্ভিস। কলকাতা, সল্টলেক ও হাওড়ায় ৯০ মিনিটে টেকনিশিয়ান ও মাত্র ₹২৯৯ ভিজিট ফি।',
    coverageDescEn: 'O General air conditioners are built for intense tropical climates. Our senior technicians specialize in O General inverter PCB diagnostics, hyper-tropical rotary compressor repair, R32/R410A gas refilling, and cooling restoration.',
    coverageDescBn: 'ও জেনারেল এসি চরম তাপমাত্রায় ঠান্ডার জন্য পরিচিত। আমাদের বিশেষজ্ঞ ইঞ্জিনিয়াররা ও জেনারেল ইনভার্টার পিসিবি, ট্রপিক্যাল রোটারি কম্প্রেসার, খাঁটি রেফ্রিজারেন্ট রিফিল এবং সম্পূর্ণ কুলিং পুনরুদ্ধারে দক্ষ।',
    errorCodes: [
      {
        code: 'Not Cooling / Low Airflow',
        issueEn: 'Indoor fan running but no chilled air coming from vents',
        issueBn: 'ইনডোর ফ্যান চলছে কিন্তু ভেন্ট থেকে ঠান্ডা বাতাস আসছে না',
        solutionEn: 'Check refrigerant pressure with manifold gauge, inspect flare nuts for micro-leaks, and clean dense cooling fins with jet wash.',
        solutionBn: 'প্রেশার গেজ দিয়ে গ্যাসের চাপ পরিমাপ, নাট লিকেজ পরীক্ষা এবং ইনডোর কুলিং ফিন জেট ওয়াশ করা।'
      },
      {
        code: 'Inverter PCB Error Sequence',
        issueEn: 'Outdoor unit not switching on, timer LED flashing continuously',
        issueBn: 'আউটডোর ইউনিট চালু হচ্ছে না, টাইমার লাইট একনাগাড়ে ব্লিংক করছে',
        solutionEn: 'Test IPM module, communication voltage between indoor and outdoor boards, and reactor coil resistance.',
        solutionBn: 'আইপিএম মডিউল, ইনডোর-আউটডোর কমিউনিকেশন ভোল্টেজ এবং রিঅ্যাক্টর কয়েল রেজিস্ট্যান্স পরীক্ষা।'
      },
      {
        code: 'Remote Not Responding',
        issueEn: 'AC not turning on with remote controller despite battery change',
        issueBn: 'ব্যাটারি বদলানোর পরও রিমোট দিয়ে এসি অন হচ্ছে না',
        solutionEn: 'Inspect infrared receiver diode sensor on display panel and restore PCB signal relay.',
        solutionBn: 'ডিসপ্লে প্যানেলের আইআর রিসিভার ডায়োড সেন্সর পরীক্ষা এবং সিগন্যাল রিলে মেরামত।'
      }
    ],
    searchedKeywords: [
      'general service centre',
      'general service centre number',
      'general service centre near me',
      'general service centre delhi',
      'general service centre kolkata',
      'general customer care number',
      'general customer care',
      'general customer care number delhi 24x7',
      'general customer care whatsapp number',
      'general customer care app',
      'general ac repair near me',
      'general ac repair',
      'general ac repair delhi',
      'general ac repair service',
      'general ac not cooling',
      'general ac not cooling properly',
      'new general ac not cooling',
      'general ac not working',
      'general ac not working with remote',
      'general ac inverter',
      'general ac inverter 1.5 ton',
      'general ac inverter 1.5 ton price',
      'general ac inverter error code',
      'general ac inverter price'
    ],
    faqs: [
      {
        qEn: 'How can I contact for O General AC repair in Kolkata?',
        qBn: 'কলকাতায় ও জেনারেল এসি মেরামতের জন্য কীভাবে যোগাযোগ করবেন?',
        aEn: 'Call our direct helpline at +91 6291674186 or tap the WhatsApp button. A certified multi-brand AC specialist will be dispatched to your doorstep within 90 minutes.',
        aBn: 'আমাদের সরাসরি হেল্পলাইন +91 6291674186 নম্বরে কল করুন বা হোয়াটসঅ্যাপ করুন। ৯০ মিনিটের মধ্যে অভিজ্ঞ টেকনিশিয়ান আপনার ঠিকানায় পৌঁছে যাবেন।'
      },
      {
        qEn: 'What does the ₹299 inspection fee cover for O General AC?',
        qBn: 'ও জেনারেল এসির ₹২৯৯ পরিদর্শনে কী কী দেখা হয়?',
        aEn: 'It covers comprehensive diagnosis: gas pressure test, electrical voltage check, compressor startup load test, and PCB diagnostics. Total repair cost is approved by you upfront before work starts.',
        aBn: 'এতে গ্যাস প্রেশার টেস্ট, ভোল্টেজ পরীক্ষা, কম্প্রেসার স্টার্টআপ লোড এবং পিসিবি চেক অন্তর্ভুক্ত। কোনো মেরামতের কাজ শুরুর আগে সম্পূর্ণ খরচ জানিয়ে অনুমোদন নেওয়া হয়।'
      },
      {
        qEn: 'Do you use genuine O General spare parts?',
        qBn: 'আপনারা কি আসল ও জেনারেল যন্ত্রাংশ ব্যবহার করেন?',
        aEn: 'Yes, we supply OEM-grade genuine capacitors, fan motors, sensors, and PCB boards, backed by an official 30-day workmanship warranty.',
        aBn: 'হ্যাঁ, আমরা জেনুইন ক্যাপাসিটর, ফ্যান মোটর, সেন্সর এবং পিসিবি বোর্ড ব্যবহার করি এবং প্রতিটি কাজে ৩০ দিনের লিখিত ওয়ারেন্টি প্রদান করি।'
      }
    ]
  },

  'lloyd': {
    slug: 'lloyd',
    name: 'Lloyd',
    headlineEn: 'Lloyd AC, Refrigerator & Washing Machine Service Centre Support in West Bengal',
    headlineBn: 'পশ্চিমবঙ্গে লয়েড এসি, ফ্রিজ ও ওয়াশিং মেশিন ডোরস্টেপ সার্ভিস সেন্টার সাপোর্ট',
    subheadlineEn: 'Instant doorstep technician for Lloyd Split AC, Double Door Fridge & Top/Front Load Washers. Emergency 90-min service across Kolkata with ₹299 visit fee.',
    subheadlineBn: 'লয়েড স্প্লিট এসি, ডাবল ডোর ফ্রিজ ও ওয়াশিং মেশিনের নির্ভরযোগ্য ডোরস্টেপ সমাধান। মাত্র ₹২৯৯ পরিদর্শনে অভিজ্ঞ টেকনিশিয়ান পান।',
    coverageDescEn: 'Lloyd (Havells) appliances are known for rapid cooling and smart inverter technology. We provide expert repairs for Lloyd AC fan running without cooling, washing machine error codes (E3, F8, E2), and refrigerator cooling loss.',
    coverageDescBn: 'লয়েড অ্যাপ্লায়েন্সের ফ্যান চলা কিন্তু ঠান্ডা না হওয়া, ওয়াশিং মেশিনের এরর কোড (E3, F8, E2) এবং ফ্রিজের কুলিং সমস্যার জন্য আমরা দক্ষ টেকনিশিয়ান ও আসল যন্ত্রাংশ দিয়ে তাৎক্ষণিক সার্ভিস দিই।',
    errorCodes: [
      {
        code: 'Fan Running But Not Cooling',
        issueEn: 'Indoor blower blows ambient room air but compressor does not engage',
        issueBn: 'ইনডোর ফ্যান চলছে কিন্তু সাধারণ বাতাস বের হচ্ছে, কম্প্রেসার চালু হচ্ছে না',
        solutionEn: 'Inspect dual-run capacitor, start relay, and check for low refrigerant gas in suction line.',
        solutionBn: 'ডুয়াল রান ক্যাপাসিটর, স্টার্ট রিলে পরীক্ষা এবং সাকশন লাইনে গ্যাসের চাপ চেক করা।'
      },
      {
        code: 'Washing Machine E3 / E2 Error',
        issueEn: 'Top load washer drain error - water not draining out during cycle',
        issueBn: 'টপ লোড ওয়াশারে ড্রেন এরর - স্পিন সাইকেলে জল নিষ্কাশন না হওয়া',
        solutionEn: 'Clear drain filter blockage, check drain motor valve puller, and test pressure switch sensor.',
        solutionBn: 'ড্রেন ফিল্টার পরিষ্কার, ড্রেন ভালভ মোটর পরীক্ষা এবং প্রেশার সেন্সর ঠিক করা।'
      },
      {
        code: 'Washing Machine F8 Error',
        issueEn: 'Water level sensor or motor speed tacho fault detected on display',
        issueBn: 'ডিসপ্লেতে জলের লেভেল সেন্সর বা মোটরের গতি নিয়ন্ত্রণের ত্রুটি',
        solutionEn: 'Calibrate frequency water level sensor and replace worn motor carbon brushes or hall sensor.',
        solutionBn: 'ওয়াটার লেভেল সেন্সর পরিবর্তন এবং মোটর সেন্সর পরীক্ষা।'
      }
    ],
    searchedKeywords: [
      'lloyd service centre',
      'lloyd service centre number',
      'lloyd service centre near me',
      'lloyd service centre toll free number',
      'lloyd service centre calicut',
      'lloyd customer care number',
      'lloyd customer care',
      'lloyd customer care number 24x7',
      'lloyd customer care toll free number',
      'lloyd customer care toll free number india',
      'lloyd ac repair',
      'lloyd ac repair near me',
      'lloyd ac repair customer care number',
      'lloyd ac repair service',
      'lloyd ac repair complaint number',
      'lloyd ac service kolkata',
      'lloyd ac not cooling',
      'lloyd ac not cooling but fan is running',
      'lloyd ac not cooling remote setting',
      'why is my lloyd ac not cooling',
      'lloyd ac not cooling properly',
      'lloyd ac not working',
      'lloyd fridge',
      'lloyd fridge price',
      'lloyd fridge double door',
      'lloyd fridge single door',
      'lloyd washing machine',
      'lloyd washing machine customer care number',
      'lloyd washing machine 8kg',
      'lloyd washing machine customer care',
      'lloyd washing machine 14 kg price',
      'lloyd top load washing machine',
      'lloyd top load washing machine e3 error',
      'lloyd top load washing machine price',
      'lloyd top load washing machine f8 error',
      'lloyd top load washing machine e2 error',
      'lloyd front load washing machine',
      'lloyd front load washing machine 7kg',
      'lloyd front load washing machine price',
      'lloyd front load washing machine error code list',
      'lloyd front load washing machine 8kg'
    ],
    faqs: [
      {
        qEn: 'Why is my Lloyd AC not cooling though the fan is running?',
        qBn: 'লয়েড এসির ফ্যান চলছে কিন্তু ঠান্ডা হচ্ছে না কেন?',
        aEn: 'This commonly happens when the outdoor compressor capacitor is weak, cooling gas has leaked, or the remote temperature is set improperly. Book a ₹299 inspection and our technician will test the compressor and gas pressure on-site.',
        aBn: 'কম্প্রেসার ক্যাপাসিটর নষ্ট হলে, গ্যাস লিকেজ হলে বা রিমোট সেটিংয়ে সমস্যা থাকলে এমন হয়। ₹২৯৯ পরিদর্শনে বুক করলে আমাদের টেকনিশিয়ান স্পটেই টেস্ট করে দেবেন।'
      },
      {
        qEn: 'How to fix E3 or F8 error on Lloyd washing machine?',
        qBn: 'লয়েড ওয়াশিং মেশিনের E3 বা F8 এরর কীভাবে ঠিক করবেন?',
        aEn: 'E3 indicates a drainage block while F8 points to a water level sensor fault. Our technician can clean the clogged drain assembly or replace the sensor at your home.',
        aBn: 'E3 ড্রেন পাইপে ময়লা আটকানোর লক্ষণ এবং F8 ওয়াটার লেভেল সেন্সরের ত্রুটি। আমাদের টেকনিশিয়ান বাড়িতে এসেই ড্রেন পাম্প বা সেন্সর ঠিক করে দেন।'
      },
      {
        qEn: 'What is the Lloyd customer support service helpline?',
        qBn: 'লয়েড সার্ভিসের জন্য সরাসরি হেল্পলাইন নম্বর কোনটি?',
        aEn: 'You can immediately dial +91 6291674186 or WhatsApp us for instant doorstep booking across Kolkata and West Bengal.',
        aBn: 'আপনি সরাসরি +91 6291674186 নম্বরে কল করতে পারেন অথবা হোয়াটসঅ্যাপে মেসেজ পাঠাতে পারেন।'
      }
    ]
  },

  'blue-star': {
    slug: 'blue-star',
    name: 'Blue Star',
    headlineEn: 'Blue Star AC & Commercial Refrigerator Repair Service in Kolkata & West Bengal',
    headlineBn: 'কলকাতায় ব্লু স্টার এসি ও রেফ্রিজারেটর মেরামত ও সার্ভিস সেন্টার সাপোর্ট',
    subheadlineEn: 'Professional doorstep service for Blue Star Inverter, 5-Star Split, Cassette AC & Deep Freezers. Same-day visit with flat ₹299 inspection fee.',
    subheadlineBn: 'ব্লু স্টার ইনভার্টার, ৫-স্টার স্প্লিট ও ক্যাসেট এসির বিশ্বস্ত ডোরস্টেপ সার্ভিস। একই দিনে টেকনিশিয়ান ভিজিট ও মাত্র ₹২৯৯ ডায়াগনোসিস ফি।',
    coverageDescEn: 'Blue Star is a pioneer in commercial and residential cooling. Our engineers handle Blue Star inverter AC E6 error codes, indoor-outdoor communication faults, capacitor failure, and precision R32/R410A gas refills.',
    coverageDescBn: 'ব্লু স্টার রেসিডেন্সিয়াল ও কমার্শিয়াল এসিতে শীর্ষস্থানীয়। ব্লু স্টার ইনভার্টার এসির E6 এরর কোড, পিসিবি সার্কিট ফল্ট এবং সঠিক গ্যাসের চাপ পুনরুদ্ধারে আমাদের টেকনিশিয়ানরা বিশেষজ্ঞ।',
    errorCodes: [
      {
        code: 'E6 Error Code (Inverter AC)',
        issueEn: 'Indoor and outdoor unit communication malfunction or fan motor stall',
        issueBn: 'ইনডোর ও আউটডোরের মধ্যে কমিউনিকেশন বিচ্ছিন্ন বা ডিসি ফ্যান মোটর জ্যাম',
        solutionEn: 'Check 24V DC communication bus line, inspect outdoor PCB motherboard, and test brushless DC fan motor.',
        solutionBn: 'কমিউনিকেশন ওয়্যার পরীক্ষা, আউটডোর মাদারবোর্ড চেক এবং বিএলডিসি ফ্যান মোটর রিপেয়ার।'
      },
      {
        code: 'AC Not Working with Remote',
        issueEn: 'Remote display is on but AC indoor unit does not register button presses',
        issueBn: 'রিমোটের ডিসপ্লে অন থাকলেও এসি কোনো কমান্ড গ্রহণ করছে না',
        solutionEn: 'Test display PCB receiver phototransistor and replace faulty IR sensor board.',
        solutionBn: 'ডিসপ্লে প্যানেলের আইআর সেন্সর পরীক্ষা এবং নতুন রিসিভার মডিউল লাগানো।'
      },
      {
        code: 'Ice on AC Copper Piping',
        issueEn: 'Thick white ice forming on outdoor narrow valve and indoor coil',
        issueBn: 'আউটডোরের পাতলা তামার পাইপ এবং ইনডোর কয়েলে সাদা বরফ জমা',
        solutionEn: 'Identify gas leak points using soap bubble/nitrogen test, braze copper joints, and refill pure refrigerant.',
        solutionBn: 'নাইট্রোজেন টেস্টে লিকেজ চিহ্নিতকরণ, তামার পাইপ ওয়েল্ডিং এবং সঠিক চাপে গ্যাস রিফিল।'
      }
    ],
    searchedKeywords: [
      'blue star service centre number',
      'blue star service centre near me',
      'blue star service centre',
      'blue star service centre contact number',
      'blue star service centre kolkata',
      'blue star customer care',
      'blue star customer care number',
      'blue star customer care number 24x7',
      'blue star customer care number near me',
      'blue star customer care near me',
      'blue star ac repair',
      'blue star ac repair near me',
      'blue star ac repair service',
      'blue star ac repair service near me',
      'blue star ac service',
      'blue star ac service near me',
      'blue star ac service request',
      'blue star ac service number',
      'blue star ac service center near me',
      'blue star ac installation',
      'blue star ac installation customer care',
      'blue star ac installation customer care number',
      'blue star ac installation charges',
      'blue star ac installation number',
      'blue star ac not working',
      'blue star ac not working with remote',
      'blue star inverter ac 1.5 ton 5 star price list',
      'blue star inverter ac',
      'blue star inverter ac e6 error code',
      'blue star inverter ac 1.5 ton price',
      'e6 error in blue star inverterac'
    ],
    faqs: [
      {
        qEn: 'What does E6 error code mean in Blue Star inverter AC?',
        qBn: 'ব্লু স্টার ইনভার্টার এসিতে E6 এরর কোডের অর্থ কী?',
        aEn: 'E6 indicates communication failure between indoor and outdoor PCBs or a faulty DC fan motor. Our certified technicians test the communication wires and PCB circuits on-site to fix this.',
        aBn: 'E6 হলো ইনডোর ও আউটডোর সার্কিট বোর্ডের যোগাযোগ বিচ্ছিন্ন বা ফ্যান মোটরের ত্রুটি। আমাদের অভিজ্ঞ টেকনিশিয়ান বাড়িতে এসে মাল্টিমিটার টেস্ট করে এটি সারিয়ে দেন।'
      },
      {
        qEn: 'What are the inspection charges for Blue Star AC in Kolkata?',
        qBn: 'কলকাতায় ব্লু স্টার এসির ভিজিট ও পরিদর্শন চার্জ কত?',
        aEn: 'Our doorstep inspection charge is flat ₹299 across Kolkata and West Bengal. Any parts or gas refill is quoted upfront after multi-point testing.',
        aBn: 'আমাদের ডোরস্টেপ ভিজিট ফি মাত্র ₹২৯৯। কোনো যন্ত্রাংশ বা গ্যাস রিফিল প্রয়োজন হলে আগে জানিয়ে অনুমোদন নেওয়া হয়।'
      },
      {
        qEn: 'How do I book Blue Star AC repair today?',
        qBn: 'আজই কীভাবে ব্লু স্টার এসি মেরামত বুক করবেন?',
        aEn: 'Simply call +91 6291674186 or send a WhatsApp message. We dispatch technicians within 90 minutes across all major Kolkata hubs.',
        aBn: 'সরাসরি +91 6291674186 নম্বরে কল করুন বা হোয়াটসঅ্যাপে মেসেজ পাঠান। ৯০ মিনিটের মধ্যে টেকনিশিয়ান পৌঁছে যাবেন।'
      }
    ]
  },

  'daikin': {
    slug: 'daikin',
    name: 'Daikin',
    headlineEn: 'Daikin AC Repair & Service Centre Support in Kolkata & West Bengal',
    headlineBn: 'কলকাতায় ডাইকিন এসি মেরামত ও ডোরস্টেপ সার্ভিস সেন্টার সাপোর্ট',
    subheadlineEn: 'Specialist doorstep technicians for Daikin Neo-Swing Inverter, Split & Multi-Split ACs. 90-minute response with transparent ₹299 diagnosis fee.',
    subheadlineBn: 'ডাইকিন নিও-সুইং ইনভার্টার ও স্প্লিট এসির দক্ষ ডোরস্টেপ সার্ভিস। কলকাতায় ৯০ মিনিটে আগমন ও মাত্র ₹২৯৯ ভিজিট ফি।',
    coverageDescEn: 'Daikin ACs are world leaders in energy-efficient inverter technology. We handle Daikin swing compressor diagnostics, optical display error codes, inverter PCB failure, and certified R32 refrigerant recharging.',
    coverageDescBn: 'ডাইকিন ইনভার্টার এসির নিও-সুইং কম্প্রেসার টেস্ট, পিসিবি সার্কিট মেরামত এবং খাঁটি R32 রেফ্রিজারেন্ট গ্যাস রিফিলের জন্য আমাদের প্রকৌশলীরা বিশেষভাবে প্রশিক্ষিত।',
    errorCodes: [
      {
        code: 'U4 / L5 / E7 Error Code',
        issueEn: 'Transmission error between units or outdoor fan motor overload',
        issueBn: 'ইউনিটের মধ্যে সিগন্যাল আদান-প্রদানে ত্রুটি বা আউটডোর ফ্যান মোটরে লোড',
        solutionEn: 'Check 230V communication signal, inspect noise filter PCB, and test outdoor motor windings.',
        solutionBn: 'সিগন্যাল ওয়্যার ভোল্টেজ পরীক্ষা, নয়েজ ফিল্টার পিসিবি চেক এবং মোটর কয়েল রেজিস্ট্যান্স টেস্ট।'
      },
      {
        code: 'Green Power LED Blinking Continuously',
        issueEn: 'AC goes into safety lock mode and stops cooling after 5-10 minutes',
        issueBn: 'এসি সেফটি লক মোডে চলে যাওয়া এবং ৫-১০ মিনিট পর ঠান্ডা বন্ধ হয়ে যাওয়া',
        solutionEn: 'Retrieve fault code via remote cancel button diagnostic mode, clean thermistor sensors, and clear error sequence.',
        solutionBn: 'রিমোটের ডায়াগনোসিস মোড দিয়ে এরর কোড বের করা এবং থার্মিস্টর সেন্সর পরিষ্কার বা প্রতিস্থাপন।'
      },
      {
        code: 'Water Dripping from Indoor Unit',
        issueEn: 'Condensed water overflowing onto room wall and floor',
        issueBn: 'ইনডোর ইউনিট থেকে ঘরের মেঝে ও দেয়ালে জল গড়িয়ে পড়া',
        solutionEn: 'Unclog drain pipe line using pressurized pump and adjust indoor backplate tilt angle.',
        solutionBn: 'ড্রেন পাইপের জমাট ময়লা প্রেসার ওয়াশ করা এবং ব্যাকপ্লেট সঠিক লেভেলে বসানো।'
      }
    ],
    searchedKeywords: [
      'daikin service centre kolkata',
      'daikin service centre kolkata phone number',
      'daikin customer care',
      'daikin customer care number',
      'daikin customer care toll free number india',
      'daikin customer care toll free number india 24x7',
      'daikin customer care number chennai',
      'daikin customer support',
      'daikin customer support number',
      'daikin customer support email',
      'daikin customer support phone number',
      'daikin customer support india',
      'daikin ac repair near me',
      'daikin ac repair',
      'daikin ac repair hyderabad',
      'daikin ac repair customer care',
      'daikin ac repair delhi',
      'daikin ac service',
      'daikin ac service near me',
      'daikin ac service request',
      'daikin ac service charges',
      'daikin ac service centre',
      'daikin ac installation',
      'daikin ac installation charges',
      'daikin ac installation request',
      'daikin ac installation customer care number',
      'daikin ac installation number'
    ],
    faqs: [
      {
        qEn: 'How to diagnose error code on Daikin AC remote?',
        qBn: 'ডাইকিন এসি রিমোট দিয়ে কীভাবে এরর কোড চেক করবেন?',
        aEn: 'Hold the "Cancel" button on your Daikin remote for 5 seconds until "00" flashes. Press Cancel repeatedly until a continuous beep sounds—the code displayed on screen is your exact fault. Call us with this code at +91 6291674186 for instant repair.',
        aBn: 'রিমোটের Cancel বাটন ৫ সেকেন্ড চেপে ধরে রাখুন। এরপর বীপ শব্দ না হওয়া পর্যন্ত বাটন টিপুন—যে কোডটি পর্দায় আসবে সেটি আমাদের জানালে টেকনিশিয়ান সঠিক পার্টস নিয়ে পৌঁছাবেন।'
      },
      {
        qEn: 'What is the Daikin AC service phone number in Kolkata?',
        qBn: 'কলকাতায় ডাইকিন এসি সার্ভিসের ফোন নম্বর কোনটি?',
        aEn: 'Dial +91 6291674186 for immediate technician booking at flat ₹299 visit fee with 30-day warranty.',
        aBn: 'তাৎক্ষণিক বুকিংয়ের জন্য সরাসরি +91 6291674186 নম্বরে ডায়াল করুন।'
      },
      {
        qEn: 'Do you charge extra for Daikin R32 gas refill?',
        qBn: 'ডাইকিন R32 গ্যাস রিফিলের জন্য কি অতিরিক্ত চার্জ নেওয়া হয়?',
        aEn: 'No extra hidden charges. We quote pure R32 refrigerant charges upfront by cylinder weight after inspecting for leaks.',
        aBn: 'কোনো গোপন চার্জ নেই। আমরা ওজন মেপে খাঁটি R32 গ্যাস রিফিলের সঠিক মূল্য আগেই জানিয়ে দিই।'
      }
    ]
  },

  'mitsubishi': {
    slug: 'mitsubishi',
    name: 'Mitsubishi',
    headlineEn: 'Mitsubishi Heavy & Electric AC Repair Service in Kolkata & West Bengal',
    headlineBn: 'কলকাতায় মিৎসবিশি এসি মেরামত ও ডোরস্টেপ সার্ভিস সেন্টার সাপোর্ট',
    subheadlineEn: 'Expert repair for Mitsubishi Heavy Industries & Mitsubishi Electric Inverter ACs. Doorstep visit in 90 minutes with flat ₹299 inspection fee.',
    subheadlineBn: 'মিৎসবিশি হেভি ইন্ডাস্ট্রিজ ও মিৎসবিশি ইলেকট্রিক ইনভার্টার এসির বিশেষজ্ঞ ডোরস্টেপ সমাধান। মাত্র ₹২৯৯ ভিজিট ফিতে দ্রুত সার্ভিস।',
    coverageDescEn: 'Mitsubishi ACs deliver exceptional long-throw cooling and silent operation. Our technicians specialize in PAM inverter control boards, silent scroll compressor diagnostics, electronic expansion valves (EEV), and micro-leak repairs.',
    coverageDescBn: 'মিৎসবিশি এসি দীর্ঘস্থায়ী কুলিংয়ের জন্য সুপরিচিত। আমাদের প্রকৌশলীরা মিৎসবিশি পিএএম ইনভার্টার কন্ট্রোল বোর্ড, ইইভি ভালভ এবং স্ক্রোল কম্প্রেসার মেরামতে উচ্চ দক্ষতাসম্পন্ন।',
    errorCodes: [
      {
        code: 'Timer Light Blinking Sequence',
        issueEn: 'Timer light blinks 2, 5, or 6 times, indicating PCB or sensor error',
        issueBn: 'টাইমার লাইট ২, ৫ বা ৬ বার ব্লিংক করছে, যা পিসিবি বা সেন্সরের ত্রুটি নির্দেশ করে',
        solutionEn: 'Decode blink sequence, test indoor heat exchanger thermistor, and check fan motor feedback circuit.',
        solutionBn: 'ব্লিংক কোড মিলিয়ে হিট এক্সচেঞ্জার সেন্সর ও ফ্যান মোটরের ফিডব্যাক সার্কিট পরীক্ষা।'
      },
      {
        code: 'AC Tripping Circuit Breaker',
        issueEn: 'Main MCB switch trips immediately when compressor kicks in',
        issueBn: 'কম্প্রেসার চালু হওয়ার সাথে সাথেই মেইন সুইচ বা এমসিবি ট্রিপ করে যাচ্ছে',
        solutionEn: 'Check compressor winding insulation resistance with megohmmeter and test IPM power transistor.',
        solutionBn: 'মেগামিটার দিয়ে কম্প্রেসার কয়েলের ইনসুলেশন পরীক্ষা এবং পাওয়ার ট্রানজিস্টর চেক।'
      }
    ],
    searchedKeywords: [
      'mitsubishi service centre kolkata',
      'mitsubishi service centre near me',
      'mitsubishi service centre',
      'mitsubishi service centre chennai',
      'mitsubishi service centre number',
      'mitsubishi service centre mumbai',
      'mitsubishi customer care number',
      'mitsubishi customer care',
      'mitsubishi customer care toll free number',
      'mitsubishi customer care toll free number india',
      'mitsubishi customer care toll-free number',
      'mitsubishi ac repair near me',
      'mitsubishi ac repair and service near me',
      'mitsubishi ac repair',
      'mitsubishi ac repair complaint number',
      'mitsubishi ac repair & service mustgreen',
      'mitsubishi ac service',
      'mitsubishi ac service center near me',
      'mitsubishi ac service booking',
      'mitsubishi ac service toll free number',
      'mitsubishi ac service request online',
      'mitsubishi ac installation',
      'mitsubishi ac installation toll free number',
      'mitsubishi ac installation request',
      'mitsubishi ac installation charges',
      'mitsubishi ac installation india'
    ],
    faqs: [
      {
        qEn: 'Who repairs Mitsubishi Heavy Industries ACs in Kolkata?',
        qBn: 'কলকাতায় মিৎসবিশি হেভি ইন্ডাস্ট্রিজ এসি কারা মেরামত করে?',
        aEn: 'Our team of certified technicians provides complete doorstep service for both Mitsubishi Heavy and Mitsubishi Electric units across Kolkata, Howrah, and Salt Lake. Call +91 6291674186.',
        aBn: 'আমাদের সার্টিফাইড টেকনিশিয়ানরা সমগ্র কলকাতা, হাওড়া ও সল্টলেকে মিৎসবিশি এসির ডোরস্টেপ সার্ভিস দেন। কল করুন: +91 6291674186।'
      },
      {
        qEn: 'How much is the diagnosis fee for Mitsubishi AC?',
        qBn: 'মিৎসবিশি এসির রোগ নির্ণয় ফি কত?',
        aEn: 'Flat ₹299 inspection fee covers on-site multi-meter testing, gas pressure check, and error code diagnostics.',
        aBn: 'মাত্র ₹২৯৯ ফিতে টেকনিশিয়ান বাড়িতে এসে সম্পূর্ণ মাল্টিমিটার ও গ্যাস প্রেশার টেস্ট সম্পন্ন করেন।'
      }
    ]
  },

  'ifb': {
    slug: 'ifb',
    name: 'IFB',
    headlineEn: 'IFB Washing Machine, AC & Microwave Oven Service Centre Support in West Bengal',
    headlineBn: 'পশ্চিমবঙ্গে আইএফবি ওয়াশিং মেশিন, এসি ও মাইক্রোওয়েভ ওভেন সার্ভিস সেন্টার সাপোর্ট',
    subheadlineEn: 'Specialist doorstep technicians for IFB Front & Top Load Washers, Air Conditioners & Convection Microwaves. Fast 90-min visit with ₹299 diagnosis fee.',
    subheadlineBn: 'আইএফবি ফ্রন্ট ও টপ লোড ওয়াশিং মেশিন, এসি ও মাইক্রোওয়েভ ওভেনের সার্টিফাইড ডোরস্টেপ সার্ভিস। মাত্র ₹২৯৯ ভিজিট ফিতে দ্রুত সমাধান।',
    coverageDescEn: 'IFB is India’s foremost front-load washing machine and appliance pioneer. We repair IFB washing machine drum noise, spider arm fracture, error codes (dOOr, tAP, Pr5, E01, E02), AC cooling issues, and microwave heating failures.',
    coverageDescBn: 'আইএফবি ফ্রন্ট লোড ওয়াশিং মেশিনের ড্রাম ও বেয়ারিং সমস্যা, এরর কোড (dOOr, tAP, Pr5), এসির গ্যাস রিফিল এবং মাইক্রোওয়েভ ওভেনের খাবার গরম না হওয়ার ত্রুটি আমরা নিপুণভাবে সমাধান করি।',
    errorCodes: [
      {
        code: 'dOOr / tAP / Pr5 Error Codes',
        issueEn: 'Door lock not latching, no water inlet flow, or water pressure sensor failure',
        issueBn: 'দরজা লক না হওয়া, ড্রামে জল না আসা বা প্রেশার সেন্সরের ত্রুটি',
        solutionEn: 'Inspect door interlock switch, clean inlet solenoid filter mesh, and test pressure transducer.',
        solutionBn: 'ডোর ইন্টারলক সুইচ পরীক্ষা, ওয়াটার ইনলেট ভালভ ফিল্টার পরিষ্কার এবং প্রেশার সেন্সর পরিবর্তন।'
      },
      {
        code: 'Loud Rattling Drum Noise During Spin',
        issueEn: 'Violent shaking, screeching metal sound, or water leaking from rear drum',
        issueBn: 'স্পিনের সময় প্রচণ্ড কাঁপুনি, ধাতব ঘর্ষণের শব্দ বা ড্রামের পেছন থেকে জল পড়া',
        solutionEn: 'Disassemble tub, replace worn dual SKF bearings and oil seal, or install new aluminum spider arm.',
        solutionBn: 'ড্রাম খুলে নতুন এসকেএফ বেয়ারিং, অয়েল সিল ও স্পাইডার আর্ম প্রতিস্থাপন।'
      },
      {
        code: 'Microwave Running But Not Heating Food',
        issueEn: 'Turntable rotates and timer counts down but food remains cold',
        issueBn: 'ভেতরে প্লেট ঘুরছে এবং টাইমার চলছে কিন্তু খাবার বিন্দুমাত্র গরম হচ্ছে না',
        solutionEn: 'Test high voltage capacitor, diode rectifier, and replace burnt magnetron vacuum tube.',
        solutionBn: 'হাই ভোল্টেজ ক্যাপাসিটর ও ডায়োড পরীক্ষা এবং নতুন ম্যাগনেট্রন প্রতিস্থাপন।'
      }
    ],
    searchedKeywords: [
      'ifb customer care number',
      'ifb customer care',
      'ifb customer care toll free number india 24x7',
      'ifb customer care complaint',
      'ifb customer care whatsapp number',
      'ifb service centre kolkata',
      'ifb service centre kolkata, west bengal',
      'ifb service centre kolkata reviews',
      'ifb service centre kolkata contact number',
      'ifb service centre kolkata phone no',
      'ifb ac repair',
      'ifb ac repair near me',
      'ifb ac repair care',
      'ifb ac repair service center doorstep',
      'ifb ac repair centre',
      'ifb ac service',
      'ifb ac service booking',
      'ifb ac service centre near me',
      'ifb ac service request',
      'ifb ac service charges',
      'ifb fridge repair',
      'ifb refrigerator repair mumbai',
      'ifb refrigerator repair in ahmedabad',
      'ifb refrigerator repair',
      'ifb refrigerator repair pune',
      'ifb refrigerator repair in amritsar',
      'ifb washing machine',
      'ifb washing machine service',
      'ifb washing machine customer care number',
      'ifb washing machine top load',
      'ifb washing machine customer care',
      'ifb top load washing machine',
      'ifb top load washing machine 7kg',
      'ifb top load washing machine 8kg',
      'ifb top load washing machine error code lis',
      'ifb top load washing machine 9kg',
      'ifb front load washing machine',
      'ifb front load washing machine 8kg',
      'ifb front load washing machine 7kg',
      'ifb front load washing machine spare parts price list',
      'ifb front load washing machine error code list',
      'ifb front load washing machine repair',
      'ifb front load washing machine repair near me',
      'ifb micro oven',
      'ifb micro oven price',
      'ifb micro oven repair',
      'ifb micro oven service',
      'ifb micro oven customer care number',
      'ifb micro oven service centre',
      'ifb micro oven service centre near me'
    ],
    faqs: [
      {
        qEn: 'Why is my IFB washing machine making heavy noise on spin cycle?',
        qBn: 'আইএফবি ওয়াশিং মেশিন স্পিনের সময় বিকট শব্দ করছে কেন?',
        aEn: 'Heavy metallic roaring noise indicates worn-out drum bearings or a cracked spider arm. Our technician can rebuild the drum assembly with genuine SKF bearings and seals at your home. Call +91 6291674186.',
        aBn: 'এটি মূলত ড্রাম বেয়ারিং নষ্ট হওয়া বা স্পাইডার আর্ম ভেঙে যাওয়ার লক্ষণ। আমাদের টেকনিশিয়ান বাড়িতে এসেই জেনুইন বেয়ারিং ও সিল প্রতিস্থাপন করে দেন।'
      },
      {
        qEn: 'Why is my IFB microwave not heating food?',
        qBn: 'আইএফবি মাইক্রোওয়েভ ওভেনে খাবার গরম হচ্ছে না কেন?',
        aEn: 'This is usually caused by a blown high-voltage diode or a failed magnetron. Our technicians test the high-voltage circuit safely and replace magnetrons on-site.',
        aBn: 'হাই ভোল্টেজ ডায়োড বা ম্যাগনেট্রন খারাপ হলে এমন হয়। আমাদের প্রকৌশলী স্পটেই নিরাপদ টেস্ট করে ম্যাগনেট্রন বদলে দেন।'
      },
      {
        qEn: 'How do I call IFB doorstep technician in Kolkata?',
        qBn: 'কলকাতায় আইএফবি টেকনিশিয়ান ডাকার ফোন নম্বর কোনটি?',
        aEn: 'Call +91 6291674186 or WhatsApp us for same-day service across Kolkata with a flat ₹299 diagnosis fee.',
        aBn: 'একই দিনে সার্ভিসের জন্য সরাসরি +91 6291674186 নম্বরে কল করুন। ভিজিট ফি মাত্র ₹২৯৯।'
      }
    ]
  },

  'whirlpool': {
    slug: 'whirlpool',
    name: 'Whirlpool',
    headlineEn: 'Whirlpool Refrigerator, Washing Machine, AC & Microwave Repair in West Bengal',
    headlineBn: 'পশ্চিমবঙ্গে ওয়ার্লপুল ফ্রিজ, ওয়াশিং মেশিন, এসি ও মাইক্রোওয়েভ মেরামত সার্ভিস সাপোর্ট',
    subheadlineEn: 'Doorstep certified repair for Whirlpool 6th Sense Fridges, 360 BloomWash Washers, Split AC & Microwaves. Fast 90-min arrival with flat ₹299 inspection fee.',
    subheadlineBn: 'ওয়ার্লপুল সিক্সথ সেন্স ফ্রিজ, ওয়াশিং মেশিন ও এসির সার্টিফাইড ডোরস্টেপ সমাধান। কলকাতায় ৯০ মিনিটে আগমন ও মাত্র ₹২৯৯ ভিজিট ফি।',
    coverageDescEn: 'Whirlpool appliances feature intelligent 6th Sense technology. We provide expert troubleshooting for Whirlpool refrigerator defrost sensor failures, cooling loss, washing machine E1 water inlet errors, and AC servicing.',
    coverageDescBn: 'ওয়ার্লপুল সিক্সথ সেন্স রেফ্রিজারেটরের ডিফ্রোস্ট হিটার ফল্ট, নিচের চেম্বারে ঠান্ডা না হওয়া, ওয়াশিং মেশিনের E1 এরর কোড এবং এসির গ্যাস রিফিলে আমাদের দীর্ঘ অভিজ্ঞতা রয়েছে।',
    errorCodes: [
      {
        code: 'Lower Refrigerator Compartment Warm',
        issueEn: 'Freezer has ice but lower fresh food section is warm, spoiling milk and vegetables',
        issueBn: 'ডিপে বরফ আছে কিন্তু নিচের খাবারের চেম্বার গরম, যার ফলে দুধ ও শাকসবজি নষ্ট হচ্ছে',
        solutionEn: 'Inspect air damper motor flap, test defrost bimetal sensor and timer, and clear frozen air duct.',
        solutionBn: 'এয়ার ড্যাম্পার মোটর পরীক্ষা, ডিফ্রস্ট সেন্সর চেক এবং জমে থাকা বরফের নালী পরিষ্কার।'
      },
      {
        code: 'Washing Machine E1 Error',
        issueEn: 'Water inlet timeout error - washer stops and beeps while filling water',
        issueBn: 'ওয়াটার ইনলেট এরর - জল ভরার সময় ওয়াশিং মেশিন থেমে গিয়ে বীপ শব্দ করা',
        solutionEn: 'Clean clogged inlet valve filter mesh, test solenoid coil continuity, and inspect water pressure.',
        solutionBn: 'ইনলেট পাইপের ছাঁকনি পরিষ্কার, সলেনয়েড কয়েল পরীক্ষা এবং জলের প্রেসার চেক।'
      },
      {
        code: 'AC Compressor Tripping After 2 Minutes',
        issueEn: 'Compressor starts with a hum but trips off quickly with clicking noise',
        issueBn: 'কম্প্রেসার চালু হওয়ার চেষ্টা করে ক্লিক শব্দ করে সঙ্গে সঙ্গে বন্ধ হয়ে যাওয়া',
        solutionEn: 'Test startup capacitor, inspect overload protector (OLP), and measure motor winding ohms.',
        solutionBn: 'স্টার্ট ক্যাপাসিটর টেস্ট, ওএলপি প্রোটেক্টর পরিবর্তন এবং কম্প্রেসার ওয়াইন্ডিং চেক।'
      }
    ],
    searchedKeywords: [
      'whirlpool service centre kolkata',
      'whirlpool service centre kolkata phone number',
      'whirlpool service centre kolkata, west bengal',
      'whirlpool service centre kolkata west bengal',
      'whirlpool service centre kolkata contact number',
      'whirlpool authorised service centre',
      'whirlpool authorised service centre near me',
      'whirlpool authorised service centre chennai',
      'whirlpool customer care number',
      'whirlpool customer care',
      'whirlpool customer care number 24x7 near me',
      'whirlpool customer care number 24x7',
      'whirlpool customer care toll free number',
      'whirlpool ac repair',
      'whirlpool ac repair near me',
      'whirlpool ac repair service',
      'whirlpool ac repair service near me',
      'whirlpool ac repair services',
      'whirlpool fridge repair',
      'whirlpool fridge repair near me',
      'whirlpool fridge repair service centre',
      'whirlpool fridge repair service near me',
      'whirlpool fridge repair service',
      'whirlpool refrigerator repair',
      'whirlpool refrigerator repair near me',
      'whirlpool refrigerator repair service near me',
      'whirlpool refrigerator repair centre',
      'whirlpool refrigerator repair service',
      'whirlpool washing machine repair',
      'whirlpool washing machine repair near me',
      'whirlpool washing machine repair service',
      'whirlpool washing machine repair pune',
      'whirlpool washing machine repair hyderabad',
      'whirlpool top load washing machine',
      'whirlpool top load washing machine 7kg',
      'whirlpool top load washing machine e1 error',
      'whirlpool top load washing machine 8kg',
      'whirlpool top load washing machine price',
      'whirlpool micro oven',
      'whirlpool micro oven price',
      'whirlpool micro oven service centre',
      'whirlpool micro oven service center in hyderabad',
      'whirlpool micro oven combo'
    ],
    faqs: [
      {
        qEn: 'Why is the bottom section of my Whirlpool fridge warm?',
        qBn: 'ওয়ার্লপুল ফ্রিজের নিচের অংশ ঠান্ডা হচ্ছে না কেন?',
        aEn: 'In frost-free double door fridges, this happens when the defrost sensor fails, causing frost to choke the air duct leading to the lower section. Our technician can defrost the vent and replace the faulty sensor on-site. Call +91 6291674186.',
        aBn: 'ডিফ্রস্ট সেন্সর খারাপ হলে বরফ জমে নিচের চেম্বারের বাতাস চলাচলের পথ বন্ধ হয়ে যায়। আমাদের টেকনিশিয়ান স্পটেই সেন্সর বদলে দেন।'
      },
      {
        qEn: 'What does E1 error mean on Whirlpool washing machine?',
        qBn: 'ওয়ার্লপুল ওয়াশিং মেশিনে E1 এরর কোডের মানে কী?',
        aEn: 'E1 indicates water is not entering the machine within expected time, usually due to a clogged tap filter or faulty inlet valve. Our technician cleans and replaces the valve in minutes.',
        aBn: 'E1 হলো জল ঠিকমতো মেশিনে না ঢোকার সংকেত। সাধারণত পাইপের ফিল্টারে ময়লা জমলে বা ইনলেট ভালভ নষ্ট হলে এমন হয়।'
      },
      {
        qEn: 'What is the Whirlpool customer service booking number in Kolkata?',
        qBn: 'কলকাতায় ওয়ার্লপুল সার্ভিসের বুকিং নম্বর কোনটি?',
        aEn: 'Call +91 6291674186 or WhatsApp us for instant doorstep repair with a 30-day warranty.',
        aBn: 'সরাসরি কল করুন +91 6291674186 অথবা হোয়াটসঅ্যাপে বুক করুন।'
      }
    ]
  },

  'hitachi': {
    slug: 'hitachi',
    name: 'Hitachi',
    headlineEn: 'Hitachi AC & Inverter Refrigerator Repair in Kolkata & West Bengal',
    headlineBn: 'কলকাতায় হিটাচি এসি ও ইনভার্টার ফ্রিজ মেরামত সার্ভিস সেন্টার সাপোর্ট',
    subheadlineEn: 'Certified doorstep service for Hitachi Kashikoi Inverter AC, French Door & Multi-Door Refrigerators. Express 90-min visit with flat ₹299 diagnosis fee.',
    subheadlineBn: 'হিটাচি ইনভার্টার এসি ও মাল্টি-ডোর ফ্রিজের দক্ষ ডোরস্টেপ সমাধান। কলকাতায় ৯০ মিনিটে আগমন ও মাত্র ₹২৯৯ ডায়াগনোসিস ফি।',
    coverageDescEn: 'Hitachi appliances are renowned for high Japanese engineering standards. We provide specialized repairs for Hitachi Expandable Inverter ACs, Dual Fan Refrigerator defrost systems, inverter PCB motherboards, and fan motor replacements.',
    coverageDescBn: 'হিটাচি জাপানি প্রযুক্তির বিশ্বস্ত ব্র্যান্ড। হিটাচি এক্সপ্যান্ডেবল ইনভার্টার এসি, ডুয়াল ফ্যান ফ্রিজের ডিফ্রস্ট সিস্টেম এবং পিসিবি মাদারবোর্ড মেরামতে আমাদের প্রকৌশলীরা বিশেষভাবে প্রশিক্ষিত।',
    errorCodes: [
      {
        code: 'Hitachi AC Filter / Clean LED Blinking',
        issueEn: 'Timer and filter indicator blinking in sequence, compressor stops cooling',
        issueBn: 'টাইমার ও ফিল্টার লাইট একনাগাড়ে ব্লিংক করছে এবং কম্প্রেসার বন্ধ হয়ে গেছে',
        solutionEn: 'Perform PCB fault retrieval, clean electrostatic air filters, and reset microcontroller safety lock.',
        solutionBn: 'পিসিবি ফল্ট কোড চেক, এয়ার ফিল্টার গভীর পরিষ্কার এবং মাইক্রোকন্ট্রোলার রিসেট।'
      },
      {
        code: 'Inverter Fridge Temperature Fluctuation',
        issueEn: 'Freezer temperature warming intermittently and digital temperature panel flashing',
        issueBn: 'ফ্রিজের তাপমাত্রা ঘন ঘন ওঠা-নামা করা এবং ডিজিটাল প্যানেল ফ্লাশ হওয়া',
        solutionEn: 'Test dual evaporator thermistors, calibrate inverter frequency driver, and inspect fan motor.',
        solutionBn: 'ইভাপোরেটর থার্মিস্টর পরীক্ষা, ইনভার্টার ড্রাইভার ক্যালিব্রেশন এবং ফ্যান মোটর চেক।'
      }
    ],
    searchedKeywords: [
      'hitachi customer support',
      'hitachi customer support number',
      'hitachi customer support india',
      'hitachi customer support contact',
      'hitachi customer support email id',
      'hitachi service centre kolkata',
      'hitachi service centre kolkata phone number',
      'hitachi service centre kolkata contact no',
      'hitachi service centre kolkata, west bengal',
      'hitachi ac repair',
      'hitachi ac repair near me',
      'hitachi ac repair service',
      'hitachi ac repair customer care number',
      'hitachi ac repair service near me',
      'hitachi ac installation',
      'hitachi ac installation charges',
      'hitachi ac installation customer care number',
      'hitachi ac installation toll free number',
      'hitachi ac installation number',
      'hitachi fridge repair',
      'hitachi fridge repair near me',
      'hitachi fridge repair service centre',
      'hitachi fridge repair in mumbai',
      'hitachi inverter fridge',
      'hitachi inverter fridge freezer',
      'hitachi inverter fridge temperature control',
      'hitachi inverter fridge pcb',
      'hitachi inverter fridge 3 door',
      'hitachi double door refrigerator',
      'hitachi double door refrigerator size',
      'hitachi double door refrigerator+price in india',
      'hitachi double door refrigerator price',
      'hitachi double door refrigerator india'
    ],
    faqs: [
      {
        qEn: 'How to fix Hitachi inverter fridge cooling and PCB issues?',
        qBn: 'হিটাচি ইনভার্টার ফ্রিজের কুলিং ও পিসিবি সমস্যা কীভাবে সমাধান করবেন?',
        aEn: 'Hitachi inverter refrigerators require specialized voltage diagnostic tools. Our senior technicians carry genuine sensors and PCB components to troubleshoot and repair on-site. Call +91 6291674186.',
        aBn: 'হিটাচি ইনভার্টার ফ্রিজে বিশেষায়িত ডায়াগনোসিস প্রয়োজন। আমাদের সিনিয়র টেকনিশিয়ানরা স্পটেই টেস্ট করে সমাধান করে দেন।'
      },
      {
        qEn: 'What is the Hitachi AC repair number in Kolkata?',
        qBn: 'কলকাতায় হিটাচি এসি মেরামতের ফোন নম্বর কোনটি?',
        aEn: 'Dial +91 6291674186 or WhatsApp us for fast 90-minute doorstep service across Kolkata and West Bengal.',
        aBn: 'সরাসরি ডায়াল করুন: +91 6291674186।'
      }
    ]
  },

  'voltas': {
    slug: 'voltas',
    name: 'Voltas',
    headlineEn: 'Voltas AC & Beko Refrigerator Repair & Service Centre Support in Kolkata & West Bengal',
    headlineBn: 'কলকাতায় ভোল্টাস এসি ও বেকো ফ্রিজ মেরামত ও ডোরস্টেপ সার্ভিস সেন্টার সাপোর্ট',
    subheadlineEn: 'Certified doorstep service for Voltas Inverter AC, Maha Adjustable Split AC, Window AC & Beko Fridges. 90-min arrival across Kolkata with flat ₹299 visit fee.',
    subheadlineBn: 'ভোল্টাস ইনভার্টার এসি, স্প্লিট ও উইন্ডো এসি এবং বেকো রেফ্রিজারেটরের নির্ভরযোগ্য ডোরস্টেপ সার্ভিস। কলকাতায় ৯০ মিনিটে আগমন ও মাত্র ₹২৯৯ ভিজিট ফি।',
    coverageDescEn: 'Voltas is India’s most popular air conditioning brand. Our certified engineers specialize in Voltas inverter PCB board repairs, rotary compressor capacitor replacements, pure R32/R410A gas refilling, and cooling restoration.',
    coverageDescBn: 'ভোল্টাস ভারতের সর্বাধিক বিক্রিত এসি ব্র্যান্ড। ভোল্টাস ইনভার্টার পিসিবি মেরামত, কম্প্রেসার ক্যাপাসিটর পরিবর্তন, সঠিক গ্যাস চার্জিং এবং সম্পূর্ণ কুলিং পুনরুদ্ধারে আমাদের দীর্ঘ অভিজ্ঞতা রয়েছে।',
    errorCodes: [
      {
        code: 'E6 / F1 Error Code',
        issueEn: 'Communication error between indoor and outdoor PCBs or DC fan motor stall',
        issueBn: 'ইনডোর ও আউটডোর সার্কিট বোর্ডের সিগন্যাল বিচ্ছিন্ন বা ফ্যান মোটর সমস্যা',
        solutionEn: 'Inspect connecting communication wiring, test outdoor motherboard DC bus voltage, and service brushless fan motor.',
        solutionBn: 'কমিউনিকেশন ওয়্যার টেস্ট, আউটডোর মাদারবোর্ড ভোল্টেজ পরীক্ষা এবং ফ্যান মোটর মেরামত।'
      },
      {
        code: 'Fan Running But Not Cooling',
        issueEn: 'Indoor blower works normally but room does not cool and outdoor compressor does not kick in',
        issueBn: 'ইনডোর ফ্যান চলছে কিন্তু ঘর ঠান্ডা হচ্ছে না, আউটডোর কম্প্রেসার চালু হচ্ছে না',
        solutionEn: 'Test dual-run start capacitor, overload protector (OLP), and test refrigerant suction pressure with manifold gauge.',
        solutionBn: 'ক্যাপাসিটর ও ওএলপি পরীক্ষা এবং গ্যাস প্রেশার গেজ দিয়ে লিকেজ ও গ্যাসের পরিমাণ চেক।'
      },
      {
        code: 'Water Dripping from Indoor Unit',
        issueEn: 'Water overflowing from drain tray and dripping on wall or floor',
        issueBn: 'ইনডোর ড্রেন ট্রে থেকে জল উপচে ঘরের মেঝে বা দেয়ালে পড়া',
        solutionEn: 'Clear algae and dust block from drain hose using pressure pump and check unit horizontal level.',
        solutionBn: 'প্রেসার পাম্প দিয়ে ড্রেন পাইপের ময়লা পরিষ্কার এবং এসির ব্যাকপ্লেট লেভেলিং।'
      }
    ],
    searchedKeywords: [
      'voltas service centre',
      'voltas service centre number',
      'voltas service centre near me',
      'voltas service centre kolkata',
      'voltas service centre kolkata contact number',
      'voltas customer care number',
      'voltas customer care',
      'voltas customer care number 24x7',
      'voltas customer care toll free number india',
      'voltas customer care whatsapp number',
      'voltas customer care kolkata',
      'voltas ac repair near me',
      'voltas ac repair',
      'voltas ac repair service',
      'voltas ac repair complaint number',
      'voltas ac service kolkata',
      'voltas ac service near me',
      'voltas ac service request',
      'voltas ac service charges',
      'voltas ac not cooling',
      'voltas ac not cooling but fan is running',
      'voltas ac not cooling properly',
      'voltas ac not working with remote',
      'voltas ac water dripping inside',
      'voltas ac inverter 1.5 ton error code',
      'voltas ac e6 error code',
      'voltas ac f1 error code',
      'voltas ac gas refilling charges kolkata',
      'voltas fridge repair near me',
      'voltas beko refrigerator customer care',
      'voltas beko double door fridge not cooling'
    ],
    faqs: [
      {
        qEn: 'Why is my Voltas AC fan running but not cooling?',
        qBn: 'ভোল্টাস এসির ফ্যান চলছে কিন্তু ঠান্ডা হচ্ছে না কেন?',
        aEn: 'This commonly happens when the compressor capacitor fails, cooling gas leaks, or the outdoor coil is choked with dirt. Our technician diagnoses this on-site for flat ₹299. Call +91 6291674186.',
        aBn: 'কম্প্রেসার ক্যাপাসিটর খারাপ হলে বা গ্যাস লিকেজ হলে এমন হয়। আমাদের টেকনিশিয়ান মাত্র ₹২৯৯ পরিদর্শনে বাড়িতে এসে সঠিক কারণ নির্ণয় করেন।'
      },
      {
        qEn: 'What does E6 error code mean in Voltas inverter AC?',
        qBn: 'ভোল্টাস ইনভার্টার এসিতে E6 এরর কোডের অর্থ কী?',
        aEn: 'E6 indicates communication failure between the indoor display board and the outdoor inverter PCB. Our technicians carry genuine testing tools and replacement boards.',
        aBn: 'E6 হলো ইনডোর ও আউটডোর সার্কিট বোর্ডের যোগাযোগ বিচ্ছিন্ন হওয়ার লক্ষণ। আমাদের প্রকৌশলীরা স্পটেই টেস্ট করে এটি সমাধান করেন।'
      },
      {
        qEn: 'How to contact for Voltas AC doorstep repair in Kolkata?',
        qBn: 'কলকাতায় ভোল্টাস এসি মেরামতের জন্য কীভাবে যোগাযোগ করবেন?',
        aEn: 'Call our direct helpline +91 6291674186 or tap WhatsApp. Certified multi-brand technicians arrive in 90 minutes.',
        aBn: 'সরাসরি আমাদের হেল্পলাইন +91 6291674186 নম্বরে কল করুন। ৯০ মিনিটের মধ্যে টেকনিশিয়ান পৌঁছে যাবেন।'
      }
    ]
  },

  'samsung': {
    slug: 'samsung',
    name: 'Samsung',
    headlineEn: 'Samsung AC, Refrigerator, Washing Machine & TV Service Centre Support in West Bengal',
    headlineBn: 'পশ্চিমবঙ্গে স্যামসাং এসি, ফ্রিজ, ওয়াশিং মেশিন ও টিভি ডোরস্টেপ সার্ভিস সেন্টার সাপোর্ট',
    subheadlineEn: 'Certified multi-brand doorstep specialists for Samsung Digital Inverter AC, Curd Maestro Fridge, EcoBubble Washers & Crystal 4K LED TV. 90-min arrival with ₹299 diagnosis fee.',
    subheadlineBn: 'স্যামসাং ডিজিটাল ইনভার্টার এসি, ফ্রিজ, ইকো-বাবল ওয়াশিং মেশিন ও স্মার্ট টিভির বিশেষজ্ঞ ডোরস্টেপ সমাধান। কলকাতায় ৯০ মিনিটে আগমন ও মাত্র ₹২৯৯ ভিজিট ফি।',
    coverageDescEn: 'Samsung home appliances feature advanced smart inverter tech. We provide certified repairs for Samsung washing machine 4E/5E/dE error codes, refrigerator defrost problems, AC C4 sensor errors, and LED TV display panel repairs.',
    coverageDescBn: 'স্যামসাং ওয়াশিং মেশিনের 4E/5E/dE এরর কোড, ফ্রিজের নিচের চেম্বার ঠান্ডা না হওয়া, ইনভার্টার এসির গ্যাস রিফিল এবং স্মার্ট টিভির ডিসপ্লে প্যানেল সমস্যার জন্য আমরা অভিজ্ঞ প্রকৌশলী দিয়ে তাৎক্ষণিক সেবা দিই।',
    errorCodes: [
      {
        code: '4E / 5E Error Code (Washer)',
        issueEn: 'Water inlet timeout error (4E) or drainage failure error (5E) on washer display',
        issueBn: 'ওয়াশিং মেশিনে জল না ঢোকা (4E) অথবা ড্রেন না হওয়া (5E) এরর কোড',
        solutionEn: 'Clean inlet mesh filter, test solenoid water valve, inspect drain filter and test drain pump motor.',
        solutionBn: 'ইনলেট ফিল্টার পরিষ্কার, সলেনয়েড ভালভ টেস্ট এবং ড্রেন পাম্প মোটর চেক।'
      },
      {
        code: 'dE / 1E Error Code (Washer)',
        issueEn: 'Door lock error (dE) or water level sensor pressure fault (1E)',
        issueBn: 'দরজা লক না হওয়া (dE) অথবা জলের প্রেসার সেন্সরের ত্রুটি (1E)',
        solutionEn: 'Replace door latch interlock switch and recalibrate frequency water pressure sensor.',
        solutionBn: 'ডোর ইন্টারলক সুইচ প্রতিস্থাপন এবং ওয়াটার লেভেল প্রেসার সেন্সর পরিবর্তন।'
      },
      {
        code: 'C4 Error / AC Not Cooling',
        issueEn: 'Indoor heat exchanger thermistor sensor open/short circuit, compressor shuts down',
        issueBn: 'ইনডোর হিট এক্সচেঞ্জার সেন্সর ফল্ট, যার ফলে কম্প্রেসার বন্ধ হয়ে যায়',
        solutionEn: 'Replace copper coil thermistor sensor and check communication line to outdoor unit.',
        solutionBn: 'কপার কয়েল থার্মিস্টর সেন্সর পরিবর্তন এবং আউটডোর কমিউনিকেশন লাইন পরীক্ষা।'
      },
      {
        code: 'Double Door Fridge Lower Chamber Warm',
        issueEn: 'Freezer creates frost but fresh food compartment is warm and food spoils',
        issueBn: 'ডিপ ফ্রিজে বরফ জমছে কিন্তু নিচের অংশে ঠান্ডা নেই ও খাবার নষ্ট হচ্ছে',
        solutionEn: 'Test defrost heater bimetal, thermal fuse, and clear ice choked damper air passage.',
        solutionBn: 'ডিফ্রস্ট হিটার ও থার্মাল ফিউজ টেস্ট এবং বরফ জমে বন্ধ হয়ে যাওয়া এয়ার নালী পরিষ্কার।'
      }
    ],
    searchedKeywords: [
      'samsung service centre',
      'samsung service centre near me',
      'samsung service centre kolkata',
      'samsung service centre kolkata phone number',
      'samsung customer care number',
      'samsung customer care',
      'samsung customer care number 24x7',
      'samsung customer care whatsapp number',
      'samsung ac repair near me',
      'samsung ac repair kolkata',
      'samsung ac not cooling',
      'samsung ac inverter error code list',
      'samsung ac c4 error code',
      'samsung ac gas refilling charges',
      'samsung fridge repair near me',
      'samsung fridge repair kolkata',
      'samsung refrigerator customer care number',
      'samsung double door fridge not cooling bottom',
      'samsung inverter fridge blinking light error',
      'samsung washing machine customer care number',
      'samsung washing machine repair near me',
      'samsung washing machine service kolkata',
      'samsung top load washing machine 4e error',
      'samsung top load washing machine 5e error',
      'samsung front load washing machine repair',
      'samsung front load washing machine dE error',
      'samsung front load washing machine 1E error',
      'samsung microwave oven repair near me',
      'samsung microwave oven not heating',
      'samsung led tv repair kolkata',
      'samsung tv screen black sound coming',
      'samsung smart tv display lines repair'
    ],
    faqs: [
      {
        qEn: 'How to fix 4E or 5E error on Samsung washing machine?',
        qBn: 'স্যামসাং ওয়াশিং মেশিনের 4E বা 5E এরর কীভাবে ঠিক করবেন?',
        aEn: '4E means no water is entering due to tap blockage or faulty inlet valve; 5E means water is not draining due to choked filter or pump failure. Our technician resolves this at your home. Call +91 6291674186.',
        aBn: '4E হলো জল না ঢোকার ত্রুটি এবং 5E হলো জল ড্রেন না হওয়ার সমস্যা। আমাদের টেকনিশিয়ান স্পটেই ড্রেন পাম্প বা ভালভ ঠিক করে দেন।'
      },
      {
        qEn: 'Why is the lower section of my Samsung fridge not cooling?',
        qBn: 'স্যামসাং ফ্রিজের নিচের অংশ ঠান্ডা হচ্ছে না কেন?',
        aEn: 'In frost-free double door fridges, a burnt defrost heater or faulty sensor causes frost to block the cold air chute to the bottom. We replace the sensor on-site with a 30-day warranty.',
        aBn: 'ডিফ্রস্ট হিটার বা সেন্সর খারাপ হলে বরফ জমে নিচের চেম্বারে ঠান্ডা যাওয়া বন্ধ হয়ে যায়। আমরা স্পটেই নতুন সেন্সর লাগিয়ে দিই।'
      },
      {
        qEn: 'What is the Samsung appliance repair customer number in Kolkata?',
        qBn: 'কলকাতায় স্যামসাং অ্যাপ্লায়েন্স মেরামতের ফোন নম্বর কোনটি?',
        aEn: 'Call +91 6291674186 or WhatsApp for same-day doorstep technician visit with transparent ₹299 inspection fee.',
        aBn: 'একই দিনে ডোরস্টেপ সার্ভিসের জন্য সরাসরি কল করুন +91 6291674186 নম্বরে। পরিদর্শন ফি মাত্র ₹২৯৯।'
      }
    ]
  },

  'lg': {
    slug: 'lg',
    name: 'LG',
    headlineEn: 'LG Dual Inverter AC, Refrigerator, Washing Machine & TV Repair Service in West Bengal',
    headlineBn: 'পশ্চিমবঙ্গে এলজি ডুয়াল ইনভার্টার এসি, ফ্রিজ, ওয়াশিং মেশিন ও টিভি সার্ভিস সাপোর্ট',
    subheadlineEn: 'Express 90-min doorstep service for LG Smart Inverter AC, Door-in-Door Refrigerator, AI DD Washers & OLED/NanoCell TV. Flat ₹299 visit fee.',
    subheadlineBn: 'এলজি ডুয়াল ইনভার্টার এসি, স্মার্ট ফ্রিজ, এআই ওয়াশিং মেশিন ও এলইডি টিভির দক্ষ ডোরস্টেপ সমাধান। মাত্র ₹২৯৯ পরিদর্শনে দ্রুত সার্ভিস।',
    coverageDescEn: 'LG appliances lead in inverter motor and compressor reliability. We resolve LG Dual Inverter AC CH05/CH10 error codes, washing machine OE/IE/UE errors, Linear Inverter fridge cooling issues, and LED TV backlight faults.',
    coverageDescBn: 'এলজি ডুয়াল ইনভার্টার এসির CH05/CH10 এরর কোড, ওয়াশিং মেশিনের OE/IE/UE ড্রেন ও স্পিন ত্রুটি, লিনিয়ার ইনভার্টার ফ্রিজের গ্যাস লিকেজ এবং এলইডি টিভির ব্যাকলাইট সমস্যায় আমাদের বিশেষ দক্ষতা রয়েছে।',
    errorCodes: [
      {
        code: 'CH05 / CH10 Error Code (AC)',
        issueEn: 'Communication breakdown between indoor and outdoor unit (CH05) or fan motor lock (CH10)',
        issueBn: 'ইউনিটদ্বয়ের মধ্যে যোগাযোগ ত্রুটি (CH05) অথবা ফ্যান মোটর জ্যাম (CH10)',
        solutionEn: 'Check 230V communication signal continuity, test outdoor inverter PCB driver, and replace faulty BLDC motor.',
        solutionBn: 'কমিউনিকেশন ওয়্যার টেস্ট, আউটডোর ইনভার্টার পিসিবি চেক এবং বিএলডিসি ফ্যান মোটর মেরামত।'
      },
      {
        code: 'OE / IE / dE Error Code (Washer)',
        issueEn: 'OE (water drain failure), IE (water inlet failure), or dE (door lock latch failure)',
        issueBn: 'OE (জল ড্রেন না হওয়া), IE (জল না ঢোকা), বা dE (দরজা লক না হওয়া)',
        solutionEn: 'Unclog drain pump coin trap, inspect inlet water valve solenoid, and replace door switch.',
        solutionBn: 'ড্রেন ফিল্টার পরিষ্কার, ওয়াটার ইনলেট ভালভ পরিবর্তন এবং ডোর লক সুইচ মেরামত।'
      },
      {
        code: 'UE Error Code (Washer Spin)',
        issueEn: 'Unbalanced load error during spin cycle, washing machine violently shaking and stopping',
        issueBn: 'স্পিনের সময় ভারসাম্যহীন লোড (UE), মেশিন প্রচণ্ড কেঁপে থেমে যাওয়া',
        solutionEn: 'Inspect tub suspension dampers/springs, balance load, and test hall sensor.',
        solutionBn: 'ড্রামের সাসপেনশন ড্যাম্পার স্প্রিং পরীক্ষা এবং হল সেন্সর চেক।'
      }
    ],
    searchedKeywords: [
      'lg service centre',
      'lg service centre near me',
      'lg service centre kolkata',
      'lg service centre kolkata phone number',
      'lg customer care number',
      'lg customer care',
      'lg customer care number 24x7',
      'lg customer care toll free number india',
      'lg customer care whatsapp number',
      'lg ac repair near me',
      'lg ac repair kolkata',
      'lg ac service request online',
      'lg dual inverter ac not cooling',
      'lg ac ch05 error code',
      'lg ac ch10 error code',
      'lg ac ch21 error code',
      'lg ac remote not working',
      'lg fridge repair near me',
      'lg refrigerator customer care number',
      'lg double door fridge cooling problem',
      'lg linear inverter fridge compressor repair',
      'lg washing machine customer care number',
      'lg washing machine repair near me',
      'lg washing machine service kolkata',
      'lg top load washing machine OE error',
      'lg top load washing machine IE error',
      'lg top load washing machine dE error',
      'lg front load washing machine repair',
      'lg front load washing machine UE error',
      'lg microwave oven repair near me',
      'lg microwave oven service centre kolkata',
      'lg led tv screen repair kolkata',
      'lg smart tv horizontal lines on screen'
    ],
    faqs: [
      {
        qEn: 'What does CH05 error mean in LG Dual Inverter AC?',
        qBn: 'এলজি ডুয়াল ইনভার্টার এসিতে CH05 এরর কোডের অর্থ কী?',
        aEn: 'CH05 indicates a communication fault between indoor and outdoor units due to wiring damage or PCB failure. Our technicians diagnose and resolve this on-site. Call +91 6291674186.',
        aBn: 'CH05 হলো ইনডোর ও আউটডোরের মধ্যে সংকেত আদান-প্রদান বন্ধ হওয়া। আমাদের টেকনিশিয়ান স্পটেই তার ও পিসিবি চেক করে ঠিক করে দেন।'
      },
      {
        qEn: 'How to clear OE or IE error on LG washing machine?',
        qBn: 'এলজি ওয়াশিং মেশিনে OE বা IE এরর কীভাবে ঠিক করবেন?',
        aEn: 'OE means drain blockage while IE means water is not filling. Our technician cleans the blocked filter or replaces the faulty pump/valve at your home.',
        aBn: 'OE ড্রেন পাইপ বা ফিল্টারে ময়লা জমার লক্ষণ এবং IE জল না ঢোকার সংকেত। আমাদের টেকনিশিয়ান স্পটেই পরিষ্কার বা পার্টস বদলে দেন।'
      },
      {
        qEn: 'How can I book LG appliance repair in Kolkata?',
        qBn: 'কলকাতায় এলজি অ্যাপ্লায়েন্স মেরামতের জন্য কীভাবে বুক করবেন?',
        aEn: 'Dial +91 6291674186 or WhatsApp us for instant doorstep dispatch with a 30-day warranty.',
        aBn: 'সরাসরি কল করুন +91 6291674186 অথবা হোয়াটসঅ্যাপে মেসেজ পাঠান।'
      }
    ]
  },

  'carrier': {
    slug: 'carrier',
    name: 'Carrier',
    headlineEn: 'Carrier AC Repair & Service Centre Support in Kolkata & West Bengal',
    headlineBn: 'কলকাতায় ক্যারিয়ার এসি মেরামত ও ডোরস্টেপ সার্ভিস সেন্টার সাপোর্ট',
    subheadlineEn: 'Professional repair for Carrier Inverter, Split, Window & Cassette AC units. 90-min doorstep arrival across Kolkata with flat ₹299 inspection fee.',
    subheadlineBn: 'ক্যারিয়ার ইনভার্টার, স্প্লিট, উইন্ডো ও ক্যাসেট এসির সার্টিফাইড ডোরস্টেপ সমাধান। কলকাতায় ৯০ মিনিটে আগমন ও মাত্র ₹২৯৯ ভিজিট ফি।',
    coverageDescEn: 'Carrier is an iconic global air conditioning pioneer. We specialize in Carrier inverter AC E1/E4 error code diagnostics, compressor protection tripping, copper coil leak repairs, and precise R32/R410A gas recharging.',
    coverageDescBn: 'ক্যারিয়ার বিশ্বজুড়ে এয়ার কন্ডিশনারের পথিকৃৎ। ক্যারিয়ার ইনভার্টার এসির E1/E4 এরর কোড, কম্প্রেসার ট্রিপিং, কপার কয়েল লিকেজ মেরামত এবং নিখুঁত গ্যাস রিফিলে আমাদের টেকনিশিয়ানরা বিশেষভাবে প্রশিক্ষিত।',
    errorCodes: [
      {
        code: 'E1 / E4 Error Code',
        issueEn: 'Room temperature sensor malfunction (E1) or outdoor compressor high-pressure protection (E4)',
        issueBn: 'রুম টেম্পারেচার সেন্সর ফল্ট (E1) অথবা আউটডোর কম্প্রেসারে হাই-প্রেশার প্রোটেকশন (E4)',
        solutionEn: 'Test sensor resistance, clean clogged condenser coil, and balance refrigerant charge.',
        solutionBn: 'সেন্সর রেজিস্ট্যান্স পরিমাপ, আউটডোর কয়েল জেট ওয়াশ এবং সঠিক গ্যাসের চাপ নিশ্চিতকরণ।'
      },
      {
        code: 'Fan Running But Not Cooling',
        issueEn: 'Blower pushes ambient room air without cooling, outdoor compressor does not start',
        issueBn: 'ইনডোর ফ্যান চলছে কিন্তু সাধারণ বাতাস বের হচ্ছে, কম্প্রেসার অন হচ্ছে না',
        solutionEn: 'Test dual-run capacitor, start relay, and check for refrigerant gas leakage.',
        solutionBn: 'রান ক্যাপাসিটর টেস্ট, স্টার্ট রিলে পরীক্ষা এবং গ্যাসের চাপ চেক করা।'
      }
    ],
    searchedKeywords: [
      'carrier service centre',
      'carrier service centre number',
      'carrier service centre near me',
      'carrier service centre kolkata',
      'carrier service centre kolkata contact number',
      'carrier customer care number',
      'carrier customer care',
      'carrier customer care number 24x7',
      'carrier customer care toll free number india',
      'carrier ac repair near me',
      'carrier ac repair',
      'carrier ac repair service',
      'carrier ac repair complaint number',
      'carrier ac service kolkata',
      'carrier ac service near me',
      'carrier ac service request online',
      'carrier ac installation charges',
      'carrier ac not cooling',
      'carrier ac not cooling but fan is running',
      'carrier inverter ac e1 error code',
      'carrier inverter ac e4 error code',
      'carrier ac remote setting for cooling',
      'carrier ac gas charging charges kolkata',
      'carrier cassette ac service kolkata'
    ],
    faqs: [
      {
        qEn: 'Why is my Carrier AC not cooling though the fan is working?',
        qBn: 'ক্যারিয়ার এসির ফ্যান চলছে কিন্তু ঠান্ডা হচ্ছে না কেন?',
        aEn: 'Usually caused by a weak compressor capacitor or gas leakage. Our technician tests this on-site with a flat ₹299 inspection fee. Call +91 6291674186.',
        aBn: 'ক্যাপাসিটর দুর্বল হলে বা গ্যাস লিকেজ হলে এমন হয়। আমাদের টেকনিশিয়ান মাত্র ₹২৯৯ ফিতে স্পটেই টেস্ট করে দেন।'
      },
      {
        qEn: 'What does E1 or E4 error mean on Carrier AC?',
        qBn: 'ক্যারিয়ার এসিতে E1 বা E4 এরর কোডের মানে কী?',
        aEn: 'E1 is a temperature sensor fault while E4 indicates high pressure or outdoor unit overheating. We clean the condenser and replace faulty sensors on-site.',
        aBn: 'E1 সেন্সরের ত্রুটি এবং E4 আউটডোর ইউনিট অতিরিক্ত গরম হওয়ার লক্ষণ। আমরা স্পটেই সমাধান করে দিই।'
      },
      {
        qEn: 'How to book Carrier AC service in Kolkata?',
        qBn: 'কলকাতায় ক্যারিয়ার এসি সার্ভিস কীভাবে বুক করবেন?',
        aEn: 'Call +91 6291674186 or WhatsApp us for express 90-minute doorstep service.',
        aBn: 'সরাসরি +91 6291674186 নম্বরে কল করুন বা হোয়াটসঅ্যাপ করুন।'
      }
    ]
  },

  'godrej': {
    slug: 'godrej',
    name: 'Godrej',
    headlineEn: 'Godrej Refrigerator, AC & Washing Machine Repair Service in West Bengal',
    headlineBn: 'পশ্চিমবঙ্গে গোদরেজ ফ্রিজ, এসি ও ওয়াশিং মেশিন মেরামত সার্ভিস সাপোর্ট',
    subheadlineEn: 'Trusted doorstep repairs for Godrej Edge Direct Cool, Eon Frost-Free Fridges, Inverter AC & Eon Washers. 90-min arrival with flat ₹299 visit fee.',
    subheadlineBn: 'গোদরেজ এজ ও ইয়ন রেফ্রিজারেটর, ইনভার্টার এসি ও ওয়াশিং মেশিনের বিশ্বস্ত ডোরস্টেপ সমাধান। কলকাতায় ৯০ মিনিটে আগমন ও মাত্র ₹২৯৯ ভিজিট ফি।',
    coverageDescEn: 'Godrej appliances are known for robust Indian cooling performance. We provide expert repairs for Godrej double door fridge cooling loss, bimetal defrost failures, inverter AC performance issues, and washing machine drain faults.',
    coverageDescBn: 'গোদরেজ ভারতীয় আবহাওয়ার জন্য উপযোগী নির্ভরযোগ্য ব্র্যান্ড। গোদরেজ ডাবল ডোর ফ্রিজের কুলিং কমে যাওয়া, ডিফ্রস্ট সেন্সর ফল্ট, এসির গ্যাস রিফিল এবং ওয়াশিং মেশিনের ড্রেন সমস্যায় আমরা অভিজ্ঞ সেবা দিই।',
    errorCodes: [
      {
        code: 'Godrej Fridge Lower Section Not Cooling',
        issueEn: 'Freezer compartment has thick ice but lower vegetable basket is warm',
        issueBn: 'ডিপে অতিরিক্ত বরফ কিন্তু নিচের সবজির চেম্বার গরম',
        solutionEn: 'Replace bimetal defrost thermostat, inspect defrost timer, and defrost choked air duct.',
        solutionBn: 'ডিফ্রস্ট থার্মোস্ট্যাট সেন্সর পরিবর্তন এবং জমে থাকা বরফের পথ পরিষ্কার।'
      },
      {
        code: 'Inverter AC Low Cooling / High Amps',
        issueEn: 'AC trips or runs continuously without reaching set temperature',
        issueBn: 'এসি দীর্ঘক্ষণ চললেও ঘর ঠান্ডা হয় না বা বারবার ট্রিপ করে',
        solutionEn: 'Clean choked condenser coil with chemical jet pump and inspect fan motor capacitor.',
        solutionBn: 'কেমিক্যাল জেট ওয়াশ দিয়ে আউটডোর কয়েল পরিষ্কার এবং ফ্যান ক্যাপাসিটর চেক।'
      }
    ],
    searchedKeywords: [
      'godrej service centre',
      'godrej service centre near me',
      'godrej service centre kolkata',
      'godrej service centre kolkata phone number',
      'godrej customer care number',
      'godrej customer care',
      'godrej customer care number 24x7',
      'godrej customer care toll free number',
      'godrej smart care service centre kolkata',
      'godrej fridge repair near me',
      'godrej fridge repair kolkata',
      'godrej refrigerator customer care number',
      'godrej double door fridge not cooling',
      'godrej single door fridge cooling loss',
      'godrej ac repair near me',
      'godrej ac repair kolkata',
      'godrej ac service request',
      'godrej inverter ac not cooling properly',
      'godrej ac error code list',
      'godrej washing machine customer care number',
      'godrej washing machine repair near me',
      'godrej top load washing machine repair',
      'godrej washing machine not draining water'
    ],
    faqs: [
      {
        qEn: 'Why is the bottom section of my Godrej fridge not cooling?',
        qBn: 'গোদরেজ ফ্রিজের নিচের চেম্বার ঠান্ডা হচ্ছে না কেন?',
        aEn: 'A faulty defrost thermostat allows ice to choke the duct leading to the lower section. Our technician replaces the bimetal sensor at your home. Call +91 6291674186.',
        aBn: 'ডিফ্রস্ট সেন্সর খারাপ হলে বরফ জমে বাতাস চলাচলের পথ বন্ধ হয়ে যায়। আমাদের টেকনিশিয়ান স্পটেই সেন্সর বদলে দেন।'
      },
      {
        qEn: 'What is the Godrej refrigerator repair helpline in Kolkata?',
        qBn: 'কলকাতায় গোদরেজ ফ্রিজ মেরামতের ফোন নম্বর কোনটি?',
        aEn: 'Dial +91 6291674186 or WhatsApp us for same-day doorstep service with a flat ₹299 inspection fee.',
        aBn: 'সরাসরি কল করুন +91 6291674186 নম্বরে। পরিদর্শন ফি মাত্র ₹২৯৯।'
      }
    ]
  },

  'haier': {
    slug: 'haier',
    name: 'Haier',
    headlineEn: 'Haier AC, Refrigerator & Washing Machine Service Centre Support in Kolkata',
    headlineBn: 'কলকাতায় হায়ার এসি, ফ্রিজ ও ওয়াশিং মেশিন সার্ভিস সেন্টার সাপোর্ট',
    subheadlineEn: 'Fast doorstep repair for Haier Triple Inverter AC, Bottom Mounted Refrigerator, Deep Freezers & Washers. Express 90-min visit with ₹299 diagnosis fee.',
    subheadlineBn: 'হায়ার ট্রিপল ইনভার্টার এসি, বটম মাউন্টেড ফ্রিজ ও ওয়াশিং মেশিনের দ্রুত ডোরস্টেপ সমাধান। কলকাতায় ৯০ মিনিটে আগমন ও মাত্র ₹২৯৯ ভিজিট ফি।',
    coverageDescEn: 'Haier appliances feature innovative designs like bottom-mounted fridges and self-clean ACs. We provide certified repairs for Haier AC E7 inverter errors, refrigerator defrost failures, and washing machine E2 drain errors.',
    coverageDescBn: 'হায়ার ইনভার্টার এসির E7 এরর কোড, সেলফ-ক্লিন ফিচার ফল্ট, ফ্রিজের কুলিং লস এবং ওয়াশিং মেশিনের ড্রেন সমস্যায় আমাদের প্রকৌশলীরা বিশেষভাবে প্রশিক্ষিত।',
    errorCodes: [
      {
        code: 'E7 Inverter Error Code (AC)',
        issueEn: 'Communication fault between indoor and outdoor control boards',
        issueBn: 'ইনডোর ও আউটডোর কন্ট্রোল বোর্ডের মধ্যে সিগন্যাল সংযোগ বিচ্ছিন্ন',
        solutionEn: 'Check DC communication line, inspect IPM driver module on outdoor PCB, and replace faulty circuitry.',
        solutionBn: 'কমিউনিকেশন লাইন চেক, আউটডোর আইপিএম মডিউল টেস্ট এবং সার্কিট মেরামত।'
      },
      {
        code: 'Top Load Washer E2 Drain Error',
        issueEn: 'Water not draining out of the tub within specified time limit',
        issueBn: 'নির্ধারিত সময়ের মধ্যে ড্রাম থেকে জল নিষ্কাশন না হওয়া',
        solutionEn: 'Clear lint and coin obstruction from drain valve and test drain motor puller solenoid.',
        solutionBn: 'ড্রেন ভালভে আটকে থাকা ময়লা পরিষ্কার এবং ড্রেন মোটর পরীক্ষা।'
      }
    ],
    searchedKeywords: [
      'haier service centre',
      'haier service centre near me',
      'haier service centre kolkata',
      'haier service centre kolkata contact number',
      'haier customer care number',
      'haier customer care',
      'haier customer care number 24x7',
      'haier customer care toll free number india',
      'haier ac repair near me',
      'haier ac repair kolkata',
      'haier ac service near me',
      'haier ac not cooling',
      'haier inverter ac e7 error code',
      'haier ac gas filling charges',
      'haier fridge repair near me',
      'haier refrigerator customer care number',
      'haier double door fridge not cooling bottom',
      'haier deep freezer repair kolkata',
      'haier washing machine customer care number',
      'haier washing machine repair near me',
      'haier top load washing machine e2 error',
      'haier front load washing machine repair'
    ],
    faqs: [
      {
        qEn: 'What does E7 error mean on Haier inverter AC?',
        qBn: 'হায়ার ইনভার্টার এসিতে E7 এরর কোডের মানে কী?',
        aEn: 'E7 indicates communication breakdown between the indoor and outdoor units. Our technician tests and fixes the PCB circuitry on-site. Call +91 6291674186.',
        aBn: 'E7 হলো ইনডোর ও আউটডোর পিসিবির যোগাযোগ বিচ্ছিন্ন হওয়া। আমাদের প্রকৌশলী স্পটেই টেস্ট করে সারিয়ে দেন।'
      },
      {
        qEn: 'How to contact Haier customer repair support in Kolkata?',
        qBn: 'কলকাতায় হায়ার কাস্টমার সাপোর্টের ফোন নম্বর কোনটি?',
        aEn: 'Call +91 6291674186 or WhatsApp for express 90-minute doorstep service with 30-day warranty.',
        aBn: 'সরাসরি ডায়াল করুন +91 6291674186 অথবা হোয়াটসঅ্যাপে বুক করুন।'
      }
    ]
  },

  'panasonic': {
    slug: 'panasonic',
    name: 'Panasonic',
    headlineEn: 'Panasonic AC, Washing Machine & Refrigerator Repair in Kolkata & West Bengal',
    headlineBn: 'কলকাতায় প্যানাসনিক এসি, ওয়াশিং মেশিন ও ফ্রিজ মেরামত সাপোর্ট',
    subheadlineEn: 'Certified doorstep diagnostics for Panasonic Miraie Inverter AC, StainMaster Washers & Econavi Fridges. 90-min arrival with flat ₹299 inspection fee.',
    subheadlineBn: 'প্যানাসনিক মিরাই ইনভার্টার এসি, ওয়াশিং মেশিন ও ইকোন্যাভি ফ্রিজের বিশেষজ্ঞ ডোরস্টেপ সমাধান। মাত্র ₹২৯৯ ভিজিট ফিতে দ্রুত সার্ভিস।',
    coverageDescEn: 'Panasonic appliances feature Japanese precision and smart IoT connectivity. We resolve Panasonic H11 communication errors, timer LED blinking, washing machine U11/U12 errors, and Econavi inverter fridge diagnostics.',
    coverageDescBn: 'প্যানাসনিক ইনভার্টার এসির H11 এরর কোড, টাইমার লাইট ব্লিংকিং, ওয়াশিং মেশিনের U11/U12 এরর এবং ফ্রিজের ইনভার্টার পিসিবি মেরামতে আমরা দক্ষ টেকনিশিয়ান প্রদান করি।',
    errorCodes: [
      {
        code: 'H11 Communication Error (AC)',
        issueEn: 'Indoor unit and outdoor unit failed to synchronize communication data',
        issueBn: 'ইনডোর ও আউটডোর ইউনিটের মধ্যে ডাটা কমিউনিকেশন ব্যর্থতা',
        solutionEn: 'Inspect connecting signal cable, check terminal block voltage, and service outdoor mainboard.',
        solutionBn: 'সিগন্যাল কেবল পরীক্ষা, টার্মিনাল ভোল্টেজ চেক এবং আউটডোর মাদারবোর্ড মেরামত।'
      },
      {
        code: 'Timer LED Blinking Continuously',
        issueEn: 'Compressor stops cooling and timer lamp blinks in sequence',
        issueBn: 'কম্প্রেসার বন্ধ হয়ে যাওয়া এবং টাইমার লাইট একনাগাড়ে ব্লিংক করা',
        solutionEn: 'Retrieve fault code using remote check button, inspect pipe thermistor, and reset microcontroller.',
        solutionBn: 'রিমোটের চেক বাটন দিয়ে এরর কোড বের করা এবং পাইপ থার্মিস্টর সেন্সর পরিবর্তন।'
      }
    ],
    searchedKeywords: [
      'panasonic service centre',
      'panasonic service centre near me',
      'panasonic service centre kolkata',
      'panasonic service centre kolkata phone number',
      'panasonic customer care number',
      'panasonic customer care',
      'panasonic customer care number 24x7',
      'panasonic ac repair near me',
      'panasonic ac repair kolkata',
      'panasonic ac service request',
      'panasonic ac not cooling',
      'panasonic inverter ac h11 error code',
      'panasonic ac timer blinking',
      'panasonic fridge repair near me',
      'panasonic washing machine customer care number',
      'panasonic washing machine repair near me',
      'panasonic top load washing machine u11 error',
      'panasonic top load washing machine u12 error'
    ],
    faqs: [
      {
        qEn: 'What does H11 error code mean in Panasonic inverter AC?',
        qBn: 'প্যানাসনিক ইনভার্টার এসিতে H11 এরর কোডের অর্থ কী?',
        aEn: 'H11 indicates communication failure between indoor and outdoor units. Our senior technician carries diagnostic tools to fix the signal bus on-site. Call +91 6291674186.',
        aBn: 'H11 হলো ইনডোর ও আউটডোরের সংকেত বিচ্ছিন্ন হওয়া। আমাদের সিনিয়র টেকনিশিয়ান স্পটেই টেস্ট করে সারিয়ে দেন।'
      },
      {
        qEn: 'How to contact Panasonic appliance repair in Kolkata?',
        qBn: 'কলকাতায় প্যানাসনিক অ্যাপ্লায়েন্স মেরামতের ফোন নম্বর কোনটি?',
        aEn: 'Call +91 6291674186 or WhatsApp for same-day service with flat ₹299 visit fee.',
        aBn: 'তাৎক্ষণিক বুকিংয়ের জন্য কল করুন +91 6291674186 নম্বরে।'
      }
    ]
  },

  'bosch': {
    slug: 'bosch',
    name: 'Bosch',
    headlineEn: 'Bosch Washing Machine, Refrigerator & Microwave Service Support in West Bengal',
    headlineBn: 'পশ্চিমবঙ্গে বশ ওয়াশিং মেশিন, ফ্রিজ ও মাইক্রোওয়েভ ডোরস্টেপ সার্ভিস',
    subheadlineEn: 'Specialist repair for Bosch Serie 4, Serie 6, Serie 8 Front Load Washers, Maxx Fridges & Microwaves. Fast 90-min arrival with ₹299 diagnosis fee.',
    subheadlineBn: 'বশ ফ্রন্ট লোড ওয়াশিং মেশিন, ফ্রিজ ও মাইক্রোওয়েভের সার্টিফাইড ডোরস্টেপ সমাধান। কলকাতায় ৯০ মিনিটে আগমন ও মাত্র ₹২৯৯ ভিজিট ফি।',
    coverageDescEn: 'Bosch is globally renowned for German engineering standards. We provide certified repairs for Bosch washing machine E18 drain pump errors, E23/E29 water inlet faults, drum bearing replacements, and refrigerator cooling loss.',
    coverageDescBn: 'বশ বিশ্বখ্যাত জার্মান প্রযুক্তির ব্র্যান্ড। বশ ওয়াশিং মেশিনের E18 ড্রেন এরর, E23/E29 ওয়াটার ভালভ ত্রুটি, ড্রাম বেয়ারিং পরিবর্তন এবং ফ্রিজের কুলিং সমস্যায় আমরা দক্ষ টেকনিশিয়ান ও জেনুইন যন্ত্রাংশ দিই।',
    errorCodes: [
      {
        code: 'E18 Error Code (Washer)',
        issueEn: 'Washing machine not pumping out water during rinse/spin cycle',
        issueBn: 'রিন্স বা স্পিনের সময় মেশিন থেকে জল ড্রেন না হওয়া',
        solutionEn: 'Clean coin trap pump filter, check drain hose for blockages, and test drain pump motor.',
        solutionBn: 'পাম্প ফিল্টারের কয়েন ট্র্যাপ পরিষ্কার, ড্রেন পাইপ চেক এবং ড্রেন মোটর পরীক্ষা।'
      },
      {
        code: 'E23 / E29 Aquastop Error Code',
        issueEn: 'Aquastop safety system activated or water inlet timeout',
        issueBn: 'অ্যাকোয়াস্টপ সেফটি সিস্টেম সক্রিয় হওয়া বা জল না ঢোকা',
        solutionEn: 'Inspect bottom tray float switch for water leak and test inlet solenoid valves.',
        solutionBn: 'নিচের ট্রের ফ্লোট সুইচ পরীক্ষা এবং ইনলেট সলেনয়েড ভালভ টেস্ট।'
      }
    ],
    searchedKeywords: [
      'bosch service centre',
      'bosch service centre near me',
      'bosch service centre kolkata',
      'bosch customer care number',
      'bosch customer care number 24x7',
      'bosch washing machine repair near me',
      'bosch washing machine service kolkata',
      'bosch front load washing machine repair',
      'bosch washing machine e18 error code',
      'bosch washing machine e29 error code',
      'bosch washing machine e23 error code',
      'bosch fridge repair near me',
      'bosch dishwasher repair kolkata'
    ],
    faqs: [
      {
        qEn: 'How to fix E18 error on Bosch washing machine?',
        qBn: 'বশ ওয়াশিং মেশিনের E18 এরর কীভাবে ঠিক করবেন?',
        aEn: 'E18 indicates the drain filter or pump is blocked. Our technician safely opens the pump chamber, cleans debris, or replaces the pump at your doorstep. Call +91 6291674186.',
        aBn: 'E18 হলো ড্রেন ফিল্টার বা পাম্প আটকে যাওয়ার লক্ষণ। আমাদের টেকনিশিয়ান স্পটেই ফিল্টার পরিষ্কার বা নতুন পাম্প লাগিয়ে দেন।'
      },
      {
        qEn: 'Who repairs Bosch washing machines at doorstep in Kolkata?',
        qBn: 'কলকাতায় বশ ওয়াশিং মেশিনের ডোরস্টেপ সার্ভিস কারা দেয়?',
        aEn: 'Our certified engineers repair all Bosch front-load models across Kolkata and Howrah. Call +91 6291674186.',
        aBn: 'আমাদের সার্টিফাইড টেকনিশিয়ানরা সমগ্র কলকাতা ও হাওড়ায় বশ ওয়াশিং মেশিনের ডোরস্টেপ সার্ভিস দেন। কল করুন: +91 6291674186।'
      }
    ]
  },

  'siemens': {
    slug: 'siemens',
    name: 'Siemens',
    headlineEn: 'Siemens Washing Machine & Refrigerator Repair Service in Kolkata & West Bengal',
    headlineBn: 'কলকাতায় সিমেন্স ওয়াশিং মেশিন ও ফ্রিজ ডোরস্টেপ মেরামত সাপোর্ট',
    subheadlineEn: 'German engineering precision repair for Siemens iQ300, iQ500, iQ700 Front Load Washers & Fridges. 90-min visit with flat ₹299 inspection fee.',
    subheadlineBn: 'সিমেন্স আইকিউ৩০০, আইকিউ৫০০ ও আইকিউ৭০০ ফ্রন্ট লোড ওয়াশিং মেশিন ও ফ্রিজের প্রিমিয়াম ডোরস্টেপ সমাধান। মাত্র ₹২৯৯ ভিজিট ফিতে দ্রুত সার্ভিস।',
    coverageDescEn: 'Siemens home appliances are built with high-precision engineering. We repair Siemens iQDrive brushless motors, E18 drain pump errors, door interlock latch failures, and frost-free refrigerator cooling issues.',
    coverageDescBn: 'সিমেন্স প্রিমিয়াম জার্মান অ্যাপ্লায়েন্স। সিমেন্স আইকিউ-ড্রাইভ মোটর, E18 ড্রেন এরর, ডোর লক এবং ফ্রস্ট-ফ্রি ফ্রিজের কুলিং সমস্যার জন্য আমরা দক্ষ বিশেষজ্ঞ টেকনিশিয়ান পাঠাই।',
    errorCodes: [
      {
        code: 'E18 Drain Timeout Error',
        issueEn: 'Waste water cannot be pumped away during wash cycle',
        issueBn: 'ওয়াশ সাইকেলে জল ড্রেন পাম্প দিয়ে নিষ্কাশন না হওয়া',
        solutionEn: 'Unscrew drain filter cover, remove lint/foreign objects, and test drain pump impellers.',
        solutionBn: 'ড্রেন ফিল্টার খুলে ময়লা পরিষ্কার এবং ড্রেন পাম্পের ইম্পেলার টেস্ট।'
      }
    ],
    searchedKeywords: [
      'siemens service centre kolkata',
      'siemens customer care number',
      'siemens washing machine repair near me',
      'siemens front load washing machine e18 error',
      'siemens refrigerator repair kolkata'
    ],
    faqs: [
      {
        qEn: 'How to contact Siemens washing machine repair in Kolkata?',
        qBn: 'কলকাতায় সিমেন্স ওয়াশিং মেশিন মেরামতের ফোন নম্বর কোনটি?',
        aEn: 'Call our direct helpline +91 6291674186 or WhatsApp us for instant doorstep booking across Kolkata with a 30-day warranty.',
        aBn: 'সরাসরি কল করুন +91 6291674186 নম্বরে অথবা হোয়াটসঅ্যাপে বুক করুন।'
      }
    ]
  },

  'sony': {
    slug: 'sony',
    name: 'Sony',
    headlineEn: 'Sony Bravia LED & 4K Smart TV Repair Service in Kolkata & West Bengal',
    headlineBn: 'কলকাতায় সোনি ব্রাভিয়া এলইডি ও স্মার্ট টিভি ডোরস্টেপ মেরামত সাপোর্ট',
    subheadlineEn: 'Certified doorstep technician for Sony Bravia OLED, 4K HDR, Google TV display panels, motherboards & backlights. Same-day visit with flat ₹299 inspection fee.',
    subheadlineBn: 'সোনি ব্রাভিয়া ওলেড, ৪কে এইচডিআর ও গুগল টিভির ডিসপ্লে প্যানেল, মাদারবোর্ড ও ব্যাকলাইটের দক্ষ ডোরস্টেপ সার্ভিস। মাত্র ₹২৯৯ ভিজিট ফি।',
    coverageDescEn: 'Sony Bravia televisions provide industry-leading picture clarity. We specialize in diagnosing Sony red standby light blinking codes (6 blinks, 4 blinks), sound-with-no-picture backlight failure, and T-Con display line issues.',
    coverageDescBn: 'সোনি ব্রাভিয়া টিভির লাল লাইট ব্লিংকিং কোড (৬ বার, ৪ বার ব্লিংক), টিভিতে শব্দ আছে কিন্তু পর্দা কালো ব্যাকলাইট সমস্যা এবং ডিসপ্লেতে লাইন পড়ার সমস্যা আমরা নিপুণভাবে সমাধান করি।',
    errorCodes: [
      {
        code: 'Red Light Blinking 6 Times',
        issueEn: 'TV turns on, Sony logo appears for 2 seconds, then screen goes dark and red LED blinks 6 times',
        issueBn: 'টিভি অন হয়ে সোনি লোগো ২ সেকেন্ড এসে বন্ধ হয়ে যায় এবং লাল লাইট ৬ বার ব্লিংক করে',
        solutionEn: 'Inspect backlight inverter driver board and replace burnt LED backlight strips with genuine aluminum-core LEDs.',
        solutionBn: 'ব্যাকলাইট ইনভার্টার ড্রাইভার পরীক্ষা এবং নষ্ট এলইডি স্ট্রিপ নতুন অরিজিনাল স্ট্রিপ দিয়ে প্রতিস্থাপন।'
      },
      {
        code: 'TV Has Sound But Screen Is Black',
        issueEn: 'Audio / sound plays perfectly from channels or apps, but display is completely dark/blank',
        issueBn: 'টিভিতে চ্যানেল বা ইউটিউবের শব্দ পরিষ্কার শোনা যাচ্ছে কিন্তু পর্দা সম্পূর্ণ কালো',
        solutionEn: 'Flashlight test panel, test power board LED booster circuit, and replace burnt backlight array.',
        solutionBn: 'ফ্ল্যাশলাইট টেস্ট করে প্যানেল পরীক্ষা, পাওয়ার বোর্ড বুস্টার চেক এবং ব্যাকলাইট অ্যারে পরিবর্তন।'
      },
      {
        code: 'Red Light Blinking 4 / 5 Times',
        issueEn: 'T-Con timing controller board communication fault or panel gate COF IC failure',
        issueBn: 'টি-কন বোর্ড কমিউনিকেশন ফল্ট বা প্যানেল ড্রাইভার আইসির ত্রুটি',
        solutionEn: 'Test T-Con board 12V supply fuse, repair shorted ceramic capacitors on panel source PCB.',
        solutionBn: 'টি-কন বোর্ডের ১২ ভোল্ট ফিউজ পরীক্ষা এবং শর্ট হওয়া ক্যাপাসিটর সারিয়ে তোলা।'
      }
    ],
    searchedKeywords: [
      'sony service centre',
      'sony service centre near me',
      'sony service centre kolkata',
      'sony service centre kolkata phone number',
      'sony customer care number',
      'sony customer care number 24x7',
      'sony tv repair near me',
      'sony tv repair kolkata',
      'sony led tv repair doorstep kolkata',
      'sony bravia tv screen black sound coming',
      'sony bravia tv red light blinking 6 times',
      'sony bravia tv red light blinking 4 times',
      'sony smart tv display lines repair',
      'sony led tv backlight replacement price'
    ],
    faqs: [
      {
        qEn: 'Why is my Sony Bravia TV red light blinking 6 times?',
        qBn: 'সোনি ব্রাভিয়া টিভির লাল লাইট ৬ বার ব্লিংক করছে কেন?',
        aEn: '6 red blinks indicates a backlight circuit failure or power supply issue. Our technician tests the inverter board and replaces the backlight strips on-site. Call +91 6291674186.',
        aBn: '৬ বার লাল লাইট ব্লিংক করা মানে ব্যাকলাইট সার্কিট বা পাওয়ার সাপ্লাইয়ে ত্রুটি। আমাদের টেকনিশিয়ান স্পটেই টেস্ট করে সারিয়ে দেন।'
      },
      {
        qEn: 'Why does my Sony TV have sound but no picture?',
        qBn: 'সোনি টিভিতে শব্দ আসছে কিন্তু ছবি নেই কেন?',
        aEn: 'This happens when the LED backlight array burns out while the motherboard and speakers function normally. We replace the LED backlight strips with original components and warranty. Call +91 6291674186.',
        aBn: 'মাদারবোর্ড ভালো থাকা সত্ত্বেও ব্যাকলাইট কেটে গেলে এমন হয়। আমরা স্পটেই নতুন জেনুইন ব্যাকলাইট লাগিয়ে দিই।'
      },
      {
        qEn: 'How to book Sony LED TV repair in Kolkata?',
        qBn: 'কলকাতায় সোনি এলইডি টিভি মেরামতের জন্য কীভাবে বুক করবেন?',
        aEn: 'Dial +91 6291674186 or WhatsApp us for doorstep inspection at flat ₹299 across Kolkata and Howrah.',
        aBn: 'সরাসরি কল করুন +91 6291674186 অথবা হোয়াটসঅ্যাপে বুক করুন।'
      }
    ]
  },

  'toshiba': {
    slug: 'toshiba',
    name: 'Toshiba',
    headlineEn: 'Toshiba AC, Washing Machine & Refrigerator Repair Service in Kolkata & West Bengal',
    headlineBn: 'কলকাতায় তোশিবা এসি, ওয়াশিং মেশিন ও ফ্রিজ ডোরস্টেপ সার্ভিস',
    subheadlineEn: 'Japanese engineering precision repair for Toshiba Inverter AC, Top & Front Load Washers, and Fridges. 90-min visit with flat ₹299 inspection fee.',
    subheadlineBn: 'তোশিবা ইনভার্টার এসি, ওয়াশিং মেশিন ও ফ্রিজের প্রিমিয়াম ডোরস্টেপ সমাধান। মাত্র ₹২৯৯ ভিজিট ফিতে দ্রুত ও নির্ভরযোগ্য সার্ভিস।',
    coverageDescEn: 'Toshiba home appliances deliver Japanese reliability. We diagnose Toshiba DC hybrid inverter AC error codes, washing machine drain/lid switch issues, and multi-door refrigerator inverter cooling system failures.',
    coverageDescBn: 'তোশিবা ইনভার্টার এসির ফল্ট কোড, ওয়াশিং মেশিনের ড্রেন ও লিড লক এরর এবং ফ্রিজের ইনভার্টার কুলিং সমস্যা নিপুণভাবে সমাধানে আমাদের টেকনিশিয়ানরা বিশেষজ্ঞ।',
    errorCodes: [
      {
        code: 'Error 00 / 01 (Toshiba AC)',
        issueEn: 'Indoor and outdoor communication failure or serial bus sync issue',
        issueBn: 'ইনডোর ও আউটডোরের মধ্যে সিরিয়াল কমিউনিকেশন বিচ্ছিন্ন হওয়া',
        solutionEn: 'Check terminal wiring voltage, replace communication optocoupler on outdoor inverter board.',
        solutionBn: 'টার্মিনাল ওয়্যারিং ভোল্টেজ পরীক্ষা এবং আউটডোর ইনভার্টার বোর্ডের অপটোকপলার মেরামত।'
      },
      {
        code: 'E23 / E2 Error (Toshiba Washer)',
        issueEn: 'Safety lid lock switch open or drain valve motor failure',
        issueBn: 'ওয়াশিং মেশিনের ঢাকনা লক না হওয়া বা ড্রেন মোটর ত্রুটি',
        solutionEn: 'Inspect safety lid microswitch, clear lint from coin filter, and replace drain tractor motor.',
        solutionBn: 'লিড মাইক্রোসুইচ টেস্ট, ড্রেন ফিল্টারের ময়লা পরিষ্কার এবং ড্রেন মোটর পরিবর্তন।'
      }
    ],
    searchedKeywords: [
      'toshiba service centre',
      'toshiba service centre near me',
      'toshiba service centre kolkata',
      'toshiba customer care number',
      'toshiba customer care number 24x7',
      'toshiba ac repair near me',
      'toshiba ac repair kolkata',
      'toshiba ac error code',
      'toshiba inverter ac not cooling',
      'toshiba washing machine repair near me',
      'toshiba washing machine e23 error',
      'toshiba fridge repair kolkata'
    ],
    faqs: [
      {
        qEn: 'Who repairs Toshiba home appliances in Kolkata?',
        qBn: 'কলকাতায় তোশিবা অ্যাপ্লায়েন্স মেরামত কারা করে?',
        aEn: 'Our certified engineers service Toshiba ACs, washing machines, and refrigerators at your doorstep across Kolkata and Howrah. Call +91 6291674186.',
        aBn: 'আমাদের অভিজ্ঞ টেকনিশিয়ানরা সমগ্র কলকাতা ও হাওড়ায় তোশিবা অ্যাপ্লায়েন্সের ডোরস্টেপ সার্ভিস দেন। কল: +91 6291674186।'
      },
      {
        qEn: 'How to contact Toshiba repair support in Kolkata?',
        qBn: 'তোশিবা মেরামতের জন্য যোগাযোগ নম্বর কোনটি?',
        aEn: 'Call +91 6291674186 or WhatsApp us for instant doorstep booking at flat ₹299 inspection charge.',
        aBn: 'তাৎক্ষণিক বুকিংয়ের জন্য ডায়াল করুন +91 6291674186 অথবা হোয়াটসঅ্যাপে মেসেজ করুন।'
      }
    ]
  },

  'tcl': {
    slug: 'tcl',
    name: 'TCL',
    headlineEn: 'TCL Smart LED TV & Inverter AC Repair Service in Kolkata & West Bengal',
    headlineBn: 'কলকাতায় টিসিএল স্মার্ট এলইডি টিভি ও এসি ডোরস্টেপ সার্ভিস',
    subheadlineEn: 'Specialist doorstep repair for TCL 4K UHD, QLED Android/Google Smart TVs & Inverter ACs. Same-day visit with flat ₹299 inspection fee.',
    subheadlineBn: 'টিসিএল ৪কে ইউএইচডি, কিউলেড গুগল টিভি এবং ইনভার্টার এসির বিশেষজ্ঞ ডোরস্টেপ সার্ভিস। মাত্র ₹২৯৯ ভিজিট ফিতে দ্রুত সমাধান।',
    coverageDescEn: 'TCL produces advanced smart TVs and air conditioners. We resolve TCL TV sound-with-black-screen backlight issues, bootloop / logo stuck errors, horizontal display lines, and TCL inverter AC E4 cooling faults.',
    coverageDescBn: 'টিসিএল স্মার্ট টিভির ডিসপ্লে সমস্যা (শব্দ আছে কিন্তু ছবি নেই), টিসিএল লোগোতে আটকে থাকা, পর্দায় দাগ এবং ইনভার্টার এসির কুলিং সমস্যার দ্রুত সমাধান দিই।',
    errorCodes: [
      {
        code: 'Screen Black But Sound Plays (TCL TV)',
        issueEn: 'Audio is loud and clear but the LED backlight array has failed',
        issueBn: 'টিভিতে চ্যানেল বা ইউটিউবের শব্দ পরিষ্কার আসছে কিন্তু ডিসপ্লে সম্পূর্ণ অন্ধকার',
        solutionEn: 'Flashlight test panel, test power board LED booster circuit, and install genuine aluminum-base LED strips.',
        solutionBn: 'প্যানেল টেস্ট করে পাওয়ার সাপ্লাই চেক এবং নতুন অরিজিনাল এলইডি ব্যাকলাইট স্ট্রিপ প্রতিস্থাপন।'
      },
      {
        code: 'TV Stuck on TCL Boot Logo',
        issueEn: 'TV powers on to TCL logo and keeps restarting in a continuous loop',
        issueBn: 'টিভি অন হয়ে টিসিএল লোগোতে আটকে রিবুট হতে থাকা',
        solutionEn: 'Flash updated Android firmware via ISP programmer or replace corrupted EMMC memory IC.',
        solutionBn: 'আইএসপি প্রোগ্রামার দিয়ে ফার্মওয়্যার রি-ফ্ল্যাশ করা অথবা ইএমএমসি মেমরি আইসি মেরামত।'
      },
      {
        code: 'E4 Error Code (TCL AC)',
        issueEn: 'Outdoor unit condenser coil sensor malfunction or fan speed abnormal',
        issueBn: 'আউটডোর কনডেন্সার সেন্সর বা ফ্যানের গতি অস্বাভাবিক হওয়া',
        solutionEn: 'Test sensor resistance with multimeter, inspect outdoor fan capacitor, and wash condenser fins.',
        solutionBn: 'মাল্টিমিটার দিয়ে সেন্সর টেস্ট, ফ্যান ক্যাপাসিটর পরীক্ষা এবং কয়েল পরিষ্কার।'
      }
    ],
    searchedKeywords: [
      'tcl service centre',
      'tcl service centre near me',
      'tcl service centre kolkata',
      'tcl customer care number',
      'tcl customer care number 24x7',
      'tcl tv repair near me',
      'tcl tv repair kolkata',
      'tcl smart tv screen black',
      'tcl smart tv no sound',
      'tcl 4k tv display line repair',
      'tcl ac repair near me',
      'tcl ac error code'
    ],
    faqs: [
      {
        qEn: 'Why does my TCL TV screen have sound but no picture?',
        qBn: 'টিসিএল টিভিতে শব্দ আসছে কিন্তু কোনো ছবি নেই কেন?',
        aEn: 'This indicates backlight LED failure while the mainboard and speakers work. Our technician replaces backlight strips with warranty at your home. Call +91 6291674186.',
        aBn: 'টিভি ব্যাকলাইট কেটে যাওয়ার কারণে এমন হয়। আমাদের টেকনিশিয়ান স্পটেই নতুন ব্যাকলাইট লাগিয়ে দেন।'
      },
      {
        qEn: 'How to book TCL TV repair in Kolkata?',
        qBn: 'কলকাতায় টিসিএল টিভি মেরামতের জন্য কীভাবে বুক করবেন?',
        aEn: 'Dial +91 6291674186 or WhatsApp for same-day doorstep service at flat ₹299 inspection visit fee.',
        aBn: 'সরাসরি কল করুন +91 6291674186 নম্বরে অথবা হোয়াটসঅ্যাপে বুক করুন।'
      }
    ]
  },

  'mi': {
    slug: 'mi',
    name: 'Mi / Xiaomi',
    headlineEn: 'Mi & Redmi Smart LED TV Repair Service Support in Kolkata & West Bengal',
    headlineBn: 'কলকাতায় এমআই ও রেডমি স্মার্ট টিভি ডোরস্টেপ মেরামত সাপোর্ট',
    subheadlineEn: 'Specialist repair for Mi 4A, 4X, 5A, Horizon Edition & Redmi 4K Smart TVs. Backlight replacement, display panel repair & motherboard servicing at flat ₹299 visit fee.',
    subheadlineBn: 'এমআই ৪এ, ৪এক্স, হরাইজন এডিশন ও রেডমি ৪কে স্মার্ট টিভির ব্যাকলাইট, ডিসপ্লে ও মাদারবোর্ডের বিশেষজ্ঞ ডোরস্টেপ সমাধান। মাত্র ₹২৯৯ ভিজিট ফি।',
    coverageDescEn: 'Xiaomi/Redmi TVs are hugely popular across Kolkata. We solve common Mi TV problems including black screen with audio, stuck on "Mi" logo, ghosting/double image, HDMI port failure, and power board capacitor burnout.',
    coverageDescBn: 'কলকাতায় এমআই ও রেডমি টিভির স্ক্রিন অন্ধকার হয়ে যাওয়া (শব্দ আছে), এমআই লোগোতে আটকে থাকা, ডিসপ্লেতে ডাবল ইমেজ এবং পাওয়ার বোর্ডের সমস্যা আমরা স্পটেই ঠিক করি।',
    errorCodes: [
      {
        code: 'Audio Working But Display Completely Dark',
        issueEn: 'User can change channels and adjust volume, but screen does not illuminate',
        issueBn: 'সাউন্ড আসছে এবং ভলিউম বাড়ানো যাচ্ছে কিন্তু স্ক্রিন সম্পূর্ণ কালো',
        solutionEn: 'Disassemble display stack with suction grips, replace burned LED backlight string with 6V high-lumen diodes.',
        solutionBn: 'ডিসপ্লে প্যানেল সাবধানে খুলে পুরো ব্যাকলাইট সেট নতুন অরিজিনাল এলইডি দিয়ে পরিবর্তন।'
      },
      {
        code: 'Stuck on "Mi" Logo / Bootloop',
        issueEn: 'TV turns on, displays Mi logo, then turns off and restarts continuously',
        issueBn: 'টিভি অন হয়ে এমআই লোগোতে আটকে রিস্টার্ট হতে থাকা',
        solutionEn: 'Perform hardware eMMC flash recovery or replace 1.8V/3.3V DC-DC buck converter chip on motherboard.',
        solutionBn: 'ইএমএমসি ফ্ল্যাশ রিকভারি অথবা মাদারবোর্ডের ডিসি-ডিসি কনভার্টার চিপ রিপেয়ার।'
      },
      {
        code: 'Vertical / Horizontal Lines on Screen',
        issueEn: 'Color lines appearing across the picture due to COF ribbon gate driver disconnect',
        issueBn: 'পর্দায় রঙিন খাড়া বা আড়াআড়ি দাগ পড়া (কফ আইসির সমস্যা)',
        solutionEn: 'COF bonding repair, T-Con level shifter bypass, and display source capacitor service.',
        solutionBn: 'কফ বন্ডিং মেরামত এবং টি-কন লেভেল শিফটার বাইপাস মডিফিকেশন।'
      }
    ],
    searchedKeywords: [
      'mi service centre',
      'mi service centre near me',
      'mi service centre kolkata',
      'mi customer care number',
      'mi customer care',
      'mi tv repair near me',
      'mi tv repair kolkata',
      'mi tv service centre kolkata',
      'mi led tv repair doorstep',
      'mi tv screen black sound ok',
      'mi tv stuck on mi logo',
      'mi tv display panel price',
      'redmi smart tv screen repair kolkata'
    ],
    faqs: [
      {
        qEn: 'Why is my Mi TV screen black but sound is clear?',
        qBn: 'এমআই টিভির সাউন্ড পরিষ্কার আসছে কিন্তু স্ক্রিন কালো কেন?',
        aEn: 'The LED backlight array has failed while the motherboard continues to play sound. Our technician replaces the backlight at your home with warranty. Call +91 6291674186.',
        aBn: 'টিভি ব্যাকলাইট কেটে যাওয়ার কারণে এমন হয়। আমাদের টেকনিশিয়ান স্পটেই নতুন ব্যাকলাইট লাগিয়ে দেন।'
      },
      {
        qEn: 'Can Mi TV stuck on boot logo be repaired at home?',
        qBn: 'এমআই লোগোতে আটকে থাকা টিভি কি বাড়িতে ঠিক করা সম্ভব?',
        aEn: 'Yes! Our engineer performs motherboard firmware recovery and voltage rail testing right at your doorstep. Call +91 6291674186.',
        aBn: 'হ্যাঁ! আমাদের ইঞ্জিনিয়ার আপনার বাড়িতে এসেই সফটওয়্যার ও মাদারবোর্ড টেস্ট করে সারিয়ে দেন।'
      },
      {
        qEn: 'How much is the inspection fee for Mi TV repair?',
        qBn: 'এমআই টিভি পরিদর্শনের ফি কত?',
        aEn: 'Doorstep inspection is only ₹299 across Kolkata and Howrah. Call +91 6291674186.',
        aBn: 'কলকাতা ও হাওড়ায় হোম ভিজিট চার্জ মাত্র ₹২৯৯।'
      }
    ]
  },

  'oneplus': {
    slug: 'oneplus',
    name: 'OnePlus',
    headlineEn: 'OnePlus Smart LED & QLED TV Repair Service Support in Kolkata',
    headlineBn: 'কলকাতায় ওয়ানপ্লাস স্মার্ট টিভি ডোরস্টেপ মেরামত সাপোর্ট',
    subheadlineEn: 'Expert doorstep technician for OnePlus Y Series, U Series & Q Series 4K QLED Smart TVs. Display panel, backlight & motherboard diagnostics at flat ₹299 visit fee.',
    subheadlineBn: 'ওয়ানপ্লাস ওয়াই সিরিজ, ইউ সিরিজ ও কিউলেড টিভির ডিসপ্লে, ব্যাকলাইট ও মাদারবোর্ডের বিশেষজ্ঞ ডোরস্টেপ সমাধান। মাত্র ₹২৯৯ ভিজিট ফি।',
    coverageDescEn: 'OnePlus Smart TVs feature premium bezels and OxygenOS integration. We fix OnePlus TV sound-with-no-picture issues, vertical green/pink lines, bootloop, and remote pairing problems.',
    coverageDescBn: 'ওয়ানপ্লাস স্মার্ট টিভির শব্দ থাকা সত্ত্বেও ছবি না আসা, ডিসপ্লেতে সবুজ বা গোলাপি লাইন, রিস্টার্ট সমস্যা এবং মাদারবোর্ড ত্রুটি আমরা দ্রুত ও নির্ভরযোগ্যভাবে সমাধান করি।',
    errorCodes: [
      {
        code: 'Vertical Green / Pink Line on Screen',
        issueEn: 'One or multiple thin vertical colored lines appear across the display panel',
        issueBn: 'স্ক্রিনের উপর এক বা একাধিক সবুজ অথবা গোলাপি দাগ পড়া',
        solutionEn: 'Inspect COF ribbon cable bonding, test source PCB gate driver signals, and perform laser panel repair.',
        solutionBn: 'কফ রিবন কেবল ও সোর্স পিসিবি সিগন্যাল পরীক্ষা এবং প্যানেল ড্রাইভ সার্ভিস।'
      },
      {
        code: 'TV Has Sound But Screen Is Pitch Black',
        issueEn: 'Power LED is blue/white, audio plays normally, but screen has zero light output',
        issueBn: 'টিভি অন হচ্ছে এবং সাউন্ড বাজছে কিন্তু স্ক্রিনে আলো নেই',
        solutionEn: 'Replace burned out backlight LED array with original high-brightness aluminum-core strips.',
        solutionBn: 'নষ্ট ব্যাকলাইট নতুন অ্যালুমিনিয়াম-বেস এলইডি স্ট্রিপ দিয়ে পরিবর্তন।'
      }
    ],
    searchedKeywords: [
      'oneplus service centre',
      'oneplus service centre near me',
      'oneplus service centre kolkata',
      'oneplus customer care number',
      'oneplus tv customer care',
      'oneplus tv repair near me',
      'oneplus tv repair kolkata',
      'oneplus smart tv screen replacement',
      'oneplus tv green line on screen',
      'oneplus tv sound ok no picture',
      'oneplus tv stuck on loading screen',
      'oneplus led tv repair doorstep'
    ],
    faqs: [
      {
        qEn: 'How to fix green lines on OnePlus TV screen?',
        qBn: 'ওয়ানপ্লাস টিভি স্ক্রিনে সবুজ দাগ কীভাবে ঠিক করবেন?',
        aEn: 'Green lines occur due to COF ribbon gate driver connection issues. Our technician conducts on-site micro-testing to fix panel lines. Call +91 6291674186.',
        aBn: 'প্যানেল কফ আইসি ও সিগন্যাল ট্র্যাকে ত্রুটি হলে সবুজ দাগ পড়ে। আমাদের টেকনিশিয়ান স্পটেই টেস্ট করে সারিয়ে দেন।'
      },
      {
        qEn: 'How to contact OnePlus TV customer repair support in Kolkata?',
        qBn: 'কলকাতায় ওয়ানপ্লাস টিভি মেরামতের জন্য কীভাবে যোগাযোগ করবেন?',
        aEn: 'Dial +91 6291674186 or WhatsApp for same-day doorstep inspection at flat ₹299 across Kolkata and Howrah.',
        aBn: 'সরাসরি কল করুন +91 6291674186 নম্বরে অথবা হোয়াটসঅ্যাপে মেসেজ পাঠান।'
      }
    ]
  },

  'kelvinator': {
    slug: 'kelvinator',
    name: 'Kelvinator',
    headlineEn: 'Kelvinator Refrigerator & AC Repair Service Support in Kolkata & West Bengal',
    headlineBn: 'কলকাতায় কেলভিনেটর ফ্রিজ ও এসি ডোরস্টেপ মেরামত সাপোর্ট',
    subheadlineEn: 'Reliable doorstep repair for Kelvinator Single Door, Double Door Frost-Free Fridges & ACs. 90-min arrival with flat ₹299 inspection fee.',
    subheadlineBn: 'কেলভিনেটর সিঙ্গেল ডোর, ডাবল ডোর ফ্রস্ট-ফ্রি ফ্রিজ ও এসির বিশ্বস্ত ডোরস্টেপ সমাধান। মাত্র ₹২৯৯ ভিজিট ফিতে দ্রুত সেবা।',
    coverageDescEn: 'Kelvinator refrigerators are celebrated for deep cooling. We fix refrigerator compressor not starting, cooling coil freezing while lower cabinet is warm, gas leakage, thermostat defects, and AC servicing.',
    coverageDescBn: 'কেলভিনেটর ফ্রিজে গ্যাস লিকেজ, কম্প্রেসার স্টার্ট না হওয়া, ডিপে অতিরিক্ত বরফ জমে নিচে ঠান্ডা না হওয়া এবং এসির গ্যাস রিফিলিংয়ের নির্ভরযোগ্য সেবা প্রদান করি।',
    errorCodes: [
      {
        code: 'Freezer Cold But Lower Cabinet Warm',
        issueEn: 'Deep freezer makes ice normally, but lower fresh-food compartment is room temperature',
        issueBn: 'ডিপে ঠিকমতো বরফ হচ্ছে কিন্তু নিচের চেম্বারে খাবার নষ্ট ও গরম হয়ে যাচ্ছে',
        solutionEn: 'Defrost air duct choke, test bimetal defrost thermostat, and replace faulty defrost timer/heater.',
        solutionBn: 'এয়ার ডাক্টের বরফ গলানো, বাইমেটাল সেন্সর পরীক্ষা এবং ডিফ্রস্ট হিটার পরিবর্তন।'
      },
      {
        code: 'Compressor Humming / Clicking Every 2 Minutes',
        issueEn: 'Compressor clicks on, hums for 5 seconds, clicks off, and fridge remains warm',
        issueBn: 'কম্প্রেসার চালু হওয়ার চেষ্টা করে খটকা আওয়াজ করে বন্ধ হয়ে যাওয়া',
        solutionEn: 'Replace burned PTC start relay and overload protector (OLP) with genuine Kelvinator-compatible parts.',
        solutionBn: 'নষ্ট পিটিসি রিলে ও ওভারলোড প্রটেক্টর (OLP) নতুন পার্টস দিয়ে প্রতিস্থাপন।'
      }
    ],
    searchedKeywords: [
      'kelvinator service centre',
      'kelvinator service centre near me',
      'kelvinator service centre kolkata',
      'kelvinator customer care number',
      'kelvinator customer care',
      'kelvinator fridge repair near me',
      'kelvinator fridge repair kolkata',
      'kelvinator refrigerator not cooling',
      'kelvinator single door fridge cooling problem',
      'kelvinator double door fridge ice melting',
      'kelvinator ac repair near me'
    ],
    faqs: [
      {
        qEn: 'Why is my Kelvinator fridge lower compartment not cooling?',
        qBn: 'কেলভিনেটর ফ্রিজের নিচের চেম্বার ঠান্ডা হচ্ছে না কেন?',
        aEn: 'This is usually caused by a failed defrost timer or blocked air duct preventing cold air circulation. Our technician fixes it at your doorstep. Call +91 6291674186.',
        aBn: 'ডিফ্রস্ট টাইমার বা হিটার খারাপ হলে নিচের চেম্বারে ঠান্ডা যাওয়া বন্ধ হয়ে যায়। আমাদের টেকনিশিয়ান স্পটেই ঠিক করে দেন।'
      },
      {
        qEn: 'How to book Kelvinator fridge repair in Kolkata?',
        qBn: 'কলকাতায় কেলভিনেটর ফ্রিজ মেরামতের জন্য যোগাযোগ নম্বর কোনটি?',
        aEn: 'Call +91 6291674186 or WhatsApp for same-day doorstep service at flat ₹299 inspection visit charge.',
        aBn: 'সরাসরি কল করুন +91 6291674186 নম্বরে অথবা হোয়াটসঅ্যাপ করুন।'
      }
    ]
  },

  'electrolux': {
    slug: 'electrolux',
    name: 'Electrolux',
    headlineEn: 'Electrolux Washing Machine & Refrigerator Repair in Kolkata & West Bengal',
    headlineBn: 'কলকাতায় ইলেকট্রোলাক্স ওয়াশিং মেশিন ও ফ্রিজ ডোরস্টেপ সার্ভিস',
    subheadlineEn: 'Specialist repair for Electrolux Front Load & Top Load Washing Machines, UltimateCare washers & Fridges. 90-min arrival with flat ₹299 inspection fee.',
    subheadlineBn: 'ইলেকট্রোলাক্স ফ্রন্ট লোড ও টপ লোড ওয়াশিং মেশিন এবং ফ্রিজের বিশেষজ্ঞ ডোরস্টেপ সার্ভিস। মাত্র ₹২৯৯ ভিজিট ফিতে দ্রুত ও নির্ভরযোগ্য সমাধান।',
    coverageDescEn: 'Electrolux washing machines offer Scandinavian engineering. We resolve Electrolux E10 water inlet timeout, E20 drain pump errors, E40 door lock faults, drum bearing noise, and refrigerator inverter cooling issues.',
    coverageDescBn: 'ইলেকট্রোলাক্স ওয়াশিং মেশিনের E10 ওয়াটার এরর, E20 ড্রেন পাম্প এরর, E40 ডোর লক এরর, ড্রামে অতিরিক্ত শব্দ এবং ফ্রিজের কুলিং সমস্যার জন্য আমরা দক্ষ টেকনিশিয়ান প্রদান করি।',
    errorCodes: [
      {
        code: 'E20 / E21 Drain Error (Washer)',
        issueEn: 'Washing machine cannot drain water and pauses before spin cycle',
        issueBn: 'মেশিন থেকে নোংরা জল বের হতে না পারা এবং স্পিনের আগে আটকে যাওয়া',
        solutionEn: 'Clean coin filter chamber, check drain pipe hose, and test drain pump magnetic motor.',
        solutionBn: 'কয়েন ফিল্টার খুলে পরিষ্কার, ড্রেন পাইপ চেক এবং ড্রেন পাম্প মোটর টেস্ট।'
      },
      {
        code: 'E10 / E11 Water Inlet Error',
        issueEn: 'Water is not filling into the drum within the preset time limit',
        issueBn: 'নির্ধারিত সময়ে ওয়াশিং মেশিনের ড্রামে জল প্রবেশ না করা',
        solutionEn: 'Clean inlet mesh filter, verify water tap pressure, and replace faulty solenoid valve coil.',
        solutionBn: 'ইনলেট ফিল্টার নেট পরিষ্কার, জলের প্রেসার চেক এবং সলেনয়েড ভালভ মেরামত।'
      },
      {
        code: 'E40 / E41 Door Lock Error',
        issueEn: 'Door is closed but control board does not sense door latch lock',
        issueBn: 'দরজা বন্ধ থাকলেও ডোর লক সুইচ সেন্স না করা',
        solutionEn: 'Replace thermal PTC door interlock switch and check mainboard door sensing circuit.',
        solutionBn: 'ডোর ইন্টারলক সুইচ পরিবর্তন এবং মাদারবোর্ডের ডোর সেন্সিং সার্কিট চেক।'
      }
    ],
    searchedKeywords: [
      'electrolux service centre',
      'electrolux service centre near me',
      'electrolux service centre kolkata',
      'electrolux customer care number',
      'electrolux washing machine repair near me',
      'electrolux washing machine customer care',
      'electrolux front load washing machine e10 error',
      'electrolux front load washing machine e20 error',
      'electrolux front load washing machine e40 error',
      'electrolux fridge repair kolkata'
    ],
    faqs: [
      {
        qEn: 'How to fix E20 error on Electrolux washing machine?',
        qBn: 'ইলেকট্রোলাক্স ওয়াশিং মেশিনের E20 এরর কীভাবে ঠিক করবেন?',
        aEn: 'E20 indicates the water cannot drain away due to a choked coin filter or blocked pump. Our technician cleans the pump and tests the motor at your home. Call +91 6291674186.',
        aBn: 'ড্রেন ফিল্টার বা ড্রেন পাইপ জ্যাম হলে E20 দেখায়। আমাদের টেকনিশিয়ান স্পটেই খুলে পরিষ্কার বা নতুন পাম্প লাগিয়ে দেন।'
      },
      {
        qEn: 'How to book Electrolux repair service in Kolkata?',
        qBn: 'কলকাতায় ইলেকট্রোলাক্স মেরামতের জন্য যোগাযোগ নম্বর কোনটি?',
        aEn: 'Call +91 6291674186 or WhatsApp us for express doorstep visit with 30-day service warranty.',
        aBn: 'সরাসরি কল করুন +91 6291674186 নম্বরে অথবা হোয়াটসঅ্যাপে মেসেজ পাঠান।'
      }
    ]
  },

  'kent': {
    slug: 'kent',
    name: 'Kent RO',
    headlineEn: 'Kent RO Water Purifier Repair & Filter Service in Kolkata & West Bengal',
    headlineBn: 'কলকাতায় কেন্ট আরও ওয়াটার পিউরিফায়ার মেরামত ও ফিল্টার সার্ভিস',
    subheadlineEn: 'Doorstep service for Kent Grand Plus, Prime, Pearl & Mineral RO systems. Membrane replacement, UV lamp repair, and filter changes at flat ₹299 inspection fee.',
    subheadlineBn: 'কেন্ট গ্র্যান্ড প্লাস, প্রাইম ও মিনারেল আরও ওয়াটার পিউরিফায়ারের জেনুইন ফিল্টার ও মেমব্রেন সার্ভিস। মাত্র ₹২৯৯ ভিজিট ফিতে দ্রুত ডোরস্টেপ সমাধান।',
    coverageDescEn: 'Kent is India’s premier RO water purifier brand. We fix continuous alarm beeping, filter life expired alerts, low water flow, tank water leakage, booster pump pressure drop, and foul taste.',
    coverageDescBn: 'কেন্ট পিউরিফায়ারে একনাগাড়ে অ্যালার্ম বাজা, ফিল্টার পরিবর্তনের নোটিফিকেশন, ট্যাঙ্কে জল না জমা, বুস্টার পাম্পের প্রেসার কমে যাওয়া ও জলের স্বাদের সমস্যা আমরা দক্ষ টেকনিশিয়ান দিয়ে সমাধান করি।',
    errorCodes: [
      {
        code: 'Continuous Fast Beeping Sound / Alarm',
        issueEn: 'Kent purifier beeps rapidly every 2 seconds and stops purifying water',
        issueBn: 'কেন্ট পিউরিফায়ার থেকে একটানা দ্রুত অ্যালার্ম বা বিপ শব্দ হওয়া এবং জল ফিল্টার বন্ধ হওয়া',
        solutionEn: 'Inspect UV lamp ballast choke, replace burned UV quartz tube, and check solenoid valve.',
        solutionBn: 'ইউভি ল্যাম্পের চোক অ্যাডাপ্টার পরীক্ষা, নষ্ট ইউভি টিউব পরিবর্তন এবং এসভি ভালভ চেক।'
      },
      {
        code: 'Slow Beeping Sound / Filter Alert',
        issueEn: 'Machine beeps 4 times every 2 seconds indicating filter service life cycle reached',
        issueBn: 'মেশিন থেমে থেমে বিপ শব্দ করছে (ফিল্টারের কার্যক্ষমতা শেষ হওয়ার সতর্কবার্তা)',
        solutionEn: 'Replace sediment filter, activated carbon block, UF membrane, and perform system reset.',
        solutionBn: 'সেডিমেন্ট ফিল্টার, কার্বন ফিল্টার ও ইউএফ মেমব্রেন নতুন লাগানো এবং সিস্টেম রিসেট।'
      },
      {
        code: 'Water Not Flowing into Storage Tank',
        issueEn: 'Power adapter is on, but zero purified water drips into the clean water tank',
        issueBn: 'মেশিন অন আছে কিন্তু পিউরিফাইড জলের ট্যাঙ্কে এক ফোঁটাও জল ভরছে না',
        solutionEn: 'Test 24V booster pump pressure (must exceed 80 PSI), replace choked RO membrane and pre-filter candle.',
        solutionBn: 'বুস্টার পাম্পের প্রেসার গেজ টেস্ট (৮০ পিএসআই এর বেশি হতে হবে), জ্যাম মেমব্রেন ও প্রি-ফিল্টার মোমবাতি পরিবর্তন।'
      }
    ],
    searchedKeywords: [
      'kent service centre',
      'kent service centre near me',
      'kent service centre kolkata',
      'kent service centre kolkata phone number',
      'kent customer care number',
      'kent customer care number 24x7',
      'kent ro service near me',
      'kent ro customer care',
      'kent water purifier repair kolkata',
      'kent ro filter change cost',
      'kent ro membrane change',
      'kent ro continuous beeping sound',
      'kent ro water not coming in tank'
    ],
    faqs: [
      {
        qEn: 'Why is my Kent RO water purifier beeping continuously?',
        qBn: 'কেন্ট আরও পিউরিফায়ার থেকে একনাগাড়ে বিপ শব্দ হচ্ছে কেন?',
        aEn: 'A continuous alarm indicates UV lamp failure or filter life exhaustion. Our technician tests the UV choke and replaces the bulb/filter at your doorstep. Call +91 6291674186.',
        aBn: 'ইউভি ল্যাম্প কেটে গেলে অথবা ফিল্টারের বয়স শেষ হলে এই বিপ শব্দ হয়। আমাদের টেকনিশিয়ান স্পটেই নতুন ফিল্টার বা ইউভি ল্যাম্প লাগিয়ে দেন।'
      },
      {
        qEn: 'How much does Kent RO filter service cost?',
        qBn: 'কেন্ট আরও ফিল্টার সার্ভিসের খরচ কত?',
        aEn: 'Doorstep inspection is flat ₹299. Genuine sediment, carbon, and RO membrane replacements are shared with transparent pricing before work. Call +91 6291674186.',
        aBn: 'ভিজিট চার্জ মাত্র ₹২৯৯। কোনো ফিল্টার পরিবর্তনের প্রয়োজন হলে আগেই রেট জানিয়ে অনুমোদন নেওয়া হয়।'
      },
      {
        qEn: 'How to book Kent RO repair in Kolkata?',
        qBn: 'কলকাতায় কেন্ট আরও মেরামতের জন্য যোগাযোগ নম্বর কোনটি?',
        aEn: 'Call +91 6291674186 or WhatsApp for same-day service across Kolkata and Howrah.',
        aBn: 'সরাসরি কল করুন +91 6291674186 নম্বরে অথবা হোয়াটসঅ্যাপে মেসেজ পাঠান।'
      }
    ]
  },

  'aquaguard': {
    slug: 'aquaguard',
    name: 'Aquaguard',
    headlineEn: 'Aquaguard & Eureka Forbes Water Purifier Service Support in Kolkata & West Bengal',
    headlineBn: 'কলকাতায় অ্যাকোয়াগার্ড ও ইউরেকা ফোর্বস ওয়াটার পিউরিফায়ার সার্ভিস',
    subheadlineEn: 'Doorstep maintenance for Aquaguard Enhance, Magna, Geneus & Neo RO+UV Purifiers. Genuine filter cartridges, booster pumps & membrane replacement at ₹299 visit fee.',
    subheadlineBn: 'অ্যাকোয়াগার্ড এনহ্যান্স, ম্যাগনা ও নিও আরও+ইউভি পিউরিফায়ারের জেনুইন ফিল্টার ও মেমব্রেন সার্ভিস। মাত্র ₹২৯৯ ভিজিট ফিতে দ্রুত ডোরস্টেপ সমাধান।',
    coverageDescEn: 'Aquaguard water purifiers are trusted by millions. We resolve Aquaguard red light blinking, electronic life lock alert, water leaking from base, low water output, and motor humming sounds.',
    coverageDescBn: 'অ্যাকোয়াগার্ডে লাল বাতি ব্লিংক করা, জল লিকেজ হওয়া, জল আসতে দেরি হওয়া, ট্যাঙ্কে নোংরা গন্ধ বা অস্বচ্ছ স্বাদের সমস্যায় আমরা অরিজিনাল পার্টস ও অভিজ্ঞ টেকনিশিয়ান প্রদান করি।',
    errorCodes: [
      {
        code: 'Red Light Blinking with Beep Alert',
        issueEn: 'Aquaguard purifier shows red service indicator and locks water purification cycle',
        issueBn: 'লাল লাইট ব্লিংক করা এবং ওয়াটার পিউরিফিকেশন লক হয়ে যাওয়া',
        solutionEn: 'Scan internal electronic smart chip, replace exhausted clarity/chemi-block cartridges, and unlock machine.',
        solutionBn: 'স্মার্ট চিপ চেক, মেয়া উত্তীর্ণ ক্ল্যারিটি ও কেমি-ব্লক কার্ট্রিজ পরিবর্তন এবং সিস্টেম আনলক।'
      },
      {
        code: 'Water Leaking from Purifier Bottom Body',
        issueEn: 'Constant drip or puddle forming under the water purifier cabinet',
        issueBn: 'পিউরিফায়ারের নিচের বডি বা পাইপ সংযোগ থেকে অনবরত জল পড়া',
        solutionEn: 'Replace worn O-ring seals, cracked filter housing bowls, or loose quick-fit elbow push connectors.',
        solutionBn: 'নষ্ট ও-রিং রবার সিল, ফাটা হাউজিং বা লুজ ফিটিং এলবো নতুন কানেক্টর দিয়ে পরিবর্তন।'
      }
    ],
    searchedKeywords: [
      'aquaguard service centre',
      'aquaguard service centre near me',
      'aquaguard service centre kolkata',
      'aquaguard customer care number',
      'aquaguard customer care number 24x7',
      'aquaguard ro repair near me',
      'aquaguard water purifier repair kolkata',
      'aquaguard filter change service',
      'aquaguard red light blinking',
      'aquaguard water leakage repair',
      'eureka forbes customer care number kolkata',
      'aquaguard service request online'
    ],
    faqs: [
      {
        qEn: 'Why is the red light blinking on my Aquaguard purifier?',
        qBn: 'অ্যাকোয়াগার্ড পিউরিফায়ারে লাল লাইট ব্লিংক করছে কেন?',
        aEn: 'The red blinking light signals that filter cartridges have reached their purification capacity and require replacement. Our technician services it at your home. Call +91 6291674186.',
        aBn: 'ফিল্টারের কার্যক্ষমতা শেষ হয়ে গেলে লাল লাইট জ্বলে। আমাদের টেকনিশিয়ান আপনার বাড়িতে এসেই নতুন ফিল্টার লাগিয়ে সিস্টেম চালু করে দেন।'
      },
      {
        qEn: 'How to book Aquaguard water purifier repair in Kolkata?',
        qBn: 'কলকাতায় অ্যাকোয়াগার্ড মেরামতের জন্য কীভাবে বুক করবেন?',
        aEn: 'Call +91 6291674186 or WhatsApp for same-day doorstep inspection across Kolkata and Howrah at flat ₹299.',
        aBn: 'সরাসরি কল করুন +91 6291674186 নম্বরে অথবা হোয়াটসঅ্যাপে মেসেজ পাঠান।'
      }
    ]
  },

  'livpure': {
    slug: 'livpure',
    name: 'Livpure',
    headlineEn: 'Livpure RO Water Purifier Repair & Maintenance Service in Kolkata',
    headlineBn: 'কলকাতায় লিভপিওর আরও ওয়াটার পিউরিফায়ার ডোরস্টেপ সার্ভিস',
    subheadlineEn: 'Doorstep repair for Livpure Glo, Bolt, Platino & Pep RO systems. Filter replacement, booster pump repair & membrane maintenance at flat ₹299 inspection visit fee.',
    subheadlineBn: 'লিভপিওর গ্লো, বোল্ট ও পেপ আরও ওয়াটার পিউরিফায়ারের ফিল্টার, বুস্টার পাম্প ও মেমব্রেন সার্ভিস। মাত্র ₹২৯৯ ভিজিট ফিতে দ্রুত ডোরস্টেপ সমাধান।',
    coverageDescEn: 'Livpure provides smart RO purification systems. We resolve purifier not turning on, wastewater leaking continuously while pure water tank is empty, low TDS issues, and power SMPS failures.',
    coverageDescBn: 'লিভপিওরের পাওয়ার অন না হওয়া, অনবরত ড্রেন দিয়ে জল বয়ে যাওয়া কিন্তু ফিল্টারে জল না জমা, টিডিএস অস্বাভাবিক হওয়া ও পাম্পের ত্রুটির দক্ষ সমাধান দিই।',
    errorCodes: [
      {
        code: 'Water Purifier Not Turning On (No Power)',
        issueEn: 'LED indicator lights are completely off and motor does not start',
        issueBn: 'পিউরিফায়ারের লাইট জ্বলছে না এবং মোটর স্টার্ট হচ্ছে না',
        solutionEn: 'Test 24V DC SMPS power supply adapter, inspect low-pressure switch (LPS), and check internal wiring.',
        solutionBn: '২৪ ভোল্ট এসএমপিএস পাওয়ার অ্যাডাপ্টার টেস্ট, লো প্রেসার সুইচ চেক এবং অভ্যন্তরীণ ওয়্যারিং মেরামত।'
      },
      {
        code: 'Continuous Reject Water Flow But Tank Is Empty',
        issueEn: 'Reject drain pipe keeps draining water nonstop while pure water does not fill the tank',
        issueBn: 'ড্রেন পাইপ দিয়ে জল পড়ে যাচ্ছে কিন্তু পরিষ্কার জলের ট্যাঙ্ক খালি থাকছে',
        solutionEn: 'Replace choked 75/80 GPD RO membrane and unclog 450cc flow restrictor (FR).',
        solutionBn: 'জ্যাম মেমব্রেন নতুন ৭৫/৮০ জিপিডি মেমব্রেন দিয়ে পরিবর্তন এবং এফআর ভালভ চেক।'
      }
    ],
    searchedKeywords: [
      'livpure service centre',
      'livpure service centre near me',
      'livpure service centre kolkata',
      'livpure customer care number',
      'livpure customer care number 24x7',
      'livpure ro service near me',
      'livpure water purifier repair kolkata',
      'livpure filter change cost',
      'livpure ro tank not filling',
      'livpure ro motor not starting'
    ],
    faqs: [
      {
        qEn: 'How to contact Livpure RO service support in Kolkata?',
        qBn: 'কলকাতায় লিভপিওর আরও সার্ভিসের ফোন নম্বর কোনটি?',
        aEn: 'Call our direct helpline +91 6291674186 or WhatsApp us for instant doorstep booking at flat ₹299 inspection fee.',
        aBn: 'সরাসরি কল করুন +91 6291674186 নম্বরে অথবা হোয়াটসঅ্যাপে বুক করুন।'
      },
      {
        qEn: 'Why is my Livpure RO water tank not filling up?',
        qBn: 'লিভপিওর আরও ওয়াটার ট্যাঙ্ক ভরছে না কেন?',
        aEn: 'This typically means the pre-filters or RO membrane are choked, or the booster pump pressure has dropped. Our technician tests and fixes this at your home. Call +91 6291674186.',
        aBn: 'মেমব্রেন বা প্রি-ফিল্টার জ্যাম হলে অথবা পাম্পের প্রেসার কমে গেলে এমন হয়। আমাদের টেকনিশিয়ান স্পটেই সমাধান করে দেন।'
      }
    ]
  },

  'pureit': {
    slug: 'pureit',
    name: 'Pureit',
    headlineEn: 'Pureit RO Water Purifier Repair & GKK Replacement Service in Kolkata',
    headlineBn: 'কলকাতায় পিউরিট আরও ওয়াটার পিউরিফায়ার ও জিকেকে পরিবর্তন সার্ভিস',
    subheadlineEn: 'Doorstep service for Pureit Classic, Marvella, Copper & Advanced RO systems. Germkill Kit (GKK) change, booster pump servicing, and leak repairs at ₹299 visit fee.',
    subheadlineBn: 'পিউরিট ক্লাসিক, মারভেলা, কপার ও অ্যাডভান্সড আরও পিউরিফায়ারের জিকেকে কিট পরিবর্তন ও মেমব্রেন সার্ভিস। মাত্র ₹২৯৯ ভিজিট ফিতে দ্রুত সমাধান।',
    coverageDescEn: 'Hindustan Unilever Pureit purifiers ensure safe drinking water. We handle Pureit GKK red alert lockout, internal water leakage, booster pump pressure drop, and taste enhancement cartridge replacement.',
    coverageDescBn: 'পিউরিটে লাল সংকেত (জিকেকে এক্সপায়ার), ওয়াটার লিকেজ, মোটর বন্ধ হওয়া এবং ফিল্টারের ত্রুটি সারাতে আমরা অরিজিনাল কিট ও দক্ষ মেকানিক প্রদান করি।',
    errorCodes: [
      {
        code: 'GKK Red Indicator / Auto Shut-Off Lock',
        issueEn: 'Red light blinks or glows steadily and auto shut-off mechanism stops water delivery',
        issueBn: 'লাল লাইট জ্বলে ওঠা এবং অটো শাট-অফ সক্রিয় হয়ে জল ফিল্টার হওয়া বন্ধ হয়ে যাওয়া',
        solutionEn: 'Install genuine Pureit Germkill Kit (GKK-1 or GKK-2), replace carbon polisher, and reset mechanical counter.',
        solutionBn: 'নতুন অরিজিনাল পিউরিট জিকেকে কিট লাগানো, কার্বন পলিশার পরিবর্তন এবং মেকানিক্যাল কাউন্টার রিসেট।'
      },
      {
        code: 'Internal Water Leaking from Machine Body',
        issueEn: 'Water pools on the countertop or drips continuously from inside the front cover',
        issueBn: 'পিউরিফায়ারের ভেতর থেকে কাউন্টারটপে জল চুইয়ে পড়া',
        solutionEn: 'Replace split high-pressure tubing, reseal cracked pump head, and inspect solenoid valve ports.',
        solutionBn: 'ফাটা হাই-প্রেসার পাইপ ও পাম্প হেড মেরামত এবং এসভি ভালভ সংযোগ পরীক্ষা।'
      }
    ],
    searchedKeywords: [
      'pureit service centre',
      'pureit service centre near me',
      'pureit service centre kolkata',
      'pureit customer care number',
      'pureit customer care',
      'pureit ro service near me',
      'pureit water purifier repair kolkata',
      'pureit gkk replacement cost',
      'pureit red alert indicator',
      'pureit ro water leaking from bottom',
      'pureit auto shut off not working'
    ],
    faqs: [
      {
        qEn: 'Why has my Pureit water purifier stopped giving water with a red light?',
        qBn: 'পিউরিট ওয়াটার পিউরিফায়ারে লাল লাইট জ্বলে জল আসা বন্ধ হয়ে গেছে কেন?',
        aEn: 'Pureit purifiers feature an Auto Shut-Off mechanism that locks when the Germkill Kit (GKK) expires to ensure safe water. Our technician installs a genuine new GKK kit at your doorstep. Call +91 6291674186.',
        aBn: 'জিকেকে কিটের মেয়াদ শেষ হলে অটো শাট-অফ হয়ে জল বন্ধ হয়ে যায়। আমাদের টেকনিশিয়ান স্পটেই নতুন অরিজিনাল কিট লাগিয়ে রিসেট করে দেন।'
      },
      {
        qEn: 'How to book Pureit water purifier repair in Kolkata?',
        qBn: 'কলকাতায় পিউরিট পিউরিফায়ার মেরামতের জন্য কীভাবে বুক করবেন?',
        aEn: 'Call +91 6291674186 or WhatsApp us for doorstep visit at flat ₹299 inspection charge across Kolkata and Howrah.',
        aBn: 'সরাসরি কল করুন +91 6291674186 নম্বরে অথবা হোয়াটসঅ্যাপে মেসেজ পাঠান।'
      }
    ]
  }
};
