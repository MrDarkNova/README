import { useState, useCallback, useRef } from 'react';
import type { TerminalLine, ScanHistory } from '../types';
import { processCommand, HELP_TEXT } from '../utils/commandProcessor';

export function useTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>(HELP_TEXT);
  const [history, setHistory] = useState<ScanHistory[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIdx, setCmdIdx] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const abortRef = useRef(false);

  const pushLine = useCallback((l: TerminalLine) => {
    setLines(prev => [...prev, l]);
  }, []);

  const run = useCallback(async (raw: string) => {
    if (!raw.trim()) return;
    if (isRunning) return;

    setCmdHistory(p => [raw, ...p.slice(0, 49)]);
    setCmdIdx(-1);

    const inputLine: TerminalLine = {
      id: Math.random().toString(36).slice(2),
      type: 'input',
      text: `> ${raw}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
    };

    if (raw.trim().toLowerCase() === 'clear' || raw.trim().toLowerCase() === 'cls') {
      setLines([]);
      return;
    }

    if (raw.trim().toLowerCase() === 'history') {
      setLines(prev => [
        ...prev,
        inputLine,
        { id: Math.random().toString(36).slice(2), type: 'divider', text: '─'.repeat(56) },
        { id: Math.random().toString(36).slice(2), type: 'info', text: '  SCAN HISTORY' },
        { id: Math.random().toString(36).slice(2), type: 'divider', text: '─'.repeat(56) },
        ...history.map(h => ({
          id: Math.random().toString(36).slice(2),
          type: 'output' as const,
          text: `  [${h.timestamp}] ${h.module.toUpperCase().padEnd(8)} → ${h.query}  (${h.lineCount} results)`,
        })),
        history.length === 0
          ? { id: Math.random().toString(36).slice(2), type: 'warning' as const, text: '  No scans yet.' }
          : { id: Math.random().toString(36).slice(2), type: 'divider', text: '─'.repeat(56) },
      ]);
      return;
    }

    setLines(prev => [...prev, inputLine]);
    setIsRunning(true);
    abortRef.current = false;

    const startCount = lines.length + 1;

    const module = await processCommand(raw, (l) => {
      if (!abortRef.current) pushLine(l);
    });

    if (module) {
      const entry: ScanHistory = {
        module,
        query: raw.split(/\s+/).slice(2).join(' '),
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        lineCount: lines.length - startCount,
      };
      setHistory(p => [entry, ...p.slice(0, 19)]);
    }

    setIsRunning(false);
  }, [isRunning, lines.length, history, pushLine]);

  const navigateHistory = useCallback((dir: 'up' | 'down'): string => {
    if (cmdHistory.length === 0) return '';
    const next = dir === 'up'
      ? Math.min(cmdIdx + 1, cmdHistory.length - 1)
      : Math.max(cmdIdx - 1, -1);
    setCmdIdx(next);
    return next === -1 ? '' : cmdHistory[next];
  }, [cmdHistory, cmdIdx]);

  return { lines, isRunning, run, navigateHistory };
}
