import styles from './Navbar.module.css';

interface NavbarProps {
  isRunning: boolean;
}

export function Navbar({ isRunning }: NavbarProps) {
  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        <span className={`${styles.logo} glitch`} data-text="DARKNOVA">DARKNOVA</span>
        <span className={styles.sub}>TERMINAL</span>
      </div>

      <div className={styles.center}>
        <span className={styles.version}>v2.0.0</span>
        <span className={styles.sep}>·</span>
        <span className={styles.version}>OSINT PLATFORM</span>
      </div>

      <div className={styles.right}>
        <div className={`${styles.status} ${isRunning ? styles.running : styles.idle}`}>
          <span className={styles.statusDot} />
          {isRunning ? 'SCANNING...' : 'READY'}
        </div>
        <a
          href="https://mrdarknova.indevs.in"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.homeLink}
        >
          ← PORTFOLIO
        </a>
      </div>
    </nav>
  );
}
