"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { SplitText } from "gsap/SplitText";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Home() {
  useGSAP(() => {
    const split = SplitText.create(".hero-text", {
      type: "lines",
    });

    // gsap tween

    gsap.from(split.lines, {
      y: 50,
      autoAlpha: 0,
      stagger: {
        amount: 0.5,
        from: "end",
      },
    });
  }, {});

  return (
    <div className="pt-16 flex p-6">
      <section className="max-h-screen pl-6 pr-6 pt-20">
        <div className="font-logo font-bold text-6xl leading-18 hero-text">
          I MUST NOT FEAR.
          <br /> FEAR IS THE MIND-KILLER. <br /> FEAR IS THE LITTLE-DEATH THAT
          BRINGS TOTAL OBLITERATION. I WILL FACE MY FEAR.
        </div>
        <div></div>
      </section>
    </div>
  );
}
