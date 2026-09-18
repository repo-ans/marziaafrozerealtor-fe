import GuidePageTemplate from "@/components/guides/GuidePageTemplate";
import { guidePages } from "@/config/guidePages";

export const metadata = { title: "Buyer's Guide | Marzia Afroze" };

export default function Page() {
  return <GuidePageTemplate content={guidePages["buyers-guide"]} />;
}
