import { Mail, MapPin, Phone } from "lucide-react";
import Button from "@elements-dir/button";
// import { getNavbarLinks } from "@app-layout-dir/navbar/navbar.service";
import { Link } from "react-router-dom";
import { useDealerContext } from "@core-dir/dealer-provider";
import { getCompanyOpeningHours } from "@core-dir/helpers/CompanyInfoProcessor";
import { useEffect, useState } from "react";
import type { DealerPageKeys } from "@types-dir/dealer-props";

export default function Footer({ styles }: { styles: any }) {
  const { dealerConfig, dealerData } = useDealerContext();
  const [openingHours, setOpeningHours] = useState<{ [key: string]: string }>(
    {}
  );
  const [socialLinks, setSocialLinks] = useState<{ [key: string]: string }>({});
  // const NavbarLinks = getNavbarLinks();

  useEffect(() => {
    setOpeningHours(getCompanyOpeningHours(dealerData?.Schedules || []));
    setSocialLinks(dealerData?.SocialMediaInfo || {});
  }, []);

  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer__container"]}>
        {/* --- Company Info --- */}
        <div className={styles["footer__col"]}>
          <h3 className={styles["footer__title"]}>{dealerData?.CompanyName}</h3>
          <p className={styles["footer__desc"]}>
            {dealerConfig?.dealer.description}
          </p>

          <div className={styles["footer__contact"]}>
            <p className={styles["footer__contact-item"]}>
              <MapPin size={16} /> {dealerData?.FullAddress}
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
                {dealerData?.ContactInfo?.InfoEmailAddress}
              </a>
            </p>
          </div>

          {/* --- Social Links --- */}
          <div className={styles["footer__social"]}>
            {Object.entries(socialLinks).map(([platform, url]) => {
              if (!url) return null; // skip empty links

              let iconSrc = "";
              if (platform === "Facebook") {
                iconSrc = "/images/social/facebook.png";
              } else if (platform === "Instagram") {
                iconSrc = "/images/social/instagram.png";
              } else if (platform === "LinkedIn") {
                iconSrc = "/images/social/LinkedIn.png";
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
            })}
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
            {Object.entries(openingHours).map(([day, hours]) => (
              <li key={day} className={styles["footer__hour-item"]}>
                <span>{day}:</span>
                <span>{hours}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* --- Newsletter --- */}
        <div className={styles["footer__col"]}>
          <h4 className={styles["footer__subtitle"]}>Join Our Newsletter</h4>
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
              btnTextSize="text-sm"
              roundUtilities="rounded-lg"
              paddingUtilities="px-5 py-2"
              widthUtilities="w-24"
            />
          </form>
        </div>
      </div>

      {/* ===== Bottom Bar ===== */}
      <div className={styles["footer__bottom"]}>
        <div className={styles["footer__bottom-container"]}>
          <p>
            © {new Date().getFullYear()} {dealerData?.CompanyName}. All rights
            reserved.
          </p>
          <div className={styles["footer__policies"]}>
            <a href="#" className={styles["footer__policy-link"]}>
              Privacy Policy
            </a>
            <a href="#" className={styles["footer__policy-link"]}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
