"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { SplitText } from "gsap/SplitText";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillsScroller from "./components/SkillsScroller/page";
import WaveSimulation from "./components/RippleSimulation/page";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Home() {
  useGSAP(() => {
    const texts = gsap.utils.toArray(".hero-text");

    texts.forEach((text) => {
      const split = new SplitText(text as string, {
        type: "lines, chars, words",
        autoSplit: true,
        smartWrap: true,
        mask: "words",
      });

      gsap.from(split.words, {
        scrollTrigger: {
          trigger: text as string,
          start: "top 94%",
          toggleActions: "restart none none none",
          // markers: true,
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        mask: "words",
      });
    });

    // gsap tween

    // return () => split.revert();
  }, {});

  return (
    <div className="">
      <section className="h-screen flex w-full" id="hero">
        <WaveSimulation />
      </section>
      <div className="flex flex-col items-center justify-center mt-20">
        <p className="text-gray-300 font-mono font-medium text-lg mb-10">
          Delivered projects to 10+ clients using
        </p>
        <SkillsScroller />
      </div>
      {/* work experience timeline */}
      <section className="pl-6 pr-6 pt-20 flex flex-col w-full h-screen">
        <div className="font-logo font-bold text-5xl leading-18 hero-text">
          Work // काम
        </div>
        <div></div>
      </section>
      <section className="pl-6 pr-6 pt-20 flex flex-col w-full h-screen">
        <div className="font-logo font-bold text-5xl leading-18 hero-text">
          Books I Love
        </div>
        <div></div>
      </section>
    </div>
  );
}
