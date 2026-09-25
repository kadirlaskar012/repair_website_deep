import React from 'react';
import { Metadata } from 'next';
import BookingSuccessView from '@/components/booking/BookingSuccessView';
import { getBookingById, getSiteSettings } from '@/lib/db';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: 'বুকিং নিশ্চিত হয়েছে | অ্যাপ্লায়েন্স সেবা',
    description: 'আপনার ডোরস্টেপ সার্ভিস বুকিং সফলভাবে গৃহীত হয়েছে।',
    path: '/booking-success',
    lang: 'bn',
    noIndex: true
  });
}

export default async function BengaliBookingSuccessPage({
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
      lang="bn"
    />
  );
}
