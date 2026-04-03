import type { EmailResult } from '../types';

const DISPOSABLE_DOMAINS = [
  'mailinator.com','guerrillamail.com','tempmail.com','throwaway.email',
  'yopmail.com','10minutemail.com','trashmail.com','fakeinbox.com',
  'sharklasers.com','guerrillamailblock.com','grr.la','spam4.me',
  'dispostable.com','mailnull.com','spamgourmet.com','trashmail.me',
];

const FREE_DOMAINS = [
  'gmail.com','yahoo.com','hotmail.com','outlook.com','icloud.com',
  'protonmail.com','mail.com','aol.com','live.com','msn.com',
];

export async function analyzeEmail(email: string): Promise<EmailResult> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) throw new Error('Invalid email format');

  const domain = email.split('@')[1].toLowerCase();
  const disposable = DISPOSABLE_DOMAINS.includes(domain);
  const free = FREE_DOMAINS.includes(domain);

  await new Promise(r => setTimeout(r, 800 + Math.random() * 600));

  let score = 50;
  if (!disposable) score += 20;
  if (free) score -= 10;
  if (email.length < 30) score += 10;
  const hasNumbers = /\d{3,}/.test(email.split('@')[0]);
  if (hasNumbers) score -= 15;
  score = Math.max(0, Math.min(100, score));

  return {
    email,
    deliverable: !disposable,
    disposable,
    mx_found: !disposable,
    smtp_check: !disposable && score > 40,
    score,
    free,
  };
}
