"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.querySelector(".cursor") as HTMLElement;
    document.addEventListener("mousemove", onMouseMove);

    function onMouseMove(e: MouseEvent) {
      const x = e.clientX;
      const y = e.clientY;

      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
    }
  }, []);

  return (
    <div className="pointer-events-none fixed rounded-full size-5 bg-white z-50 -translate-1/2 cursor mix-blend-difference"></div>
  );
}
