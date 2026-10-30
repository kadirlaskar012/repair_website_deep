import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth';
import {
  getSpareParts,
  saveSparePartItem,
  deleteSparePartItem
} from '@/lib/invoice-db';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const parts = await getSpareParts();
  return NextResponse.json({ success: true, parts });
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  if (!body.name || !body.category) {
    return NextResponse.json({ error: 'Part name and appliance category are required' }, { status: 400 });
  }

  const id = body.id || `sp-${Date.now()}`;
  const item = await saveSparePartItem({
    id,
    partNumber: body.partNumber || '',
    name: body.name,
    category: body.category,
    brand: body.brand || '',
    hsnCode: body.hsnCode || '85322500',
    unitPrice: Number(body.unitPrice) || 0,
    costPrice: Number(body.costPrice) || 0,
    taxRate: Number(body.taxRate) || 18,
    stockQuantity: Number(body.stockQuantity) || 0,
    warrantyPeriod: body.warrantyPeriod || '90 Days',
    isActive: body.isActive !== false
  });

  return NextResponse.json({ success: true, part: item });
}

export async function DELETE(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  await deleteSparePartItem(id);
  return NextResponse.json({ success: true, message: 'Spare part removed' });
}

