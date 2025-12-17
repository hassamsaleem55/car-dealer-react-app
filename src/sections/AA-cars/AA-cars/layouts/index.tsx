import React from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Car,
  FileCheck,
  Search,
  Star,
  Zap,
} from "lucide-react";
import MotionReveal from "@components-dir/framer-motion/motion-reveal";

// --- Types ---
interface BentoCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  colSpan?: string;
  highlight?: boolean;
}

interface StatProps {
  label: string;
  value: string;
}

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

const imagePath = "../images/AACars/";

// --- Components ---

const BentoCard = ({ title, desc, icon }: BentoCardProps) => (
  <div className="relative border-gray-200 bg-white hover:border-primary/30 hover:shadow-xl overflow-hidden rounded-xl md:rounded-2xl border-2 p-4 md:p-6 cursor-default group hover:bg-linear-to-br hover:from-primary/5 hover:via-white hover:to-white hover:border-primary/20 transition-all duration-300">
    <div className="relative mb-3 md:mb-4 z-10 flex flex-row h-full items-center gap-3 md:gap-4">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 text-primary border-gray-200 rounded-lg md:rounded-xl flex items-center justify-center border group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500 shrink-0">
        {icon}
      </div>
      <div className="flex justify-center">
        <h3 className="text-base md:text-lg lg:text-xl font-bold text-basicFont">
          {title}
        </h3>
      </div>
    </div>
    <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{desc}</p>
  </div>
);

const StatBadge = ({ label, value }: StatProps) => (
  <div className="flex flex-col items-center md:items-start gap-1">
    <span className="text-3xl md:text-5xl font-black bg-linear-to-r from-primary to-primary/70 leading-none bg-clip-text text-transparent">
      {value}
    </span>
    <span className="text-[10px] md:text-xs uppercase tracking-[1px] md:tracking-[2px] text-gray-500 font-bold">
      {label}
    </span>
  </div>
);

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => (
  <div className="mb-12 md:mb-16">
    <div className="flex items-center gap-2 mb-3">
      <span className="w-10 h-1 bg-primary rounded-full"></span>
      <span className="text-primary font-semibold text-sm uppercase tracking-widest">
        {subtitle}
      </span>
    </div>
    <h2 className="text-3xl md:text-4xl font-bold text-basicFont tracking-tight leading-tight">
      {title}
    </h2>
  </div>
);

// Icon mapping helper
const getIcon = (iconName: string, size = 24) => {
  const icons: Record<string, React.ReactNode> = {
    shield: <ShieldCheck size={size} />,
    check: <CheckCircle2 size={size} />,
    car: <Car size={size} />,
    file: <FileCheck size={size} />,
    search: <Search size={size} />,
    star: <Star size={size} />,
  };
  return icons[iconName] || <CheckCircle2 size={size} />;
};

// --- Main Layout ---

