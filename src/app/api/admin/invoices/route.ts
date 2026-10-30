import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth';
import {
  getInvoices,
  createInvoice,
  getInvoiceDashboardStats
} from '@/lib/invoice-db';

export async function GET(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || undefined;
  const type = searchParams.get('type') || undefined;
  const status = searchParams.get('status') || undefined;
  const paymentStatus = searchParams.get('paymentStatus') || undefined;
  const appliance = searchParams.get('appliance') || undefined;
  const technician = searchParams.get('technician') || undefined;
  const dateFrom = searchParams.get('dateFrom') || undefined;
  const dateTo = searchParams.get('dateTo') || undefined;
  const limit = parseInt(searchParams.get('limit') || '100', 10);
  const offset = parseInt(searchParams.get('offset') || '0', 10);

  const [invoicesData, stats] = await Promise.all([
    getInvoices({
      search,
      type,
      status,
      paymentStatus,
      appliance,
      technician,
      dateFrom,
      dateTo,
      limit,
      offset
    }),
    getInvoiceDashboardStats()
  ]);

  return NextResponse.json({
    success: true,
    invoices: invoicesData.invoices,
    total: invoicesData.total,
    stats
  });
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (!body.customerName || !body.mobile) {
      return NextResponse.json(
        { error: 'Customer name and mobile number are required' },
        { status: 400 }
      );
    }

    if (!body.applianceCategory) {
      return NextResponse.json(
        { error: 'Appliance category is required' },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: 'At least one line item (service or part) is required' },
        { status: 400 }
      );
    }

    const invoice = await createInvoice(body);

    return NextResponse.json({
      success: true,
      invoice
    });
  } catch (err: any) {
    console.error('Invoice creation API error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to create invoice' },
      { status: 500 }
    );
  }
}

