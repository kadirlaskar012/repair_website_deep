import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';
import { BlogPost, FAQItem, AISettings } from './types';
import { getAISettings } from './db';

export interface AIGenerationPromptInput {
  topic: string;
  category?: string;
  language: 'en' | 'bn';
  targetAudience?: string;
  specificAngle?: string;
}

export interface GeneratedBlogDraft {
  title: string;
  titleBn: string;
  slug: string;
  content: string;
  contentBn: string;
  excerpt: string;
  excerptBn: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  metaTitle: string;
  metaDesc: string;
  ogTitle: string;
  ogDesc: string;
  faqs: FAQItem[];
}

export async function generateBlogWithAI(input: AIGenerationPromptInput): Promise<GeneratedBlogDraft> {
  const settings = await getAISettings();
  const provider = settings.provider || 'gemini';

  const systemInstructions = `
You are an expert technical appliance repair writer and technical SEO specialist for "AC Repair Service", a professional doorstep appliance repair business operating across West Bengal, India.
Generate a comprehensive, highly informative, realistic, and SEO-optimized appliance repair blog article based on the user's prompt.
Strict rules:
1. Focus on West Bengal context (climate: humid summers, monsoon moisture, common power fluctuations in Kolkata, Howrah, Durgapur, Siliguri, etc.).
2. Emphasize realistic troubleshooting tips and mention the standard ₹299 inspection & diagnosis visit fee where appropriate.
3. DO NOT make false technical claims.
4. Output MUST BE strictly valid JSON matching this schema:
{
  "title": "Compelling English Title",
  "titleBn": "বাংলা শিরোনাম",
  "slug": "url-friendly-english-slug-like-how-to-fix-fridge-leak",
  "content": "Full detailed English article in Markdown with H2, H3, bullet points, troubleshooting steps, and transparent diagnosis note (minimum 500 words)",
  "contentBn": "বাংলা ভাষায় পুঙ্খানুপুঙ্খ তথ্যবহুল আর্টিকেল (ন্যূনতম ৪০০ শব্দ, স্পষ্ট ও সাবলীল বাংলা)",
  "excerpt": "Short 2-sentence English summary for meta and card preview",
  "excerptBn": "সংক্ষিপ্ত বাংলা সারাংশ",
  "focusKeyword": "Primary focus keyword",
  "secondaryKeywords": ["keyword 1", "keyword 2", "keyword 3", "keyword 4"],
  "metaTitle": "SEO title under 60 chars",
  "metaDesc": "SEO meta description under 155 chars with call to action",
  "ogTitle": "Open Graph social sharing title",
  "ogDesc": "Open Graph description",
  "faqs": [
    {
      "question": "English question 1?",
      "questionBn": "বাংলা প্রশ্ন ১?",
      "answer": "Clear English answer 1",
      "answerBn": "বাংলা উত্তর ১"
    },
    {
      "question": "English question 2?",
      "questionBn": "বাংলা প্রশ্ন ২?",
      "answer": "Clear English answer 2",
      "answerBn": "বাংলা উত্তর ২"
    }
  ]
}
Return ONLY pure JSON. No markdown wrappers like \`\`\`json.
`;

  const userPrompt = `
Topic: ${input.topic}
Category: ${input.category || 'General Appliance Repair'}
Language Mode: Both English and authentic Bengali translations
Audience: Homeowners and appliance users in Kolkata and West Bengal
Specific focus: ${input.specificAngle || 'Common causes, preventative maintenance, safety warnings, and when to call certified technician'}
`;

  let rawJsonText = '';

  if (provider === 'gemini') {
    const apiKey = settings.geminiApiKey || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Gemini API key is not configured. Please add it in Admin AI Settings or GEMINI_API_KEY env variable.');
    }

    const ai = new GoogleGenAI({ apiKey });
    const model = settings.geminiModel || 'gemini-1.5-flash';
    const response = await ai.models.generateContent({
      model,
      contents: [
        { role: 'user', parts: [{ text: `${systemInstructions}\n\n${userPrompt}` }] }
      ]
    });
    rawJsonText = response.text || '';
  } else {
    // OpenAI provider
    const apiKey = settings.openaiApiKey || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OpenAI API key is not configured. Please add it in Admin AI Settings or OPENAI_API_KEY env variable.');
    }

    const openai = new OpenAI({ apiKey });
    const model = settings.openaiModel || 'gpt-4o-mini';
    const response = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemInstructions },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' }
    });
    rawJsonText = response.choices[0]?.message?.content || '';
  }

  // Clean any markdown backticks if returned
  rawJsonText = rawJsonText.trim();
  if (rawJsonText.startsWith('```json')) {
    rawJsonText = rawJsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (rawJsonText.startsWith('```')) {
    rawJsonText = rawJsonText.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }

  const parsed = JSON.parse(rawJsonText);

  return {
    title: parsed.title || input.topic,
    titleBn: parsed.titleBn || parsed.title,
    slug: (parsed.slug || input.topic)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, ''),
    content: parsed.content || '',
    contentBn: parsed.contentBn || '',
    excerpt: parsed.excerpt || '',
    excerptBn: parsed.excerptBn || '',
    focusKeyword: parsed.focusKeyword || input.topic,
    secondaryKeywords: Array.isArray(parsed.secondaryKeywords) ? parsed.secondaryKeywords : [],
    metaTitle: parsed.metaTitle || parsed.title,
    metaDesc: parsed.metaDesc || parsed.excerpt,
    ogTitle: parsed.ogTitle || parsed.title,
    ogDesc: parsed.ogDesc || parsed.excerpt,
    faqs: Array.isArray(parsed.faqs) ? parsed.faqs : []
  };
}
