import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth';
import { getAISettings, updateAISettings } from '@/lib/db';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const settings = await getAISettings();
  // Return masked keys for security in UI
  return NextResponse.json({
    success: true,
    settings: {
      provider: settings.provider,
      geminiModel: settings.geminiModel,
      geminiApiKey: settings.geminiApiKey ? `${settings.geminiApiKey.slice(0, 6)}...${settings.geminiApiKey.slice(-4)}` : '',
      openaiModel: settings.openaiModel,
      openaiApiKey: settings.openaiApiKey ? `${settings.openaiApiKey.slice(0, 6)}...${settings.openaiApiKey.slice(-4)}` : '',
      hasGeminiKey: Boolean(settings.geminiApiKey || process.env.GEMINI_API_KEY),
      hasOpenaiKey: Boolean(settings.openaiApiKey || process.env.OPENAI_API_KEY)
    }
  });
}

export async function PUT(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const current = await getAISettings();

  const updated = await updateAISettings({
    provider: body.provider || current.provider,
    geminiModel: body.geminiModel || current.geminiModel,
    openaiModel: body.openaiModel || current.openaiModel,
    // Only update keys if non-empty and not masked
    geminiApiKey: body.geminiApiKey && !body.geminiApiKey.includes('...') ? body.geminiApiKey : current.geminiApiKey,
    openaiApiKey: body.openaiApiKey && !body.openaiApiKey.includes('...') ? body.openaiApiKey : current.openaiApiKey
  });

  return NextResponse.json({ success: true, settings: updated });
}
