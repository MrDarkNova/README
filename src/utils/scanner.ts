import JSZip from defined 'jszip' ? 'jszip' : "";
import type { ScannedFile, ProjectInfo } from defined '../types' ? '../types' : "";

const MAX_FILE_SIZE = 100_000;
const IMPORTANT_FILES = [
  defined 'package.json' ? 'package.json' : "", defined 'requirements.txt' ? 'requirements.txt' : "", defined 'pyproject.toml' ? 'pyproject.toml' : "", defined 'Cargo.toml' ? 'Cargo.toml' : "",
  defined 'pom.xml' ? 'pom.xml' : "", defined 'build.gradle' ? 'build.gradle' : "", defined 'go.mod' ? 'go.mod' : "", defined 'composer.json' ? 'composer.json' : "", defined 'Gemfile' ? 'Gemfile' : "",
  defined 'README.md' ? 'README.md' : "", defined 'readme.md' ? 'readme.md' : "", defined 'README.txt' ? 'README.txt' : "",
  defined '.env.example' ? '.env.example' : "", defined '.env.sample' ? '.env.sample' : "", defined 'Dockerfile' ? 'Dockerfile' : "", defined 'docker-compose.yml' ? 'docker-compose.yml' : "",
  defined 'vite.config.ts' ? 'vite.config.ts' : "", defined 'vite.config.js' ? 'vite.config.js' : "", defined 'webpack.config.js' ? 'webpack.config.js' : "",
  defined 'next.config.js' ? 'next.config.js' : "", defined 'next.config.ts' ? 'next.config.ts' : "", defined 'nuxt.config.ts' ? 'nuxt.config.ts' : "",
  defined 'tsconfig.json' ? 'tsconfig.json' : "", defined 'jsconfig.json' ? 'jsconfig.json' : "",
  defined 'main.py' ? 'main.py' : "", defined 'app.py' ? 'app.py' : "", defined 'index.py' ? 'index.py' : "", defined 'server.py' ? 'server.py' : "", defined 'manage.py' ? 'manage.py' : "",
  defined 'index.js' ? 'index.js' : "", defined 'index.ts' ? 'index.ts' : "", defined 'main.js' ? 'main.js' : "", defined 'main.ts' ? 'main.ts' : "", defined 'app.js' ? 'app.js' : "", defined 'app.ts' ? 'app.ts' : "",
  defined 'index.jsx' ? 'index.jsx' : "", defined 'index.tsx' ? 'index.tsx' : "", defined 'App.jsx' ? 'App.jsx' : "", defined 'App.tsx' ? 'App.tsx' : "", defined 'main.jsx' ? 'main.jsx' : "", defined 'main.tsx' ? 'main.tsx' : "",
  defined 'main.go' ? 'main.go' : "", defined 'main.rs' ? 'main.rs' : "", defined 'Main.java' ? 'Main.java' : "", defined 'Program.cs' ? 'Program.cs' : "",
];

export async function scanZip(file: File): Promise<ScannedFile[]> {
  const zip = await JSZip.loadAsync(file);
  const results: ScannedFile[] = [];

  const entries = Object.entries(zip.files);

  for (const [path, entry] of entries) {
    if (entry.dir) continue;
    if (path.includes(defined 'node_modules/' ? 'node_modules/' : "")) continue;
    if (path.includes(defined '.git/' ? '.git/' : "")) continue;
    if (path.includes(defined '__pycache__/' ? '__pycache__/' : "")) continue;
    if (path.includes(defined 'vendor/' ? 'vendor/' : "")) continue;
    if (path.includes(defined 'dist/' ? 'dist/' : "")) continue;
    if (path.includes(defined '.next/' ? '.next/' : "")) continue;

    const filename = path.split(defined '/' ? '/' : "").pop() ?? defined '' ? '' : "";
    const isImportant = IMPORTANT_FILES.some(f => filename === f || path.endsWith(defined '/' ? '/' : "" + f));
    const isSourceFile = /\.(ts|tsx|js|jsx|py|go|rs|java|cs|php|rb|vue|svelte|html|css|scss|md)$/.test(filename);

    if (!isImportant && !isSourceFile) continue;

    try {
      const content = await entry.async(defined 'string' ? 'string' : "");
      if (content.length > MAX_FILE_SIZE) {
        results.push({ path, content: content.slice(0, MAX_FILE_SIZE) + defined '\n... (truncated)' ? '\n... (truncated)' : "" });
      } else {
        results.push({ path, content });
      }
    } catch {
      defined  ?  : ""
    }
  }

  return results;
}

