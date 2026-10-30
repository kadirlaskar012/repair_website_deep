// Sends booking and invoice notifications to the admin's Telegram chat.
// Needs env vars TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID (comma-separated for multiple chats).
const esc = (s: unknown) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function sendTelegramBookingAlert(booking: any): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = (process.env.TELEGRAM_CHAT_ID || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!token || chatIds.length === 0) return;

  const text = [
    '🔔 <b>New Booking</b>',
    `🆔 ${esc(booking.bookingId)}`,
    `👤 ${esc(booking.name)}`,
    `📞 <a href="tel:+91${esc(booking.mobile)}">${esc(booking.mobile)}</a>`,
    `🛠 ${esc(booking.serviceName || booking.service)} (${esc(booking.brand)})`,
    `❗ ${esc(booking.problem)}`,
    `📍 ${esc(booking.address)}`,
    `📅 ${esc(booking.preferredDate)} | ${esc(booking.preferredTime)}`,
    booking.notes ? `📝 ${esc(booking.notes)}` : '',
  ].filter(Boolean).join('\n');

  await sendTelegram(text);
}

const STATUS_EMOJI: Record<string, string> = {
  pending: '⏳', confirmed: '✅', assigned: '👨‍🔧', completed: '🎉', cancelled: '❌',
};

export async function sendTelegramStatusAlert(booking: any, oldStatus: string, newStatus: string): Promise<void> {
  const emoji = STATUS_EMOJI[String(newStatus).toLowerCase()] || '🔄';
  const text = [
    `${emoji} <b>Status Updated: ${esc(newStatus).toUpperCase()}</b>`,
    `🆔 ${esc(booking?.bookingId)}`,
    oldStatus ? `🔁 ${esc(oldStatus)} ➜ ${esc(newStatus)}` : '',
    booking?.name ? `👤 ${esc(booking.name)}` : '',
    booking?.mobile ? `📞 <a href="tel:+91${esc(booking.mobile)}">${esc(booking.mobile)}</a>` : '',
    booking?.service ? `🛠 ${esc(booking.serviceName || booking.service)} (${esc(booking.brand)})` : '',
    booking?.address ? `📍 ${esc(booking.address)}` : '',
  ].filter(Boolean).join('\n');
  await sendTelegram(text);
}

export async function sendTelegramInvoiceAlert(invoice: any): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = (process.env.TELEGRAM_CHAT_ID || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!token || chatIds.length === 0) {
    console.warn('Telegram invoice alert skipped: TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not configured');
    return;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://applianceseva.com';
  const invoiceUrl = `${siteUrl}/invoice/${invoice.secureToken}`;
  const cleanMobile = String(invoice.mobile || '').replace(/[^\d]/g, '');

  let statusEmoji = '🔴 UNPAID';
  if (invoice.paymentStatus === 'paid') {
    statusEmoji = '🟢 PAID IN FULL';
  } else if (invoice.paymentStatus === 'partially_paid') {
    statusEmoji = '🟡 PARTIALLY PAID';
  }

  const text = [
    '🧾 <b>NEW INVOICE GENERATED</b>',
    '━━━━━━━━━━━━━━━━━━━━',
    `📄 <b>Invoice No:</b> <code>${esc(invoice.invoiceNumber)}</code>`,
    `👤 <b>Customer:</b> ${esc(invoice.customerName)}`,
    `📞 <b>Mobile:</b> <a href="tel:+91${cleanMobile}">${cleanMobile}</a>`,
    `🛠 <b>Appliance:</b> ${esc(invoice.brand || '')} ${esc(invoice.applianceCategory || '')}`.trim(),
    invoice.workPerformed ? `🔧 <b>Work Done:</b> ${esc(invoice.workPerformed)}` : '',
    `💰 <b>Grand Total:</b> ₹${Number(invoice.grandTotal || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
    `💳 <b>Payment:</b> ${statusEmoji}`,
    Number(invoice.balanceDue || 0) > 0 ? `⚠️ <b>Balance Due:</b> ₹${Number(invoice.balanceDue).toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : '',
    invoice.warrantyDuration && invoice.warrantyDuration !== 'None' ? `🛡 <b>Warranty:</b> ${esc(invoice.warrantyDuration)}` : '',
    invoice.technicianName ? `👨‍🔧 <b>Technician:</b> ${esc(invoice.technicianName)}` : '',
    `📅 <b>Date:</b> ${esc(invoice.invoiceDate)}`,
    '━━━━━━━━━━━━━━━━━━━━'
  ].filter(Boolean).join('\n');

  const waText = encodeURIComponent(
    `Hello ${invoice.customerName},\nThank you for choosing Appliance Seva.\nYour invoice ${invoice.invoiceNumber} for ${invoice.brand || ''} ${invoice.applianceCategory || ''} is ready.\nTotal: ₹${invoice.grandTotal}\nPayment Status: ${String(invoice.paymentStatus).toUpperCase()}\n\nView & Download Invoice:\n${invoiceUrl}\n\nThank you,\nAppliance Seva\napplianceseva.com`
  );

  const replyMarkup = {
    inline_keyboard: [
      [
        { text: '📄 Open Official PDF Invoice', url: invoiceUrl },
        { text: '💬 WhatsApp Customer', url: `https://wa.me/91${cleanMobile}?text=${waText}` }
      ]
    ]
  };

  await Promise.all(
    chatIds.map((chat_id) =>
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id,
          text,
          parse_mode: 'HTML',
          disable_web_page_preview: false,
          reply_markup: replyMarkup
        }),
      }).then(async (r) => {
        if (!r.ok) console.error('Telegram invoice alert failed:', r.status, await r.text());
      })
    )
  );
}

async function sendTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = (process.env.TELEGRAM_CHAT_ID || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!token || chatIds.length === 0) {
    console.warn('Telegram alert skipped: TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set');
    return;
  }
  await Promise.all(
    chatIds.map((chat_id) =>
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id, text, parse_mode: 'HTML', disable_web_page_preview: true }),
      }).then(async (r) => {
        if (!r.ok) console.error('Telegram alert failed:', r.status, await r.text());
      })
    )
  );
}
