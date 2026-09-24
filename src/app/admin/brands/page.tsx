'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Brand, Category } from '@/lib/types';
import { Award, Plus, Edit3, Trash2, Check, Save } from 'lucide-react';

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resBrand, resCat] = await Promise.all([
        fetch('/api/admin/brands'),
        fetch('/api/admin/categories')
      ]);
      const dataB = await resBrand.json();
      const dataC = await resCat.json();
      if (dataB.success) setBrands(dataB.brands || []);
      if (dataC.success) setCategories(dataC.categories || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBrand) return;

    try {
      const res = await fetch('/api/admin/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBrand)
      });
      if (res.ok) {
        setBrands((prev) => {
          const idx = prev.findIndex((b) => b.id === editingBrand.id);
          if (idx >= 0) {
            const copy = [...prev];
            copy[idx] = editingBrand;
            return copy;
          }
          return [...prev, editingBrand];
        });
        setEditingBrand(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this brand?')) return;
    try {
      const res = await fetch(`/api/admin/brands?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBrands((prev) => prev.filter((b) => b.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleCategory = (catId: string) => {
    if (!editingBrand) return;
    const exists = editingBrand.categoryIds.includes(catId);
    const updated = exists
      ? editingBrand.categoryIds.filter((id) => id !== catId)
      : [...editingBrand.categoryIds, catId];
    setEditingBrand({ ...editingBrand, categoryIds: updated });
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '4px' }}>
              Appliance Brands
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              Manage supported multi-brand appliances, category assignments, and logo URLs
            </p>
          </div>

          <button
            onClick={() =>
              setEditingBrand({
                id: `brand-${Date.now()}`,
                name: '',
                logoUrl: '',
                categoryIds: categories.map((c) => c.id),
                sortOrder: brands.length + 1,
                isActive: true,
                isPopular: true
              })
            }
            className="btn btn-primary btn-sm"
          >
            <Plus size={16} />
            <span>Add Brand</span>
          </button>
        </div>

        {/* Brands Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))', gap: '16px' }}>
          {brands.map((b) => (
            <div
              key={b.id}
              className="card"
              style={{
                backgroundColor: '#FFFFFF',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div
                  style={{
                    width: '100%',
                    height: '56px',
                    backgroundColor: '#F8FAFC',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                    padding: '6px 12px'
                  }}
                >
                  <img
                    src={b.logoUrl || `/images/brands/${b.id}.svg`}
                    alt={b.name}
                    style={{ maxHeight: '38px', maxWidth: '100%', objectFit: 'contain' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                    {b.name}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: b.isActive ? 'var(--color-success)' : 'var(--color-text-light)' }}>
                    {b.isActive ? 'Active' : 'Disabled'}
                  </span>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '14px' }}>
                  Assigned to: {b.categoryIds.length} categories
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid var(--color-border-light)' }}>
                <button
                  onClick={() => setEditingBrand({ ...b })}
                  className="btn btn-outline btn-sm"
                  style={{ flex: 1 }}
                >
                  <Edit3 size={13} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="btn btn-outline btn-sm"
                  style={{ color: 'var(--color-danger)' }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Brand Modal */}
        {editingBrand && (
          <div className="modal-overlay" onClick={() => setEditingBrand(null)}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                  {editingBrand.name ? `Edit Brand: ${editingBrand.name}` : 'Add New Brand'}
                </h3>
                <button onClick={() => setEditingBrand(null)}>✕</button>
              </div>

              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Brand Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editingBrand.name}
                    onChange={(e) => setEditingBrand({ ...editingBrand, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Brand Logo Image URL (Optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="/uploads/brand-logo.png"
                    value={editingBrand.logoUrl || ''}
                    onChange={(e) => setEditingBrand({ ...editingBrand, logoUrl: e.target.value })}
                  />
                  <small style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    Leave empty to use clean text badge. Upload custom logos from Media Manager.
                  </small>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Assign to Categories</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {categories.map((c) => {
                      const isChecked = editingBrand.categoryIds.includes(c.id);
                      return (
                        <label key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleCategory(c.id)}
                          />
                          <span>{c.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem' }}>
                    <input
                      type="checkbox"
                      checked={editingBrand.isActive}
                      onChange={(e) => setEditingBrand({ ...editingBrand, isActive: e.target.checked })}
                    />
                    <span>Active on Website</span>
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                  <button type="button" onClick={() => setEditingBrand(null)} className="btn btn-outline">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <Save size={16} />
                    <span>Save Brand</span>
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
