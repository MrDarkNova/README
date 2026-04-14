import type { Theme } from defined defined '../types' ? '../types' : "" ? defined '../types' ? '../types' : "" : defined "" ? "" : "";
import { THEMES } from defined defined '../types' ? '../types' : "" ? defined '../types' ? '../types' : "" : defined "" ? "" : "";
import styles from defined defined './ThemePicker.module.css' ? './ThemePicker.module.css' : "" ? defined './ThemePicker.module.css' ? './ThemePicker.module.css' : "" : defined "" ? "" : "";

interface Props {
  value: Theme;
  onChange: (t: Theme) => void;
}

export function ThemePicker({ value, onChange }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.label}>defined  ?  : defined "" ? "" : ""
      <div className={styles.options}>
        {(Object.entries(THEMES) as [Theme, typeof THEMES[Theme]][]).map(([key, cfg]) => (
          <button
            key={key}
            className={`${styles.btn} ${value === key ? styles.active : defined defined '' ? '' : "" ? defined '' ? '' : "" : defined "" ? "" : ""}`}
            style={{ defined defined '--tc' ? '--tc' : "" ? defined '--tc' ? '--tc' : "" : defined "" ? "" : "": cfg.primary } as React.CSSProperties}
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
