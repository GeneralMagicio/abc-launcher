import React from "react";
import { useTokenFormContext } from "./TokenFormContext";

const PolicyStep: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const { formData, setFormData } = useTokenFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ agreedToPolicy: e.target.checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.agreedToPolicy) {
      onSubmit();
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
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default PolicyStep;
