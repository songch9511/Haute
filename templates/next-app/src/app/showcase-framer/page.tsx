import { FramerNav } from "@/components/framer/nav";
import { FramerHero } from "@/components/framer/hero";
import { FramerLogoBar } from "@/components/framer/logo-bar";
import { FramerFeatures } from "@/components/framer/features";
import { FramerCMSDemo } from "@/components/framer/cms-demo";
import { FramerPortfolio } from "@/components/framer/portfolio";
import { FramerShowcase } from "@/components/framer/showcase";
import { FramerNews } from "@/components/framer/news";
import { FramerAnalytics } from "@/components/framer/analytics";
import { FramerTestimonials } from "@/components/framer/testimonials";
import { FramerExperts } from "@/components/framer/experts";
import { FramerCommunity } from "@/components/framer/community";
import { FramerCTA } from "@/components/framer/cta";
import { FramerFooter } from "@/components/framer/footer";

export default function ShowcaseFramer() {
  return (
    <div className="bg-[#0a0a0a] text-white">
      <FramerNav />
      <main>
        <FramerHero />
        <FramerLogoBar />
        <FramerFeatures />
        <FramerShowcase />
        <FramerCMSDemo />
        <FramerPortfolio />
        <FramerNews />
        <FramerAnalytics />
        <FramerTestimonials />
        <FramerExperts />
        <FramerCommunity />
        <FramerCTA />
      </main>
      <FramerFooter />
    </div>
  );
}
