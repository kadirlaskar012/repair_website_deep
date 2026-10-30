import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth';
import { getInvoices } from '@/lib/invoice-db';

export async function GET(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const dateFrom = searchParams.get('dateFrom') || undefined;
  const dateTo = searchParams.get('dateTo') || undefined;

  const { invoices } = await getInvoices({
    dateFrom,
    dateTo,
    limit: 10000
  });

  const validInvoices = invoices.filter((i) => i.status !== 'cancelled');

  let totalBilled = 0;
  let totalReceived = 0;
  let totalOutstanding = 0;
  let totalGstTax = 0;
  let totalCgst = 0;
  let totalSgst = 0;
  let totalIgst = 0;
  let totalTaxableValue = 0;

  const applianceMap: Record<string, { count: number; billed: number; received: number }> = {};
  const technicianMap: Record<string, { count: number; billed: number; received: number }> = {};
  const dateMap: Record<string, { count: number; billed: number; received: number }> = {};
  const partsMap: Record<string, { qty: number; total: number }> = {};

  validInvoices.forEach((inv) => {
    totalBilled += inv.grandTotal;
    totalReceived += inv.amountPaid;
    totalOutstanding += inv.balanceDue;

    if (inv.isGst) {
      totalGstTax += inv.taxTotal;
      totalCgst += inv.cgst;
      totalSgst += inv.sgst;
      totalIgst += inv.igst;
      totalTaxableValue += inv.taxableAmount;
    }

    // Appliance breakdown
    const app = inv.applianceCategory || 'Other';
    if (!applianceMap[app]) applianceMap[app] = { count: 0, billed: 0, received: 0 };
    applianceMap[app].count += 1;
    applianceMap[app].billed += inv.grandTotal;
    applianceMap[app].received += inv.amountPaid;

    // Technician breakdown
    const tech = inv.technicianName || 'Unassigned';
    if (!technicianMap[tech]) technicianMap[tech] = { count: 0, billed: 0, received: 0 };
    technicianMap[tech].count += 1;
    technicianMap[tech].billed += inv.grandTotal;
    technicianMap[tech].received += inv.amountPaid;

    // Daily breakdown
    const dt = inv.invoiceDate;
    if (!dateMap[dt]) dateMap[dt] = { count: 0, billed: 0, received: 0 };
    dateMap[dt].count += 1;
    dateMap[dt].billed += inv.grandTotal;
    dateMap[dt].received += inv.amountPaid;

    // Spare parts sales breakdown
    inv.items.forEach((item) => {
      if (item.itemType === 'spare_part') {
        const pName = item.description;
        if (!partsMap[pName]) partsMap[pName] = { qty: 0, total: 0 };
        partsMap[pName].qty += item.quantity;
        partsMap[pName].total += item.totalAmount;
      }
    });
  });

  const dailyTrend = Object.keys(dateMap)
    .sort()
    .map((date) => ({
      date,
      count: dateMap[date].count,
      billed: Math.round(dateMap[date].billed),
      received: Math.round(dateMap[date].received)
    }));

  const applianceReport = Object.keys(applianceMap).map((name) => ({
    name,
    count: applianceMap[name].count,
    billed: Math.round(applianceMap[name].billed),
    received: Math.round(applianceMap[name].received)
  }));

  const technicianReport = Object.keys(technicianMap).map((name) => ({
    name,
    count: technicianMap[name].count,
    billed: Math.round(technicianMap[name].billed),
    received: Math.round(technicianMap[name].received)
  }));

  const sparePartsReport = Object.keys(partsMap).map((name) => ({
    name,
    quantity: partsMap[name].qty,
    totalAmount: Math.round(partsMap[name].total)
  }));

  return NextResponse.json({
    success: true,
    summary: {
      totalInvoices: validInvoices.length,
      totalBilled: Math.round(totalBilled),
      totalReceived: Math.round(totalReceived),
      totalOutstanding: Math.round(totalOutstanding),
      gstSummary: {
        taxableValue: Math.round(totalTaxableValue),
        totalTax: Math.round(totalGstTax),
        cgst: Math.round(totalCgst),
        sgst: Math.round(totalSgst),
        igst: Math.round(totalIgst)
      }
    },
    dailyTrend,
    applianceReport,
    technicianReport,
    sparePartsReport
  });
}

