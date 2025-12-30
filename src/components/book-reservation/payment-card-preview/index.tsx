type CardPreviewProps = {
  brand: string;
  cardholderName: string;
};

export default function CardPreview({ brand, cardholderName }: CardPreviewProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="relative group">
        {/* Glow */}
        <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>

        {/* Card */}
        <div className="relative w-[400px] h-[260px] bg-linear-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl overflow-hidden border border-basicFont/50">
          {/* Premium background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

          {/* Shine */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-60"></div>

          {/* Card content */}
          <div className="relative z-10 p-8 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div className="text-white font-black text-2xl tracking-widest filter drop-shadow-lg">
                  {brand.toUpperCase()}
                </div>
                <div className="text-white/60 text-xs font-light tracking-widest uppercase">
                  Premium
                </div>
              </div>
              {/* Contactless symbol */}
              <div className="relative w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"></div>
            </div>

            {/* Card number */}
            <div className="pt-16">
              <div className="text-white text-2xl font-mono tracking-[0.25em] filter drop-shadow-lg font-light">
                •••• •••• •••• ••••
              </div>
            </div>

            {/* Bottom info */}
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <div className="text-gray-300/80 text-[10px] uppercase tracking-[0.15em] font-medium">
                  Card Holder
                </div>
                <div className="text-white text-base font-medium tracking-wide filter drop-shadow-sm uppercase">
                  {cardholderName || "CARDHOLDER NAME"}
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-gray-300/80 text-[10px] uppercase tracking-[0.15em] font-medium">
                  Valid Thru
                </div>
                <div className="text-white text-base font-mono filter drop-shadow-sm">••/••</div>
              </div>
            </div>
          </div>

          {/* Shine animation */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
        </div>
      </div>
    </div>
  );
}
