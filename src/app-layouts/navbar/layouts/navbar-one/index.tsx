import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import { Menu, Phone, Mail } from "lucide-react";
import { Menu } from "lucide-react";
import Button from "@elements-dir/button";
import { useDealerContext } from "@core-dir/dealer-provider";
import type { DealerPageKeys } from "@types-dir/dealer-props";

export default function index({ styles }: { styles: any }) {
  const { dealerConfig, dealerData } = useDealerContext();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  // const [phoneNumber, setPhoneNumer] = useState<string>("");
  // const [emailAddress, setEmailAddress] = useState<string>("");
  const [logoUrl, setLogoUrl] = useState<string>("");
  const menuRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  // handle scroll with React's onScroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll(); // initialize on mount

    // Use React's passive event handling
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle click outside with React event handling
  // const handleClickOutside = useCallback((e: React.MouseEvent) => {
  //   const target = e.target as Node;
  //   if (
  //     open &&
  //     menuRef.current &&
  //     !menuRef.current.contains(target) &&
  //     btnRef.current &&
  //     !btnRef.current.contains(target)
  //   ) {
  //     close();
  //   }
  // }, [open, close]);

  useEffect(() => {
    if (open) {
      const handleDocumentClick = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          menuRef.current &&
          !menuRef.current.contains(target) &&
          btnRef.current &&
          !btnRef.current.contains(target)
        ) {
          close();
        }
      };
      document.addEventListener("mousedown", handleDocumentClick);
      return () =>
        document.removeEventListener("mousedown", handleDocumentClick);
    }
  }, [open, close]);

  // Handle escape key with React event handling
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    if (open) {
      const handleEscapeKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") close();
      };
      document.addEventListener("keydown", handleEscapeKey);
      return () => document.removeEventListener("keydown", handleEscapeKey);
    }
  }, [open, close]);

  // Handle window resize with React event handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        close();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [close]);

  useEffect(() => {
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
      {/* <div
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
      </div> */}

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
              page.showInNavbar &&
              page.pageName !== "contact" &&
              !(page.pageName === "finance" && !dealerData.FCANumber) && (
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
          <Link to="/contact">
            <Button variant="secondary" btnText="Contact Us" />
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button
            ref={btnRef}
            onClick={toggle}
            onKeyDown={handleKeyDown}
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
            onKeyDown={handleKeyDown}
          >
            <div className="px-4 py-3">
              <ul className={styles["navbar-mobile__menu-panel"]}>
                {dealerConfig.pages.map(
                  (page: DealerPageKeys) =>
                    page.showInNavbar &&
                    page.pageName !== "contact" &&
                    !(page.pageName === "finance" && dealerData.FCANumber) && (
                      <li key={page.pageName}>
                        <Link
                          to={page.path || "#"}
                          onClick={close}
                          className={`${styles["navbar-mobile__link"]} 
                  ${location.pathname === page.path ? styles["active"] : ""}
                `}
                          role="menuitem"
                          aria-haspopup={!!page.hasSubmenu}
                          aria-expanded={openSubMenu === page.pageName}
                        >
                          {page.label}
                        </Link>
                        {/* <a
                          href={page.path || "#"}
                          onClick={close}
                          className={styles["navbar-mobile__link"]}
                          role="menuitem"
                        >
                          {page.label}
                        </a> */}
                      </li>
                    )
                )}
                <Link
                  to="/contact"
                  onClick={close}
                  className={`${styles["navbar-mobile__link"]} 
                  ${location.pathname === "/contact" ? styles["active"] : ""}
                `}
                >
                  Contact Us
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
