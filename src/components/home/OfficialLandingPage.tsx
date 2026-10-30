'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Clock,
  Wrench,
  CheckCircle2,
  Phone,
  MessageCircle,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Award,
  FileText,
  Check,
  Star,
  Calendar
} from 'lucide-react';
import BookingModal from '@/components/modal/BookingModal';
import HomeSeoContent from '@/components/home/HomeSeoContent';
import { Category, Brand, LocationItem, SiteSettings, Review, Language } from '@/lib/types';
import '@/app/official-landing.css';

interface OfficialLandingPageProps {
  categories: Category[];
  brands: Brand[];
  locations: LocationItem[];
  settings: SiteSettings;
  reviews: Review[];
  lang?: Language;
}

interface ServiceItem {
  title: string;
  desc: string;
  time: string;
  badge?: string;
  estimateType: string;
}

interface ApplianceShowcase {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  headline: string;
  desc: string;
  image: string;
  badge: string;
  specs: string[];
  services: ServiceItem[];
}

const APPLIANCES: ApplianceShowcase[] = [
  {
    id: 'ac-repair',
    name: 'Air Conditioners',
    icon: '❄️',
    tagline: 'Split, Window & Inverter AC Systems',
    headline: 'High-Efficiency Air Conditioning Engineering',
    desc: 'Restore maximum cooling performance, silent airflow, and optimal energy efficiency. Factory-trained specialists equipped with digital manifolds, vacuum pumps, and pure R32/R410A refrigerants.',
    image: '/images/split_ac_unit.jpg',
    badge: 'Same-Day Cooling SLA',
    specs: [
      'Certified R32 / R410A sealed gas recovery & charging',
      'High-pressure power jet pump coil cleaning',
      'Original Daikin, Voltas, LG & Samsung replacement capacitors',
      'Micro-leakage nitrogen pressure testing'
    ],
    services: [
      {
        title: 'Jet Pump Deep Servicing & Coil Flush',
        desc: 'Foam wash, indoor coil deep chemical jet flush, blower wheel cleaning & drain line sanitization.',
        time: '45 Mins',
        badge: 'Most Booked',
        estimateType: 'Fixed Service Quote'
      },
      {
        title: 'Cooling Restoration & Gas Leakage Repair',
        desc: 'Nitrogen pressure testing, brazing copper joint leak, vacuuming and precision refrigerant charging.',
        time: '90 Mins',
        badge: 'Critical Fix',
        estimateType: 'Transparent Leak Estimate'
      },
      {
        title: 'Compressor & Inverter PCB Circuit Diagnostics',
        desc: 'Digital multimeter trace, relay test, inverter sensor testing and circuit board component repair.',
        time: '60 Mins',
        estimateType: 'Digital Inspection First'
      },
      {
        title: 'Indoor Unit Water Dripping & Drain Pipe Fix',
        desc: 'Condensate tray clearing, pitch realignment, anti-algae flush and insulated drain replacement.',
        time: '35 Mins',
        estimateType: 'Fixed Labor Quote'
      },
      {
        title: 'Complete Split AC Dismantling & Installation',
        desc: 'Heavy-duty wall mounting, vacuum pump line clearing, flare nut sealing and safety run test.',
        time: '120 Mins',
        estimateType: 'Standard Mounting Quote'
      }
    ]
  },
  {
    id: 'fridge-repair',
    name: 'Refrigerators',
    icon: '🧊',
    tagline: 'Single, Double Door & Side-by-Side Care',
    headline: 'Thermal Precision & Preservation Restoration',
    desc: 'Prevent food spoilage with immediate doorstep refrigeration repair. Comprehensive troubleshooting for inverter compressors, defrost systems, bi-metal thermostats, and sealed cooling coils.',
    image: '/images/unit_refrigerator.jpg',
    badge: 'Zero Spoilage Priority',
    specs: [
      'Factory thermostat calibration & thermal sensor replacement',
      'Defrost timer, heater and bi-metal relay restoration',
      'Original inverter compressor gas charging (R600a / R134a)',
      'Cabinet odor sanitization & magnetic door gasket sealing'
    ],
    services: [
      {
        title: 'Defrost Failure & Freezer Ice Accumulation',
        desc: 'Heater continuity check, bi-metal thermostat test, drain chute thawing and electronic timer swap.',
        time: '45 Mins',
        badge: 'Common Issue',
        estimateType: 'Upfront Itemized Quote'
      },
      {
        title: 'Compressor Not Starting / Humming Sound',
        desc: 'PTC starter relay replacement, overload protector test, and capacitor resistance diagnostics.',
        time: '40 Mins',
        estimateType: 'Diagnostic Check'
      },
      {
        title: 'Refrigerant Gas Recharge & Filter Drier Replacement',
        desc: 'System flush, vacuum pump dehydration, pinhole sealing and pure R600a refrigerant charge.',
        time: '75 Mins',
        badge: 'Sealed Loop',
        estimateType: 'Transparent Gas Estimate'
      },
      {
        title: 'Refrigerator Comprehensive Health Check',
        desc: '16-point diagnostic inspection: compressor amps, evaporator fans, seal air-tightness & cooling curve.',
        time: '30 Mins',
        estimateType: 'Complimentary with Repair'
      }
    ]
  },
  {
    id: 'washing-machine-repair',
    name: 'Washing Machines',
    icon: '🧺',
    tagline: 'Front Load & Top Load Automation Care',
    headline: 'Smooth Drum Mechanics & Electronics Reconditioning',
    desc: 'Eliminate loud spin vibration, draining blockages, and error code lockouts. Certified technicians for Bosch, IFB, LG, Samsung, and Whirlpool automatic washers.',
    image: '/images/unit_washing_machine.jpg',
    badge: 'Vibration & Drum Certified',
    specs: [
      'Heavy-duty drum spider, bearing & seal replacement',
      'Inlet solenoid valve & drain pump motor replacements',
      'Electronic motherboard PCB micro-soldering and error code clearing',
      'Shock absorber replacement and dynamic balancing'
    ],
    services: [
      {
        title: 'Excessive Vibration & Loud Drum Noise',
        desc: 'Shock absorber inspection, balance spring check, drum spider evaluation and bearing alignment.',
        time: '60 Mins',
        badge: 'Popular',
        estimateType: 'Fixed Mechanical Quote'
      },
      {
        title: 'Water Draining Failure (OE / E20 / 5E Error)',
        desc: 'Drain motor pump clearing, coin-trap declogging, lint filter cleanout and circuit trace.',
        time: '40 Mins',
        estimateType: 'Standard Diagnostic'
      },
      {
        title: 'Water Inlet / Filling Issue (IE / 4E Error)',
        desc: 'Dual solenoid valve flow testing, mesh filter descaling and water pressure switch calibration.',
        time: '35 Mins',
        estimateType: 'Fixed Valve Estimate'
      },
      {
        title: 'Drum Not Spinning / Motor Belt Replacement',
        desc: 'Drive belt replacement, carbon brush replacement, clutch inspection and motor run test.',
        time: '50 Mins',
        estimateType: 'Upfront Written Quote'
      }
    ]
  },
  {
    id: 'tv-repair',
    name: 'Smart & LED TVs',
    icon: '📺',
    tagline: '4K OLED, QLED & Smart Display Diagnostics',
    headline: 'High-Definition Screen & Board Diagnostics',
    desc: 'Restore crystal-clear picture and immersive audio. Specialized board-level micro-soldering, backlight strip replacements, and power supply (SMPS) restorations for Sony, Samsung, LG, and TCL.',
    image: '/images/unit_smart_led_tv.jpg',
    badge: 'Panel & Sound Lab Tested',
    specs: [
      'Original LED backlight strip replacement with uniform lux',
      'Power supply (SMPS) capacitor and diode rebuilding',
      'T-CON logic board and ribbon flex cable bonding diagnostics',
      'Smart TV Android OS motherboard firmware re-flashing'
    ],
    services: [
      {
        title: 'Sound Present But No Screen Display (Black Screen)',
        desc: 'Backlight array driver diagnosis, full prism lens replacement, and constant-current balancing.',
        time: '90 Mins',
        badge: 'High Demand',
        estimateType: 'Diagnostic Estimate'
      },
      {
        title: 'Dead TV / Red Light Blinking / Standby Mode',
        desc: 'SMPS power board circuit inspection, rectifier testing, secondary voltage stabilization.',
        time: '60 Mins',
        estimateType: 'Circuit Board Quote'
      },
      {
        title: 'Display Lines, Flickering or Double Image Fix',
        desc: 'T-CON board timing check, COF IC thermal testing and LVDS ribbon replacement.',
        time: '75 Mins',
        estimateType: 'Panel Lab Inspection'
      },
      {
        title: 'Wall Mount Precision Bracket Installation',
        desc: 'Laser-level stud mounting, heavy-gauge cantilever arms, and cable conceal guidance.',
        time: '45 Mins',
        estimateType: 'Standard Mounting'
      }
    ]
  },
  {
    id: 'microwave-repair',
    name: 'Microwave Ovens',
    icon: '⚡',
    tagline: 'Solo, Grill & Convection Safety Care',
    headline: 'Radiation-Safe Microwave & Heating Systems',
    desc: 'Fast, secure repair for unresponsive touchpads, heating failure, and internal spark hazards. Calibrated testing ensures zero microwave radiation leakage for total household safety.',
    image: '/images/unit_microwave_oven.jpg',
    badge: 'Radiation Safe Certified',
    specs: [
      'Original OEM magnetron tube replacement with RF leakage check',
      'High-voltage capacitor and diode safety replacement',
      'Door interlock micro-switch alignment for child safety',
      'Touchpad membrane and thermal fuse restoration'
    ],
    services: [
      {
        title: 'Oven Runs But Food Remains Cold (No Heating)',
        desc: 'High-voltage transformer, magnetron emission check, HV diode test and thermal cut-off scan.',
        time: '45 Mins',
        badge: 'Top Repair',
        estimateType: 'Upfront Magnetron Quote'
      },
      {
        title: 'Sparking / Arcing Inside Cooking Cavity',
        desc: 'Mica waveguide cover replacement, paint cavity sealing, and antenna cap inspection.',
        time: '30 Mins',
        estimateType: 'Safety Inspection Quote'
      },
      {
        title: 'Turntable Plate Not Rotating / Motor Hum',
        desc: 'Synchronous turntable drive motor replacement, roller ring check and coupler seating.',
        time: '25 Mins',
        estimateType: 'Fixed Motor Estimate'
      },
      {
        title: 'Touch Membrane Unresponsive / Error Codes',
        desc: 'Keypad ribbon cable clean, capacitive touch overlay replacement and control board test.',
        time: '40 Mins',
        estimateType: 'Panel Circuit Quote'
      }
    ]
  }
];

