'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { Invoice, InvoiceSettings, PaymentMethod } from '@/lib/invoice-types';
import InvoicePrintDocument from '@/components/invoice/InvoicePrintDocument';
import {
  ArrowLeft,
  Printer,
  Share2,
  Copy,
  CreditCard,
  Ban,
  Download,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  ShieldCheck,
  RefreshCw,
  Edit3
} from 'lucide-react';

export default function InvoiceDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [settings, setSettings] = useState<Partial<InvoiceSettings>>({});
  const [loading, setLoading] = useState(true);

  // Payment Recording Modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [payAmount, setPayAmount] = useState('');
  const [payMethod, setPayMethod] = useState<PaymentMethod>('upi');
  const [payRef, setPayRef] = useState('');
  const [payNotes, setPayNotes] = useState('');
  const [recordingPayment, setRecordingPayment] = useState(false);

  // Cancel Modal
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  const fetchInvoice = async () => {
    setLoading(true);
    try {
      const [invRes, settRes] = await Promise.all([
        fetch(`/api/admin/invoices/${id}`).then((r) => r.json()),
        fetch('/api/admin/invoices/settings').then((r) => r.json())
      ]);

      if (invRes.success) {
        setInvoice(invRes.invoice);
        setPayAmount(invRes.invoice.balanceDue > 0 ? String(invRes.invoice.balanceDue) : '');
      }
      if (settRes.success) setSettings(settRes.settings);
    } catch (err) {
      console.error('Failed to load invoice details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payAmount || Number(payAmount) <= 0) {
      alert('Please enter a valid payment amount.');
      return;
    }

    setRecordingPayment(true);
    try {
      const res = await fetch(`/api/admin/invoices/${id}/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(payAmount),
          method: payMethod,
          transactionRef: payRef,
          notes: payNotes
        })
      });

      const data = await res.json();
      if (data.success && data.invoice) {
        setInvoice(data.invoice);
        setShowPaymentModal(false);
        setPayRef('');
        setPayNotes('');
      } else {
        alert(data.error || 'Failed to record payment.');
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('Error recording payment.');
    } finally {
      setRecordingPayment(false);
    }
  };

  const handleCancelInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cancelReason.trim()) {
      alert('Please specify a cancellation or credit note reason.');
      return;
    }

    try {
      const res = await fetch(`/api/admin/invoices/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'cancel',
          reason: cancelReason.trim()
        })
      });

      const data = await res.json();
      if (data.success && data.invoice) {
        setInvoice(data.invoice);
        setShowCancelModal(false);
      } else {
        alert(data.error || 'Failed to cancel invoice.');
      }
    } catch (err) {
      console.error('Cancel error:', err);
    }
  };

  const handleDuplicate = async () => {
    if (!window.confirm('Do you want to duplicate this invoice into a new draft?')) return;
    try {
      const res = await fetch(`/api/admin/invoices/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'duplicate' })
      });
      const data = await res.json();
      if (data.success && data.invoice) {
        router.push(`/admin/invoices/${data.invoice.id}`);
      }
    } catch (err) {
      console.error('Duplicate error:', err);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-page-content p-10 text-center text-sm text-gray-500">
          Loading invoice details...
        </div>
      </AdminLayout>
    );
  }

  if (!invoice) {
    return (
      <AdminLayout>
        <div className="admin-page-content p-10 text-center">
          <h2 className="text-xl font-bold text-gray-800">Invoice Not Found</h2>
          <Link href="/admin/invoices" className="text-emerald-800 text-xs font-bold underline mt-2 block">
            &larr; Back to Invoices
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const isPaid = invoice.paymentStatus === 'paid';
  const isCancelled = invoice.status === 'cancelled';
  const publicInvoiceUrl = `${settings.website || 'https://applianceseva.com'}/invoice/${invoice.secureToken}`;
  const whatsappMsg = `Hello ${invoice.customerName},\nThank you for choosing Appliance Seva.\nYour invoice ${invoice.invoiceNumber} for ${invoice.brand} ${invoice.applianceCategory} is ready.\nTotal Amount: ₹${invoice.grandTotal.toLocaleString('en-IN')}\nPayment Status: ${invoice.paymentStatus.toUpperCase()}\n\nView & Download Invoice:\n${publicInvoiceUrl}\n\nThank you,\nAppliance Seva\napplianceseva.com`;

  return (
    <AdminLayout>
      <div className="admin-page-content" style={{ padding: '24px 32px' }}>
        {/* Top Action Header (Hidden in Print) */}
        <div className="no-print flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/invoices/all"
              className="p-2 text-gray-500 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-gray-900">{invoice.invoiceNumber}</h1>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
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
              <p className="text-xs text-gray-500">
                Created on {invoice.invoiceDate} for {invoice.customerName} (+91 {invoice.mobile})
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Record Payment Button */}
            {!isPaid && !isCancelled && (
              <button
                onClick={() => setShowPaymentModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-extrabold text-white bg-green-700 hover:bg-green-800 rounded-lg shadow-xs"
              >
                <CreditCard size={14} />
                <span>Record Payment</span>
              </button>
            )}

            {/* Print / Save as PDF */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-xs"
            >
              <Printer size={14} />
              <span>Print A4 PDF</span>
            </button>

            {/* WhatsApp Share */}
            <a
              href={`https://wa.me/91${invoice.mobile}?text=${encodeURIComponent(whatsappMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] rounded-lg shadow-xs"
            >
              <Share2 size={14} />
              <span>Share on WhatsApp</span>
            </a>

            {/* Duplicate */}
            <button
              onClick={handleDuplicate}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-xs"
              title="Duplicate Invoice"
            >
              <Copy size={14} />
              <span>Duplicate</span>
            </button>

            {/* Cancel / Credit Note */}
            {!isCancelled && (
              <button
                onClick={() => setShowCancelModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg"
                title="Cancel Invoice"
              >
                <Ban size={14} />
                <span>Cancel</span>
              </button>
            )}
          </div>
        </div>

        {/* Audit Log Banner */}
        <div className="no-print bg-emerald-50/70 border border-emerald-100 p-3 rounded-lg mb-6 flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-700" />
            <span>
              Customer Public Link:{' '}
              <a
                href={publicInvoiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-bold text-emerald-800"
              >
                {publicInvoiceUrl}
              </a>
            </span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(publicInvoiceUrl);
              alert('Public Invoice URL copied to clipboard!');
            }}
            className="text-[11px] font-bold text-emerald-800 hover:underline"
          >
            Copy Link
          </button>
        </div>

        {/* PRINTABLE A4 INVOICE SHEET */}
        <InvoicePrintDocument invoice={invoice} settings={settings} />

        {/* Audit History Timeline (Hidden in Print) */}
        {invoice.activityLog && invoice.activityLog.length > 0 && (
          <div className="no-print max-w-[820px] mx-auto mt-8 bg-white p-5 rounded-xl border border-gray-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              Audit Trail &amp; Activity Log
            </h4>
            <div className="space-y-2 text-xs text-gray-600">
              {invoice.activityLog.map((log) => (
                <div key={log.id} className="flex items-start gap-2 py-1 border-b border-gray-100 last:border-0">
                  <Clock size={13} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="font-semibold text-gray-800">{log.action}: </span>
                    <span>{log.description}</span>
                  </div>
                  <div className="text-[10px] text-gray-400">{new Date(log.timestamp).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RECORD PAYMENT MODAL */}
        {showPaymentModal && (
          <div className="no-print fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-black text-gray-900">Record Customer Payment</h3>
                <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>

              <form onSubmit={handleRecordPayment} className="space-y-4 text-xs">
                <div>
                  <div className="text-gray-500 mb-1">Total Outstanding Balance:</div>
                  <div className="text-xl font-black text-amber-700">
                    ₹{invoice.balanceDue.toLocaleString('en-IN')}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Amount Received (₹) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    max={invoice.balanceDue}
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg font-bold text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Payment Method *</label>
                  <select
                    value={payMethod}
                    onChange={(e) => setPayMethod(e.target.value as PaymentMethod)}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg bg-white"
                  >
                    <option value="upi">UPI (GPay, PhonePe, Paytm)</option>
                    <option value="cash">Cash on Hand</option>
                    <option value="bank_transfer">Bank Transfer / IMPS</option>
                    <option value="card">Card Payment</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Transaction Ref / UTR #</label>
                  <input
                    type="text"
                    placeholder="e.g. UPI/6291674186/AXS129849"
                    value={payRef}
                    onChange={(e) => setPayRef(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Payment Notes</label>
                  <input
                    type="text"
                    placeholder="e.g. Collected by technician at doorstep"
                    value={payNotes}
                    onChange={(e) => setPayNotes(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(false)}
                    className="px-4 py-2 font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={recordingPayment}
                    className="px-5 py-2 font-black text-white bg-green-700 rounded-lg hover:bg-green-800"
                  >
                    {recordingPayment ? 'Recording...' : 'Confirm Payment'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* CANCEL MODAL */}
        {showCancelModal && (
          <div className="no-print fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
              <h3 className="text-base font-black text-red-700 mb-2">Cancel Invoice &amp; Credit Note</h3>
              <p className="text-xs text-gray-500 mb-4">
                This will mark invoice {invoice.invoiceNumber} as cancelled and record the reason in the audit log.
              </p>

              <form onSubmit={handleCancelInvoice} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Cancellation Reason *</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Customer cancelled service / Duplicate entry / Diagnostic only"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCancelModal(false)}
                    className="px-4 py-2 font-semibold text-gray-600 bg-gray-100 rounded-lg"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-black text-white bg-red-700 rounded-lg hover:bg-red-800"
                  >
                    Confirm Cancellation
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

