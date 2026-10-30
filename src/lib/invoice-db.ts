import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  Invoice,
  InvoiceItem,
  InvoicePayment,
  Customer,
  ServiceCatalogItem,
  SparePartItem,
  InvoiceSettings,
  InvoiceDashboardStats,
  PaymentStatus,
  PaymentMethod,
  InvoiceStatus,
  InvoiceType
} from './invoice-types';
import {
  initialInvoiceSettings,
  initialServiceCatalog,
  initialSpareParts
} from './invoice-seed';
import { getMongoDb } from './mongodb';
import { getDbPool } from './db';

const DATA_DIR = path.join(process.cwd(), 'data');
const INVOICES_FILE = path.join(DATA_DIR, 'invoices.json');
const CUSTOMERS_FILE = path.join(DATA_DIR, 'customers.json');
const SERVICES_FILE = path.join(DATA_DIR, 'invoice_services.json');
const SPARE_PARTS_FILE = path.join(DATA_DIR, 'spare_parts.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'invoice_settings.json');

function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (e) {
    // Ignore in read-only / restricted environments
  }
}

function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    ensureDataDir();
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content) as T;
    }
  } catch (err) {
    console.warn(`[InvoiceDB] Could not read file ${filePath}:`, err);
  }
  return fallback;
}

function writeJsonFile<T>(filePath: string, data: T) {
  try {
    ensureDataDir();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn(`[InvoiceDB] Could not write file ${filePath}:`, err);
  }
}

// In-Memory Runtime State
const runtimeState = {
  settings: readJsonFile<InvoiceSettings>(SETTINGS_FILE, { ...initialInvoiceSettings }),
  services: readJsonFile<ServiceCatalogItem[]>(SERVICES_FILE, [...initialServiceCatalog]),
  spareParts: readJsonFile<SparePartItem[]>(SPARE_PARTS_FILE, [...initialSpareParts]),
  customers: readJsonFile<Customer[]>(CUSTOMERS_FILE, []),
  invoices: readJsonFile<Invoice[]>(INVOICES_FILE, [])
};

