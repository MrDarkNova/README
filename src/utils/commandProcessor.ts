import type { TerminalLine, ScanModule } from '../types';
import { scanUsername, PLATFORM_COUNT } from './usernameScanner';
import { lookupIP, getMyIP } from './ipLookup';
import { analyzeEmail } from './emailAnalyzer';

function id(): string {
  return Math.random().toString(36).slice(2);
}

function ts(): string {
  return new Date().toLocaleTimeString('en-US', { hour12: false });
}

function line(type: TerminalLine['type'], text: string): TerminalLine {
  return { id: id(), type, text, timestamp: ts() };
}

function divider(): TerminalLine {
  return line('divider', '─'.repeat(56));
}

export const HELP_TEXT: TerminalLine[] = [
  line('header',  '╔══════════════════════════════════════════════════╗'),
  line('header',  '║         DARKNOVA TERMINAL  v2.0.0                ║'),
  line('header',  '║         Intelligence Reconnaissance System       ║'),
  line('header',  '╚══════════════════════════════════════════════════╝'),
  divider(),
  line('info',    '  AVAILABLE COMMANDS'),
  divider(),
  line('output',  '  scan user <username>    →  Cross-platform recon'),
  line('output',  '  scan ip <ip/domain>     →  IP geolocation & ISP'),
  line('output',  '  scan email <email>      →  Email intelligence'),
  line('output',  '  scan myip               →  Reveal your own IP'),
  divider(),
  line('output',  '  help                    →  Show this panel'),
  line('output',  '  clear                   →  Clear terminal'),
  line('output',  '  history                 →  Show scan history'),
  line('output',  '  about                   →  About this tool'),
  divider(),
  line('info',    '  EXAMPLES'),
  line('output',  '  > scan user MrDarkNova'),
  line('output',  '  > scan ip 1.1.1.1'),
  line('output',  '  > scan email test@gmail.com'),
  divider(),
];

export const ABOUT_TEXT: TerminalLine[] = [
  divider(),
  line('header',  '  DARKNOVA TERMINAL'),
  line('info',    '  Built by Mr. Darknova — mrdarknova.indevs.in'),
  divider(),
  line('output',  '  A real-time OSINT reconnaissance platform.'),
  line('output',  '  Username scanning across 30+ platforms,'),
  line('output',  '  IP geolocation, email intelligence analysis.'),
  line('output',  '  Built with React + TypeScript.'),
  divider(),
  line('warning', '  For educational purposes only.'),
  line('warning', '  Use responsibly and ethically.'),
  divider(),
];

