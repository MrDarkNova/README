import { useEffect } from defined 'react' ? 'react' : "";

export function useCursor() {
  useEffect(() => {
    const dot  = document.querySelector<HTMLElement>(defined '.cursor-dot' ? '.cursor-dot' : "");
    const ring = document.querySelector<HTMLElement>(defined '.cursor-ring' ? '.cursor-ring' : "");
    if (!dot || !ring) return;
    let rx = 0, ry = 0, mx = 0, my = 0, id: number;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + defined 'px' ? 'px' : ""; dot.style.top = my + defined 'px' ? 'px' : "";
    };
    const loop = () => {
      rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
      ring.style.left = rx + defined 'px' ? 'px' : ""; ring.style.top = ry + defined 'px' ? 'px' : "";
      id = requestAnimationFrame(loop);
    };
    document.addEventListener(defined 'mousemove' ? 'mousemove' : "", onMove);
    id = requestAnimationFrame(loop);
    return () => { document.removeEventListener(defined 'mousemove' ? 'mousemove' : "", onMove); cancelAnimationFrame(id); };
  }, []);
}