// Seed sample invoices if fresh install
if (runtimeState.invoices.length === 0) {
  const seedNow = new Date();
  const seedToday = seedNow.toISOString().split('T')[0];
  const sampleCustomer = {
    id: 'CUST-INIT-1',
    name: 'Anirban Mukherjee',
    mobile: '9830123456',
    whatsapp: '9830123456',
    email: 'anirban.kol@gmail.com',
    houseNumber: 'Flat 4B, Tower 2',
    streetAddress: 'Silver Oak Apartments, Sector V',
    locality: 'Salt Lake',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700091',
    totalInvoices: 1,
    totalBilled: 1649,
    totalPaid: 1649,
    outstandingBalance: 0,
    lastServiceDate: seedToday,
    createdAt: seedNow.toISOString(),
    updatedAt: seedNow.toISOString()
  };
  runtimeState.customers.push(sampleCustomer);

  const sampleItems: InvoiceItem[] = [
    {
      id: 'ITEM-1',
      itemType: 'service',
      description: 'AC Deep Cleaning (Jet Wash Foam Service)',
      hsnSac: '998717',
      quantity: 1,
      unitPrice: 699,
      discount: 0,
      taxRate: 0,
      taxAmount: 0,
      totalAmount: 699
    },
    {
      id: 'ITEM-2',
      itemType: 'spare_part',
      description: 'AC Run Capacitor 50 MFD (Epcos Genuine)',
      hsnSac: '85322500',
      quantity: 1,
      unitPrice: 650,
      discount: 0,
      taxRate: 0,
      taxAmount: 0,
      totalAmount: 650
    },
    {
      id: 'ITEM-3',
      itemType: 'visiting',
      description: 'Doorstep Technician Inspection & Travel Charge (Adjusted in repair)',
      hsnSac: '998717',
      quantity: 1,
      unitPrice: 300,
      discount: 0,
      taxRate: 0,
      taxAmount: 0,
      totalAmount: 300
    }
  ];

  runtimeState.invoices.push({
    id: 'INV-SAMPLE-1',
    invoiceNumber: 'AS-INV-2026-001001',
    type: 'service',
    status: 'finalized',
    paymentStatus: 'paid',
    invoiceDate: seedToday,
    dueDate: seedToday,
    serviceDate: seedToday,
    bookingId: 'AS-84920147',
    technicianName: 'Rajesh Karmakar (Senior AC Specialist)',
    secureToken: 'as-demo-token-saltlake-2026',
    customerId: sampleCustomer.id,
    customerName: sampleCustomer.name,
    mobile: sampleCustomer.mobile,
    whatsapp: sampleCustomer.whatsapp,
    email: sampleCustomer.email,
    houseNumber: sampleCustomer.houseNumber,
    streetAddress: sampleCustomer.streetAddress,
    locality: sampleCustomer.locality,
    city: sampleCustomer.city,
    state: sampleCustomer.state,
    pincode: sampleCustomer.pincode,
    applianceCategory: 'Air Conditioner (AC)',
    brand: 'Daikin',
    modelNumber: 'FTKF50TV',
    serialNumber: 'DK2024-8849',
    problemDescription: 'AC outdoor fan hum but compressor tripping; cooling stopped.',
    workPerformed: 'Replaced weak 50 MFD capacitor, deep jet pump serviced indoor evaporator, cleared drain choke.',
    warrantyDuration: '90 Days',
    warrantyStartDate: seedToday,
    warrantyEndDate: new Date(seedNow.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    warrantyTerms: '90 Days Warranty on replacement capacitor. 30 Days Service Guarantee on jet cleaning workmanship.',
    items: sampleItems,
    isGst: false,
    serviceSubtotal: 699,
    partsSubtotal: 650,
    additionalCharges: 300,
    subtotal: 1649,
    discountTotal: 0,
    taxableAmount: 1649,
    cgst: 0,
    sgst: 0,
    igst: 0,
    taxTotal: 0,
    roundOff: 0,
    grandTotal: 1649,
    amountPaid: 1649,
    balanceDue: 0,
    payments: [
      {
        id: 'PAY-1',
        amount: 1649,
        paymentDate: seedToday,
        method: 'upi',
        transactionRef: 'UPI/6291674186/AXS129849',
        notes: 'Paid via Google Pay at doorstep',
        recordedAt: seedNow.toISOString()
      }
    ],
    notes: 'Thank you for choosing Appliance Seva! Next routine filter wash recommended in 90 days.',
    termsAndConditions: runtimeState.settings.termsAndConditions,
    activityLog: [
      {
        id: 'LOG-INIT',
        action: 'CREATED',
        description: 'Invoice created upon completion of doorstep service',
        timestamp: seedNow.toISOString()
      }
    ],
    createdAt: seedNow.toISOString(),
    updatedAt: seedNow.toISOString(),
    finalizedAt: seedNow.toISOString()
  });

  writeJsonFile(CUSTOMERS_FILE, runtimeState.customers);
  writeJsonFile(INVOICES_FILE, runtimeState.invoices);
}

// ==========================================
// 1. SETTINGS MANAGEMENT
// ==========================================
export async function getInvoiceSettings(): Promise<InvoiceSettings> {
  const mongo = await getMongoDb();
  if (mongo) {
    try {
      const doc = await mongo.collection('invoice_settings').findOne({ id: 'primary' });
      if (doc) {
        const { _id, ...rest } = doc as any;
        runtimeState.settings = { ...runtimeState.settings, ...rest };
      }
    } catch (e) {
      // fallback
    }
  }
  return runtimeState.settings;
}

export async function updateInvoiceSettings(
  partial: Partial<InvoiceSettings>
): Promise<InvoiceSettings> {
  runtimeState.settings = {
    ...runtimeState.settings,
    ...partial
  };
  writeJsonFile(SETTINGS_FILE, runtimeState.settings);

  const mongo = await getMongoDb();
  if (mongo) {
    try {
      await mongo.collection('invoice_settings').updateOne(
        { id: 'primary' },
        { $set: { ...runtimeState.settings, id: 'primary', updatedAt: new Date().toISOString() } },
        { upsert: true }
      );
    } catch (e) {
      console.warn('MongoDB update invoice_settings error:', e);
    }
  }

  return runtimeState.settings;
}

// ==========================================
// 2. SERVICE CATALOG MANAGEMENT
// ==========================================
export async function getServiceCatalog(): Promise<ServiceCatalogItem[]> {
  const mongo = await getMongoDb();
  if (mongo) {
    try {
      const docs = await mongo.collection('invoice_services').find({}).toArray();
      if (docs && docs.length > 0) {
        runtimeState.services = docs.map(({ _id, ...item }: any) => item);
      }
    } catch (e) {}
  }
  return runtimeState.services;
}

export async function saveServiceCatalogItem(
  item: ServiceCatalogItem
): Promise<ServiceCatalogItem> {
  const idx = runtimeState.services.findIndex((s) => s.id === item.id);
  if (idx >= 0) {
    runtimeState.services[idx] = { ...item };
  } else {
    runtimeState.services.push({ ...item });
  }
  writeJsonFile(SERVICES_FILE, runtimeState.services);

  const mongo = await getMongoDb();
  if (mongo) {
    try {
      await mongo
        .collection('invoice_services')
        .updateOne({ id: item.id }, { $set: { ...item } }, { upsert: true });
    } catch (e) {}
  }
  return item;
}

export async function deleteServiceCatalogItem(id: string): Promise<boolean> {
  runtimeState.services = runtimeState.services.filter((s) => s.id !== id);
  writeJsonFile(SERVICES_FILE, runtimeState.services);

  const mongo = await getMongoDb();
  if (mongo) {
    try {
      await mongo.collection('invoice_services').deleteOne({ id });
    } catch (e) {}
  }
  return true;
}

// ==========================================
// 3. SPARE PARTS MANAGEMENT
// ==========================================
export async function getSpareParts(): Promise<SparePartItem[]> {
  const mongo = await getMongoDb();
  if (mongo) {
    try {
      const docs = await mongo.collection('spare_parts').find({}).toArray();
      if (docs && docs.length > 0) {
        runtimeState.spareParts = docs.map(({ _id, ...item }: any) => item);
      }
    } catch (e) {}
  }
  return runtimeState.spareParts;
}

export async function saveSparePartItem(item: SparePartItem): Promise<SparePartItem> {
  const idx = runtimeState.spareParts.findIndex((p) => p.id === item.id);
  if (idx >= 0) {
    runtimeState.spareParts[idx] = { ...item };
  } else {
    runtimeState.spareParts.push({ ...item });
  }
  writeJsonFile(SPARE_PARTS_FILE, runtimeState.spareParts);

  const mongo = await getMongoDb();
  if (mongo) {
    try {
      await mongo
        .collection('spare_parts')
        .updateOne({ id: item.id }, { $set: { ...item } }, { upsert: true });
    } catch (e) {}
  }
  return item;
}

export async function deleteSparePartItem(id: string): Promise<boolean> {
  runtimeState.spareParts = runtimeState.spareParts.filter((p) => p.id !== id);
  writeJsonFile(SPARE_PARTS_FILE, runtimeState.spareParts);

  const mongo = await getMongoDb();
  if (mongo) {
    try {
      await mongo.collection('spare_parts').deleteOne({ id });
    } catch (e) {}
  }
  return true;
}

// ==========================================
// 4. CUSTOMER MANAGEMENT
// ==========================================
export async function getCustomers(query?: string): Promise<Customer[]> {
  let list = runtimeState.customers;
  const mongo = await getMongoDb();
  if (mongo) {
    try {
      const docs = await mongo.collection('customers').find({}).toArray();
      if (docs && docs.length > 0) {
        runtimeState.customers = docs.map(({ _id, ...c }: any) => c);
        list = runtimeState.customers;
      }
    } catch (e) {}
  }

  if (query && query.trim()) {
    const q = query.trim().toLowerCase();
    return list.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.mobile.includes(q) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.locality && c.locality.toLowerCase().includes(q))
    );
  }

  return list.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  return runtimeState.customers.find((c) => c.id === id) || null;
}

