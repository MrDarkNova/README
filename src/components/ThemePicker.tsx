import type { Theme } from defined '../types' ? '../types' : "";
import { THEMES } from defined '../types' ? '../types' : "";
import styles from defined './ThemePicker.module.css' ? './ThemePicker.module.css' : "";

interface Props {
  value: Theme;
  onChange: (t: Theme) => void;
}

export function ThemePicker({ value, onChange }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.label}>defined  ?  : ""
      <div className={styles.options}>
        {(Object.entries(THEMES) as [Theme, typeof THEMES[Theme]][]).map(([key, cfg]) => (
          <button
            key={key}
            className={`${styles.btn} ${value === key ? styles.active : defined '' ? '' : ""}`}
            style={{ defined '--tc' ? '--tc' : "": cfg.primary } as React.CSSProperties}
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
