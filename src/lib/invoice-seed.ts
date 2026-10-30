import {
  ServiceCatalogItem,
  SparePartItem,
  InvoiceSettings
} from './invoice-types';

export const initialInvoiceSettings: InvoiceSettings = {
  businessName: 'APPLIANCE SEVA',
  businessNameBn: 'অ্যাপ্লায়েন্স সেবা',
  tagline: 'Professional Home Appliance Repair & Service',
  phone: '+91 6291674186',
  whatsapp: '+91 6291674186',
  email: 'applianceseva@gmail.com',
  website: 'https://applianceseva.com',
  address: 'Salt Lake Sector V, Kolkata, West Bengal - 700091',
  gstin: '', // Optional - can be set from admin invoice settings
  state: 'West Bengal',
  stateCode: '19',
  currency: '₹',
  invoicePrefix: 'AS-INV',
  invoiceNumberNext: 1001,
  defaultDueDays: 7,
  defaultGstEnabled: false,
  defaultGstRate: 18,
  upiId: '6291674186@paytm',
  bankName: 'State Bank of India',
  bankAccountNumber: '',
  bankIfsc: '',
  bankAccountName: 'Appliance Seva',
  footerMessage:
    'Thank you for choosing Appliance Seva! For genuine appliance servicing and repairs, visit applianceseva.com',
  termsAndConditions:
    '1. All repairs are covered under 30-day workmanship warranty.\n2. Genuine replacement parts carry 90-day manufacturer/dealer warranty.\n3. Inspection fee is waived/adjusted when repairs are completed.\n4. Disputes subject to Kolkata jurisdiction.',
  warrantyTerms:
    '90 Days Warranty on replacement parts. 30 Days Service Guarantee on repair workmanship.'
};

