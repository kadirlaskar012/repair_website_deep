import fs from 'fs';
import path from 'path';
import { MediaAsset } from './types';
import { saveMediaAsset, deleteMediaAsset } from './db';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export function ensureUploadDirExists() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

export async function uploadLocalFile(file: File, altText = ''): Promise<MediaAsset> {
  ensureUploadDirExists();

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const timestamp = Date.now();
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
  const filename = `${timestamp}_${sanitizedName}`;
  const filePath = path.join(UPLOAD_DIR, filename);

  fs.writeFileSync(filePath, buffer);

  const asset: MediaAsset = {
    id: `media_${timestamp}`,
    filename,
    originalName: file.name,
    mimeType: file.type,
    sizeBytes: file.size,
    url: `/uploads/${filename}`,
    altText: altText || file.name,
    createdAt: new Date().toISOString()
  };

  await saveMediaAsset(asset);
  return asset;
}

export async function deleteLocalFile(filename: string, id: string): Promise<boolean> {
  const filePath = path.join(UPLOAD_DIR, filename);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.warn('Could not unlink file:', err);
    }
  }
  await deleteMediaAsset(id);
  return true;
}
