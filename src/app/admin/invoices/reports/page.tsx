'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  BarChart3,
  Calendar,
  Download,
  IndianRupee,
  Wrench,
  Package,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function ReportsAndAnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const fetchReports = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (dateFrom) params.set('dateFrom', dateFrom);
      if (dateTo) params.set('dateTo', dateTo);

      const res = await fetch(`/api/admin/invoices/reports?${params.toString()}`);
      const resData = await res.json();
      if (resData.success) {
        setData(resData);
      }
    } catch (err) {
      console.error('Failed to load reports:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchReports();
  };

  const exportSummaryCSV = () => {
    if (!data) return;

    const headers = ['Report Category', 'Metric / Item', 'Total Count / Qty', 'Total Invoiced (INR)', 'Received (INR)'];
    const rows: (string | number)[][] = [];

    // Appliances
    data.applianceReport.forEach((app: any) => {
      rows.push(['Appliance Breakdown', `"${app.name}"`, app.count, app.billed, app.received]);
    });

    // Technicians
    data.technicianReport.forEach((tech: any) => {
      rows.push(['Technician Performance', `"${tech.name}"`, tech.count, tech.billed, tech.received]);
    });

    // Spare parts
    data.sparePartsReport.forEach((sp: any) => {
      rows.push(['Spare Parts Sold', `"${sp.name}"`, sp.quantity, sp.totalAmount, sp.totalAmount]);
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ApplianceSeva_BillingReport_${new Date().toISOString().split('T')[0]}.csv`);
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
              <BarChart3 className="text-emerald-800" size={26} />
              <span>Billing Analytics &amp; Revenue Reports</span>
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Comprehensive revenue, appliance metrics, technician performance and GST tax summaries
            </p>
          </div>

          <button
            onClick={exportSummaryCSV}
            disabled={!data}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-xs"
          >
            <Download size={14} />
            <span>Export Analytics CSV</span>
          </button>
        </div>

        {/* Date Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs mb-8">
          <form onSubmit={handleFilterSubmit} className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-gray-700 font-bold">
              <Calendar size={15} className="text-emerald-800" />
              <span>Date Range:</span>
            </div>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="text-xs p-1.5 border border-gray-300 rounded-lg"
            />
            <span className="text-xs text-gray-400">to</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="text-xs p-1.5 border border-gray-300 rounded-lg"
            />
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg"
            >
              Filter
            </button>
            {(dateFrom || dateTo) && (
              <button
                type="button"
                onClick={() => {
                  setDateFrom('');
                  setDateTo('');
                  fetchReports();
                }}
                className="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Reset
              </button>
            )}
          </form>
        </div>

        {/* Financial Highlights (4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Total Invoiced Revenue
            </span>
            <div className="text-2xl font-black text-gray-900 mt-2">
              ₹{(data?.summary?.totalBilled || 0).toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-emerald-800 font-semibold mt-1">
              {data?.summary?.totalInvoices || 0} completed invoices
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Actual Payments Received
            </span>
            <div className="text-2xl font-black text-green-700 mt-2">
              ₹{(data?.summary?.totalReceived || 0).toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-gray-500 mt-1">Collected at doorstep / UPI</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Outstanding Dues
            </span>
            <div className="text-2xl font-black text-amber-700 mt-2">
              ₹{(data?.summary?.totalOutstanding || 0).toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-amber-800 mt-1">Pending customer settlement</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              GST Tax Output
            </span>
            <div className="text-2xl font-black text-teal-800 mt-2">
              ₹{(data?.summary?.gstSummary?.totalTax || 0).toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              CGST: ₹{data?.summary?.gstSummary?.cgst || 0} | SGST: ₹{data?.summary?.gstSummary?.sgst || 0}
            </div>
          </div>
        </div>

        {/* 2 Grids: Appliance Breakdown & Technician Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Appliance Wise Report */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-xs p-5">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <Wrench size={16} className="text-emerald-800" />
              <span>Appliance Category Breakdown</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-50 text-gray-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">Appliance</th>
                    <th className="py-2.5 px-3 text-center">Jobs</th>
                    <th className="py-2.5 px-3 text-right">Invoiced (₹)</th>
                    <th className="py-2.5 px-3 text-right">Received (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data?.applianceReport && data.applianceReport.length > 0 ? (
                    data.applianceReport.map((app: any, idx: number) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="py-2.5 px-3 font-bold text-gray-900">{app.name}</td>
                        <td className="py-2.5 px-3 text-center font-semibold text-gray-600">{app.count}</td>
                        <td className="py-2.5 px-3 text-right font-black text-gray-900">
                          ₹{app.billed.toLocaleString('en-IN')}
                        </td>
                        <td className="py-2.5 px-3 text-right font-semibold text-emerald-700">
                          ₹{app.received.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-gray-400">
                        No data recorded.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Technician Wise Performance */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-xs p-5">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-800" />
              <span>Technician-wise Billing &amp; Work</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-50 text-gray-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">Technician Name</th>
                    <th className="py-2.5 px-3 text-center">Invoices</th>
                    <th className="py-2.5 px-3 text-right">Total Billed (₹)</th>
                    <th className="py-2.5 px-3 text-right">Collected (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data?.technicianReport && data.technicianReport.length > 0 ? (
                    data.technicianReport.map((tech: any, idx: number) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="py-2.5 px-3 font-bold text-gray-900">{tech.name}</td>
                        <td className="py-2.5 px-3 text-center font-semibold text-gray-600">{tech.count}</td>
                        <td className="py-2.5 px-3 text-right font-black text-gray-900">
                          ₹{tech.billed.toLocaleString('en-IN')}
                        </td>
                        <td className="py-2.5 px-3 text-right font-semibold text-emerald-700">
                          ₹{tech.received.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-gray-400">
                        No technician data recorded.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Spare Parts Sales Report */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-xs p-5">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
            <Package size={16} className="text-emerald-800" />
            <span>Spare Parts Consumption &amp; Sales Summary</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-600 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-4">Component Description</th>
                  <th className="py-2.5 px-4 text-center">Units Replaced</th>
                  <th className="py-2.5 px-4 text-right">Total Revenue (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data?.sparePartsReport && data.sparePartsReport.length > 0 ? (
                  data.sparePartsReport.map((sp: any, idx: number) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="py-2.5 px-4 font-bold text-gray-900">{sp.name}</td>
                      <td className="py-2.5 px-4 text-center font-semibold text-gray-700">{sp.quantity} pcs</td>
                      <td className="py-2.5 px-4 text-right font-black text-emerald-800">
                        ₹{sp.totalAmount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-6 text-center text-gray-400">
                      No spare parts recorded in selected period.
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

