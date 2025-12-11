import { useEffect } from "react";

// export default function useCarGurusBadge() {
export default function useCarGurusBadge() {
  useEffect(() => {
    // Prevent duplicate script loading
    // if (!window.CarGurusScriptLoaded) {
      window.CarGurusScriptLoaded = true;

      const CarGurus = window.CarGurus || {};
      window.CarGurus = CarGurus;
      CarGurus.DealRatingBadge = CarGurus.DealRatingBadge || {};
      CarGurus.DealRatingBadge.options = {
        style: "STYLE1",
        minRating: "FAIR_PRICE",
        defaultHeight: "40",
      };

      const script = document.createElement("script");
      script.src =
        "https://static.cargurus.com/js/api/en_GB/1.0/dealratingbadge.js";
      script.async = true;

      // script.onload = function () {
      //   setTimeout(() => {
      //     processCarGurusBadges();
      //   }, 2000);
      // };

      script.onerror = function () {
        console.error("Failed to load CarGurus script");
      };

      document.body.appendChild(script);
    // } 
    // else {
    //   // Script already loaded → reprocess badges
    //   setTimeout(() => processCarGurusBadges(), 2000);
    // }
  }, []);
}

// --------------------------------
// PROCESS FUNCTION (same as yours)
// --------------------------------
// let isProcessed = false;
// function processCarGurusBadges() {
//   const carGurusSpans = document.querySelectorAll(".carGurusPriceText");
//   console.log("Processing CarGurus badges...", carGurusSpans.length);

//   carGurusSpans.forEach(function (span) {
//     const vrn = span.getAttribute("data-cg-vrn");
//     if (!vrn) return;

//     const container = span.closest(".carGuruContainer") as HTMLElement | null;
//     if (!container) return;
    
//     const badgeElement = span.querySelector(".cg-dealrating-badge");
    
//     // Search within the container to get the correct price display element for THIS specific car
//     const custommSpan = container.querySelector(`.cg-price-${vrn}`) as HTMLElement;

//     if (badgeElement && span instanceof HTMLElement) {
//       span.style.display = "none";
//       isProcessed = true;

//       const img = badgeElement.querySelector("img");
//       let dealRating = "No Analysis";

//       if (img) {
//         const imgSrc = img.getAttribute("src") || "";
//         if (imgSrc.includes("excellent")) dealRating = "Excellent";
//         else if (imgSrc.includes("great")) dealRating = "Great";
//         else if (imgSrc.includes("good")) dealRating = "Good";
//         else if (imgSrc.includes("fair")) dealRating = "Fair";
//         else if (imgSrc.includes("high") || imgSrc.includes("overpriced"))
//           dealRating = "High";
//       }

//       if (dealRating !== "No Analysis" && dealRating !== "High") {
//         if (custommSpan) {
//           custommSpan.innerText = `${dealRating} Price`;
//         }
//         if (container) {
//           const priceTag = container.querySelector(".carGuruPricetag") as HTMLElement;
//           if (priceTag) {
//             priceTag.style.display = "flex";
//             priceTag.style.flexDirection = "column";
//           }
//         }
//       }
//       // Keep container hidden for invalid ratings
//     }
//   });

//   if (!isProcessed) {
//     setTimeout(processCarGurusBadges, 3000);
//   }
// }
