import { useCallback, useEffect, useRef, useState, type CSSProperties, type DragEvent, type ReactNode } from 'react';
import { MAX_UPLOAD_BYTES, buildPrompt, extractProjectInfo, scanSingleFile, scanZip } from './utils/scanner';
import { generateReadme } from './utils/api';
import { THEMES, type Stage, type Theme } from './types';

const GENERATING_MESSAGES = [
  'Mapping the project structure',
  'Turning the stack into a clear overview',
  'Writing setup instructions',
  'Polishing the final README',
];

const ACCEPTED_FILES = '.zip,.js,.ts,.jsx,.tsx,.mjs,.cjs,.py,.go,.rs,.java,.cs,.php,.rb,.vue,.svelte,.html,.css,.scss,.md,.toml,.xml,.yml,.yaml,.json,.sh,.sql';

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  return 'Something went wrong while preparing your README. Please try again.';
}

export default function App() {
  const [stage, setStage] = useState<Stage>('upload');
  const [theme, setTheme] = useState<Theme>('purple');
  const [isDragging, setIsDragging] = useState(false);
  const [scannedPaths, setScannedPaths] = useState<string[]>([]);
  const [messageIndex, setMessageIndex] = useState(0);
  const [markdown, setMarkdown] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const requestRef = useRef<AbortController | null>(null);
  const messageTimerRef = useRef<number | undefined>(undefined);

  const clearMessageTimer = useCallback(() => {
    if (messageTimerRef.current !== undefined) {
      window.clearInterval(messageTimerRef.current);
      messageTimerRef.current = undefined;
    }
  }, []);

  useEffect(() => () => {
    requestRef.current?.abort();
    clearMessageTimer();
  }, [clearMessageTimer]);

  const startGeneration = useCallback(async (file: File) => {
    requestRef.current?.abort();
    clearMessageTimer();
    setError('');
    setMarkdown('');
    setScannedPaths([]);
    setMessageIndex(0);
    setStage('scanning');

    try {
      if (file.size > MAX_UPLOAD_BYTES) {
        throw new Error('That file is over 20 MB. Try a smaller ZIP or a single source file.');
      }

      const isZip = /\.zip$/i.test(file.name);
      const files = isZip
        ? await scanZip(file, (path) => setScannedPaths((current) => [...current.slice(-4), path]))
        : await scanSingleFile(file);

      if (!files.length) {
        throw new Error('No supported project files were found. Try a ZIP with source code or choose a code file directly.');
      }

      setScannedPaths(files.map((item) => item.path).slice(-5));
      const info = extractProjectInfo(files);
      const prompt = buildPrompt(files, info, theme);

      setStage('generating');
      const controller = new AbortController();
      requestRef.current = controller;
      messageTimerRef.current = window.setInterval(() => {
        setMessageIndex((current) => (current + 1) % GENERATING_MESSAGES.length);
      }, 1800);

      const result = await generateReadme(prompt, controller.signal);
      if (controller.signal.aborted) return;
      setMarkdown(result.trim());
      setStage('done');
    } catch (caught) {
      if (caught instanceof Error && caught.name === 'AbortError') return;
      setError(getErrorMessage(caught));
      setStage('error');
    } finally {
      clearMessageTimer();
      requestRef.current = null;
    }
  }, [clearMessageTimer, theme]);

  const reset = useCallback(() => {
    requestRef.current?.abort();
    requestRef.current = null;
    clearMessageTimer();
    setStage('upload');
    setError('');
    setMarkdown('');
    setScannedPaths([]);
    setMessageIndex(0);
    setIsDragging(false);
    if (inputRef.current) inputRef.current.value = '';
  }, [clearMessageTimer]);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = '';
    if (file) void startGeneration(file);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) void startGeneration(file);
  }

  const themeStyle = { '--theme-color': THEMES[theme].color } as CSSProperties;

  return (
    <div className="app-shell" data-theme={theme} style={themeStyle}>
      <a className="skip-link" href="#main-content">Skip to the app</a>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="topbar" id="top">
        <a className="brand" href="#top" aria-label="README Studio home">
          <span className="brand-mark" aria-hidden="true">R</span>
          <span className="brand-name">README<span className="brand-accent">STUDIO</span></span>
        </a>
        <div className="topbar-meta">
          <span className="status-dot" aria-hidden="true" />
          <span>Built for your next repo</span>
        </div>
      </header>

      <main className="main-content" id="main-content">
        {stage === 'upload' && (
          <div className="hero-grid">
            <section className="hero-copy" aria-labelledby="hero-title">
              <div className="eyebrow"><span className="eyebrow-mark" /> README WORKSPACE</div>
              <h1 className="hero-title" id="hero-title">
                Make your project
                <span className="hero-title-accent">easy to understand.</span>
              </h1>
              <p className="hero-description">
                Drop in a project ZIP or a key file. README Studio maps what matters and turns it into clear, ready-to-use documentation.
              </p>
              <ul className="hero-points">
                <li><span className="point-icon" aria-hidden="true">✓</span> Detects your stack and useful commands</li>
                <li><span className="point-icon" aria-hidden="true">✓</span> Gives you a live preview before download</li>
                <li><span className="point-icon" aria-hidden="true">✓</span> Keeps your chosen badge color consistent</li>
              </ul>
              <div className="hero-note">
                <span className="note-icon" aria-hidden="true">i</span>
                <p>Common secrets are filtered or redacted. Selected project text is sent to the README generation service.</p>
              </div>
            </section>

            <section className="builder-card" aria-labelledby="builder-title">
              <div className="builder-topline">
                <div>
                  <span className="section-kicker">START A README</span>
                  <h2 className="builder-title" id="builder-title">Add your project</h2>
                </div>
                <span className="builder-step">01 <span>/ 02</span></span>
              </div>

              <div className="theme-control">
                <div className="section-label">BADGE COLOR</div>
                <div className="theme-list" role="group" aria-label="README badge color">
                  {(Object.entries(THEMES) as [Theme, typeof THEMES[Theme]][]).map(([key, item]) => (
                    <button
                      className={`theme-button${theme === key ? ' is-selected' : ''}`}
                      type="button"
                      key={key}
                      aria-label={`${item.label} theme`}
                      aria-pressed={theme === key}
                      onClick={() => setTheme(key)}
                    >
                      <span className="theme-dot" style={{ backgroundColor: item.color }} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div
                className={`dropzone${isDragging ? ' is-dragging' : ''}`}
                onDragEnter={(event) => { event.preventDefault(); setIsDragging(true); }}
                onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }}
                onDragLeave={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsDragging(false);
                }}
                onDrop={handleDrop}
                aria-describedby="upload-help"
              >
                <div className="dropzone-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 14v4.25c0 .97.78 1.75 1.75 1.75h10.5c.97 0 1.75-.78 1.75-1.75V14" />
                  </svg>
                </div>
                <p className="dropzone-title">Drop your project here</p>
                <p className="dropzone-copy">ZIP archive or a single source file</p>
                <button
                  type="button"
                  className="select-file-button"
                  onClick={() => inputRef.current?.click()}
                >
                  Choose a file <span aria-hidden="true">↗</span>
                </button>
                <input
                  ref={inputRef}
                  className="file-input"
                  type="file"
                  accept={ACCEPTED_FILES}
                  onChange={handleFileChange}
                  aria-label="Choose a ZIP archive or source file"
                />
                <p className="upload-meta" id="upload-help">Up to 20 MB <span>·</span> ZIPs and common code formats</p>
              </div>

              <div className="builder-foot">
                <span className="builder-lock" aria-hidden="true">◇</span>
                <span>Secret files, common credential patterns, dependencies, and build output are excluded.</span>
              </div>
            </section>
          </div>
        )}

        {(stage === 'scanning' || stage === 'generating') && (
          <section className="progress-card" aria-live="polite" aria-busy="true">
            <div className="progress-heading">
              <span className="spinner" aria-hidden="true" />
              <div>
                <span className="section-kicker">{stage === 'scanning' ? 'STEP 01 / PROJECT SCAN' : 'STEP 02 / README DRAFT'}</span>
                <h1>{stage === 'scanning' ? 'Getting to know your project' : 'Putting your README together'}</h1>
              </div>
            </div>
            <p className="progress-message">
              {stage === 'scanning' ? 'Finding the key files and filtering out generated or sensitive content.' : GENERATING_MESSAGES[messageIndex] + '…'}
            </p>
            <div className="progress-bar" aria-hidden="true"><span className="progress-bar-fill" /></div>
            {scannedPaths.length > 0 && (
              <div className="file-list" aria-label="Recently scanned files">
                {scannedPaths.slice(-5).map((path, index) => (
                  <div className="file-item" key={`${path}-${index}`}>
                    <span className="file-check" aria-hidden="true">✓</span>
                    <span className="file-name">{path}</span>
                  </div>
                ))}
              </div>
            )}
            <button className="cancel-button" type="button" onClick={reset}>Cancel and start over</button>
          </section>
        )}

        {stage === 'error' && (
          <section className="error-card" role="alert">
            <div className="error-icon" aria-hidden="true">!</div>
            <div className="error-content">
              <span className="section-kicker">COULDN’T FINISH</span>
              <h1 className="error-title">Let’s try that again.</h1>
              <p className="error-message">{error}</p>
              <button className="select-file-button" type="button" onClick={reset}>Choose another file</button>
            </div>
          </section>
        )}

        {stage === 'done' && <ReadmeOutput markdown={markdown} onReset={reset} />}
      </main>

      <footer className="site-footer">
        <span>README STUDIO</span>
        <span className="footer-divider" aria-hidden="true" />
        <span>Clear docs make good projects easier to share.</span>
      </footer>
    </div>
  );
}