export const initialServiceCatalog: ServiceCatalogItem[] = [
  // --- Air Conditioner (AC) ---
  {
    id: 'ac-gen-service',
    category: 'Air Conditioner (AC)',
    name: 'AC General Service',
    hsnSac: '998717',
    defaultPrice: 499,
    defaultTaxRate: 18,
    description: 'Filter cleaning, cooling coil check, airflow restoration, pressure test.',
    isActive: true
  },
  {
    id: 'ac-deep-clean',
    category: 'Air Conditioner (AC)',
    name: 'AC Deep Cleaning (Jet Wash)',
    hsnSac: '998717',
    defaultPrice: 699,
    defaultTaxRate: 18,
    description: '120-bar high pressure jet foam wash with waterproof bib protection.',
    isActive: true
  },
  {
    id: 'ac-installation',
    category: 'Air Conditioner (AC)',
    name: 'AC Installation',
    hsnSac: '998717',
    defaultPrice: 1299,
    defaultTaxRate: 18,
    description: 'Split / Window AC mounting, copper piping, flare joints & vacuum test.',
    isActive: true
  },
  {
    id: 'ac-uninstallation',
    category: 'Air Conditioner (AC)',
    name: 'AC Uninstallation',
    hsnSac: '998717',
    defaultPrice: 699,
    defaultTaxRate: 18,
    description: 'Safe refrigerant pump-down, copper line detachment & dismounting.',
    isActive: true
  },
  {
    id: 'ac-gas-refill',
    category: 'Air Conditioner (AC)',
    name: 'AC Gas Refilling (R32 / R410A)',
    hsnSac: '998717',
    defaultPrice: 1999,
    defaultTaxRate: 18,
    description: 'Nitrogen leak testing, brazing repair, deep vacuum & digital scale gas charging.',
    isActive: true
  },
  {
    id: 'ac-gas-leak-repair',
    category: 'Air Conditioner (AC)',
    name: 'AC Gas Leakage Repair',
    hsnSac: '998717',
    defaultPrice: 850,
    defaultTaxRate: 18,
    description: 'Condenser / evaporator coil brazing, flare nut sealing & nitrogen pressure test.',
    isActive: true
  },
  {
    id: 'ac-pcb-repair',
    category: 'Air Conditioner (AC)',
    name: 'AC Inverter PCB Repair',
    hsnSac: '998717',
    defaultPrice: 1450,
    defaultTaxRate: 18,
    description: 'Indoor / outdoor IPM driver module repair, microcontroller & fuse restoration.',
    isActive: true
  },
  {
    id: 'ac-compressor-repair',
    category: 'Air Conditioner (AC)',
    name: 'AC Compressor Replacement / Repair',
    hsnSac: '998717',
    defaultPrice: 2200,
    defaultTaxRate: 18,
    description: 'Rotary / inverter compressor replacement, oil flush & electrical wiring.',
    isActive: true
  },
  {
    id: 'ac-water-leakage',
    category: 'Air Conditioner (AC)',
    name: 'AC Water Leakage Repair',
    hsnSac: '998717',
    defaultPrice: 450,
    defaultTaxRate: 18,
    description: 'Drain tray de-clogging, drain pipe flush & slope correction.',
    isActive: true
  },
  {
    id: 'ac-cooling-problem',
    category: 'Air Conditioner (AC)',
    name: 'AC Cooling Problem Diagnostics',
    hsnSac: '998717',
    defaultPrice: 299,
    defaultTaxRate: 18,
    description: 'Thermostat sensor test, capacitor check & air delta-T temperature measurement.',
    isActive: true
  },
  {
    id: 'ac-electrical-repair',
    category: 'Air Conditioner (AC)',
    name: 'AC Electrical Repair & Wiring',
    hsnSac: '998717',
    defaultPrice: 550,
    defaultTaxRate: 18,
    description: 'Contactor replacement, terminal connector wiring & capacitor fixing.',
    isActive: true
  },
  {
    id: 'ac-spare-replacement',
    category: 'Air Conditioner (AC)',
    name: 'AC Spare Parts Replacement',
    hsnSac: '998717',
    defaultPrice: 400,
    defaultTaxRate: 18,
    description: 'Labour charge for motor, fan blade, swing flap or sensor replacement.',
    isActive: true
  },
  {
    id: 'ac-other-repair',
    category: 'Air Conditioner (AC)',
    name: 'Other AC Repair Work',
    hsnSac: '998717',
    defaultPrice: 350,
    defaultTaxRate: 18,
    description: 'Custom mechanical or electrical air conditioner service.',
    isActive: true
  },

  // --- Refrigerator ---
  {
    id: 'fridge-inspection',
    category: 'Refrigerator',
    name: 'Refrigerator Inspection & Diagnosis',
    hsnSac: '998717',
    defaultPrice: 199,
    defaultTaxRate: 18,
    description: 'Complete multi-point cooling cycle, thermostat & electrical test.',
    isActive: true
  },
  {
    id: 'fridge-gas-charging',
    category: 'Refrigerator',
    name: 'Refrigerator Gas Charging',
    hsnSac: '998717',
    defaultPrice: 1650,
    defaultTaxRate: 18,
    description: 'R134a / R600a hydrocarbon gas refill, filter drier replacement & vacuum.',
    isActive: true
  },
  {
    id: 'fridge-compressor-rep',
    category: 'Refrigerator',
    name: 'Compressor Replacement',
    hsnSac: '998717',
    defaultPrice: 1950,
    defaultTaxRate: 18,
    description: 'Hermetic / inverter compressor fitting, brazing & relay kit installation.',
    isActive: true
  },
  {
    id: 'fridge-thermostat-rep',
    category: 'Refrigerator',
    name: 'Thermostat Replacement',
    hsnSac: '998717',
    defaultPrice: 650,
    defaultTaxRate: 18,
    description: 'Temperature controller replacement for single / double door fridge.',
    isActive: true
  },
  {
    id: 'fridge-cooling-prob',
    category: 'Refrigerator',
    name: 'Cooling Problem Repair',
    hsnSac: '998717',
    defaultPrice: 550,
    defaultTaxRate: 18,
    description: 'Defrost timer, bimetal sensor & thermal fuse restoration.',
    isActive: true
  },
  {
    id: 'fridge-pcb-repair',
    category: 'Refrigerator',
    name: 'Refrigerator PCB Repair',
    hsnSac: '998717',
    defaultPrice: 1200,
    defaultTaxRate: 18,
    description: 'Inverter controller PCB diagnosis, SMPS power section repair.',
    isActive: true
  },
  {
    id: 'fridge-gasket-rep',
    category: 'Refrigerator',
    name: 'Door Gasket Replacement',
    hsnSac: '998717',
    defaultPrice: 600,
    defaultTaxRate: 18,
    description: 'Magnetic door rubber gasket fitting to prevent cooling loss.',
    isActive: true
  },
  {
    id: 'fridge-cleaning',
    category: 'Refrigerator',
    name: 'Refrigerator Deep Cleaning & Sanitization',
    hsnSac: '998717',
    defaultPrice: 499,
    defaultTaxRate: 18,
    description: 'Complete interior food-grade steam cleaning and anti-bacterial wipe.',
    isActive: true
  },
  {
    id: 'fridge-other-repair',
    category: 'Refrigerator',
    name: 'Other Refrigerator Repair',
    hsnSac: '998717',
    defaultPrice: 350,
    defaultTaxRate: 18,
    description: 'Evaporator fan motor, door hinge or internal LED light repair.',
    isActive: true
  },

  // --- Washing Machine ---
  {
    id: 'wm-gen-service',
    category: 'Washing Machine',
    name: 'General Service & Descaling',
    hsnSac: '998717',
    defaultPrice: 499,
    defaultTaxRate: 18,
    description: 'Tub descaling, drain filter purge, water pressure balance & spin check.',
    isActive: true
  },
  {
    id: 'wm-drum-repair',
    category: 'Washing Machine',
    name: 'Drum & Spider Repair',
    hsnSac: '998717',
    defaultPrice: 1800,
    defaultTaxRate: 18,
    description: 'Front-load stainless drum realignment, spider arm replacement & balancing.',
    isActive: true
  },
  {
    id: 'wm-motor-repair',
    category: 'Washing Machine',
    name: 'Motor Repair / Carbon Brush',
    hsnSac: '998717',
    defaultPrice: 950,
    defaultTaxRate: 18,
    description: 'Direct Drive / induction motor wiring, winding overhaul and belt fitting.',
    isActive: true
  },
  {
    id: 'wm-pcb-repair',
    category: 'Washing Machine',
    name: 'Washing Machine PCB Repair',
    hsnSac: '998717',
    defaultPrice: 1250,
    defaultTaxRate: 18,
    description: 'Program controller motherboard repair, display panel button restoration.',
    isActive: true
  },
  {
    id: 'wm-inlet-valve',
    category: 'Washing Machine',
    name: 'Water Inlet Valve Replacement',
    hsnSac: '998717',
    defaultPrice: 650,
    defaultTaxRate: 18,
    description: 'Solenoid water intake valve replacement (fixes slow water intake error).',
    isActive: true
  },
  {
    id: 'wm-drain-pump',
    category: 'Washing Machine',
    name: 'Drain Pump Replacement',
    hsnSac: '998717',
    defaultPrice: 850,
    defaultTaxRate: 18,
    description: 'Magnetic impeller drain pump fitting (resolves OE / 5E drainage error).',
    isActive: true
  },
  {
    id: 'wm-bearing-repair',
    category: 'Washing Machine',
    name: 'Bearing & Seal Replacement',
    hsnSac: '998717',
    defaultPrice: 1650,
    defaultTaxRate: 18,
    description: 'High-speed dual ball-bearing & waterproof oil seal overhaul (stops loud spin roar).',
    isActive: true
  },
  {
    id: 'wm-installation',
    category: 'Washing Machine',
    name: 'Washing Machine Installation',
    hsnSac: '998717',
    defaultPrice: 399,
    defaultTaxRate: 18,
    description: 'Inlet hose connection, drain pipe positioning & levelling adjustment.',
    isActive: true
  },
  {
    id: 'wm-other-repair',
    category: 'Washing Machine',
    name: 'Other Washing Machine Repair',
    hsnSac: '998717',
    defaultPrice: 350,
    defaultTaxRate: 18,
    description: 'Door lock latch (interlock), suspension shock absorber or belt repair.',
    isActive: true
  },

  // --- Television (TV) ---
  {
    id: 'tv-inspection',
    category: 'Television (TV)',
    name: 'TV Inspection & Diagnosis',
    hsnSac: '998717',
    defaultPrice: 199,
    defaultTaxRate: 18,
    description: 'Screen diagnostics, backlight tester measurement & logic board inspection.',
    isActive: true
  },
  {
    id: 'tv-backlight-rep',
    category: 'Television (TV)',
    name: 'LED Backlight Replacement',
    hsnSac: '998717',
    defaultPrice: 1450,
    defaultTaxRate: 18,
    description: 'Fixes "Sound OK but screen pitch black" - Brand new aluminium core LED strips.',
    isActive: true
  },
  {
    id: 'tv-display-repair',
    category: 'Television (TV)',
    name: 'Display / Panel Repair',
    hsnSac: '998717',
    defaultPrice: 1600,
    defaultTaxRate: 18,
    description: 'T-Con timing controller repair, ribbon cable oxidation clean & COF bonding.',
    isActive: true
  },
  {
    id: 'tv-motherboard-repair',
    category: 'Television (TV)',
    name: 'Motherboard Repair',
    hsnSac: '998717',
    defaultPrice: 1200,
    defaultTaxRate: 18,
    description: 'Main processor board repair, HDMI port fixing & audio IC restoration.',
    isActive: true
  },
  {
    id: 'tv-power-supply',
    category: 'Television (TV)',
    name: 'Power Supply (SMPS) Repair',
    hsnSac: '998717',
    defaultPrice: 950,
    defaultTaxRate: 18,
    description: 'Power section capacitor, MOSFET transistor & fuse replacement.',
    isActive: true
  },
  {
    id: 'tv-software-issue',
    category: 'Television (TV)',
    name: 'Software Issue / Android Bootloop',
    hsnSac: '998717',
    defaultPrice: 750,
    defaultTaxRate: 18,
    description: 'Smart TV firmware re-flashing, Android boot freeze recovery.',
    isActive: true
  },
  {
    id: 'tv-wall-mount',
    category: 'Television (TV)',
    name: 'Wall Mount Installation',
    hsnSac: '998717',
    defaultPrice: 450,
    defaultTaxRate: 18,
    description: 'Standard / swivel heavy duty wall bracket installation & level check.',
    isActive: true
  },
  {
    id: 'tv-other-repair',
    category: 'Television (TV)',
    name: 'Other TV Repair Work',
    hsnSac: '998717',
    defaultPrice: 350,
    defaultTaxRate: 18,
    description: 'Remote sensor, speaker replacement or Wi-Fi module repair.',
    isActive: true
  },

  // --- Microwave Oven ---
  {
    id: 'micro-inspection',
    category: 'Microwave Oven',
    name: 'General Inspection & Safety Test',
    hsnSac: '998717',
    defaultPrice: 199,
    defaultTaxRate: 18,
    description: 'High-voltage leakage test, interlock switch check & magnetron test.',
    isActive: true
  },
  {
    id: 'micro-heating-prob',
    category: 'Microwave Oven',
    name: 'Heating Problem Diagnostics',
    hsnSac: '998717',
    defaultPrice: 450,
    defaultTaxRate: 18,
    description: 'Troubleshooting microwave running but not heating food.',
    isActive: true
  },
  {
    id: 'micro-magnetron-rep',
    category: 'Microwave Oven',
    name: 'Magnetron Replacement',
    hsnSac: '998717',
    defaultPrice: 1450,
    defaultTaxRate: 18,
    description: 'Original high-output vacuum magnetron replacement with 90-day warranty.',
    isActive: true
  },
  {
    id: 'micro-door-switch',
    category: 'Microwave Oven',
    name: 'Door Switch Repair',
    hsnSac: '998717',
    defaultPrice: 450,
    defaultTaxRate: 18,
    description: 'Primary / secondary microswitch safety lock replacement.',
    isActive: true
  },
  {
    id: 'micro-control-panel',
    category: 'Microwave Oven',
    name: 'Control Panel Membrane Repair',
    hsnSac: '998717',
    defaultPrice: 750,
    defaultTaxRate: 18,
    description: 'Fixes unresponsive touch buttons and start key failure.',
    isActive: true
  },
  {
    id: 'micro-pcb-repair',
    category: 'Microwave Oven',
    name: 'Microwave PCB Repair',
    hsnSac: '998717',
    defaultPrice: 950,
    defaultTaxRate: 18,
    description: 'Electronic display & relay control board restoration.',
    isActive: true
  },
  {
    id: 'micro-turntable-motor',
    category: 'Microwave Oven',
    name: 'Turntable Motor Replacement',
    hsnSac: '998717',
    defaultPrice: 550,
    defaultTaxRate: 18,
    description: 'Synchronous drive motor replacement for glass plate rotation.',
    isActive: true
  },
  {
    id: 'micro-other-repair',
    category: 'Microwave Oven',
    name: 'Other Microwave Repair',
    hsnSac: '998717',
    defaultPrice: 350,
    defaultTaxRate: 18,
    description: 'High voltage diode, capacitor, mica waveguide cover replacement.',
    isActive: true
  }
];

