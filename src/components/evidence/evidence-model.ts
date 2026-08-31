import { capabilities } from "@/content";

export const evidenceNodes = capabilities.map((capability, index) => {
  const angle = (Math.PI * 2 * index) / capabilities.length - Math.PI / 2;
  return {
    ...capability,
    x: 50 + Math.cos(angle) * 39,
    y: 50 + Math.sin(angle) * 39,
  };
});
