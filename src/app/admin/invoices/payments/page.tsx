'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { Invoice, InvoicePayment } from '@/lib/invoice-types';
import {
  CreditCard,
  Search,
  Download,
  IndianRupee,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Filter,
  Receipt
} from 'lucide-react';

interface FlatPaymentRow {
  paymentId: string;
  invoiceId: string;
  invoiceNumber: string;
  customerName: string;
  mobile: string;
  appliance: string;
  amount: number;
  paymentDate: string;
  method: string;
  transactionRef?: string;
  notes?: string;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<FlatPaymentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [methodFilter, setMethodFilter] = useState('all');
  const [search, setSearch] = useState('');

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/invoices?limit=500');
      const data = await res.json();
      if (data.success && data.invoices) {
        const rows: FlatPaymentRow[] = [];
        data.invoices.forEach((inv: Invoice) => {
          if (inv.payments && inv.payments.length > 0) {
            inv.payments.forEach((p) => {
              rows.push({
                paymentId: p.id,
                invoiceId: inv.id,
                invoiceNumber: inv.invoiceNumber,
                customerName: inv.customerName,
                mobile: inv.mobile,
                appliance: `${inv.brand} ${inv.applianceCategory}`,
                amount: p.amount,
                paymentDate: p.paymentDate,
                method: p.method,
                transactionRef: p.transactionRef,
                notes: p.notes
              });
            });
          }
        });
        // Sort newest date first
        rows.sort((a, b) => b.paymentDate.localeCompare(a.paymentDate));
        setPayments(rows);
      }
    } catch (err) {
      console.error('Failed to load payments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const filteredPayments = payments.filter((p) => {
    const matchesMethod = methodFilter === 'all' || p.method === methodFilter;
    const matchesSearch =
      p.customerName.toLowerCase().includes(search.toLowerCase()) ||
      p.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      p.mobile.includes(search) ||
      (p.transactionRef && p.transactionRef.toLowerCase().includes(search.toLowerCase()));
    return matchesMethod && matchesSearch;
  });

  const totalCollected = filteredPayments.reduce((sum, p) => sum + p.amount, 0);

  const exportPaymentsCSV = () => {
    if (filteredPayments.length === 0) {
      alert('No payments to export.');
      return;
    }

    const headers = [
      'Payment ID',
      'Invoice #',
      'Payment Date',
      'Customer',
      'Phone',
      'Appliance',
      'Amount (INR)',
      'Payment Method',
      'Transaction Reference',
      'Notes'
    ];

    const rows = filteredPayments.map((p) => [
      `"${p.paymentId}"`,
      `"${p.invoiceNumber}"`,
      `"${p.paymentDate}"`,
      `"${p.customerName}"`,
      `"${p.mobile}"`,
      `"${p.appliance}"`,
      p.amount,
      `"${p.method.toUpperCase()}"`,
      `"${p.transactionRef || 'N/A'}"`,
      `"${p.notes || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ApplianceSeva_Payments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout>
      <div className="admin-page-content" style={{ padding: '24px 32px' }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <CreditCard className="text-emerald-800" size={26} />
              <span>Payment Records &amp; Reconciliation</span>
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Track collected cash, UPI payments, bank transfers and reconciliation references
            </p>
          </div>

          <button
            onClick={exportPaymentsCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-xs"
          >
            <Download size={14} />
            <span>Export Payments CSV</span>
          </button>
        </div>

        {/* Filter & Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs sm:col-span-2 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by customer, invoice #, transaction ref..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="text-xs p-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="all">All Payment Modes</option>
              <option value="upi">UPI (GPay / PhonePe / Paytm)</option>
              <option value="cash">Cash on Hand</option>
              <option value="bank_transfer">Bank Transfer / IMPS</option>
              <option value="card">Card Payment</option>
              <option value="other">Other Modes</option>
            </select>
          </div>

          <div className="bg-emerald-900 text-white p-4 rounded-xl border border-emerald-950 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">
                Filtered Collections
              </div>
              <div className="text-xl font-black text-white mt-0.5">
                ₹{totalCollected.toLocaleString('en-IN')}
              </div>
            </div>
            <div className="text-xs text-emerald-200 font-semibold">{filteredPayments.length} txns</div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-700 font-bold uppercase text-[10px] tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Appliance</th>
                  <th className="py-3 px-4 text-center">Mode</th>
                  <th className="py-3 px-4">Transaction / UTR Ref</th>
                  <th className="py-3 px-4 text-right">Amount Received (₹)</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((p, idx) => (
                    <tr key={p.paymentId || idx} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-3 px-4 text-gray-600 font-medium">{p.paymentDate}</td>
                      <td className="py-3 px-4 font-bold text-emerald-800">
                        <Link href={`/admin/invoices/${p.invoiceId}`} className="hover:underline">
                          {p.invoiceNumber}
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-gray-900">{p.customerName}</div>
                        <div className="text-[10.5px] text-gray-400">+91 {p.mobile}</div>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-700">{p.appliance}</td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                            p.method === 'upi'
                              ? 'bg-blue-100 text-blue-800'
                              : p.method === 'cash'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {p.method}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600 font-mono text-[11px]">
                        {p.transactionRef || 'Direct / On-Site'}
                        {p.notes && <div className="text-[10px] text-gray-400 font-sans">{p.notes}</div>}
                      </td>
                      <td className="py-3 px-4 text-right font-black text-emerald-800 text-sm">
                        ₹{p.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href={`/admin/invoices/${p.invoiceId}`}
                          className="px-2.5 py-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md"
                        >
                          View Bill
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-400 text-xs">
                      {loading ? 'Loading payment records...' : 'No payment transactions recorded yet.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