export const initialSpareParts: SparePartItem[] = [
  {
    id: 'sp-ac-cap-50',
    partNumber: 'CAP-AC-50MFD',
    name: 'AC Run Capacitor (50+5 MFD)',
    category: 'Air Conditioner (AC)',
    brand: 'Epcos / Tibcon',
    hsnCode: '85322500',
    unitPrice: 650,
    costPrice: 280,
    taxRate: 18,
    stockQuantity: 45,
    warrantyPeriod: '90 Days',
    isActive: true
  },
  {
    id: 'sp-ac-cap-35',
    partNumber: 'CAP-AC-35MFD',
    name: 'AC Run Capacitor (35 MFD)',
    category: 'Air Conditioner (AC)',
    brand: 'Epcos / Keltron',
    hsnCode: '85322500',
    unitPrice: 450,
    costPrice: 190,
    taxRate: 18,
    stockQuantity: 30,
    warrantyPeriod: '90 Days',
    isActive: true
  },
  {
    id: 'sp-ac-fan-motor',
    partNumber: 'MOT-AC-ODU',
    name: 'AC Outdoor Fan Motor (30W-45W)',
    category: 'Air Conditioner (AC)',
    brand: 'Universal / OEM',
    hsnCode: '85014090',
    unitPrice: 1850,
    costPrice: 1100,
    taxRate: 18,
    stockQuantity: 12,
    warrantyPeriod: '180 Days',
    isActive: true
  },
  {
    id: 'sp-fridge-relay',
    partNumber: 'REL-FRG-PTC',
    name: 'Refrigerator PTC Start Relay & OLP Kit',
    category: 'Refrigerator',
    brand: 'Danfoss / OEM',
    hsnCode: '85364100',
    unitPrice: 450,
    costPrice: 160,
    taxRate: 18,
    stockQuantity: 50,
    warrantyPeriod: '90 Days',
    isActive: true
  },
  {
    id: 'sp-fridge-defrost-timer',
    partNumber: 'TMR-FRG-DEF',
    name: 'Frost-Free Defrost Timer (Sankyo Type)',
    category: 'Refrigerator',
    brand: 'Sankyo / OEM',
    hsnCode: '91070000',
    unitPrice: 650,
    costPrice: 280,
    taxRate: 18,
    stockQuantity: 25,
    warrantyPeriod: '90 Days',
    isActive: true
  },
  {
    id: 'sp-fridge-bimetal',
    partNumber: 'SEN-FRG-BIM',
    name: 'Bimetal Defrost Sensor with Thermal Fuse',
    category: 'Refrigerator',
    brand: 'OEM Universal',
    hsnCode: '90321090',
    unitPrice: 380,
    costPrice: 130,
    taxRate: 18,
    stockQuantity: 40,
    warrantyPeriod: '90 Days',
    isActive: true
  },
  {
    id: 'sp-wm-drain-pump',
    partNumber: 'PMP-WM-FL',
    name: 'Front Load Magnetic Drain Pump Assembly',
    category: 'Washing Machine',
    brand: 'Askoll / Hanning',
    hsnCode: '84137090',
    unitPrice: 1250,
    costPrice: 650,
    taxRate: 18,
    stockQuantity: 18,
    warrantyPeriod: '180 Days',
    isActive: true
  },
  {
    id: 'sp-wm-inlet-valve',
    partNumber: 'VLV-WM-2WAY',
    name: 'Double Way Solenoid Water Inlet Valve',
    category: 'Washing Machine',
    brand: 'OEM Universal',
    hsnCode: '84818030',
    unitPrice: 650,
    costPrice: 280,
    taxRate: 18,
    stockQuantity: 30,
    warrantyPeriod: '90 Days',
    isActive: true
  },
  {
    id: 'sp-wm-bearing-kit',
    partNumber: 'BRG-WM-6205',
    name: 'Tub Dual Ball Bearing + Seal Kit (SKF)',
    category: 'Washing Machine',
    brand: 'SKF / NBC',
    hsnCode: '84821011',
    unitPrice: 1100,
    costPrice: 480,
    taxRate: 18,
    stockQuantity: 15,
    warrantyPeriod: '180 Days',
    isActive: true
  },
  {
    id: 'sp-tv-led-strip-32',
    partNumber: 'LED-TV-32ALU',
    name: '32" Full Aluminum Backlight Array (3-Bar Kit)',
    category: 'Television (TV)',
    brand: 'Sharp Core Tech',
    hsnCode: '85299090',
    unitPrice: 950,
    costPrice: 380,
    taxRate: 18,
    stockQuantity: 22,
    warrantyPeriod: '180 Days',
    isActive: true
  },
  {
    id: 'sp-tv-led-strip-43',
    partNumber: 'LED-TV-43ALU',
    name: '43" Full Aluminum Backlight Array (4-Bar Kit)',
    category: 'Television (TV)',
    brand: 'Sharp Core Tech',
    hsnCode: '85299090',
    unitPrice: 1450,
    costPrice: 620,
    taxRate: 18,
    stockQuantity: 16,
    warrantyPeriod: '180 Days',
    isActive: true
  },
  {
    id: 'sp-micro-magnetron',
    partNumber: 'MAG-MW-2M214',
    name: 'Universal 2M214 Microwave Magnetron Tube',
    category: 'Microwave Oven',
    brand: 'LG / Witol / Galanz',
    hsnCode: '85407100',
    unitPrice: 1550,
    costPrice: 850,
    taxRate: 18,
    stockQuantity: 14,
    warrantyPeriod: '90 Days',
    isActive: true
  },
  {
    id: 'sp-micro-hv-diode',
    partNumber: 'DIO-MW-HV01',
    name: 'High Voltage Rectifier Diode (CL01-12)',
    category: 'Microwave Oven',
    brand: 'OEM',
    hsnCode: '85411000',
    unitPrice: 250,
    costPrice: 60,
    taxRate: 18,
    stockQuantity: 40,
    warrantyPeriod: '90 Days',
    isActive: true
  }
];

