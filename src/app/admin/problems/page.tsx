'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Problem, Category } from '@/lib/types';
import { AlertTriangle, Plus, Edit3, Trash2, Save } from 'lucide-react';

export default function AdminProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [editingProblem, setEditingProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resProb, resCat] = await Promise.all([
        fetch('/api/admin/problems'),
        fetch('/api/admin/categories')
      ]);
      const dataProb = await resProb.json();
      const dataCat = await resCat.json();
      if (dataProb.success) setProblems(dataProb.problems || []);
      if (dataCat.success) setCategories(dataCat.categories || []);
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
    if (!editingProblem) return;

    try {
      const res = await fetch('/api/admin/problems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProblem)
      });
      if (res.ok) {
        setProblems((prev) => {
          const idx = prev.findIndex((p) => p.id === editingProblem.id);
          if (idx >= 0) {
            const updated = [...prev];
            updated[idx] = editingProblem;
            return updated;
          }
          return [...prev, editingProblem];
        });
        setEditingProblem(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this symptom?')) return;
    try {
      const res = await fetch(`/api/admin/problems?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProblems((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = selectedCat === 'all'
    ? problems
    : problems.filter((p) => p.categoryId === selectedCat);

  return (
    <AdminLayout>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '4px' }}>
              Problems & Symptoms
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              Manage searchable problems and causes per appliance category
            </p>
          </div>

          <button
            onClick={() =>
              setEditingProblem({
                id: `prob-${Date.now()}`,
                categoryId: categories[0]?.id || 'ac-repair',
                title: '',
                titleBn: '',
                description: '',
                descriptionBn: '',
                symptoms: [],
                symptomsBn: [],
                commonCauses: '',
                commonCausesBn: '',
                solutionNote: '',
                solutionNoteBn: '',
                diagnosticFeeNote: 'Includes full multi-point diagnostic check for ₹299.',
                diagnosticFeeNoteBn: '₹২৯৯ ফিতে সম্পূর্ণ মাল্টি-পয়েন্ট ডায়াগনস্টিক অন্তর্ভুক্ত।',
                sortOrder: problems.length + 1,
                isActive: true
              })
            }
            className="btn btn-primary btn-sm"
          >
            <Plus size={16} />
            <span>Add New Problem</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <button
            onClick={() => setSelectedCat('all')}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              background: selectedCat === 'all' ? 'var(--color-primary)' : '#FFFFFF',
              color: selectedCat === 'all' ? '#FFFFFF' : 'var(--color-text-main)',
              border: '1px solid var(--color-border)'
            }}
          >
            All Categories ({problems.length})
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCat(c.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                background: selectedCat === c.id ? 'var(--color-primary)' : '#FFFFFF',
                color: selectedCat === c.id ? '#FFFFFF' : 'var(--color-text-main)',
                border: '1px solid var(--color-border)'
              }}
            >
              {c.name} ({problems.filter((p) => p.categoryId === c.id).length})
            </button>
          ))}
        </div>

        {/* Problems List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map((p) => {
            const cat = categories.find((c) => c.id === p.categoryId);
            return (
              <div
                key={p.id}
                className="card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  backgroundColor: '#FFFFFF',
                  gap: '16px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', background: 'var(--color-primary-light)', padding: '2px 8px', borderRadius: '4px' }}>
                      {cat?.name || p.categoryId}
                    </span>
                    <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                      {p.title}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-primary-dark)', fontWeight: 500 }}>
                    {p.titleBn}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setEditingProblem({ ...p })}
                    className="btn btn-outline btn-sm"
                  >
                    <Edit3 size={14} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="btn btn-outline btn-sm"
                    style={{ color: 'var(--color-danger)' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Editor */}
        {editingProblem && (
          <div className="modal-overlay" onClick={() => setEditingProblem(null)}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                  {editingProblem.title ? `Edit: ${editingProblem.title}` : 'Add New Problem'}
                </h3>
                <button onClick={() => setEditingProblem(null)}>✕</button>
              </div>

              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '70vh', overflowY: 'auto', paddingRight: '4px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Category</label>
                  <select
                    className="form-control"
                    value={editingProblem.categoryId}
                    onChange={(e) => setEditingProblem({ ...editingProblem, categoryId: e.target.value })}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Problem Title (English)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingProblem.title}
                      onChange={(e) => setEditingProblem({ ...editingProblem, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Problem Title (বাংলা)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingProblem.titleBn}
                      onChange={(e) => setEditingProblem({ ...editingProblem, titleBn: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Description (English)</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={editingProblem.description}
                    onChange={(e) => setEditingProblem({ ...editingProblem, description: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Description (বাংলা)</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={editingProblem.descriptionBn}
                    onChange={(e) => setEditingProblem({ ...editingProblem, descriptionBn: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Common Causes (English)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingProblem.commonCauses}
                      onChange={(e) => setEditingProblem({ ...editingProblem, commonCauses: e.target.value })}
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Common Causes (বাংলা)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingProblem.commonCausesBn}
                      onChange={(e) => setEditingProblem({ ...editingProblem, commonCausesBn: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                  <button type="button" onClick={() => setEditingProblem(null)} className="btn btn-outline">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <Save size={16} />
                    <span>Save Problem</span>
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
