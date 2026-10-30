'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { SparePartItem } from '@/lib/invoice-types';
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Search,
  ShieldCheck,
  Tag,
  AlertTriangle
} from 'lucide-react';

export default function SparePartsPage() {
  const [parts, setParts] = useState<SparePartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formPartNo, setFormPartNo] = useState('');
  const [formCategory, setFormCategory] = useState('Air Conditioner (AC)');
  const [formBrand, setFormBrand] = useState('');
  const [formHsn, setFormHsn] = useState('85322500');
  const [formPrice, setFormPrice] = useState('650');
  const [formCost, setFormCost] = useState('280');
  const [formStock, setFormStock] = useState('20');
  const [formWarranty, setFormWarranty] = useState('90 Days');
  const [formTax, setFormTax] = useState('18');
  const [saving, setSaving] = useState(false);

  const fetchParts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/invoices/spare-parts');
      const data = await res.json();
      if (data.success) {
        setParts(data.parts || []);
      }
    } catch (err) {
      console.error('Failed to load spare parts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParts();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormName('');
    setFormPartNo('');
    setFormCategory('Air Conditioner (AC)');
    setFormBrand('');
    setFormHsn('85322500');
    setFormPrice('650');
    setFormCost('280');
    setFormStock('20');
    setFormWarranty('90 Days');
    setFormTax('18');
    setShowModal(true);
  };

  const handleOpenEdit = (item: SparePartItem) => {
    setEditingId(item.id);
    setFormName(item.name);
    setFormPartNo(item.partNumber || '');
    setFormCategory(item.category);
    setFormBrand(item.brand || '');
    setFormHsn(item.hsnCode || '85322500');
    setFormPrice(String(item.unitPrice));
    setFormCost(String(item.costPrice || 0));
    setFormStock(String(item.stockQuantity || 0));
    setFormWarranty(item.warrantyPeriod || '90 Days');
    setFormTax(String(item.taxRate || 18));
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formCategory.trim()) {
      alert('Part name and category are required.');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/invoices/spare-parts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingId || undefined,
          name: formName.trim(),
          partNumber: formPartNo.trim() || undefined,
          category: formCategory,
          brand: formBrand.trim() || undefined,
          hsnCode: formHsn.trim() || '85322500',
          unitPrice: Number(formPrice) || 0,
          costPrice: Number(formCost) || 0,
          stockQuantity: Number(formStock) || 0,
          warrantyPeriod: formWarranty,
          taxRate: Number(formTax) || 18
        })
      });

      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        fetchParts();
      } else {
        alert(data.error || 'Failed to save part.');
      }
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}" from inventory?`)) return;

    try {
      const res = await fetch(`/api/admin/invoices/spare-parts?id=${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setParts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const filteredParts = parts.filter((p) => {
    const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(search.toLowerCase())) ||
      (p.partNumber && p.partNumber.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <AdminLayout>
      <div className="admin-page-content" style={{ padding: '24px 32px' }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <Package className="text-emerald-800" size={26} />
              <span>Spare Parts &amp; Inventory Management</span>
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Genuine replacement components, HSN codes, cost &amp; selling prices and warranty terms
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-black text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm"
          >
            <Plus size={15} />
            <span>Add Spare Part</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search parts by name, brand, part number..."
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

        {/* Parts Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-700 font-bold uppercase text-[10px] tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Component Name</th>
                  <th className="py-3 px-4">Appliance</th>
                  <th className="py-3 px-4">Brand / OEM</th>
                  <th className="py-3 px-4">HSN Code</th>
                  <th className="py-3 px-4 text-center">Stock</th>
                  <th className="py-3 px-4 text-center">Warranty</th>
                  <th className="py-3 px-4 text-right">Selling Rate (₹)</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredParts.length > 0 ? (
                  filteredParts.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-gray-900">{p.name}</div>
                        {p.partNumber && (
                          <div className="text-[10.5px] font-mono text-gray-500">#{p.partNumber}</div>
                        )}
                      </td>
                      <td className="py-3 px-4 font-semibold text-emerald-800">{p.category}</td>
                      <td className="py-3 px-4 text-gray-700">{p.brand || 'Universal'}</td>
                      <td className="py-3 px-4 font-mono text-[11px] text-gray-600">{p.hsnCode}</td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                            p.stockQuantity <= 5
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {p.stockQuantity} pcs
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 font-semibold">
                          <ShieldCheck size={13} />
                          {p.warrantyPeriod || '90 Days'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-black text-gray-900 text-sm">
                        ₹{p.unitPrice.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1 text-gray-600 hover:text-emerald-800 hover:bg-gray-100 rounded"
                            title="Edit Component"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id, p.name)}
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
                    <td colSpan={8} className="py-8 text-center text-gray-400 text-xs">
                      {loading ? 'Loading parts catalog...' : 'No spare parts found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL: ADD / EDIT PART */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl">
              <h3 className="text-base font-black text-gray-900 mb-4 pb-2 border-b border-gray-100">
                {editingId ? 'Edit Spare Part' : 'Add New Spare Part to Inventory'}
              </h3>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Part / Component Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. AC Run Capacitor (50+5 MFD)"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg font-bold"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
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
                    <label className="block font-bold text-gray-700 mb-1">Brand / Manufacturer</label>
                    <input
                      type="text"
                      placeholder="e.g. Epcos / LG OEM / SKF"
                      value={formBrand}
                      onChange={(e) => setFormBrand(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Part Number</label>
                    <input
                      type="text"
                      placeholder="e.g. CAP-50MFD"
                      value={formPartNo}
                      onChange={(e) => setFormPartNo(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">HSN Code *</label>
                    <input
                      type="text"
                      value={formHsn}
                      onChange={(e) => setFormHsn(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Tax Rate %</label>
                    <select
                      value={formTax}
                      onChange={(e) => setFormTax(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                    >
                      <option value="18">18%</option>
                      <option value="12">12%</option>
                      <option value="28">28%</option>
                      <option value="5">5%</option>
                      <option value="0">0%</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Selling Price (₹) *</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg font-black text-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Cost Price (₹)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formCost}
                      onChange={(e) => setFormCost(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">In Stock (Qty)</label>
                    <input
                      type="number"
                      min="0"
                      value={formStock}
                      onChange={(e) => setFormStock(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Warranty Period</label>
                  <select
                    value={formWarranty}
                    onChange={(e) => setFormWarranty(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                  >
                    <option value="30 Days">30 Days</option>
                    <option value="60 Days">60 Days</option>
                    <option value="90 Days">90 Days (Standard)</option>
                    <option value="180 Days">180 Days (6 Months)</option>
                    <option value="1 Year">1 Year</option>
                    <option value="No Warranty">No Warranty</option>
                  </select>
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
                    {saving ? 'Saving...' : 'Save Part'}
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

