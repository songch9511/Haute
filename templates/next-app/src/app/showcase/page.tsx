import { ShowcaseHero } from "@/components/showcase/hero";
import { WorkGrid } from "@/components/showcase/work-grid";
import { HorizontalGallery } from "@/components/showcase/horizontal-gallery";
import { ServiceTabs } from "@/components/showcase/service-tabs";
import { ShowcaseStats } from "@/components/showcase/stats";
import { ShowcaseContact } from "@/components/showcase/contact";
import { ShowcaseNav } from "@/components/showcase/nav";
import { ShowcaseFooter } from "@/components/showcase/footer";

export default function Showcase() {
  return (
    <>
      <ShowcaseNav />
      <main>
        <ShowcaseHero />
        <WorkGrid />
        <HorizontalGallery />
        <ServiceTabs />
        <ShowcaseStats />
        <ShowcaseContact />
      </main>
      <ShowcaseFooter />
    </>
  );
}
