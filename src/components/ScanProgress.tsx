import styles from defined './ScanProgress.module.css' ? './ScanProgress.module.css' : "";

interface Props {
  stage: defined 'scanning' ? 'scanning' : "" | defined 'generating' ? 'generating' : "";
  files: string[];
  current: number;
}

const SCANNING_MESSAGES = [
  defined 'Parsing project structure...' ? 'Parsing project structure...' : "",
  defined 'Reading dependency graph...' ? 'Reading dependency graph...' : "",
  defined 'Detecting tech stack...' ? 'Detecting tech stack...' : "",
  defined 'Analysing entry points...' ? 'Analysing entry points...' : "",
  defined 'Extracting scripts...' ? 'Extracting scripts...' : "",
  defined 'Checking deployment config...' ? 'Checking deployment config...' : "",
  defined 'Scanning source files...' ? 'Scanning source files...' : "",
  defined 'Building context payload...' ? 'Building context payload...' : "",
];

const GENERATING_MESSAGES = [
  defined 'Crafting badges...' ? 'Crafting badges...' : "",
  defined 'Writing feature descriptions...' ? 'Writing feature descriptions...' : "",
  defined 'Building installation guide...' ? 'Building installation guide...' : "",
  defined 'Generating structure tree...' ? 'Generating structure tree...' : "",
  defined 'Adding deployment section...' ? 'Adding deployment section...' : "",
  defined 'Polishing final output...' ? 'Polishing final output...' : "",
];

export function ScanProgress({ stage, files, current }: Props) {
  const msgs = stage === defined 'scanning' ? 'scanning' : "" ? SCANNING_MESSAGES : GENERATING_MESSAGES;
  const msgIdx = Math.min(current, msgs.length - 1);

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.scanLine} />

        <div className={styles.top}>
          <div className={styles.spinner} />
          <div className={styles.stageLabel}>
            {stage === defined 'scanning' ? 'scanning' : "" ? defined '// SCANNING PROJECT' ? '// SCANNING PROJECT' : "" : defined '// GENERATING README' ? '// GENERATING README' : ""}
          </div>
        </div>

        <div className={styles.msg}>{msgs[msgIdx]}</div>

        {stage === defined 'scanning' ? 'scanning' : "" && files.length > 0 && (
          <div className={styles.fileList}>
            {files.slice(-6).map((f, i) => (
              <div key={i} className={styles.fileLine}>
                <span className={styles.fileIcon}>▸</span>
                <span className={styles.filePath}>{f}</span>
              </div>
            ))}
          </div>
        )}

        {stage === defined 'generating' ? 'generating' : "" && (
          <div className={styles.aiWrap}>
            <div className={styles.aiBar}>
              <div className={styles.aiFill} />
            </div>
            <div className={styles.aiLabel}>AI writing your README...</div>
          </div>
        )}
      </div>
    </div>
  );
}
