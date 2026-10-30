export type InvoiceType =
  | 'service'
  | 'repair'
  | 'parts'
  | 'installation'
  | 'maintenance'
  | 'amc'
  | 'estimate';

export type InvoiceStatus = 'draft' | 'finalized' | 'cancelled';

export type PaymentStatus =
  | 'unpaid'
  | 'partially_paid'
  | 'paid'
  | 'overdue'
  | 'refunded'
  | 'cancelled';

export type PaymentMethod =
  | 'cash'
  | 'upi'
  | 'bank_transfer'
  | 'card'
  | 'other';

export type LineItemType =
  | 'service'
  | 'spare_part'
  | 'labour'
  | 'visiting'
  | 'transport'
  | 'installation'
  | 'misc';

export interface InvoiceItem {
  id: string;
  itemType: LineItemType;
  description: string;
  hsnSac?: string;
  quantity: number;
  unitPrice: number;
  discount: number; // in INR
  taxRate: number; // 0, 5, 12, 18, 28
  taxAmount: number;
  totalAmount: number;
}

export interface InvoicePayment {
  id: string;
  amount: number;
  paymentDate: string; // YYYY-MM-DD
  method: PaymentMethod;
  transactionRef?: string;
  notes?: string;
  recordedAt: string; // ISO
}

export interface InvoiceActivityLog {
  id: string;
  action: string;
  description: string;
  timestamp: string; // ISO
  user?: string;
}

export interface Customer {
  id: string;
  name: string;
  mobile: string;
  whatsapp?: string;
  email?: string;
  houseNumber?: string;
  streetAddress?: string;
  locality?: string;
  city?: string;
  state?: string;
  pincode?: string;
  gstin?: string;
  totalInvoices?: number;
  totalBilled?: number;
  totalPaid?: number;
  outstandingBalance?: number;
  lastServiceDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // e.g. AS-INV-2026-000001
  type: InvoiceType;
  status: InvoiceStatus;
  paymentStatus: PaymentStatus;
  invoiceDate: string; // YYYY-MM-DD
  dueDate: string; // YYYY-MM-DD
  serviceDate: string; // YYYY-MM-DD
  bookingId?: string; // Reference to existing booking lead
  technicianName?: string;
  secureToken: string; // unguessable token for public customer view

  // Customer Snapshot
  customerId?: string;
  customerName: string;
  mobile: string;
  whatsapp?: string;
  email?: string;
  houseNumber?: string;
  streetAddress: string;
  locality?: string;
  city: string;
  state: string;
  pincode: string;
  customerGstin?: string;

  // Appliance Details
  applianceCategory: string; // AC, Refrigerator, Washing Machine, TV, Microwave, etc.
  brand: string;
  modelNumber?: string;
  serialNumber?: string;
  problemDescription?: string;
  workPerformed?: string;
  warrantyDuration?: string; // e.g. "90 Days"
  warrantyStartDate?: string;
  warrantyEndDate?: string;
  warrantyTerms?: string;

  // Dynamic Line Items
  items: InvoiceItem[];

  // Calculation Breakdown
  isGst: boolean; // non-GST vs GST Tax Invoice
  serviceSubtotal: number;
  partsSubtotal: number;
  additionalCharges: number;
  subtotal: number;
  discountTotal: number;
  taxableAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  taxTotal: number;
  roundOff: number;
  grandTotal: number;
  amountPaid: number;
  balanceDue: number;

  // Payments & Audit
  payments: InvoicePayment[];
  notes?: string;
  termsAndConditions?: string;
  creditNoteReason?: string;
  activityLog: InvoiceActivityLog[];

  createdAt: string;
  updatedAt: string;
  finalizedAt?: string;
  cancelledAt?: string;
}

export interface ServiceCatalogItem {
  id: string;
  category: string; // Air Conditioner, Refrigerator, Washing Machine, etc.
  name: string;
  hsnSac: string; // SAC 998717
  defaultPrice: number;
  defaultTaxRate: number; // 0 or 18%
  description?: string;
  isActive: boolean;
}

export interface SparePartItem {
  id: string;
  partNumber?: string;
  name: string;
  category: string;
  brand?: string;
  hsnCode: string;
  unitPrice: number;
  costPrice?: number;
  taxRate: number; // default 18%
  stockQuantity: number;
  warrantyPeriod?: string;
  isActive: boolean;
}

export interface InvoiceSettings {
  businessName: string;
  businessNameBn: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  address: string;
  gstin?: string;
  state: string;
  stateCode: string; // "19" for West Bengal
  currency: string;
  invoicePrefix: string;
  invoiceNumberNext: number;
  defaultDueDays: number;
  defaultGstEnabled: boolean;
  defaultGstRate: number;
  upiId: string;
  bankName?: string;
  bankAccountNumber?: string;
  bankIfsc?: string;
  bankAccountName?: string;
  footerMessage: string;
  termsAndConditions: string;
  warrantyTerms: string;
}

export interface InvoiceDashboardStats {
  totalInvoices: number;
  todayInvoices: number;
  thisMonthInvoices: number;
  totalInvoiceAmount: number;
  totalPaymentsReceived: number;
  outstandingPayments: number;
  paidCount: number;
  partiallyPaidCount: number;
  unpaidCount: number;
  cancelledCount: number;
  monthlyRevenue: { month: string; amount: number; received: number }[];
  serviceWiseRevenue: { category: string; amount: number; count: number }[];
}

