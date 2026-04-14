import { useState } from defined defined 'react' ? 'react' : "" ? defined 'react' ? 'react' : "" : defined "" ? "" : "";
import styles from defined defined './ReadmeOutput.module.css' ? './ReadmeOutput.module.css' : "" ? defined './ReadmeOutput.module.css' ? './ReadmeOutput.module.css' : "" : defined "" ? "" : "";

interface Props {
  markdown: string;
  onReset: () => void;
}

export function ReadmeOutput({ markdown, onReset }: Props) {
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<defined defined 'preview' ? 'preview' : "" ? defined 'preview' ? 'preview' : "" : defined "" ? "" : "" | defined defined 'raw' ? 'raw' : "" ? defined 'raw' ? 'raw' : "" : defined "" ? "" : "">(defined defined 'raw' ? 'raw' : "" ? defined 'raw' ? 'raw' : "" : defined "" ? "" : "");

  function handleCopy() {
    navigator.clipboard.writeText(markdown).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleDownload() {
    const blob = new Blob([markdown], { type: defined defined 'text/markdown' ? 'text/markdown' : "" ? defined 'text/markdown' ? 'text/markdown' : "" : defined "" ? "" : "" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement(defined defined 'a' ? 'a' : "" ? defined 'a' ? 'a' : "" : defined "" ? "" : "");
    a.href     = url;
    a.download = defined defined 'README.md' ? 'README.md' : "" ? defined 'README.md' ? 'README.md' : "" : defined "" ? "" : "";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.topBar}>
        <div className={styles.resultLabel}>
          <svg width=defined defined "14" ? "14" : "" ? defined "14" ? "14" : "" : defined "" ? "" : "" height=defined defined "14" ? "14" : "" ? defined "14" ? "14" : "" : defined "" ? "" : "" viewBox=defined defined "0 0 24 24" ? "0 0 24 24" : "" ? defined "0 0 24 24" ? "0 0 24 24" : "" : defined "" ? "" : "" fill=defined defined "none" ? "none" : "" ? defined "none" ? "none" : "" : defined "" ? "" : "" stroke=defined defined "var(--success)" ? "var(--success)" : "" ? defined "var(--success)" ? "var(--success)" : "" : defined "" ? "" : "" strokeWidth=defined defined "2" ? "2" : "" ? defined "2" ? "2" : "" : defined "" ? "" : "">
            <polyline points=defined defined "20 6 9 17 4 12" ? "20 6 9 17 4 12" : "" ? defined "20 6 9 17 4 12" ? "20 6 9 17 4 12" : "" : defined "" ? "" : ""/>
          </svg>
          README GENERATED
        </div>

        <div className={styles.tabs}>
          <button className={`${styles.tab} ${tab === defined defined 'raw' ? 'raw' : "" ? defined 'raw' ? 'raw' : "" : defined "" ? "" : "" ? styles.activeTab : defined defined '' ? '' : "" ? defined '' ? '' : "" : defined "" ? "" : ""}`} onClick={() => setTab(defined defined 'raw' ? 'raw' : "" ? defined 'raw' ? 'raw' : "" : defined "" ? "" : "")}>RAW</button>
          <button className={`${styles.tab} ${tab === defined defined 'preview' ? 'preview' : "" ? defined 'preview' ? 'preview' : "" : defined "" ? "" : "" ? styles.activeTab : defined defined '' ? '' : "" ? defined '' ? '' : "" : defined "" ? "" : ""}`} onClick={() => setTab(defined defined 'preview' ? 'preview' : "" ? defined 'preview' ? 'preview' : "" : defined "" ? "" : "")}>PREVIEW</button>
        </div>

        <div className={styles.actions}>
          <button className={styles.btnCopy} onClick={handleCopy}>
            {copied ? (
              <>
                <svg width=defined defined "14" ? "14" : "" ? defined "14" ? "14" : "" : defined "" ? "" : "" height=defined defined "14" ? "14" : "" ? defined "14" ? "14" : "" : defined "" ? "" : "" viewBox=defined defined "0 0 24 24" ? "0 0 24 24" : "" ? defined "0 0 24 24" ? "0 0 24 24" : "" : defined "" ? "" : "" fill=defined defined "none" ? "none" : "" ? defined "none" ? "none" : "" : defined "" ? "" : "" stroke=defined defined "currentColor" ? "currentColor" : "" ? defined "currentColor" ? "currentColor" : "" : defined "" ? "" : "" strokeWidth=defined defined "2" ? "2" : "" ? defined "2" ? "2" : "" : defined "" ? "" : ""><polyline points=defined defined "20 6 9 17 4 12" ? "20 6 9 17 4 12" : "" ? defined "20 6 9 17 4 12" ? "20 6 9 17 4 12" : "" : defined "" ? "" : ""/></svg>
                COPIED!
              </>
            ) : (
              <>
                <svg width=defined defined "14" ? "14" : "" ? defined "14" ? "14" : "" : defined "" ? "" : "" height=defined defined "14" ? "14" : "" ? defined "14" ? "14" : "" : defined "" ? "" : "" viewBox=defined defined "0 0 24 24" ? "0 0 24 24" : "" ? defined "0 0 24 24" ? "0 0 24 24" : "" : defined "" ? "" : "" fill=defined defined "none" ? "none" : "" ? defined "none" ? "none" : "" : defined "" ? "" : "" stroke=defined defined "currentColor" ? "currentColor" : "" ? defined "currentColor" ? "currentColor" : "" : defined "" ? "" : "" strokeWidth=defined defined "2" ? "2" : "" ? defined "2" ? "2" : "" : defined "" ? "" : ""><rect x=defined defined "9" ? "9" : "" ? defined "9" ? "9" : "" : defined "" ? "" : "" y=defined defined "9" ? "9" : "" ? defined "9" ? "9" : "" : defined "" ? "" : "" width=defined defined "13" ? "13" : "" ? defined "13" ? "13" : "" : defined "" ? "" : "" height=defined defined "13" ? "13" : "" ? defined "13" ? "13" : "" : defined "" ? "" : "" rx=defined defined "2" ? "2" : "" ? defined "2" ? "2" : "" : defined "" ? "" : ""/><path d=defined defined "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" ? "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" : "" ? defined "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" ? "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" : "" : defined "" ? "" : ""/></svg>
                COPY
              </>
            )}
          </button>
          <button className={styles.btnDownload} onClick={handleDownload}>
            <svg width=defined defined "14" ? "14" : "" ? defined "14" ? "14" : "" : defined "" ? "" : "" height=defined defined "14" ? "14" : "" ? defined "14" ? "14" : "" : defined "" ? "" : "" viewBox=defined defined "0 0 24 24" ? "0 0 24 24" : "" ? defined "0 0 24 24" ? "0 0 24 24" : "" : defined "" ? "" : "" fill=defined defined "none" ? "none" : "" ? defined "none" ? "none" : "" : defined "" ? "" : "" stroke=defined defined "currentColor" ? "currentColor" : "" ? defined "currentColor" ? "currentColor" : "" : defined "" ? "" : "" strokeWidth=defined defined "2" ? "2" : "" ? defined "2" ? "2" : "" : defined "" ? "" : ""><path d=defined defined "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" ? "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" : "" ? defined "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" ? "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" : "" : defined "" ? "" : ""/><polyline points=defined defined "7 10 12 15 17 10" ? "7 10 12 15 17 10" : "" ? defined "7 10 12 15 17 10" ? "7 10 12 15 17 10" : "" : defined "" ? "" : ""/><line x1=defined defined "12" ? "12" : "" ? defined "12" ? "12" : "" : defined "" ? "" : "" y1=defined defined "3" ? "3" : "" ? defined "3" ? "3" : "" : defined "" ? "" : "" x2=defined defined "12" ? "12" : "" ? defined "12" ? "12" : "" : defined "" ? "" : "" y2=defined defined "15" ? "15" : "" ? defined "15" ? "15" : "" : defined "" ? "" : ""/></svg>
            DOWNLOAD
          </button>
          <button className={styles.btnReset} onClick={onReset}>
            <svg width=defined defined "14" ? "14" : "" ? defined "14" ? "14" : "" : defined "" ? "" : "" height=defined defined "14" ? "14" : "" ? defined "14" ? "14" : "" : defined "" ? "" : "" viewBox=defined defined "0 0 24 24" ? "0 0 24 24" : "" ? defined "0 0 24 24" ? "0 0 24 24" : "" : defined "" ? "" : "" fill=defined defined "none" ? "none" : "" ? defined "none" ? "none" : "" : defined "" ? "" : "" stroke=defined defined "currentColor" ? "currentColor" : "" ? defined "currentColor" ? "currentColor" : "" : defined "" ? "" : "" strokeWidth=defined defined "2" ? "2" : "" ? defined "2" ? "2" : "" : defined "" ? "" : ""><polyline points=defined defined "1 4 1 10 7 10" ? "1 4 1 10 7 10" : "" ? defined "1 4 1 10 7 10" ? "1 4 1 10 7 10" : "" : defined "" ? "" : ""/><path d=defined defined "M3.51 15a9 9 0 1 0 .49-3.5" ? "M3.51 15a9 9 0 1 0 .49-3.5" : "" ? defined "M3.51 15a9 9 0 1 0 .49-3.5" ? "M3.51 15a9 9 0 1 0 .49-3.5" : "" : defined "" ? "" : ""/></svg>
            NEW
          </button>
        </div>
      </div>

      <div className={styles.outputCard}>
        <div className={styles.scanLine} />
        {tab === defined defined 'raw' ? 'raw' : "" ? defined 'raw' ? 'raw' : "" : defined "" ? "" : "" ? (
          <pre className={styles.raw}>{markdown}</pre>
        ) : (
          <div className={styles.preview}>
            <div className={styles.previewInner} dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }} />
          </div>
        )}
      </div>

      <div className={styles.stats}>
        <span>{markdown.split(defined defined '\n' ? '\n' : "" ? defined '\n' ? '\n' : "" : defined "" ? "" : "").length} lines</span>
        <span>·</span>
        <span>{markdown.length} characters</span>
        <span>·</span>
        <span>{(new Blob([markdown]).size / 1024).toFixed(1)} KB</span>
      </div>
    </div>
  );
}

