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
      'general service centre kolkata',
      'general customer care number',
      'general customer care whatsapp number',
      'general ac repair near me',
      'general ac not cooling',
      'general ac not cooling properly',
      'general ac not working with remote',
      'general ac inverter 1.5 ton error code'
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
      'lloyd service centre number',
      'lloyd service centre near me',
      'lloyd customer care number 24x7',
      'lloyd ac repair near me',
      'lloyd ac service kolkata',
      'lloyd ac not cooling but fan is running',
      'lloyd ac not cooling remote setting',
      'why is my lloyd ac not cooling',
      'lloyd fridge double door',
      'lloyd washing machine customer care number',
      'lloyd top load washing machine e3 error',
      'lloyd top load washing machine f8 error',
      'lloyd front load washing machine error code list'
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
      'blue star service centre kolkata',
      'blue star service centre number',
      'blue star customer care number 24x7',
      'blue star ac repair near me',
      'blue star ac service request',
      'blue star ac service charges',
      'blue star ac installation charges',
      'blue star ac not working with remote',
      'blue star inverter ac e6 error code',
      'e6 error in blue star inverter ac'
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
      'daikin customer care toll free number india 24x7',
      'daikin customer support number',
      'daikin ac repair near me',
      'daikin ac service charges',
      'daikin ac service request',
      'daikin ac installation customer care number',
      'daikin ac installation charges'
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
      'mitsubishi customer care number',
      'mitsubishi customer care toll free number india',
      'mitsubishi ac repair near me',
      'mitsubishi ac repair complaint number',
      'mitsubishi ac service center near me',
      'mitsubishi ac service booking',
      'mitsubishi ac installation charges'
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
      'ifb customer care toll free number india 24x7',
      'ifb service centre kolkata',
      'ifb service centre kolkata contact number',
      'ifb ac repair near me',
      'ifb ac service charges',
      'ifb fridge repair',
      'ifb washing machine customer care number',
      'ifb top load washing machine error code list',
      'ifb front load washing machine repair near me',
      'ifb front load washing machine spare parts price list',
      'ifb micro oven repair',
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
      'whirlpool customer care number 24x7',
      'whirlpool ac repair near me',
      'whirlpool fridge repair near me',
      'whirlpool refrigerator repair service centre',
      'whirlpool washing machine repair near me',
      'whirlpool top load washing machine e1 error',
      'whirlpool micro oven service centre'
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
      'hitachi customer support number',
      'hitachi service centre kolkata phone number',
      'hitachi ac repair near me',
      'hitachi ac repair service',
      'hitachi ac installation charges',
      'hitachi fridge repair near me',
      'hitachi inverter fridge pcb',
      'hitachi inverter fridge temperature control',
      'hitachi double door refrigerator'
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
  }
};
