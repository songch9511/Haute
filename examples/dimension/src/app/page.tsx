import { Nav } from "@/components/dimension/nav";
import { Hero } from "@/components/dimension/hero";
import { FixedBar } from "@/components/dimension/fixed-bar";
import { FeatureShowcase } from "@/components/dimension/feature-showcase";
import { FeatureCards } from "@/components/dimension/feature-cards";
import { Comparison } from "@/components/dimension/comparison";
import { StartBuilding } from "@/components/dimension/start-building";
import { Trust } from "@/components/dimension/trust";
import { Community } from "@/components/dimension/community";
import { Footer } from "@/components/dimension/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <FeatureShowcase />
        <FeatureCards />
        <Comparison />
        <StartBuilding />
        <Trust />
        <Community />
      </main>
      <Footer />
      <FixedBar />
    </>
  );
}
