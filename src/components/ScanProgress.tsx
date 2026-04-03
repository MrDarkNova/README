import styles from './ScanProgress.module.css';

interface Props {
  stage: 'scanning' | 'generating';
  files: string[];
  current: number;
}

const SCANNING_MESSAGES = [
  'Parsing project structure...',
  'Reading dependency graph...',
  'Detecting tech stack...',
  'Analysing entry points...',
  'Extracting scripts...',
  'Checking deployment config...',
  'Scanning source files...',
  'Building context payload...',
];

const GENERATING_MESSAGES = [
  'Crafting badges...',
  'Writing feature descriptions...',
  'Building installation guide...',
  'Generating structure tree...',
  'Adding deployment section...',
  'Polishing final output...',
];

export function ScanProgress({ stage, files, current }: Props) {
  const msgs = stage === 'scanning' ? SCANNING_MESSAGES : GENERATING_MESSAGES;
  const msgIdx = Math.min(current, msgs.length - 1);

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.scanLine} />

        <div className={styles.top}>
          <div className={styles.spinner} />
          <div className={styles.stageLabel}>
            {stage === 'scanning' ? '// SCANNING PROJECT' : '// GENERATING README'}
          </div>
        </div>

        <div className={styles.msg}>{msgs[msgIdx]}</div>

        {stage === 'scanning' && files.length > 0 && (
          <div className={styles.fileList}>
            {files.slice(-6).map((f, i) => (
              <div key={i} className={styles.fileLine}>
                <span className={styles.fileIcon}>▸</span>
                <span className={styles.filePath}>{f}</span>
              </div>
            ))}
          </div>
        )}

        {stage === 'generating' && (
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
