"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { SplitText } from "gsap/SplitText";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Home() {
  useGSAP(() => {
    const split = SplitText.create(".hero-text", {
      type: "lines, chars",
      linesClass: "lines",
      wordsClass: "words",
      charsClass: "chars",
      autoSplit: true,
      smartWrap: true,
    });

    // gsap tween

    gsap.from(split.lines, {
      yPercent: 20,
      autoAlpha: 0,
      // opacity: 1,
      duration: 1.5,
      stagger: {
        amount: 0.5,
        from: "end",
      },
    });
  }, {});

  return (
    <div className="pt-16 p-6">
      <section className="h-screen pl-6 pr-6 pt-20 flex w-full ">
        <div className="font-logo font-bold text-6xl w-1/2 leading-18 hero-text">
          I MUST NOT FEAR. FEAR IS THE MIND-KILLER. FEAR IS THE LITTLE-DEATH
          THAT BRINGS TOTAL OBLITERATION. I WILL FACE MY FEAR.
        </div>
        <div></div>
      </section>
      <section className="h-screen pl-6 pr-6 pt-20 flex w-full ">
        <div className="font-logo font-bold text-6xl w-1/2 leading-18 hero-text">
          Deep in the human unconscious is a pervasive need for a logical
          universe that makes sense. But the real universe is always one step
          beyond logic.
        </div>
        <div></div>
      </section>
    </div>
  );
}
