'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  InvoiceItem,
  ServiceCatalogItem,
  SparePartItem,
  Customer,
  InvoiceSettings,
  InvoiceType,
  PaymentMethod
} from '@/lib/invoice-types';
import {
  FilePlus,
  ArrowLeft,
  Search,
  Plus,
  Trash2,
  Wrench,
  Package,
  CheckCircle,
  Eye,
  IndianRupee,
  ShieldCheck,
  User,
  MapPin,
  Calendar,
  AlertCircle
} from 'lucide-react';
import InvoicePrintDocument from '@/components/invoice/InvoicePrintDocument';

export default function CreateInvoicePage() {
  const router = useRouter();

  // Settings & Catalogs
  const [settings, setSettings] = useState<Partial<InvoiceSettings>>({});
  const [servicesCatalog, setServicesCatalog] = useState<ServiceCatalogItem[]>([]);
  const [sparePartsCatalog, setSparePartsCatalog] = useState<SparePartItem[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Form State: 1. Invoice Meta
  const [invoiceType, setInvoiceType] = useState<InvoiceType>('service');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [serviceDate, setServiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [technicianName, setTechnicianName] = useState('Senior Certified Technician');
  const [isGst, setIsGst] = useState(false);

  // Form State: 2. Customer Information
  const [customerSearch, setCustomerSearch] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [mobile, setMobile] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('Kolkata');
  const [state, setState] = useState('West Bengal');
  const [pincode, setPincode] = useState('700091');
  const [customerGstin, setCustomerGstin] = useState('');

  // Form State: 3. Appliance & Warranty
  const [applianceCategory, setApplianceCategory] = useState('Air Conditioner (AC)');
  const [brand, setBrand] = useState('Daikin');
  const [modelNumber, setModelNumber] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [workPerformed, setWorkPerformed] = useState('');
  const [warrantyDuration, setWarrantyDuration] = useState('90 Days');
  const [warrantyTerms, setWarrantyTerms] = useState(
    '90 Days Warranty on replaced spare parts. 30 Days service guarantee on repair workmanship.'
  );

  // Form State: 4. Dynamic Line Items
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: 'item-1',
      itemType: 'service',
      description: 'AC General Service & Diagnostic Inspection',
      hsnSac: '998717',
      quantity: 1,
      unitPrice: 499,
      discount: 0,
      taxRate: 0,
      taxAmount: 0,
      totalAmount: 499
    }
  ]);

  // Form State: 5. Payment & Status
  const [initialPaymentAmount, setInitialPaymentAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [transactionRef, setTransactionRef] = useState('');
  const [notes, setNotes] = useState('');
  const [saveAsDraft, setSaveAsDraft] = useState(false);

  // Fetch initial data
  useEffect(() => {
    async function loadData() {
      try {
        const [settRes, srvRes, partRes, custRes] = await Promise.all([
          fetch('/api/admin/invoices/settings').then((r) => r.json()),
          fetch('/api/admin/invoices/services').then((r) => r.json()),
          fetch('/api/admin/invoices/spare-parts').then((r) => r.json()),
          fetch('/api/admin/invoices/customers').then((r) => r.json())
        ]);

        if (settRes.success) {
          setSettings(settRes.settings);
          setIsGst(settRes.settings.defaultGstEnabled || false);
          // Auto set due date
          const days = settRes.settings.defaultDueDays || 7;
          const due = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
          setDueDate(due);
        }
        if (srvRes.success) setServicesCatalog(srvRes.services || []);
        if (partRes.success) setSparePartsCatalog(partRes.parts || []);
        if (custRes.success) setCustomers(custRes.customers || []);
      } catch (err) {
        console.error('Failed to load invoice initial setup data:', err);
      }
    }
    loadData();
  }, []);

  // Customer auto-fill selection
  const handleSelectCustomer = (cust: Customer) => {
    setCustomerName(cust.name);
    setMobile(cust.mobile);
    setWhatsapp(cust.whatsapp || cust.mobile);
    setEmail(cust.email || '');
    setHouseNumber(cust.houseNumber || '');
    setStreetAddress(cust.streetAddress || '');
    setLocality(cust.locality || '');
    setCity(cust.city || 'Kolkata');
    setState(cust.state || 'West Bengal');
    setPincode(cust.pincode || '700091');
    setCustomerGstin(cust.gstin || '');
    setCustomerSearch('');
  };

  // Line item manipulation
  const addItem = (
    type: InvoiceItem['itemType'] = 'service',
    desc: string = '',
    price: number = 0,
    hsn: string = '998717'
  ) => {
    setItems((prev) => [
      ...prev,
      {
        id: `item-${Date.now()}-${Math.random()}`,
        itemType: type,
        description: desc || (type === 'spare_part' ? 'Spare Part' : 'Service Charge'),
        hsnSac: hsn,
        quantity: 1,
        unitPrice: price,
        discount: 0,
        taxRate: isGst ? (settings.defaultGstRate || 18) : 0,
        taxAmount: 0,
        totalAmount: price
      }
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) {
      alert('At least one line item is required.');
      return;
    }
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, val: any) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const updated = { ...item, [field]: val };
        const qty = Math.max(1, Number(updated.quantity) || 1);
        const price = Math.max(0, Number(updated.unitPrice) || 0);
        const disc = Math.max(0, Number(updated.discount) || 0);
        const rate = isGst ? Number(updated.taxRate) || 0 : 0;

        const lineNet = Math.max(0, qty * price - disc);
        const taxAmt = rate > 0 ? (lineNet * rate) / 100 : 0;
        updated.taxAmount = Math.round(taxAmt * 100) / 100;
        updated.totalAmount = Math.round((lineNet + taxAmt) * 100) / 100;
        return updated;
      })
    );
  };

  // Quick Catalog Insertion
  const handleAddFromServiceCatalog = (srv: ServiceCatalogItem) => {
    addItem('service', srv.name, srv.defaultPrice, srv.hsnSac);
  };

  const handleAddFromSpareParts = (part: SparePartItem) => {
    addItem('spare_part', `${part.name} (${part.brand || 'OEM'})`, part.unitPrice, part.hsnCode);
  };

  // Live Calculations
  let serviceSub = 0;
  let partsSub = 0;
  let otherSub = 0;
  let totalDisc = 0;
  let totalTax = 0;

  items.forEach((item) => {
    const lineNet = item.quantity * item.unitPrice;
    if (item.itemType === 'service') serviceSub += lineNet;
    else if (item.itemType === 'spare_part') partsSub += lineNet;
    else otherSub += lineNet;

    totalDisc += Number(item.discount) || 0;
    if (isGst) {
      const discountedNet = Math.max(0, lineNet - (Number(item.discount) || 0));
      totalTax += (discountedNet * (Number(item.taxRate) || 0)) / 100;
    }
  });

  const rawTotal = serviceSub + partsSub + otherSub - totalDisc + totalTax;
  const grandTotal = Math.round(rawTotal);
  const roundOff = Math.round((grandTotal - rawTotal) * 100) / 100;
  const balanceDue = Math.max(0, grandTotal - (Number(initialPaymentAmount) || 0));

  // Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !mobile.trim()) {
      alert('Please provide Customer Name and Mobile Number.');
      return;
    }

    if (items.length === 0) {
      alert('Please add at least one service or spare part item.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        type: invoiceType,
        status: saveAsDraft ? 'draft' : 'finalized',
        invoiceDate,
        dueDate,
        serviceDate,
        bookingId: bookingId.trim() || undefined,
        technicianName: technicianName.trim() || undefined,
        customerName: customerName.trim(),
        mobile: mobile.trim(),
        whatsapp: whatsapp.trim() || mobile.trim(),
        email: email.trim() || undefined,
        houseNumber: houseNumber.trim() || undefined,
        streetAddress: streetAddress.trim() || undefined,
        locality: locality.trim() || undefined,
        city: city.trim() || 'Kolkata',
        state: state.trim() || 'West Bengal',
        pincode: pincode.trim() || '700091',
        customerGstin: customerGstin.trim() || undefined,
        applianceCategory,
        brand,
        modelNumber: modelNumber.trim() || undefined,
        serialNumber: serialNumber.trim() || undefined,
        problemDescription: problemDescription.trim() || undefined,
        workPerformed: workPerformed.trim() || undefined,
        warrantyDuration,
        warrantyTerms,
        isGst,
        items,
        initialPayment:
          initialPaymentAmount > 0
            ? {
                amount: Number(initialPaymentAmount),
                method: paymentMethod,
                transactionRef: transactionRef.trim() || undefined
              }
            : undefined,
        notes: notes.trim() || undefined
      };

      const res = await fetch('/api/admin/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success && data.invoice) {
        router.push(`/admin/invoices/${data.invoice.id}`);
      } else {
        alert(data.error || 'Failed to generate invoice.');
      }
    } catch (err) {
      console.error('Invoice creation error:', err);
      alert('An unexpected error occurred while creating invoice.');
    } finally {
      setLoading(false);
    }
  };

  // Mock Invoice object for live preview
  const previewInvoiceData: any = {
    invoiceNumber: `${settings.invoicePrefix || 'AS-INV'}-${new Date().getFullYear()}-PREVIEW`,
    type: invoiceType,
    status: saveAsDraft ? 'draft' : 'finalized',
    paymentStatus: initialPaymentAmount >= grandTotal ? 'paid' : initialPaymentAmount > 0 ? 'partially_paid' : 'unpaid',
    invoiceDate,
    dueDate,
    serviceDate,
    bookingId,
    technicianName,
    secureToken: 'preview',
    customerName: customerName || 'Valued Customer',
    mobile: mobile || 'XXXXXXXXXX',
    whatsapp: whatsapp || mobile,
    email,
    houseNumber,
    streetAddress: streetAddress || 'Customer Address',
    locality,
    city,
    state,
    pincode,
    customerGstin,
    applianceCategory,
    brand,
    modelNumber,
    serialNumber,
    problemDescription,
    workPerformed,
    warrantyDuration,
    warrantyTerms,
    items,
    isGst,
    serviceSubtotal: serviceSub,
    partsSubtotal: partsSub,
    additionalCharges: otherSub,
    subtotal: serviceSub + partsSub + otherSub,
    discountTotal: totalDisc,
    taxableAmount: serviceSub + partsSub + otherSub - totalDisc,
    cgst: isGst ? totalTax / 2 : 0,
    sgst: isGst ? totalTax / 2 : 0,
    igst: 0,
    taxTotal: totalTax,
    roundOff,
    grandTotal,
    amountPaid: initialPaymentAmount,
    balanceDue,
    payments:
      initialPaymentAmount > 0
        ? [
            {
              id: 'prev-pay',
              amount: initialPaymentAmount,
              paymentDate: invoiceDate,
              method: paymentMethod,
              transactionRef,
              recordedAt: new Date().toISOString()
            }
          ]
        : [],
    termsAndConditions: settings.termsAndConditions
  };

  return (
    <AdminLayout>
      <div className="admin-page-content" style={{ padding: '24px 32px' }}>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/invoices"
              className="p-2 text-gray-500 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-2xl font-black text-gray-900">Create New Invoice</h1>
              <p className="text-xs text-gray-500">
                Generate professional service bill, repair receipt or estimate
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowPreviewModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              <Eye size={15} />
              <span>Live A4 Preview</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECTION 1: INVOICE META & TYPE */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-emerald-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <Calendar size={16} />
              <span>1. Invoice Information &amp; Schedule</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Invoice Type *
                </label>
                <select
                  value={invoiceType}
                  onChange={(e) => setInvoiceType(e.target.value as InvoiceType)}
                  className="w-full text-xs p-2.5 border border-gray-300 rounded-lg bg-white font-medium"
                >
                  <option value="service">Service Invoice</option>
                  <option value="repair">Repair Invoice</option>
                  <option value="parts">Spare Parts Invoice</option>
                  <option value="installation">Installation Invoice</option>
                  <option value="maintenance">Maintenance Invoice</option>
                  <option value="amc">AMC Invoice</option>
                  <option value="estimate">Estimate / Quotation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Invoice Date *
                </label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Service Completed Date *
                </label>
                <input
                  type="date"
                  value={serviceDate}
                  onChange={(e) => setServiceDate(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Payment Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Assigned Technician
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rajesh Karmakar"
                  value={technicianName}
                  onChange={(e) => setTechnicianName(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Job / Booking Ref # (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. AS-84920147"
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="sm:col-span-2 flex items-center gap-3 pt-6">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-800">
                  <input
                    type="checkbox"
                    checked={isGst}
                    onChange={(e) => setIsGst(e.target.checked)}
                    className="w-4 h-4 text-emerald-700 rounded border-gray-300"
                  />
                  <span>Generate GST Tax Invoice (with CGST/SGST/IGST breakdown)</span>
                </label>
              </div>
            </div>
          </div>

          {/* SECTION 2: CUSTOMER INFORMATION */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-2 border-b border-gray-100">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                <User size={16} />
                <span>2. Customer Information (Bill To)</span>
              </h3>

              {/* Instant Customer Auto-fill dropdown */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search existing customer..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  className="text-xs pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg w-64 focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                />
                <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />

                {customerSearch.trim() && (
                  <div className="absolute right-0 top-9 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto divide-y divide-gray-100 text-xs">
                    {customers
                      .filter(
                        (c) =>
                          c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
                          c.mobile.includes(customerSearch)
                      )
                      .slice(0, 5)
                      .map((cust) => (
                        <button
                          key={cust.id}
                          type="button"
                          onClick={() => handleSelectCustomer(cust)}
                          className="w-full text-left p-2.5 hover:bg-emerald-50 transition-colors flex justify-between"
                        >
                          <div>
                            <div className="font-bold text-gray-900">{cust.name}</div>
                            <div className="text-gray-500">{cust.mobile}</div>
                          </div>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded self-center">
                            Select
                          </span>
                        </button>
                      ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Customer Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Anirban Mukherjee"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Mobile Number (10 Digits) *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 9830123456"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  placeholder="Leave empty to use mobile"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. customer@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Flat / House Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. Flat 3A, Tower 4"
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Street Address &amp; Complex
                </label>
                <input
                  type="text"
                  placeholder="e.g. Block C, Silver Spring Housing"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Locality / Area
                </label>
                <input
                  type="text"
                  placeholder="e.g. Salt Lake, Sector V"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  City &amp; PIN Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-1/2 text-xs p-2 border border-gray-300 rounded-lg"
                    placeholder="City"
                  />
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-1/2 text-xs p-2 border border-gray-300 rounded-lg"
                    placeholder="PIN Code"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Customer GSTIN (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 19AAACA1234A1Z5"
                  value={customerGstin}
                  onChange={(e) => setCustomerGstin(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg uppercase"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: APPLIANCE DETAILS & WARRANTY */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-emerald-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <Wrench size={16} />
              <span>3. Serviced Appliance &amp; Warranty</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Appliance Category *
                </label>
                <select
                  value={applianceCategory}
                  onChange={(e) => setApplianceCategory(e.target.value)}
                  className="w-full text-xs p-2.5 border border-gray-300 rounded-lg bg-white font-medium"
                >
                  <option value="Air Conditioner (AC)">Air Conditioner (AC)</option>
                  <option value="Refrigerator">Refrigerator</option>
                  <option value="Washing Machine">Washing Machine</option>
                  <option value="Television (TV)">Television (TV)</option>
                  <option value="Microwave Oven">Microwave Oven</option>
                  <option value="Other Appliance">Other Appliance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Brand *</label>
                <input
                  type="text"
                  placeholder="e.g. Daikin, LG, Samsung, Voltas"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Model Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. FTKF50TV"
                  value={modelNumber}
                  onChange={(e) => setModelNumber(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Serial Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. S/N 849201"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Customer Reported Problem
                </label>
                <input
                  type="text"
                  placeholder="e.g. AC fan blowing warm air; outdoor unit tripping MCB"
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Work Performed &amp; Technical Diagnosis
                </label>
                <input
                  type="text"
                  placeholder="e.g. Replaced weak capacitor, chemical jet serviced cooling coil, leak tested nitrogen"
                  value={workPerformed}
                  onChange={(e) => setWorkPerformed(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Warranty Duration
                </label>
                <select
                  value={warrantyDuration}
                  onChange={(e) => setWarrantyDuration(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg bg-white"
                >
                  <option value="30 Days">30 Days</option>
                  <option value="60 Days">60 Days</option>
                  <option value="90 Days">90 Days (Recommended)</option>
                  <option value="180 Days">180 Days</option>
                  <option value="1 Year">1 Year</option>
                  <option value="None">No Warranty</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Warranty Scope &amp; Assurance Terms
                </label>
                <input
                  type="text"
                  value={warrantyTerms}
                  onChange={(e) => setWarrantyTerms(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: DYNAMIC BILLING TABLE */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-2 border-b border-gray-100">
              <div>
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                  <IndianRupee size={16} />
                  <span>4. Dynamic Service Charges &amp; Spare Parts</span>
                </h3>
                <p className="text-xs text-gray-500">
                  Add services, labour, parts or select from catalog
                </p>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => addItem('service', 'AC Jet Foam Wash Servicing', 699, '998717')}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-50 text-emerald-800 rounded-md hover:bg-emerald-100"
                >
                  + Jet Wash (₹699)
                </button>
                <button
                  type="button"
                  onClick={() => addItem('visiting', 'Technician Visiting & Diagnostic Fee', 200, '998717')}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-blue-50 text-blue-800 rounded-md hover:bg-blue-100"
                >
                  + Visit Fee (₹200)
                </button>
                <button
                  type="button"
                  onClick={() => addItem('labour', 'Mechanical Labour & Assembly Charge', 350, '998717')}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-purple-50 text-purple-800 rounded-md hover:bg-purple-100"
                >
                  + Labour (₹350)
                </button>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg mb-4">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-3 w-32">Type</th>
                    <th className="py-2.5 px-3">Description</th>
                    <th className="py-2.5 px-3 w-24">HSN/SAC</th>
                    <th className="py-2.5 px-3 w-16 text-center">Qty</th>
                    <th className="py-2.5 px-3 w-24 text-right">Rate (₹)</th>
                    <th className="py-2.5 px-3 w-20 text-right">Disc (₹)</th>
                    {isGst && <th className="py-2.5 px-3 w-20 text-center">Tax %</th>}
                    <th className="py-2.5 px-3 w-28 text-right">Amount (₹)</th>
                    <th className="py-2.5 px-3 w-10 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-gray-50/50">
                      <td className="py-2 px-3">
                        <select
                          value={item.itemType}
                          onChange={(e) => updateItem(item.id, 'itemType', e.target.value)}
                          className="w-full text-xs p-1.5 border border-gray-200 rounded bg-white"
                        >
                          <option value="service">Service</option>
                          <option value="spare_part">Spare Part</option>
                          <option value="labour">Labour</option>
                          <option value="visiting">Visiting Fee</option>
                          <option value="transport">Transport</option>
                          <option value="installation">Installation</option>
                          <option value="misc">Misc Charge</option>
                        </select>
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          placeholder="Item name / repair scope..."
                          className="w-full text-xs p-1.5 border border-gray-200 rounded"
                          required
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={item.hsnSac || ''}
                          onChange={(e) => updateItem(item.id, 'hsnSac', e.target.value)}
                          placeholder="998717"
                          className="w-full text-xs p-1.5 border border-gray-200 rounded"
                        />
                      </td>
                      <td className="py-2 px-3 text-center">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                          className="w-14 text-xs p-1.5 border border-gray-200 rounded text-center"
                          required
                        />
                      </td>
                      <td className="py-2 px-3 text-right">
                        <input
                          type="number"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))}
                          className="w-20 text-xs p-1.5 border border-gray-200 rounded text-right"
                          required
                        />
                      </td>
                      <td className="py-2 px-3 text-right">
                        <input
                          type="number"
                          min="0"
                          value={item.discount}
                          onChange={(e) => updateItem(item.id, 'discount', Number(e.target.value))}
                          className="w-16 text-xs p-1.5 border border-gray-200 rounded text-right text-amber-700"
                        />
                      </td>
                      {isGst && (
                        <td className="py-2 px-3 text-center">
                          <select
                            value={item.taxRate}
                            onChange={(e) => updateItem(item.id, 'taxRate', Number(e.target.value))}
                            className="w-16 text-xs p-1.5 border border-gray-200 rounded bg-white text-center"
                          >
                            <option value="0">0%</option>
                            <option value="5">5%</option>
                            <option value="12">12%</option>
                            <option value="18">18%</option>
                            <option value="28">28%</option>
                          </select>
                        </td>
                      )}
                      <td className="py-2 px-3 text-right font-black text-gray-900">
                        ₹{item.totalAmount.toFixed(2)}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-600 p-1 rounded"
                          title="Delete line"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => addItem()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
              >
                <Plus size={14} />
                <span>Add Custom Line Item</span>
              </button>

              {/* Fast Select from Pre-Configured Services Catalog */}
              {servicesCatalog.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">Add from Service Catalog:</span>
                  <select
                    onChange={(e) => {
                      const found = servicesCatalog.find((s) => s.id === e.target.value);
                      if (found) handleAddFromServiceCatalog(found);
                      e.target.value = '';
                    }}
                    className="text-xs p-1.5 border border-gray-300 rounded bg-white max-w-xs"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Choose pre-configured service...
                    </option>
                    {servicesCatalog.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} (₹{s.defaultPrice})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* SECTION 5: TOTALS BREAKDOWN & INITIAL PAYMENT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment & Recording Box */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-emerald-800 mb-4 pb-2 border-b border-gray-100">
                5. Payment Recording (Optional)
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Payment Received (₹)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max={grandTotal}
                      placeholder="e.g. 1500"
                      value={initialPaymentAmount || ''}
                      onChange={(e) => setInitialPaymentAmount(Number(e.target.value))}
                      className="w-full text-xs p-2 border border-gray-300 rounded-lg font-bold text-emerald-800"
                    />
                    <div className="text-[11px] text-gray-400 mt-1">
                      Leave 0 if customer has not paid yet.
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Payment Method
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      className="w-full text-xs p-2 border border-gray-300 rounded-lg bg-white"
                    >
                      <option value="cash">Cash on Hand</option>
                      <option value="upi">UPI (GPay / Paytm / PhonePe)</option>
                      <option value="bank_transfer">Bank Transfer / NEFT</option>
                      <option value="card">Debit / Credit Card</option>
                      <option value="other">Other Payment Mode</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    UPI / Bank Transaction Reference (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. UPI/6291674186/AXS129849 or Cash receipt #"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Internal Notes / Customer Instructions
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Add special notes, customer requests, or next service recommendation..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Live Financial Totals Card */}
            <div className="bg-emerald-950 text-white p-6 rounded-xl border border-emerald-900 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-emerald-800/60 mb-3">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-300">
                    Bill Calculation Summary
                  </span>
                  <span className="text-xs text-emerald-400">Decimal-Safe INR (₹)</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-emerald-200">
                    <span>Service Subtotal:</span>
                    <span className="font-semibold text-white">₹{serviceSub.toFixed(2)}</span>
                  </div>
                  {partsSub > 0 && (
                    <div className="flex justify-between text-emerald-200">
                      <span>Spare Parts Subtotal:</span>
                      <span className="font-semibold text-white">₹{partsSub.toFixed(2)}</span>
                    </div>
                  )}
                  {otherSub > 0 && (
                    <div className="flex justify-between text-emerald-200">
                      <span>Visiting &amp; Labour Charges:</span>
                      <span className="font-semibold text-white">₹{otherSub.toFixed(2)}</span>
                    </div>
                  )}
                  {totalDisc > 0 && (
                    <div className="flex justify-between text-amber-300">
                      <span>Total Discount:</span>
                      <span className="font-bold">-₹{totalDisc.toFixed(2)}</span>
                    </div>
                  )}
                  {isGst && (
                    <>
                      <div className="flex justify-between text-emerald-200 pt-2 border-t border-emerald-900">
                        <span>Taxable Value:</span>
                        <span>₹{(serviceSub + partsSub + otherSub - totalDisc).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-emerald-300 text-[11px]">
                        <span>CGST (Intra-state):</span>
                        <span>₹{(totalTax / 2).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-emerald-300 text-[11px]">
                        <span>SGST (Intra-state):</span>
                        <span>₹{(totalTax / 2).toFixed(2)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-800/80 mt-6 space-y-2">
                <div className="flex justify-between items-center text-lg font-black text-white">
                  <span>Grand Total:</span>
                  <span className="text-2xl text-emerald-300">
                    ₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex justify-between text-xs text-emerald-200">
                  <span>Amount Paid Now:</span>
                  <span className="font-bold text-green-300">
                    ₹{Number(initialPaymentAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-extrabold pt-2 border-t border-emerald-900">
                  <span className={balanceDue > 0 ? 'text-amber-300' : 'text-emerald-400'}>
                    Balance Outstanding:
                  </span>
                  <span className={balanceDue > 0 ? 'text-amber-300' : 'text-emerald-400'}>
                    ₹{balanceDue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* FINAL ACTIONS */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <Link
              href="/admin/invoices"
              className="px-5 py-2.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              onClick={() => setSaveAsDraft(true)}
              disabled={loading}
              className="px-5 py-2.5 text-xs font-bold text-gray-800 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg transition-all"
            >
              Save as Draft
            </button>

            <button
              type="submit"
              onClick={() => setSaveAsDraft(false)}
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-black text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-md transition-all"
            >
              <CheckCircle size={17} />
              <span>{loading ? 'Generating...' : 'Finalize & Issue Invoice'}</span>
            </button>
          </div>
        </form>

        {/* LIVE A4 PREVIEW MODAL */}
        {showPreviewModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                <div className="text-sm font-black text-gray-900">Live Invoice A4 Preview</div>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="text-gray-400 hover:text-gray-700 p-1 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <InvoicePrintDocument
                invoice={previewInvoiceData}
                settings={settings}
              />

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(false)}
                  className="px-5 py-2 text-xs font-bold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

