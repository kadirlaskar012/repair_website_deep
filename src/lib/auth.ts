import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { getAdminByEmail } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'ac-repair-jwt-super-secret-key-2026-prod-west-bengal';
export const ADMIN_COOKIE_NAME = 'ac_admin_session';

export interface AdminSessionPayload {
  adminId: number;
  email: string;
  name: string;
  role: string;
}

export function signAdminToken(payload: AdminSessionPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyAdminToken(token: string): AdminSessionPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminSessionPayload;
  } catch (err) {
    return null;
  }
}

export async function getCurrentAdmin(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export async function authenticateAdmin(email: string, passwordPlain: string): Promise<AdminSessionPayload | null> {
  const user = await getAdminByEmail(email);
  if (!user) return null;

  const isValid = await bcrypt.compare(passwordPlain, user.passwordHash);
  if (!isValid) return null;

  return {
    adminId: user.id,
    email: user.email,
    name: user.name,
    role: 'admin'
  };
}