export async function findOrCreateCustomer(
  data: Partial<Customer> & { name: string; mobile: string }
): Promise<Customer> {
  const cleanMobile = data.mobile.replace(/[^\d]/g, '').slice(-10);
  let existing = runtimeState.customers.find(
    (c) => c.mobile.replace(/[^\d]/g, '').slice(-10) === cleanMobile
  );

  const now = new Date().toISOString();

  if (existing) {
    existing.name = data.name || existing.name;
    existing.whatsapp = data.whatsapp || existing.whatsapp || existing.mobile;
    if (data.email) existing.email = data.email;
    if (data.streetAddress) existing.streetAddress = data.streetAddress;
    if (data.locality) existing.locality = data.locality;
    if (data.city) existing.city = data.city;
    if (data.state) existing.state = data.state;
    if (data.pincode) existing.pincode = data.pincode;
    if (data.gstin) existing.gstin = data.gstin;
    existing.updatedAt = now;
  } else {
    existing = {
      id: `CUST-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`,
      name: data.name,
      mobile: data.mobile,
      whatsapp: data.whatsapp || data.mobile,
      email: data.email || '',
      houseNumber: data.houseNumber || '',
      streetAddress: data.streetAddress || '',
      locality: data.locality || '',
      city: data.city || 'Kolkata',
      state: data.state || 'West Bengal',
      pincode: data.pincode || '700091',
      gstin: data.gstin || '',
      totalInvoices: 0,
      totalBilled: 0,
      totalPaid: 0,
      outstandingBalance: 0,
      createdAt: now,
      updatedAt: now
    };
    runtimeState.customers.unshift(existing);
  }

  writeJsonFile(CUSTOMERS_FILE, runtimeState.customers);

  const mongo = await getMongoDb();
  if (mongo) {
    try {
      await mongo
        .collection('customers')
        .updateOne({ id: existing.id }, { $set: { ...existing } }, { upsert: true });
    } catch (e) {}
  }

  return existing;
}

// Refresh Customer Aggregates (Billed, Paid, Balance)
export function syncCustomerMetrics(customerId: string) {
  const customer = runtimeState.customers.find((c) => c.id === customerId);
  if (!customer) return;

  const customerInvoices = runtimeState.invoices.filter(
    (inv) => inv.customerId === customerId && inv.status !== 'cancelled'
  );

  customer.totalInvoices = customerInvoices.length;
  customer.totalBilled = customerInvoices.reduce((sum, inv) => sum + (inv.grandTotal || 0), 0);
  customer.totalPaid = customerInvoices.reduce((sum, inv) => sum + (inv.amountPaid || 0), 0);
  customer.outstandingBalance = Math.max(0, customer.totalBilled - customer.totalPaid);
  if (customerInvoices.length > 0) {
    customer.lastServiceDate = customerInvoices[0].serviceDate || customerInvoices[0].invoiceDate;
  }
  customer.updatedAt = new Date().toISOString();

  writeJsonFile(CUSTOMERS_FILE, runtimeState.customers);
}