// Top 16 Global Brands with 100% Authentic Original Logos
const BRAND_SHOWCASE = [
  { name: 'Daikin', logo: '/images/brands/daikin.svg' },
  { name: 'Samsung', logo: '/images/brands/samsung.svg' },
  { name: 'LG', logo: '/images/brands/lg.svg' },
  { name: 'Voltas', logo: '/images/brands/voltas.svg' },
  { name: 'Whirlpool', logo: '/images/brands/whirlpool.svg' },
  { name: 'Bosch', logo: '/images/brands/bosch.svg' },
  { name: 'IFB', logo: '/images/brands/ifb.svg' },
  { name: 'Panasonic', logo: '/images/brands/panasonic.svg' },
  { name: 'Carrier', logo: '/images/brands/carrier.svg' },
  { name: 'Hitachi', logo: '/images/brands/hitachi.svg' },
  { name: 'Mitsubishi', logo: '/images/brands/mitsubishi.svg' },
  { name: 'Blue Star', logo: '/images/brands/blue-star.svg' },
  { name: 'Godrej', logo: '/images/brands/godrej.svg' },
  { name: 'Haier', logo: '/images/brands/haier.svg' },
  { name: 'Sony', logo: '/images/brands/sony.svg' },
  { name: 'O General', logo: '/images/brands/o-general.svg' }
];

