import { projects, systemCapabilities, type Project, type ProjectSlug } from "@/content";

export type MapNode = {
  id: string;
  label: string;
  kind: "project" | "capability";
  x: number;
  y: number;
  projectSlug?: ProjectSlug;
};

const projectPositions = [
  [47, 15],
  [68, 34],
  [56, 62],
  [31, 68],
  [24, 34],
] as const;

const capabilityPositions = [
  [7, 13], [30, 8], [73, 9], [91, 19], [91, 48], [84, 76],
  [65, 88], [40, 91], [16, 82], [7, 61], [45, 42], [78, 58],
] as const;

export const mapNodes: readonly MapNode[] = [
  ...projects.map((project, index) => ({
    id: project.slug,
    label: project.mapLabel,
    kind: "project" as const,
    x: projectPositions[index]?.[0] ?? 50,
    y: projectPositions[index]?.[1] ?? 50,
    projectSlug: project.slug,
  })),
  ...systemCapabilities.map((capability, index) => ({
    id: capability.toLowerCase(),
    label: capability,
    kind: "capability" as const,
    x: capabilityPositions[index]?.[0] ?? 50,
    y: capabilityPositions[index]?.[1] ?? 50,
  })),
];

export const mapEdges = projects.flatMap((project) =>
  project.capabilities.map((capability) => ({
    id: `${project.slug}-${capability.toLowerCase()}`,
    projectSlug: project.slug,
    capability,
  })),
);

export function isProjectConnected(project: Project, capability: string) {
  return project.capabilities.includes(capability);
}
