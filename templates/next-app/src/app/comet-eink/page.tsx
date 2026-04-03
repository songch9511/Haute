import { EinkNav } from "@/components/comet-eink/nav";
import { EinkHero } from "@/components/comet-eink/hero";
import { EinkProblem } from "@/components/comet-eink/problem";
import { EinkSolution } from "@/components/comet-eink/solution";
import { EinkArchitecture } from "@/components/comet-eink/architecture";
import { EinkUseCases } from "@/components/comet-eink/use-cases";
import { EinkCTA } from "@/components/comet-eink/cta";
import { EinkFooter } from "@/components/comet-eink/footer";

export default function CometEinkPage() {
  return (
    <div className="bg-[#f5f1eb] text-[#1a1815] overflow-x-clip" style={{ fontFamily: "var(--font-sans)" }}>
      <EinkNav />
      <main>
        <EinkHero />
        <EinkProblem />
        <EinkSolution />
        <EinkArchitecture />
        <EinkUseCases />
        <EinkCTA />
      </main>
      <EinkFooter />
    </div>
  );
}
