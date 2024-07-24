import React from "react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
}) => {
  return (
    <div className="flex justify-between mt-4">
      <button
        type="button"
        onClick={onBack}
        className={`btn btn-secondary ${currentStep === 1 ? "invisible" : ""}`}
        disabled={currentStep === 1}
      >
        Back
      </button>
      <button
        type="button"
        onClick={onNext}
        className={`btn btn-primary ${
          currentStep === totalSteps ? "invisible" : ""
        }`}
        disabled={currentStep === totalSteps}
      >
        Next
      </button>
    </div>
  );
};

export default StepNavigation;
