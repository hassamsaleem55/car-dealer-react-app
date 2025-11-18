import { Check } from "lucide-react";
import { useDealerContext } from "@core-dir/dealer-provider";
import MotionReveal from "@components-dir/framer-motion/motion-reveal";

export default function CarCheckRecheck() {
  const { dealerConfig } = useDealerContext();

  return (
    <section className="col-span-2 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="py-6 mb-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            Checked. Rechecked. Guaranteed.
          </h2>
          <h3 className="text-gray-500 text-sm sm:text-base mt-1">
            We run every vehicle through detailed inspections, multiple times.
          </h3>
        </div>
      </div>

      {/* List */}
      <div className="px-6 sm:px-8 pb-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dealerConfig.dealer.checkReCheckList?.map(
            (item: string, idx: number) => (
              <MotionReveal key={idx} preset="zoomOut" once={true}>
                <div className="group flex flex-col sm:flex-row sm:items-center justify-between bg-gray-100 rounded-md p-3">
                  <h3 className="text-sm font-medium">{item}</h3>
                  <div className="flex items-center gap-2 text-xs bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-full">
                    {/* Icon Circle */}
                    <span className="flex items-center justify-center w-4.5 h-4.5 border border-green-700 rounded-full shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </span>

                    {/* Feature Text */}
                    <span className="font-semibold">
                      Passed
                    </span>
                  </div>
                </div>
              </MotionReveal>
            )
          )}
        </div>
      </div>
    </section>
  );
}
