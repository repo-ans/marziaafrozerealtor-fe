import GuidePageTemplate from "@/components/guides/GuidePageTemplate";
import { guidePages } from "@/config/guidePages";

export const metadata = { title: "GST/HST New Housing Rebate | Marzia Afroze" };

export default function Page() {
  return <GuidePageTemplate content={guidePages["gst-hst-new-housing-rebate"]} />;
}
