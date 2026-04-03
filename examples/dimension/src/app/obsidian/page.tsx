import { ObsidianNav } from "@/components/obsidian/nav";
import { ObsidianHero } from "@/components/obsidian/hero";
import { ObsidianFeatures } from "@/components/obsidian/features";
import { ObsidianPlugins } from "@/components/obsidian/plugins";
import { ObsidianSync } from "@/components/obsidian/sync";
import { ObsidianPublish } from "@/components/obsidian/publish";
import { ObsidianTestimonials } from "@/components/obsidian/testimonials";
import { ObsidianPricing } from "@/components/obsidian/pricing";
import { ObsidianCTA } from "@/components/obsidian/cta";
import { ObsidianFooter } from "@/components/obsidian/footer";

export default function ObsidianPage() {
  return (
    <div
      className="bg-[#1e1e1e] text-[#dadada] overflow-x-clip"
      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
    >
      <ObsidianNav />
      <main>
        <ObsidianHero />
        <ObsidianFeatures />
        <ObsidianPlugins />
        <ObsidianSync />
        <ObsidianPublish />
        <ObsidianTestimonials />
        <ObsidianPricing />
        <ObsidianCTA />
      </main>
      <ObsidianFooter />
    </div>
  );
}
