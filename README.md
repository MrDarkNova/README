<div align="center">

<img src="https://img.shields.io/badge/DARKNOVA-TERMINAL-22d3ee?style=for-the-badge&labelColor=050508&color=22d3ee" />

<br /><br />

![React](https://img.shields.io/badge/React-18-22d3ee?style=flat-square&logo=react&logoColor=22d3ee&labelColor=050508)
![TypeScript](https://img.shields.io/badge/TypeScript-5-22d3ee?style=flat-square&logo=typescript&logoColor=22d3ee&labelColor=050508)
![Vite](https://img.shields.io/badge/Vite-5-22d3ee?style=flat-square&logo=vite&logoColor=22d3ee&labelColor=050508)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-22d3ee?style=flat-square&logo=vercel&logoColor=22d3ee&labelColor=050508)

<br />

```
╔══════════════════════════════════════════════════╗
║         DARKNOVA TERMINAL  v2.0.0                ║
║         Intelligence Reconnaissance System       ║
╚══════════════════════════════════════════════════╝
```

**A real-time OSINT reconnaissance platform built on the DarkNova stack.**  
Cross-platform username enumeration, IP geolocation, email intelligence — all in a cinematic hacker terminal.

[Live Demo](https://terminal.mrdarknova.indevs.in) · [Portfolio](https://mrdarknova.indevs.in) · [GitHub](https://github.com/MrDarkNova)

</div>

---

## Features

- **Username Recon** — scans 30+ platforms and reports found/not found per site with direct links
- **IP Intelligence** — geolocation, ISP, timezone, coordinates via `ipapi.co`
- **Email Analysis** — deliverability check, disposable detection, MX record status, trust score
- **Self IP Reveal** — exposes your own public IP with full location breakdown
- **Terminal UX** — command history (↑↓), TAB autocomplete, typewriter output, scanline effects
- **DarkNova Aesthetic** — exact design tokens from the main portfolio (Bebas Neue, Space Mono, orbs, glitch)

---

## Commands

```bash
scan user <username>     # Cross-platform username recon
scan ip <ip/domain>      # IP geolocation and ISP lookup
scan email <address>     # Email intelligence analysis
scan myip                # Reveal and trace your own IP
help                     # Show all commands
history                  # View past scans
clear                    # Clear terminal
about                    # About this tool
```

---

## Project Structure

```
darknova-terminal/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx              # Top bar with status indicator
│   │   ├── Navbar.module.css
│   │   ├── TerminalOutput.tsx      # Scrollable output pane
│   │   ├── TerminalOutput.module.css
│   │   ├── TerminalInput.tsx       # Prompt input with TAB + history
│   │   ├── TerminalInput.module.css
│   │   ├── Background.tsx          # Orbs + grid (portfolio-matched)
│   │   ├── Background.module.css
│   │   ├── Footer.tsx
│   │   └── Footer.module.css
│   ├── hooks/
│   │   ├── useTerminal.ts          # Core terminal state + command runner
│   │   └── useCursor.ts            # Custom cursor logic
│   ├── utils/
│   │   ├── commandProcessor.ts     # Command parser + dispatcher
│   │   ├── usernameScanner.ts      # 30+ platform scanner
│   │   ├── ipLookup.ts             # ipapi.co integration
│   │   └── emailAnalyzer.ts        # Email intelligence logic
│   ├── types/
│   │   └── index.ts                # All TypeScript interfaces
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

| Layer      | Technology                    |
|------------|-------------------------------|
| UI         | React 18 + TypeScript         |
| Bundler    | Vite 5                        |
| Styling    | CSS Modules                   |
| IP API     | ipapi.co (free, no key)       |
| Deployment | Vercel                        |

---

## Setup

```bash
# Clone
git clone https://github.com/MrDarkNova/DarkNova-Terminal.git
cd DarkNova-Terminal

# Install
npm install

# Dev server
npm run dev

# Build
npm run build
```

---

## Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

The `vercel.json` rewrite config handles SPA routing automatically.

---

## Disclaimer

> This tool is built for **educational purposes only**.  
> All data is sourced from public APIs.  
> Use responsibly and ethically.

---

<div align="center">

**Built by [MR. DARKNOVA](https://mrdarknova.indevs.in)**

![](https://img.shields.io/badge/300L-AFIT%20Kaduna-22d3ee?style=flat-square&labelColor=050508)
![](https://img.shields.io/badge/Nigeria-Developer-22d3ee?style=flat-square&labelColor=050508)

</div>
