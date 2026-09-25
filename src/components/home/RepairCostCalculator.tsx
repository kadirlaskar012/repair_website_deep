'use client';

import React, { useState } from 'react';
import {
  Calculator,
  PhoneCall,
  CalendarCheck,
  ShieldCheck,
  Clock,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { Language } from '@/lib/types';

interface RepairCostCalculatorProps {
  lang: Language;
  onOpenBookingWithIssue: (serviceName: string) => void;
  phone: string;
}

interface ServiceIssue {
  id: string;
  nameEn: string;
  nameBn: string;
  minPrice: number;
  maxPrice: number;
  warrantyDays: number;
  estimatedTime: string;
  estimatedTimeBn: string;
}

interface ApplianceOption {
  id: string;
  nameEn: string;
  nameBn: string;
  category: string;
  issues: ServiceIssue[];
}

const applianceOptions: ApplianceOption[] = [
  {
    id: 'split-ac',
    nameEn: 'Split Inverter AC',
    nameBn: 'স্প্লিট ইনভার্টার এসি',
    category: 'ac-repair',
    issues: [
      {
        id: 'ac-gas',
        nameEn: 'Gas Leakage Test & Full Refill (R32 / R410A)',
        nameBn: 'গ্যাস লিকেজ টেস্ট ও সম্পূর্ণ রিফিল (R32 / R410A)',
        minPrice: 1799,
        maxPrice: 2399,
        warrantyDays: 60,
        estimatedTime: '60 - 90 mins',
        estimatedTimeBn: '৬০ - ৯০ মিনিট'
      },
      {
        id: 'ac-jet',
        nameEn: 'Hi-Pressure Jet Foam Deep Cleaning Service',
        nameBn: 'হাই-প্রেসার ফোম জেট ডিপ ক্লিনিং সার্ভিস',
        minPrice: 499,
        maxPrice: 699,
        warrantyDays: 30,
        estimatedTime: '45 - 60 mins',
        estimatedTimeBn: '৪৫ - ৬০ মিনিট'
      },
      {
        id: 'ac-cap',
        nameEn: 'Compressor Capacitor / Contactor Replacement',
        nameBn: 'কম্প্রেসার ক্যাপাসিটর / কন্ট্রাক্টর পরিবর্তন',
        minPrice: 799,
        maxPrice: 1199,
        warrantyDays: 90,
        estimatedTime: '45 mins',
        estimatedTimeBn: '৪৫ মিনিট'
      },
      {
        id: 'ac-pcb',
        nameEn: 'Inverter Outdoor / Indoor PCB Board Repair',
        nameBn: 'ইনভার্টার আউটডোর / ইনডোর পিসিবি বোর্ড মেরামত',
        minPrice: 1499,
        maxPrice: 2299,
        warrantyDays: 30,
        estimatedTime: 'Same-day',
        estimatedTimeBn: 'একই দিনে'
      },
      {
        id: 'ac-water',
        nameEn: 'Indoor Unit Water Dripping & Tray Choke Fix',
        nameBn: 'ইনডোর থেকে জল পড়া ও ড্রেন পাইপ জ্যাম সমাধান',
        minPrice: 399,
        maxPrice: 599,
        warrantyDays: 30,
        estimatedTime: '45 mins',
        estimatedTimeBn: '৪৫ মিনিট'
      }
    ]
  },
  {
    id: 'window-ac',
    nameEn: 'Window AC',
    nameBn: 'উইন্ডো এসি',
    category: 'ac-repair',
    issues: [
      {
        id: 'w-gas',
        nameEn: 'Refrigerant Gas Top-Up & Cooling Restoration',
        nameBn: 'গ্যাস চার্জিং ও কুলিং পুনরুদ্ধার',
        minPrice: 1599,
        maxPrice: 2099,
        warrantyDays: 60,
        estimatedTime: '60 mins',
        estimatedTimeBn: '৬০ মিনিট'
      },
      {
        id: 'w-clean',
        nameEn: 'Chemical Wash & Deep Debris Removal',
        nameBn: 'কেমিক্যাল ওয়াশ ও গভীর ময়লা পরিষ্কার',
        minPrice: 449,
        maxPrice: 599,
        warrantyDays: 30,
        estimatedTime: '45 mins',
        estimatedTimeBn: '৪৫ মিনিট'
      },
      {
        id: 'w-motor',
        nameEn: 'Blower Fan Motor & Bush Replacement',
        nameBn: 'ব্লোয়ার ফ্যান মোটর ও বুশ রিপ্লেসমেন্ট',
        minPrice: 899,
        maxPrice: 1399,
        warrantyDays: 90,
        estimatedTime: '60 mins',
        estimatedTimeBn: '৬০ মিনিট'
      }
    ]
  },
  {
    id: 'fridge-double',
    nameEn: 'Double Door Refrigerator (Frost-Free)',
    nameBn: 'ডাবল ডোর ফ্রিজ (ফ্রস্ট-ফ্রি)',
    category: 'fridge-repair',
    issues: [
      {
        id: 'fr-defrost',
        nameEn: 'Defrost Heater, Bimetal Sensor & Timer Fix',
        nameBn: 'ডিফ্রস্ট হিটার, সেন্সর ও টাইমার মেরামত',
        minPrice: 699,
        maxPrice: 1099,
        warrantyDays: 60,
        estimatedTime: '60 mins',
        estimatedTimeBn: '৬০ মিনিট'
      },
      {
        id: 'fr-gas',
        nameEn: 'Gas Leakage Sealing & Eco Gas Refill (R600a)',
        nameBn: 'গ্যাস লিকেজ বন্ধ ও নতুন গ্যাস চার্জিং (R600a)',
        minPrice: 1499,
        maxPrice: 2199,
        warrantyDays: 60,
        estimatedTime: '90 mins',
        estimatedTimeBn: '৯০ মিনিট'
      },
      {
        id: 'fr-relay',
        nameEn: 'Compressor PTC Start Relay & Overload Protector',
        nameBn: 'কম্প্রেসার পিটিসি স্টার্ট রিলে ও ওএলপি পরিবর্তন',
        minPrice: 599,
        maxPrice: 899,
        warrantyDays: 90,
        estimatedTime: '45 mins',
        estimatedTimeBn: '৪৫ মিনিট'
      },
      {
        id: 'fr-inverter',
        nameEn: 'Digital Inverter Compressor Control Board Fix',
        nameBn: 'ইনভার্টার কম্প্রেসার কন্ট্রোল বোর্ড মেরামত',
        minPrice: 1599,
        maxPrice: 2499,
        warrantyDays: 30,
        estimatedTime: 'Same-day',
        estimatedTimeBn: 'একই দিনে'
      }
    ]
  },
  {
    id: 'fridge-single',
    nameEn: 'Single Door Refrigerator',
    nameBn: 'সিঙ্গেল ডোর ফ্রিজ',
    category: 'fridge-repair',
    issues: [
      {
        id: 'sfr-thermo',
        nameEn: 'Thermostat Temperature Controller Replacement',
        nameBn: 'থার্মোস্ট্যাট কুলিং কন্ট্রোলার পরিবর্তন',
        minPrice: 499,
        maxPrice: 799,
        warrantyDays: 60,
        estimatedTime: '45 mins',
        estimatedTimeBn: '৪৫ মিনিট'
      },
      {
        id: 'sfr-gas',
        nameEn: 'Capillary Tube Unclogging & Gas Refill',
        nameBn: 'ক্যাপিলারি পাইপ জ্যাম ক্লিনিং ও গ্যাস চার্জিং',
        minPrice: 1299,
        maxPrice: 1799,
        warrantyDays: 60,
        estimatedTime: '60 mins',
        estimatedTimeBn: '৬০ মিনিট'
      }
    ]
  },
  {
    id: 'washer-front',
    nameEn: 'Front Load Washing Machine',
    nameBn: 'ফ্রন্ট লোড ওয়াশিং মেশিন',
    category: 'washing-machine-repair',
    issues: [
      {
        id: 'wf-drain',
        nameEn: 'Drain Pump Failure / Error E18, OE, E20 Repair',
        nameBn: 'ড্রেন পাম্প ত্রুটি / এরর E18, OE, E20 মেরামত',
        minPrice: 799,
        maxPrice: 1299,
        warrantyDays: 60,
        estimatedTime: '60 mins',
        estimatedTimeBn: '৬০ মিনিট'
      },
      {
        id: 'wf-door',
        nameEn: 'Door Lock Interlock Switch (dE, E40 Error)',
        nameBn: 'ডোর লক ইন্টারলক সুইচ পরিবর্তন (dE, E40 এরর)',
        minPrice: 699,
        maxPrice: 1099,
        warrantyDays: 90,
        estimatedTime: '45 mins',
        estimatedTimeBn: '৪৫ মিনিট'
      },
      {
        id: 'wf-bearing',
        nameEn: 'Drum Bearing, Spider Arm & Seal Replacement',
        nameBn: 'ড্রাম বেয়ারিং ও স্পাইডার শ্যাফট পরিবর্তন',
        minPrice: 1899,
        maxPrice: 2899,
        warrantyDays: 90,
        estimatedTime: '2 - 3 hours',
        estimatedTimeBn: '২ - ৩ ঘণ্টা'
      }
    ]
  },
  {
    id: 'washer-top',
    nameEn: 'Top Load Washing Machine',
    nameBn: 'টপ লোড ওয়াশিং মেশিন',
    category: 'washing-machine-repair',
    issues: [
      {
        id: 'wt-spin',
        nameEn: 'Spin Drain Tractor Motor & Belt Adjustment',
        nameBn: 'স্পিন ড্রেন মোটর ও বেল্ট অ্যাডজাস্টমেন্ট',
        minPrice: 699,
        maxPrice: 1199,
        warrantyDays: 60,
        estimatedTime: '60 mins',
        estimatedTimeBn: '৬০ মিনিট'
      },
      {
        id: 'wt-water',
        nameEn: 'Water Level Pressure Sensor (PE / 1E Error)',
        nameBn: 'ওয়াটার লেভেল প্রেসার সেন্সর (PE / 1E এরর)',
        minPrice: 599,
        maxPrice: 899,
        warrantyDays: 60,
        estimatedTime: '45 mins',
        estimatedTimeBn: '৪৫ মিনিট'
      }
    ]
  },
  {
    id: 'microwave',
    nameEn: 'Microwave Oven (Convection & Solo)',
    nameBn: 'মাইক্রোওয়েভ ওভেন',
    category: 'microwave-repair',
    issues: [
      {
        id: 'mw-heat',
        nameEn: 'Magnetron Tube (Not Heating Food Issue)',
        nameBn: 'ম্যাগনেট্রন টিউব (খাবার গরম না হওয়া সমস্যা)',
        minPrice: 1199,
        maxPrice: 1899,
        warrantyDays: 90,
        estimatedTime: '60 mins',
        estimatedTimeBn: '৬০ মিনিট'
      },
      {
        id: 'mw-spark',
        nameEn: 'Cavity Sparking / Mica Sheet & HV Diode Fix',
        nameBn: 'স্পার্কিং সমস্যা / মাইকা শিট ও ডায়োড পরিবর্তন',
        minPrice: 599,
        maxPrice: 899,
        warrantyDays: 60,
        estimatedTime: '45 mins',
        estimatedTimeBn: '৪৫ মিনিট'
      }
    ]
  },
  {
    id: 'tv-led',
    nameEn: 'Smart LED / 4K UHD TV',
    nameBn: 'স্মার্ট এলইডি / ৪কে টিভি',
    category: 'led-tv-repair',
    issues: [
      {
        id: 'tv-light',
        nameEn: 'LED Backlight Strip Replacement (Sound OK No Picture)',
        nameBn: 'এলইডি ব্যাকলাইট স্ট্রিপ পরিবর্তন (শব্দ আছে ছবি নেই)',
        minPrice: 1299,
        maxPrice: 2399,
        warrantyDays: 90,
        estimatedTime: 'Same-day',
        estimatedTimeBn: 'একই দিনে'
      },
      {
        id: 'tv-power',
        nameEn: 'Power Supply SMPS Board Repair / Capacitor Fix',
        nameBn: 'পাওয়ার সাপ্লাই এসএমপিএস বোর্ড ও ক্যাপাসিটর মেরামত',
        minPrice: 899,
        maxPrice: 1599,
        warrantyDays: 60,
        estimatedTime: '60 mins',
        estimatedTimeBn: '৬০ মিনিট'
      }
    ]
  }
];

export default function RepairCostCalculator({ lang, onOpenBookingWithIssue, phone }: RepairCostCalculatorProps) {
  const isBn = lang === 'bn';
  const [selectedApplianceId, setSelectedApplianceId] = useState<string>('split-ac');
  const [selectedIssueId, setSelectedIssueId] = useState<string>('ac-gas');

  const currentAppliance = applianceOptions.find((a) => a.id === selectedApplianceId) || applianceOptions[0];
  const currentIssue = currentAppliance.issues.find((i) => i.id === selectedIssueId) || currentAppliance.issues[0];

  const handleApplianceChange = (appId: string) => {
    setSelectedApplianceId(appId);
    const newApp = applianceOptions.find((a) => a.id === appId) || applianceOptions[0];
    if (newApp.issues.length > 0) {
      setSelectedIssueId(newApp.issues[0].id);
    }
  };

  const formattedBookingText = `${currentAppliance.nameEn} - ${currentIssue.nameEn}`;

  return (
    <section
      aria-label="Appliance Repair Cost Calculator"
      style={{
        backgroundColor: 'var(--color-bg-base)',
        borderTop: '1px solid var(--color-border-light)',
        borderBottom: '1px solid var(--color-border-light)',
        padding: 'clamp(44px, 6vw, 68px) 0'
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '820px', margin: '0 auto 36px auto', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary-dark)',
              fontSize: '0.8125rem',
              fontWeight: 700,
              marginBottom: '14px'
            }}
          >
            <Calculator size={16} />
            <span>
              {isBn
                ? 'অনলাইন মেরামত খরচ অনুমান ও স্বচ্ছ রেট কার্ড'
                : 'Instant Repair Cost Estimator & Transparent Rate Card'}
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.375rem)',
              fontWeight: 800,
              color: 'var(--color-text-main)',
              letterSpacing: '-0.02em',
              lineHeight: 1.25,
              marginBottom: '12px'
            }}
          >
            {isBn
              ? 'আপনার হোম অ্যাপ্লায়েন্সের আনুমানিক মেরামত খরচ কত?'
              : 'Estimate Your Home Appliance Repair & Servicing Cost'}
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.9375rem, 1.8vw, 1.0625rem)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.6
            }}
          >
            {isBn
              ? 'কোনো লুকানো চার্জ নেই। যন্ত্রপাতি ও লক্ষণ নির্বাচন করে তাত্ক্ষণিক আনুমানিক খরচ জানুন। মাত্র ₹২৯৯ পরিদর্শনে সম্পূর্ণ ডায়াগনোসিস নিশ্চিত।'
              : 'Select your appliance and common symptom below to view verified market price ranges across Kolkata & West Bengal with 30 to 90 days warranty.'}
          </p>
        </div>

        {/* Flat Calculator Frame - NO CARD IN CARD */}
        <div
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            backgroundColor: 'var(--color-bg-card)',
            border: '2px solid var(--color-border)',
            borderRadius: '16px',
            padding: 'clamp(20px, 4vw, 36px)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* Step 1: Appliance Horizontal Pill Row */}
          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: 'var(--color-text-main)',
                marginBottom: '10px'
              }}
            >
              {isBn ? '১. যন্ত্রপাতি নির্বাচন করুন:' : '1. Select Appliance:'}
            </label>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}
            >
              {applianceOptions.map((app) => {
                const isSelected = app.id === selectedApplianceId;
                return (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => handleApplianceChange(app.id)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '999px',
                      fontSize: '0.8125rem',
                      fontWeight: isSelected ? 700 : 500,
                      backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-bg-base)',
                      color: isSelected ? '#FFFFFF' : 'var(--color-text-main)',
                      border: `1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {isBn ? app.nameBn : app.nameEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Issue / Fault Dropdown Selector */}
          <div style={{ marginBottom: '28px' }}>
            <label
              htmlFor="calculator-issue-select"
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: 'var(--color-text-main)',
                marginBottom: '10px'
              }}
            >
              {isBn ? '২. সাধারণ সমস্যা / সার্ভিস নির্বাচন করুন:' : '2. Select Symptom or Required Service:'}
            </label>
            <div style={{ position: 'relative' }}>
              <select
                id="calculator-issue-select"
                value={selectedIssueId}
                onChange={(e) => setSelectedIssueId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg-base)',
                  color: 'var(--color-text-main)',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  appearance: 'none',
                  cursor: 'pointer'
                }}
              >
                {currentAppliance.issues.map((issue) => (
                  <option key={issue.id} value={issue.id}>
                    {isBn ? issue.nameBn : issue.nameEn}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={18}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: 'var(--color-text-muted)'
                }}
              />
            </div>
          </div>

          {/* Step 3: Flat Estimate Summary Container */}
          <div
            style={{
              backgroundColor: 'var(--color-bg-warm)',
              border: '1.5px solid rgba(20, 108, 91, 0.25)',
              borderRadius: '12px',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--color-primary)',
                    letterSpacing: '0.04em'
                  }}
                >
                  {isBn ? 'আনুমানিক মার্কেট খরচ' : 'Estimated Cost Range'}
                </span>
                <div
                  style={{
                    fontSize: 'clamp(1.875rem, 4vw, 2.5rem)',
                    fontWeight: 800,
                    color: 'var(--color-text-main)',
                    lineHeight: 1.1,
                    marginTop: '4px'
                  }}
                >
                  ₹{currentIssue.minPrice.toLocaleString('en-IN')} - ₹{currentIssue.maxPrice.toLocaleString('en-IN')}
                </div>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'var(--color-accent-light)',
                  color: 'var(--color-accent-dark)',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '0.8125rem',
                  fontWeight: 700
                }}
              >
                <Sparkles size={15} />
                <span>{isBn ? 'ভিজিট ফি মাত্র ₹২৯৯' : 'Flat ₹299 Visit Fee'}</span>
              </div>
            </div>

            {/* 3 Key Bullet Points in Clean Single Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                paddingTop: '12px',
                borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                fontSize: '0.8125rem',
                color: 'var(--color-text-muted)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span>
                  {isBn ? `সময়কাল: ${currentIssue.estimatedTimeBn}` : `Duration: ${currentIssue.estimatedTime}`}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span>
                  {isBn ? `${currentIssue.warrantyDays} দিনের গ্যারান্টি` : `${currentIssue.warrantyDays}-Day Part Warranty`}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span>{isBn ? '১০০% আসল ওএম পার্টস' : '100% Genuine OEM Spares'}</span>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                paddingTop: '8px'
              }}
            >
              <a
                href={`tel:${phone}`}
                style={{
                  flex: '1 1 200px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF',
                  padding: '13px 20px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <PhoneCall size={18} />
                <span>{isBn ? `কল করুন: ${phone}` : `Call: ${phone}`}</span>
              </a>

              <button
                type="button"
                onClick={() => onOpenBookingWithIssue(formattedBookingText)}
                style={{
                  flex: '1 1 200px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--color-primary)',
                  color: '#FFFFFF',
                  padding: '13px 20px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(20, 108, 91, 0.25)',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <CalendarCheck size={18} />
                <span>{isBn ? 'এই কোটেশনে বুক করুন' : 'Book at This Estimate'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
