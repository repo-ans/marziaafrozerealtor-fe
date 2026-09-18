import GuidePageTemplate from "@/components/guides/GuidePageTemplate";
import { guidePages } from "@/config/guidePages";

export const metadata = { title: "Open House Alerts | Marzia Afroze" };

export default function Page() {
  return <GuidePageTemplate content={guidePages["open-house-alerts"]} />;
}
