'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Invoice, InvoiceSettings } from '@/lib/invoice-types';
import InvoicePrintDocument from '@/components/invoice/InvoicePrintDocument';
import {
  Printer,
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  QrCode,
  IndianRupee,
  Lock
} from 'lucide-react';

export default function CustomerPublicInvoicePage({
  params
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [settings, setSettings] = useState<Partial<InvoiceSettings>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPublicInvoice() {
      try {
        const res = await fetch(`/api/invoices/view/${token}`);
        const data = await res.json();
        if (data.success && data.invoice) {
          setInvoice(data.invoice);
          setSettings(data.settings || {});
        } else {
          setError(data.error || 'Invoice not found or link has expired.');
        }
      } catch (err) {
        console.error('Failed to load public invoice:', err);
        setError('Unable to load invoice. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    loadPublicInvoice();
  }, [token]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F7F6] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-emerald-800 border-t-transparent rounded-full animate-spin mb-4" />
        <div className="text-sm font-semibold text-gray-700">Loading your verified invoice...</div>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="min-h-screen bg-[#F4F7F6] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 max-w-md w-full text-center">
          <div className="w-12 h-12 bg-red-100 text-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={24} />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Invoice Not Available</h2>
          <p className="text-xs text-gray-500 mb-6">{error || 'Please check the link provided in your message.'}</p>
          <a
            href="tel:+916291674186"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg"
          >
            <Phone size={14} />
            <span>Call Customer Support (+91 6291674186)</span>
          </a>
        </div>
      </div>
    );
  }

  const isPaid = invoice.paymentStatus === 'paid';
  const isCancelled = invoice.status === 'cancelled';
  const brandName = settings.businessName || 'APPLIANCE SEVA';
  const phone = settings.phone || '+91 6291674186';
  const upiId = settings.upiId || '6291674186@paytm';
  const upiPayUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(brandName)}&am=${invoice.balanceDue}&cu=INR&tn=${encodeURIComponent(`Invoice ${invoice.invoiceNumber}`)}`;

  return (
    <div className="min-h-screen bg-[#F4F7F6] py-6 px-3 sm:px-6">
      {/* Customer Action Bar (Hidden when printing) */}
      <div className="no-print max-w-[820px] mx-auto mb-6">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center p-1.5 border border-emerald-100">
              <img src="/logo-icon.svg" alt={brandName} className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-gray-900">{invoice.invoiceNumber}</span>
                <span
                  className={`px-2 py-0.2 rounded-full text-[10px] font-extrabold uppercase ${
                    isCancelled
                      ? 'bg-gray-100 text-gray-600'
                      : isPaid
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {isCancelled ? 'CANCELLED' : invoice.paymentStatus.replace('_', ' ')}
                </span>
              </div>
              <div className="text-[11px] text-gray-500">
                Official Bill for {invoice.brand} {invoice.applianceCategory}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-gray-700 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              <Printer size={14} />
              <span>Print / Download PDF</span>
            </button>

            {!isPaid && !isCancelled && invoice.balanceDue > 0 && (
              <a
                href={upiPayUrl}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs"
              >
                <IndianRupee size={14} />
                <span>Pay ₹{invoice.balanceDue.toLocaleString('en-IN')} via UPI</span>
              </a>
            )}

            <a
              href={`tel:${phone.replace(/[^\d+]/g, '')}`}
              className="p-2 text-gray-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg border border-gray-200"
              title="Call Helpline"
            >
              <Phone size={15} />
            </a>
          </div>
        </div>

        {/* Verified Security Notice */}
        <div className="mt-2 text-center text-[11px] text-gray-400 flex items-center justify-center gap-1">
          <Lock size={11} className="text-emerald-700" />
          <span>Secure, tamper-proof invoice verified by {brandName} (applianceseva.com)</span>
        </div>
      </div>

      {/* RENDER THE A4 INVOICE SHEET */}
      <div className="max-w-[820px] mx-auto">
        <InvoicePrintDocument invoice={invoice} settings={settings} />
      </div>

      {/* Customer Footer */}
      <div className="no-print max-w-[820px] mx-auto mt-8 text-center text-xs text-gray-500 pb-8">
        <div>Need assistance with this invoice? Contact Appliance Seva Support at {phone}</div>
        <div className="mt-1">
          Visit official website:{' '}
          <Link href="/" className="font-bold text-emerald-800 underline">
            applianceseva.com
          </Link>
        </div>
      </div>
    </div>
  );
}

