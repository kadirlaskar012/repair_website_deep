import { Booking } from './types';

export function formatWhatsAppBookingMessage(booking: Booking): string {
  return [
    `*New Service Booking*`,
    ``,
    `*Booking ID:* ${booking.bookingId}`,
    `*Name:* ${booking.name}`,
    `*Mobile:* ${booking.mobile}`,
    `*Service:* ${booking.serviceName || booking.service}`,
    `*Brand:* ${booking.brand}`,
    `*Problem:* ${booking.problem}`,
    `*Address:* ${booking.address}`,
    `*Preferred Date:* ${booking.preferredDate}`,
    `*Preferred Time:* ${booking.preferredTime}`,
    ``,
    `_Standard Diagnosis Fee: ₹299 (Inspection & Estimate)_`
  ].join('\n');
}

export function buildWhatsAppLink(whatsappNumber: string, message: string): string {
  // Strip non-digit characters except leading plus
  const cleanNumber = whatsappNumber.replace(/[^\d]/g, '');
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encoded}`;
}

export function buildDirectWhatsAppInquiryLink(whatsappNumber: string, initialText?: string): string {
  const cleanNumber = whatsappNumber.replace(/[^\d]/g, '');
  const defaultText = initialText || 'Hello, I need appliance repair service in West Bengal. Please share details.';
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(defaultText)}`;
}

export interface WhatsAppNotificationResult {
  success: boolean;
  messageUrl: string;
}

export async function dispatchWhatsAppLead(whatsappNumber: string, booking: Booking): Promise<WhatsAppNotificationResult> {
  const message = formatWhatsAppBookingMessage(booking);
  const link = buildWhatsAppLink(whatsappNumber, message);

  // In production, an external webhook/WhatsApp Business API (e.g. Meta Cloud API, Gupshup, Twilio)
  // can be invoked here. If a webhook URL is configured:
  const webhookUrl = process.env.WHATSAPP_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: whatsappNumber, message, booking })
      });
    } catch (err) {
      console.warn('WhatsApp webhook call failed:', err);
    }
  }

  return {
    success: true,
    messageUrl: link
  };
}