// ==========================================
// 5. INVOICE NUMBER GENERATION
// ==========================================
export async function generateNextInvoiceNumber(): Promise<string> {
  const settings = await getInvoiceSettings();
  const year = new Date().getFullYear();
  const prefix = settings.invoicePrefix || 'AS-INV';

  // Find highest existing sequence in current year
  let maxSeq = settings.invoiceNumberNext || 1;
  const regex = new RegExp(`^${prefix}-${year}-(\\d+)$`);

  runtimeState.invoices.forEach((inv) => {
    const match = inv.invoiceNumber.match(regex);
    if (match && match[1]) {
      const num = parseInt(match[1], 10);
      if (num >= maxSeq) {
        maxSeq = num + 1;
      }
    }
  });

  // Zero-pad to 6 digits, e.g. AS-INV-2026-000001
  const seqStr = String(maxSeq).padStart(6, '0');
  const invoiceNumber = `${prefix}-${year}-${seqStr}`;

  // Advance settings sequence
  await updateInvoiceSettings({ invoiceNumberNext: maxSeq + 1 });

  return invoiceNumber;
}

// ==========================================
// 6. DECIMAL-SAFE FINANCIAL CALCULATION
// ==========================================
export function calculateInvoiceTotals(
  items: InvoiceItem[],
  isGst: boolean,
  customerState: string = 'West Bengal',
  discountOverall: number = 0
) {
  let serviceSubtotal = 0;
  let partsSubtotal = 0;
  let additionalCharges = 0;
  let subtotal = 0;
  let totalLineDiscounts = 0;
  let taxableAmount = 0;
  let taxTotal = 0;

  const isIntraState =
    customerState.trim().toLowerCase() === 'west bengal' ||
    customerState.trim().toLowerCase() === 'wb';

  const processedItems = items.map((item) => {
    const qty = Math.max(1, Number(item.quantity) || 1);
    const unitPrice = Math.max(0, Number(item.unitPrice) || 0);
    const discount = Math.max(0, Number(item.discount) || 0);
    const lineGross = Math.round(qty * unitPrice * 100) / 100;
    const lineDiscounted = Math.max(0, lineGross - discount);

    if (item.itemType === 'service') serviceSubtotal += lineGross;
    else if (item.itemType === 'spare_part') partsSubtotal += lineGross;
    else additionalCharges += lineGross;

    subtotal += lineGross;
    totalLineDiscounts += discount;

    let lineTaxAmount = 0;
    const taxRate = isGst ? Number(item.taxRate) || 0 : 0;
    if (isGst && taxRate > 0) {
      lineTaxAmount = Math.round(((lineDiscounted * taxRate) / 100) * 100) / 100;
    }

    taxableAmount += lineDiscounted;
    taxTotal += lineTaxAmount;

    return {
      ...item,
      quantity: qty,
      unitPrice,
      discount,
      taxRate,
      taxAmount: lineTaxAmount,
      totalAmount: Math.round((lineDiscounted + lineTaxAmount) * 100) / 100
    };
  });

  const totalDiscount = Math.round((totalLineDiscounts + (Number(discountOverall) || 0)) * 100) / 100;

  let cgst = 0;
  let sgst = 0;
  let igst = 0;

  if (isGst && taxTotal > 0) {
    if (isIntraState) {
      cgst = Math.round((taxTotal / 2) * 100) / 100;
      sgst = Math.round((taxTotal - cgst) * 100) / 100; // balance out penny rounding
    } else {
      igst = taxTotal;
    }
  }

  const rawGrandTotal = taxableAmount + taxTotal;
  const grandTotal = Math.round(rawGrandTotal);
  const roundOff = Math.round((grandTotal - rawGrandTotal) * 100) / 100;

  return {
    processedItems,
    serviceSubtotal: Math.round(serviceSubtotal * 100) / 100,
    partsSubtotal: Math.round(partsSubtotal * 100) / 100,
    additionalCharges: Math.round(additionalCharges * 100) / 100,
    subtotal: Math.round(subtotal * 100) / 100,
    discountTotal: totalDiscount,
    taxableAmount: Math.round(taxableAmount * 100) / 100,
    cgst,
    sgst,
    igst,
    taxTotal: Math.round(taxTotal * 100) / 100,
    roundOff,
    grandTotal
  };
}

