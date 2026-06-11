const encoder = new TextEncoder();

async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const keyData = encoder.encode(secret);
  return crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

/**
 * Signs a payload with a secret using HMAC SHA-256.
 * Returns a token string: payloadBase64Url.signatureBase64Url
 */
export async function signToken(payload: any, secret: string): Promise<string> {
  const key = await getCryptoKey(secret);
  const payloadStr = JSON.stringify(payload);
  const payloadBase64 = btoa(payloadStr)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(payloadBase64)
  );
  
  // Safely convert signature buffer to base64url
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  const signatureStr = signatureArray.map(b => String.fromCharCode(b)).join('');
  const signatureBase64 = btoa(signatureStr)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
    
  return `${payloadBase64}.${signatureBase64}`;
}

/**
 * Verifies a token string and returns the parsed payload if valid and not expired.
 * Returns null if token is invalid or expired.
 */
export async function verifyToken(token: string, secret: string): Promise<any | null> {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payloadBase64, signatureBase64] = parts;
  try {
    const key = await getCryptoKey(secret);
    
    // Convert base64url signature back to Uint8Array
    const rawSignature = atob(signatureBase64.replace(/-/g, '+').replace(/_/g, '/'));
    const signatureArray = new Uint8Array(rawSignature.length);
    for (let i = 0; i < rawSignature.length; i++) {
      signatureArray[i] = rawSignature.charCodeAt(i);
    }
    
    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureArray,
      encoder.encode(payloadBase64)
    );
    if (!isValid) return null;
    
    const payloadStr = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(payloadStr);
    
    if (payload.exp && Date.now() > payload.exp) {
      return null;
    }
    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * Resolves the role for a given email address.
 */
export function getAdminRole(email: string): 'Super Admin' | 'Admin' | 'Moderator' {
  const primaryAdmin = (process.env.ADMIN_EMAIL || 'lynxvirtuoso@gmail.com').toLowerCase().trim();
  if (email.toLowerCase().trim() === primaryAdmin) {
    return 'Super Admin';
  }
  
  // Custom env config mapping if needed
  const authorizedAdminsString = process.env.AUTHORIZED_ADMINS || '';
  const adminsList = authorizedAdminsString.split(',').map(e => e.trim().toLowerCase());
  
  if (adminsList.includes(email.toLowerCase().trim())) {
    return 'Admin';
  }
  
  return 'Moderator';
}

/**
 * Checks if an email address is authorized as an administrator.
 */
export function isAuthorizedAdmin(email: string): boolean {
  if (!email) return false;
  const formattedEmail = email.toLowerCase().trim();
  const primaryAdmin = (process.env.ADMIN_EMAIL || 'lynxvirtuoso@gmail.com').toLowerCase().trim();
  if (formattedEmail === primaryAdmin) return true;
  
  const authorizedAdminsString = process.env.AUTHORIZED_ADMINS || '';
  const adminsList = authorizedAdminsString.split(',').map(e => e.trim().toLowerCase());
  return adminsList.includes(formattedEmail);
}

/**
 * Returns the secret key for signing tokens.
 * Falls back to a default value in development if not configured.
 */
export function getJwtSecret(): string {
  const secret = process.env.SESSION_SECRET || process.env.AUTH_SECRET || process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('AUTH_SECRET or SESSION_SECRET environment variable is missing.');
    }
    return 'gigpad_default_local_dev_token_secret_32_chars_long';
  }
  return secret;
}
