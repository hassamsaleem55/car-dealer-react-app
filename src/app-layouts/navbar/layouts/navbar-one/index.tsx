import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Phone, Mail } from "lucide-react";
import Button from "@elements-dir/button";
import { useDealerContext } from "@core-dir/dealer-provider";
import type { DealerPageKeys } from "@types-dir/dealer-props";

export default function index({ styles }: { styles: any }) {
  const { dealerConfig, dealerData } = useDealerContext();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [phoneNumber, setPhoneNumer] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [logoUrl, setLogoUrl] = useState<string>("");
  const menuRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  // handle scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll(); // initialize on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(target) &&
        btnRef.current &&
        !btnRef.current.contains(target)
      ) {
        close();
      }
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [open, close]);

  // close on ESC
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [close]);

  // close on resize >= md
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) close();
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [close]);

  useEffect(() => {
    setPhoneNumer(dealerData?.ContactInfo?.PhoneNumber || "");
    setEmailAddress(dealerData?.ContactInfo?.InfoEmailAddress || "");
    setLogoUrl(dealerData?.LogoUrl);
  }, []);

  return (
    <header
      className={
        location.pathname === "/"
          ? `${styles["header-wrapper"]} ${styles["home"]}`
          : styles["header-wrapper"]
      }
    >
      {/* Top Bar */}
      <div
        className={`${styles["topbar"]}
        ${
          location.pathname === "/"
            ? scrolled
              ? styles["scrolled"]
              : ""
            : styles["scrolled"]
        }`}
      >
        <div className={styles["topbar-container"]}>
          <div className={styles["topbar-left"]}>
            <span className="flex items-center gap-1">
              <Phone size={14} />{" "}
              <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
            </span>
            <span className="flex items-center gap-1">
              <Mail size={14} />{" "}
              <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
            </span>
          </div>

          <div className={styles["topbar-right"]}>
            <a href="#">Buying</a>
            <a href="#">Selling</a>
            <a href="#">Login</a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`${styles["navbar"]} ${
          location.pathname === "/"
            ? scrolled
              ? styles["scrolled"]
              : ""
            : styles["scrolled"]
        }`}
      >
        {logoUrl && (
          <Link to="/" className={styles["navbar-logo"]}>
            <img src={logoUrl} alt="Logo" />
          </Link>
        )}

        <ul
          className={styles["navbar-links"]}
          role="menubar"
          aria-label="Main navigation"
        >
          {dealerConfig.pages.map(
            (page: DealerPageKeys) =>
              page.showInNavbar && (
                <li
                  key={page.pageName}
                  className={styles["menu-item"]}
                  role="none"
                  onMouseEnter={() =>
                    page.hasSubmenu && setOpenSubMenu(page.pageName)
                  }
                  onMouseLeave={() => page.hasSubmenu && setOpenSubMenu(null)}
                >
                  <Link
                    to={page.path || "#"}
                    className={`${styles["navbar-link"]} 
                  ${location.pathname === page.path ? styles["active"] : ""}
                `}
                    role="menuitem"
                    aria-haspopup={!!page.hasSubmenu}
                    aria-expanded={openSubMenu === page.pageName}
                  >
                    {page.label}
                  </Link>

                  {/* --- SUBMENU --- */}
                  {page.hasSubmenu && openSubMenu === page.pageName && (
                    <ul
                      className={styles["submenu"]}
                      role="menu"
                      aria-label={`${page.label} submenu`}
                    >
                      {page.submenuItems?.map((sub: any, idx) => (
                        <li key={idx} role="none">
                          <Link
                            to={sub.path}
                            className={styles["submenu-link"]}
                            role="menuitem"
                          >
                            {sub.subMenuText}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
          )}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="secondary" btnText="Contact Us" />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button
            ref={btnRef}
            onClick={toggle}
            className={styles["navbar-mobile__btn"]}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            type="button"
          >
            <Menu size={18} />
          </button>

          <div
            id="mobile-menu"
            ref={menuRef}
            className={`${styles["navbar-mobile__menu"]} ${
              open ? styles["opened-menu"] : styles["closed-menu"]
            }`}
            role="menu"
            aria-hidden={!open}
          >
            <div className="px-4 py-3">
              <ul className={styles["navbar-mobile__menu-panel"]}>
                {dealerConfig.pages.map(
                  (page: DealerPageKeys) =>
                    page.showInNavbar && (
                      <li key={page.pageName}>
                        <a
                          href={page.path || "#"}
                          onClick={close}
                          className={styles["navbar-mobile__link"]}
                          role="menuitem"
                        >
                          {page.label}
                        </a>
                      </li>
                    )
                )}
                <li>
                  <Button
                    variant="secondary"
                    btnText="Contact Us"
                    clickEvent={close}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