// ==========================================
// 7. INVOICE CRUD & WORKFLOWS
// ==========================================
export async function getInvoices(filters?: {
  search?: string;
  type?: string;
  status?: string;
  paymentStatus?: string;
  appliance?: string;
  technician?: string;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
  offset?: number;
}): Promise<{ invoices: Invoice[]; total: number }> {
  // Pull from MongoDB if available
  const mongo = await getMongoDb();
  if (mongo) {
    try {
      const docs = await mongo.collection('invoices').find({}).toArray();
      if (docs && docs.length > 0) {
        runtimeState.invoices = docs.map(({ _id, ...inv }: any) => inv);
      }
    } catch (e) {}
  }

  let list = [...runtimeState.invoices];

  if (filters) {
    if (filters.search && filters.search.trim()) {
      const q = filters.search.trim().toLowerCase();
      list = list.filter(
        (inv) =>
          inv.invoiceNumber.toLowerCase().includes(q) ||
          inv.customerName.toLowerCase().includes(q) ||
          inv.mobile.includes(q) ||
          inv.applianceCategory.toLowerCase().includes(q) ||
          (inv.bookingId && inv.bookingId.toLowerCase().includes(q)) ||
          (inv.technicianName && inv.technicianName.toLowerCase().includes(q))
      );
    }

    if (filters.type && filters.type !== 'all') {
      list = list.filter((inv) => inv.type === filters.type);
    }

    if (filters.status && filters.status !== 'all') {
      list = list.filter((inv) => inv.status === filters.status);
    }

    if (filters.paymentStatus && filters.paymentStatus !== 'all') {
      list = list.filter((inv) => inv.paymentStatus === filters.paymentStatus);
    }

    if (filters.appliance && filters.appliance !== 'all') {
      list = list.filter((inv) => inv.applianceCategory === filters.appliance);
    }

    if (filters.technician && filters.technician !== 'all') {
      list = list.filter((inv) => inv.technicianName === filters.technician);
    }

    if (filters.dateFrom) {
      list = list.filter((inv) => inv.invoiceDate >= filters.dateFrom!);
    }

    if (filters.dateTo) {
      list = list.filter((inv) => inv.invoiceDate <= filters.dateTo!);
    }
  }

  // Sort newest first
  list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const total = list.length;
  const offset = filters?.offset || 0;
  const limit = filters?.limit || 50;

  return {
    invoices: list.slice(offset, offset + limit),
    total
  };
}

export async function getInvoiceById(idOrNumber: string): Promise<Invoice | null> {
  const match = runtimeState.invoices.find(
    (inv) => inv.id === idOrNumber || inv.invoiceNumber === idOrNumber
  );
  if (match) return match;

  const mongo = await getMongoDb();
  if (mongo) {
    try {
      const doc = await mongo
        .collection('invoices')
        .findOne({ $or: [{ id: idOrNumber }, { invoiceNumber: idOrNumber }] });
      if (doc) {
        const { _id, ...inv } = doc as any;
        return inv;
      }
    } catch (e) {}
  }
  return null;
}

export async function getInvoiceBySecureToken(token: string): Promise<Invoice | null> {
  return runtimeState.invoices.find((inv) => inv.secureToken === token) || null;
}

