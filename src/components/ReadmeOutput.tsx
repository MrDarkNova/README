import { useState } from 'react';
import styles from './ReadmeOutput.module.css';

interface Props {
  markdown: string;
  onReset: () => void;
}

export function ReadmeOutput({ markdown, onReset }: Props) {
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<'preview' | 'raw'>('raw');

  function handleCopy() {
    navigator.clipboard.writeText(markdown).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleDownload() {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.topBar}>
        <div className={styles.resultLabel}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          README GENERATED
        </div>

        <div className={styles.tabs}>
          <button className={`${styles.tab} ${tab === 'raw' ? styles.activeTab : ''}`} onClick={() => setTab('raw')}>RAW</button>
          <button className={`${styles.tab} ${tab === 'preview' ? styles.activeTab : ''}`} onClick={() => setTab('preview')}>PREVIEW</button>
        </div>

        <div className={styles.actions}>
          <button className={styles.btnCopy} onClick={handleCopy}>
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                COPIED!
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                COPY
              </>
            )}
          </button>
          <button className={styles.btnDownload} onClick={handleDownload}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            DOWNLOAD
          </button>
          <button className={styles.btnReset} onClick={onReset}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
            NEW
          </button>
        </div>
      </div>

      <div className={styles.outputCard}>
        <div className={styles.scanLine} />
        {tab === 'raw' ? (
          <pre className={styles.raw}>{markdown}</pre>
        ) : (
          <div className={styles.preview}>
            <div className={styles.previewInner} dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }} />
          </div>
        )}
      </div>

      <div className={styles.stats}>
        <span>{markdown.split('\n').length} lines</span>
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
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/^#{6}\s+(.+)$/gm, '<h6>$1</h6>')
    .replace(/^#{5}\s+(.+)$/gm, '<h5>$1</h5>')
    .replace(/^#{4}\s+(.+)$/gm, '<h4>$1</h4>')
    .replace(/^#{3}\s+(.+)$/gm, '<h3>$1</h3>')
    .replace(/^#{2}\s+(.+)$/gm, '<h2>$1</h2>')
    .replace(/^#{1}\s+(.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/```[\w]*\n?([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" style="max-width:100%" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/^---$/gm, '<hr/>')
    .replace(/^\s*[-*]\s+(.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/^\d+\.\s+(.+)$/gm, '<oli>$1</oli>')
    .replace(/(<oli>.*<\/oli>\n?)+/g, '<ol>$&</ol>')
    .replace(/<oli>/g, '<li>').replace(/<\/oli>/g, '</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[a-z])/gm, '');
  return `<p>${html}</p>`;
}
