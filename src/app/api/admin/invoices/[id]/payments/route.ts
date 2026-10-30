import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth';
import { recordInvoicePayment } from '@/lib/invoice-db';
import { sendTelegramInvoiceAlert } from '@/lib/telegram';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  if (!body.amount || Number(body.amount) <= 0) {
    return NextResponse.json({ error: 'A valid payment amount is required' }, { status: 400 });
  }

  if (!body.method) {
    return NextResponse.json({ error: 'Payment method is required' }, { status: 400 });
  }

  const result = await recordInvoicePayment(id, {
    amount: Number(body.amount),
    method: body.method,
    paymentDate: body.paymentDate,
    transactionRef: body.transactionRef,
    notes: body.notes
  });

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  if (result.invoice) {
    sendTelegramInvoiceAlert(result.invoice).catch((err) => {
      console.warn('Telegram payment update alert error:', err);
    });
  }

  return NextResponse.json({ success: true, invoice: result.invoice });
}

