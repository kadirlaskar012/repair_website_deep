'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { SiteSettings } from '@/lib/types';
import { Settings, Save, CheckCircle2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <AdminLayout>
        <div style={{ textAlign: 'center', padding: '60px' }}>Loading settings...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '4px' }}>
            Site Settings & Content
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Manage phone, WhatsApp, notification email, addresses, working hours, and pricing disclaimers in English & Bengali
          </p>
        </div>

        {savedSuccess && (
          <div style={{ backgroundColor: '#DEF7EC', color: '#03543F', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} />
            <span>Settings updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Contact Details */}
          <div className="card" style={{ backgroundColor: '#FFFFFF', padding: '24px' }}>
            <h3 style={{ fontSize: '1.1875rem', fontWeight: 700, marginBottom: '16px', color: 'var(--color-text-main)' }}>
              1. Contact & Lead Notification Channels
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Helpline Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  required
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">WhatsApp Number (e.g. +91 12345 67890)</label>
                <input
                  type="text"
                  className="form-control"
                  value={settings.whatsapp}
                  onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                  required
                />
                <small style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  Used for lead alerts and customer WhatsApp clicks
                </small>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Lead Notification Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  required
                />
                <small style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  All incoming doorstep booking leads are dispatched here
                </small>
              </div>
            </div>
          </div>

          {/* Business Names & Hours */}
          <div className="card" style={{ backgroundColor: '#FFFFFF', padding: '24px' }}>
            <h3 style={{ fontSize: '1.1875rem', fontWeight: 700, marginBottom: '16px', color: 'var(--color-text-main)' }}>
              2. Business Identity & Working Hours
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Business Name (English)</label>
                <input
                  type="text"
                  className="form-control"
                  value={settings.businessName}
                  onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Business Name (বাংলা)</label>
                <input
                  type="text"
                  className="form-control"
                  value={settings.businessNameBn}
                  onChange={(e) => setSettings({ ...settings, businessNameBn: e.target.value })}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Working Hours (English)</label>
                <input
                  type="text"
                  className="form-control"
                  value={settings.workingHours}
                  onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Working Hours (বাংলা)</label>
                <input
                  type="text"
                  className="form-control"
                  value={settings.workingHoursBn}
                  onChange={(e) => setSettings({ ...settings, workingHoursBn: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Address (English)</label>
                <textarea
                  className="form-control"
                  rows={2}
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Address (বাংলা)</label>
                <textarea
                  className="form-control"
                  rows={2}
                  value={settings.addressBn}
                  onChange={(e) => setSettings({ ...settings, addressBn: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Pricing & Mandatory Disclaimer */}
          <div className="card" style={{ backgroundColor: '#FFFFFF', padding: '24px' }}>
            <h3 style={{ fontSize: '1.1875rem', fontWeight: 700, marginBottom: '16px', color: 'var(--color-text-main)' }}>
              3. Pricing & Inspection Protocol
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '16px', marginBottom: '16px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Standard Visit Fee</label>
                <input
                  type="number"
                  className="form-control"
                  value={settings.visitFee}
                  onChange={(e) => setSettings({ ...settings, visitFee: parseInt(e.target.value, 10) || 299 })}
                  required
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Currency Symbol</label>
                <input
                  type="text"
                  className="form-control"
                  value={settings.currency}
                  onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                  style={{ maxWidth: '100px' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Pricing Disclaimer (English)</label>
              <textarea
                className="form-control"
                rows={2}
                value={settings.pricingDisclaimer}
                onChange={(e) => setSettings({ ...settings, pricingDisclaimer: e.target.value })}
                required
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Pricing Disclaimer (বাংলা)</label>
              <textarea
                className="form-control"
                rows={2}
                value={settings.pricingDisclaimerBn}
                onChange={(e) => setSettings({ ...settings, pricingDisclaimerBn: e.target.value })}
                required
              />
            </div>
          </div>

          <button type="submit" disabled={saving} className="btn btn-primary btn-lg" style={{ alignSelf: 'flex-start' }}>
            <Save size={18} />
            <span>{saving ? 'Saving...' : 'Save All Settings'}</span>
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
