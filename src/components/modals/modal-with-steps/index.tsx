import { useState } from "react";
import { createPortal } from "react-dom";

interface Step {
  title?: string;
  content: React.ReactNode;
  validate?: () => boolean | Promise<boolean>;
  submitMethod?: () => boolean | Promise<boolean>;
}

interface ModalWithStepsProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  modalHeading: string;
  steps: Step[];
}

export default function ModalWithSteps({
  isOpen,
  setIsOpen,
  modalHeading,
  steps,
}: ModalWithStepsProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleNext = async () => {
    const currentStep = steps[stepIndex];
    if (currentStep.validate) {
      setLoading(true);
      const isValid = await currentStep.validate();
      setLoading(false);
      if (!isValid) return; // Stop if validation fails
    }

    if (currentStep.submitMethod) {
      setLoading(true);
      const isSubmit = await currentStep.submitMethod();
      setLoading(false);
      if (!isSubmit) return;
    }

    setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    if (stepIndex === steps.length - 1) {
      setIsOpen(false);
    }
  };

  const handleBack = () => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center p-4"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-[1000px] max-h-[90vh] relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 shrink-0">
          <h2 className="text-lg font-semibold">{modalHeading}</h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-800 text-2xl cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Body - Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          {steps[stepIndex]?.content}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 border-t border-gray-200 shrink-0">
          {stepIndex > 0 && (
            <button
              type="button"
              onClick={handleBack}
              disabled={stepIndex === 0}
              className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50 cursor-pointer hover:bg-gray-300"
            >
              Back
            </button>
          )}
          <button
            type="button"
            onClick={handleNext}
            disabled={loading}
            className="px-4 py-2 rounded bg-primary text-white disabled:opacity-50 cursor-pointer hover:bg-primary/90"
          >
            {loading
              ? "Processing..."
              : stepIndex === steps.length - 1
              ? "Finish"
              : stepIndex === steps.length - 2 || steps.length === 1
              ? "Submit"
              : "Next"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
