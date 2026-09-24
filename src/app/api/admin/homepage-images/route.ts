import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { HOMEPAGE_IMAGE_SLOTS, getHomepageImages } from '@/lib/homepage-images-metadata';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CONFIG_FILE = path.join(process.cwd(), 'src', 'lib', 'homepage-images.json');
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

function getGitStatus() {
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
    const statusOutput = execSync('git status --porcelain', { encoding: 'utf-8' });
    const lastCommit = execSync('git log -1 --pretty=format:"%h - %s (%cr)"', { encoding: 'utf-8' }).trim();
    
    // Check if homepage images or config have uncommitted changes
    const hasUncommittedChanges = statusOutput.includes('homepage-images.json') || statusOutput.includes('public/images');
    
    return {
      available: true,
      branch,
      lastCommit,
      hasUncommittedChanges,
      statusSummary: hasUncommittedChanges ? 'Uncommitted image changes pending Git push' : 'All assets synced with Git'
    };
  } catch (err: unknown) {
    return {
      available: false,
      branch: 'main',
      lastCommit: 'N/A',
      hasUncommittedChanges: false,
      statusSummary: 'Git CLI not active in this runtime'
    };
  }
}

export async function GET() {
  try {
    let images = getHomepageImages();
    if (fs.existsSync(CONFIG_FILE)) {
      try {
        images = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
      } catch (e) {
        console.error('Error parsing homepage-images.json:', e);
      }
    }

    const gitStatus = getGitStatus();

    return NextResponse.json({
      success: true,
      slots: HOMEPAGE_IMAGE_SLOTS,
      images,
      gitStatus
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to fetch homepage images';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const slotId = formData.get('slotId') as string;
    const file = formData.get('file') as File | null;
    const autoGit = formData.get('autoGit') === 'true';

    if (!slotId || !file) {
      return NextResponse.json({ success: false, error: 'slotId and file are required' }, { status: 400 });
    }

    const slot = HOMEPAGE_IMAGE_SLOTS.find((s) => s.slotId === slotId);
    if (!slot) {
      return NextResponse.json({ success: false, error: `Invalid slotId: ${slotId}` }, { status: 400 });
    }

    if (!fs.existsSync(IMAGES_DIR)) {
      fs.mkdirSync(IMAGES_DIR, { recursive: true });
    }

    // Determine clean file extension and name
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const safeExt = ['jpg', 'jpeg', 'png', 'webp'].includes(ext) ? ext : 'jpg';
    const timestamp = Date.now();
    const filename = `${slotId}_${timestamp}.${safeExt}`;
    const targetFilePath = path.join(IMAGES_DIR, filename);

    // Write file to public/images/
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(targetFilePath, buffer);

    const relativePublicPath = `/images/${filename}`;

    // Read current configuration
    let currentConfig: Record<string, string> = {};
    if (fs.existsSync(CONFIG_FILE)) {
      try {
        currentConfig = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
      } catch (e) {
        console.error('Error reading config file:', e);
      }
    }

    // Update slot path
    currentConfig[slotId] = relativePublicPath;
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(currentConfig, null, 2), 'utf-8');

    // Handle Git Commit & Push if requested or running locally
    let gitResult: { success: boolean; output: string } = { success: false, output: 'Git push not requested' };
    if (autoGit) {
      try {
        execSync(`git add "public/images/${filename}" "src/lib/homepage-images.json"`, { encoding: 'utf-8' });
        execSync(`git commit -m "chore(assets): update homepage image for ${slot.title}"`, { encoding: 'utf-8' });
        const pushOut = execSync('git push origin main', { encoding: 'utf-8' });
        gitResult = {
          success: true,
          output: `Committed & pushed to origin/main! Vercel auto-deploy initiated: ${pushOut}`
        };
      } catch (gitErr: unknown) {
        const errorMsg = gitErr instanceof Error ? gitErr.message : String(gitErr);
        gitResult = {
          success: false,
          output: `Saved locally. Git auto-push notice: ${errorMsg}`
        };
      }
    }

    const updatedGitStatus = getGitStatus();

    return NextResponse.json({
      success: true,
      slotId,
      path: relativePublicPath,
      gitResult,
      gitStatus: updatedGitStatus,
      message: `Image for "${slot.title}" successfully saved as hardcoded project asset!`
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to update homepage image';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
