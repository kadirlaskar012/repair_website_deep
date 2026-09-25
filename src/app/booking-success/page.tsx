import React from 'react';
import { Metadata } from 'next';
import BookingSuccessView from '@/components/booking/BookingSuccessView';
import { getBookingById, getSiteSettings } from '@/lib/db';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: 'Booking Confirmed | Appliance Seva',
    description: 'Your appliance repair service booking has been registered successfully.',
    path: '/booking-success',
    noIndex: true
  });
}

export default async function BookingSuccessPage({
  searchParams
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  const bookingId = id || 'ACR-CONFIRMED';
  const booking = id ? await getBookingById(id) : null;
  const settings = await getSiteSettings();

  return (
    <BookingSuccessView
      booking={booking}
      bookingId={bookingId}
      settings={settings}
      lang="en"
    />
  );
}
