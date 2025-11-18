import { motion } from "framer-motion";

export default function PagesHeroOne({
  title,
  heading,
  subHeading,
}: {
  title: string;
  heading: string;
  subHeading: string;
}) {
  return (
    <section className="relative w-full bg-linear-to-r from-primary/50 to-transparent rounded-b-xl py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* === Section Title === */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl sm:text-6xl font-extrabold mb-16"
        >
          {title}
        </motion.h1>

        {/* === Content Grid === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-start">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-semibold leading-snug relative"
          >
            {heading}
            <span className="absolute -bottom-2 left-0 w-24 h-1 bg-primary rounded-full"></span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg leading-relaxed"
          >
            {subHeading}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
