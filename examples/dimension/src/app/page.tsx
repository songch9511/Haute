import { Nav } from "@/components/dimension/nav";
import { Hero } from "@/components/dimension/hero";
import { Features } from "@/components/dimension/features";
import { Plugins } from "@/components/dimension/plugins";
import { Sync } from "@/components/dimension/sync";
import { Publish } from "@/components/dimension/publish";
import { Testimonials } from "@/components/dimension/testimonials";
import { Pricing } from "@/components/dimension/pricing";
import { CTA } from "@/components/dimension/cta";
import { Footer } from "@/components/dimension/footer";
import { FixedBar } from "@/components/dimension/fixed-bar";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <Plugins />
        <Sync />
        <Publish />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
      <FixedBar />
    </>
  );
}
