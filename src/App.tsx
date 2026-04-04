import { useState, useCallback, useEffect } from 'react';
import { Background } from './components/Background';
import { Header } from './components/Header';
import { UploadZone } from './components/UploadZone';
import { ThemePicker } from './components/ThemePicker';
import { ScanProgress } from './components/ScanProgress';
import { ReadmeOutput } from './components/ReadmeOutput';
import { useCursor } from './hooks/useCursor';
import { scanZip, scanSingleFile, extractProjectInfo, buildPrompt } from './utils/scanner';
import { generateReadme } from './utils/api';
import { initBrand } from './utils/brand';
import type { Theme, Stage } from './types';
import styles from './App.module.css';

export default function App() {
  useCursor();
  useEffect(() => { initBrand(); }, []);

  const [stage, setStage]       = useState<Stage>('upload');
  const [theme, setTheme]       = useState<Theme>('purple');
  const [scannedFiles, setScannedFiles] = useState<string[]>([]);
  const [scanStep, setScanStep] = useState(0);
  const [readme, setReadme]     = useState('');
  const [error, setError]       = useState('');

  const handleFile = useCallback(async (file: File) => {
    setStage('scanning');
    setScannedFiles([]);
    setScanStep(0);
    setError('');

    try {
      const isZip = file.name.endsWith('.zip');
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

      setStage('generating');
      setScanStep(0);

      let step = 0;
      const stepInterval = setInterval(() => {
        step++;
        setScanStep(step);
      }, 1200);

      const result = await generateReadme(prompt);
      clearInterval(stepInterval);

      setReadme(result);
      setStage('done');
    } catch (e) {
      setError((e as Error).message ?? 'Something went wrong');
      setStage('error');
    }
  }, [theme]);

  function reset() {
    setStage('upload');
    setReadme('');
    setError('');
    setScannedFiles([]);
    setScanStep(0);
  }

  return (
    <>
      <div className="cursor-dot" />
      <div className="cursor-ring" />
      <Background />

      <div className={styles.shell}>
        <Header />

        <main className={styles.main}>

          {stage === 'upload' && (
            <div className={styles.uploadView}>
              <div className={styles.hero}>
                <div className={styles.eyebrow}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                  AI-POWERED README GENERATOR
                </div>
                <h1 className={styles.heroTitle}>
                  <span className={styles.line1}>DARKNOVA</span>
                  <span className={`${styles.line2} glitch`} data-text="README">README</span>
                </h1>
                <p className={styles.heroDesc}>
                  Upload your project zip or any code file. AI scans the structure, detects your stack, and generates a stunning professional README instantly.
                </p>
              </div>

              <ThemePicker value={theme} onChange={setTheme} />
              <UploadZone onFile={handleFile} />

              <div className={styles.features}>
                {[
                  { icon: '⚡', title: 'INSTANT SCAN', desc: 'Reads package.json, requirements.txt, source files and more' },
                  { icon: '🎨', title: 'COLOURED BADGES', desc: 'Auto-generates shields.io badges matching your chosen theme' },
                  { icon: '📋', title: 'COPY & DOWNLOAD', desc: 'One click to copy markdown or download README.md directly' },
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

          {(stage === 'scanning' || stage === 'generating') && (
            <ScanProgress stage={stage} files={scannedFiles} current={scanStep} />
          )}

          {stage === 'done' && (
            <ReadmeOutput markdown={readme} onReset={reset} />
          )}

          {stage === 'error' && (
            <div className={styles.errorCard}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
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
