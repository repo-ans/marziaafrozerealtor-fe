import Hero from "@/components/home/Hero";
import ProvenResultsSection from "@/components/home/ProvenResultsSection";
import SmarterWaySection from "@/components/home/SmarterWaySection";
import ContactSplitSection from "@/components/home/ContactSplitSection";
import FeaturedRow from "@/components/home/FeaturedRow";
import SearchByCitySection from "@/components/home/SearchByCitySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FaqHomeSection from "@/components/home/FaqHomeSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <>
      <Hero />
      <ProvenResultsSection />
      <SmarterWaySection />
      <ContactSplitSection />
      <FeaturedRow
        source="mine"
        eyebrow="Home Selection"
        title="Some Beautiful Homes I Have on Hand"
        subtitle="A selection of beautiful homes I have on hand, offering great guidance for sellers who wants the best price."
        viewAllHref="/my-listings"
      />
      <FeaturedRow
        source="office"
        eyebrow={siteConfig.brokerage}
        title="Explore Dream Valley Realty Listings"
        subtitle="Browse active listings from every agent at Dream Valley Realty across the Greater Toronto Area."
        viewAllHref="/office-listings"
        dark
      />
      <SearchByCitySection />
      <TestimonialsSection />
      <FaqHomeSection />
      <FinalCtaSection />
    </>
  );
}