export async function createInvoice(data: {
  type?: InvoiceType;
  invoiceDate?: string;
  dueDate?: string;
  serviceDate?: string;
  bookingId?: string;
  technicianName?: string;
  customerName: string;
  mobile: string;
  whatsapp?: string;
  email?: string;
  houseNumber?: string;
  streetAddress?: string;
  locality?: string;
  city?: string;
  state?: string;
  pincode?: string;
  customerGstin?: string;
  applianceCategory: string;
  brand: string;
  modelNumber?: string;
  serialNumber?: string;
  problemDescription?: string;
  workPerformed?: string;
  warrantyDuration?: string;
  warrantyStartDate?: string;
  warrantyEndDate?: string;
  warrantyTerms?: string;
  items: InvoiceItem[];
  isGst?: boolean;
  status?: InvoiceStatus;
  initialPayment?: {
    amount: number;
    method: PaymentMethod;
    transactionRef?: string;
    notes?: string;
  };
  notes?: string;
  termsAndConditions?: string;
}): Promise<Invoice> {
  const now = new Date();
  const invoiceDate = data.invoiceDate || now.toISOString().split('T')[0];
  const settings = await getInvoiceSettings();

  const dueDays = settings.defaultDueDays || 7;
  const dueDateObj = new Date(now.getTime() + dueDays * 24 * 60 * 60 * 1000);
  const dueDate = data.dueDate || dueDateObj.toISOString().split('T')[0];
  const serviceDate = data.serviceDate || invoiceDate;

  // 1. Auto-create or link customer
  const customer = await findOrCreateCustomer({
    name: data.customerName,
    mobile: data.mobile,
    whatsapp: data.whatsapp || data.mobile,
    email: data.email,
    houseNumber: data.houseNumber,
    streetAddress: data.streetAddress,
    locality: data.locality,
    city: data.city,
    state: data.state,
    pincode: data.pincode,
    gstin: data.customerGstin
  });

  // 2. Generate unique invoice number
  const invoiceNumber = await generateNextInvoiceNumber();

  // 3. Generate crypto-safe public view token
  const secureToken = crypto.randomBytes(18).toString('hex');

  // 4. Calculate decimal-safe financials
  const isGst = data.isGst ?? settings.defaultGstEnabled;
  const calc = calculateInvoiceTotals(data.items, isGst, customer.state || 'West Bengal');

  const grandTotal = calc.grandTotal;

  // 5. Initial Payment processing if provided
  const payments: InvoicePayment[] = [];
  let amountPaid = 0;

  if (data.initialPayment && data.initialPayment.amount > 0) {
    const paidAmt = Math.min(grandTotal, Math.round(Number(data.initialPayment.amount) * 100) / 100);
    amountPaid = paidAmt;
    payments.push({
      id: `PAY-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`,
      amount: paidAmt,
      paymentDate: invoiceDate,
      method: data.initialPayment.method || 'cash',
      transactionRef: data.initialPayment.transactionRef || '',
      notes: data.initialPayment.notes || 'Payment recorded on invoice creation',
      recordedAt: now.toISOString()
    });
  }

  const balanceDue = Math.max(0, Math.round((grandTotal - amountPaid) * 100) / 100);
  let paymentStatus: PaymentStatus = 'unpaid';
  if (amountPaid >= grandTotal && grandTotal > 0) {
    paymentStatus = 'paid';
  } else if (amountPaid > 0) {
    paymentStatus = 'partially_paid';
  }

  const id = `INV-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;

  const activityLog = [
    {
      id: `LOG-${Date.now()}`,
      action: 'CREATED',
      description: `Invoice ${invoiceNumber} created for ${data.customerName} (₹${grandTotal.toLocaleString('en-IN')})`,
      timestamp: now.toISOString()
    }
  ];

  if (payments.length > 0) {
    activityLog.push({
      id: `LOG-${Date.now() + 1}`,
      action: 'PAYMENT_RECORDED',
      description: `Initial payment of ₹${amountPaid.toLocaleString('en-IN')} via ${payments[0].method.toUpperCase()} recorded`,
      timestamp: now.toISOString()
    });
  }

  const newInvoice: Invoice = {
    id,
    invoiceNumber,
    type: data.type || 'service',
    status: data.status || 'finalized',
    paymentStatus,
    invoiceDate,
    dueDate,
    serviceDate,
    bookingId: data.bookingId,
    technicianName: data.technicianName || 'Certified Technician',
    secureToken,

    customerId: customer.id,
    customerName: customer.name,
    mobile: customer.mobile,
    whatsapp: customer.whatsapp,
    email: customer.email,
    houseNumber: data.houseNumber || customer.houseNumber,
    streetAddress: data.streetAddress || customer.streetAddress || '',
    locality: data.locality || customer.locality,
    city: customer.city || 'Kolkata',
    state: customer.state || 'West Bengal',
    pincode: customer.pincode || '700091',
    customerGstin: customer.gstin,

    applianceCategory: data.applianceCategory,
    brand: data.brand,
    modelNumber: data.modelNumber,
    serialNumber: data.serialNumber,
    problemDescription: data.problemDescription,
    workPerformed: data.workPerformed,
    warrantyDuration: data.warrantyDuration || '90 Days',
    warrantyStartDate: data.warrantyStartDate || serviceDate,
    warrantyEndDate:
      data.warrantyEndDate ||
      new Date(new Date(serviceDate).getTime() + 90 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
    warrantyTerms: data.warrantyTerms || settings.warrantyTerms,

    items: calc.processedItems,
    isGst,
    serviceSubtotal: calc.serviceSubtotal,
    partsSubtotal: calc.partsSubtotal,
    additionalCharges: calc.additionalCharges,
    subtotal: calc.subtotal,
    discountTotal: calc.discountTotal,
    taxableAmount: calc.taxableAmount,
    cgst: calc.cgst,
    sgst: calc.sgst,
    igst: calc.igst,
    taxTotal: calc.taxTotal,
    roundOff: calc.roundOff,
    grandTotal: calc.grandTotal,
    amountPaid,
    balanceDue,

    payments,
    notes: data.notes,
    termsAndConditions: data.termsAndConditions || settings.termsAndConditions,
    activityLog,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    finalizedAt: data.status === 'finalized' ? now.toISOString() : undefined
  };

  runtimeState.invoices.unshift(newInvoice);
  writeJsonFile(INVOICES_FILE, runtimeState.invoices);
  syncCustomerMetrics(customer.id);

  const mongo = await getMongoDb();
  if (mongo) {
    try {
      await mongo.collection('invoices').insertOne({ ...newInvoice });
    } catch (e) {
      console.warn('MongoDB insert invoice error:', e);
    }
  }

  return newInvoice;
}

// Update Draft or Finalize Invoice
export async function updateInvoice(
  id: string,
  updates: Partial<Invoice>
): Promise<Invoice | null> {
  const invoice = runtimeState.invoices.find((inv) => inv.id === id);
  if (!invoice) return null;

  const now = new Date().toISOString();

  // If items changed, recalculate
  if (updates.items) {
    const isGst = updates.isGst ?? invoice.isGst;
    const calc = calculateInvoiceTotals(updates.items, isGst, invoice.state);

    invoice.items = calc.processedItems;
    invoice.serviceSubtotal = calc.serviceSubtotal;
    invoice.partsSubtotal = calc.partsSubtotal;
    invoice.additionalCharges = calc.additionalCharges;
    invoice.subtotal = calc.subtotal;
    invoice.discountTotal = calc.discountTotal;
    invoice.taxableAmount = calc.taxableAmount;
    invoice.cgst = calc.cgst;
    invoice.sgst = calc.sgst;
    invoice.igst = calc.igst;
    invoice.taxTotal = calc.taxTotal;
    invoice.roundOff = calc.roundOff;
    invoice.grandTotal = calc.grandTotal;
    invoice.balanceDue = Math.max(0, invoice.grandTotal - invoice.amountPaid);

    if (invoice.amountPaid >= invoice.grandTotal && invoice.grandTotal > 0) {
      invoice.paymentStatus = 'paid';
    } else if (invoice.amountPaid > 0) {
      invoice.paymentStatus = 'partially_paid';
    } else {
      invoice.paymentStatus = 'unpaid';
    }
  }

  // Merge general fields
  Object.assign(invoice, {
    ...updates,
    items: invoice.items, // preserve recalculated
    grandTotal: invoice.grandTotal,
    updatedAt: now
  });

  invoice.activityLog.push({
    id: `LOG-${Date.now()}`,
    action: 'UPDATED',
    description: `Invoice updated with changes`,
    timestamp: now
  });

  writeJsonFile(INVOICES_FILE, runtimeState.invoices);
  if (invoice.customerId) syncCustomerMetrics(invoice.customerId);

  const mongo = await getMongoDb();
  if (mongo) {
    try {
      await mongo
        .collection('invoices')
        .updateOne({ id }, { $set: { ...invoice } }, { upsert: true });
    } catch (e) {}
  }

  return invoice;
}

// Record Payment
export async function recordInvoicePayment(
  invoiceId: string,
  payment: {
    amount: number;
    method: PaymentMethod;
    paymentDate?: string;
    transactionRef?: string;
    notes?: string;
  }
): Promise<{ success: boolean; invoice?: Invoice; error?: string }> {
  const invoice = runtimeState.invoices.find((inv) => inv.id === invoiceId);
  if (!invoice) return { success: false, error: 'Invoice not found' };

  if (invoice.status === 'cancelled') {
    return { success: false, error: 'Cannot record payment on a cancelled invoice' };
  }

  const amount = Math.round(Number(payment.amount) * 100) / 100;
  if (amount <= 0) {
    return { success: false, error: 'Payment amount must be greater than 0' };
  }

  const now = new Date();
  const paymentDate = payment.paymentDate || now.toISOString().split('T')[0];

  const paymentRecord: InvoicePayment = {
    id: `PAY-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`,
    amount,
    paymentDate,
    method: payment.method,
    transactionRef: payment.transactionRef || '',
    notes: payment.notes || '',
    recordedAt: now.toISOString()
  };

  invoice.payments.push(paymentRecord);
  invoice.amountPaid = Math.round((invoice.amountPaid + amount) * 100) / 100;
  invoice.balanceDue = Math.max(0, Math.round((invoice.grandTotal - invoice.amountPaid) * 100) / 100);

  if (invoice.amountPaid >= invoice.grandTotal && invoice.grandTotal > 0) {
    invoice.paymentStatus = 'paid';
  } else if (invoice.amountPaid > 0) {
    invoice.paymentStatus = 'partially_paid';
  }

  invoice.updatedAt = now.toISOString();

  invoice.activityLog.push({
    id: `LOG-${Date.now()}`,
    action: 'PAYMENT_RECORDED',
    description: `Payment of ₹${amount.toLocaleString('en-IN')} received via ${payment.method.toUpperCase()} (Ref: ${payment.transactionRef || 'N/A'})`,
    timestamp: now.toISOString()
  });

  writeJsonFile(INVOICES_FILE, runtimeState.invoices);
  if (invoice.customerId) syncCustomerMetrics(invoice.customerId);

  const mongo = await getMongoDb();
  if (mongo) {
    try {
      await mongo
        .collection('invoices')
        .updateOne({ id: invoiceId }, { $set: { ...invoice } });
    } catch (e) {}
  }

  return { success: true, invoice };
}

// Cancel Invoice / Credit Note
export async function cancelInvoice(
  invoiceId: string,
  reason: string
): Promise<{ success: boolean; invoice?: Invoice; error?: string }> {
  const invoice = runtimeState.invoices.find((inv) => inv.id === invoiceId);
  if (!invoice) return { success: false, error: 'Invoice not found' };

  const now = new Date().toISOString();
  invoice.status = 'cancelled';
  invoice.paymentStatus = 'cancelled';
  invoice.cancelledAt = now;
  invoice.creditNoteReason = reason;
  invoice.updatedAt = now;

  invoice.activityLog.push({
    id: `LOG-${Date.now()}`,
    action: 'CANCELLED',
    description: `Invoice cancelled. Reason: ${reason}`,
    timestamp: now
  });

  writeJsonFile(INVOICES_FILE, runtimeState.invoices);
  if (invoice.customerId) syncCustomerMetrics(invoice.customerId);

  const mongo = await getMongoDb();
  if (mongo) {
    try {
      await mongo
        .collection('invoices')
        .updateOne({ id: invoiceId }, { $set: { ...invoice } });
    } catch (e) {}
  }

  return { success: true, invoice };
}

// Duplicate Invoice into New Draft
export async function duplicateInvoice(invoiceId: string): Promise<Invoice | null> {
  const source = runtimeState.invoices.find((inv) => inv.id === invoiceId);
  if (!source) return null;

  return await createInvoice({
    type: source.type,
    customerName: source.customerName,
    mobile: source.mobile,
    whatsapp: source.whatsapp,
    email: source.email,
    houseNumber: source.houseNumber,
    streetAddress: source.streetAddress,
    locality: source.locality,
    city: source.city,
    state: source.state,
    pincode: source.pincode,
    customerGstin: source.customerGstin,
    applianceCategory: source.applianceCategory,
    brand: source.brand,
    modelNumber: source.modelNumber,
    serialNumber: source.serialNumber,
    problemDescription: source.problemDescription,
    workPerformed: source.workPerformed,
    items: source.items.map((i) => ({ ...i, id: `ITEM-${Date.now()}-${Math.random()}` })),
    isGst: source.isGst,
    status: 'draft',
    notes: `Duplicated from ${source.invoiceNumber}`
  });
}

// ==========================================
// 8. DASHBOARD STATS & ANALYTICS
// ==========================================
export async function getInvoiceDashboardStats(): Promise<InvoiceDashboardStats> {
  const today = new Date().toISOString().split('T')[0];
  const currentMonth = today.slice(0, 7); // YYYY-MM

  const validInvoices = runtimeState.invoices.filter((i) => i.status !== 'cancelled');

  let totalInvoiceAmount = 0;
  let totalPaymentsReceived = 0;
  let outstandingPayments = 0;
  let todayInvoices = 0;
  let thisMonthInvoices = 0;
  let paidCount = 0;
  let partiallyPaidCount = 0;
  let unpaidCount = 0;
  let cancelledCount = 0;

  const monthlyMap: Record<string, { amount: number; received: number }> = {};
  const serviceMap: Record<string, { amount: number; count: number }> = {};

  runtimeState.invoices.forEach((inv) => {
    if (inv.status === 'cancelled') {
      cancelledCount++;
      return;
    }

    totalInvoiceAmount += inv.grandTotal || 0;
    totalPaymentsReceived += inv.amountPaid || 0;
    outstandingPayments += inv.balanceDue || 0;

    if (inv.invoiceDate === today) todayInvoices++;
    if (inv.invoiceDate.startsWith(currentMonth)) thisMonthInvoices++;

    if (inv.paymentStatus === 'paid') paidCount++;
    else if (inv.paymentStatus === 'partially_paid') partiallyPaidCount++;
    else unpaidCount++;

    // Monthly breakdown
    const m = inv.invoiceDate.slice(0, 7);
    if (!monthlyMap[m]) monthlyMap[m] = { amount: 0, received: 0 };
    monthlyMap[m].amount += inv.grandTotal;
    monthlyMap[m].received += inv.amountPaid;

    // Service-wise breakdown
    const cat = inv.applianceCategory || 'Other Services';
    if (!serviceMap[cat]) serviceMap[cat] = { amount: 0, count: 0 };
    serviceMap[cat].amount += inv.grandTotal;
    serviceMap[cat].count += 1;
  });

  // Last 6 months array
  const monthlyRevenue = Object.keys(monthlyMap)
    .sort()
    .slice(-6)
    .map((month) => ({
      month,
      amount: Math.round(monthlyMap[month].amount),
      received: Math.round(monthlyMap[month].received)
    }));

  const serviceWiseRevenue = Object.keys(serviceMap).map((cat) => ({
    category: cat,
    amount: Math.round(serviceMap[cat].amount),
    count: serviceMap[cat].count
  }));

  return {
    totalInvoices: validInvoices.length,
    todayInvoices,
    thisMonthInvoices,
    totalInvoiceAmount: Math.round(totalInvoiceAmount),
    totalPaymentsReceived: Math.round(totalPaymentsReceived),
    outstandingPayments: Math.round(outstandingPayments),
    paidCount,
    partiallyPaidCount,
    unpaidCount,
    cancelledCount,
    monthlyRevenue,
    serviceWiseRevenue
  };
}
