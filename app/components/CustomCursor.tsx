"use client";

import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef } from "react";

export default function CustomCursor() {
  const pointer = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.set(pointer.current, {
      xPercent: -50,
      yPercent: -50,
    });
  }, []);

  useEffect(() => {
    const setCursorX = gsap.quickTo(pointer.current, "x", { duration: 0.2 });
    const setCursorY = gsap.quickTo(pointer.current, "y", { duration: 0.2 });

    const onPointerMove = (e: PointerEvent) => {
      setCursorX(e.clientX);
      setCursorY(e.clientY);
    };

    document.body.addEventListener("pointermove", onPointerMove);
    return () =>
      document.body.removeEventListener("pointermove", onPointerMove);
  }, []);

  return (
    <div
      ref={pointer}
      className="pointer-events-none absolute overflow-hidden rounded-full size-6 bg-white z-50"
    ></div>
  );
}
