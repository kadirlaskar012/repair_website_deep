'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Lock, AlertCircle, ArrowRight, Eye, EyeOff, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanUser = username.trim();
    const cleanPass = password.trim();

    if (!cleanUser || !cleanPass) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: cleanUser,
          mobile: cleanUser,
          email: cleanUser,
          password: cleanPass
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid credentials');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message === 'Failed to fetch' ? 'Connection error. Please try again.' : 'Invalid credentials. Access denied.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#071A15',
        backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(20, 108, 91, 0.28) 0%, transparent 70%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        position: 'relative'
      }}
    >
      {/* Return to website link */}
      <div style={{ position: 'absolute', top: '24px', left: '24px' }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#A7C4BE',
            fontSize: '0.875rem',
            fontWeight: 600,
            textDecoration: 'none',
            padding: '8px 14px',
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.2s ease'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Website</span>
        </Link>
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: '430px',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: 'clamp(28px, 6vw, 40px) 32px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle top security gradient accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #146C5B 0%, #34D399 50%, #E8A33D 100%)'
          }}
        />

        {/* Website Branding */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 14px auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(20, 108, 91, 0.1) 0%, rgba(20, 108, 91, 0.03) 100%)',
              border: '1.5px solid rgba(20, 108, 91, 0.2)',
              padding: '8px'
            }}
          >
            <img
              src="/logo-icon.svg"
              alt="Appliance Seva"
              width={48}
              height={48}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>

          <div
            style={{
              fontSize: '1.3rem',
              fontWeight: 800,
              color: '#14221F',
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}
          >
            APPLIANCE <span style={{ color: '#146C5B' }}>SEVA</span>
          </div>

          <div
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#586965',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginTop: '4px'
            }}
          >
            Authorized Portal
          </div>
        </div>

        {/* Error notification */}
        {error && (
          <div
            style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #FCA5A5',
              borderRadius: '10px',
              padding: '12px 14px',
              color: '#991B1B',
              fontSize: '0.8125rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px'
            }}
          >
            <AlertCircle size={17} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Clean Login Form - No hints, pure User & Password */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label
              htmlFor="admin-username"
              style={{
                display: 'block',
                fontSize: '0.8125rem',
                fontWeight: 700,
                color: '#14221F',
                marginBottom: '7px'
              }}
            >
              User
            </label>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#899B97',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <User size={18} />
              </div>
              <input
                id="admin-username"
                type="text"
                className="allow-select admin-selectable"
                style={{
                  width: '100%',
                  height: '46px',
                  padding: '10px 14px 10px 42px',
                  borderRadius: '10px',
                  border: '1.5px solid #E2E8E5',
                  backgroundColor: '#FBFBF9',
                  fontSize: '0.9375rem',
                  color: '#14221F',
                  outline: 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                autoComplete="username"
                autoFocus
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="admin-password"
              style={{
                display: 'block',
                fontSize: '0.8125rem',
                fontWeight: 700,
                color: '#14221F',
                marginBottom: '7px'
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#899B97',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Lock size={18} />
              </div>
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                className="allow-select admin-selectable"
                style={{
                  width: '100%',
                  height: '46px',
                  padding: '10px 44px 10px 42px',
                  borderRadius: '10px',
                  border: '1.5px solid #E2E8E5',
                  backgroundColor: '#FBFBF9',
                  fontSize: '0.9375rem',
                  color: '#14221F',
                  outline: 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#899B97',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              height: '48px',
              borderRadius: '10px',
              backgroundColor: '#146C5B',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '0.9375rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '8px',
              boxShadow: '0 4px 14px rgba(20, 108, 91, 0.35)',
              transition: 'background-color 0.2s, transform 0.1s'
            }}
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Security badge at bottom */}
        <div
          style={{
            marginTop: '28px',
            paddingTop: '18px',
            borderTop: '1px solid #EDF2F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontSize: '0.6875rem',
            fontWeight: 700,
            color: '#586965',
            letterSpacing: '0.02em'
          }}
        >
          <ShieldCheck size={14} style={{ color: '#146C5B' }} />
          <span>256-Bit SSL Encrypted Session</span>
        </div>
      </div>
    </div>
  );
}
