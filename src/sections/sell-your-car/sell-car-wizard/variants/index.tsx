import SellCarWizardOne from "../layouts/SellCarWizardOne";

export function SellCarWizardDefault() {
  return (
    <div className="bg-linear-to-br from-white via-primary/5 to-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12 md:py-16 lg:py-20">
        <div className="flex justify-center items-center">
          <SellCarWizardOne />
        </div>
      </div>
    </div>
  );
}
