'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { LocationItem } from '@/lib/types';
import { MapPin, Plus, Edit3, Trash2, Save } from 'lucide-react';

export default function AdminLocationsPage() {
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [editingLoc, setEditingLoc] = useState<LocationItem | null>(null);

  const fetchLocations = async () => {
    try {
      const res = await fetch('/api/admin/locations');
      const data = await res.json();
      if (data.success) setLocations(data.locations || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLoc) return;

    try {
      const res = await fetch('/api/admin/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingLoc)
      });
      if (res.ok) {
        setLocations((prev) => {
          const idx = prev.findIndex((l) => l.id === editingLoc.id);
          if (idx >= 0) {
            const copy = [...prev];
            copy[idx] = editingLoc;
            return copy;
          }
          return [...prev, editingLoc];
        });
        setEditingLoc(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this location?')) return;
    try {
      const res = await fetch(`/api/admin/locations?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setLocations((prev) => prev.filter((l) => l.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '4px' }}>
              West Bengal Service Areas
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              Manage location selectors and hash links (e.g. /#kolkata, /#howrah, /#hooghly, /#barasat)
            </p>
          </div>

          <button
            onClick={() =>
              setEditingLoc({
                id: `loc-${Date.now()}`,
                name: '',
                nameBn: '',
                hashSlug: '',
                state: 'West Bengal',
                stateBn: 'পশ্চিমবঙ্গ',
                sortOrder: locations.length + 1,
                isActive: true
              })
            }
            className="btn btn-primary btn-sm"
          >
            <Plus size={16} />
            <span>Add Location</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                backgroundColor: '#FFFFFF'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MapPin size={18} style={{ color: 'var(--color-accent)' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--color-text-main)' }}>
                    {loc.name} &bull; <span style={{ color: 'var(--color-primary)' }}>{loc.nameBn}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    Hash Slug: <code>#{loc.hashSlug}</code> &bull; State: {loc.state}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setEditingLoc({ ...loc })}
                  className="btn btn-outline btn-sm"
                >
                  <Edit3 size={13} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(loc.id)}
                  className="btn btn-outline btn-sm"
                  style={{ color: 'var(--color-danger)' }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {editingLoc && (
          <div className="modal-overlay" onClick={() => setEditingLoc(null)}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px', padding: '24px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>
                {editingLoc.name ? `Edit: ${editingLoc.name}` : 'Add Location'}
              </h3>
              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">English Name (e.g. Kolkata, Howrah)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editingLoc.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setEditingLoc({
                        ...editingLoc,
                        name,
                        hashSlug: name.toLowerCase().replace(/[^a-z0-9]/g, '-')
                      });
                    }}
                    required
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Bengali Name (e.g. কলকাতা, হাওড়া)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editingLoc.nameBn}
                    onChange={(e) => setEditingLoc({ ...editingLoc, nameBn: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Hash Slug (e.g. kolkata)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editingLoc.hashSlug}
                    onChange={(e) => setEditingLoc({ ...editingLoc, hashSlug: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                  <button type="button" onClick={() => setEditingLoc(null)} className="btn btn-outline">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <Save size={16} />
                    <span>Save Location</span>
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
