# README Studio

README Studio scans a project ZIP or a single source file, identifies useful project details, and generates a README you can preview, copy, or download.

## Features

- Drag-and-drop or file-picker upload for ZIPs and common source/configuration files
- Project-aware detection for languages, frameworks, package scripts, and deployment configuration
- Five badge color themes
- README preview and raw Markdown views
- Copy-to-clipboard and `README.md` download
- Accessible keyboard controls, reduced-motion support, and responsive layouts
- Bounded archive scanning that skips common secret files, dependency folders, and generated output

## Privacy

ZIP files are inspected in the browser. The scanner excludes common `.env` files, private-key formats, credential/secret filenames, dependency folders, and build output; it also redacts common credential assignments and token formats from included text. Selected text and project metadata are sent to the `/api/generate` endpoint to create the README. Automated filters cannot catch every secret, so do not upload credentials or code you are not permitted to share; check your hosting and model-provider retention policies before using private source code.

## Project structure

```text
api/
└── generate.js          # Serverless README-generation endpoint
src/
├── App.tsx              # Upload, progress, preview, and download flow
├── main.tsx             # React entry point
├── styles/global.css    # Responsive design system
├── types/index.ts       # Shared project and theme types
└── utils/
    ├── api.ts           # Generation endpoint client
    └── scanner.ts       # ZIP safety filters and project analysis
index.html
vite.config.ts
vercel.json
```

## Run locally

```bash
git clone https://github.com/MrDarkNova/README.git
cd README
npm install
npx vercel dev
```

Vercel's local development server runs both the Vite app and the `/api/generate` function. To run the UI by itself, use `npm run dev`; the generation endpoint requires the serverless runtime.

Create a production build with:

```bash
npm run build
```

Deploy the repository with Vercel to publish the app and its API function.