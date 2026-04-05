import { UdNav } from "@/components/udesigner/nav";
import { UdHero } from "@/components/udesigner/hero";
import { UdProof } from "@/components/udesigner/proof";
import { UdPillars } from "@/components/udesigner/pillars";
import { UdHowItWorks } from "@/components/udesigner/how-it-works";
import { UdBenchmark } from "@/components/udesigner/benchmark";
import { UdInstall } from "@/components/udesigner/install";
import { UdFooter } from "@/components/udesigner/footer";

export const metadata = {
  title: "UDesigner — Stop shipping AI slop",
  description:
    "A design harness that writes taste into the model and catches what the model still gets wrong. Memory you can query, verify you can trust.",
};

export default function UdesignerPage() {
  return (
    <div className="bg-[#0a0a0a] text-[#f5f5f5] min-h-screen font-[family-name:var(--font-geist-sans)]">
      <UdNav />
      <main>
        <UdHero />
        <UdProof />
        <UdPillars />
        <UdHowItWorks />
        <UdBenchmark />
        <UdInstall />
      </main>
      <UdFooter />
    </div>
  );
}
