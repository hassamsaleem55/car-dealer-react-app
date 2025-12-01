import { formatDate } from "@core-dir/helpers/DateTimeProcessor";
export function processTestimonialData(rawData: any[]): any[] {
  return rawData.map((item) => ({
    customerName: item.customerName,
    review: item.review,
    rating: item.rating,
    reviewDate: formatDate(item.reviewDate),
  }));
}
