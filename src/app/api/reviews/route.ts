import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getReviews, createCustomerReview } from '@/lib/db';

const reviewSubmissionSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  location: z.string().min(2, 'Location is required'),
  serviceCategory: z.string().min(2, 'Service category is required'),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(8, 'Review comment must be at least 8 characters'),
  mobile: z.string().optional()
});

export async function GET() {
  try {
    const reviews = await getReviews();
    return NextResponse.json({ success: true, reviews });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = reviewSubmissionSchema.parse(body);

    const review = await createCustomerReview({
      customerName: validated.customerName,
      location: validated.location,
      serviceCategory: validated.serviceCategory,
      rating: validated.rating,
      comment: validated.comment,
      mobile: validated.mobile
    });

    return NextResponse.json({
      success: true,
      message: 'Review submitted successfully',
      review
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const issueMsg = error.issues?.[0]?.message || 'Validation failed';
      return NextResponse.json({ success: false, error: issueMsg }, { status: 400 });
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit review' },
      { status: 500 }
    );
  }
}
