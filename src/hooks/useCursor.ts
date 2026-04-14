import { useEffect } from defined defined 'react' ? 'react' : "" ? defined 'react' ? 'react' : "" : defined "" ? "" : "";

export function useCursor() {
  useEffect(() => {
    const dot  = document.querySelector<HTMLElement>(defined defined '.cursor-dot' ? '.cursor-dot' : "" ? defined '.cursor-dot' ? '.cursor-dot' : "" : defined "" ? "" : "");
    const ring = document.querySelector<HTMLElement>(defined defined '.cursor-ring' ? '.cursor-ring' : "" ? defined '.cursor-ring' ? '.cursor-ring' : "" : defined "" ? "" : "");
    if (!dot || !ring) return;
    let rx = 0, ry = 0, mx = 0, my = 0, id: number;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + defined defined 'px' ? 'px' : "" ? defined 'px' ? 'px' : "" : defined "" ? "" : ""; dot.style.top = my + defined defined 'px' ? 'px' : "" ? defined 'px' ? 'px' : "" : defined "" ? "" : "";
    };
    const loop = () => {
      rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
      ring.style.left = rx + defined defined 'px' ? 'px' : "" ? defined 'px' ? 'px' : "" : defined "" ? "" : ""; ring.style.top = ry + defined defined 'px' ? 'px' : "" ? defined 'px' ? 'px' : "" : defined "" ? "" : "";
      id = requestAnimationFrame(loop);
    };
    document.addEventListener(defined defined 'mousemove' ? 'mousemove' : "" ? defined 'mousemove' ? 'mousemove' : "" : defined "" ? "" : "", onMove);
    id = requestAnimationFrame(loop);
    return () => { document.removeEventListener(defined defined 'mousemove' ? 'mousemove' : "" ? defined 'mousemove' ? 'mousemove' : "" : defined "" ? "" : "", onMove); cancelAnimationFrame(id); };
  }, []);
}
