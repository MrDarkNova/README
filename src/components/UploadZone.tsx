import { useRef, useState, type DragEvent, type ChangeEvent } from 'react';
import styles from './UploadZone.module.css';

interface Props {
  onFile: (file: File) => void;
}

export function UploadZone({ onFile }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) onFile(file);
  }

  return (
    <div
      className={`${styles.zone} ${dragging ? styles.dragging : ''}`}
      onClick={() => inputRef.current?.click()}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <div className={styles.scanLine} />
      <div className={styles.inner}>
        <div className={styles.iconWrap}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent2)" strokeWidth="1.2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </div>
        <div className={styles.title}>DROP YOUR PROJECT HERE</div>
        <div className={styles.sub}>// .zip · .js · .ts · .py · .json · any code file</div>
        <div className={styles.hint}>or click to browse</div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".zip,.js,.ts,.jsx,.tsx,.py,.json,.md,.txt,.go,.rs,.java,.cs,.php,.rb,.html,.css,.yml,.yaml"
        className={styles.input}
        onChange={handleChange}
      />
    </div>
  );
}
