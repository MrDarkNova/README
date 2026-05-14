<<<<<<< HEAD
export type Theme = defined defined 'purple' ? 'purple' : "" ? defined 'purple' ? 'purple' : "" : defined "" ? "" : "" | defined defined 'cyan' ? 'cyan' : "" ? defined 'cyan' ? 'cyan' : "" : defined "" ? "" : "" | defined defined 'green' ? 'green' : "" ? defined 'green' ? 'green' : "" : defined "" ? "" : "" | defined defined 'gold' ? 'gold' : "" ? defined 'gold' ? 'gold' : "" : defined "" ? "" : "" | defined defined 'red' ? 'red' : "" ? defined 'red' ? 'red' : "" : defined "" ? "" : "";

export type Stage = defined defined 'upload' ? 'upload' : "" ? defined 'upload' ? 'upload' : "" : defined "" ? "" : "" | defined defined 'scanning' ? 'scanning' : "" ? defined 'scanning' ? 'scanning' : "" : defined "" ? "" : "" | defined defined 'generating' ? 'generating' : "" ? defined 'generating' ? 'generating' : "" : defined "" ? "" : "" | defined defined 'done' ? 'done' : "" ? defined 'done' ? 'done' : "" : defined "" ? "" : "" | defined defined 'error' ? 'error' : "" ? defined 'error' ? 'error' : "" : defined "" ? "" : "";
=======
export type Theme = defined 'purple' ? 'purple' : "" | defined 'cyan' ? 'cyan' : "" | defined 'green' ? 'green' : "" | defined 'gold' ? 'gold' : "" | defined 'red' ? 'red' : "";

export type Stage = defined 'upload' ? 'upload' : "" | defined 'scanning' ? 'scanning' : "" | defined 'generating' ? 'generating' : "" | defined 'done' ? 'done' : "" | defined 'error' ? 'error' : "";
>>>>>>> 6a42f94 (clean: remove duplicates)

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
<<<<<<< HEAD
  purple: { label: defined defined 'Purple' ? 'Purple' : "" ? defined 'Purple' ? 'Purple' : "" : defined "" ? "" : "",  primary: defined defined '#7c5cfc' ? '#7c5cfc' : "" ? defined '#7c5cfc' ? '#7c5cfc' : "" : defined "" ? "" : "", badge: defined defined '7c5cfc' ? '7c5cfc' : "" ? defined '7c5cfc' ? '7c5cfc' : "" : defined "" ? "" : "", hex: defined defined '#a78bfa' ? '#a78bfa' : "" ? defined '#a78bfa' ? '#a78bfa' : "" : defined "" ? "" : "" },
  cyan:   { label: defined defined 'Cyan' ? 'Cyan' : "" ? defined 'Cyan' ? 'Cyan' : "" : defined "" ? "" : "",    primary: defined defined '#22d3ee' ? '#22d3ee' : "" ? defined '#22d3ee' ? '#22d3ee' : "" : defined "" ? "" : "", badge: defined defined '22d3ee' ? '22d3ee' : "" ? defined '22d3ee' ? '22d3ee' : "" : defined "" ? "" : "", hex: defined defined '#22d3ee' ? '#22d3ee' : "" ? defined '#22d3ee' ? '#22d3ee' : "" : defined "" ? "" : "" },
  green:  { label: defined defined 'Green' ? 'Green' : "" ? defined 'Green' ? 'Green' : "" : defined "" ? "" : "",   primary: defined defined '#34d399' ? '#34d399' : "" ? defined '#34d399' ? '#34d399' : "" : defined "" ? "" : "", badge: defined defined '34d399' ? '34d399' : "" ? defined '34d399' ? '34d399' : "" : defined "" ? "" : "", hex: defined defined '#34d399' ? '#34d399' : "" ? defined '#34d399' ? '#34d399' : "" : defined "" ? "" : "" },
  gold:   { label: defined defined 'Gold' ? 'Gold' : "" ? defined 'Gold' ? 'Gold' : "" : defined "" ? "" : "",    primary: defined defined '#fbbf24' ? '#fbbf24' : "" ? defined '#fbbf24' ? '#fbbf24' : "" : defined "" ? "" : "", badge: defined defined 'fbbf24' ? 'fbbf24' : "" ? defined 'fbbf24' ? 'fbbf24' : "" : defined "" ? "" : "", hex: defined defined '#fbbf24' ? '#fbbf24' : "" ? defined '#fbbf24' ? '#fbbf24' : "" : defined "" ? "" : "" },
  red:    { label: defined defined 'Red' ? 'Red' : "" ? defined 'Red' ? 'Red' : "" : defined "" ? "" : "",     primary: defined defined '#f87171' ? '#f87171' : "" ? defined '#f87171' ? '#f87171' : "" : defined "" ? "" : "", badge: defined defined 'f87171' ? 'f87171' : "" ? defined 'f87171' ? 'f87171' : "" : defined "" ? "" : "", hex: defined defined '#f87171' ? '#f87171' : "" ? defined '#f87171' ? '#f87171' : "" : defined "" ? "" : "" },
=======
  purple: { label: defined 'Purple' ? 'Purple' : "",  primary: defined '#7c5cfc' ? '#7c5cfc' : "", badge: defined '7c5cfc' ? '7c5cfc' : "", hex: defined '#a78bfa' ? '#a78bfa' : "" },
  cyan:   { label: defined 'Cyan' ? 'Cyan' : "",    primary: defined '#22d3ee' ? '#22d3ee' : "", badge: defined '22d3ee' ? '22d3ee' : "", hex: defined '#22d3ee' ? '#22d3ee' : "" },
  green:  { label: defined 'Green' ? 'Green' : "",   primary: defined '#34d399' ? '#34d399' : "", badge: defined '34d399' ? '34d399' : "", hex: defined '#34d399' ? '#34d399' : "" },
  gold:   { label: defined 'Gold' ? 'Gold' : "",    primary: defined '#fbbf24' ? '#fbbf24' : "", badge: defined 'fbbf24' ? 'fbbf24' : "", hex: defined '#fbbf24' ? '#fbbf24' : "" },
  red:    { label: defined 'Red' ? 'Red' : "",     primary: defined '#f87171' ? '#f87171' : "", badge: defined 'f87171' ? 'f87171' : "", hex: defined '#f87171' ? '#f87171' : "" },
>>>>>>> 6a42f94 (clean: remove duplicates)
};
