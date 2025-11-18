import { useEffect } from "react";
import { useDealerContext } from "@core-dir/dealer-provider";

export default function MetaManager() {
  const { dealerData } = useDealerContext();

  useEffect(() => {
    if (!dealerData) return;

    // --- Update page title ---
    document.title = dealerData.CompanyName || "Dealers Hub";

    // --- Update favicon dynamically ---
    const favicon = document.querySelector(
      "link[rel='icon']"
    ) as HTMLLinkElement;
    if (favicon) {
      favicon.href = dealerData.LogoUrl || "/vite.svg";
    } else {
      const newFavicon = document.createElement("link");
      newFavicon.rel = "icon";
      newFavicon.href = dealerData.LogoUrl || "/vite.svg";
      document.head.appendChild(newFavicon);
    }

    // --- Update google font dynamically ---
    const existingFont = document.getElementById("dealer-font");
    if (existingFont) existingFont.remove();

    const link = document.createElement("link");
    link.id = "dealer-font";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap";

    document.head.appendChild(link);
  }, []);

  return null;
}
