import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth';
import { getBookings, updateBookingStatus, deleteBooking, getBookingById } from '@/lib/db';
import { sendTelegramStatusAlert } from '@/lib/telegram';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const bookings = await getBookings();
  return NextResponse.json({ success: true, bookings });
}

export async function PUT(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { bookingId, status } = await req.json();
  if (!bookingId || !status) {
    return NextResponse.json({ error: 'bookingId and status are required' }, { status: 400 });
  }

  const before = await getBookingById(bookingId).catch(() => null);
  await updateBookingStatus(bookingId, status);
  const oldStatus = (before as any)?.status || '';
  if (String(oldStatus).toLowerCase() !== String(status).toLowerCase()) {
    await sendTelegramStatusAlert({ ...(before || {}), bookingId }, oldStatus, status).catch((err) =>
      console.error('Telegram status alert failed:', err)
    );
  }
  return NextResponse.json({ success: true, message: 'Status updated' });
}

export async function DELETE(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const bookingId = searchParams.get('bookingId');
  if (!bookingId) {
    return NextResponse.json({ error: 'bookingId is required' }, { status: 400 });
  }

  await deleteBooking(bookingId);
  return NextResponse.json({ success: true, message: 'Booking lead deleted' });
}

