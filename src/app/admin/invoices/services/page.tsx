'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { ServiceCatalogItem } from '@/lib/invoice-types';
import {
  Wrench,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  IndianRupee,
  Layers
} from 'lucide-react';

export default function ServiceCatalogPage() {
  const [services, setServices] = useState<ServiceCatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Modal State for Add / Edit
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formCategory, setFormCategory] = useState('Air Conditioner (AC)');
  const [formName, setFormName] = useState('');
  const [formHsn, setFormHsn] = useState('998717');
  const [formPrice, setFormPrice] = useState('499');
  const [formTax, setFormTax] = useState('18');
  const [formDesc, setFormDesc] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/invoices/services');
      const data = await res.json();
      if (data.success) {
        setServices(data.services || []);
      }
    } catch (err) {
      console.error('Failed to load services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormCategory('Air Conditioner (AC)');
    setFormName('');
    setFormHsn('998717');
    setFormPrice('499');
    setFormTax('18');
    setFormDesc('');
    setShowModal(true);
  };

  const handleOpenEdit = (item: ServiceCatalogItem) => {
    setEditingId(item.id);
    setFormCategory(item.category);
    setFormName(item.name);
    setFormHsn(item.hsnSac || '998717');
    setFormPrice(String(item.defaultPrice));
    setFormTax(String(item.defaultTaxRate || 0));
    setFormDesc(item.description || '');
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formCategory.trim()) {
      alert('Service name and category are required.');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/invoices/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingId || undefined,
          category: formCategory,
          name: formName.trim(),
          hsnSac: formHsn.trim() || '998717',
          defaultPrice: Number(formPrice) || 0,
          defaultTaxRate: Number(formTax) || 0,
          description: formDesc.trim()
        })
      });

      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        fetchServices();
      } else {
        alert(data.error || 'Failed to save service.');
      }
    } catch (err) {
      console.error('Save service error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove "${name}" from the service catalog?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/invoices/services?id=${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error('Delete service error:', err);
    }
  };

  const filteredServices = services.filter((s) => {
    const matchesCat = categoryFilter === 'all' || s.category === categoryFilter;
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.description && s.description.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <AdminLayout>
      <div className="admin-page-content" style={{ padding: '24px 32px' }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <Wrench className="text-emerald-800" size={26} />
              <span>Service Pricing Catalog</span>
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Configure standard service types, diagnostic inspection fees and SAC codes for all 5 appliances
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-black text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm"
          >
            <Plus size={15} />
            <span>Add New Service</span>
          </button>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search service title or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs p-2 border border-gray-300 rounded-lg bg-white"
          >
            <option value="all">All Appliance Categories</option>
            <option value="Air Conditioner (AC)">Air Conditioner (AC)</option>
            <option value="Refrigerator">Refrigerator</option>
            <option value="Washing Machine">Washing Machine</option>
            <option value="Television (TV)">Television (TV)</option>
            <option value="Microwave Oven">Microwave Oven</option>
          </select>
        </div>

        {/* Table of Services */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-700 font-bold uppercase text-[10px] tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Service Name</th>
                  <th className="py-3 px-4">Appliance Category</th>
                  <th className="py-3 px-4">SAC Code</th>
                  <th className="py-3 px-4 text-right">Default Rate (₹)</th>
                  <th className="py-3 px-4 text-center">GST Tax</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredServices.length > 0 ? (
                  filteredServices.map((srv) => (
                    <tr key={srv.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-gray-900">{srv.name}</div>
                        {srv.description && (
                          <div className="text-[11px] text-gray-500 max-w-md">{srv.description}</div>
                        )}
                      </td>
                      <td className="py-3 px-4 font-semibold text-emerald-800">{srv.category}</td>
                      <td className="py-3 px-4 font-mono text-[11px] text-gray-600">{srv.hsnSac || '998717'}</td>
                      <td className="py-3 px-4 text-right font-black text-gray-900 text-sm">
                        ₹{srv.defaultPrice.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-0.5 rounded text-[10.5px] bg-gray-100 font-semibold text-gray-700">
                          {srv.defaultTaxRate}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                          ACTIVE
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(srv)}
                            className="p-1 text-gray-600 hover:text-emerald-800 hover:bg-gray-100 rounded"
                            title="Edit Service"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(srv.id, srv.name)}
                            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-400 text-xs">
                      {loading ? 'Loading catalog...' : 'No services found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL: ADD / EDIT SERVICE */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl">
              <h3 className="text-base font-black text-gray-900 mb-4 pb-2 border-b border-gray-100">
                {editingId ? 'Edit Service Details' : 'Add New Service to Catalog'}
              </h3>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Appliance Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg bg-white"
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
                  <label className="block font-bold text-gray-700 mb-1">Service Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. AC Jet Foam Wash Servicing"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">SAC Code</label>
                    <input
                      type="text"
                      value={formHsn}
                      onChange={(e) => setFormHsn(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Default Rate (₹) *</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Default Tax %</label>
                    <select
                      value={formTax}
                      onChange={(e) => setFormTax(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                    >
                      <option value="0">0%</option>
                      <option value="18">18%</option>
                      <option value="12">12%</option>
                      <option value="5">5%</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Service Description</label>
                  <textarea
                    rows={3}
                    placeholder="Brief description of diagnosis and repair scope..."
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 font-black text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg"
                  >
                    {saving ? 'Saving...' : 'Save Service'}
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

