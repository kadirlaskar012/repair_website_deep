import { NextRequest, NextResponse } from 'next/server';
import { authenticateAdmin, signAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const identifier = body.mobile || body.phone || body.email || body.username || body.identifier;
    const password = body.password;

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, error: 'Mobile number and password are required' },
        { status: 400 }
      );
    }

    const admin = await authenticateAdmin(String(identifier).trim(), String(password).trim());
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Invalid admin credentials' },
        { status: 401 }
      );
    }

    const token = signAdminToken(admin);

    const response = NextResponse.json({
      success: true,
      admin: {
        id: admin.adminId,
        email: admin.email,
        name: admin.name
      }
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (err: any) {
    console.error('Login error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
