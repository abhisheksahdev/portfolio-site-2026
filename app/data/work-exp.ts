export type Experience = {
  position: string;
  organisation: string;
  duration: string;
  description: Array<string>;
  techstack: Array<string>;
  logo: string;
};

export const experiences: Array<Experience> = [
  {
    position: "Software Engineer",
    organisation: "Taggle Innovations LLC",
    duration: "Dec 2024 - Feb 2025",
    description: [
      "Shipped 3 production websites — client, portal, and admin — from concept to launch in just 3 months.",
      "Aligned cross-functional teams around a cohesive, responsive design that scaled across all three platforms.",
    ],
    techstack: ["React", "NodeJS", "MongoDB", "Firebase"],
    logo: "company-logos/taggle.svg",
  },
  {
    position: "Full Stack Web Developer",
    organisation: "Blast Catering LLC",
    duration: "July 2024 - Dec 2024",
    description: [
      "Cut load times by 2x and boosted user engagement 60% through data-driven performance optimization.",
      "Slashed resource consumption 45% by moving key logic from client to server, lifting maintainability by 30%.",
    ],
    techstack: ["React", "TypeScript", "NodeJS", "MongoDB"],
    logo: "company-logos/blastcatering.svg",
  },
  {
    position: "Software Engineer",
    organisation: "Washon LLC",
    duration: "Sept 2022 - June 2024",
    description: [
      "Rebuilt the flagship Flutter/Dart app, doubling scalability and code quality across the board.",
      "Cut API response times in half by architecting BLoC state management with Dio integration.",
      "Slashed production crashes and lifted UX by 60% with Firebase Crashlytics and robust error handling.",
    ],
    techstack: ["Flutter", "Dart", "BLoC", "Firebase", "Dio"],
    logo: "company-logos/washon.svg",
  },
];
