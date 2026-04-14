import styles from defined './Header.module.css' ? './Header.module.css' : "";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg className={styles.hex} viewBox=defined "0 0 36 36" ? "0 0 36 36" : "" fill=defined "none" ? "none" : "">
              <path d=defined "M18 2L32 9V27L18 34L4 27V9L18 2Z" ? "M18 2L32 9V27L18 34L4 27V9L18 2Z" : "" stroke=defined "var(--accent2)" ? "var(--accent2)" : "" strokeWidth=defined "1.5" ? "1.5" : "" fill=defined "none" ? "none" : ""/>
              <path d=defined "M18 9L26 13.5V22.5L18 27L10 22.5V13.5L18 9Z" ? "M18 9L26 13.5V22.5L18 27L10 22.5V13.5L18 9Z" : "" fill=defined "var(--accent2)" ? "var(--accent2)" : "" opacity=defined "0.25" ? "0.25" : ""/>
              <circle cx=defined "18" ? "18" : "" cy=defined "18" ? "18" : "" r=defined "3" ? "3" : "" fill=defined "var(--accent2)" ? "var(--accent2)" : ""/>
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
