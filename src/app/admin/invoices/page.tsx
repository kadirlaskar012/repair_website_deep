'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { Invoice, InvoiceDashboardStats } from '@/lib/invoice-types';
import {
  Receipt,
  FilePlus,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  IndianRupee,
  Calendar,
  Users,
  Search,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  CreditCard,
  Wrench,
  Package,
  Share2
} from 'lucide-react';

export default function InvoiceDashboardPage() {
  const [stats, setStats] = useState<InvoiceDashboardStats | null>(null);
  const [recentInvoices, setRecentInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/invoices?limit=8');
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        setRecentInvoices(data.invoices || []);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const filteredInvoices = recentInvoices.filter(
    (inv) =>
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(search.toLowerCase()) ||
      inv.mobile.includes(search)
  );

  return (
    <AdminLayout>
      <div className="admin-page-content" style={{ padding: '24px 32px' }}>
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
              <Receipt size={16} />
              <span>Billing &amp; Revenue Overview</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">
              Invoice Management Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Real-time billing, payments, outstanding balance and technician service revenue.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchDashboardData}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-xs hover:bg-gray-50"
              title="Refresh Stats"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>

            <Link
              href="/admin/invoices/create"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-all"
            >
              <FilePlus size={16} />
              <span>Create New Invoice</span>
            </Link>
          </div>
        </div>

        {/* 1. KEY FINANCIAL SUMMARY METRICS (4 CARDS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Card 1: Total Billed */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Total Invoiced Amount
              </span>
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <IndianRupee size={18} />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-black text-gray-900">
                ₹{(stats?.totalInvoiceAmount || 0).toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                <span>{stats?.totalInvoices || 0} Total Invoices generated</span>
              </div>
            </div>
          </div>

          {/* Card 2: Received Payments */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Payments Received
              </span>
              <div className="w-9 h-9 rounded-lg bg-green-50 text-green-700 flex items-center justify-center">
                <CheckCircle2 size={18} />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-black text-green-700">
                ₹{(stats?.totalPaymentsReceived || 0).toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {stats?.paidCount || 0} Fully Paid invoices
              </div>
            </div>
          </div>

          {/* Card 3: Outstanding Balance */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Outstanding Balance
              </span>
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <AlertCircle size={18} />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-black text-amber-700">
                ₹{(stats?.outstandingPayments || 0).toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-amber-800 font-medium mt-1">
                {stats?.unpaidCount || 0} Unpaid / {stats?.partiallyPaidCount || 0} Partial
              </div>
            </div>
          </div>

          {/* Card 4: Month & Today Activity */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                This Month Activity
              </span>
              <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                <Calendar size={18} />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-black text-gray-900">
                {stats?.thisMonthInvoices || 0} Invoices
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {stats?.todayInvoices || 0} Created today
              </div>
            </div>
          </div>
        </div>

        {/* 2. REVENUE TRENDS & SERVICE-WISE BREAKDOWN */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Service Wise Revenue Distribution */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900">Service Category Revenue</h3>
                <p className="text-xs text-gray-500">Breakdown by appliance repairs and servicing</p>
              </div>
              <Link
                href="/admin/invoices/reports"
                className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
              >
                <span>Full Reports</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            {stats?.serviceWiseRevenue && stats.serviceWiseRevenue.length > 0 ? (
              <div className="space-y-4 mt-6">
                {stats.serviceWiseRevenue.map((item, idx) => {
                  const maxAmt = Math.max(
                    ...stats.serviceWiseRevenue.map((s) => s.amount),
                    1
                  );
                  const pct = Math.round((item.amount / maxAmt) * 100);
                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-gray-800 flex items-center gap-1.5">
                          <Wrench size={13} className="text-emerald-700" />
                          {item.category} ({item.count} jobs)
                        </span>
                        <span className="text-gray-900 font-bold">
                          ₹{item.amount.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-emerald-700 h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-sm text-gray-400">
                No category data available yet.
              </div>
            )}
          </div>

          {/* Quick Shortcuts & Fast Links */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-1">Billing Fast Actions</h3>
              <p className="text-xs text-gray-500 mb-4">Common billing and administrative shortcuts</p>

              <div className="space-y-2">
                <Link
                  href="/admin/invoices/create"
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-emerald-700 hover:bg-emerald-50/50 transition-all text-xs font-semibold text-gray-800"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <FilePlus size={15} />
                    </div>
                    <span>Create New Invoice</span>
                  </div>
                  <ChevronRight size={14} className="text-gray-400" />
                </Link>

                <Link
                  href="/admin/invoices/customers"
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-emerald-700 hover:bg-emerald-50/50 transition-all text-xs font-semibold text-gray-800"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-blue-100 text-blue-800 flex items-center justify-center">
                      <Users size={15} />
                    </div>
                    <span>Customers Directory</span>
                  </div>
                  <ChevronRight size={14} className="text-gray-400" />
                </Link>

                <Link
                  href="/admin/invoices/spare-parts"
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-emerald-700 hover:bg-emerald-50/50 transition-all text-xs font-semibold text-gray-800"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-purple-100 text-purple-800 flex items-center justify-center">
                      <Package size={15} />
                    </div>
                    <span>Spare Parts Inventory</span>
                  </div>
                  <ChevronRight size={14} className="text-gray-400" />
                </Link>

                <Link
                  href="/admin/invoices/services"
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-emerald-700 hover:bg-emerald-50/50 transition-all text-xs font-semibold text-gray-800"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center">
                      <Wrench size={15} />
                    </div>
                    <span>Service Price Catalog</span>
                  </div>
                  <ChevronRight size={14} className="text-gray-400" />
                </Link>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
              <Link
                href="/admin/invoices/settings"
                className="text-xs font-semibold text-gray-500 hover:text-emerald-800"
              >
                Configure UPI, GSTIN &amp; Warranty Terms &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* 3. RECENT INVOICES TABLE & ADVANCED CONTROLS */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-gray-900">Recent Service Invoices</h3>
              <p className="text-xs text-gray-500">Showing recently created customer billing records</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search invoice or customer..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 w-48 sm:w-60"
                />
              </div>

              <Link
                href="/admin/invoices/all"
                className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 whitespace-nowrap"
              >
                <span>View All Invoices</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/80 text-gray-600 uppercase text-[10px] font-bold tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Appliance</th>
                  <th className="py-3 px-4 text-right">Amount (₹)</th>
                  <th className="py-3 px-4 text-right">Paid (₹)</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-3 px-4 font-bold text-emerald-800">
                        <Link href={`/admin/invoices/${inv.id}`} className="hover:underline">
                          {inv.invoiceNumber}
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{inv.invoiceDate}</td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-gray-900">{inv.customerName}</div>
                        <div className="text-[11px] text-gray-500">+91 {inv.mobile}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-800">
                          {inv.brand} {inv.applianceCategory}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-black text-gray-900">
                        ₹{inv.grandTotal.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-emerald-700">
                        ₹{inv.amountPaid.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                            inv.status === 'cancelled'
                              ? 'bg-gray-100 text-gray-600'
                              : inv.paymentStatus === 'paid'
                              ? 'bg-emerald-100 text-emerald-800'
                              : inv.paymentStatus === 'partially_paid'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {inv.status === 'cancelled' ? 'CANCELLED' : inv.paymentStatus.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/invoices/${inv.id}`}
                            className="px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md"
                          >
                            View
                          </Link>
                          <a
                            href={`https://wa.me/91${inv.mobile}?text=${encodeURIComponent(
                              `Hello ${inv.customerName},\nThank you for choosing Appliance Seva.\nYour invoice ${inv.invoiceNumber} for ${inv.brand} ${inv.applianceCategory} is ready.\nTotal: ₹${inv.grandTotal}\nView Invoice: https://applianceseva.com/invoice/${inv.secureToken}\n\nThank you,\nAppliance Seva\napplianceseva.com`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-green-700 hover:bg-green-50 rounded-md"
                            title="Share on WhatsApp"
                          >
                            <Share2 size={14} />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-400 text-xs">
                      {loading ? 'Loading invoices...' : 'No invoices matching search.'}
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

