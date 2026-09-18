import GuidePageTemplate from "@/components/guides/GuidePageTemplate";
import { guidePages } from "@/config/guidePages";

export const metadata = { title: "Price Drop Alerts | Marzia Afroze" };

export default function Page() {
  return <GuidePageTemplate content={guidePages["price-drop-alerts"]} />;
}
