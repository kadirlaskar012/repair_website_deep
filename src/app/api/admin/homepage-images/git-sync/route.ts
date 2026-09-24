import { NextResponse } from 'next/server';
import { execSync } from 'child_process';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    // Stage public/images and homepage-images.json
    try {
      execSync('git add "public/images" "src/lib/homepage-images.json"', { encoding: 'utf-8' });
    } catch (addErr) {
      console.warn('git add notice:', addErr);
    }

    // Check status
    const status = execSync('git status --porcelain', { encoding: 'utf-8' });
    if (!status.trim()) {
      return NextResponse.json({
        success: true,
        message: 'Everything is already up to date! No uncommitted image assets.',
        log: 'Working tree clean'
      });
    }

    // Commit
    const commitMsg = `chore(assets): update homepage images from admin panel [${new Date().toLocaleDateString('en-GB')}]`;
    execSync(`git commit -m "${commitMsg}"`, { encoding: 'utf-8' });

    // Push to origin main
    const pushOutput = execSync('git push origin main', { encoding: 'utf-8' });

    // Read latest commit
    const latestCommit = execSync('git log -1 --pretty=format:"%h - %s (%cr)"', { encoding: 'utf-8' }).trim();

    return NextResponse.json({
      success: true,
      message: 'Successfully committed and pushed homepage images to GitHub! Vercel production build is now deploying your hardcoded assets.',
      lastCommit: latestCommit,
      output: pushOutput
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({
      success: false,
      error: `Git push failed: ${errorMsg}. Please ensure you are running on your local machine with Git configured.`
    }, { status: 500 });
  }
}
