import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth';
import { getMediaAssets } from '@/lib/db';
import { uploadLocalFile, deleteLocalFile } from '@/lib/storage';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const assets = await getMediaAssets();
  return NextResponse.json({ success: true, assets });
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const altText = (formData.get('altText') as string) || '';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const asset = await uploadLocalFile(file, altText);
    return NextResponse.json({ success: true, asset });
  } catch (err: any) {
    console.error('Media upload error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const filename = searchParams.get('filename');

  if (!id || !filename) {
    return NextResponse.json({ error: 'id and filename are required' }, { status: 400 });
  }

  await deleteLocalFile(filename, id);
  return NextResponse.json({ success: true });
}
