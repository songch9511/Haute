import { SolaNav } from "@/components/sola/nav";
import { SolaHero } from "@/components/sola/hero";
import { SolaPhilosophy } from "@/components/sola/philosophy";
import { SolaProducts } from "@/components/sola/products";
import { SolaLifestyle } from "@/components/sola/lifestyle";
import { SolaIngredients } from "@/components/sola/ingredients";
import { SolaTestimonials } from "@/components/sola/testimonials";
import { SolaCta } from "@/components/sola/cta";
import { SolaFooter } from "@/components/sola/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sola — Minimal Skincare",
  description: "Thoughtful formulas. Nothing extra. Skincare that respects your skin and the earth.",
};

export default function SolaPage() {
  return (
    <main
      className="min-h-dvh"
      style={{
        backgroundColor: "#faf6f0",
        color: "#2c2420",
        fontFamily: "var(--font-geist-sans)",
      }}
    >
      <SolaNav />
      <SolaHero />
      <SolaPhilosophy />
      <SolaProducts />
      <SolaLifestyle />
      <SolaIngredients />
      <SolaTestimonials />
      <SolaCta />
      <SolaFooter />
    </main>
  );
}
