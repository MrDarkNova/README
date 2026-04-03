import JSZip from 'jszip';
import type { ScannedFile, ProjectInfo } from '../types';

const MAX_FILE_SIZE = 100_000;
const IMPORTANT_FILES = [
  'package.json', 'requirements.txt', 'pyproject.toml', 'Cargo.toml',
  'pom.xml', 'build.gradle', 'go.mod', 'composer.json', 'Gemfile',
  'README.md', 'readme.md', 'README.txt',
  '.env.example', '.env.sample', 'Dockerfile', 'docker-compose.yml',
  'vite.config.ts', 'vite.config.js', 'webpack.config.js',
  'next.config.js', 'next.config.ts', 'nuxt.config.ts',
  'tsconfig.json', 'jsconfig.json',
  'main.py', 'app.py', 'index.py', 'server.py', 'manage.py',
  'index.js', 'index.ts', 'main.js', 'main.ts', 'app.js', 'app.ts',
  'index.jsx', 'index.tsx', 'App.jsx', 'App.tsx', 'main.jsx', 'main.tsx',
  'main.go', 'main.rs', 'Main.java', 'Program.cs',
];

export async function scanZip(file: File): Promise<ScannedFile[]> {
  const zip = await JSZip.loadAsync(file);
  const results: ScannedFile[] = [];

  const entries = Object.entries(zip.files);

  for (const [path, entry] of entries) {
    if (entry.dir) continue;
    if (path.includes('node_modules/')) continue;
    if (path.includes('.git/')) continue;
    if (path.includes('__pycache__/')) continue;
    if (path.includes('vendor/')) continue;
    if (path.includes('dist/')) continue;
    if (path.includes('.next/')) continue;

    const filename = path.split('/').pop() ?? '';
    const isImportant = IMPORTANT_FILES.some(f => filename === f || path.endsWith('/' + f));
    const isSourceFile = /\.(ts|tsx|js|jsx|py|go|rs|java|cs|php|rb|vue|svelte|html|css|scss|md)$/.test(filename);

    if (!isImportant && !isSourceFile) continue;

    try {
      const content = await entry.async('string');
      if (content.length > MAX_FILE_SIZE) {
        results.push({ path, content: content.slice(0, MAX_FILE_SIZE) + '\n... (truncated)' });
      } else {
        results.push({ path, content });
      }
    } catch {
      // binary file, skip
    }
  }

  return results;
}

