import MotionReveal from "@components-dir/framer-motion/motion-reveal";
import {
  Users,
  Award,
  Car,
  TrendingUp,
  Headphones,
  Building2,
} from "lucide-react";

export default function TrustAlba() {
  const stats = [
    {
      number: "10,000+",
      label: "Happy Customers",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: "15+",
      label: "Years Experience",
      icon: Award,
      color: "from-yellow-500 to-orange-500",
    },
    {
      number: "500+",
      label: "Cars Sold Monthly",
      icon: Car,
      color: "from-green-500 to-emerald-500",
    },
    {
      number: "98%",
      label: "Customer Satisfaction",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
    },
    {
      number: "24/7",
      label: "Customer Support",
      icon: Headphones,
      color: "from-red-500 to-rose-500",
    },
    {
      number: "50+",
      label: "Service Centers",
      icon: Building2,
      color: "from-indigo-500 to-blue-600",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-48 h-48 bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <MotionReveal preset="fadeIn">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Trust & Performance
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Built on <span className="text-primary">Trust</span>, Driven by
              Results
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Real numbers that showcase our commitment to automotive excellence
              and customer satisfaction
            </p>
          </div>
        </MotionReveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <MotionReveal
                key={stat.label}
                preset="slideUp"
                delay={index * 0.1}
              >
                <div className="group bg-white/10 backdrop-blur-sm hover:bg-white/15 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-xl border border-white/20 hover:border-white/30 hover:-translate-y-1">
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {stat.number}
                  </div>
                  <p className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">
                    {stat.label}
                  </p>
                </div>
              </MotionReveal>
            );
          })}
        </div>

        {/* Trust Statement */}
        <MotionReveal preset="fadeIn" delay={0.6}>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20 text-center">
            <h3 className="text-xl font-bold text-white mb-3">
              Every Number Tells a <span className="text-primary">Story</span>
            </h3>
            <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
              These aren't just statistics – they represent thousands of
              successful car purchases, countless satisfied families, and our
              unwavering commitment to automotive excellence.
            </p>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
