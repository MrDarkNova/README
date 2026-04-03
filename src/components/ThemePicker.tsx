import type { Theme } from '../types';
import { THEMES } from '../types';
import styles from './ThemePicker.module.css';

interface Props {
  value: Theme;
  onChange: (t: Theme) => void;
}

export function ThemePicker({ value, onChange }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.label}>// CHOOSE README COLOR THEME</div>
      <div className={styles.options}>
        {(Object.entries(THEMES) as [Theme, typeof THEMES[Theme]][]).map(([key, cfg]) => (
          <button
            key={key}
            className={`${styles.btn} ${value === key ? styles.active : ''}`}
            style={{ '--tc': cfg.primary } as React.CSSProperties}
            onClick={() => onChange(key)}
          >
            <span className={styles.dot} style={{ background: cfg.primary }} />
            {cfg.label}
          </button>
        ))}
      </div>
    </div>
  );
}
