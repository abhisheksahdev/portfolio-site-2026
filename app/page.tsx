"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { SplitText } from "gsap/SplitText";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import SkillsScroller from "./components/SkillsScroller/page";
import WaterRippleSimulation from "./components/RippleSimulation/page";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Home() {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer);

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
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        mask: "words",
      });
    });

    const sections = document.querySelectorAll(".panel");
    const currentIndex = 0;
    const wrap = gsap.utils.wrap(0, sections.length);

    let animating = false;

    const gotoSection = (index: number, direction: number) => {
      animating = true;
    };
  }, {});

  return (
    <div className="">
      <section className="h-screen flex w-full panel" id="hero">
        <WaterRippleSimulation />
      </section>
      <section className="pl-6 pr-6 pt-20 flex flex-col w-full h-screen panel">
        <div className="flex flex-col items-center justify-center mt-20">
          <p className="text-gray-300 font-mono font-medium text-lg mb-10">
            Delivered projects to 10+ clients using
          </p>
          <SkillsScroller />
        </div>
      </section>
      {/* work experience timeline */}
      <section className="pl-6 pr-6 pt-20 flex flex-col w-full h-screen panel">
        <div className="font-logo font-bold text-5xl leading-18 hero-text">
          Work // काम
        </div>
        <div></div>
      </section>
      <section className="pl-6 pr-6 pt-20 flex flex-col w-full h-screen panel">
        <div className="font-logo font-bold text-5xl leading-18 hero-text">
          Books I Love
        </div>
        <div></div>
      </section>
    </div>
  );
}