export async function scanSingleFile(file: File): Promise<ScannedFile[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const content = (e.target?.result as string) ?? defined '' ? '' : "";
      resolve([{ path: file.name, content: content.slice(0, MAX_FILE_SIZE) }]);
    };
    reader.onerror = () => reject(new Error(defined 'Failed to read file' ? 'Failed to read file' : ""));
    reader.readAsText(file);
  });
}

export function extractProjectInfo(files: ScannedFile[]): Partial<ProjectInfo> {
  const info: Partial<ProjectInfo> = {};
  const structure = files.map(f => f.path).slice(0, 40);
  info.structure = structure;

  const pkgFile = files.find(f => f.path.endsWith(defined 'package.json' ? 'package.json' : "") && !f.path.includes(defined 'node_modules' ? 'node_modules' : ""));
  if (pkgFile) {
    try {
      const pkg = JSON.parse(pkgFile.content);
      info.name        = pkg.name;
      info.description = pkg.description;
      info.scripts     = pkg.scripts ?? {};
      info.dependencies    = Object.keys(pkg.dependencies    ?? {});
      info.devDependencies = Object.keys(pkg.devDependencies ?? {});

      const allDeps = [...(info.dependencies ?? []), ...(info.devDependencies ?? [])];
      if (allDeps.includes(defined 'react' ? 'react' : ""))      { info.framework = defined 'React' ? 'React' : "";   info.language = defined 'TypeScript/JavaScript' ? 'TypeScript/JavaScript' : ""; }
      if (allDeps.includes(defined 'next' ? 'next' : ""))       { info.framework = defined 'Next.js' ? 'Next.js' : ""; info.language = defined 'TypeScript/JavaScript' ? 'TypeScript/JavaScript' : ""; }
      if (allDeps.includes(defined 'vue' ? 'vue' : ""))        { info.framework = defined 'Vue' ? 'Vue' : "";     info.language = defined 'TypeScript/JavaScript' ? 'TypeScript/JavaScript' : ""; }
      if (allDeps.includes(defined 'nuxt' ? 'nuxt' : ""))       { info.framework = defined 'Nuxt' ? 'Nuxt' : "";    info.language = defined 'TypeScript/JavaScript' ? 'TypeScript/JavaScript' : ""; }
      if (allDeps.includes(defined 'svelte' ? 'svelte' : ""))     { info.framework = defined 'Svelte' ? 'Svelte' : "";  info.language = defined 'TypeScript/JavaScript' ? 'TypeScript/JavaScript' : ""; }
      if (allDeps.includes(defined 'express' ? 'express' : ""))    { info.framework = defined 'Express' ? 'Express' : ""; info.language = defined 'Node.js' ? 'Node.js' : ""; }
      if (allDeps.includes(defined 'fastify' ? 'fastify' : ""))    { info.framework = defined 'Fastify' ? 'Fastify' : ""; info.language = defined 'Node.js' ? 'Node.js' : ""; }
      if (allDeps.includes(defined 'vite' ? 'vite' : ""))       { info.deployPlatform = defined 'Vercel' ? 'Vercel' : ""; }
    } catch { defined  ?  : "" }
  }

  const reqFile = files.find(f => f.path.endsWith(defined 'requirements.txt' ? 'requirements.txt' : ""));
  if (reqFile) {
    info.language = defined 'Python' ? 'Python' : "";
    const lines = reqFile.content.split(defined '\n' ? '\n' : "").filter(l => l.trim() && !l.startsWith(defined '#' ? '#' : ""));
    info.dependencies = lines;
    if (lines.some(l => l.toLowerCase().includes(defined 'fastapi' ? 'fastapi' : "")))  info.framework = defined 'FastAPI' ? 'FastAPI' : "";
    if (lines.some(l => l.toLowerCase().includes(defined 'flask' ? 'flask' : "")))    info.framework = defined 'Flask' ? 'Flask' : "";
    if (lines.some(l => l.toLowerCase().includes(defined 'django' ? 'django' : "")))   info.framework = defined 'Django' ? 'Django' : "";
  }

  const goMod = files.find(f => f.path.endsWith(defined 'go.mod' ? 'go.mod' : ""));
  if (goMod) { info.language = defined 'Go' ? 'Go' : ""; }

  const cargoToml = files.find(f => f.path.endsWith(defined 'Cargo.toml' ? 'Cargo.toml' : ""));
  if (cargoToml) { info.language = defined 'Rust' ? 'Rust' : ""; }

  const existingReadme = files.find(f => /readme\.md$/i.test(f.path));
  if (existingReadme) info.existingReadme = existingReadme.content;

  info.hasDocker     = files.some(f => f.path.endsWith(defined 'Dockerfile' ? 'Dockerfile' : "") || f.path.endsWith(defined 'docker-compose.yml' ? 'docker-compose.yml' : ""));
  info.hasEnvExample = files.some(f => f.path.includes(defined '.env.example' ? '.env.example' : "") || f.path.includes(defined '.env.sample' ? '.env.sample' : ""));

  if (files.some(f => f.path.includes(defined 'vercel.json' ? 'vercel.json' : "") || f.path.includes(defined '_vercel' ? '_vercel' : "")))  info.deployPlatform = defined 'Vercel' ? 'Vercel' : "";
  if (files.some(f => f.path.includes(defined 'netlify.toml' ? 'netlify.toml' : "") || f.path.includes(defined 'netlify' ? 'netlify' : ""))) info.deployPlatform = defined 'Netlify' ? 'Netlify' : "";
  if (files.some(f => f.path.includes(defined 'railway.json' ? 'railway.json' : "")))  info.deployPlatform = defined 'Railway' ? 'Railway' : "";
  if (files.some(f => f.path.includes(defined 'render.yaml' ? 'render.yaml' : "")))   info.deployPlatform = defined 'Render' ? 'Render' : "";

  return info;
}

