export type Experience = {
  position: string;
  organisation: string;
  duration: string;
  description: Array<string>;
  techstack: Array<string>;
  color: string;
};

export const experiences: Array<Experience> = [
  {
    position: "Software Engineer",
    organisation: "Taggle Innovations LLC",
    duration: "Dec 2024 - Feb 2025",
    description: [
      "Developed client, portal, and admin websites from concept to launch within a 3-month period, ensuring a cohesive and responsive design.",
      "Collaborated with cross-functional teams to align website functionality with business goals and user needs.",
    ],
    techstack: ["React", "NodeJS", "MongoDB", "Firebase"],
    color: "#FF5733",
  },
  {
    position: "Full Stack Web Developer",
    organisation: "Blast Catering LLC",
    duration: "July 2024 - Dec 2024",
    description: [
      "Optimized the customer-facing website by analyzing user analytics and enhancing key features, achieving up to 2x faster load times and a 60% improvement in user engagement.",
      "Improved code quality and application efficiency by implementing best practices and shifting processing from client-side to server-side, reducing resource consumption by 45% and increasing maintainability by 30%.",
    ],
    techstack: ["React", "TypeScript", "NodeJS", "MongoDB"],
    color: "#FFC300",
  },
  {
    position: "Software Engineer",
    organisation: "Washon LLC",
    duration: "Sept 2022 - June 2024",
    description: [
      "Revamped client application using Flutter/Dart, enhancing organization, scalability, and code quality by 2x.",
      "Implemented the BLoC pattern and integrated Dio for API call management, reducing response times by 50%.",
      "Minimized production crashes and optimized error handling with Flutter Bloc and Firebase (Crashlytics, Messaging), boosting user experience by 60%.",
    ],
    techstack: ["Flutter", "Dart", "BLoC", "Firebase", "Dio"],
    color: "#DAF7A6",
  },
];
