'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { Invoice } from '@/lib/invoice-types';
import {
  FileSpreadsheet,
  FilePlus,
  Search,
  Filter,
  Download,
  Share2,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  Clock,
  RefreshCw,
  Calendar,
  XCircle,
  Copy,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function AllInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all');
  const [applianceFilter, setApplianceFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Bulk selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set('search', search.trim());
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (paymentStatusFilter !== 'all') params.set('paymentStatus', paymentStatusFilter);
      if (applianceFilter !== 'all') params.set('appliance', applianceFilter);
      if (dateFrom) params.set('dateFrom', dateFrom);
      if (dateTo) params.set('dateTo', dateTo);
      params.set('limit', '100');

      const res = await fetch(`/api/admin/invoices?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setInvoices(data.invoices || []);
        setTotal(data.total || 0);
      }
    } catch (err) {
      console.error('Failed to load invoices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [statusFilter, paymentStatusFilter, applianceFilter, dateFrom, dateTo]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchInvoices();
  };

  // CSV Export
  const exportToCSV = () => {
    if (invoices.length === 0) {
      alert('No invoices to export.');
      return;
    }

    const headers = [
      'Invoice Number',
      'Invoice Date',
      'Customer Name',
      'Phone Number',
      'Appliance',
      'Brand',
      'Technician',
      'Total Amount (INR)',
      'Amount Paid (INR)',
      'Balance Due (INR)',
      'Payment Status',
      'Invoice Status'
    ];

    const rows = invoices.map((inv) => [
      `"${inv.invoiceNumber}"`,
      `"${inv.invoiceDate}"`,
      `"${inv.customerName}"`,
      `"${inv.mobile}"`,
      `"${inv.applianceCategory}"`,
      `"${inv.brand}"`,
      `"${inv.technicianName || 'N/A'}"`,
      inv.grandTotal,
      inv.amountPaid,
      inv.balanceDue,
      `"${inv.paymentStatus}"`,
      `"${inv.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ApplianceSeva_Invoices_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(invoices.map((i) => i.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <AdminLayout>
      <div className="admin-page-content" style={{ padding: '24px 32px' }}>
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <FileSpreadsheet className="text-emerald-800" size={26} />
              <span>All Invoices &amp; Billing Records</span>
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Filter, search, export to CSV/Excel, record payments and share bills
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-xs"
              title="Export filtered records to CSV"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>

            <Link
              href="/admin/invoices/create"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-black text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-all"
            >
              <FilePlus size={15} />
              <span>Create Invoice</span>
            </Link>
          </div>
        </div>

        {/* Filters Card */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs mb-6">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            <div className="md:col-span-2 relative">
              <input
                type="text"
                placeholder="Search by Invoice #, Customer name, Phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
              <Search size={14} className="absolute left-2.5 top-3 text-gray-400" />
            </div>

            <div>
              <select
                value={paymentStatusFilter}
                onChange={(e) => setPaymentStatusFilter(e.target.value)}
                className="w-full text-xs p-2 border border-gray-300 rounded-lg bg-white"
              >
                <option value="all">All Payment Statuses</option>
                <option value="paid">Paid</option>
                <option value="partially_paid">Partially Paid</option>
                <option value="unpaid">Unpaid</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <select
                value={applianceFilter}
                onChange={(e) => setApplianceFilter(e.target.value)}
                className="w-full text-xs p-2 border border-gray-300 rounded-lg bg-white"
              >
                <option value="all">All Appliances</option>
                <option value="Air Conditioner (AC)">Air Conditioner (AC)</option>
                <option value="Refrigerator">Refrigerator</option>
                <option value="Washing Machine">Washing Machine</option>
                <option value="Television (TV)">Television (TV)</option>
                <option value="Microwave Oven">Microwave Oven</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="w-full py-2 px-3 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg"
              >
                Apply
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setStatusFilter('all');
                  setPaymentStatusFilter('all');
                  setApplianceFilter('all');
                  setDateFrom('');
                  setDateTo('');
                  fetchInvoices();
                }}
                className="py-2 px-3 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg"
                title="Reset filters"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Invoices Master Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="p-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between text-xs text-gray-600">
            <span>
              Showing <strong>{invoices.length}</strong> of <strong>{total}</strong> invoices
            </span>
            {selectedIds.length > 0 && (
              <span className="font-semibold text-emerald-800">
                {selectedIds.length} items selected
              </span>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/80 text-gray-700 font-bold uppercase text-[10px] tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-3 px-3 w-8 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.length > 0 && selectedIds.length === invoices.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="py-3 px-3">Invoice #</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Appliance &amp; Brand</th>
                  <th className="py-3 px-3 text-right">Total (₹)</th>
                  <th className="py-3 px-3 text-right">Paid (₹)</th>
                  <th className="py-3 px-3 text-right">Balance (₹)</th>
                  <th className="py-3 px-3 text-center">Payment Status</th>
                  <th className="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoices.length > 0 ? (
                  invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-3 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(inv.id)}
                          onChange={() => toggleSelectOne(inv.id)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="py-3 px-3 font-bold text-emerald-800">
                        <Link href={`/admin/invoices/${inv.id}`} className="hover:underline">
                          {inv.invoiceNumber}
                        </Link>
                        {inv.status === 'draft' && (
                          <span className="ml-1.5 text-[9.5px] bg-gray-200 text-gray-700 font-bold px-1.5 py-0.2 rounded">
                            DRAFT
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-gray-600">{inv.invoiceDate}</td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-gray-900">{inv.customerName}</div>
                        <div className="text-[11px] text-gray-500">+91 {inv.mobile}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-medium text-gray-800">
                          {inv.brand} {inv.applianceCategory}
                        </div>
                        {inv.technicianName && (
                          <div className="text-[10.5px] text-gray-400">Tech: {inv.technicianName}</div>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right font-black text-gray-900">
                        ₹{inv.grandTotal.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-3 text-right font-semibold text-emerald-700">
                        ₹{inv.amountPaid.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-amber-700">
                        {inv.balanceDue > 0 ? `₹${inv.balanceDue.toLocaleString('en-IN')}` : '—'}
                      </td>
                      <td className="py-3 px-3 text-center">
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
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <Link
                            href={`/admin/invoices/${inv.id}`}
                            className="p-1 text-emerald-800 hover:bg-emerald-50 rounded"
                            title="View & Edit Invoice"
                          >
                            <Eye size={15} />
                          </Link>
                          <a
                            href={`https://wa.me/91${inv.mobile}?text=${encodeURIComponent(
                              `Hello ${inv.customerName},\nThank you for choosing Appliance Seva.\nYour invoice ${inv.invoiceNumber} for ${inv.brand} ${inv.applianceCategory} is ready.\nTotal: ₹${inv.grandTotal}\nView Invoice: https://applianceseva.com/invoice/${inv.secureToken}\n\nThank you,\nAppliance Seva\napplianceseva.com`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-green-700 hover:bg-green-50 rounded"
                            title="Share on WhatsApp"
                          >
                            <Share2 size={15} />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="py-10 text-center text-gray-400 text-xs">
                      {loading ? 'Loading invoices...' : 'No invoices found matching criteria.'}
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