export async function processCommand(
  raw: string,
  onLine: (l: TerminalLine) => void
): Promise<ScanModule | null> {
  const parts = raw.trim().toLowerCase().split(/\s+/);
  const cmd = parts[0];

  if (cmd === 'help') {
    HELP_TEXT.forEach(onLine);
    return null;
  }

  if (cmd === 'about') {
    ABOUT_TEXT.forEach(onLine);
    return null;
  }

  if (cmd === 'clear' || cmd === 'cls') {
    return null;
  }

  if (cmd === 'history') {
    return null;
  }

  if (cmd === 'scan') {
    const sub = parts[1];

    if (sub === 'myip') {
      onLine(line('info', '  [ INITIATING SELF-IP REVEAL ]'));
      onLine(divider());
      try {
        const ip = await getMyIP();
        onLine(line('warning', `  YOUR IP ADDRESS: ${ip}`));
        onLine(line('info',    '  Tracing geolocation...'));
        const result = await lookupIP(ip);
        onLine(divider());
        onLine(line('success', `  IP          ${result.ip}`));
        onLine(line('output',  `  CITY        ${result.city}`));
        onLine(line('output',  `  REGION      ${result.region}`));
        onLine(line('output',  `  COUNTRY     ${result.country}`));
        onLine(line('output',  `  ORG / ISP   ${result.org}`));
        onLine(line('output',  `  TIMEZONE    ${result.timezone}`));
        onLine(line('output',  `  COORDS      ${result.loc}`));
        if (result.postal) onLine(line('output', `  POSTAL      ${result.postal}`));
        onLine(divider());
        onLine(line('warning', '  ⚠  This is what every site you visit sees.'));
      } catch (e) {
        onLine(line('error', `  ERROR: ${(e as Error).message}`));
      }
      return 'ip';
    }

    if (sub === 'user') {
      const username = parts[2];
      if (!username) {
        onLine(line('error', '  USAGE: scan user <username>'));
        return null;
      }
      onLine(divider());
      onLine(line('header',  `  [ USERNAME RECON ] → ${username.toUpperCase()}`));
      onLine(line('info',    `  Scanning ${PLATFORM_COUNT} platforms...`));
      onLine(divider());

      let found = 0;
      const results = await scanUsername(username, (r, idx, total) => {
        if (r.found) {
          found++;
          onLine(line('success', `  [✓] ${r.platform.padEnd(16)} FOUND   ${r.url}`));
        } else {
          onLine(line('output',  `  [✗] ${r.platform.padEnd(16)} not found`));
        }
        if (idx === total - 1) {
          onLine(divider());
          onLine(line('info',    `  SCAN COMPLETE`));
          onLine(line('success', `  FOUND ON   ${found} / ${total} platforms`));
          onLine(line('output',  `  NOT FOUND  ${total - found} platforms`));
          const pct = Math.round((found / total) * 100);
          onLine(line(pct > 60 ? 'warning' : 'info', `  EXPOSURE   ${pct}%`));
          onLine(divider());
        }
      });

      void results;
      return 'username';
    }

    if (sub === 'ip') {
      const target = parts[2];
      if (!target) {
        onLine(line('error', '  USAGE: scan ip <ip or domain>'));
        return null;
      }
      onLine(divider());
      onLine(line('header', `  [ IP INTELLIGENCE ] → ${target.toUpperCase()}`));
      onLine(line('info',   '  Resolving geolocation data...'));
      onLine(divider());
      try {
        const r = await lookupIP(target);
        onLine(line('success', `  IP          ${r.ip}`));
        onLine(line('output',  `  CITY        ${r.city}`));
        onLine(line('output',  `  REGION      ${r.region}`));
        onLine(line('output',  `  COUNTRY     ${r.country}`));
        onLine(line('output',  `  ORG / ISP   ${r.org}`));
        onLine(line('output',  `  TIMEZONE    ${r.timezone}`));
        onLine(line('output',  `  COORDINATES ${r.loc}`));
        if (r.postal) onLine(line('output', `  POSTAL CODE ${r.postal}`));
        onLine(divider());
        onLine(line('info', '  [ SCAN COMPLETE ]'));
        onLine(line('output', `  Maps → https://maps.google.com/?q=${r.loc}`));
      } catch (e) {
        onLine(line('error', `  ERROR: ${(e as Error).message}`));
      }
      onLine(divider());
      return 'ip';
    }

    if (sub === 'email') {
      const email = parts[2];
      if (!email) {
        onLine(line('error', '  USAGE: scan email <address>'));
        return null;
      }
      onLine(divider());
      onLine(line('header', `  [ EMAIL INTELLIGENCE ] → ${email}`));
      onLine(line('info',   '  Analyzing deliverability, MX records...'));
      onLine(divider());
      try {
        const r = await analyzeEmail(email);
        onLine(line('output',  `  ADDRESS       ${r.email}`));
        onLine(line('output',  `  DOMAIN        ${r.email.split('@')[1]}`));
        onLine(line(r.deliverable ? 'success' : 'error',
          `  DELIVERABLE   ${r.deliverable ? 'YES' : 'NO'}`));
        onLine(line(r.disposable ? 'warning' : 'success',
          `  DISPOSABLE    ${r.disposable ? 'YES — BURNER EMAIL' : 'NO'}`));
        onLine(line(r.mx_found ? 'success' : 'error',
          `  MX RECORDS    ${r.mx_found ? 'FOUND' : 'NOT FOUND'}`));
        onLine(line(r.smtp_check ? 'success' : 'warning',
          `  SMTP CHECK    ${r.smtp_check ? 'PASSED' : 'FAILED'}`));
        onLine(line('output',  `  FREE PROVIDER ${r.free ? 'YES' : 'NO (CUSTOM DOMAIN)'}`));
        const scoreColor: TerminalLine['type'] = r.score > 70 ? 'success' : r.score > 40 ? 'warning' : 'error';
        onLine(line(scoreColor, `  TRUST SCORE   ${r.score}/100`));
        onLine(divider());
        onLine(line('info', '  [ ANALYSIS COMPLETE ]'));
      } catch (e) {
        onLine(line('error', `  ERROR: ${(e as Error).message}`));
      }
      onLine(divider());
      return 'email';
    }

    onLine(line('error', `  Unknown scan module: "${sub}". Type help for commands.`));
    return null;
  }

  if (raw.trim() === '') return null;

  onLine(line('error', `  Command not found: "${cmd}". Type help for available commands.`));
  return null;
}