export default function OfficialLandingPage({
  categories,
  brands,
  locations,
  settings,
  reviews,
  lang = 'en'
}: OfficialLandingPageProps) {
  const [selectedId, setSelectedId] = useState<string>('ac-repair');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingCategory, setBookingCategory] = useState<string>('');
  const [bookingProblem, setBookingProblem] = useState<string>('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeAppliance = APPLIANCES.find((a) => a.id === selectedId) || APPLIANCES[0];

  const handleOpenBooking = (catId?: string, problemTitle?: string) => {
    setBookingCategory(catId || selectedId);
    setBookingProblem(problemTitle || '');
    setIsBookingOpen(true);
  };

  const isBn = lang === 'bn';

  const faqs = [
    {
      q: isBn ? 'কত দ্রুত টেকনিশিয়ান আমার বাড়িতে পৌঁছাবেন?' : 'How fast does an official technician arrive at my home?',
      a: isBn ? 'কলকাতা ও পার্শ্ববর্তী এলাকায় (সল্টলেক, নিউ টাউন, দমদম, বেহালা, গড়িয়া, ব্যারাকপুর, হাওড়া) গড় পৌঁছানোর সময় ৪৫ থেকে ৬০ মিনিট।' : 'Across Kolkata and West Bengal service corridors (Salt Lake, New Town, Dum Dum, Behala, Howrah, Barrackpore, Garia), our average engineer arrival time is 45 to 60 minutes from confirmation.'
    },
    {
      q: isBn ? 'স্পেয়ার পার্টস কি ১০০% জেনুইন ও আসল?' : 'Are replacement spare parts 100% genuine and original?',
      a: isBn ? 'হ্যাঁ, ১০০% জেনুইন। প্রস্তুতকারকের অনুমোদিত ডিস্ট্রিবিউটর থেকে সরাসরি আসল পার্টস আনা হয় এবং প্রতিটির সাথে ওয়ারেন্টি সার্টিফিকেট দেওয়া হয়।' : 'Yes, absolutely. We source all capacitors, fan motors, sealed compressors, sensors, and PC boards directly through manufacturer authorized OEM supply networks. Every part includes an official warranty certificate.'
    },
    {
      q: isBn ? '৯০ দিনের সার্ভিসের ওয়ারেন্টিতে কি কি অন্তর্ভুক্ত?' : 'What is covered under the 90-Day Comprehensive Warranty?',
      a: isBn ? 'কাজের ৯০ দিনের মধ্যে একই সমস্যা পুনরায় দেখা দিলে সিনিয়র টেকনিশিয়ান সম্পূর্ণ বিনামূল্যে স্পটে এসে ঠিক করে দেন — কোনো অতিরিক্ত ভিজিট বা লেবার চার্জ নেই।' : 'If the identical technical defect reoccurs within 90 days of the repair date, a senior technician arrives and resolves it completely free of charge — zero inspection fee, zero labor fee.'
    },
    {
      q: isBn ? 'কাজের আগে কি সঠিক খরচের হিসাব জানা যাবে?' : 'Is there any hidden cost or surprise bill after inspection?',
      a: isBn ? 'হ্যাঁ, কোনো কাজ শুরুর আগেই টেকনিশিয়ান স্পটে ডিজিটাল চেকলিস্টের মাধ্যমে আইটেমাইজড বাজেট দেখিয়ে আপনার অনুমতি নিয়ে কাজ শুরু করেন।' : 'Never. Our technician performs a multi-point digital diagnostic check and presents an itemized estimate for your approval BEFORE turning a single screw. You remain entirely in control.'
    }
  ];

  return (
    <div className="off-page">
      {/* 1. Global Top Announcement Bar */}
      <div className="off-topbar">
        <div className="off-topbar-inner">
          <div className="off-status-live">
            <span className="off-live-dot" />
            <span>
              {isBn
                ? 'অনুমোদিত মাল্টি-ব্র্যান্ড ডোরস্টেপ সার্ভিস নেটওয়ার্ক • কলকাতা ও পশ্চিমবঙ্গ জুড়ে সক্রিয়'
                : 'Authorized Multi-Brand Doorstep Service Network • Active Across Kolkata & West Bengal'}
            </span>
          </div>
          <div className="off-topbar-right">
            <span>{isBn ? 'কাস্টমার হেল্পডেস্ক: সকাল ৮টা - রাত ৯টা' : 'Customer Desk: 8:00 AM - 9:00 PM'}</span>
            <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="off-topbar-contact">
              <Phone size={13} />
              <span>{settings.phone}</span>
            </a>
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Appliance%20Seva,%20I%20need%20doorstep%20service`}
              target="_blank"
              rel="noopener noreferrer"
              className="off-topbar-contact"
            >
              <MessageCircle size={13} />
              <span>WhatsApp Priority</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Official Corporate Header */}
      <header className="off-header">
        <div className="off-header-inner">
          <Link href={isBn ? '/bn' : '/'} className="off-brand">
            <img
              src="/logo-icon.svg"
              alt="Appliance Seva Logo"
              width={42}
              height={42}
              style={{ objectFit: 'contain' }}
            />
            <div className="off-brand-text">
              <span className="off-brand-title">Home Appliance Care</span>
              <span className="off-brand-badge">Official Doorstep Engineering</span>
            </div>
          </Link>

          <nav className="off-nav">
            <a href="#showcase" className="off-nav-item active">{isBn ? 'অ্যাপ্লায়েন্স ডিরেক্টরি' : 'Appliance Directory'}</a>
            <a href="#catalog" className="off-nav-item">{isBn ? 'সার্ভিস ক্যাটালগ' : 'Service Catalog'}</a>
            <a href="#standards" className="off-nav-item">{isBn ? 'গুণমান ও প্রতিশ্রুতি' : 'Standards & Assurance'}</a>
            <a href="#rates" className="off-nav-item">{isBn ? 'সার্ভিস স্কোপ' : 'Service Scope'}</a>
            <a href="#reviews" className="off-nav-item">{isBn ? 'গ্রাহক মতামত' : 'Verified Proof'}</a>
          </nav>

          <div className="off-header-actions">
            <Link href="/invoice/AS-INV-2026-000001" className="off-btn-invoice">
              <FileText size={14} />
              <span>{isBn ? 'ইনভয়েস পোর্টাল' : 'Invoice Portal'}</span>
            </Link>
            <button
              onClick={() => handleOpenBooking()}
              className="off-btn-book"
            >
              <span>{isBn ? 'ডোরস্টেপ বুকিং' : 'Book Doorstep Visit'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* 3. Modern Editorial Hero */}
      <section className="off-hero" id="showcase">
        <div className="off-hero-inner">
          <div className="off-hero-pill">
            <ShieldCheck size={14} color="#1D4ED8" />
            <span>
              {isBn
                ? 'আইএসও ৯০০১:২০১৫ সার্টিফায়েড • ফ্যাক্টরি ট্রেইন্ড মাস্টার টেকনিশিয়ান'
                : 'ISO 9001:2015 CERTIFIED • FACTORY TRAINED MASTER TECHNICIANS'}
            </span>
          </div>

          <h1 className="off-hero-headline">
            {isBn ? 'সঠিক প্রকৌশল ও ডোরস্টেপ যত্ন।' : 'Precision doorstep care.'} <br />
            <span className="accent">
              {isBn ? 'প্রতিটি প্রধান হোম অ্যাপ্লায়েন্সের জন্য।' : 'For every major home appliance.'}
            </span>
          </h1>

          <p className="off-hero-lead">
            {isBn
              ? 'পশ্চিমবঙ্গের শীর্ষস্থানীয় মাল্টি-ব্র্যান্ড হোম অ্যাপ্লায়েন্স ইঞ্জিনিয়ারিং নেটওয়ার্ক। কল কনফার্মেশনের ৬০ মিনিটের মধ্যে অরিজিনাল ওইএম যন্ত্রাংশ ও ৯০ দিনের পূর্ণ ওয়ারেন্টি সহ অভিজ্ঞ টেকনিশিয়ান আগমন।'
              : 'Bengal\'s premier multi-brand appliance engineering network. Certified technicians dispatched to your doorstep within 60 minutes with 100% genuine OEM components, upfront digital pricing, and a 90-day comprehensive warranty.'}
          </p>

          {/* Interactive Category Switcher Ribbon */}
          <div className="off-hero-switcher">
            {APPLIANCES.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`off-switcher-btn ${selectedId === item.id ? 'active' : ''}`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          {/* Modern Studio Showcase Stage (Zero Heavy Carding - Pure Modern Editorial Layout) */}
          <div className="off-showcase-stage">
            <div className="off-showcase-info">
              <span className="off-showcase-tag">{activeAppliance.tagline}</span>
              <h2 className="off-showcase-title">{activeAppliance.headline}</h2>
              <p className="off-showcase-desc">{activeAppliance.desc}</p>

              <div className="off-showcase-specs">
                {activeAppliance.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="off-spec-bullet">
                    <Check size={15} className="off-spec-bullet-icon" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              {/* Action Bar (Zero hardcoded prices - Pure Upfront Transparency) */}
              <div className="off-showcase-actions">
                <div className="off-showcase-assurance">
                  <span className="off-assurance-badge">
                    {isBn ? 'স্বচ্ছ ডিজিটাল এস্টিমেট' : 'Upfront Digital Estimate'}
                  </span>
                  <span className="off-assurance-sub">
                    {isBn ? 'কাজের আগেই অনুমোদিত' : 'Approved by you before start'}
                  </span>
                </div>
                <button
                  onClick={() => handleOpenBooking(activeAppliance.id)}
                  className="off-showcase-btn"
                >
                  <span>{isBn ? `${activeAppliance.name} টেকনিশিয়ান কল করুন` : `Book ${activeAppliance.name} Technician`}</span>
                  <ArrowRight size={15} />
                </button>
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="off-showcase-call"
                >
                  <Phone size={15} />
                  <span>{settings.phone}</span>
                </a>
              </div>
            </div>

            <div className="off-showcase-visual">
              <img
                src={activeAppliance.image}
                alt={activeAppliance.name}
                className="off-showcase-img"
              />
              <span className="off-showcase-badge-pill">{activeAppliance.badge}</span>
            </div>
          </div>

          {/* 4 Key Metrics Bar */}
          <div className="off-metrics-bar">
            <div className="off-metric-block">
              <span className="off-metric-num">60 Mins</span>
              <span className="off-metric-text">{isBn ? 'গড় ডোরস্টেপ আগমন' : 'Average Doorstep SLA'}</span>
            </div>
            <div className="off-metric-block">
              <span className="off-metric-num">4.9 ★</span>
              <span className="off-metric-text">{isBn ? '১,২৮০+ ভেরিফায়েড গ্রাহক' : '1,280+ Verified Homes'}</span>
            </div>
            <div className="off-metric-block">
              <span className="off-metric-num">90 Days</span>
              <span className="off-metric-text">{isBn ? 'সার্ভিস ওয়ারেন্টি গ্যারান্টি' : 'Comprehensive Warranty'}</span>
            </div>
            <div className="off-metric-block">
              <span className="off-metric-num">100%</span>
              <span className="off-metric-text">{isBn ? 'আসল OEM যন্ত্রাংশ' : 'Original OEM Components'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Brand Marquee: 100% ORIGINAL AUTHENTIC COLORS (Zero Grayscale) */}
      <section className="off-brand-marquee">
        <div className="off-marquee-inner">
          <p className="off-marquee-label">
            {isBn
              ? '২৫+ শীর্ষস্থানীয় গ্লোবাল প্রস্তুতকারকের অফিসিয়াল স্পেসিফিকেশন সাপোর্ট'
              : 'Factory Specification Support for 25+ Global Manufacturers'}
          </p>
          <div className="off-marquee-list">
            {BRAND_SHOWCASE.map((b) => (
              <div key={b.name} className="off-marquee-item" title={b.name}>
                <img
                  src={b.logo}
                  alt={b.name}
                  className="off-marquee-logo"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Editorial Service Catalog (Tabbed - NO CARDS) */}
      <section className="off-matrix-section" id="catalog">
        <div className="off-section-header">
          <span className="off-section-tag">{isBn ? 'ইন্টারেক্টিভ ক্যাটালগ' : 'Interactive Catalog'}</span>
          <h2 className="off-section-title">
            {isBn ? 'সার্ভিস তালিকা ও ডোরস্টেপ বুকিং' : 'Itemized Services & Doorstep Care'}
          </h2>
          <p className="off-section-sub">
            {isBn
              ? 'প্রত্যয়িত টেকনিশিয়ানের দ্বারা নির্ভুল রোগ নির্ণয়। কোনো কাজের আগেই স্বচ্ছ ডিজিটাল কোটেশন প্রদান করা হয়।'
              : 'Direct access to factory-trained service engineers. All labor, diagnostics, and parts carry upfront digital documentation.'}
          </p>
        </div>

        {/* Minimal Underline Category Tabs */}
        <div className="off-catalog-nav">
          {APPLIANCES.map((app) => (
            <button
              key={app.id}
              onClick={() => setSelectedId(app.id)}
              className={`off-catalog-tab ${selectedId === app.id ? 'active' : ''}`}
            >
              <span>{app.name}</span>
              <span style={{ fontSize: 11, opacity: 0.6 }}>({app.services.length})</span>
            </button>
          ))}
        </div>

        {/* Catalog Grid: Split Layout */}
        <div className="off-catalog-grid">
          <div className="off-catalog-rows">
            {activeAppliance.services.map((svc, idx) => (
              <div key={idx} className="off-catalog-row">
                <div className="off-row-left">
                  <div className="off-row-title-bar">
                    <span className="off-row-title">{svc.title}</span>
                    {svc.badge && <span className="off-row-badge">{svc.badge}</span>}
                  </div>
                  <p className="off-row-desc">{svc.desc}</p>
                  <div className="off-row-meta">
                    <span>Est. Time: <strong>{svc.time}</strong></span>
                    <span className="dot">•</span>
                    <span>18-Point Diagnostic Check</span>
                    <span className="dot">•</span>
                    <span>90-Day Guarantee</span>
                  </div>
                </div>

                <div className="off-row-right">
                  <div className="off-row-estimate-label">
                    <span className="off-est-badge">{svc.estimateType}</span>
                    <span className="off-est-sub">Transparent Policy</span>
                  </div>
                  <button
                    onClick={() => handleOpenBooking(activeAppliance.id, svc.title)}
                    className="off-row-book-btn"
                  >
                    {isBn ? 'বুক করুন' : 'Book Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="off-catalog-aside">
            <h3 className="off-aside-title">
              {isBn ? 'ফ্যাক্টরি সার্ভিস প্রোটোকল' : 'Factory Service Protocol'}
            </h3>
            <p className="off-aside-sub">
              {isBn
                ? `প্রতিটি ${activeAppliance.name}-এর কাজ কঠোরভাবে প্রস্তুতকারকের স্পেসিফিকেশন মেনে সম্পন্ন হয়:`
                : `Every ${activeAppliance.name.toLowerCase()} repair strictly adheres to manufacturer engineering procedures:`}
            </p>
            <ul className="off-aside-list">
              {activeAppliance.specs.map((spec, spIdx) => (
                <li key={spIdx} className="off-aside-item">
                  <Check size={16} className="off-aside-icon" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleOpenBooking(activeAppliance.id)}
              className="off-aside-cta"
            >
              {isBn ? `${activeAppliance.name} ডায়াগনস্টিক শিডিউল করুন →` : `Schedule Full Diagnostics for ${activeAppliance.name} →`}
            </button>
          </aside>
        </div>
      </section>

      {/* 6. The 4 Engineering Standards (Architectural / Editorial layout) */}
      <section className="off-standards-section" id="standards">
        <div className="off-standards-inner">
          <div className="off-section-header">
            <span className="off-section-tag">{isBn ? 'গুণমান নিশ্চয়তা' : 'Quality Assurance'}</span>
            <h2 className="off-section-title">
              {isBn ? 'কেন শীর্ষ পরিবারগুলো অ্যাপ্লায়েন্স সেবায় বিশ্বাস করেন' : 'Why Leading Homes Trust Appliance Seva'}
            </h2>
            <p className="off-section-sub">
              {isBn
                ? 'আমরা একটি সম্পূর্ণ নিরীক্ষিত এবং নিয়মমাফিক গৃহ-সেবা নেটওয়ার্ক পরিচালনা করি।'
                : 'We operate an audited, process-driven home engineering network. Zero unverified contractors.'}
            </p>
          </div>

          <div className="off-standards-grid">
            <div className="off-standard-column">
              <span className="off-standard-num">01</span>
              <h3 className="off-standard-title">
                {isBn ? 'ব্যাকগ্রাউন্ড-ভেরিফায়েড ইঞ্জিনিয়ার' : 'Background-Verified Engineers'}
              </h3>
              <p className="off-standard-desc">
                {isBn
                  ? 'প্রতিটি টেকনিশিয়ান পুলিশ ব্যাকগ্রাউন্ড ভেরিফিকেশন, আধার যাচাই এবং টেকনিক্যাল ট্রেনিং শেষে ফিল্ডে পাঠানো হয়।'
                  : 'Every engineer undergoes police background verification, Aadhaar credential checks, and strict bench-testing before field deployment.'}
              </p>
            </div>

            <div className="off-standard-column">
              <span className="off-standard-num">02</span>
              <h3 className="off-standard-title">
                {isBn ? '১০০% ফ্যাক্টরি OEM যন্ত্রাংশ' : '100% Factory OEM Components'}
              </h3>
              <p className="off-standard-desc">
                {isBn
                  ? 'আমরা কোনো নকল বা পুরনো পার্টস ব্যবহার করি না। প্রতিটি কম্পোনেন্টের সাথে প্রস্তুতকারকের অফিসিয়াল ওয়ারেন্টি থাকে।'
                  : 'We never compromise on counterfeit or salvaged spares. All capacitors, relays, fan motors, and valves carry direct manufacturer warranty slips.'}
              </p>
            </div>

            <div className="off-standard-column">
              <span className="off-standard-num">03</span>
              <h3 className="off-standard-title">
                {isBn ? 'স্বচ্ছ আগাম বাজেট নীতি' : 'Upfront Fixed Price Policy'}
              </h3>
              <p className="off-standard-desc">
                {isBn
                  ? 'পরিদর্শনের পরে সম্পূর্ণ ডিজিটাল এস্টিমেট দেওয়া হয়। আপনার সম্মতির পরেই কেবল কাজ শুরু করা হয়।'
                  : 'Our technician provides an itemized digital estimate after diagnosis. Work begins strictly upon your explicit authorization. Zero surprise fees.'}
              </p>
            </div>

            <div className="off-standard-column">
              <span className="off-standard-num">04</span>
              <h3 className="off-standard-title">
                {isBn ? '৯০ দিনের পূর্ণ ওয়ারেন্টি' : '90-Day Comprehensive Warranty'}
              </h3>
              <p className="off-standard-desc">
                {isBn
                  ? 'মেরামতকৃত অংশে ৯০ দিনের মধ্যে সমস্যা হলে সিনিয়র সুপারভাইজার সম্পূর্ণ বিনামূল্যে স্পটে গিয়ে ঠিক করবেন।'
                  : 'If the repaired defect reoccurs within 90 days, our senior service supervisor visits and rectifies it at zero additional diagnosis or labor cost.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Service Scope & SLA Matrix Table (No hardcoded prices) */}
      <section className="off-rates-section" id="rates">
        <div className="off-section-header">
          <span className="off-section-tag">{isBn ? 'কাজের পরিধি' : 'Service Standards'}</span>
          <h2 className="off-section-title">
            {isBn ? 'অফিসিয়াল সার্ভিস স্কোপ ও এসএলএ ম্যাট্রিক্স' : 'Official Service Scope & SLA Matrix'}
          </h2>
          <p className="off-section-sub">
            {isBn
              ? 'কাজের স্বচ্ছ পরিধি, নির্দিষ্ট এসএলএ ও ওয়ারেন্টি পলিসি।'
              : 'Clear service scopes with strict response times and unconditional guarantees.'}
          </p>
        </div>

        <div className="off-table-card">
          <table className="off-clean-table">
            <thead>
              <tr>
                <th>{isBn ? 'অ্যাপ্লায়েন্স ও সার্ভিস' : 'Appliance & Service'}</th>
                <th>{isBn ? 'স্ট্যান্ডার্ড কাজের পরিধি' : 'Standard Work Scope'}</th>
                <th>{isBn ? 'পৌঁছানোর এসএলএ' : 'Dispatch SLA'}</th>
                <th>{isBn ? 'মূল্য নির্ধারণ পলিসি' : 'Pricing Model'}</th>
                <th>{isBn ? 'ওয়ারেন্টি কভারেজ' : 'Warranty Coverage'}</th>
                <th>{isBn ? 'অ্যাকশন' : 'Action'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>AC Jet Pump Servicing</strong>
                  <div style={{ fontSize: 12, color: '#64748B' }}>Split / Inverter AC</div>
                </td>
                <td>High-pressure water jet coil wash, indoor blower sanitation, tray drain unclogging</td>
                <td><span className="off-pill-sla"><Clock size={11} /> 60 Mins</span></td>
                <td><strong>Fixed Transparent Quote</strong></td>
                <td><span className="off-pill-warranty"><ShieldCheck size={11} /> 90 Days</span></td>
                <td>
                  <button onClick={() => handleOpenBooking('ac-repair', 'AC Jet Pump Servicing')} className="off-row-book-btn">
                    {isBn ? 'বুক' : 'Book'}
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>AC Gas Charging & Leak Fix</strong>
                  <div style={{ fontSize: 12, color: '#64748B' }}>R32 / R410A Systems</div>
                </td>
                <td>Nitrogen leak detection, joint brazing, system vacuuming & pure refrigerant refill</td>
                <td><span className="off-pill-sla"><Clock size={11} /> 60 Mins</span></td>
                <td><strong>Upfront Itemized Estimate</strong></td>
                <td><span className="off-pill-warranty"><ShieldCheck size={11} /> 90 Days</span></td>
                <td>
                  <button onClick={() => handleOpenBooking('ac-repair', 'AC Gas Charging & Leak Fix')} className="off-row-book-btn">
                    {isBn ? 'বুক' : 'Book'}
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Refrigerator Defrost / Cooling Repair</strong>
                  <div style={{ fontSize: 12, color: '#64748B' }}>Frost-Free Double Door</div>
                </td>
                <td>Bi-metal thermostat replacement, defrost heater testing & timer synchronization</td>
                <td><span className="off-pill-sla"><Clock size={11} /> 45 Mins</span></td>
                <td><strong>Diagnostic Estimate First</strong></td>
                <td><span className="off-pill-warranty"><ShieldCheck size={11} /> 90 Days</span></td>
                <td>
                  <button onClick={() => handleOpenBooking('fridge-repair', 'Refrigerator Defrost Repair')} className="off-row-book-btn">
                    {isBn ? 'বুক' : 'Book'}
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Washing Machine Drain Motor / Drum Fix</strong>
                  <div style={{ fontSize: 12, color: '#64748B' }}>Front & Top Load</div>
                </td>
                <td>Drain pump replacement, lint trap de-scaling, drum balancing & belt adjustment</td>
                <td><span className="off-pill-sla"><Clock size={11} /> 60 Mins</span></td>
                <td><strong>Transparent Spare & Labor Quote</strong></td>
                <td><span className="off-pill-warranty"><ShieldCheck size={11} /> 90 Days</span></td>
                <td>
                  <button onClick={() => handleOpenBooking('washing-machine-repair', 'Washing Machine Drain Fix')} className="off-row-book-btn">
                    {isBn ? 'বুক' : 'Book'}
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Smart TV LED Backlight & Power Repair</strong>
                  <div style={{ fontSize: 12, color: '#64748B' }}>32&quot; - 65&quot; 4K LED TVs</div>
                </td>
                <td>Full prism backlight strip installation, SMPS power regulator fix & panel calibration</td>
                <td><span className="off-pill-sla"><Clock size={11} /> 90 Mins</span></td>
                <td><strong>Lab Verified Estimate</strong></td>
                <td><span className="off-pill-warranty"><ShieldCheck size={11} /> 90 Days</span></td>
                <td>
                  <button onClick={() => handleOpenBooking('tv-repair', 'Smart TV LED Backlight Repair')} className="off-row-book-btn">
                    {isBn ? 'বুক' : 'Book'}
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Microwave Magnetron Heating Fix</strong>
                  <div style={{ fontSize: 12, color: '#64748B' }}>Solo & Convection</div>
                </td>
                <td>Magnetron tube replacement, high-voltage diode & door safety switch testing</td>
                <td><span className="off-pill-sla"><Clock size={11} /> 45 Mins</span></td>
                <td><strong>Direct OEM Quoted Rate</strong></td>
                <td><span className="off-pill-warranty"><ShieldCheck size={11} /> 90 Days</span></td>
                <td>
                  <button onClick={() => handleOpenBooking('microwave-repair', 'Microwave Magnetron Heating Fix')} className="off-row-book-btn">
                    {isBn ? 'বুক' : 'Book'}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. Verified Customer Proof: Editorial Quotes */}
      <section className="off-reviews-section" id="reviews">
        <div className="off-reviews-inner">
          <div className="off-section-header">
            <span className="off-section-tag">{isBn ? 'গ্রাহক অভিজ্ঞতা' : 'Verified Records'}</span>
            <h2 className="off-section-title">
              {isBn ? 'পশ্চিমবঙ্গের সম্মানিত পরিবারগুলোর অভিজ্ঞতা' : 'Recent Feedback From Bengal Residences'}
            </h2>
            <p className="off-section-sub">
              {isBn
                ? '১,২৮০+ সফল ডোরস্টেপ সার্ভিসের ভিত্তিতে ৪.৯ রেটিং প্রাপ্ত।'
                : 'Rated 4.9 out of 5 based on 1,280+ completed doorstep appliance repairs.'}
            </p>
          </div>

          <div className="off-reviews-grid">
            <div className="off-review-card">
              <div className="off-review-stars">★★★★★</div>
              <p className="off-review-text">
                &ldquo;My Daikin 1.5 Ton inverter AC stopped cooling on a hot Sunday afternoon. The technician Anupam arrived in exactly 45 minutes with a nitrogen cylinder, located a flare leak, sealed it, and refilled gas. Transparent quote on his tablet before starting. Highly recommended.&rdquo;
              </p>
              <div className="off-review-meta">
                <span className="off-review-name">Dr. Subrata Sen</span>
                <span className="off-review-loc">Salt Lake Sector 3, Kolkata • AC Gas Refill</span>
              </div>
            </div>

            <div className="off-review-card">
              <div className="off-review-stars">★★★★★</div>
              <p className="off-review-text">
                &ldquo;Our Samsung front-load washing machine was making violent shuddering sounds during the spin cycle. The engineer dismantled the rear, replaced the worn shock absorbers with genuine Samsung parts, and balanced the drum. Fixed within an hour!&rdquo;
              </p>
              <div className="off-review-meta">
                <span className="off-review-name">Debjani Mukherjee</span>
                <span className="off-review-loc">New Town Action Area 1 • Washing Machine Repair</span>
              </div>
            </div>

            <div className="off-review-card">
              <div className="off-review-stars">★★★★★</div>
              <p className="off-review-text">
                &ldquo;Our LG double-door refrigerator stopped cooling in the lower compartment while the freezer froze solid. The technician diagnosed the bi-metal defrost sensor in 10 minutes. Clean job, digital invoice sent to WhatsApp immediately.&rdquo;
              </p>
              <div className="off-review-meta">
                <span className="off-review-name">Rajesh Ghosh</span>
                <span className="off-review-loc">Behala Chowrasta, Kolkata • Refrigerator Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Local Coverage & SEO Network */}
      <HomeSeoContent lang={lang} onOpenBooking={() => handleOpenBooking()} />

      {/* 9. Official FAQs */}
      <section className="off-rates-section" style={{ paddingTop: 40, paddingBottom: 60 }}>
        <div className="off-section-header">
          <span className="off-section-tag">{isBn ? 'প্রশ্নোত্তর' : 'Frequently Asked Questions'}</span>
          <h2 className="off-section-title">
            {isBn ? 'প্রয়োজনীয় সাধারণ তথ্যাবলী' : 'Common Service Queries'}
          </h2>
        </div>

        <div style={{ maxWidth: 880, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((faq, fIdx) => (
            <div
              key={fIdx}
              style={{
                borderBottom: '1px solid #E2E8F0',
                paddingBottom: 16,
                paddingTop: 12
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === fIdx ? null : fIdx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#09090B',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={18}
                  style={{
                    transform: openFaq === fIdx ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    color: '#64748B'
                  }}
                />
              </button>
              {openFaq === fIdx && (
                <p style={{ marginTop: 10, fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 10. Deep Obsidian Emergency Dispatch Strip */}
      <section className="off-cta-banner">
        <div className="off-cta-inner">
          <div>
            <h2 className="off-cta-title">
              {isBn ? 'অ্যাপ্লায়েন্স হঠাৎ বিকল হয়েছে?' : 'Sudden Appliance Breakdown?'}
            </h2>
            <p className="off-cta-text">
              {isBn
                ? 'ব্যারাকপুর, বেহালা, বারাসাত, হাবড়া, গড়িয়া, নিউ টাউন, দমদম, সল্টলেক, হাওড়া ও পশ্চিমবঙ্গ জুড়ে টেকনিশিয়ান ডিউটিতে আছেন। গড় প্রতিক্রিয়া সময়: ৫৪ মিনিট।'
                : 'Engineers on duty across Barrackpur, Behala, Barasat, Habra, Garia, New Town, Dumdum, Salt Lake, Howrah & West Bengal. Average response time: 54 minutes.'}
            </p>
          </div>

          <div className="off-cta-buttons">
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="off-btn-cta-primary"
            >
              <Phone size={16} />
              <span>{isBn ? `কল করুন: ${settings.phone}` : `Call Dispatch: ${settings.phone}`}</span>
            </a>
            <button
              onClick={() => handleOpenBooking()}
              className="off-btn-cta-secondary"
            >
              <span>{isBn ? 'তাৎক্ষণিক অনলাইন বুকিং' : 'Instant Online Booking'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 11. Minimalist Global Corporate Footer */}
      <footer className="off-footer">
        <div className="off-footer-inner">
          <div className="off-footer-grid">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <img src="/logo-icon.svg" alt="Logo" width={32} height={32} />
                <span style={{ fontWeight: 800, fontSize: 16, color: '#09090B' }}>Home Appliance Care India</span>
              </div>
              <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6, maxWidth: 320, marginBottom: 16 }}>
                Bengal&apos;s authoritative doorstep appliance repair network. Certified multi-brand technical diagnostics, OEM spare parts, and 90-day comprehensive service warranty.
              </p>
              <div style={{ fontSize: 12, color: '#64748B', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span><strong>HQ:</strong> Salt Lake Sector V, Kolkata - 700091</span>
                <span><strong>Helpline:</strong> {settings.phone} (8 AM - 9 PM)</span>
                <span><strong>Email:</strong> {settings.email}</span>
              </div>
            </div>

            <div>
              <h4 className="off-footer-col-title">Engineering Services</h4>
              <ul className="off-footer-links">
                <li><a href="#catalog" onClick={() => setSelectedId('ac-repair')} className="off-footer-link">Air Conditioner Care</a></li>
                <li><a href="#catalog" onClick={() => setSelectedId('fridge-repair')} className="off-footer-link">Refrigerator Service</a></li>
                <li><a href="#catalog" onClick={() => setSelectedId('washing-machine-repair')} className="off-footer-link">Washing Machine Repair</a></li>
                <li><a href="#catalog" onClick={() => setSelectedId('tv-repair')} className="off-footer-link">LED & Smart TV Diagnostics</a></li>
                <li><a href="#catalog" onClick={() => setSelectedId('microwave-repair')} className="off-footer-link">Microwave Oven Repair</a></li>
              </ul>
            </div>

            <div>
              <h4 className="off-footer-col-title">Service Areas</h4>
              <ul className="off-footer-links">
                <li><span className="off-footer-link">Salt Lake & New Town</span></li>
                <li><span className="off-footer-link">Dum Dum & Nagerbazar</span></li>
                <li><span className="off-footer-link">Behala & Garia</span></li>
                <li><span className="off-footer-link">Barrackpore & Barasat</span></li>
                <li><span className="off-footer-link">Howrah & Hooghly</span></li>
              </ul>
            </div>

            <div>
              <h4 className="off-footer-col-title">Customer Assurance</h4>
              <ul className="off-footer-links">
                <li><Link href="/invoice/AS-INV-2026-000001" className="off-footer-link">Digital Invoice Verification</Link></li>
                <li><span className="off-footer-link">90-Day Guarantee Policy</span></li>
                <li><span className="off-footer-link">OEM Genuine Spares Terms</span></li>
                <li><span className="off-footer-link">Corporate & Enterprise AMC</span></li>
                <li><Link href="/privacy" className="off-footer-link">Privacy Policy & Terms</Link></li>
              </ul>
            </div>
          </div>

          <div className="off-footer-bottom">
            <span>© 2026 Home Appliance Care India. All rights reserved. Multi-brand independent service network.</span>
            <span>All brand trademarks (Daikin, Samsung, LG, Voltas, etc.) belong to their respective manufacturers.</span>
          </div>
        </div>
      </footer>

      {/* 12. Mobile Fixed Bottom Conversion Dock (< 768px) */}
      <div className="off-mobile-dock" aria-label="Mobile quick actions">
        <a
          href={`tel:${settings.phone.replace(/\s+/g, '')}`}
          className="off-mobile-dock-call"
        >
          <Phone size={15} />
          <span>{isBn ? 'কল করুন' : 'Call Dispatch'}</span>
        </a>
        <button
          onClick={() => handleOpenBooking()}
          className="off-mobile-dock-book"
        >
          <Calendar size={15} />
          <span>{isBn ? 'ডোরস্টেপ বুকিং' : 'Book Technician'}</span>
        </button>
      </div>

      {/* Booking Modal (Fully Integrated) */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        categories={categories}
        brands={brands}
        initialCategory={bookingCategory}
        initialProblem={bookingProblem}
        lang={lang}
      />
    </div>
  );
}
