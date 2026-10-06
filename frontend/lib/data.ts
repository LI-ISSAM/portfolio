import type { IconType } from "react-icons";
import { LuGitBranch, LuLayoutDashboard, LuServer } from "react-icons/lu";

export const profile = {
  name: "Issam Litimi",
  email: "litimi.dev@gmail.com",
  phone: "+212 621-574618",
  github: "https://github.com/LI-ISSAM",
  linkedin: "https://www.linkedin.com/in/issam-litimi-179854199/",
  whatsapp: "https://wa.me/212621574618",
};

export const capabilityIcons: IconType[] = [LuServer, LuLayoutDashboard, LuGitBranch];

// Même ordre que `skills.groups` dans les dictionnaires
export const skillItems: string[][] = [
  ["Java", "JavaScript", "Python", "C++", "SQL", "PL/SQL"],
  ["Spring Boot", "REST API", "JDBC", "Microservices","Kafka"],
  ["Vue.js", "React", "React Native", "Next.js", "HTML/CSS"],
  ["PostgreSQL", "MongoDB", "MySQL", "SQLite"],
  ["Docker", "Git", "GitHub", "GitLab", "Maven", "Linux"],
];