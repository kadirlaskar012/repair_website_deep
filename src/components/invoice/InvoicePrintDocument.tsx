'use client';

import React from 'react';
import { Invoice, InvoiceSettings } from '@/lib/invoice-types';
import {
  Wrench,
  ShieldCheck,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Globe,
  QrCode
} from 'lucide-react';

interface InvoicePrintDocumentProps {
  invoice: Invoice;
  settings: Partial<InvoiceSettings>;
}

export default function InvoicePrintDocument({
  invoice,
  settings
}: InvoicePrintDocumentProps) {
  const isPaid = invoice.paymentStatus === 'paid';
  const isPartiallyPaid = invoice.paymentStatus === 'partially_paid';
  const isCancelled = invoice.status === 'cancelled';

  const brandName = settings.businessName || 'APPLIANCE SEVA';
  const tagline = settings.tagline || 'Professional Home Appliance Repair & Service';
  const phone = settings.phone || '+91 6291674186';
  const email = settings.email || 'applianceseva@gmail.com';
  const address = settings.address || 'Salt Lake Sector V, Kolkata, West Bengal - 700091';
  const website = settings.website || 'https://applianceseva.com';
  const gstin = settings.gstin || '';
  const upiId = settings.upiId || '6291674186@paytm';

  // Dynamic UPI URL for quick QR code pay if balance due > 0
  const upiPayUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(brandName)}&am=${invoice.balanceDue}&cu=INR&tn=${encodeURIComponent(`Invoice ${invoice.invoiceNumber}`)}`;
  const qrCodeImgSrc = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(upiPayUrl)}`;

  return (
    <div className="invoice-a4-sheet" id={`printable-invoice-${invoice.invoiceNumber}`}>
      {/* =========================================================
          TOP ACCENT BAR & HEADER
          ========================================================= */}
      <div className="inv-top-bar" />

      <header className="inv-header">
        <div className="inv-header-left">
          <div className="inv-brand-wrapper">
            <div className="inv-logo-box">
              <img
                src="/logo-icon.svg"
                alt={brandName}
                width={48}
                height={48}
                className="inv-logo-img"
              />
            </div>
            <div>
              <h1 className="inv-brand-title">{brandName}</h1>
              <p className="inv-brand-tagline">{tagline}</p>
            </div>
          </div>

          <div className="inv-company-meta">
            <div className="meta-line">
              <MapPin size={12} className="meta-icon" />
              <span>{address}</span>
            </div>
            <div className="meta-line-group">
              <div className="meta-line">
                <Phone size={12} className="meta-icon" />
                <span>{phone}</span>
              </div>
              <div className="meta-line">
                <Mail size={12} className="meta-icon" />
                <span>{email}</span>
              </div>
            </div>
            <div className="meta-line-group">
              <div className="meta-line">
                <Globe size={12} className="meta-icon" />
                <span>applianceseva.com</span>
              </div>
              {gstin && (
                <div className="meta-line gstin-line">
                  <strong>GSTIN:</strong> <span>{gstin}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="inv-header-right">
          <div className="inv-badge-type">
            {invoice.isGst ? 'TAX INVOICE' : 'SERVICE INVOICE'}
          </div>
          <div className="inv-number-display">{invoice.invoiceNumber}</div>

          <div className="inv-dates-card">
            <div className="date-row">
              <span className="date-lbl">Invoice Date:</span>
              <span className="date-val">{invoice.invoiceDate}</span>
            </div>
            <div className="date-row">
              <span className="date-lbl">Service Date:</span>
              <span className="date-val">{invoice.serviceDate}</span>
            </div>
            <div className="date-row">
              <span className="date-lbl">Due Date:</span>
              <span className="date-val">{invoice.dueDate}</span>
            </div>
          </div>

          <div className="inv-status-tag-wrapper">
            <span
              className={`inv-status-pill ${
                isCancelled
                  ? 'status-cancelled'
                  : isPaid
                  ? 'status-paid'
                  : isPartiallyPaid
                  ? 'status-partial'
                  : 'status-unpaid'
              }`}
            >
              {isCancelled
                ? 'CANCELLED'
                : isPaid
                ? '✓ PAID IN FULL'
                : isPartiallyPaid
                ? 'PARTIALLY PAID'
                : 'PAYMENT DUE'}
            </span>
          </div>
        </div>
      </header>

      {/* =========================================================
          INFO TWO-COLUMN GRID: CUSTOMER & APPLIANCE
          ========================================================= */}
      <section className="inv-grid-section">
        {/* Customer Bill To Card */}
        <div className="inv-card">
          <div className="inv-card-header">
            <span className="inv-card-tag">BILL TO</span>
            <h3 className="inv-card-title">{invoice.customerName}</h3>
          </div>
          <div className="inv-card-body">
            <p className="cust-addr">
              {[
                invoice.houseNumber,
                invoice.streetAddress,
                invoice.locality,
                invoice.city,
                `${invoice.state} - ${invoice.pincode}`
              ]
                .filter(Boolean)
                .join(', ')}
            </p>
            <div className="cust-contacts">
              <div className="contact-item">
                <span className="lbl">Mobile:</span>
                <span className="val">+91 {invoice.mobile}</span>
              </div>
              {invoice.email && (
                <div className="contact-item">
                  <span className="lbl">Email:</span>
                  <span className="val">{invoice.email}</span>
                </div>
              )}
              {invoice.customerGstin && (
                <div className="contact-item">
                  <span className="lbl">Customer GSTIN:</span>
                  <span className="val">{invoice.customerGstin}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Appliance & Service Details Card */}
        <div className="inv-card">
          <div className="inv-card-header">
            <span className="inv-card-tag">APPLIANCE & JOB DETAILS</span>
            <h3 className="inv-card-title">
              {invoice.brand} {invoice.applianceCategory}
            </h3>
          </div>
          <div className="inv-card-body">
            <div className="appliance-specs-grid">
              {invoice.modelNumber && (
                <div className="spec-item">
                  <span className="lbl">Model:</span>
                  <span className="val">{invoice.modelNumber}</span>
                </div>
              )}
              {invoice.serialNumber && (
                <div className="spec-item">
                  <span className="lbl">Serial:</span>
                  <span className="val">{invoice.serialNumber}</span>
                </div>
              )}
              <div className="spec-item">
                <span className="lbl">Technician:</span>
                <span className="val">{invoice.technicianName || 'Certified Engineer'}</span>
              </div>
              {invoice.bookingId && (
                <div className="spec-item">
                  <span className="lbl">Job Ref #:</span>
                  <span className="val">{invoice.bookingId}</span>
                </div>
              )}
            </div>
            {invoice.problemDescription && (
              <div className="job-desc-box">
                <strong>Reported Issue:</strong> {invoice.problemDescription}
              </div>
            )}
            {invoice.workPerformed && (
              <div className="job-desc-box work-performed">
                <strong>Work Done:</strong> {invoice.workPerformed}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          DYNAMIC BILLING TABLE
          ========================================================= */}
      <section className="inv-table-section">
        <table className="inv-table">
          <thead>
            <tr>
              <th className="th-num">#</th>
              <th className="th-desc">Description of Service / Spare Parts</th>
              <th className="th-hsn">HSN/SAC</th>
              <th className="th-qty">Qty</th>
              <th className="th-price">Rate (₹)</th>
              {invoice.discountTotal > 0 && <th className="th-disc">Disc</th>}
              {invoice.isGst && <th className="th-tax">Tax</th>}
              <th className="th-amount">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, idx) => (
              <tr key={item.id || idx}>
                <td className="td-num">{idx + 1}</td>
                <td className="td-desc">
                  <span className="item-title">{item.description}</span>
                  <span className="item-type-badge">
                    {item.itemType === 'spare_part'
                      ? 'Spare Part'
                      : item.itemType === 'service'
                      ? 'Service'
                      : item.itemType === 'visiting'
                      ? 'Visiting / Inspection'
                      : item.itemType === 'labour'
                      ? 'Labour'
                      : 'Charge'}
                  </span>
                </td>
                <td className="td-hsn">{item.hsnSac || '998717'}</td>
                <td className="td-qty">{item.quantity}</td>
                <td className="td-price">₹{item.unitPrice.toFixed(2)}</td>
                {invoice.discountTotal > 0 && (
                  <td className="td-disc">
                    {item.discount > 0 ? `₹${item.discount.toFixed(2)}` : '—'}
                  </td>
                )}
                {invoice.isGst && (
                  <td className="td-tax">
                    {item.taxRate > 0 ? `${item.taxRate}%` : '0%'}
                  </td>
                )}
                <td className="td-amount">₹{item.totalAmount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* =========================================================
          CALCULATION TOTALS & PAYMENT SECTION
          ========================================================= */}
      <section className="inv-totals-section">
        {/* Left: Warranty & Payment Mode Note */}
        <div className="inv-terms-container">
          {/* Warranty Badge Banner */}
          {invoice.warrantyDuration && (
            <div className="inv-warranty-box">
              <div className="warranty-title">
                <ShieldCheck size={16} className="text-emerald-700" />
                <span>{invoice.warrantyDuration} Official Service Warranty</span>
              </div>
              <p className="warranty-text">
                {invoice.warrantyTerms ||
                  'Protected with Appliance Seva 90-day spare parts warranty & 30-day workmanship assurance.'}
              </p>
              {invoice.warrantyStartDate && (
                <div className="warranty-dates">
                  Valid from <strong>{invoice.warrantyStartDate}</strong> to{' '}
                  <strong>{invoice.warrantyEndDate}</strong>
                </div>
              )}
            </div>
          )}

          {/* Payment Method / Bank Details */}
          <div className="inv-bank-box">
            <h4 className="bank-title">Payment & UPI Details</h4>
            <div className="bank-meta">
              <div>
                <span>UPI ID: </span>
                <strong>{upiId}</strong>
              </div>
              {settings.bankName && (
                <div>
                  <span>Bank: </span>
                  <strong>{settings.bankName}</strong>
                </div>
              )}
              {settings.bankAccountNumber && (
                <div>
                  <span>A/C No: </span>
                  <strong>{settings.bankAccountNumber}</strong>
                </div>
              )}
              {settings.bankIfsc && (
                <div>
                  <span>IFSC: </span>
                  <strong>{settings.bankIfsc}</strong>
                </div>
              )}
            </div>

            {/* If balance is pending, show UPI QR code on print */}
            {!isPaid && !isCancelled && invoice.balanceDue > 0 && (
              <div className="inv-qr-wrapper">
                <img
                  src={qrCodeImgSrc}
                  alt="Scan to Pay via UPI"
                  width={96}
                  height={96}
                  className="upi-qr-img"
                />
                <div className="qr-caption">
                  <div className="font-bold text-gray-800">Scan &amp; Pay via UPI</div>
                  <div className="text-xs text-gray-500">Paytm, GPay, PhonePe, BHIM</div>
                  <div className="text-emerald-700 font-extrabold text-xs mt-0.5">
                    Amount: ₹{invoice.balanceDue.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Calculations Breakdown */}
        <div className="inv-summary-table-box">
          <div className="sum-row">
            <span className="lbl">Service Subtotal:</span>
            <span className="val">₹{invoice.serviceSubtotal.toFixed(2)}</span>
          </div>

          {invoice.partsSubtotal > 0 && (
            <div className="sum-row">
              <span className="lbl">Spare Parts Subtotal:</span>
              <span className="val">₹{invoice.partsSubtotal.toFixed(2)}</span>
            </div>
          )}

          {invoice.additionalCharges > 0 && (
            <div className="sum-row">
              <span className="lbl">Additional Charges:</span>
              <span className="val">₹{invoice.additionalCharges.toFixed(2)}</span>
            </div>
          )}

          {invoice.discountTotal > 0 && (
            <div className="sum-row disc-row">
              <span className="lbl">Total Discount:</span>
              <span className="val">-₹{invoice.discountTotal.toFixed(2)}</span>
            </div>
          )}

          {invoice.isGst && (
            <>
              <div className="sum-row border-t border-gray-200 pt-1">
                <span className="lbl">Taxable Amount:</span>
                <span className="val">₹{invoice.taxableAmount.toFixed(2)}</span>
              </div>
              {invoice.cgst > 0 && (
                <div className="sum-row text-xs">
                  <span className="lbl">CGST:</span>
                  <span className="val">₹{invoice.cgst.toFixed(2)}</span>
                </div>
              )}
              {invoice.sgst > 0 && (
                <div className="sum-row text-xs">
                  <span className="lbl">SGST:</span>
                  <span className="val">₹{invoice.sgst.toFixed(2)}</span>
                </div>
              )}
              {invoice.igst > 0 && (
                <div className="sum-row text-xs">
                  <span className="lbl">IGST:</span>
                  <span className="val">₹{invoice.igst.toFixed(2)}</span>
                </div>
              )}
            </>
          )}

          {invoice.roundOff !== 0 && (
            <div className="sum-row text-xs text-gray-500">
              <span className="lbl">Round-Off:</span>
              <span className="val">
                {invoice.roundOff > 0 ? `+₹${invoice.roundOff.toFixed(2)}` : `-₹${Math.abs(invoice.roundOff).toFixed(2)}`}
              </span>
            </div>
          )}

          <div className="sum-row grand-total-row">
            <span className="lbl">Grand Total:</span>
            <span className="val">₹{invoice.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>

          <div className="sum-row paid-row">
            <span className="lbl">Amount Paid:</span>
            <span className="val">₹{invoice.amountPaid.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>

          <div className={`sum-row due-row ${invoice.balanceDue > 0 ? 'text-red-700' : 'text-emerald-700'}`}>
            <span className="lbl">Balance Due:</span>
            <span className="val">₹{invoice.balanceDue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </section>

      {/* =========================================================
          PAYMENTS HISTORY (IF ANY)
          ========================================================= */}
      {invoice.payments && invoice.payments.length > 0 && (
        <section className="inv-payment-history-section">
          <div className="sec-label">Payment Transaction Record:</div>
          <div className="pay-history-grid">
            {invoice.payments.map((p, idx) => (
              <div key={p.id || idx} className="pay-record-pill">
                <span className="pay-mode">{p.method.toUpperCase()}</span>
                <span className="pay-amt">₹{p.amount.toLocaleString('en-IN')}</span>
                <span className="pay-dt">{p.paymentDate}</span>
                {p.transactionRef && <span className="pay-ref">Ref: {p.transactionRef}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================
          SIGNATURE & TERMS FOOTER
          ========================================================= */}
      <footer className="inv-footer">
        <div className="inv-terms-block">
          <strong>Terms &amp; Conditions:</strong>
          <p className="whitespace-pre-line text-xs text-gray-500 mt-1">
            {invoice.termsAndConditions || settings.termsAndConditions}
          </p>
        </div>

        <div className="inv-sig-block">
          <div className="sig-space" />
          <div className="sig-line">Authorized Signatory</div>
          <div className="sig-brand">{brandName}</div>
        </div>
      </footer>

      <div className="inv-bottom-brand-note">
        {settings.footerMessage ||
          'Thank you for choosing Appliance Seva! For genuine appliance servicing and repairs, visit applianceseva.com'}
      </div>
    </div>
  );
}

