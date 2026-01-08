import { useState } from "react";
import { Plus } from "lucide-react";
import SectionLayoutOne from "@app-layout-dir/sections/section-layout-one";
import MotionReveal from "@components-dir/framer-motion/motion-reveal";
import { faqs } from "@core-dir/services/Faqs.service";
import SectionStyles from "@app-layout-dir/sections/section-layout-one/css/centered.module.css";

export default function FaqOne({
  heading,
  styles,
}: {
  heading: string;
  styles: any;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) =>
    setOpenIndex((prev) => (prev === index ? null : index));

  return (
    <SectionLayoutOne
      headingText={heading}
      styles={SectionStyles}
    >
      <div className={styles["faqs-container"]}>
        {faqs.slice(0, 5).map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <MotionReveal
              key={index}
              delay={index * 0.15}
              className={styles["faq-wrapper"]}
            >
              <button
                onClick={() => toggleFAQ(index)}
                aria-expanded={isOpen}
                className={`${styles["faq-header"]} group`}
              >
                <span>{faq.question}</span>

                <div className={`${styles["faq-icon__wrapper"]}`}>
                  <Plus
                    className={`${styles["faq-icon"]} ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </div>
              </button>

              <div
                className={`${styles["faq-answer-wrapper"]} ${
                  isOpen ? `${styles["open"]}` : `${styles["closed"]}`
                }`}
              >
                <div className={styles["faq-answer"]}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            </MotionReveal>
          );
        })}
      </div>
    </SectionLayoutOne>
  );
}
