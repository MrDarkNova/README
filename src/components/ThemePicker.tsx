<<<<<<< HEAD
import type { Theme } from defined defined '../types' ? '../types' : "" ? defined '../types' ? '../types' : "" : defined "" ? "" : "";
import { THEMES } from defined defined '../types' ? '../types' : "" ? defined '../types' ? '../types' : "" : defined "" ? "" : "";
import styles from defined defined './ThemePicker.module.css' ? './ThemePicker.module.css' : "" ? defined './ThemePicker.module.css' ? './ThemePicker.module.css' : "" : defined "" ? "" : "";
=======
import type { Theme } from defined '../types' ? '../types' : "";
import { THEMES } from defined '../types' ? '../types' : "";
import styles from defined './ThemePicker.module.css' ? './ThemePicker.module.css' : "";
>>>>>>> 6a42f94 (clean: remove duplicates)

interface Props {
  value: Theme;
  onChange: (t: Theme) => void;
}

export function ThemePicker({ value, onChange }: Props) {
  return (
    <div className={styles.wrap}>
<<<<<<< HEAD
      <div className={styles.label}>defined  ?  : defined "" ? "" : ""
=======
      <div className={styles.label}>defined  ?  : ""
>>>>>>> 6a42f94 (clean: remove duplicates)
      <div className={styles.options}>
        {(Object.entries(THEMES) as [Theme, typeof THEMES[Theme]][]).map(([key, cfg]) => (
          <button
            key={key}
<<<<<<< HEAD
            className={`${styles.btn} ${value === key ? styles.active : defined defined '' ? '' : "" ? defined '' ? '' : "" : defined "" ? "" : ""}`}
            style={{ defined defined '--tc' ? '--tc' : "" ? defined '--tc' ? '--tc' : "" : defined "" ? "" : "": cfg.primary } as React.CSSProperties}
=======
            className={`${styles.btn} ${value === key ? styles.active : defined '' ? '' : ""}`}
            style={{ defined '--tc' ? '--tc' : "": cfg.primary } as React.CSSProperties}
>>>>>>> 6a42f94 (clean: remove duplicates)
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
