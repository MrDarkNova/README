export type CommandStatus = 'idle' | 'running' | 'success' | 'error';

export type ScanModule = 'username' | 'ip' | 'email' | 'domain';

export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'success' | 'error' | 'info' | 'warning' | 'header' | 'divider';
  text: string;
  timestamp?: string;
}

export interface CommandResult {
  lines: TerminalLine[];
  status: CommandStatus;
}

export interface UsernameResult {
  platform: string;
  url: string;
  found: boolean;
  category: string;
}

export interface IPResult {
  ip: string;
  city: string;
  region: string;
  country: string;
  org: string;
  timezone: string;
  loc: string;
  postal?: string;
}

export interface EmailResult {
  email: string;
  deliverable: boolean;
  disposable: boolean;
  mx_found: boolean;
  smtp_check: boolean;
  score: number;
  free: boolean;
}

export interface ScanHistory {
  module: ScanModule;
  query: string;
  timestamp: string;
  lineCount: number;
}
