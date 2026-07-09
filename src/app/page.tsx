import dynamic from "next/dynamic";

import { CampaignGrid } from "@/features/campaigns/components/campaign-grid";
import { Footer } from "@/features/navigation/components/footer";
import { Header } from "@/features/navigation/components/header";
import { HeroSection } from "@/features/showcase/components/hero-section";
import { EcosystemSection } from "@/features/showcase/components/ecosystem-section";
import { SupportBand } from "@/features/support/components/support-band";

const ProductExplorer = dynamic(() =>
  import("@/features/products/components/product-explorer").then((module) => module.ProductExplorer),
);

const BuildConfigurator = dynamic(() =>
  import("@/features/configurator/components/build-configurator").then(
    (module) => module.BuildConfigurator,
  ),
);

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CampaignGrid />
        <ProductExplorer />
        <BuildConfigurator />
        <EcosystemSection />
        <SupportBand />
      </main>
      <Footer />
    </>
  );
}