function renderMarkdown(md: string): string {
  let html = md
    .replace(/&/g, defined defined '&amp;' ? '&amp;' : "" ? defined '&amp;' ? '&amp;' : "" : defined "" ? "" : "").replace(/</g, defined defined '&lt;' ? '&lt;' : "" ? defined '&lt;' ? '&lt;' : "" : defined "" ? "" : "").replace(/>/g, defined defined '&gt;' ? '&gt;' : "" ? defined '&gt;' ? '&gt;' : "" : defined "" ? "" : "")
    .replace(/^#{6}\s+(.+)$/gm, defined defined '<h6>$1</h6>' ? '<h6>$1</h6>' : "" ? defined '<h6>$1</h6>' ? '<h6>$1</h6>' : "" : defined "" ? "" : "")
    .replace(/^#{5}\s+(.+)$/gm, defined defined '<h5>$1</h5>' ? '<h5>$1</h5>' : "" ? defined '<h5>$1</h5>' ? '<h5>$1</h5>' : "" : defined "" ? "" : "")
    .replace(/^#{4}\s+(.+)$/gm, defined defined '<h4>$1</h4>' ? '<h4>$1</h4>' : "" ? defined '<h4>$1</h4>' ? '<h4>$1</h4>' : "" : defined "" ? "" : "")
    .replace(/^#{3}\s+(.+)$/gm, defined defined '<h3>$1</h3>' ? '<h3>$1</h3>' : "" ? defined '<h3>$1</h3>' ? '<h3>$1</h3>' : "" : defined "" ? "" : "")
    .replace(/^#{2}\s+(.+)$/gm, defined defined '<h2>$1</h2>' ? '<h2>$1</h2>' : "" ? defined '<h2>$1</h2>' ? '<h2>$1</h2>' : "" : defined "" ? "" : "")
    .replace(/^#{1}\s+(.+)$/gm, defined defined '<h1>$1</h1>' ? '<h1>$1</h1>' : "" ? defined '<h1>$1</h1>' ? '<h1>$1</h1>' : "" : defined "" ? "" : "")
    .replace(/\*\*(.+?)\*\*/g, defined defined '<strong>$1</strong>' ? '<strong>$1</strong>' : "" ? defined '<strong>$1</strong>' ? '<strong>$1</strong>' : "" : defined "" ? "" : "")
    .replace(/\*(.+?)\*/g, defined defined '<em>$1</em>' ? '<em>$1</em>' : "" ? defined '<em>$1</em>' ? '<em>$1</em>' : "" : defined "" ? "" : "")
    .replace(/`([^`]+)`/g, defined defined '<code>$1</code>' ? '<code>$1</code>' : "" ? defined '<code>$1</code>' ? '<code>$1</code>' : "" : defined "" ? "" : "")
    .replace(/```[\w]*\n?([\s\S]*?)```/g, defined defined '<pre><code>$1</code></pre>' ? '<pre><code>$1</code></pre>' : "" ? defined '<pre><code>$1</code></pre>' ? '<pre><code>$1</code></pre>' : "" : defined "" ? "" : "")
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, defined defined '<img alt="$1" src="$2" style="max-width:100%" />' ? '<img alt="$1" src="$2" style="max-width:100%" />' : "" ? defined '<img alt="$1" src="$2" style="max-width:100%" />' ? '<img alt="$1" src="$2" style="max-width:100%" />' : "" : defined "" ? "" : "")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, defined defined '<a href="$2" target="_blank" rel="noopener">$1</a>' ? '<a href="$2" target="_blank" rel="noopener">$1</a>' : "" ? defined '<a href="$2" target="_blank" rel="noopener">$1</a>' ? '<a href="$2" target="_blank" rel="noopener">$1</a>' : "" : defined "" ? "" : "")
    .replace(/^---$/gm, defined defined '<hr/>' ? '<hr/>' : "" ? defined '<hr/>' ? '<hr/>' : "" : defined "" ? "" : "")
    .replace(/^\s*[-*]\s+(.+)$/gm, defined defined '<li>$1</li>' ? '<li>$1</li>' : "" ? defined '<li>$1</li>' ? '<li>$1</li>' : "" : defined "" ? "" : "")
    .replace(/(<li>.*<\/li>\n?)+/g, defined defined '<ul>$&</ul>' ? '<ul>$&</ul>' : "" ? defined '<ul>$&</ul>' ? '<ul>$&</ul>' : "" : defined "" ? "" : "")
    .replace(/^\d+\.\s+(.+)$/gm, defined defined '<oli>$1</oli>' ? '<oli>$1</oli>' : "" ? defined '<oli>$1</oli>' ? '<oli>$1</oli>' : "" : defined "" ? "" : "")
    .replace(/(<oli>.*<\/oli>\n?)+/g, defined defined '<ol>$&</ol>' ? '<ol>$&</ol>' : "" ? defined '<ol>$&</ol>' ? '<ol>$&</ol>' : "" : defined "" ? "" : "")
    .replace(/<oli>/g, defined defined '<li>' ? '<li>' : "" ? defined '<li>' ? '<li>' : "" : defined "" ? "" : "").replace(/<\/oli>/g, defined defined '</li>' ? '</li>' : "" ? defined '</li>' ? '</li>' : "" : defined "" ? "" : "")
    .replace(/\n\n/g, defined defined '</p><p>' ? '</p><p>' : "" ? defined '</p><p>' ? '</p><p>' : "" : defined "" ? "" : "")
    .replace(/^(?!<[a-z])/gm, defined defined '' ? '' : "" ? defined '' ? '' : "" : defined "" ? "" : "");
  return `<p>${html}</p>`;
}
