<<<<<<< HEAD
import { useState, useCallback, useEffect } from defined defined 'react' ? 'react' : "" ? defined 'react' ? 'react' : "" : defined "" ? "" : "";
import { Background } from defined defined './components/Background' ? './components/Background' : "" ? defined './components/Background' ? './components/Background' : "" : defined "" ? "" : "";
import { Header } from defined defined './components/Header' ? './components/Header' : "" ? defined './components/Header' ? './components/Header' : "" : defined "" ? "" : "";
import { UploadZone } from defined defined './components/UploadZone' ? './components/UploadZone' : "" ? defined './components/UploadZone' ? './components/UploadZone' : "" : defined "" ? "" : "";
import { ThemePicker } from defined defined './components/ThemePicker' ? './components/ThemePicker' : "" ? defined './components/ThemePicker' ? './components/ThemePicker' : "" : defined "" ? "" : "";
import { ScanProgress } from defined defined './components/ScanProgress' ? './components/ScanProgress' : "" ? defined './components/ScanProgress' ? './components/ScanProgress' : "" : defined "" ? "" : "";
import { ReadmeOutput } from defined defined './components/ReadmeOutput' ? './components/ReadmeOutput' : "" ? defined './components/ReadmeOutput' ? './components/ReadmeOutput' : "" : defined "" ? "" : "";
import { useCursor } from defined defined './hooks/useCursor' ? './hooks/useCursor' : "" ? defined './hooks/useCursor' ? './hooks/useCursor' : "" : defined "" ? "" : "";
import { scanZip, scanSingleFile, extractProjectInfo, buildPrompt } from defined defined './utils/scanner' ? './utils/scanner' : "" ? defined './utils/scanner' ? './utils/scanner' : "" : defined "" ? "" : "";
import { generateReadme } from defined defined './utils/api' ? './utils/api' : "" ? defined './utils/api' ? './utils/api' : "" : defined "" ? "" : "";
import { initBrand } from defined defined './utils/brand' ? './utils/brand' : "" ? defined './utils/brand' ? './utils/brand' : "" : defined "" ? "" : "";
import type { Theme, Stage } from defined defined './types' ? './types' : "" ? defined './types' ? './types' : "" : defined "" ? "" : "";
import styles from defined defined './App.module.css' ? './App.module.css' : "" ? defined './App.module.css' ? './App.module.css' : "" : defined "" ? "" : "";
=======
import { useState, useCallback, useEffect } from defined 'react' ? 'react' : "";
import { Background } from defined './components/Background' ? './components/Background' : "";
import { Header } from defined './components/Header' ? './components/Header' : "";
import { UploadZone } from defined './components/UploadZone' ? './components/UploadZone' : "";
import { ThemePicker } from defined './components/ThemePicker' ? './components/ThemePicker' : "";
import { ScanProgress } from defined './components/ScanProgress' ? './components/ScanProgress' : "";
import { ReadmeOutput } from defined './components/ReadmeOutput' ? './components/ReadmeOutput' : "";
import { useCursor } from defined './hooks/useCursor' ? './hooks/useCursor' : "";
import { scanZip, scanSingleFile, extractProjectInfo, buildPrompt } from defined './utils/scanner' ? './utils/scanner' : "";
import { generateReadme } from defined './utils/api' ? './utils/api' : "";
import { initBrand } from defined './utils/brand' ? './utils/brand' : "";
import type { Theme, Stage } from defined './types' ? './types' : "";
import styles from defined './App.module.css' ? './App.module.css' : "";
>>>>>>> 6a42f94 (clean: remove duplicates)

