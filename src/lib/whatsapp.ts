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

export async function sendOwnerCallMeBotNotification(booking: Booking): Promise<boolean> {
  const phone = process.env.CALLMEBOT_PHONE || '916291674186';
  const apiKey = process.env.CALLMEBOT_API_KEY;

  if (!apiKey) {
    // If API key is not configured yet, skip without error
    return false;
  }

  const cleanPhone = phone.replace(/[^\d]/g, '');
  const message = [
    `🚨 *NEW APPLIANCE BOOKING* 🚨`,
    ``,
    `📌 *ID:* ${booking.bookingId}`,
    `👤 *Name:* ${booking.name}`,
    `📞 *Call:* ${booking.mobile}`,
    `🛠️ *Service:* ${booking.serviceName || booking.service}`,
    `🏷️ *Brand:* ${booking.brand}`,
    `⚠️ *Problem:* ${booking.problem || 'General inspection'}`,
    `📍 *Address:* ${booking.address}`,
    `📅 *Date:* ${booking.preferredDate} (${booking.preferredTime})`,
    ``,
    `💰 *Visit Fee:* ₹299 (Standard)`
  ].join('\n');

  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${cleanPhone}&text=${encodeURIComponent(message)}&apikey=${apiKey}`;
    const res = await fetch(url, { method: 'GET' });
    if (res.ok) {
      console.log(`[CallMeBot] Successfully delivered WhatsApp alert to owner (${cleanPhone})`);
      return true;
    } else {
      console.warn(`[CallMeBot] Failed to send WhatsApp alert: HTTP ${res.status}`);
      return false;
    }
  } catch (err) {
    console.error('[CallMeBot] Error sending WhatsApp alert to owner:', err);
    return false;
  }
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

  // Also trigger CallMeBot free owner notification if configured
  sendOwnerCallMeBotNotification(booking).catch((e) => {
    console.warn('Background CallMeBot dispatch error:', e);
  });

  return {
    success: true,
    messageUrl: link
  };
}
