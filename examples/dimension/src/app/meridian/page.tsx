import { MeridianNav } from "@/components/meridian/nav";
import { MeridianHero } from "@/components/meridian/hero";
import { MeridianProofStrip } from "@/components/meridian/proof-strip";
import { MeridianFeatures } from "@/components/meridian/features";
import { MeridianStats } from "@/components/meridian/stats";
import { MeridianHowItWorks } from "@/components/meridian/how-it-works";
import { MeridianPricing } from "@/components/meridian/pricing";
import { MeridianCta } from "@/components/meridian/cta";
import { MeridianFooter } from "@/components/meridian/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meridian — API Observability Platform",
  description:
    "See every request. Fix before users notice. Real-time API monitoring for engineering teams.",
};

export default function MeridianPage() {
  return (
    <main
      className="min-h-dvh"
      style={{
        backgroundColor: "#0a0a0a",
        color: "#f5f5f5",
        fontFamily: 'var(--font-geist-sans)',
      }}
    >
      <MeridianNav />
      <MeridianHero />
      <MeridianProofStrip />
      <MeridianFeatures />
      <MeridianStats />
      <MeridianHowItWorks />
      <MeridianPricing />
      <MeridianCta />
      <MeridianFooter />
    </main>
  );
}
