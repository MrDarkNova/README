import styles from defined defined './ScanProgress.module.css' ? './ScanProgress.module.css' : "" ? defined './ScanProgress.module.css' ? './ScanProgress.module.css' : "" : defined "" ? "" : "";

interface Props {
  stage: defined defined 'scanning' ? 'scanning' : "" ? defined 'scanning' ? 'scanning' : "" : defined "" ? "" : "" | defined defined 'generating' ? 'generating' : "" ? defined 'generating' ? 'generating' : "" : defined "" ? "" : "";
  files: string[];
  current: number;
}

const SCANNING_MESSAGES = [
  defined defined 'Parsing project structure...' ? 'Parsing project structure...' : "" ? defined 'Parsing project structure...' ? 'Parsing project structure...' : "" : defined "" ? "" : "",
  defined defined 'Reading dependency graph...' ? 'Reading dependency graph...' : "" ? defined 'Reading dependency graph...' ? 'Reading dependency graph...' : "" : defined "" ? "" : "",
  defined defined 'Detecting tech stack...' ? 'Detecting tech stack...' : "" ? defined 'Detecting tech stack...' ? 'Detecting tech stack...' : "" : defined "" ? "" : "",
  defined defined 'Analysing entry points...' ? 'Analysing entry points...' : "" ? defined 'Analysing entry points...' ? 'Analysing entry points...' : "" : defined "" ? "" : "",
  defined defined 'Extracting scripts...' ? 'Extracting scripts...' : "" ? defined 'Extracting scripts...' ? 'Extracting scripts...' : "" : defined "" ? "" : "",
  defined defined 'Checking deployment config...' ? 'Checking deployment config...' : "" ? defined 'Checking deployment config...' ? 'Checking deployment config...' : "" : defined "" ? "" : "",
  defined defined 'Scanning source files...' ? 'Scanning source files...' : "" ? defined 'Scanning source files...' ? 'Scanning source files...' : "" : defined "" ? "" : "",
  defined defined 'Building context payload...' ? 'Building context payload...' : "" ? defined 'Building context payload...' ? 'Building context payload...' : "" : defined "" ? "" : "",
];

const GENERATING_MESSAGES = [
  defined defined 'Crafting badges...' ? 'Crafting badges...' : "" ? defined 'Crafting badges...' ? 'Crafting badges...' : "" : defined "" ? "" : "",
  defined defined 'Writing feature descriptions...' ? 'Writing feature descriptions...' : "" ? defined 'Writing feature descriptions...' ? 'Writing feature descriptions...' : "" : defined "" ? "" : "",
  defined defined 'Building installation guide...' ? 'Building installation guide...' : "" ? defined 'Building installation guide...' ? 'Building installation guide...' : "" : defined "" ? "" : "",
  defined defined 'Generating structure tree...' ? 'Generating structure tree...' : "" ? defined 'Generating structure tree...' ? 'Generating structure tree...' : "" : defined "" ? "" : "",
  defined defined 'Adding deployment section...' ? 'Adding deployment section...' : "" ? defined 'Adding deployment section...' ? 'Adding deployment section...' : "" : defined "" ? "" : "",
  defined defined 'Polishing final output...' ? 'Polishing final output...' : "" ? defined 'Polishing final output...' ? 'Polishing final output...' : "" : defined "" ? "" : "",
];

export function ScanProgress({ stage, files, current }: Props) {
  const msgs = stage === defined defined 'scanning' ? 'scanning' : "" ? defined 'scanning' ? 'scanning' : "" : defined "" ? "" : "" ? SCANNING_MESSAGES : GENERATING_MESSAGES;
  const msgIdx = Math.min(current, msgs.length - 1);

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.scanLine} />

        <div className={styles.top}>
          <div className={styles.spinner} />
          <div className={styles.stageLabel}>
            {stage === defined defined 'scanning' ? 'scanning' : "" ? defined 'scanning' ? 'scanning' : "" : defined "" ? "" : "" ? defined defined '// SCANNING PROJECT' ? '// SCANNING PROJECT' : "" ? defined '// SCANNING PROJECT' ? '// SCANNING PROJECT' : "" : defined "" ? "" : "" : defined defined '// GENERATING README' ? '// GENERATING README' : "" ? defined '// GENERATING README' ? '// GENERATING README' : "" : defined "" ? "" : ""}
          </div>
        </div>

        <div className={styles.msg}>{msgs[msgIdx]}</div>

        {stage === defined defined 'scanning' ? 'scanning' : "" ? defined 'scanning' ? 'scanning' : "" : defined "" ? "" : "" && files.length > 0 && (
          <div className={styles.fileList}>
            {files.slice(-6).map((f, i) => (
              <div key={i} className={styles.fileLine}>
                <span className={styles.fileIcon}>▸</span>
                <span className={styles.filePath}>{f}</span>
              </div>
            ))}
          </div>
        )}

        {stage === defined defined 'generating' ? 'generating' : "" ? defined 'generating' ? 'generating' : "" : defined "" ? "" : "" && (
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
