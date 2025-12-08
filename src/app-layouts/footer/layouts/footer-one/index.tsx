import {
  FilePen,
  CirclePercent,
  CirclePoundSterling,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Button from "@elements-dir/button";
import { Link } from "react-router-dom";
import { useDealerContext } from "@core-dir/dealer-provider";
import { getCompanyOpeningHours } from "@core-dir/helpers/CompanyInfoProcessor";
import type { DealerPageKeys } from "@types-dir/dealer-props";

export default function Footer({ styles }: { styles: any }) {
  const { dealerConfig, dealerData } = useDealerContext();

  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer__container"]}>
        {/* --- Company Info --- */}
        <div className={styles["footer__col"]}>
          <h3 className={styles["footer__title"]}>{dealerData?.CompanyName}</h3>
          <p className={styles["footer__desc"]}>
            {dealerConfig?.dealer.description}
          </p>

          <p
            className={`${styles["footer__desc"]} flex flex-col text-xs md:text-sm`}
          >
            <span className="flex gap-2 items-center">
              <FilePen size={16} />
              Company No: {dealerData?.CompanyNumber}
            </span>
            <span className="flex gap-2 items-center">
              <CirclePercent size={16} />
              VAT No: {dealerData?.VATNumber}
            </span>
            <span className="flex gap-2 items-center">
              <CirclePoundSterling size={16} />
              FCA No: {dealerData?.FCANumber}
            </span>
          </p>

          {/* --- Social Links --- */}
          <div className={styles["footer__social"]}>
            {Object.entries(dealerData?.SocialMediaInfo || {}).map(
              ([platform, url]) => {
                if (!url || typeof url !== "string") return null; // skip empty links

                let iconSrc = "";
                if (platform === "Facebook") {
                  iconSrc = "/images/social/facebook.png";
                } else if (platform === "Instagram") {
                  iconSrc = "/images/social/instagram.png";
                } else if (platform === "LinkedIn") {
                  iconSrc = "/images/social/linkedin.png";
                } else if (platform === "YouTube") {
                  iconSrc = "/images/social/youtube.png";
                } else if (platform === "Twitter") {
                  iconSrc = "/images/social/twitter.png";
                } else {
                  return null; // skip unknown platforms
                }

                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles["footer__social-link"]}
                    aria-label={platform}
                  >
                    <img
                      src={iconSrc}
                      alt={platform}
                      className={styles["footer__social-icon"]}
                    />
                  </a>
                );
              }
            )}
          </div>
        </div>

        {/* --- Quick Links --- */}
        <div className={styles["footer__col"]}>
          <h4 className={styles["footer__subtitle"]}>Quick Links</h4>
          <ul className={styles["footer__links"]}>
            {dealerConfig.pages.map(
              (page: DealerPageKeys) =>
                page.showInNavbar && (
                  <li
                    key={page.pageName}
                    className={styles["footer__link-item"]}
                  >
                    <Link
                      to={page.path || "#"}
                      className={styles["footer__link"]}
                    >
                      {page.label}
                    </Link>
                  </li>
                )
            )}
          </ul>
        </div>

        {/* --- Opening Hours --- */}
        <div className={styles["footer__col"]}>
          <h4 className={styles["footer__subtitle"]}>Opening Hours</h4>
          <ul className={styles["footer__hours"]}>
            {Object.entries(
              getCompanyOpeningHours(dealerData?.Schedules || [])
            ).map(([day, hours]) => (
              <li key={day} className={styles["footer__hour-item"]}>
                <span>{day}:</span>
                <span>{hours}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles["footer__col"]}>
          <div className="flex flex-col gap-10">
            <div className={styles["footer__contact"]}>
              <h4 className={styles["footer__subtitle"]}>
                Contact Information
              </h4>
              <p className={styles["footer__contact-item"]}>
                <MapPin size={16} />{" "}
                {`${dealerData?.Address1}, ${dealerData?.City}, ${dealerData?.Country}`}
              </p>
              <p className={styles["footer__contact-item"]}>
                <Phone size={16} />{" "}
                <a href={`tel:${dealerData?.ContactInfo?.PhoneNumber}`}>
                  {dealerData?.ContactInfo?.PhoneNumber}
                </a>
              </p>
              <p className={styles["footer__contact-item"]}>
                <Mail size={16} />{" "}
                <a href={`mailto:${dealerData?.ContactInfo?.InfoEmailAddress}`}>
                  Email us
                </a>
              </p>
            </div>
            <div>
              {/* --- Newsletter --- */}
              <h4 className={`${styles["footer__subtitle"]} mb-1.5!`}>
                Join Our Newsletter
              </h4>
              <p className={styles["footer__desc-sm"]}>
                Subscribe for the latest car deals, promotions, and news.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className={styles["footer__newsletter-form"]}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={styles["footer__input"]}
                  required
                />
                <Button
                  variant="secondary"
                  btnText="Subscribe"
                  btnTextSize="text-xs"
                  roundUtilities="rounded-lg"
                  paddingUtilities="px-6 py-2"
                  widthUtilities="w-auto"
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Bottom Bar ===== */}
      <div className={styles["footer__bottom"]}>
        <div className={styles["footer__bottom-container"]}>
          <p className="flex flex-col md:flex-row gap-2 justify-center items-center">
            © {new Date().getFullYear()} {dealerData?.CompanyName}. All rights
            reserved.{" "}
            <a
              className="w-fit text-black bg-neutral-300 text-xs rounded-full flex items-center gap-1 px-1 py-0.5 pr-2"
              href="https://dealershub.co.uk/"
              target="_blank"
            >
              <svg
                className="size-6"
                width="90"
                height="90"
                viewBox="0 0 90 90"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="90" height="90" rx="45" fill="bg-neutral-300"></rect>
                <path
                  d="M39.9554 65.5844L20 30.4317V76H49.1436L50.2203 75.9277L51.5842 75.8192L53.6658 75.4214L55.1733 75.0597L56.573 74.6257L58.2599 74.0471L60.1262 73.2514L62.4233 72.0941L64.2896 70.9369L66.3713 69.4179L53.5941 47.2124L44.6213 52.7095L51.9431 65.5844H39.9554Z"
                  fill="black"
                ></path>
                <path
                  d="M48.4257 38.0264L39.453 43.5959L33.9616 34.0121L29.6188 26.3812L24.8453 17.9546L22.5842 13.9765L22.0099 13L49.3589 13.0362L51.2252 13.2532L53.5941 13.651L55.7834 14.1935L58.0446 14.9529L60.9158 16.1825L63.2488 17.4845L65.4022 18.9673L67.4839 20.6309L68.9913 22.0775L70.7141 23.8858L72.7958 26.6343L74.1955 28.8766L75.5235 31.589L76.7079 34.8077L77.0668 36.0735L77.4616 37.8817L77.7129 39.2922L77.8564 40.341L78 41.5706V46.7422L77.8564 48.6952L77.6411 50.1056L77.354 51.6607L76.9233 53.3967L76.3849 55.1326L75.8106 56.6877L74.9851 58.6045L73.6213 61.0999L52.2661 23.4879H40.1349L48.4257 38.0264Z"
                  fill="black"
                ></path>
              </svg>
              Dealers Hub
            </a>
          </p>
          {dealerData.FCANumber && (
            <p className="text-center max-w-xl leading-relaxed">
              {`${dealerData.CompanyName} is authorised and regulated by the
            Financial Conduct Authority (FCA) under registration number
            ${dealerData.FCANumber}. We operate as a credit broker, not a lender.
            When we introduce you to a lender, we may receive a commission –
            this may be a fixed fee or a percentage of the amount borrowed.
            Different lenders may offer different commission rates.`}
            </p>
          )}
          <div className={styles["footer__policies"]}>
            <Link to="/privacy-policy" className={styles["footer__policy-link"]}>
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className={styles["footer__policy-link"]}>
              Terms of Service
            </Link>
            <Link to="/contact" className={styles["footer__policy-link"]}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
