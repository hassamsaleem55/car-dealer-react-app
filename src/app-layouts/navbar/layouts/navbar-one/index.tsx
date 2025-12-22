import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Button from "@elements-dir/button";
import { useDealerContext } from "@core-dir/dealer-provider";
import type { BaseDealerPage } from "@types-dir/dealer-props";

export default function index({ styles }: { styles: any }) {
  const { dealerConfig, dealerData } = useDealerContext();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  // Close menu on scroll
  useEffect(() => {
    if (open) {
      const handleScroll = () => {
        close();
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [open, close]);

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
            (page: BaseDealerPage) =>
              page.showInNavbar &&
              page.pageName !== "contact" &&
              !(page.pageName === "finance" && !dealerData.FCANumber) && (
                <li key={page.pageName} className={styles["menu-item"]}>
                  <Link
                    to={page.path || "#"}
                    className={`${styles["navbar-link"]} 
                  ${location.pathname === page.path ? styles["active"] : ""}
                `}
                  >
                    {page.label}
                  </Link>
                </li>
              )
          )}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/contact">
            <Button variant="secondary" btnTextSize="text-base" roundUtilities="rounded-xl" btnText="Contact Us" />
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
            <div className="relative w-[18px] h-[18px]">
              <Menu
                size={18}
                className={`absolute inset-0 transition-all duration-200 ${
                  open
                    ? "rotate-90 opacity-0 scale-0"
                    : "rotate-0 opacity-100 scale-100"
                }`}
              />
              <X
                size={18}
                className={`absolute inset-0 transition-all duration-200 ${
                  open
                    ? "rotate-0 opacity-100 scale-100"
                    : "-rotate-90 opacity-0 scale-0"
                }`}
              />
            </div>
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
            <ul className={styles["navbar-mobile__menu-panel"]}>
              {dealerConfig.pages.map(
                (page: BaseDealerPage) =>
                  page.showInNavbar &&
                  page.pageName !== "contact" &&
                  !(page.pageName === "finance" && !dealerData.FCANumber) && (
                    <li key={page.pageName}>
                      <Link
                        to={page.path || "#"}
                        onClick={close}
                        className={`${styles["navbar-mobile__link"]} ${
                          location.pathname === page.path
                            ? styles["active"]
                            : ""
                        }`}
                      >
                        {page.label}
                      </Link>
                    </li>
                  )
              )}
              <li>
                <Link
                  to="/contact"
                  onClick={close}
                  className={`${styles["navbar-mobile__link"]} ${
                    location.pathname === "/contact" ? styles["active"] : ""
                  }`}
                  role="menuitem"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
