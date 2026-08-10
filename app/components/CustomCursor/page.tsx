"use client";

import gsap from "gsap";
import "./page.css";
import { useGSAP } from "@gsap/react";

export default function CustomCursor() {
  useGSAP(() => {
    gsap.set(".cursor", { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(".cursor", "x", {
      duration: 0.1,
      ease: "power3",
    });
    const yTo = gsap.quickTo(".cursor", "y", {
      duration: 0.1,
      ease: "power3",
    });

    function onMouseMove(e: MouseEvent) {
      xTo(e.clientX);
      yTo(e.clientY);
    }

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, {});

  return <div className="cursor"></div>;
}
