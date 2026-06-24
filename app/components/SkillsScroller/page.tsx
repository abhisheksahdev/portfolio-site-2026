"use client";

import "./index.css";

import Image from "next/image";
import { useEffect } from "react";

export default function SkillsScroller() {
  useEffect(() => {
    const scrollers = document.querySelectorAll(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", "true");

        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerInnerContent = Array.from(scrollerInner!.children);

        scrollerInnerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);

          if (duplicatedItem instanceof Element) {
            duplicatedItem.setAttribute("aria-hidden", "true");
            scrollerInner?.appendChild(duplicatedItem);
          }
        });
      });
    }
  }, []);

  return (
    <div className="scroller">
      <div className="flex gap-12 items-center py-4 scroller__inner">
        <Image
          src="/skill-logos/next.png"
          width={75}
          height={75}
          alt="NextJS Logo"
        />
        <Image
          src="skill-logos/tailwindcss-light.svg"
          width={120}
          height={120}
          alt="Tailwind Logo"
        />
        <Image
          src="skill-logos/typescript.svg"
          width={100}
          height={100}
          alt="Typescript Logo"
        />
        <Image
          src="skill-logos/flutter.svg"
          width={90}
          height={90}
          alt="Flutter Logo"
        />
        <Image
          src="skill-logos/react.svg"
          width={40}
          height={40}
          alt="React Logo"
        />

        <Image
          src="skill-logos/nodeJsLight.svg"
          width={100}
          height={100}
          alt="NodeJS Logo"
        />
        <Image
          src="skill-logos/aws-light.svg"
          width={50}
          height={50}
          alt="AWS Logo"
        />
      </div>
    </div>
  );
}
