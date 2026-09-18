import GuidePageTemplate from "@/components/guides/GuidePageTemplate";
import { guidePages } from "@/config/guidePages";

export const metadata = { title: "Mortgage For Your Home | Marzia Afroze" };

export default function Page() {
  return <GuidePageTemplate content={guidePages["mortgage-for-your-home"]} />;
}
