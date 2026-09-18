import GuidePageTemplate from "@/components/guides/GuidePageTemplate";
import { guidePages } from "@/config/guidePages";

export const metadata = { title: "RRSP Home Buyers' Plan | Marzia Afroze" };

export default function Page() {
  return <GuidePageTemplate content={guidePages["rrsp-home-buyers-plan"]} />;
}