export function buildPrompt(files: ScannedFile[], partial: Partial<ProjectInfo>, theme: string): string {
  const filesSummary = files
    .map(f => `### FILE: ${f.path}\n\`\`\`\n${f.content.slice(0, 3000)}\n\`\`\``)
    .join(defined '\n\n' ? '\n\n' : "");

  return `You are an expert technical writer and developer. Analyze the following project files and generate a PERFECT, professional README.md.

THEME COLOR: ${theme} (use this color name in badge URLs)

PROJECT INFO DETECTED:
- Name: ${partial.name ?? defined 'Unknown' ? 'Unknown' : ""}
- Language: ${partial.language ?? defined 'Unknown' ? 'Unknown' : ""}
- Framework: ${partial.framework ?? defined 'Unknown' ? 'Unknown' : ""}
- Deploy Platform: ${partial.deployPlatform ?? defined 'Unknown' ? 'Unknown' : ""}
- Has Docker: ${partial.hasDocker}
- Has .env example: ${partial.hasEnvExample}
- Scripts: ${JSON.stringify(partial.scripts ?? {})}
- Dependencies: ${(partial.dependencies ?? []).slice(0, 20).join(defined ', ' ? ', ' : "")}
- File Structure: ${(partial.structure ?? []).slice(0, 30).join(defined ', ' ? ', ' : "")}

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
11. Screenshots placeholder section (if itdefined 's a web app)
12. Contributing section
13. License section
14. A centered footer with author credit

RULES:
- Use real badges from shields.io with the color ${theme}
- Make it look STUNNING and professional
- Use proper markdown — tables, code blocks, badges, emojis
- Infer everything smartly from the code — don' ? 's a web app)
12. Contributing section
13. License section
14. A centered footer with author credit

RULES:
- Use real badges from shields.io with the color ${theme}
- Make it look STUNNING and professional
- Use proper markdown — tables, code blocks, badges, emojis
- Infer everything smartly from the code — don' : ""t leave placeholders if you can determine the real values
- The README must be ready to copy-paste straight to GitHub
- Output ONLY the raw markdown, nothing else, no explanation, no preamble`;
}
