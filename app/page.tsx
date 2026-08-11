"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { SplitText } from "gsap/SplitText";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import SkillsScroller from "./components/SkillsScroller/page";
import WaterRippleSimulation from "./components/RippleSimulation/page";
import { Observer } from "gsap/Observer";
import { experiences } from "./data/work-exp";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Home() {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer);

    const texts = gsap.utils.toArray(".hero-text");

    const sections = gsap.utils.toArray(".expContainer section");

    // texts.forEach((text) => {
    //   const split = new SplitText(text as string, {
    //     type: "lines, chars, words",
    //     autoSplit: true,
    //     smartWrap: true,
    //     mask: "words",
    //   });

    //   gsap.from(split.words, {
    //     scrollTrigger: {
    //       trigger: text as string,
    //       start: "top 94%",
    //       toggleActions: "restart none none none",
    //     },
    //     opacity: 0,
    //     y: 50,
    //     duration: 0.8,
    //     stagger: 0.1,
    //     mask: "words",
    //   });
    // });

    const scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".work-section",
        pin: true,
        scrub: 1,
        end: "+=3000",
      },
    });
  }, {});

  return (
    <div>
      <section className="h-screen flex w-full" id="hero">
        <WaterRippleSimulation />
      </section>
      <section className="pl-6 pr-6 pt-20 flex flex-col w-full h-screen">
        <div className="flex flex-col items-center justify-center mt-20">
          <p className="text-gray-300 font-mono font-medium text-lg mb-10">
            Delivered projects to 10+ clients using
          </p>
          <SkillsScroller />
        </div>
      </section>
      {/* work experience timeline */}
      <section className="pl-6 pr-6 pt-20 flex flex-col w-full h-screen overflow-x-hidden work-section">
        <div className="font-logo font-bold text-5xl leading-18 hero-text">
          Work // काम
        </div>
        <div className="w-[300vh] flex expContainer">
          {experiences.map((exp, i) => (
            <section className="w-[100vh]" key={i}>
              <div className="flex">
                <p>{exp.position}</p>
                <p> {exp.organisation}</p>
              </div>
              {exp.description.map((item, i) => (
                <div key={i}>
                  <p>{item}</p>
                </div>
              ))}
            </section>
          ))}
        </div>
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
