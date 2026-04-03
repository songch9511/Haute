import { CometNav } from "@/components/comet/nav";
import { CometHero } from "@/components/comet/hero";
import { CometProblem } from "@/components/comet/problem";
import { CometSolution } from "@/components/comet/solution";
import { CometArchitecture } from "@/components/comet/architecture";
import { CometUseCases } from "@/components/comet/use-cases";
import { CometCTA } from "@/components/comet/cta";
import { CometFooter } from "@/components/comet/footer";

export default function CometPage() {
  return (
    <div className="bg-[#0a0a0a] text-white overflow-x-clip">
      <CometNav />
      <main>
        <CometHero />
        <CometProblem />
        <CometSolution />
        <CometArchitecture />
        <CometUseCases />
        <CometCTA />
      </main>
      <CometFooter />
    </div>
  );
}
