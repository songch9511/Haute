import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { Features } from "@/components/sections/features";
import { Stats } from "@/components/sections/stats";
import { Testimonial } from "@/components/sections/testimonial";
import { CTA } from "@/components/sections/cta";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <Stats />
        <Testimonial />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
