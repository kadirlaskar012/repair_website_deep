import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

export async function GET() {
  const xslPath = path.join(process.cwd(), 'public', 'sitemap.xsl');
  let content = '';

  try {
    content = fs.readFileSync(xslPath, 'utf-8');
  } catch (err) {
    console.error('Error reading sitemap.xsl:', err);
    return new NextResponse('Stylesheet not found', { status: 404 });
  }

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/xsl; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
