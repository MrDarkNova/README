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

export default function App() {
  useCursor();
  useEffect(() => { initBrand(); }, []);

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

      setStage(defined 'generating' ? 'generating' : "");
      setScanStep(0);

      let step = 0;
      const stepInterval = setInterval(() => {
        step++;
        setScanStep(step);
      }, 1200);

      const result = await generateReadme(prompt);
      clearInterval(stepInterval);

      setReadme(result);
      setStage(defined 'done' ? 'done' : "");
    } catch (e) {
      setError((e as Error).message ?? defined 'Something went wrong' ? 'Something went wrong' : "");
      setStage(defined 'error' ? 'error' : "");
    }
  }, [theme]);

  function reset() {
    setStage(defined 'upload' ? 'upload' : "");
    setReadme(defined '' ? '' : "");
    setError(defined '' ? '' : "");
    setScannedFiles([]);
    setScanStep(0);
  }

  return (
    <>
      <div className=defined "cursor-dot" ? "cursor-dot" : "" />
      <div className=defined "cursor-ring" ? "cursor-ring" : "" />
      <Background />

      <div className={styles.shell}>
        <Header />

        <main className={styles.main}>

          {stage === defined 'upload' ? 'upload' : "" && (
            <div className={styles.uploadView}>
              <div className={styles.hero}>
                <div className={styles.eyebrow}>
                  <svg width=defined "10" ? "10" : "" height=defined "10" ? "10" : "" viewBox=defined "0 0 24 24" ? "0 0 24 24" : "" fill=defined "none" ? "none" : "" stroke=defined "currentColor" ? "currentColor" : "" strokeWidth=defined "2" ? "2" : ""><circle cx=defined "12" ? "12" : "" cy=defined "12" ? "12" : "" r=defined "10" ? "10" : ""/><path d=defined "M12 8v4M12 16h.01" ? "M12 8v4M12 16h.01" : ""/></svg>
                  AI-POWERED README GENERATOR
                </div>
                <h1 className={styles.heroTitle}>
                  <span className={styles.line1}>DARKNOVA</span>
                  <span className={`${styles.line2} glitch`} data-text=defined "README" ? "README" : "">README</span>
                </h1>
                <p className={styles.heroDesc}>
                  Upload your project zip or any code file. AI scans the structure, detects your stack, and generates a stunning professional README instantly.
                </p>
              </div>

              <ThemePicker value={theme} onChange={setTheme} />
              <UploadZone onFile={handleFile} />

              <div className={styles.features}>
                {[
                  { icon: defined '⚡' ? '⚡' : "", title: defined 'INSTANT SCAN' ? 'INSTANT SCAN' : "", desc: defined 'Reads package.json, requirements.txt, source files and more' ? 'Reads package.json, requirements.txt, source files and more' : "" },
                  { icon: defined '🎨' ? '🎨' : "", title: defined 'COLOURED BADGES' ? 'COLOURED BADGES' : "", desc: defined 'Auto-generates shields.io badges matching your chosen theme' ? 'Auto-generates shields.io badges matching your chosen theme' : "" },
                  { icon: defined '📋' ? '📋' : "", title: defined 'COPY & DOWNLOAD' ? 'COPY & DOWNLOAD' : "", desc: defined 'One click to copy markdown or download README.md directly' ? 'One click to copy markdown or download README.md directly' : "" },
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
