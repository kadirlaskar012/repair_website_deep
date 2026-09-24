import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createBooking, getSiteSettings } from '@/lib/db';
import { sendBookingLeadEmail } from '@/lib/email';
import { dispatchWhatsAppLead, buildWhatsAppLink, formatWhatsAppBookingMessage } from '@/lib/whatsapp';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Must be a valid 10-digit Indian mobile number'),
  service: z.string().min(1, 'Service category is required'),
  serviceName: z.string().optional(),
  brand: z.string().min(1, 'Brand is required'),
  problem: z.string().min(3, 'Problem description is required'),
  address: z.string().min(8, 'Address must be at least 8 characters'),
  preferredDate: z.string().min(10, 'Valid preferred date is required'),
  preferredTime: z.string().min(3, 'Preferred time slot is required'),
  notes: z.string().optional(),
  lang: z.enum(['en', 'bn']).optional()
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = bookingSchema.parse(body);

    const settings = await getSiteSettings();

    // 1. Save booking to Hostinger MySQL (with unique Booking ID generation)
    const booking = await createBooking({
      name: validated.name,
      mobile: validated.mobile,
      service: validated.service,
      serviceName: validated.serviceName || validated.service,
      brand: validated.brand,
      problem: validated.problem,
      address: validated.address,
      preferredDate: validated.preferredDate,
      preferredTime: validated.preferredTime,
      notes: validated.notes || ''
    });

    // 2. Send lead email to configured business email (server-side, no customer email)
    if (settings.email) {
      // Async dispatch without blocking response
      sendBookingLeadEmail(settings.email, booking).catch((err) => {
        console.error('Background lead email dispatch failed:', err);
      });
    }

    // 3. Dispatch / prepare WhatsApp workflow
    const whatsappResult = await dispatchWhatsAppLead(settings.whatsapp, booking);

    return NextResponse.json({
      success: true,
      booking: {
        bookingId: booking.bookingId,
        name: booking.name,
        service: booking.serviceName || booking.service,
        date: booking.preferredDate,
        time: booking.preferredTime
      },
      whatsappUrl: whatsappResult.messageUrl
    });
  } catch (err: any) {
    console.error('Booking creation error:', err);
    if (err instanceof z.ZodError) {
      const issueMsg = err.issues?.[0]?.message || (err as any).errors?.[0]?.message || 'Validation error';
      return NextResponse.json(
        { success: false, error: issueMsg },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error while processing booking' },
      { status: 500 }
    );
  }
}