export default function AAOne() {
  // Extract dealer name from context
  const dealerName = "Motors Hub";

  // Extract hero data
  //   const hero = (restProps as any).hero || {};
  const badge = "AA Approved Dealer";
  const title = "Drive With Confidence";
  const subtitle = `At ${dealerName}, every vehicle meets the prestigious AA Cars Standards, ensuring quality, transparency, and complete peace of mind with every purchase.`;
  const stats = [
    { label: "HPI Checked", value: "100%" },
    { label: "Point Check", value: "128" },
    { label: "Warranty", value: "6+ mo" },
  ];

  // Extract standards data
  const standardsSubtitle = "The Gold Standard";
  const standardsTitle = "Performance & Peace of Mind";
  const cards = [
    {
      title: "6+ Month MOT Guarantee",
      desc: `Every vehicle at ${dealerName} includes minimum 6-month MOT certification for complete roadworthiness.`,
      icon: "file",
      featured: true,
    },
    {
      title: "128-Point Inspection",
      desc: "Each vehicle undergoes our comprehensive 128-point inspection by qualified technicians, covering every mechanical and safety aspect.",
      icon: "search",
    },
    {
      title: "Test Drive Welcome",
      desc: "Experience the quality firsthand. We encourage comprehensive test drives so you can feel confident in your purchase decision.",
      icon: "car",
    },
    {
      title: "Complete History Check",
      desc: "Full HPI checks, V5 registration documents, and service history provided wherever available. Total transparency guaranteed.",
      icon: "file",
    },
    {
      title: "Independent Inspection",
      desc: "Bring your own mechanic or inspection service. We welcome third-party verification because we have nothing to hide.",
      icon: "shield",
    },
    {
      title: "Warranty Protection",
      desc: "Comprehensive warranty coverage with flexible extensions. Your investment is fully protected.",
      icon: "check",
    },
  ];

  // Extract trust data
  const trustBadge = "TSI APPROVED CODE";
  const trustTitle = "Backed by UK Trading Standards";
  const content = [
    "The AA Cars Standards represent a comprehensive framework of quality assurance and consumer protection. These aren't optional guidelines—they're mandatory requirements.",
    `By partnering with AA Cars, ${dealerName} commits to rigorous standards covering vehicle quality, transparent descriptions, comprehensive inspections, and exceptional customer service throughout your buying journey.`,
  ];
  const benefits = [
    "Verified vehicle quality with comprehensive mechanical inspections",
    "Accurate descriptions with complete history and documentation checks",
    "Exceptional customer service with transparent pricing and no hidden fees",
  ];

  // Extract CTA data
  const ctaTitle = "Ready to Drive Excellence?";
  const ctaSubtitle = `Experience the confidence of buying from ${dealerName}, where every vehicle meets the prestigious AA Cars Standards for quality, safety, and complete peace of mind.`;
  const primaryButton = "View Showroom";
  const secondaryButton = "Contact Us";

  return (
    <>
      {/* <div className="min-h-screen bg-body font-urbanist text-basicFont"> */}

      {/* --- HERO SECTION --- */}
      <header className="relative w-full overflow-hidden bg-linear-to-br from-white via-primary/5 to-white">
        {/* <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 20% 50%, rgba(255,107,53,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,107,53,0.05) 0%, transparent 50%)",
          }}
        ></div> */}
        <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12 md:py-16 lg:py-20 grid md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
          {/* Left: Text Content */}
          <div className="md:col-span-12 lg:col-span-7 space-y-6 md:space-y-8">
            <MotionReveal preset="slideDown">
              <div className="inline-flex items-center gap-2 md:gap-2.5 px-4 md:px-5 py-2 md:py-2.5 rounded-full border-2 border-[#FFD302] bg-[#FFD302] backdrop-blur-sm text-[10px] md:text-xs font-bold uppercase tracking-[0.12em] md:tracking-[0.15em] shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/15 transition-all duration-300 hover:scale-105">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse shadow-sm shadow-primary/50"></span>
                {badge}
              </div>
            </MotionReveal>

            <MotionReveal preset="slideUp" delay={0.2}>
              <h1
                className="text-5xl lg:text-6xl font-black text-basicFont leading-[1.1] tracking-[-0.02em] mb-4 md:mb-6"
                style={{ textShadow: "0 2px 20px rgba(0,0,0,0.02)" }}
              >
                {title.split(" ").slice(0, 2).join(" ")} <br />
                <span className="text-primary relative bg-linear-to-r from-primary to-primary/90 inline-block bg-clip-text text-transparent">
                  {title.split(" ").slice(2).join(" ")}
                </span>
              </h1>
            </MotionReveal>

            <MotionReveal preset="fadeIn" delay={0.4}>
              <p className="text-base md:text-lg text-gray-600 max-w-xl leading-relaxed border-l-3 border-primary/60 pl-6">
                {subtitle}
              </p>
            </MotionReveal>

            <MotionReveal preset="slideUp" delay={0.6}>
              <div className="flex flex-row justify-between gap-6 md:gap-8 lg:gap-12 pt-4 md:pt-6">
                {stats.map((stat: any, i: number) => (
                  <StatBadge key={i} value={stat.value} label={stat.label} />
                ))}
              </div>
            </MotionReveal>
          </div>

          {/* Right: CTA Card */}

          <div className="md:col-span-12 lg:col-span-5 relative">
            <MotionReveal preset="slideLeft" delay={0.5}>
              <div
                className="absolute -inset-4 md:-inset-6 blur-2xl md:blur-3xl rounded-2xl md:rounded-3xl opacity-60"
                style={{
                  background:
                    "radial-gradient(circle at 30% 50%, rgba(255,107,53,0.15), transparent 70%)",
                }}
              ></div>
              <div className="relative bg-white w-full backdrop-blur-xl border-2 border-[#FFD302]/70 rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02] hover:border-[#FFD302] group overflow-hidden">
                <img
                  src={`${imagePath}aaCarSmall.jpg`}
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </MotionReveal>
          </div>
        </div>
      </header>

      {/* --- STANDARDS SECTION --- */}
      <section className="py-12 md:py-16 lg:py-20 container mx-auto px-4 md:px-6">
        <MotionReveal preset="slideUp">
          <SectionHeader subtitle={standardsSubtitle} title={standardsTitle} />
        </MotionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {cards.map((card: any, index: number) => (
            <MotionReveal key={index} preset="zoomIn" delay={index * 0.1}>
              <BentoCard
                title={card.title}
                desc={card.desc}
                icon={getIcon(card.icon)}
              />
            </MotionReveal>
          ))}
        </div>
      </section>

      {/* --- TRUST & AUTHORITY SECTION --- */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50 border-y border-gray-200 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <MotionReveal preset="slideUp">
              <div className="inline-block bg-[#FFD302] font-bold text-xs md:text-sm px-4 md:px-5 py-1.5 rounded-full">
                {trustBadge}
              </div>
            </MotionReveal>

            <MotionReveal preset="slideUp" delay={0.2}>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-basicFont">
                {trustTitle.split("by")[0].trim()} <br />
                <span className="text-primary">
                  {trustTitle.split("by")[1]?.trim()}
                </span>
              </h2>
            </MotionReveal>

            <MotionReveal preset="fadeIn" delay={0.4}>
              <div className="text-sm md:text-base lg:text-lg text-gray-700 space-y-3 md:space-y-4">
                {content.map((paragraph: string, i: number) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </MotionReveal>

            <MotionReveal preset="slideUp" delay={0.6}>
              <ul className="space-y-2 md:space-y-3 list-none p-0 m-0">
                {benefits.map((item: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 md:gap-3 bg-white p-3 md:p-4 rounded-lg md:rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="text-green-500 shrink-0">
                      <CheckCircle2
                        size={16}
                        className="md:w-[18px] md:h-[18px]"
                      />
                    </div>
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </MotionReveal>
          </div>

          {/* Visual Badge Card */}
          <MotionReveal preset="zoomIn" delay={0.5}>
            <div className="relative bg-[#FFD302] p-6 md:p-8 lg:p-12 rounded-lg text-center flex items-center justify-center flex-col gap-3 md:gap-4">
              <img
                src={`${imagePath}aa-standards.webp`}
                className="w-full max-w-[200px] md:max-w-[250px] lg:max-w-[300px] h-auto"
                alt="AA Standards"
              />
              <div className="w-full max-w-[200px] md:max-w-[250px] lg:max-w-[320px] h-px bg-black rounded-full"></div>
              <img
                src={`${imagePath}aa-standards-trading.webp`}
                className="w-full max-w-[200px] md:max-w-[250px] lg:max-w-[300px] h-auto"
                alt="Trading Standards"
              />
              <img
                src={`${imagePath}reassurance.webp`}
                className="w-full max-w-[180px] md:max-w-[220px] lg:max-w-[250px] h-auto"
                alt="Reassurance"
              />
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="py-12 md:py-16 lg:py-20 text-center container mx-auto px-4 md:px-6">
        <MotionReveal preset="zoomIn">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-basicFont mb-4 md:mb-6">
            {ctaTitle.split("Excellence")[0].trim()}{" "}
            <span className="text-primary">Excellence?</span>
          </h2>
        </MotionReveal>

        <MotionReveal preset="fadeIn" delay={0.2}>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8 md:mb-10 text-sm md:text-base lg:text-lg px-4">
            {ctaSubtitle}
          </p>
        </MotionReveal>

        <MotionReveal preset="slideUp" delay={0.4}>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <button className="bg-primary hover:bg-primary/90 text-white font-bold uppercase py-3 md:py-4 px-6 md:px-8 lg:px-10 rounded-full transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base">
              <Car size={18} className="md:w-5 md:h-5" /> {primaryButton}
            </button>
            <button className="bg-white border-2 border-gray-300 text-basicFont hover:border-primary hover:text-primary font-bold uppercase py-3 md:py-4 px-6 md:px-8 lg:px-10 rounded-full transition-all flex items-center justify-center gap-2 text-sm md:text-base">
              <Zap size={18} className="md:w-5 md:h-5" /> {secondaryButton}
            </button>
          </div>
        </MotionReveal>
      </section>
      {/* </div> */}
    </>
  );
}
