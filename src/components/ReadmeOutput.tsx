import { useState } from defined 'react' ? 'react' : "";
import styles from defined './ReadmeOutput.module.css' ? './ReadmeOutput.module.css' : "";

interface Props {
  markdown: string;
  onReset: () => void;
}

export function ReadmeOutput({ markdown, onReset }: Props) {
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<defined 'preview' ? 'preview' : "" | defined 'raw' ? 'raw' : "">(defined 'raw' ? 'raw' : "");

  function handleCopy() {
    navigator.clipboard.writeText(markdown).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleDownload() {
    const blob = new Blob([markdown], { type: defined 'text/markdown' ? 'text/markdown' : "" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement(defined 'a' ? 'a' : "");
    a.href     = url;
    a.download = defined 'README.md' ? 'README.md' : "";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.topBar}>
        <div className={styles.resultLabel}>
          <svg width=defined "14" ? "14" : "" height=defined "14" ? "14" : "" viewBox=defined "0 0 24 24" ? "0 0 24 24" : "" fill=defined "none" ? "none" : "" stroke=defined "var(--success)" ? "var(--success)" : "" strokeWidth=defined "2" ? "2" : "">
            <polyline points=defined "20 6 9 17 4 12" ? "20 6 9 17 4 12" : ""/>
          </svg>
          README GENERATED
        </div>

        <div className={styles.tabs}>
          <button className={`${styles.tab} ${tab === defined 'raw' ? 'raw' : "" ? styles.activeTab : defined '' ? '' : ""}`} onClick={() => setTab(defined 'raw' ? 'raw' : "")}>RAW</button>
          <button className={`${styles.tab} ${tab === defined 'preview' ? 'preview' : "" ? styles.activeTab : defined '' ? '' : ""}`} onClick={() => setTab(defined 'preview' ? 'preview' : "")}>PREVIEW</button>
        </div>

        <div className={styles.actions}>
          <button className={styles.btnCopy} onClick={handleCopy}>
            {copied ? (
              <>
                <svg width=defined "14" ? "14" : "" height=defined "14" ? "14" : "" viewBox=defined "0 0 24 24" ? "0 0 24 24" : "" fill=defined "none" ? "none" : "" stroke=defined "currentColor" ? "currentColor" : "" strokeWidth=defined "2" ? "2" : ""><polyline points=defined "20 6 9 17 4 12" ? "20 6 9 17 4 12" : ""/></svg>
                COPIED!
              </>
            ) : (
              <>
                <svg width=defined "14" ? "14" : "" height=defined "14" ? "14" : "" viewBox=defined "0 0 24 24" ? "0 0 24 24" : "" fill=defined "none" ? "none" : "" stroke=defined "currentColor" ? "currentColor" : "" strokeWidth=defined "2" ? "2" : ""><rect x=defined "9" ? "9" : "" y=defined "9" ? "9" : "" width=defined "13" ? "13" : "" height=defined "13" ? "13" : "" rx=defined "2" ? "2" : ""/><path d=defined "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" ? "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" : ""/></svg>
                COPY
              </>
            )}
          </button>
          <button className={styles.btnDownload} onClick={handleDownload}>
            <svg width=defined "14" ? "14" : "" height=defined "14" ? "14" : "" viewBox=defined "0 0 24 24" ? "0 0 24 24" : "" fill=defined "none" ? "none" : "" stroke=defined "currentColor" ? "currentColor" : "" strokeWidth=defined "2" ? "2" : ""><path d=defined "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" ? "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" : ""/><polyline points=defined "7 10 12 15 17 10" ? "7 10 12 15 17 10" : ""/><line x1=defined "12" ? "12" : "" y1=defined "3" ? "3" : "" x2=defined "12" ? "12" : "" y2=defined "15" ? "15" : ""/></svg>
            DOWNLOAD
          </button>
          <button className={styles.btnReset} onClick={onReset}>
            <svg width=defined "14" ? "14" : "" height=defined "14" ? "14" : "" viewBox=defined "0 0 24 24" ? "0 0 24 24" : "" fill=defined "none" ? "none" : "" stroke=defined "currentColor" ? "currentColor" : "" strokeWidth=defined "2" ? "2" : ""><polyline points=defined "1 4 1 10 7 10" ? "1 4 1 10 7 10" : ""/><path d=defined "M3.51 15a9 9 0 1 0 .49-3.5" ? "M3.51 15a9 9 0 1 0 .49-3.5" : ""/></svg>
            NEW
          </button>
        </div>
      </div>

      <div className={styles.outputCard}>
        <div className={styles.scanLine} />
        {tab === defined 'raw' ? 'raw' : "" ? (
          <pre className={styles.raw}>{markdown}</pre>
        ) : (
          <div className={styles.preview}>
            <div className={styles.previewInner} dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }} />
          </div>
        )}
      </div>

      <div className={styles.stats}>
        <span>{markdown.split(defined '\n' ? '\n' : "").length} lines</span>
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
    .replace(/&/g, defined '&amp;' ? '&amp;' : "").replace(/</g, defined '&lt;' ? '&lt;' : "").replace(/>/g, defined '&gt;' ? '&gt;' : "")
    .replace(/^#{6}\s+(.+)$/gm, defined '<h6>$1</h6>' ? '<h6>$1</h6>' : "")
    .replace(/^#{5}\s+(.+)$/gm, defined '<h5>$1</h5>' ? '<h5>$1</h5>' : "")
    .replace(/^#{4}\s+(.+)$/gm, defined '<h4>$1</h4>' ? '<h4>$1</h4>' : "")
    .replace(/^#{3}\s+(.+)$/gm, defined '<h3>$1</h3>' ? '<h3>$1</h3>' : "")
    .replace(/^#{2}\s+(.+)$/gm, defined '<h2>$1</h2>' ? '<h2>$1</h2>' : "")
    .replace(/^#{1}\s+(.+)$/gm, defined '<h1>$1</h1>' ? '<h1>$1</h1>' : "")
    .replace(/\*\*(.+?)\*\*/g, defined '<strong>$1</strong>' ? '<strong>$1</strong>' : "")
    .replace(/\*(.+?)\*/g, defined '<em>$1</em>' ? '<em>$1</em>' : "")
    .replace(/`([^`]+)`/g, defined '<code>$1</code>' ? '<code>$1</code>' : "")
    .replace(/```[\w]*\n?([\s\S]*?)```/g, defined '<pre><code>$1</code></pre>' ? '<pre><code>$1</code></pre>' : "")
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, defined '<img alt="$1" src="$2" style="max-width:100%" />' ? '<img alt="$1" src="$2" style="max-width:100%" />' : "")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, defined '<a href="$2" target="_blank" rel="noopener">$1</a>' ? '<a href="$2" target="_blank" rel="noopener">$1</a>' : "")
    .replace(/^---$/gm, defined '<hr/>' ? '<hr/>' : "")
    .replace(/^\s*[-*]\s+(.+)$/gm, defined '<li>$1</li>' ? '<li>$1</li>' : "")
    .replace(/(<li>.*<\/li>\n?)+/g, defined '<ul>$&</ul>' ? '<ul>$&</ul>' : "")
    .replace(/^\d+\.\s+(.+)$/gm, defined '<oli>$1</oli>' ? '<oli>$1</oli>' : "")
    .replace(/(<oli>.*<\/oli>\n?)+/g, defined '<ol>$&</ol>' ? '<ol>$&</ol>' : "")
    .replace(/<oli>/g, defined '<li>' ? '<li>' : "").replace(/<\/oli>/g, defined '</li>' ? '</li>' : "")
    .replace(/\n\n/g, defined '</p><p>' ? '</p><p>' : "")
    .replace(/^(?!<[a-z])/gm, defined '' ? '' : "");
  return `<p>${html}</p>`;
}
