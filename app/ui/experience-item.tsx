import Image from "next/image";
import { Experience } from "../data/work-exp";

type ExperienceItemProps = {
  exp: Experience;
};

export default function ExperienceItem({ exp }: ExperienceItemProps) {
  return (
    <section className="w-screen p-4 rounded-xl border border-[##242424] mr-40 ">
      <div className="flex items-start justify-between">
        <div className="mb-2">
          <p className="text-lg">{exp.position}</p>
          <p className="text-sm">{exp.organisation}</p>
          <Image src={exp.logo} alt="logo" width={20} height={20} />
        </div>
      </div>

      {exp.description.map((item, i) => (
        <div key={i} className="flex text-sm">
          <div>1. </div>
          <p>{item}</p>
        </div>
      ))}
    </section>
  );
}
