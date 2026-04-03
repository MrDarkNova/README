import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>
        Built by{' '}
        <a href="https://mrdarknova.indevs.in" target="_blank" rel="noopener noreferrer">
          MR. DARKNOVA
        </a>
      </span>
      <span className={styles.sep}>·</span>
      <span>For educational purposes only</span>
      <span className={styles.sep}>·</span>
      <span>React + TypeScript</span>
    </footer>
  );
}
