'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { Customer, Invoice } from '@/lib/invoice-types';
import {
  Users,
  Search,
  Phone,
  Mail,
  MapPin,
  Calendar,
  IndianRupee,
  Receipt,
  FilePlus,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  UserCheck
} from 'lucide-react';

export default function CustomersManagementPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerInvoices, setCustomerInvoices] = useState<Invoice[]>([]);
  const [loadingInvoices, setLoadingInvoices] = useState(false);

  const fetchCustomers = async (query?: string) => {
    setLoading(true);
    try {
      const url = query ? `/api/admin/invoices/customers?q=${encodeURIComponent(query)}` : '/api/admin/invoices/customers';
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setCustomers(data.customers || []);
      }
    } catch (err) {
      console.error('Failed to load customers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCustomers(search);
  };

  const handleSelectCustomer = async (cust: Customer) => {
    setSelectedCustomer(cust);
    setLoadingInvoices(true);
    try {
      const res = await fetch(`/api/admin/invoices?search=${encodeURIComponent(cust.mobile)}`);
      const data = await res.json();
      if (data.success) {
        setCustomerInvoices(data.invoices || []);
      }
    } catch (err) {
      console.error('Failed to load customer invoices:', err);
    } finally {
      setLoadingInvoices(false);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page-content" style={{ padding: '24px 32px' }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <Users className="text-emerald-800" size={26} />
              <span>Customer Billing Directory &amp; History</span>
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Customer profiles, total billed amount, payment history and service records
            </p>
          </div>

          <Link
            href="/admin/invoices/create"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-black text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm"
          >
            <FilePlus size={15} />
            <span>Create Invoice for Customer</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs mb-6">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers by name, phone number, locality..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg"
            >
              Search
            </button>
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  fetchCustomers();
                }}
                className="px-3 py-2.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        {/* Grid: Customer List + Detail Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer Table List */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden lg:col-span-2">
            <div className="p-3 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-700">
              {customers.length} Verified Customers Found
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50/80 text-gray-700 font-bold uppercase text-[10px] tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="py-3 px-4">Customer Name</th>
                    <th className="py-3 px-4">Phone / Locality</th>
                    <th className="py-3 px-4 text-center">Invoices</th>
                    <th className="py-3 px-4 text-right">Total Billed</th>
                    <th className="py-3 px-4 text-right">Balance Due</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {customers.length > 0 ? (
                    customers.map((cust) => {
                      const isSelected = selectedCustomer?.id === cust.id;
                      return (
                        <tr
                          key={cust.id}
                          onClick={() => handleSelectCustomer(cust)}
                          className={`cursor-pointer transition-colors ${
                            isSelected ? 'bg-emerald-50/80' : 'hover:bg-gray-50/60'
                          }`}
                        >
                          <td className="py-3 px-4 font-bold text-gray-900">
                            {cust.name}
                            {cust.email && <div className="text-[10px] text-gray-400 font-normal">{cust.email}</div>}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-gray-800">+91 {cust.mobile}</div>
                            <div className="text-[10.5px] text-gray-500">
                              {[cust.locality, cust.city].filter(Boolean).join(', ') || 'Kolkata'}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center font-bold text-gray-700">
                            {cust.totalInvoices || 0}
                          </td>
                          <td className="py-3 px-4 text-right font-black text-gray-900">
                            ₹{(cust.totalBilled || 0).toLocaleString('en-IN')}
                          </td>
                          <td className="py-3 px-4 text-right font-bold">
                            {(cust.outstandingBalance || 0) > 0 ? (
                              <span className="text-amber-700">
                                ₹{(cust.outstandingBalance || 0).toLocaleString('en-IN')}
                              </span>
                            ) : (
                              <span className="text-emerald-700">₹0</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectCustomer(cust);
                              }}
                              className="px-2.5 py-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md"
                            >
                              History &rarr;
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-400 text-xs">
                        {loading ? 'Loading customers...' : 'No customer records found.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Customer History Drawer Card */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
            {selectedCustomer ? (
              <div className="space-y-5">
                <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800">
                      Customer Profile
                    </span>
                    <h3 className="text-base font-black text-gray-900">{selectedCustomer.name}</h3>
                  </div>
                  <UserCheck size={20} className="text-emerald-700" />
                </div>

                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone size={13} className="text-emerald-700" />
                    <span className="font-semibold text-gray-900">+91 {selectedCustomer.mobile}</span>
                  </div>
                  {selectedCustomer.email && (
                    <div className="flex items-center gap-2">
                      <Mail size={13} className="text-emerald-700" />
                      <span>{selectedCustomer.email}</span>
                    </div>
                  )}
                  <div className="flex items-start gap-2">
                    <MapPin size={13} className="text-emerald-700 mt-0.5 flex-shrink-0" />
                    <span>
                      {[
                        selectedCustomer.houseNumber,
                        selectedCustomer.streetAddress,
                        selectedCustomer.locality,
                        selectedCustomer.city,
                        selectedCustomer.pincode
                      ]
                        .filter(Boolean)
                        .join(', ')}
                    </span>
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="grid grid-cols-2 gap-2 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100 text-xs">
                  <div>
                    <div className="text-gray-500 text-[10px] uppercase font-bold">Total Invoiced</div>
                    <div className="text-sm font-black text-gray-900">
                      ₹{(selectedCustomer.totalBilled || 0).toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-[10px] uppercase font-bold">Outstanding</div>
                    <div className="text-sm font-black text-amber-700">
                      ₹{(selectedCustomer.outstandingBalance || 0).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Invoices List for this customer */}
                <div>
                  <h4 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                    Past Service Invoices
                  </h4>

                  {loadingInvoices ? (
                    <div className="text-xs text-gray-400 py-3 text-center">Loading invoices...</div>
                  ) : customerInvoices.length > 0 ? (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {customerInvoices.map((inv) => (
                        <Link
                          key={inv.id}
                          href={`/admin/invoices/${inv.id}`}
                          className="block p-2.5 rounded-lg border border-gray-100 hover:border-emerald-700 hover:bg-emerald-50/40 transition-all text-xs"
                        >
                          <div className="flex justify-between font-bold text-gray-900">
                            <span>{inv.invoiceNumber}</span>
                            <span className="text-emerald-800">₹{inv.grandTotal.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="text-[11px] text-gray-500 flex justify-between mt-1">
                            <span>
                              {inv.brand} {inv.applianceCategory}
                            </span>
                            <span className="font-semibold uppercase text-[10px] text-gray-600">
                              {inv.paymentStatus}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400 py-4 text-center">No previous invoices found.</div>
                  )}
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <Link
                    href={`/admin/invoices/create`}
                    className="block text-center py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs"
                  >
                    + New Invoice for {selectedCustomer.name.split(' ')[0]}
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-xs text-gray-400">
                <Users size={32} className="mx-auto mb-2 text-gray-300" />
                Select any customer from the list to view their complete service and billing history.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