function ReadmeOutput({ markdown, onReset }: { markdown: string; onReset: () => void }) {
  const [view, setView] = useState<'preview' | 'raw'>('preview');
  const [copied, setCopied] = useState(false);
  const words = markdown.trim() ? markdown.trim().split(/\s+/).length : 0;

  async function copyMarkdown() {
    try {
      await navigator.clipboard.writeText(markdown);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = markdown;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const copiedToClipboard = document.execCommand('copy');
      textarea.remove();
      if (!copiedToClipboard) return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function downloadMarkdown() {
    const url = URL.createObjectURL(new Blob([markdown], { type: 'text/markdown;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'README.md';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <section className="output-shell" aria-labelledby="output-title">
      <div className="output-heading">
        <div>
          <span className="section-kicker">YOUR README IS READY</span>
          <h1 id="output-title">Review, then make it yours.</h1>
          <p>{words.toLocaleString()} words <span>·</span> {markdown.length.toLocaleString()} characters</p>
        </div>
        <button className="action-button action-button-secondary" type="button" onClick={onReset}>New README</button>
      </div>

      <div className="output-card">
        <div className="output-topbar">
          <div className="output-filename"><span className="file-indicator" /> README.md</div>
          <div className="output-controls">
            <div className="output-tabs" role="tablist" aria-label="README view">
              <button
                className={`tab-button${view === 'preview' ? ' tab-button-active' : ''}`}
                type="button"
                role="tab"
                aria-selected={view === 'preview'}
                onClick={() => setView('preview')}
              >Preview</button>
              <button
                className={`tab-button${view === 'raw' ? ' tab-button-active' : ''}`}
                type="button"
                role="tab"
                aria-selected={view === 'raw'}
                onClick={() => setView('raw')}
              >Markdown</button>
            </div>
            <button className="action-button action-button-primary" type="button" onClick={copyMarkdown}>
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button className="action-button action-button-secondary" type="button" onClick={downloadMarkdown}>Download .md</button>
          </div>
        </div>
        {view === 'preview'
          ? <MarkdownPreview markdown={markdown} />
          : <pre className="markdown-raw"><code>{markdown}</code></pre>}
      </div>
    </section>
  );
}

function MarkdownPreview({ markdown }: { markdown: string }) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) { index += 1; continue; }

    const fence = line.match(/^```([\w-]*)/);
    if (fence) {
      const language = fence[1];
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !/^```/.test(lines[index])) {
        code.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      blocks.push(
        <pre className="preview-code" key={`code-${index}`} data-language={language || undefined}>
          <code>{code.join('\n')}</code>
        </pre>,
      );
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2];
      const Heading = `h${level}` as keyof JSX.IntrinsicElements;
      blocks.push(<Heading key={`heading-${index}`}>{renderInline(text)}</Heading>);
      index += 1;
      continue;
    }

    if (/^\s*([-*_]\s*){3,}$/.test(line)) {
      blocks.push(<hr key={`rule-${index}`} />);
      index += 1;
      continue;
    }

    if (/^\s*>\s?/.test(line)) {
      const quote: string[] = [];
      while (index < lines.length && /^\s*>\s?/.test(lines[index])) {
        quote.push(lines[index].replace(/^\s*>\s?/, ''));
        index += 1;
      }
      blocks.push(<blockquote key={`quote-${index}`}>{renderInline(quote.join(' '))}</blockquote>);
      continue;
    }

    const listMatch = line.match(/^\s*(?:[-*+]|\d+[.)])\s+(.+)$/);
    if (listMatch) {
      const ordered = /^\s*\d/.test(line);
      const items: string[] = [];
      while (index < lines.length) {
        const item = lines[index].match(/^\s*(?:[-*+]|\d+[.)])\s+(.+)$/);
        if (!item) break;
        items.push(item[1]);
        index += 1;
      }
      const List = ordered ? 'ol' : 'ul';
      blocks.push(<List key={`list-${index}`}>{items.map((item, itemIndex) => <li key={`${itemIndex}-${item}`}>{renderInline(item)}</li>)}</List>);
      continue;
    }

    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(#{1,6})\s/.test(lines[index]) &&
      !/^```/.test(lines[index]) &&
      !/^\s*>\s?/.test(lines[index]) &&
      !/^\s*(?:[-*+]|\d+[.)])\s+/.test(lines[index]) &&
      !/^\s*([-*_]\s*){3,}$/.test(lines[index])
    ) {
      paragraph.push(lines[index]);
      index += 1;
    }
    blocks.push(<p key={`paragraph-${index}`}>{renderInline(paragraph.join(' '))}</p>);
  }

  return <article className="markdown-preview">{blocks}</article>;
}

function safeHref(raw: string): string | null {
  const value = raw.trim();
  if (/^(https?:|mailto:)/i.test(value) || /^(#|\/|\.\/|\.\.\/)/.test(value)) return value;
  return null;
}

function renderInline(text: string): ReactNode[] {
  const tokens = text.split(/(!?\[[^\]]*\]\([^)]+\)|\*\*[^*]+\*\*|__[^_]+__|~~[^~]+~~|`[^`]+`|\*[^*]+\*|_[^_]+_)/g);
  return tokens.filter(Boolean).map((token, index) => {
    const image = token.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      const href = safeHref(image[2]);
      return href
        ? <a key={index} href={href} target="_blank" rel="noreferrer noopener">Image: {image[1] || 'open preview'} ↗</a>
        : <span key={index}>{image[1] || 'Image'}</span>;
    }
    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const href = safeHref(link[2]);
      return href
        ? <a key={index} href={href} target="_blank" rel="noreferrer noopener">{link[1]}</a>
        : <span key={index}>{link[1]}</span>;
    }
    if (/^\*\*.+\*\*$/.test(token) || /^__.+__$/.test(token)) return <strong key={index}>{token.slice(2, -2)}</strong>;
    if (/^~~.+~~$/.test(token)) return <del key={index}>{token.slice(2, -2)}</del>;
    if (/^`[^`]+`$/.test(token)) return <code key={index}>{token.slice(1, -1)}</code>;
    if (/^\*[^*]+\*$/.test(token) || /^_[^_]+_$/.test(token)) return <em key={index}>{token.slice(1, -1)}</em>;
    return <span key={index}>{token}</span>;
  });
}