import { useEffect, useRef } from 'react';
import type { TerminalLine } from '../types';
import styles from './TerminalOutput.module.css';

interface Props {
  lines: TerminalLine[];
  isRunning: boolean;
}

export function TerminalOutput({ lines, isRunning }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  function lineClass(type: TerminalLine['type']): string {
    const map: Record<TerminalLine['type'], string> = {
      input:   styles.lineInput,
      output:  styles.lineOutput,
      success: styles.lineSuccess,
      error:   styles.lineError,
      info:    styles.lineInfo,
      warning: styles.lineWarning,
      header:  styles.lineHeader,
      divider: styles.lineDivider,
    };
    return `${styles.line} ${map[type]}`;
  }

  return (
    <div className={styles.output}>
      <div className={styles.scanline} />
      {lines.map(l => (
        <div key={l.id} className={lineClass(l.type)}>
          {l.type === 'divider'
            ? <span className={styles.dividerChar}>{l.text}</span>
            : (
              <>
                {l.timestamp && l.type === 'input' && (
                  <span className={styles.ts}>[{l.timestamp}]</span>
                )}
                <span>{l.text}</span>
              </>
            )
          }
        </div>
      ))}
      {isRunning && (
        <div className={`${styles.line} ${styles.lineInfo}`}>
          <span className={styles.spinner}>▋</span>
          <span> processing...</span>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
