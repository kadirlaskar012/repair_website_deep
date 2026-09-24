import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth';
import { generateBlogWithAI } from '@/lib/ai';

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { topic, category, language, specificAngle } = await req.json();

    if (!topic || !topic.trim()) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    // Call server-side AI generator (Gemini or OpenAI)
    const draft = await generateBlogWithAI({
      topic: topic.trim(),
      category: category || 'General Appliance Repair',
      language: language || 'en',
      specificAngle
    });

    return NextResponse.json({
      success: true,
      draft
    });
  } catch (err: any) {
    console.error('AI Blog Generation error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'AI generation failed' },
      { status: 500 }
    );
  }
}
