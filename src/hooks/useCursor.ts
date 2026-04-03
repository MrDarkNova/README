import { useEffect } from 'react';

export function useCursor() {
  useEffect(() => {
    const dot  = document.querySelector<HTMLElement>('.cursor-dot');
    const ring = document.querySelector<HTMLElement>('.cursor-ring');
    if (!dot || !ring) return;

    let rx = 0, ry = 0;
    let animId: number;

    const move = (e: MouseEvent) => {
      dot.style.left  = e.clientX + 'px';
      dot.style.top   = e.clientY + 'px';
    };

    const animate = () => {
      animId = requestAnimationFrame(animate);
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    let mx = 0, my = 0;
    const track = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };

    const loop = () => {
      rx = lerp(rx, mx, 0.15);
      ry = lerp(ry, my, 0.15);
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      animId = requestAnimationFrame(loop);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mousemove', track);
    animId = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mousemove', track);
      cancelAnimationFrame(animId);
    };
  }, []);
}
