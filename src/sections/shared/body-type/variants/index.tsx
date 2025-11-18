import BodyTypeOne from "../layouts/BodyTypeOne";

export function BodyTypeDefault({ props }: any) {
  return <BodyTypeOne heading={props.heading || ""} />;
}
