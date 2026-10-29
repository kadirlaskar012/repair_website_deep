// Sends a booking notification to the admin's Telegram chat.
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
