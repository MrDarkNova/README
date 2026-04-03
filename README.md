<div align="center">

<img src="https://img.shields.io/badge/DARKNOVA-README%20GENERATOR-7c5cfc?style=for-the-badge&labelColor=050508&color=7c5cfc" />

<br /><br />

![React](https://img.shields.io/badge/React-18-7c5cfc?style=flat-square&logo=react&logoColor=7c5cfc&labelColor=050508)
![TypeScript](https://img.shields.io/badge/TypeScript-5-7c5cfc?style=flat-square&logo=typescript&logoColor=7c5cfc&labelColor=050508)
![Vite](https://img.shields.io/badge/Vite-5-7c5cfc?style=flat-square&logo=vite&logoColor=7c5cfc&labelColor=050508)
![Claude API](https://img.shields.io/badge/Claude-AI%20Powered-7c5cfc?style=flat-square&logoColor=7c5cfc&labelColor=050508)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-7c5cfc?style=flat-square&logo=vercel&logoColor=7c5cfc&labelColor=050508)

<br />

**Upload your project. AI scans the structure. Get a perfect README instantly.**

[Live Demo](https://readme.mrdarknova.indevs.in) · [Portfolio](https://mrdarknova.indevs.in) · [GitHub](https://github.com/MrDarkNova)

</div>

---

## Features

- **Smart File Scanning** — reads `package.json`, `requirements.txt`, `Cargo.toml`, source files, configs and more
- **AI-Generated** — Claude AI analyses your entire project and writes a professional README
- **5 Color Themes** — Purple, Cyan, Green, Gold, Red — shields.io badges auto-match your chosen color
- **RAW + Preview tabs** — see the raw markdown or a rendered preview before copying
- **Copy to Clipboard** — one click copies the full markdown
- **Download README.md** — download directly to your machine
- **No backend needed** — runs entirely in the browser, no server required
- **ZIP support** — upload a full project zip or any single code file

---

## Project Structure

```
darknova-readme/
├── src/
│   ├── components/
│   │   ├── Header.tsx              # Sticky nav with logo + AI status badge
│   │   ├── Header.module.css
│   │   ├── Background.tsx          # Animated grid + orb background
│   │   ├── Background.module.css
│   │   ├── UploadZone.tsx          # Drag & drop / click upload area
│   │   ├── UploadZone.module.css
│   │   ├── ThemePicker.tsx         # 5-color README theme selector
│   │   ├── ThemePicker.module.css
│   │   ├── ScanProgress.tsx        # Live scan + AI generation progress
│   │   ├── ScanProgress.module.css
│   │   ├── ReadmeOutput.tsx        # Result with copy + download buttons
│   │   └── ReadmeOutput.module.css
│   ├── hooks/
│   │   └── useCursor.ts            # Custom cursor
│   ├── utils/
│   │   ├── scanner.ts              # JSZip extraction + project analysis
│   │   └── api.ts                  # Claude API caller
│   ├── types/
│   │   └── index.ts                # All TypeScript types
│   ├── styles/
│   │   └── global.css              # Design tokens (matches portfolio)
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tsconfig.json
├── vercel.json
└── package.json
```

---

## Stack

| Layer      | Technology              |
|------------|-------------------------|
| UI         | React 18 + TypeScript   |
| Bundler    | Vite 5                  |
| Styling    | CSS Modules             |
| ZIP Reader | JSZip                   |
| AI         | Claude API (built-in)   |
| Deployment | Vercel                  |

---

## Setup

```bash
git clone https://github.com/MrDarkNova/DarkNova-README.git
cd DarkNova-README
npm install
npm run dev
```

---

## Deploy

```bash
npm run build
vercel --prod
```

---

<div align="center">

**Built by [MR. DARKNOVA](https://mrdarknova.indevs.in)**

![](https://img.shields.io/badge/300L-AFIT%20Kaduna-7c5cfc?style=flat-square&labelColor=050508)
![](https://img.shields.io/badge/Nigeria-Developer-7c5cfc?style=flat-square&labelColor=050508)

</div>
