import type { Metadata } from "next";
import { ResumeDocument } from "@/components/resume/resume-document";

export const metadata: Metadata = { title: "Resume", alternates: { canonical: "/resume" } };

export default function ResumePage() {
  return <ResumeDocument />;
}
