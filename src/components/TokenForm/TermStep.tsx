import React from "react";
import { useTokenFormContext } from "./TokenFormContext";

const TermsStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const { formData, setFormData } = useTokenFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ agreedToTerms: e.target.checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.agreedToTerms) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={formData.agreedToTerms}
            onChange={handleChange}
            className="form-checkbox"
          />
          <span className="ml-2">I agree to the Terms and Conditions</span>
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Next
      </button>
    </form>
  );
};

export default TermsStep;
