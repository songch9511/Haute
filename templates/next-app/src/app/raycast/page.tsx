import { RaycastNav } from "@/components/raycast/nav";
import { RaycastHero } from "@/components/raycast/hero";
import { RaycastExtensions } from "@/components/raycast/extensions";
import { RaycastAIFeatures } from "@/components/raycast/ai-features";
import { RaycastBuiltInFeatures } from "@/components/raycast/built-in-features";
import { RaycastTestimonials } from "@/components/raycast/testimonials";
import { RaycastDevelopers } from "@/components/raycast/developers";
import { RaycastCommunity } from "@/components/raycast/community";
import { RaycastCTA } from "@/components/raycast/cta";
import { RaycastFooter } from "@/components/raycast/footer";

export const metadata = {
  title: "Raycast — Your shortcut to everything",
  description:
    "A collection of powerful productivity tools all within an extendable launcher application.",
};

export default function RaycastPage() {
  return (
    <>
      <RaycastNav />
      <main>
        <RaycastHero />
        <RaycastExtensions />
        <RaycastAIFeatures />
        <RaycastBuiltInFeatures />
        <RaycastTestimonials />
        <RaycastDevelopers />
        <RaycastCommunity />
        <RaycastCTA />
      </main>
      <RaycastFooter />
    </>
  );
}
