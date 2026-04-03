export type Theme = 'purple' | 'cyan' | 'green' | 'gold' | 'red';

export type Stage = 'upload' | 'scanning' | 'generating' | 'done' | 'error';

export interface ScannedFile {
  path: string;
  content: string;
}

export interface ProjectInfo {
  name: string;
  description: string;
  stack: string[];
  scripts: Record<string, string>;
  dependencies: string[];
  devDependencies: string[];
  structure: string[];
  entryPoint: string;
  hasDocker: boolean;
  hasEnvExample: boolean;
  deployPlatform: string;
  language: string;
  framework: string;
  existingReadme: string;
}

export interface ThemeConfig {
  label: string;
  primary: string;
  badge: string;
  hex: string;
}

export const THEMES: Record<Theme, ThemeConfig> = {
  purple: { label: 'Purple',  primary: '#7c5cfc', badge: '7c5cfc', hex: '#a78bfa' },
  cyan:   { label: 'Cyan',    primary: '#22d3ee', badge: '22d3ee', hex: '#22d3ee' },
  green:  { label: 'Green',   primary: '#34d399', badge: '34d399', hex: '#34d399' },
  gold:   { label: 'Gold',    primary: '#fbbf24', badge: 'fbbf24', hex: '#fbbf24' },
  red:    { label: 'Red',     primary: '#f87171', badge: 'f87171', hex: '#f87171' },
};
