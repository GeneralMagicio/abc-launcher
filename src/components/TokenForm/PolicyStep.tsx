import React from "react";
import StepNavigation from "./StepNavigation";
import { useTokenFormContext } from "./TokenFormContext";

const PolicyStep: React.FC<{ onNext: () => void; onBack: () => void }> = ({
  onNext,
  onBack,
}) => {
  const { formData, setFormData } = useTokenFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ agreedToPolicy: e.target.checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.agreedToPolicy) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={formData.agreedToPolicy}
            onChange={handleChange}
            className="form-checkbox"
          />
          <span className="ml-2">I agree to the Privacy Policy</span>
        </label>
      </div>
      <StepNavigation
        currentStep={3}
        totalSteps={4}
        onNext={onNext}
        onBack={onBack}
      />
    </form>
  );
};

export default PolicyStep;
