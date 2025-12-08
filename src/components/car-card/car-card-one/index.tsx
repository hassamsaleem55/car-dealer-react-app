import { memo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
// import { Heart } from "lucide-react";
import Button from "@elements-dir/button";
import { type Car } from "../car-card.types";
import TooltipText from "@components-dir/tooltip";
import { useDealerContext } from "@core-dir/dealer-provider";

function CarCard({ car, styles }: { car: Car; styles: any }) {
  const { dealerData } = useDealerContext();
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
    specs,
  } = car;

  // const handleSecondaryAction = () => {
  //   console.log(`Added to favorites ${stockId}: ${title}`);
  //   // Replace with wishlist logic or UI feedback
  // };

  const specOrder = ["Fuel", "Engine", "Mileage"];
  const visibleSpecs = specs
    .filter((s) => specOrder.includes(s.label))
    .sort((a, b) => specOrder.indexOf(a.label) - specOrder.indexOf(b.label));
  return (
    <div
      // onClick={() => {
      //   navigate(`/car-details?stockId=${stockId}`);
      // }}
      className={`${styles["car-card"]} group`}
    >
      {/* Image */}
      <div className={styles["car-card__image-wrapper"]}>
        <img
          src={profilePicture}
          alt={`${title}`}
          className={styles["car-card__img"]}
          loading="lazy"
          decoding="async"
        />
        {car.isReserved && (
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
            <div className={styles["car-card__price-estimated-block"]}>
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
            <div key={spec.label} className={styles["car-card__spec"]}>
              <span className={styles["car-card__spec-label"]}>
                {spec.label}
              </span>
              <span className={styles["car-card__spec-value"]}>
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay Actions */}
      <div
        className={`${styles["car-card__actions"]} opacity-0 group-hover:opacity-100`}
      >
        {dealerData.FCANumber && (
          <Button
            variant={car.isReserved ? "disabled" : "secondary"}
            btnText="Apply Finance"
            clickEvent={() => {
              navigate(
                `/car-details?stockId=${stockId}#codeweaver-finance-section`
              );
            }}
          />
        )}

        <Button
          variant={car.isReserved ? "disabled" : "secondary"}
          btnText="Reserve for £99"
          clickEvent={() => {
            setReservationModalOpen(true);
            setReservationCarData(car);
          }}
        />

        <Button
          variant="secondary"
          btnText="View Car"
          clickEvent={() => {
            navigate(`/car-details?stockId=${stockId}`);
          }}
        />
        {/* <div
          className={`${styles["view-car__buttons-wrapper"]} flex justify-between items-center`}
        >
          <div className={styles["view-car__button"]}>
            <Button
              variant="secondary"
              btnText="View Car"
              clickEvent={() => {
                navigate(`/car-details?stockId=${stockId}`);
              }}
            />
          </div>
          <div>
            <Button
              variant="secondary"
              btnIcon={<Heart className="w-4 h-4 sm:w-5 sm:h-5" />}
              clickEvent={handleSecondaryAction}
              paddingUtilities="p-3"
            />
          </div>
        </div> */}
      </div>

      <div className="flex flex-col gap-1 px-4 md:hidden">
        {dealerData.FCANumber && (
          <Button
            variant={car.isReserved ? "disabled-mobile" : "secondary"}
            btnText="Apply Finance"
            btnTextSize="text-xs"
            clickEvent={() => {
              navigate(
                `/car-details?stockId=${stockId}#codeweaver-finance-section`
              );
            }}
          />
        )}

        <Button
          variant={car.isReserved ? "disabled-mobile" : "secondary"}
          btnText="Reserve for £99"
          btnTextSize="text-xs"
          clickEvent={() => {
            setReservationModalOpen(true);
            setReservationCarData(car);
          }}
        />

        <Button
          variant="secondary"
          btnText="View Car"
          btnTextSize="text-xs"
          clickEvent={() => {
            navigate(`/car-details?stockId=${stockId}`);
          }}
        />

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

      {/* Footer */}
      <div className={styles["car-card__footer"]}>
        <span>Verified Dealer</span>
      </div>
    </div>
  );
}

export default memo(CarCard);
