'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Booking } from '@/lib/types';
import { Calendar, Phone, MapPin, Wrench, Search, RefreshCw, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/bookings');
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings || []);
      }
    } catch (e) {
      console.error(e);
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
      console.error(e);
    }
  };

  const filtered = bookings.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.mobile.includes(search) ||
    b.bookingId.toLowerCase().includes(search.toLowerCase()) ||
    b.service.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return <span style={{ background: '#DEF7EC', color: '#03543F', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>Confirmed</span>;
      case 'technician_assigned':
        return <span style={{ background: '#E1EFFE', color: '#1E429F', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>Assigned</span>;
      case 'completed':
        return <span style={{ background: '#F3F4F6', color: '#1F2A37', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>Completed</span>;
      case 'cancelled':
        return <span style={{ background: '#FDE8E8', color: '#9B1C1C', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>Cancelled</span>;
      case 'pending':
      default:
        return <span style={{ background: '#FEF08A', color: '#713F12', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>Pending</span>;
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '4px' }}>
              Service Booking Leads
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              Incoming doorstep repair appointments across West Bengal
            </p>
          </div>

          <button
            onClick={fetchBookings}
            className="btn btn-outline btn-sm"
          >
            <RefreshCw size={15} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Filter bar */}
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative', maxWidth: '360px', width: '100%' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
            <input
              type="text"
              className="form-control"
              style={{ paddingLeft: '38px', fontSize: '0.875rem' }}
              placeholder="Search by ID, name, mobile, service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
            Showing {filtered.length} leads
          </span>
        </div>

        {/* Table */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>Loading bookings...</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>
              No booking leads found.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead style={{ backgroundColor: 'var(--color-bg-warm)', borderBottom: '1px solid var(--color-border)' }}>
                  <tr>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-text-muted)' }}>Booking ID</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-text-muted)' }}>Customer</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-text-muted)' }}>Mobile</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-text-muted)' }}>Service & Brand</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-text-muted)' }}>Appointment</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-text-muted)' }}>Status</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-text-muted)' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b) => (
                    <tr key={b.bookingId} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 700, color: 'var(--color-primary)' }}>
                        {b.bookingId}
                      </td>
                      <td style={{ padding: '14px 16px', fontWeight: 600 }}>
                        {b.name}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <a href={`tel:${b.mobile}`} style={{ color: 'var(--color-text-main)', textDecoration: 'none' }}>
                          {b.mobile}
                        </a>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div><strong>{b.serviceName || b.service}</strong></div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{b.brand}</div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div>{b.preferredDate}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{b.preferredTime}</div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        {getStatusBadge(b.status)}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <button
                          onClick={() => setSelectedBooking(b)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Booking Details Modal */}
        {selectedBooking && (
          <div className="modal-overlay" onClick={() => setSelectedBooking(null)}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Lead Details</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                    {selectedBooking.bookingId}
                  </h3>
                </div>
                <button onClick={() => setSelectedBooking(null)} style={{ background: 'var(--color-bg-alt)', padding: '6px', borderRadius: '6px' }}>
                  ✕
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.875rem' }}>
                <div><strong>Customer Name:</strong> {selectedBooking.name}</div>
                <div><strong>Mobile:</strong> <a href={`tel:${selectedBooking.mobile}`} style={{ color: 'var(--color-primary)' }}>{selectedBooking.mobile}</a></div>
                <div><strong>Service:</strong> {selectedBooking.serviceName || selectedBooking.service}</div>
                <div><strong>Brand:</strong> {selectedBooking.brand}</div>
                <div><strong>Reported Problem:</strong> {selectedBooking.problem}</div>
                <div><strong>Customer Address:</strong> {selectedBooking.address}</div>
                <div><strong>Preferred Schedule:</strong> {selectedBooking.preferredDate} ({selectedBooking.preferredTime})</div>
                <div><strong>Diagnosis Fee:</strong> ₹299 (Due on physical inspection)</div>
                <div><strong>Submitted At:</strong> {selectedBooking.createdAt}</div>

                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
                  <label className="form-label">Update Booking Status</label>
                  <select
                    className="form-control"
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
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
