// import { ChevronRight, MoveUpRight } from "lucide-react";
import { ChevronRight } from "lucide-react";

export default function SectionLayoutOne({
  headingText,
  headingLink,
  subHeadingText,
  children,
  styles,
}: {
  headingText: string;
  headingLink?: { text: string; link: string };
  subHeadingText?: string;
  children: React.ReactNode;
  styles: any;
}) {
  return (
    <section className={styles["section__wrapper"]}>
      <div className={styles["section__container"]}>
        <div className={styles["section__header"]}>
          <h2 className={styles["section__heading-text"]}>
            {headingText}
            {subHeadingText && (
              <p className={styles["section__subheading-text"]}>
                {subHeadingText}
              </p>
            )}
          </h2>

          {headingLink && (
            <a
              href={headingLink.link}
              className={styles["section__heading-link"]}
            >
              {headingLink.text}
              <ChevronRight className="size-4" />
            </a>
          )}
        </div>

        <div className={styles["section__body"]}>{children}</div>
      </div>
    </section>
  );
}
