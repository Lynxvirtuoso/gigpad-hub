'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { signToken, verifyToken, getAdminRole, isAuthorizedAdmin, getJwtSecret } from '@/utils/auth';

export interface ActionResponse {
  success?: boolean;
  error?: string;
  email?: string;
}

/**
 * Validates the administrator email, generates a 6-digit code, and returns it.
 */
export async function requestLoginCode(email: string): Promise<ActionResponse> {
  if (!email || !email.includes('@')) {
    return { error: 'Please enter a valid email address.' };
  }

  const normalizedEmail = email.toLowerCase().trim();
  
  if (!isAuthorizedAdmin(normalizedEmail)) {
    return { error: 'Access Denied: This email address is not authorized for administrator access.' };
  }

  // Generate a random 6-digit verification code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const secret = getJwtSecret();

  // Create verification token (expires in 5 minutes)
  const exp = Date.now() + 5 * 60 * 1000;
  const token = await signToken({ email: normalizedEmail, code, exp }, secret);

  // Set the verification cookie
  const cookieStore = await cookies();
  cookieStore.set('admin_login_verification', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 300, // 5 minutes
  });

  // Resend API Integration
  if (process.env.RESEND_API_KEY) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'GigPad Auth <onboarding@resend.dev>',
          to: normalizedEmail,
          subject: 'GigPad Hub: Admin OTP Verification Code',
          html: `
            <div style="font-family: sans-serif; padding: 20px; background: #030712; color: #f3f4f6; border-radius: 12px; border: 1px solid #1f2937; max-width: 500px; margin: auto;">
              <h2 style="color: #3b82f6; text-align: center; font-size: 20px; margin-bottom: 20px;">GigPad Hub Admin Login</h2>
              <p style="font-size: 13px; color: #9ca3af; line-height: 1.5;">You are receiving this email because an admin login attempt was initiated for GigPad Hub.</p>
              <div style="background: #0f172a; border: 1px solid #2563eb; border-radius: 8px; padding: 16px; margin: 24px 0; text-align: center;">
                <span style="font-size: 26px; font-weight: bold; letter-spacing: 5px; color: #fff; font-family: monospace;">${code}</span>
              </div>
              <p style="font-size: 11px; color: #6b7280; text-align: center; margin-top: 20px;">This code will expire in 5 minutes. If you did not request this login, please ignore this email.</p>
            </div>
          `,
        }),
      });
      if (!response.ok) {
        const errText = await response.text();
        console.error('[RESEND API ERROR]', errText);
      } else {
        console.log(`[RESEND API SUCCESS] OTP email successfully sent to ${normalizedEmail}`);
      }
    } catch (err) {
      console.error('[RESEND DISPATCH ERROR]', err);
    }
  }

  // Log to terminal for the developer to retrieve the code
  console.log('\n==================================================');
  console.log(`[ADMIN SECURITY NOTICE] Email verification requested.`);
  console.log(`Email: ${normalizedEmail}`);
  console.log(`Verification Code: ${code}`);
  console.log(`Expires in: 5 minutes`);
  console.log('==================================================\n');

  return { success: true, email: normalizedEmail };
}

/**
 * Verifies the 6-digit code and issues the persistent administrator session.
 */
export async function verifyLoginCode(email: string, code: string): Promise<ActionResponse> {
  if (!code || code.length !== 6) {
    return { error: 'Please enter a valid 6-digit verification code.' };
  }

  const cookieStore = await cookies();
  const verificationCookie = cookieStore.get('admin_login_verification');

  if (!verificationCookie || !verificationCookie.value) {
    return { error: 'Verification session expired. Please request a new code.' };
  }

  const secret = getJwtSecret();
  const payload = await verifyToken(verificationCookie.value, secret);

  if (!payload) {
    return { error: 'Verification session has expired or is invalid. Please try again.' };
  }

  if (payload.email !== email.toLowerCase().trim()) {
    return { error: 'Session mismatch. Please request a new verification code.' };
  }

  if (payload.code !== code) {
    return { error: 'Invalid verification code. Please check your terminal/console and try again.' };
  }

  // Generate session token (expires in 2 hours)
  const sessionExp = Date.now() + 2 * 60 * 60 * 1000;
  const role = getAdminRole(payload.email);
  const sessionToken = await signToken({ email: payload.email, role, exp: sessionExp }, secret);

  // Set secure admin session cookie
  cookieStore.set('gigpad_admin_session', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7200, // 2 hours
  });

  // Clean up verification cookie
  cookieStore.delete('admin_login_verification');

  console.log(`[ADMIN LOGIN SUCCESS] Admin logged in successfully: ${payload.email} (${role})`);

  return { success: true };
}

/**
 * Revokes the administrator session and logs out.
 */
export async function adminLogout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('gigpad_admin_session');
  redirect('/admin/login');
}
