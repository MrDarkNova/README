import type { IPResult } from '../types';

export async function lookupIP(ip: string): Promise<IPResult> {
  const clean = ip.trim();

  const ipv4 = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6 = /^[0-9a-fA-F:]+$/;
  const domain = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!ipv4.test(clean) && !ipv6.test(clean) && !domain.test(clean)) {
    throw new Error('Invalid IP address or domain');
  }

  const res = await fetch(`https://ipapi.co/${clean}/json/`);
  if (!res.ok) throw new Error(`Lookup failed: HTTP ${res.status}`);

  const data = await res.json();

  if (data.error) throw new Error(data.reason ?? 'Lookup failed');

  return {
    ip:       data.ip       ?? clean,
    city:     data.city     ?? 'Unknown',
    region:   data.region   ?? 'Unknown',
    country:  data.country_name ?? 'Unknown',
    org:      data.org      ?? 'Unknown',
    timezone: data.timezone ?? 'Unknown',
    loc:      `${data.latitude ?? '?'},${data.longitude ?? '?'}`,
    postal:   data.postal   ?? undefined,
  };
}

export async function getMyIP(): Promise<string> {
  const res = await fetch('https://api.ipify.org?format=json');
  const data = await res.json();
  return data.ip as string;
}
