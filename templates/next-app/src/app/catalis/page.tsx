import { CatalisNavbar } from "@/components/catalis/navbar";
import { CatalisHero } from "@/components/catalis/hero";
import { CatalisAbout } from "@/components/catalis/about";
import { CatalisBenefits } from "@/components/catalis/benefits";
import { CatalisFeatures } from "@/components/catalis/features";
import { CatalisCoreFeatures } from "@/components/catalis/core-features";
import { CatalisPricing } from "@/components/catalis/pricing";
import { CatalisTestimonials } from "@/components/catalis/testimonials";
import { CatalisBlog } from "@/components/catalis/blog";
import { CatalisCTA } from "@/components/catalis/cta";
import { CatalisFooter } from "@/components/catalis/footer";

export const metadata = {
  title: "Kova — Financial Analytics Platform",
  description:
    "Build clarity into every financial decision. Real-time analytics, automated reporting, and secure transaction monitoring.",
};

export default function CatalisPage() {
  return (
    <div className="catalis-theme font-[family-name:var(--font-roboto)] bg-[#fafafa] text-[#131313]">
      <CatalisNavbar />
      <CatalisHero />
      <CatalisAbout />
      <CatalisBenefits />
      <CatalisFeatures />
      <CatalisCoreFeatures />
      <CatalisPricing />
      <CatalisTestimonials />
      <CatalisBlog />
      <CatalisCTA />
      <CatalisFooter />
    </div>
  );
}
