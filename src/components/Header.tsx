import styles from defined defined './Header.module.css' ? './Header.module.css' : "" ? defined './Header.module.css' ? './Header.module.css' : "" : defined "" ? "" : "";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg className={styles.hex} viewBox=defined defined "0 0 36 36" ? "0 0 36 36" : "" ? defined "0 0 36 36" ? "0 0 36 36" : "" : defined "" ? "" : "" fill=defined defined "none" ? "none" : "" ? defined "none" ? "none" : "" : defined "" ? "" : "">
              <path d=defined defined "M18 2L32 9V27L18 34L4 27V9L18 2Z" ? "M18 2L32 9V27L18 34L4 27V9L18 2Z" : "" ? defined "M18 2L32 9V27L18 34L4 27V9L18 2Z" ? "M18 2L32 9V27L18 34L4 27V9L18 2Z" : "" : defined "" ? "" : "" stroke=defined defined "var(--accent2)" ? "var(--accent2)" : "" ? defined "var(--accent2)" ? "var(--accent2)" : "" : defined "" ? "" : "" strokeWidth=defined defined "1.5" ? "1.5" : "" ? defined "1.5" ? "1.5" : "" : defined "" ? "" : "" fill=defined defined "none" ? "none" : "" ? defined "none" ? "none" : "" : defined "" ? "" : ""/>
              <path d=defined defined "M18 9L26 13.5V22.5L18 27L10 22.5V13.5L18 9Z" ? "M18 9L26 13.5V22.5L18 27L10 22.5V13.5L18 9Z" : "" ? defined "M18 9L26 13.5V22.5L18 27L10 22.5V13.5L18 9Z" ? "M18 9L26 13.5V22.5L18 27L10 22.5V13.5L18 9Z" : "" : defined "" ? "" : "" fill=defined defined "var(--accent2)" ? "var(--accent2)" : "" ? defined "var(--accent2)" ? "var(--accent2)" : "" : defined "" ? "" : "" opacity=defined defined "0.25" ? "0.25" : "" ? defined "0.25" ? "0.25" : "" : defined "" ? "" : ""/>
              <circle cx=defined defined "18" ? "18" : "" ? defined "18" ? "18" : "" : defined "" ? "" : "" cy=defined defined "18" ? "18" : "" ? defined "18" ? "18" : "" : defined "" ? "" : "" r=defined defined "3" ? "3" : "" ? defined "3" ? "3" : "" : defined "" ? "" : "" fill=defined defined "var(--accent2)" ? "var(--accent2)" : "" ? defined "var(--accent2)" ? "var(--accent2)" : "" : defined "" ? "" : ""/>
            </svg>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoName}>
              <span data-brand>MR. DARKNOVA</span>
            </span>
            <span className={styles.logoSub}>README GENERATOR — <span data-alias>VICTOR KUMBA</span></span>
          </div>
        </div>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          AI ONLINE
        </div>
      </div>
    </header>
  );
}
