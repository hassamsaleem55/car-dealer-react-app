import type { DealerSectionProps } from "@types-dir/dealer-props";
import PagesContentOne from "../layouts";

export function PagesContentLeft({ props }: { props: DealerSectionProps }) {
  return (
    <PagesContentOne
      heading={props.heading || ""}
      paragraphs={props.paragraphs || []}
      points={props.points}
      mediaLinks={
        props.mediaLinks !== undefined
          ? props.mediaLinks
          : { type: "image", urls: [] }
      }
      variantType="left"
    />
  );
}

export function PagesContentRight({ props }: { props: DealerSectionProps }) {
  return (
    <PagesContentOne
      heading={props.heading || ""}
      paragraphs={props.paragraphs || []}
      points={props.points}
      mediaLinks={
        props.mediaLinks !== undefined
          ? props.mediaLinks
          : { type: "image", urls: [] }
      }
      variantType="right"
    />
  );
}
