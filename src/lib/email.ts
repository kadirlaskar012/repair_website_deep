import nodemailer from 'nodemailer';
import { Booking } from './types';

export interface EmailDispatchResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendBookingLeadEmail(toEmail: string, booking: Booking): Promise<EmailDispatchResult> {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || `Appliance Seva <applianceseva@gmail.com>`;

  const emailSubject = `[NEW LEAD] ${booking.serviceName || booking.service} - ${booking.name} (${booking.bookingId})`;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>New Service Booking Lead</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f9f8; color: #1e2926; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8e5; overflow: hidden; }
          .header { background-color: #146C5B; color: #ffffff; padding: 24px; text-align: left; }
          .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; }
          .header p { margin: 0; font-size: 14px; opacity: 0.9; }
          .content { padding: 24px; }
          .badge { display: inline-block; background: #E8A33D; color: #ffffff; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: bold; margin-bottom: 16px; }
          .lead-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          .lead-table td { padding: 10px 12px; border-bottom: 1px solid #edf2f0; font-size: 14px; }
          .lead-table td.label { width: 35%; font-weight: 600; color: #526360; background: #fbfdfc; }
          .lead-table td.value { width: 65%; color: #111a18; font-weight: 500; }
          .footer { background: #f4f7f5; padding: 16px 24px; font-size: 12px; color: #6b7c78; text-align: center; border-top: 1px solid #e2e8e5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Service Booking Received</h1>
            <p>A new customer booking request has been submitted on applianceseva.com</p>
          </div>
          <div class="content">
            <span class="badge">BOOKING ID: ${booking.bookingId}</span>
            <table class="lead-table">
              <tr>
                <td class="label">Customer Name</td>
                <td class="value"><strong>${booking.name}</strong></td>
              </tr>
              <tr>
                <td class="label">Mobile Number</td>
                <td class="value"><a href="tel:${booking.mobile}" style="color: #146C5B; font-weight: 600; text-decoration: none;">${booking.mobile}</a></td>
              </tr>
              <tr>
                <td class="label">Service Category</td>
                <td class="value">${booking.serviceName || booking.service}</td>
              </tr>
              <tr>
                <td class="label">Brand</td>
                <td class="value">${booking.brand}</td>
              </tr>
              <tr>
                <td class="label">Problem Reported</td>
                <td class="value">${booking.problem}</td>
              </tr>
              <tr>
                <td class="label">Customer Address</td>
                <td class="value">${booking.address}</td>
              </tr>
              <tr>
                <td class="label">Preferred Date</td>
                <td class="value">${booking.preferredDate}</td>
              </tr>
              <tr>
                <td class="label">Preferred Time Slot</td>
                <td class="value">${booking.preferredTime}</td>
              </tr>
              <tr>
                <td class="label">Diagnosis Fee</td>
                <td class="value">₹299 (Inspection & Estimate)</td>
              </tr>
            </table>
          </div>
          <div class="footer">
            <p>Sent automatically from Appliance Seva Lead Engine &bull; West Bengal Doorstep Operations</p>
          </div>
        </div>
      </body>
    </html>
  `;

  // If SMTP is not yet configured, log to console and succeed gracefully (so test bookings don't fail)
  if (!host || !user || !pass) {
    console.log(`[EMAIL DISPATCH SIMULATION] To: ${toEmail} | Subject: ${emailSubject}`);
    return {
      success: true,
      messageId: `simulated-${Date.now()}`
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass
      }
    });

    const info = await transporter.sendMail({
      from,
      to: toEmail,
      subject: emailSubject,
      html: emailHtml
    });

    return {
      success: true,
      messageId: info.messageId
    };
  } catch (err: any) {
    console.error('Failed to send booking lead email:', err);
    return {
      success: false,
      error: err?.message || 'Email delivery failed'
    };
  }
}
