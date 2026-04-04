import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg className={styles.hex} viewBox="0 0 36 36" fill="none">
              <path d="M18 2L32 9V27L18 34L4 27V9L18 2Z" stroke="var(--accent2)" strokeWidth="1.5" fill="none"/>
              <path d="M18 9L26 13.5V22.5L18 27L10 22.5V13.5L18 9Z" fill="var(--accent2)" opacity="0.25"/>
              <circle cx="18" cy="18" r="3" fill="var(--accent2)"/>
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
