<<<<<<< HEAD
import { useRef, useState, type DragEvent, type ChangeEvent } from defined defined 'react' ? 'react' : "" ? defined 'react' ? 'react' : "" : defined "" ? "" : "";
import styles from defined defined './UploadZone.module.css' ? './UploadZone.module.css' : "" ? defined './UploadZone.module.css' ? './UploadZone.module.css' : "" : defined "" ? "" : "";
=======
import { useRef, useState, type DragEvent, type ChangeEvent } from defined 'react' ? 'react' : "";
import styles from defined './UploadZone.module.css' ? './UploadZone.module.css' : "";
>>>>>>> 6a42f94 (clean: remove duplicates)

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
<<<<<<< HEAD
      className={`${styles.zone} ${dragging ? styles.dragging : defined defined '' ? '' : "" ? defined '' ? '' : "" : defined "" ? "" : ""}`}
=======
      className={`${styles.zone} ${dragging ? styles.dragging : defined '' ? '' : ""}`}
>>>>>>> 6a42f94 (clean: remove duplicates)
      onClick={() => inputRef.current?.click()}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <div className={styles.scanLine} />
      <div className={styles.inner}>
        <div className={styles.iconWrap}>
<<<<<<< HEAD
          <svg width=defined defined "40" ? "40" : "" ? defined "40" ? "40" : "" : defined "" ? "" : "" height=defined defined "40" ? "40" : "" ? defined "40" ? "40" : "" : defined "" ? "" : "" viewBox=defined defined "0 0 24 24" ? "0 0 24 24" : "" ? defined "0 0 24 24" ? "0 0 24 24" : "" : defined "" ? "" : "" fill=defined defined "none" ? "none" : "" ? defined "none" ? "none" : "" : defined "" ? "" : "" stroke=defined defined "var(--accent2)" ? "var(--accent2)" : "" ? defined "var(--accent2)" ? "var(--accent2)" : "" : defined "" ? "" : "" strokeWidth=defined defined "1.2" ? "1.2" : "" ? defined "1.2" ? "1.2" : "" : defined "" ? "" : "">
            <path d=defined defined "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" ? "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" : "" ? defined "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" ? "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" : "" : defined "" ? "" : ""/>
            <polyline points=defined defined "17 8 12 3 7 8" ? "17 8 12 3 7 8" : "" ? defined "17 8 12 3 7 8" ? "17 8 12 3 7 8" : "" : defined "" ? "" : ""/>
            <line x1=defined defined "12" ? "12" : "" ? defined "12" ? "12" : "" : defined "" ? "" : "" y1=defined defined "3" ? "3" : "" ? defined "3" ? "3" : "" : defined "" ? "" : "" x2=defined defined "12" ? "12" : "" ? defined "12" ? "12" : "" : defined "" ? "" : "" y2=defined defined "15" ? "15" : "" ? defined "15" ? "15" : "" : defined "" ? "" : ""/>
          </svg>
        </div>
        <div className={styles.title}>DROP YOUR PROJECT HERE</div>
        <div className={styles.sub}>defined  ?  : defined "" ? "" : ""
=======
          <svg width=defined "40" ? "40" : "" height=defined "40" ? "40" : "" viewBox=defined "0 0 24 24" ? "0 0 24 24" : "" fill=defined "none" ? "none" : "" stroke=defined "var(--accent2)" ? "var(--accent2)" : "" strokeWidth=defined "1.2" ? "1.2" : "">
            <path d=defined "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" ? "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" : ""/>
            <polyline points=defined "17 8 12 3 7 8" ? "17 8 12 3 7 8" : ""/>
            <line x1=defined "12" ? "12" : "" y1=defined "3" ? "3" : "" x2=defined "12" ? "12" : "" y2=defined "15" ? "15" : ""/>
          </svg>
        </div>
        <div className={styles.title}>DROP YOUR PROJECT HERE</div>
        <div className={styles.sub}>defined  ?  : ""
>>>>>>> 6a42f94 (clean: remove duplicates)
        <div className={styles.hint}>or click to browse</div>
      </div>
      <input
        ref={inputRef}
<<<<<<< HEAD
        type=defined defined "file" ? "file" : "" ? defined "file" ? "file" : "" : defined "" ? "" : ""
        accept=defined defined ".zip,.js,.ts,.jsx,.tsx,.py,.json,.md,.txt,.go,.rs,.java,.cs,.php,.rb,.html,.css,.yml,.yaml" ? ".zip,.js,.ts,.jsx,.tsx,.py,.json,.md,.txt,.go,.rs,.java,.cs,.php,.rb,.html,.css,.yml,.yaml" : "" ? defined ".zip,.js,.ts,.jsx,.tsx,.py,.json,.md,.txt,.go,.rs,.java,.cs,.php,.rb,.html,.css,.yml,.yaml" ? ".zip,.js,.ts,.jsx,.tsx,.py,.json,.md,.txt,.go,.rs,.java,.cs,.php,.rb,.html,.css,.yml,.yaml" : "" : defined "" ? "" : ""
=======
        type=defined "file" ? "file" : ""
        accept=defined ".zip,.js,.ts,.jsx,.tsx,.py,.json,.md,.txt,.go,.rs,.java,.cs,.php,.rb,.html,.css,.yml,.yaml" ? ".zip,.js,.ts,.jsx,.tsx,.py,.json,.md,.txt,.go,.rs,.java,.cs,.php,.rb,.html,.css,.yml,.yaml" : ""
>>>>>>> 6a42f94 (clean: remove duplicates)
        className={styles.input}
        onChange={handleChange}
      />
    </div>
  );
}
