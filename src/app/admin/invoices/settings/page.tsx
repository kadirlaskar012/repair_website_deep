'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { InvoiceSettings } from '@/lib/invoice-types';
import {
  Sliders,
  Save,
  CheckCircle2,
  Building,
  CreditCard,
  ShieldCheck,
  FileText,
  IndianRupee,
  QrCode
} from 'lucide-react';

export default function InvoiceSettingsPage() {
  const [settings, setSettings] = useState<InvoiceSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/admin/invoices/settings');
        const data = await res.json();
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleChange = (field: keyof InvoiceSettings, value: any) => {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setSavedSuccess(false);
    try {
      const res = await fetch('/api/admin/invoices/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3500);
      } else {
        alert(data.error || 'Failed to save settings.');
      }
    } catch (err) {
      console.error('Settings save error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-page-content p-10 text-center text-sm text-gray-500">
          Loading invoice settings...
        </div>
      </AdminLayout>
    );
  }

  if (!settings) return null;

  return (
    <AdminLayout>
      <div className="admin-page-content" style={{ padding: '24px 32px' }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <Sliders className="text-emerald-800" size={26} />
              <span>Invoice &amp; Billing Configuration</span>
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Customize business details, GSTIN, UPI QR payments, numbering format and warranty terms
            </p>
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 rounded-lg">
              <CheckCircle2 size={16} />
              <span>Settings Saved Successfully!</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
          {/* SECTION 1: BUSINESS PROFILE & BRANDING */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-emerald-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <Building size={16} />
              <span>1. Business Profile &amp; Contact Header</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Business Name (English) *</label>
                <input
                  type="text"
                  value={settings.businessName}
                  onChange={(e) => handleChange('businessName', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg font-bold"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Tagline</label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Business Phone Helpline *</label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Business Email Address *</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-700 mb-1">Physical Business Address *</label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Website URL *</label>
                <input
                  type="text"
                  value={settings.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">State &amp; State Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={settings.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    className="w-2/3 p-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    value={settings.stateCode}
                    onChange={(e) => handleChange('stateCode', e.target.value)}
                    className="w-1/3 p-2 border border-gray-300 rounded-lg font-mono text-center"
                    placeholder="19"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: GST & NUMBERING */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-emerald-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <FileText size={16} />
              <span>2. Invoice Numbering &amp; GST Configuration</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Invoice Prefix *</label>
                <input
                  type="text"
                  value={settings.invoicePrefix}
                  onChange={(e) => handleChange('invoicePrefix', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg font-mono font-bold uppercase"
                  required
                />
                <div className="text-[10.5px] text-gray-400 mt-1">Example: AS-INV-2026-000001</div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Next Sequence #</label>
                <input
                  type="number"
                  value={settings.invoiceNumberNext}
                  onChange={(e) => handleChange('invoiceNumberNext', Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Default Due Days</label>
                <input
                  type="number"
                  value={settings.defaultDueDays}
                  onChange={(e) => handleChange('defaultDueDays', Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Seller GSTIN (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. 19AAACA1234A1Z5"
                  value={settings.gstin || ''}
                  onChange={(e) => handleChange('gstin', e.target.value.toUpperCase())}
                  className="w-full p-2 border border-gray-300 rounded-lg font-mono uppercase"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Default GST Rate %</label>
                <select
                  value={settings.defaultGstRate}
                  onChange={(e) => handleChange('defaultGstRate', Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                >
                  <option value="18">18% (Standard Services)</option>
                  <option value="12">12%</option>
                  <option value="28">28%</option>
                  <option value="5">5%</option>
                  <option value="0">0%</option>
                </select>
              </div>

              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-800">
                  <input
                    type="checkbox"
                    checked={settings.defaultGstEnabled}
                    onChange={(e) => handleChange('defaultGstEnabled', e.target.checked)}
                    className="w-4 h-4 text-emerald-700 rounded border-gray-300"
                  />
                  <span>Default to GST Tax Invoice</span>
                </label>
              </div>
            </div>
          </div>

          {/* SECTION 3: UPI & BANK DETAILS */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-emerald-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <CreditCard size={16} />
              <span>3. UPI Scan &amp; Pay and Bank Account Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Business UPI ID *</label>
                <input
                  type="text"
                  placeholder="e.g. 6291674186@paytm"
                  value={settings.upiId}
                  onChange={(e) => handleChange('upiId', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg font-bold text-emerald-800"
                  required
                />
                <div className="text-[10.5px] text-gray-400 mt-1">Generates on-invoice QR code</div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Bank Name</label>
                <input
                  type="text"
                  placeholder="e.g. State Bank of India"
                  value={settings.bankName || ''}
                  onChange={(e) => handleChange('bankName', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Bank Account Number</label>
                <input
                  type="text"
                  placeholder="e.g. 394829104829"
                  value={settings.bankAccountNumber || ''}
                  onChange={(e) => handleChange('bankAccountNumber', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">IFSC Code</label>
                <input
                  type="text"
                  placeholder="e.g. SBIN0001234"
                  value={settings.bankIfsc || ''}
                  onChange={(e) => handleChange('bankIfsc', e.target.value.toUpperCase())}
                  className="w-full p-2 border border-gray-300 rounded-lg font-mono uppercase"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-700 mb-1">Account Beneficiary Name</label>
                <input
                  type="text"
                  placeholder="e.g. Appliance Seva"
                  value={settings.bankAccountName || ''}
                  onChange={(e) => handleChange('bankAccountName', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: WARRANTY & TERMS */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-emerald-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <ShieldCheck size={16} />
              <span>4. Warranty Terms &amp; Footer Message</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Default Warranty Assurance Scope</label>
                <input
                  type="text"
                  value={settings.warrantyTerms}
                  onChange={(e) => handleChange('warrantyTerms', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Invoice Terms &amp; Conditions</label>
                <textarea
                  rows={4}
                  value={settings.termsAndConditions}
                  onChange={(e) => handleChange('termsAndConditions', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Bottom Footer Message</label>
                <input
                  type="text"
                  value={settings.footerMessage}
                  onChange={(e) => handleChange('footerMessage', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* SAVE BUTTON */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-black text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-md transition-all"
            >
              <Save size={15} />
              <span>{saving ? 'Saving...' : 'Save Configuration'}</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

