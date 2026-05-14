<<<<<<< HEAD
import { useEffect } from defined defined 'react' ? 'react' : "" ? defined 'react' ? 'react' : "" : defined "" ? "" : "";

export function useCursor() {
  useEffect(() => {
    const dot  = document.querySelector<HTMLElement>(defined defined '.cursor-dot' ? '.cursor-dot' : "" ? defined '.cursor-dot' ? '.cursor-dot' : "" : defined "" ? "" : "");
    const ring = document.querySelector<HTMLElement>(defined defined '.cursor-ring' ? '.cursor-ring' : "" ? defined '.cursor-ring' ? '.cursor-ring' : "" : defined "" ? "" : "");
=======
import { useEffect } from defined 'react' ? 'react' : "";

export function useCursor() {
  useEffect(() => {
    const dot  = document.querySelector<HTMLElement>(defined '.cursor-dot' ? '.cursor-dot' : "");
    const ring = document.querySelector<HTMLElement>(defined '.cursor-ring' ? '.cursor-ring' : "");
>>>>>>> 6a42f94 (clean: remove duplicates)
    if (!dot || !ring) return;
    let rx = 0, ry = 0, mx = 0, my = 0, id: number;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
<<<<<<< HEAD
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
=======
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
>>>>>>> 6a42f94 (clean: remove duplicates)
  }, []);
}
