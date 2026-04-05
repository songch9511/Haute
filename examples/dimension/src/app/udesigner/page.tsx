import { UdNav } from "@/components/udesigner/nav";
import { UdHero } from "@/components/udesigner/hero";
import { UdProof } from "@/components/udesigner/proof";
import { UdPillars } from "@/components/udesigner/pillars";
import { UdHowItWorks } from "@/components/udesigner/how-it-works";
import { UdBenchmark } from "@/components/udesigner/benchmark";
import { UdInstall } from "@/components/udesigner/install";
import { UdFooter } from "@/components/udesigner/footer";

export const metadata = {
  title: "UDesigner — A design agent with the eye of an oracle",
  description:
    "A high-agency design harness that writes taste into the model and catches what the model still gets wrong. Memory you can query, verify you can trust.",
};

export default function UdesignerPage() {
  return (
    <div className="bg-[#faf6ea] text-[#120e08] min-h-screen font-[family-name:var(--font-geist-sans)] antialiased">
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
