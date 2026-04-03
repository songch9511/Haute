import Nav from "@/components/notion/nav";
import Hero from "@/components/notion/hero";
import LogoWall from "@/components/notion/logo-wall";
import Quote from "@/components/notion/quote";
import Carousel from "@/components/notion/carousel";
import BentoGrid from "@/components/notion/bento-grid";
import Calculator from "@/components/notion/calculator";
import FeaturedTestimonial from "@/components/notion/featured-testimonial";
import Testimonials from "@/components/notion/testimonials";
import StatsRow from "@/components/notion/stats-row";
import UseCases from "@/components/notion/use-cases";
import Footer from "@/components/notion/footer";

export default function NotionPage() {
  return (
    <div
      className="bg-white text-[rgba(0,0,0,0.9)] overflow-x-clip"
      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
    >
      <Nav />
      <main>
        <Hero />
        <LogoWall />
        <Quote />
        <Carousel />
        <BentoGrid />
        <Calculator />
        <FeaturedTestimonial />
        <Testimonials />
        <StatsRow />
        <UseCases />
      </main>
      <Footer />
    </div>
  );
}
