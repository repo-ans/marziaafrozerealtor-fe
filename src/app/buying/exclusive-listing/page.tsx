import GuidePageTemplate from "@/components/guides/GuidePageTemplate";
import { guidePages } from "@/config/guidePages";

export const metadata = { title: "Exclusive Listings | Marzia Afroze" };

export default function Page() {
  return <GuidePageTemplate content={guidePages["exclusive-listing"]} />;
}
