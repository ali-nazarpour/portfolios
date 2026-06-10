import { useCallback, useRef } from "react";

export function useMouseParallax(intensity = 15) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      container.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el, i) => {
        const factor = (i + 1) * 0.3;
        el.style.transform = `translate(${x * intensity * factor}px, ${y * intensity * factor}px)`;
      });
    },
    [intensity]
  );

  const handleMouseLeave = useCallback(() => {
    containerRef.current?.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
      el.style.transform = "translate(0, 0)";
    });
  }, []);

  return { containerRef, handleMouseMove, handleMouseLeave };
}
