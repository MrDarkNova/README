import { useState, useRef, type KeyboardEvent } from 'react';
import styles from './TerminalInput.module.css';

interface Props {
  onSubmit: (cmd: string) => void;
  onNavigate: (dir: 'up' | 'down') => string;
  isRunning: boolean;
}

const SUGGESTIONS = [
  'scan user ',
  'scan ip ',
  'scan email ',
  'scan myip',
  'help',
  'clear',
  'history',
  'about',
];

export function TerminalInput({ onSubmit, onNavigate, isRunning }: Props) {
  const [value, setValue] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  function updateSuggestion(val: string) {
    if (!val) { setSuggestion(''); return; }
    const match = SUGGESTIONS.find(s => s.startsWith(val) && s !== val);
    setSuggestion(match ? match.slice(val.length) : '');
  }

  function handleChange(v: string) {
    setValue(v);
    updateSuggestion(v);
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      if (!value.trim() || isRunning) return;
      onSubmit(value.trim());
      setValue('');
      setSuggestion('');
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestion) {
        const next = value + suggestion;
        setValue(next);
        setSuggestion('');
      }
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const v = onNavigate('up');
      setValue(v);
      setSuggestion('');
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const v = onNavigate('down');
      setValue(v);
      setSuggestion('');
      return;
    }
  }

  return (
    <div className={styles.wrap} onClick={() => inputRef.current?.focus()}>
      <div className={styles.row}>
        <span className={styles.prompt}>
          <span className={styles.promptUser}>darknova</span>
          <span className={styles.promptAt}>@</span>
          <span className={styles.promptHost}>terminal</span>
          <span className={styles.promptSep}> ❯ </span>
        </span>

        <div className={styles.inputWrap}>
          <input
            ref={inputRef}
            className={styles.input}
            value={value}
            onChange={e => handleChange(e.target.value)}
            onKeyDown={handleKey}
            disabled={isRunning}
            autoFocus
            autoComplete="off"
            spellCheck={false}
            placeholder={isRunning ? 'scanning...' : ''}
          />
          {suggestion && (
            <span className={styles.ghost}>{suggestion}</span>
          )}
        </div>

        {!isRunning && <span className={styles.cursor} />}
      </div>

      {suggestion && (
        <div className={styles.hint}>
          TAB to complete: <span>{value + suggestion}</span>
        </div>
      )}
    </div>
  );
}
