import { useEffect } from 'react';

export function useCursor() {
  useEffect(() => {
    const dot  = document.querySelector<HTMLElement>('.cursor-dot');
    const ring = document.querySelector<HTMLElement>('.cursor-ring');
    if (!dot || !ring) return;
    let rx = 0, ry = 0, mx = 0, my = 0, id: number;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    };
    const loop = () => {
      rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      id = requestAnimationFrame(loop);
    };
    document.addEventListener('mousemove', onMove);
    id = requestAnimationFrame(loop);
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(id); };
  }, []);
}
