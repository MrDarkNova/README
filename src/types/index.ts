export type Theme = 'purple' | 'cyan' | 'green' | 'gold' | 'red';

export type Stage = 'upload' | 'scanning' | 'generating' | 'done' | 'error';

export interface ScannedFile {
  path: string;
  content: string;
}

export interface ProjectInfo {
  name: string;
  description: string;
  language: string;
  framework: string;
  deployPlatform: string;
  scripts: Record<string, string>;
  dependencies: string[];
  structure: string[];
  hasDocker: boolean;
  hasEnvExample: boolean;
  existingReadme: string;
}

export const THEMES: Record<Theme, { label: string; color: string; badge: string }> = {
  purple: { label: 'Violet', color: '#a78bfa', badge: 'A78BFA' },
  cyan: { label: 'Cyan', color: '#51d6e8', badge: '51D6E8' },
  green: { label: 'Mint', color: '#71dbb0', badge: '71DBB0' },
  gold: { label: 'Amber', color: '#f5c36a', badge: 'F5C36A' },
  red: { label: 'Rose', color: '#fb8992', badge: 'FB8992' },
};