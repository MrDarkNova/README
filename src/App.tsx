import { useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { TerminalOutput } from './components/TerminalOutput';
import { TerminalInput } from './components/TerminalInput';
import { Background } from './components/Background';
import { Footer } from './components/Footer';
import { useTerminal } from './hooks/useTerminal';
import { useCursor } from './hooks/useCursor';
import styles from './App.module.css';

export default function App() {
  useCursor();

  const { lines, isRunning, run, navigateHistory } = useTerminal();

  const handleSubmit = useCallback((cmd: string) => {
    void run(cmd);
  }, [run]);

  return (
    <>
      <div className="cursor-dot" />
      <div className="cursor-ring" />
      <Background />

      <div className={styles.shell}>
        <Navbar isRunning={isRunning} />

        <div className={styles.body}>
          <TerminalOutput lines={lines} isRunning={isRunning} />
          <TerminalInput
            onSubmit={handleSubmit}
            onNavigate={navigateHistory}
            isRunning={isRunning}
          />
        </div>

        <Footer />
      </div>
    </>
  );
}
