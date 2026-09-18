import GuidePageTemplate from "@/components/guides/GuidePageTemplate";
import { guidePages } from "@/config/guidePages";

export const metadata = { title: "Home Worth | Marzia Afroze" };

export default function Page() {
  return <GuidePageTemplate content={guidePages["home-worth"]} />;
}
