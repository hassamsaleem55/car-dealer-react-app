import  { type ReactNode } from "react";

export type SwiperBreakpoints = Record<
  number,
  {
    slidesPerView: number;
    spaceBetween: number;
  }
>;

export interface SwiperComponentProps {
  data: any[];
  speed: number;
  autoplay: {
    delay?: number;
    pauseOnMouseEnter?: boolean;
    disableOnInteraction?: boolean;
  };
  breakpoints: SwiperBreakpoints;
  className: string;
  renderItem: (item: any, index: number) => ReactNode;
}
