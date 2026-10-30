import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth';
import {
  getServiceCatalog,
  saveServiceCatalogItem,
  deleteServiceCatalogItem
} from '@/lib/invoice-db';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const services = await getServiceCatalog();
  return NextResponse.json({ success: true, services });
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  if (!body.category || !body.name) {
    return NextResponse.json({ error: 'Category and service name are required' }, { status: 400 });
  }

  const id = body.id || `srv-${Date.now()}`;
  const item = await saveServiceCatalogItem({
    id,
    category: body.category,
    name: body.name,
    hsnSac: body.hsnSac || '998717',
    defaultPrice: Number(body.defaultPrice) || 0,
    defaultTaxRate: Number(body.defaultTaxRate) || 0,
    description: body.description || '',
    isActive: body.isActive !== false
  });

  return NextResponse.json({ success: true, service: item });
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

  await deleteServiceCatalogItem(id);
  return NextResponse.json({ success: true, message: 'Service removed' });
}

