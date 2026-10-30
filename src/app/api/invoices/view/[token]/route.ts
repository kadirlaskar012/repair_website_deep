import { NextRequest, NextResponse } from 'next/server';
import { getInvoiceBySecureToken, getInvoiceSettings } from '@/lib/invoice-db';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  if (!token || token.length < 8) {
    return NextResponse.json({ error: 'Invalid or missing invoice token' }, { status: 400 });
  }

  const [invoice, settings] = await Promise.all([
    getInvoiceBySecureToken(token),
    getInvoiceSettings()
  ]);

  if (!invoice) {
    return NextResponse.json({ error: 'Invoice not found or expired link' }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    invoice,
    settings: {
      businessName: settings.businessName,
      tagline: settings.tagline,
      phone: settings.phone,
      whatsapp: settings.whatsapp,
      email: settings.email,
      website: settings.website,
      address: settings.address,
      gstin: settings.gstin,
      state: settings.state,
      currency: settings.currency,
      upiId: settings.upiId,
      bankName: settings.bankName,
      bankAccountNumber: settings.bankAccountNumber,
      bankIfsc: settings.bankIfsc,
      bankAccountName: settings.bankAccountName,
      footerMessage: settings.footerMessage,
      warrantyTerms: settings.warrantyTerms,
      termsAndConditions: settings.termsAndConditions
    }
  });
}

