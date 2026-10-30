import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth';
import {
  getInvoiceById,
  updateInvoice,
  duplicateInvoice,
  cancelInvoice
} from '@/lib/invoice-db';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const invoice = await getInvoiceById(id);

  if (!invoice) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, invoice });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  if (body.action === 'duplicate') {
    const duplicated = await duplicateInvoice(id);
    if (!duplicated) {
      return NextResponse.json({ error: 'Failed to duplicate invoice' }, { status: 404 });
    }
    return NextResponse.json({ success: true, invoice: duplicated });
  }

  if (body.action === 'cancel') {
    const result = await cancelInvoice(id, body.reason || 'Cancelled by admin');
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({ success: true, invoice: result.invoice });
  }

  const updated = await updateInvoice(id, body);
  if (!updated) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, invoice: updated });
}

