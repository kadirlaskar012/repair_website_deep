'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Sparkles, Save, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AdminAISettingsPage() {
  const [provider, setProvider] = useState<'gemini' | 'openai'>('gemini');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [geminiModel, setGeminiModel] = useState('gemini-1.5-flash');
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const [openaiModel, setOpenaiModel] = useState('gpt-4o-mini');
  const [hasGeminiKey, setHasGeminiKey] = useState(false);
  const [hasOpenaiKey, setHasOpenaiKey] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/admin/ai/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          const s = data.settings;
          setProvider(s.provider || 'gemini');
          setGeminiModel(s.geminiModel || 'gemini-1.5-flash');
          setOpenaiModel(s.openaiModel || 'gpt-4o-mini');
          setHasGeminiKey(s.hasGeminiKey);
          setHasOpenaiKey(s.hasOpenaiKey);
        }
      })
      .catch(console.error);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/ai/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider,
          geminiApiKey,
          geminiModel,
          openaiApiKey,
          openaiModel
        })
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

  return (
    <AdminLayout>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '4px' }}>
            AI Content Configuration
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Configure Gemini and OpenAI API providers for automatic appliance repair blog draft generation
          </p>
        </div>

        {savedSuccess && (
          <div style={{ backgroundColor: '#DEF7EC', color: '#03543F', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} />
            <span>AI Provider configuration saved securely!</span>
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Provider Selection */}
          <div className="card" style={{ backgroundColor: '#FFFFFF', padding: '24px' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '14px', color: 'var(--color-text-main)' }}>
              Select Active AI Provider
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <label
                style={{
                  border: provider === 'gemini' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  backgroundColor: provider === 'gemini' ? 'var(--color-primary-light)' : '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="radio"
                  name="provider"
                  value="gemini"
                  checked={provider === 'gemini'}
                  onChange={() => setProvider('gemini')}
                />
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>Google Gemini API</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Recommended for fast, bilingual output</div>
                </div>
              </label>

              <label
                style={{
                  border: provider === 'openai' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  backgroundColor: provider === 'openai' ? 'var(--color-primary-light)' : '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="radio"
                  name="provider"
                  value="openai"
                  checked={provider === 'openai'}
                  onChange={() => setProvider('openai')}
                />
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>OpenAI API</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>GPT-4o / GPT-4o-mini engine</div>
                </div>
              </label>
            </div>
          </div>

          {/* Gemini Configuration */}
          <div className="card" style={{ backgroundColor: '#FFFFFF', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                1. Google Gemini API Settings
              </h3>
              {hasGeminiKey && (
                <span style={{ fontSize: '0.75rem', background: '#DEF7EC', color: '#03543F', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                  Key Configured
                </span>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Gemini API Key</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder={hasGeminiKey ? '•••••••••••••••••••• (Configured, enter new to replace)' : 'Enter your Gemini API key'}
                  value={geminiApiKey}
                  onChange={(e) => setGeminiApiKey(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Gemini Model</label>
                <select
                  className="form-control"
                  value={geminiModel}
                  onChange={(e) => setGeminiModel(e.target.value)}
                >
                  <option value="gemini-1.5-flash">gemini-1.5-flash (Fast & Cost Effective)</option>
                  <option value="gemini-1.5-pro">gemini-1.5-pro (Comprehensive)</option>
                  <option value="gemini-2.0-flash-exp">gemini-2.0-flash-exp</option>
                </select>
              </div>
            </div>
          </div>

          {/* OpenAI Configuration */}
          <div className="card" style={{ backgroundColor: '#FFFFFF', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                2. OpenAI API Settings
              </h3>
              {hasOpenaiKey && (
                <span style={{ fontSize: '0.75rem', background: '#DEF7EC', color: '#03543F', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                  Key Configured
                </span>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">OpenAI API Key</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder={hasOpenaiKey ? '•••••••••••••••••••• (Configured, enter new to replace)' : 'Enter your OpenAI API key (sk-...)'}
                  value={openaiApiKey}
                  onChange={(e) => setOpenaiApiKey(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">OpenAI Model</label>
                <select
                  className="form-control"
                  value={openaiModel}
                  onChange={(e) => setOpenaiModel(e.target.value)}
                >
                  <option value="gpt-4o-mini">gpt-4o-mini (Recommended)</option>
                  <option value="gpt-4o">gpt-4o</option>
                  <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.8125rem', color: 'var(--color-text-muted)', background: 'var(--color-bg-warm)', padding: '14px', borderRadius: '8px' }}>
            <ShieldCheck size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
            <span>
              <strong>Security Protocol:</strong> API keys are processed strictly on the secure Node.js server side and are never rendered to client-side browsers or JavaScript bundles.
            </span>
          </div>

          <button type="submit" disabled={saving} className="btn btn-primary btn-lg" style={{ alignSelf: 'flex-start' }}>
            <Save size={18} />
            <span>{saving ? 'Saving...' : 'Save AI Settings'}</span>
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
