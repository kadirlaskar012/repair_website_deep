'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Booking } from '@/lib/types';
import {
  Calendar,
  Phone,
  MessageCircle,
  MapPin,
  Wrench,
  Search,
  RefreshCw,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Trash2,
  Download,
  Copy,
  ExternalLink,
  User,
  Check
} from 'lucide-react';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/bookings');
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings || []);
      }
    } catch (e) {
      console.error('Failed to fetch bookings:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (bookingId: string, newStatus: Booking['status']) => {
    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, status: newStatus })
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.bookingId === bookingId ? { ...b, status: newStatus } : b))
        );
        if (selectedBooking && selectedBooking.bookingId === bookingId) {
          setSelectedBooking({ ...selectedBooking, status: newStatus });
        }
      }
    } catch (e) {
      console.error('Failed to update booking status:', e);
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    if (!window.confirm(`Are you sure you want to delete lead #${bookingId}?`)) {
      return;
    }
    setDeletingId(bookingId);
    try {
      const res = await fetch(`/api/admin/bookings?bookingId=${encodeURIComponent(bookingId)}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.bookingId !== bookingId));
        if (selectedBooking && selectedBooking.bookingId === bookingId) {
          setSelectedBooking(null);
        }
      }
    } catch (e) {
      console.error('Failed to delete booking:', e);
    } finally {
      setDeletingId(null);
    }
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportToCSV = () => {
    if (bookings.length === 0) return;
    const headers = ['Booking ID', 'Customer Name', 'Mobile', 'Service', 'Brand', 'Problem', 'Address', 'Preferred Date', 'Preferred Time', 'Status', 'Created At'];
    const rows = filtered.map((b) => [
      `"${b.bookingId}"`,
      `"${(b.name || '').replace(/"/g, '""')}"`,
      `"${b.mobile}"`,
      `"${(b.serviceName || b.service || '').replace(/"/g, '""')}"`,
      `"${(b.brand || '').replace(/"/g, '""')}"`,
      `"${(b.problem || '').replace(/"/g, '""')}"`,
      `"${(b.address || '').replace(/"/g, '""')}"`,
      `"${b.preferredDate || ''}"`,
      `"${b.preferredTime || ''}"`,
      `"${b.status}"`,
      `"${b.createdAt || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `appliance-seva-leads-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.mobile.includes(search) ||
      b.bookingId.toLowerCase().includes(search.toLowerCase()) ||
      b.service.toLowerCase().includes(search.toLowerCase()) ||
      (b.address && b.address.toLowerCase().includes(search.toLowerCase())) ||
      (b.problem && b.problem.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed' || b.status === 'technician_assigned').length,
    completed: bookings.filter((b) => b.status === 'completed').length
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#DEF7EC', color: '#03543F', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700 }}>
            <CheckCircle2 size={12} />
            <span>Confirmed</span>
          </span>
        );
      case 'technician_assigned':
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#E1EFFE', color: '#1E429F', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700 }}>
            <Wrench size={12} />
            <span>Assigned</span>
          </span>
        );
      case 'completed':
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#F3F4F6', color: '#1F2A37', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700 }}>
            <Check size={12} />
            <span>Completed</span>
          </span>
        );
      case 'cancelled':
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#FDE8E8', color: '#9B1C1C', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700 }}>
            <XCircle size={12} />
            <span>Cancelled</span>
          </span>
        );
      case 'pending':
      default:
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#FEF08A', color: '#713F12', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700 }}>
            <Clock size={12} />
            <span>Pending</span>
          </span>
        );
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Page Title & Main Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '4px' }}>
              Service Booking Leads
            </h1>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)' }}>
              Real-time doorstep repair appointments with unique booking IDs across Kolkata, Howrah, Hooghly & Barasat
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={exportToCSV}
              disabled={bookings.length === 0}
              className="btn btn-outline btn-sm"
              title="Export leads to Excel CSV"
            >
              <Download size={15} />
              <span>Export CSV</span>
            </button>

            <button
              onClick={fetchBookings}
              className="btn btn-primary btn-sm"
            >
              <RefreshCw size={15} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginBottom: '28px'
          }}
        >
          <div style={{ backgroundColor: 'var(--color-bg-card)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px' }}>TOTAL BOOKING LEADS</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>{stats.total}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>All incoming service requests</div>
          </div>

          <div style={{ backgroundColor: 'var(--color-bg-card)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#A16207', marginBottom: '6px' }}>PENDING / NEW LEADS</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#CA8A04' }}>{stats.pending}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>Needs technician assignment</div>
          </div>

          <div style={{ backgroundColor: 'var(--color-bg-card)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#047857', marginBottom: '6px' }}>CONFIRMED & ASSIGNED</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#059669' }}>{stats.confirmed}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>Technician scheduled / in transit</div>
          </div>

          <div style={{ backgroundColor: 'var(--color-bg-card)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#1E40AF', marginBottom: '6px' }}>COMPLETED REPAIRS</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#2563EB' }}>{stats.completed}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>30-Day warranty active</div>
          </div>
        </div>

        {/* Filter & Live Search Toolbar */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-card)',
            padding: '16px 20px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '260px' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
              <input
                type="text"
                className="form-control"
                style={{ paddingLeft: '38px', fontSize: '0.875rem' }}
                placeholder="Search by ID, Customer Name, Mobile, Problem, Address..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="form-control"
              style={{ maxWidth: '180px', fontSize: '0.875rem', cursor: 'pointer' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses ({bookings.length})</option>
              <option value="pending">Pending ({stats.pending})</option>
              <option value="confirmed">Confirmed</option>
              <option value="technician_assigned">Assigned</option>
              <option value="completed">Completed ({stats.completed})</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            Showing {filtered.length} of {bookings.length} leads
          </span>
        </div>

        {/* Leads Table */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-text-muted)' }}>
              <RefreshCw size={24} className="animate-spin" style={{ margin: '0 auto 12px auto' }} />
              <div>Loading real-time booking leads...</div>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-text-muted)' }}>
              <Calendar size={36} style={{ margin: '0 auto 12px auto', opacity: 0.3 }} />
              <div style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px' }}>
                No booking leads match your search
              </div>
              <p style={{ fontSize: '0.875rem' }}>
                New customer bookings submitted through the website will instantly appear here.
              </p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead style={{ backgroundColor: 'var(--color-bg-warm)', borderBottom: '1px solid var(--color-border)' }}>
                  <tr>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-text-muted)' }}>Booking ID</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-text-muted)' }}>Customer & Contact</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-text-muted)' }}>Service & Problem</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-text-muted)' }}>Address / Locality</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-text-muted)' }}>Schedule Slot</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-text-muted)' }}>Status</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-text-muted)', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b) => (
                    <tr key={b.bookingId} style={{ borderBottom: '1px solid var(--color-border-light)' }} className="hover-card">
                      {/* Booking ID with Copy */}
                      <td style={{ padding: '14px 16px', fontWeight: 700 }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: 'var(--color-primary)', fontFamily: 'monospace', fontSize: '0.875rem', fontWeight: 800 }}>
                            {b.bookingId}
                          </span>
                          <button
                            onClick={() => handleCopyId(b.bookingId)}
                            title="Copy Booking ID"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: copiedId === b.bookingId ? '#059669' : 'var(--color-text-light)' }}
                          >
                            {copiedId === b.bookingId ? <Check size={14} /> : <Copy size={14} />}
                          </button>
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                          {b.createdAt ? new Date(b.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
                        </div>
                      </td>

                      {/* Customer & Quick Call / WhatsApp */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>{b.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                          <a
                            href={`tel:${b.mobile}`}
                            className="btn btn-outline btn-sm"
                            style={{ padding: '2px 8px', fontSize: '0.75rem', gap: '4px' }}
                            title="Call customer directly"
                          >
                            <Phone size={12} style={{ color: 'var(--color-primary)' }} />
                            <span>{b.mobile}</span>
                          </a>

                          <a
                            href={`https://wa.me/91${b.mobile.replace(/[^\d]/g, '')}?text=${encodeURIComponent(`Hello ${b.name}, this is Appliance Seva regarding your repair booking ID: ${b.bookingId} for ${b.serviceName || b.service}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-whatsapp btn-sm"
                            style={{ padding: '2px 8px', fontSize: '0.75rem', gap: '4px' }}
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle size={12} />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </td>

                      {/* Service & Problem */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 700 }}>{b.serviceName || b.service}</div>
                        <div style={{ fontSize: '0.78125rem', color: 'var(--color-primary)', fontWeight: 600 }}>Brand: {b.brand}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={b.problem}>
                          {b.problem}
                        </div>
                      </td>

                      {/* Address */}
                      <td style={{ padding: '14px 16px', maxWidth: '180px' }}>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-main)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} title={b.address}>
                          {b.address}
                        </div>
                      </td>

                      {/* Schedule */}
                      <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                        <div style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{b.preferredDate}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{b.preferredTime}</div>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                        <select
                          value={b.status}
                          onChange={(e) => handleStatusChange(b.bookingId, e.target.value as Booking['status'])}
                          style={{
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-full)',
                            padding: '3px 8px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            backgroundColor:
                              b.status === 'confirmed' ? '#DEF7EC' :
                              b.status === 'technician_assigned' ? '#E1EFFE' :
                              b.status === 'completed' ? '#F3F4F6' :
                              b.status === 'cancelled' ? '#FDE8E8' : '#FEF08A',
                            color:
                              b.status === 'confirmed' ? '#03543F' :
                              b.status === 'technician_assigned' ? '#1E429F' :
                              b.status === 'completed' ? '#1F2A37' :
                              b.status === 'cancelled' ? '#9B1C1C' : '#713F12'
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="technician_assigned">Assigned</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '14px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <button
                            onClick={() => setSelectedBooking(b)}
                            className="btn btn-outline btn-sm"
                            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                          >
                            Details
                          </button>
                          <button
                            onClick={() => handleDeleteBooking(b.bookingId)}
                            disabled={deletingId === b.bookingId}
                            className="btn btn-sm"
                            style={{ padding: '4px 8px', backgroundColor: 'transparent', color: '#DC2626', border: '1px solid #FCA5A5' }}
                            title="Delete Lead"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Lead Details Full Modal */}
        {selectedBooking && (
          <div className="modal-overlay" onClick={() => setSelectedBooking(null)}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px', padding: '28px' }}>
              {/* Modal Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid var(--color-border)', paddingBottom: '14px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                    Customer Booking Lead
                  </span>
                  <h3 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--color-primary)', fontFamily: 'monospace', letterSpacing: '-0.02em', marginTop: '2px' }}>
                    #{selectedBooking.bookingId}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  style={{ background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.875rem' }}>
                {/* Customer Contact Box */}
                <div style={{ backgroundColor: 'var(--color-bg-warm)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-light)' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.0625rem', color: 'var(--color-text-main)', marginBottom: '8px' }}>
                    {selectedBooking.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <a
                      href={`tel:${selectedBooking.mobile}`}
                      className="btn btn-primary btn-sm"
                      style={{ gap: '6px' }}
                    >
                      <Phone size={14} />
                      <span>Call: {selectedBooking.mobile}</span>
                    </a>

                    <a
                      href={`https://wa.me/91${selectedBooking.mobile.replace(/[^\d]/g, '')}?text=${encodeURIComponent(`Hello ${selectedBooking.name}, this is Appliance Seva regarding your repair booking ID: ${selectedBooking.bookingId}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp btn-sm"
                      style={{ gap: '6px' }}
                    >
                      <MessageCircle size={14} />
                      <span>Send WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Service Details Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-light)', textTransform: 'uppercase' }}>Appliance Service</label>
                    <div style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>{selectedBooking.serviceName || selectedBooking.service}</div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-light)', textTransform: 'uppercase' }}>Brand</label>
                    <div style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>{selectedBooking.brand}</div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-light)', textTransform: 'uppercase' }}>Appointment Schedule</label>
                    <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{selectedBooking.preferredDate} ({selectedBooking.preferredTime})</div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-light)', textTransform: 'uppercase' }}>Inspection Protocol</label>
                    <div style={{ fontWeight: 700, color: '#A16207' }}>Fixed ₹299 Doorstep Diagnosis</div>
                  </div>
                </div>

                {/* Reported Problem */}
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-light)', textTransform: 'uppercase' }}>Reported Problem</label>
                  <div style={{ backgroundColor: 'var(--color-bg-base)', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--color-border-light)', marginTop: '4px', fontWeight: 500 }}>
                    {selectedBooking.problem}
                  </div>
                </div>

                {/* Service Address */}
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-light)', textTransform: 'uppercase' }}>Customer Service Address</label>
                  <div style={{ backgroundColor: 'var(--color-bg-base)', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--color-border-light)', marginTop: '4px', fontWeight: 500 }}>
                    {selectedBooking.address}
                  </div>
                </div>

                {/* Timestamp */}
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  Lead created on: {selectedBooking.createdAt ? new Date(selectedBooking.createdAt).toLocaleString('en-IN') : 'N/A'}
                </div>

                {/* Status Updater */}
                <div style={{ marginTop: '8px', paddingTop: '16px', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>Status:</label>
                    <select
                      className="form-control"
                      style={{ maxWidth: '200px', fontWeight: 700 }}
                      value={selectedBooking.status}
                      onChange={(e) => handleStatusChange(selectedBooking.bookingId, e.target.value as Booking['status'])}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="technician_assigned">Technician Assigned</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <button
                    onClick={() => handleDeleteBooking(selectedBooking.bookingId)}
                    className="btn btn-sm"
                    style={{ backgroundColor: '#FEE2E2', color: '#DC2626', border: '1px solid #FCA5A5' }}
                  >
                    <Trash2 size={14} />
                    <span>Delete Lead</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
