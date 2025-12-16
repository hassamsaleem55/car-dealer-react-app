import { memo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
// import { Heart } from "lucide-react";
import Button from "@elements-dir/button";
import { type Car } from "../car-card.types";
import TooltipText from "@components-dir/tooltip";
import { useDealerContext } from "@core-dir/dealer-provider";
import { AutoTraderLogo, CarGuruLogo } from "@core-dir/svgs";

const isValidRating = (rating: string | undefined): boolean => {
  if (!rating) return false;

  const invalidRatings = ["null", "high", "noanalysis", ""];
  return !invalidRatings.includes(rating.toLowerCase());
};

function CarCard({ car, styles }: { car: Car; styles: any }) {
  const { dealerConfig, dealerData } = useDealerContext();
  const { setReservationModalOpen, setReservationCarData } = useOutletContext<{
    setReservationModalOpen: (qs: boolean) => void;
    setReservationCarData: (data: Car) => void;
  }>();
  const navigate = useNavigate();
  const {
    stockId,
    title,
    derivative,
    year,
    retailPrice,
    pricePerMonth,
    profilePicture,
    isReserved,
    autoTraderRating,
    carGuruRating,
    specs,
  } = car;

  const hasAutoTraderRating = isValidRating(autoTraderRating);
  const hasCarGuruRating =
    dealerConfig.dealer.isCarGuruRatingEnabled && isValidRating(carGuruRating);
  const showRatingFooter = hasAutoTraderRating || hasCarGuruRating;

  // const handleSecondaryAction = () => {
  //   console.log(`Added to favorites ${stockId}: ${title}`);
  //   // Replace with wishlist logic or UI feedback
  // };

  const specOrder = ["Fuel", "Transmission", "Mileage"];
  const visibleSpecs = specs
    .filter((s) => specOrder.includes(s.key))
    .sort((a, b) => specOrder.indexOf(a.key) - specOrder.indexOf(b.key));
  return (
    <div className={`${styles["car-card"]} group`}>
      {/* Image */}
      <div className={styles["car-card__image-wrapper"]}>
        <img
          src={profilePicture}
          alt={`${title}`}
          className={styles["car-card__img"]}
          loading="lazy"
          decoding="async"
        />
        {isReserved && (
          <div className={styles["car-card__reserved"]}>Reserved</div>
        )}
        <div className={styles["car-card__year"]}>{year}</div>
      </div>

      {/* Content */}
      <div className={styles["car-card__content"]}>
        <div>
          <TooltipText text={title} className={styles["car-card__title"]} />
          {derivative && (
            <TooltipText
              text={`${derivative}`}
              className={styles["car-card__subtitle"]}
            />
          )}
        </div>

        <div className={styles["car-card__price-wrapper"]}>
          {pricePerMonth && (
            <div
              onClick={() => {
                navigate(
                  `/car-details?stockId=${stockId}#codeweaver-finance-section`
                );
              }}
              className={styles["car-card__price-estimated-block"]}
            >
              <p className={styles["car-card__price-estimated"]}>
                {pricePerMonth}
              </p>
              <p className={styles["car-card__price-note"]}>per month</p>
            </div>
          )}
          <div className={styles["car-card__price-total-block"]}>
            <p className={styles["car-card__price-total"]}>{retailPrice}</p>
            <p className={styles["car-card__price-note"]}>Total</p>
          </div>
        </div>

        <div className={styles["car-card__specs"]}>
          {visibleSpecs.map((spec) => (
            <div key={spec.key} className={styles["car-card__spec"]}>
              <span className={styles["car-card__spec-label"]}>
                {spec.icon}
              </span>
              <span className={styles["car-card__spec-value"]}>
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay Actions - Desktop Only */}
      <div className="hidden md:block">
        <div
          className={`${styles["car-card__actions"]} opacity-0 group-hover:opacity-100`}
        >
          <Button
            variant="secondary"
            btnText="View Car"
            clickEvent={() => {
              navigate(`/car-details?stockId=${stockId}`);
            }}
          />

          <Button
            variant={isReserved ? "disabled" : "secondary"}
            btnText="Reserve for £99"
            clickEvent={() => {
              setReservationModalOpen(true);
              setReservationCarData(car);
            }}
          />

          {dealerData.FCANumber && (
            <Button
              variant={isReserved ? "disabled" : "secondary"}
              btnText="Apply Finance"
              clickEvent={() => {
                navigate(
                  `/car-details?stockId=${stockId}#codeweaver-finance-section`
                );
              }}
            />
          )}
        </div>
      </div>

      {/* Mobile Actions */}
      <div className="flex flex-col gap-2 px-4 md:hidden">
        <Button
          variant="secondary"
          btnText="View Car"
          btnTextSize="text-sm"
          paddingUtilities="px-3 py-2"
          clickEvent={() => {
            navigate(`/car-details?stockId=${stockId}`);
          }}
        />

        <Button
          variant={isReserved ? "disabled-mobile" : "secondary"}
          btnText="Reserve for £99"
          btnTextSize="text-sm"
          paddingUtilities="px-3 py-2"
          clickEvent={() => {
            setReservationModalOpen(true);
            setReservationCarData(car);
          }}
        />

        {dealerData.FCANumber && (
          <Button
            variant={isReserved ? "disabled-mobile" : "secondary"}
            btnText="Apply Finance"
            btnTextSize="text-sm"
            paddingUtilities="px-3 py-2"
            clickEvent={() => {
              navigate(
                `/car-details?stockId=${stockId}#codeweaver-finance-section`
              );
            }}
          />
        )}

        {/* <div className="flex gap-1 justify-between items-center">
          <div className="grow">
            <Button
              variant="secondary"
              btnText="View Car"
              btnTextSize="text-xs"
              clickEvent={() => {
                navigate(`/car-details?stockId=${stockId}`);
              }}
            />
          </div>
          <div>
            <Button
              variant="secondary"
              btnTextSize="text-xs"
              btnIcon={<Heart className="w-4 h-4 sm:w-5 sm:h-5" />}
              clickEvent={handleSecondaryAction}
              paddingUtilities="p-2"
              roundUtilities="rounded-full"
            />
          </div>
        </div> */}
      </div>

      {/* Footer - Price Ratings */}
      {showRatingFooter && (
        <div className={styles["car-card__footer"]}>
          <div
            className={`flex flex-row items-center w-full ${
              hasAutoTraderRating && hasCarGuruRating
                ? "justify-between"
                : "justify-center"
            }`}
          >
            {hasAutoTraderRating && (
              <div className="flex flex-col items-start">
                <span className="text-sm text-primary font-bold capitalize">
                  {autoTraderRating} Price
                </span>
                <AutoTraderLogo className="w-14" />
              </div>
            )}

            {hasCarGuruRating && (
              <div className="flex flex-col items-end">
                <span className="text-sm text-primary font-bold capitalize">
                  {carGuruRating} Price
                </span>
                <CarGuruLogo className="w-14" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(CarCard);
