import Link from "next/link";
import { LoanProcessEngine } from "@/components/work/loan-process-engine";
import { MafeStory } from "@/components/work/mafe-story";
import { OrderFlowEngine } from "@/components/work/order-flow-engine";

export function ProofOfWorkSection() {
  return (
    <section className="chapter proof-section" id="work" aria-labelledby="proof-title">
      <header className="chapter-header">
        <div>
          <p className="chapter-label">03 / PROOF OF WORK</p>
          <h2 id="proof-title">The workflow<br />is the product.</h2>
        </div>
        <p>
          Two process files show the same operating method from different domains:
          understand the actors, expose the lifecycle, then make the system usable.
        </p>
      </header>
      <MafeStory />
      <OrderFlowEngine />
      <div className="case-jump"><span>CASE FILE / MAFE BENTO</span><Link href="/work/mafe-bento">OPEN FULL CASE ↗</Link></div>
      <LoanProcessEngine />
      <div className="case-jump"><span>CASE FILE / LOAN RANGER</span><Link href="/work/loan-ranger">OPEN FULL CASE ↗</Link></div>
    </section>
  );
}
