import type { IconType } from "react-icons";
import { FaJava } from "react-icons/fa6";
import {
  SiApachemaven, SiCplusplus, SiDocker, SiGit, SiGithub, SiGitlab, SiJavascript, SiLinux,
  SiMongodb, SiMysql, SiNextdotjs, SiPostgresql, SiPython, SiReact, SiSpringboot,
  SiSpringsecurity, SiSqlite, SiSupabase, SiTailwindcss, SiTypescript, SiVuedotjs,
} from "react-icons/si";

const map: Record<string, IconType> = {
  "java": FaJava,
  "java 21": FaJava,
  "javascript": SiJavascript,
  "python": SiPython,
  "c++": SiCplusplus,
  "typescript": SiTypescript,
  "spring boot": SiSpringboot,
  "spring security": SiSpringsecurity,
  "vue.js": SiVuedotjs,
  "react": SiReact,
  "react native": SiReact,
  "next.js": SiNextdotjs,
  "tailwind css": SiTailwindcss,
  "postgresql": SiPostgresql,
  "mongodb": SiMongodb,
  "mysql": SiMysql,
  "sqlite": SiSqlite,
  "supabase": SiSupabase,
  "docker": SiDocker,
  "git": SiGit,
  "github": SiGithub,
  "gitlab": SiGitlab,
  "maven": SiApachemaven,
  "linux": SiLinux,
};

export function techIcon(name: string): IconType | undefined {
  return map[name.trim().toLowerCase()];
}