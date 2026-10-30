import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth';
import { getCustomers, findOrCreateCustomer } from '@/lib/invoice-db';

export async function GET(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || undefined;

  const customers = await getCustomers(query);
  return NextResponse.json({ success: true, customers });
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  if (!body.name || !body.mobile) {
    return NextResponse.json({ error: 'Name and mobile number are required' }, { status: 400 });
  }

  const customer = await findOrCreateCustomer(body);
  return NextResponse.json({ success: true, customer });
}

