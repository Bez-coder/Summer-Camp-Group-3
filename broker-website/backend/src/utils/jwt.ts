

import jwt, { Secret } from 'jsonwebtoken';

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'changeme';
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN as any) || '7d';

export function signJwt(payload: string | object | Buffer) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