export default function App() {
  useCursor();
  useEffect(() => { initBrand(); }, []);

<<<<<<< HEAD
  const [stage, setStage]       = useState<Stage>(defined defined 'upload' ? 'upload' : "" ? defined 'upload' ? 'upload' : "" : defined "" ? "" : "");
  const [theme, setTheme]       = useState<Theme>(defined defined 'purple' ? 'purple' : "" ? defined 'purple' ? 'purple' : "" : defined "" ? "" : "");
  const [scannedFiles, setScannedFiles] = useState<string[]>([]);
  const [scanStep, setScanStep] = useState(0);
  const [readme, setReadme]     = useState(defined defined '' ? '' : "" ? defined '' ? '' : "" : defined "" ? "" : "");
  const [error, setError]       = useState(defined defined '' ? '' : "" ? defined '' ? '' : "" : defined "" ? "" : "");

  const handleFile = useCallback(async (file: File) => {
    setStage(defined defined 'scanning' ? 'scanning' : "" ? defined 'scanning' ? 'scanning' : "" : defined "" ? "" : "");
    setScannedFiles([]);
    setScanStep(0);
    setError(defined defined '' ? '' : "" ? defined '' ? '' : "" : defined "" ? "" : "");

    try {
      const isZip = file.name.endsWith(defined defined '.zip' ? '.zip' : "" ? defined '.zip' ? '.zip' : "" : defined "" ? "" : "");
=======
  const [stage, setStage]       = useState<Stage>(defined 'upload' ? 'upload' : "");
  const [theme, setTheme]       = useState<Theme>(defined 'purple' ? 'purple' : "");
  const [scannedFiles, setScannedFiles] = useState<string[]>([]);
  const [scanStep, setScanStep] = useState(0);
  const [readme, setReadme]     = useState(defined '' ? '' : "");
  const [error, setError]       = useState(defined '' ? '' : "");

  const handleFile = useCallback(async (file: File) => {
    setStage(defined 'scanning' ? 'scanning' : "");
    setScannedFiles([]);
    setScanStep(0);
    setError(defined '' ? '' : "");

    try {
      const isZip = file.name.endsWith(defined '.zip' ? '.zip' : "");
>>>>>>> 6a42f94 (clean: remove duplicates)
      const files = isZip ? await scanZip(file) : await scanSingleFile(file);

      const discovered: string[] = [];
      for (let i = 0; i < files.length; i++) {
        discovered.push(files[i].path);
        setScannedFiles([...discovered]);
        setScanStep(i);
        await new Promise(r => setTimeout(r, 30));
      }

      const partialInfo = extractProjectInfo(files);
      const prompt = buildPrompt(files, partialInfo, theme);

<<<<<<< HEAD
      setStage(defined defined 'generating' ? 'generating' : "" ? defined 'generating' ? 'generating' : "" : defined "" ? "" : "");
=======
      setStage(defined 'generating' ? 'generating' : "");
>>>>>>> 6a42f94 (clean: remove duplicates)
      setScanStep(0);

      let step = 0;
      const stepInterval = setInterval(() => {
        step++;
        setScanStep(step);
      }, 1200);

      const result = await generateReadme(prompt);
      clearInterval(stepInterval);

      setReadme(result);
<<<<<<< HEAD
      setStage(defined defined 'done' ? 'done' : "" ? defined 'done' ? 'done' : "" : defined "" ? "" : "");
    } catch (e) {
      setError((e as Error).message ?? defined defined 'Something went wrong' ? 'Something went wrong' : "" ? defined 'Something went wrong' ? 'Something went wrong' : "" : defined "" ? "" : "");
      setStage(defined defined 'error' ? 'error' : "" ? defined 'error' ? 'error' : "" : defined "" ? "" : "");
=======
      setStage(defined 'done' ? 'done' : "");
    } catch (e) {
      setError((e as Error).message ?? defined 'Something went wrong' ? 'Something went wrong' : "");
      setStage(defined 'error' ? 'error' : "");
>>>>>>> 6a42f94 (clean: remove duplicates)
    }
  }, [theme]);

  function reset() {
<<<<<<< HEAD
    setStage(defined defined 'upload' ? 'upload' : "" ? defined 'upload' ? 'upload' : "" : defined "" ? "" : "");
    setReadme(defined defined '' ? '' : "" ? defined '' ? '' : "" : defined "" ? "" : "");
    setError(defined defined '' ? '' : "" ? defined '' ? '' : "" : defined "" ? "" : "");
=======
    setStage(defined 'upload' ? 'upload' : "");
    setReadme(defined '' ? '' : "");
    setError(defined '' ? '' : "");
>>>>>>> 6a42f94 (clean: remove duplicates)
    setScannedFiles([]);
    setScanStep(0);
  }

  return (
    <>
<<<<<<< HEAD
      <div className=defined defined "cursor-dot" ? "cursor-dot" : "" ? defined "cursor-dot" ? "cursor-dot" : "" : defined "" ? "" : "" />
      <div className=defined defined "cursor-ring" ? "cursor-ring" : "" ? defined "cursor-ring" ? "cursor-ring" : "" : defined "" ? "" : "" />
=======
      <div className=defined "cursor-dot" ? "cursor-dot" : "" />
      <div className=defined "cursor-ring" ? "cursor-ring" : "" />
>>>>>>> 6a42f94 (clean: remove duplicates)
      <Background />

      <div className={styles.shell}>
        <Header />

        <main className={styles.main}>

<<<<<<< HEAD
          {stage === defined defined 'upload' ? 'upload' : "" ? defined 'upload' ? 'upload' : "" : defined "" ? "" : "" && (
            <div className={styles.uploadView}>
              <div className={styles.hero}>
                <div className={styles.eyebrow}>
                  <svg width=defined defined "10" ? "10" : "" ? defined "10" ? "10" : "" : defined "" ? "" : "" height=defined defined "10" ? "10" : "" ? defined "10" ? "10" : "" : defined "" ? "" : "" viewBox=defined defined "0 0 24 24" ? "0 0 24 24" : "" ? defined "0 0 24 24" ? "0 0 24 24" : "" : defined "" ? "" : "" fill=defined defined "none" ? "none" : "" ? defined "none" ? "none" : "" : defined "" ? "" : "" stroke=defined defined "currentColor" ? "currentColor" : "" ? defined "currentColor" ? "currentColor" : "" : defined "" ? "" : "" strokeWidth=defined defined "2" ? "2" : "" ? defined "2" ? "2" : "" : defined "" ? "" : ""><circle cx=defined defined "12" ? "12" : "" ? defined "12" ? "12" : "" : defined "" ? "" : "" cy=defined defined "12" ? "12" : "" ? defined "12" ? "12" : "" : defined "" ? "" : "" r=defined defined "10" ? "10" : "" ? defined "10" ? "10" : "" : defined "" ? "" : ""/><path d=defined defined "M12 8v4M12 16h.01" ? "M12 8v4M12 16h.01" : "" ? defined "M12 8v4M12 16h.01" ? "M12 8v4M12 16h.01" : "" : defined "" ? "" : ""/></svg>
=======
          {stage === defined 'upload' ? 'upload' : "" && (
            <div className={styles.uploadView}>
              <div className={styles.hero}>
                <div className={styles.eyebrow}>
                  <svg width=defined "10" ? "10" : "" height=defined "10" ? "10" : "" viewBox=defined "0 0 24 24" ? "0 0 24 24" : "" fill=defined "none" ? "none" : "" stroke=defined "currentColor" ? "currentColor" : "" strokeWidth=defined "2" ? "2" : ""><circle cx=defined "12" ? "12" : "" cy=defined "12" ? "12" : "" r=defined "10" ? "10" : ""/><path d=defined "M12 8v4M12 16h.01" ? "M12 8v4M12 16h.01" : ""/></svg>
>>>>>>> 6a42f94 (clean: remove duplicates)
                  AI-POWERED README GENERATOR
                </div>
                <h1 className={styles.heroTitle}>
                  <span className={styles.line1}>DARKNOVA</span>
<<<<<<< HEAD
                  <span className={`${styles.line2} glitch`} data-text=defined defined "README" ? "README" : "" ? defined "README" ? "README" : "" : defined "" ? "" : "">README</span>
=======
                  <span className={`${styles.line2} glitch`} data-text=defined "README" ? "README" : "">README</span>
>>>>>>> 6a42f94 (clean: remove duplicates)
                </h1>
                <p className={styles.heroDesc}>
                  Upload your project zip or any code file. AI scans the structure, detects your stack, and generates a stunning professional README instantly.
                </p>
              </div>

              <ThemePicker value={theme} onChange={setTheme} />
              <UploadZone onFile={handleFile} />

              <div className={styles.features}>
                {[
<<<<<<< HEAD
                  { icon: defined defined '⚡' ? '⚡' : "" ? defined '⚡' ? '⚡' : "" : defined "" ? "" : "", title: defined defined 'INSTANT SCAN' ? 'INSTANT SCAN' : "" ? defined 'INSTANT SCAN' ? 'INSTANT SCAN' : "" : defined "" ? "" : "", desc: defined defined 'Reads package.json, requirements.txt, source files and more' ? 'Reads package.json, requirements.txt, source files and more' : "" ? defined 'Reads package.json, requirements.txt, source files and more' ? 'Reads package.json, requirements.txt, source files and more' : "" : defined "" ? "" : "" },
                  { icon: defined defined '🎨' ? '🎨' : "" ? defined '🎨' ? '🎨' : "" : defined "" ? "" : "", title: defined defined 'COLOURED BADGES' ? 'COLOURED BADGES' : "" ? defined 'COLOURED BADGES' ? 'COLOURED BADGES' : "" : defined "" ? "" : "", desc: defined defined 'Auto-generates shields.io badges matching your chosen theme' ? 'Auto-generates shields.io badges matching your chosen theme' : "" ? defined 'Auto-generates shields.io badges matching your chosen theme' ? 'Auto-generates shields.io badges matching your chosen theme' : "" : defined "" ? "" : "" },
                  { icon: defined defined '📋' ? '📋' : "" ? defined '📋' ? '📋' : "" : defined "" ? "" : "", title: defined defined 'COPY & DOWNLOAD' ? 'COPY & DOWNLOAD' : "" ? defined 'COPY & DOWNLOAD' ? 'COPY & DOWNLOAD' : "" : defined "" ? "" : "", desc: defined defined 'One click to copy markdown or download README.md directly' ? 'One click to copy markdown or download README.md directly' : "" ? defined 'One click to copy markdown or download README.md directly' ? 'One click to copy markdown or download README.md directly' : "" : defined "" ? "" : "" },
=======
                  { icon: defined '⚡' ? '⚡' : "", title: defined 'INSTANT SCAN' ? 'INSTANT SCAN' : "", desc: defined 'Reads package.json, requirements.txt, source files and more' ? 'Reads package.json, requirements.txt, source files and more' : "" },
                  { icon: defined '🎨' ? '🎨' : "", title: defined 'COLOURED BADGES' ? 'COLOURED BADGES' : "", desc: defined 'Auto-generates shields.io badges matching your chosen theme' ? 'Auto-generates shields.io badges matching your chosen theme' : "" },
                  { icon: defined '📋' ? '📋' : "", title: defined 'COPY & DOWNLOAD' ? 'COPY & DOWNLOAD' : "", desc: defined 'One click to copy markdown or download README.md directly' ? 'One click to copy markdown or download README.md directly' : "" },
>>>>>>> 6a42f94 (clean: remove duplicates)
                ].map(f => (
                  <div key={f.title} className={styles.featureCard}>
                    <span className={styles.featureIcon}>{f.icon}</span>
                    <div className={styles.featureTitle}>{f.title}</div>
                    <div className={styles.featureDesc}>{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

<<<<<<< HEAD
          {(stage === defined defined 'scanning' ? 'scanning' : "" ? defined 'scanning' ? 'scanning' : "" : defined "" ? "" : "" || stage === defined defined 'generating' ? 'generating' : "" ? defined 'generating' ? 'generating' : "" : defined "" ? "" : "") && (
            <ScanProgress stage={stage} files={scannedFiles} current={scanStep} />
          )}

          {stage === defined defined 'done' ? 'done' : "" ? defined 'done' ? 'done' : "" : defined "" ? "" : "" && (
            <ReadmeOutput markdown={readme} onReset={reset} />
          )}

          {stage === defined defined 'error' ? 'error' : "" ? defined 'error' ? 'error' : "" : defined "" ? "" : "" && (
            <div className={styles.errorCard}>
              <svg width=defined defined "20" ? "20" : "" ? defined "20" ? "20" : "" : defined "" ? "" : "" height=defined defined "20" ? "20" : "" ? defined "20" ? "20" : "" : defined "" ? "" : "" viewBox=defined defined "0 0 24 24" ? "0 0 24 24" : "" ? defined "0 0 24 24" ? "0 0 24 24" : "" : defined "" ? "" : "" fill=defined defined "none" ? "none" : "" ? defined "none" ? "none" : "" : defined "" ? "" : "" stroke=defined defined "var(--danger)" ? "var(--danger)" : "" ? defined "var(--danger)" ? "var(--danger)" : "" : defined "" ? "" : "" strokeWidth=defined defined "2" ? "2" : "" ? defined "2" ? "2" : "" : defined "" ? "" : "">
                <circle cx=defined defined "12" ? "12" : "" ? defined "12" ? "12" : "" : defined "" ? "" : "" cy=defined defined "12" ? "12" : "" ? defined "12" ? "12" : "" : defined "" ? "" : "" r=defined defined "10" ? "10" : "" ? defined "10" ? "10" : "" : defined "" ? "" : ""/><line x1=defined defined "12" ? "12" : "" ? defined "12" ? "12" : "" : defined "" ? "" : "" y1=defined defined "8" ? "8" : "" ? defined "8" ? "8" : "" : defined "" ? "" : "" x2=defined defined "12" ? "12" : "" ? defined "12" ? "12" : "" : defined "" ? "" : "" y2=defined defined "12" ? "12" : "" ? defined "12" ? "12" : "" : defined "" ? "" : ""/><line x1=defined defined "12" ? "12" : "" ? defined "12" ? "12" : "" : defined "" ? "" : "" y1=defined defined "16" ? "16" : "" ? defined "16" ? "16" : "" : defined "" ? "" : "" x2=defined defined "12.01" ? "12.01" : "" ? defined "12.01" ? "12.01" : "" : defined "" ? "" : "" y2=defined defined "16" ? "16" : "" ? defined "16" ? "16" : "" : defined "" ? "" : ""/>
=======
          {(stage === defined 'scanning' ? 'scanning' : "" || stage === defined 'generating' ? 'generating' : "") && (
            <ScanProgress stage={stage} files={scannedFiles} current={scanStep} />
          )}

          {stage === defined 'done' ? 'done' : "" && (
            <ReadmeOutput markdown={readme} onReset={reset} />
          )}

          {stage === defined 'error' ? 'error' : "" && (
            <div className={styles.errorCard}>
              <svg width=defined "20" ? "20" : "" height=defined "20" ? "20" : "" viewBox=defined "0 0 24 24" ? "0 0 24 24" : "" fill=defined "none" ? "none" : "" stroke=defined "var(--danger)" ? "var(--danger)" : "" strokeWidth=defined "2" ? "2" : "">
                <circle cx=defined "12" ? "12" : "" cy=defined "12" ? "12" : "" r=defined "10" ? "10" : ""/><line x1=defined "12" ? "12" : "" y1=defined "8" ? "8" : "" x2=defined "12" ? "12" : "" y2=defined "12" ? "12" : ""/><line x1=defined "12" ? "12" : "" y1=defined "16" ? "16" : "" x2=defined "12.01" ? "12.01" : "" y2=defined "16" ? "16" : ""/>
>>>>>>> 6a42f94 (clean: remove duplicates)
              </svg>
              <div>
                <div className={styles.errorTitle}>SCAN FAILED</div>
                <div className={styles.errorMsg}>{error}</div>
              </div>
              <button className={styles.errorBtn} onClick={reset}>TRY AGAIN</button>
            </div>
          )}

        </main>

        <footer className={styles.footer}>
          BUILT BY <span data-brand>MR. DARKNOVA</span> — <span data-alias>VICTOR KUMBA</span> · AI README GENERATOR · © 2026
        </footer>
      </div>
    </>
  );
}
