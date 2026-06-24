"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { SplitText } from "gsap/SplitText";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillsScroller from "./components/SkillsScroller/page";

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
    <div className="pt-16 p-6">
      {/* three.js artifact */}
      <section className="h-screen pl-6 pr-6 pt-20 flex w-full ">
        <div></div>
      </section>
      <div className="flex items-center justify-center">
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
