export type Project = {
  id: number;
  title: string;
  category: string | null;
  description: string;
  highlights: string[];
  stack: string;
  githubUrl: string | null;
  demoUrl: string | null;
  image: string | null;
};

const API_URL = process.env.API_URL ?? "http://localhost:8080";

export async function getProjects(lang: string): Promise<Project[]> {
  const res = await fetch(`${API_URL}/api/projects?lang=${lang}`, {
     cache: "no-store",
     signal: AbortSignal.timeout(8000),
    });
  if (!res.ok) {
    throw new Error(`Erreur API : ${res.status}`);
  }
  return res.json();
}