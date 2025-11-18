import type { DealerSectionProps } from "@types-dir/dealer-props";
import WarrantyPlansOne from "../layouts";

export function WarrantyPlansDefault({ props }: { props: DealerSectionProps }) {
  return <WarrantyPlansOne plans={props.warrantyPlans || []} />;
}
