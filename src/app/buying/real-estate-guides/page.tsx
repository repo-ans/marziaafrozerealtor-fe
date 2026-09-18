import GuidePageTemplate from "@/components/guides/GuidePageTemplate";
import { guidePages } from "@/config/guidePages";

export const metadata = { title: "Real Estate Guides | Marzia Afroze" };

export default function Page() {
  return <GuidePageTemplate content={guidePages["real-estate-guides"]} />;
}
