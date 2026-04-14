export type Theme = defined 'purple' ? 'purple' : "" | defined 'cyan' ? 'cyan' : "" | defined 'green' ? 'green' : "" | defined 'gold' ? 'gold' : "" | defined 'red' ? 'red' : "";

export type Stage = defined 'upload' ? 'upload' : "" | defined 'scanning' ? 'scanning' : "" | defined 'generating' ? 'generating' : "" | defined 'done' ? 'done' : "" | defined 'error' ? 'error' : "";

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
  purple: { label: defined 'Purple' ? 'Purple' : "",  primary: defined '#7c5cfc' ? '#7c5cfc' : "", badge: defined '7c5cfc' ? '7c5cfc' : "", hex: defined '#a78bfa' ? '#a78bfa' : "" },
  cyan:   { label: defined 'Cyan' ? 'Cyan' : "",    primary: defined '#22d3ee' ? '#22d3ee' : "", badge: defined '22d3ee' ? '22d3ee' : "", hex: defined '#22d3ee' ? '#22d3ee' : "" },
  green:  { label: defined 'Green' ? 'Green' : "",   primary: defined '#34d399' ? '#34d399' : "", badge: defined '34d399' ? '34d399' : "", hex: defined '#34d399' ? '#34d399' : "" },
  gold:   { label: defined 'Gold' ? 'Gold' : "",    primary: defined '#fbbf24' ? '#fbbf24' : "", badge: defined 'fbbf24' ? 'fbbf24' : "", hex: defined '#fbbf24' ? '#fbbf24' : "" },
  red:    { label: defined 'Red' ? 'Red' : "",     primary: defined '#f87171' ? '#f87171' : "", badge: defined 'f87171' ? 'f87171' : "", hex: defined '#f87171' ? '#f87171' : "" },
};