export async function scanSingleFile(file: File): Promise<ScannedFile[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const content = (e.target?.result as string) ?? '';
      resolve([{ path: file.name, content: content.slice(0, MAX_FILE_SIZE) }]);
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

export function extractProjectInfo(files: ScannedFile[]): Partial<ProjectInfo> {
  const info: Partial<ProjectInfo> = {};
  const structure = files.map(f => f.path).slice(0, 40);
  info.structure = structure;

  const pkgFile = files.find(f => f.path.endsWith('package.json') && !f.path.includes('node_modules'));
  if (pkgFile) {
    try {
      const pkg = JSON.parse(pkgFile.content);
      info.name        = pkg.name;
      info.description = pkg.description;
      info.scripts     = pkg.scripts ?? {};
      info.dependencies    = Object.keys(pkg.dependencies    ?? {});
      info.devDependencies = Object.keys(pkg.devDependencies ?? {});

      const allDeps = [...(info.dependencies ?? []), ...(info.devDependencies ?? [])];
      if (allDeps.includes('react'))      { info.framework = 'React';   info.language = 'TypeScript/JavaScript'; }
      if (allDeps.includes('next'))       { info.framework = 'Next.js'; info.language = 'TypeScript/JavaScript'; }
      if (allDeps.includes('vue'))        { info.framework = 'Vue';     info.language = 'TypeScript/JavaScript'; }
      if (allDeps.includes('nuxt'))       { info.framework = 'Nuxt';    info.language = 'TypeScript/JavaScript'; }
      if (allDeps.includes('svelte'))     { info.framework = 'Svelte';  info.language = 'TypeScript/JavaScript'; }
      if (allDeps.includes('express'))    { info.framework = 'Express'; info.language = 'Node.js'; }
      if (allDeps.includes('fastify'))    { info.framework = 'Fastify'; info.language = 'Node.js'; }
      if (allDeps.includes('vite'))       { info.deployPlatform = 'Vercel'; }
    } catch { /* ignore */ }
  }

  const reqFile = files.find(f => f.path.endsWith('requirements.txt'));
  if (reqFile) {
    info.language = 'Python';
    const lines = reqFile.content.split('\n').filter(l => l.trim() && !l.startsWith('#'));
    info.dependencies = lines;
    if (lines.some(l => l.toLowerCase().includes('fastapi')))  info.framework = 'FastAPI';
    if (lines.some(l => l.toLowerCase().includes('flask')))    info.framework = 'Flask';
    if (lines.some(l => l.toLowerCase().includes('django')))   info.framework = 'Django';
  }

  const goMod = files.find(f => f.path.endsWith('go.mod'));
  if (goMod) { info.language = 'Go'; }

  const cargoToml = files.find(f => f.path.endsWith('Cargo.toml'));
  if (cargoToml) { info.language = 'Rust'; }

  const existingReadme = files.find(f => /readme\.md$/i.test(f.path));
  if (existingReadme) info.existingReadme = existingReadme.content;

  info.hasDocker     = files.some(f => f.path.endsWith('Dockerfile') || f.path.endsWith('docker-compose.yml'));
  info.hasEnvExample = files.some(f => f.path.includes('.env.example') || f.path.includes('.env.sample'));

  if (files.some(f => f.path.includes('vercel.json') || f.path.includes('_vercel')))  info.deployPlatform = 'Vercel';
  if (files.some(f => f.path.includes('netlify.toml') || f.path.includes('netlify'))) info.deployPlatform = 'Netlify';
  if (files.some(f => f.path.includes('railway.json')))  info.deployPlatform = 'Railway';
  if (files.some(f => f.path.includes('render.yaml')))   info.deployPlatform = 'Render';

  return info;
}

export function buildPrompt(files: ScannedFile[], partial: Partial<ProjectInfo>, theme: string): string {
  const filesSummary = files
    .map(f => `### FILE: ${f.path}\n\`\`\`\n${f.content.slice(0, 3000)}\n\`\`\``)
    .join('\n\n');

  return `You are an expert technical writer and developer. Analyze the following project files and generate a PERFECT, professional README.md.

THEME COLOR: ${theme} (use this color name in badge URLs)

PROJECT INFO DETECTED:
- Name: ${partial.name ?? 'Unknown'}
- Language: ${partial.language ?? 'Unknown'}
- Framework: ${partial.framework ?? 'Unknown'}
- Deploy Platform: ${partial.deployPlatform ?? 'Unknown'}
- Has Docker: ${partial.hasDocker}
- Has .env example: ${partial.hasEnvExample}
- Scripts: ${JSON.stringify(partial.scripts ?? {})}
- Dependencies: ${(partial.dependencies ?? []).slice(0, 20).join(', ')}
- File Structure: ${(partial.structure ?? []).slice(0, 30).join(', ')}

PROJECT FILES:
${filesSummary}

Generate a complete, stunning README.md with these sections (include all that are relevant):

1. A centered header with shields.io badges (language, framework, deploy platform, license) — use color ${theme} for badge colors
2. A short punchy description
3. Features section with emoji bullets
4. Tech Stack table
5. Project Structure (as a code block tree)
6. Prerequisites
7. Installation & Setup (with code blocks)
8. Environment Variables section (if .env detected)
9. Available Scripts
10. Deployment section
11. Screenshots placeholder section (if it's a web app)
12. Contributing section
13. License section
14. A centered footer with author credit

RULES:
- Use real badges from shields.io with the color ${theme}
- Make it look STUNNING and professional
- Use proper markdown — tables, code blocks, badges, emojis
- Infer everything smartly from the code — don't leave placeholders if you can determine the real values
- The README must be ready to copy-paste straight to GitHub
- Output ONLY the raw markdown, nothing else, no explanation, no preamble`;
}
