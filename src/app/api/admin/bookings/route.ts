import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth';
import { getBookings, updateBookingStatus, deleteBooking } from '@/lib/db';

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

  await updateBookingStatus(bookingId, status);
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

