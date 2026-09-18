import GuidePageTemplate from "@/components/guides/GuidePageTemplate";
import { guidePages } from "@/config/guidePages";

export const metadata = { title: "First-Time Buyers | Marzia Afroze" };

export default function Page() {
  return <GuidePageTemplate content={guidePages["first-time-buyers"]} />;
}
