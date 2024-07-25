"use client";

import PolicyStep from "@/components/TokenForm/PolicyStep";
import TermsStep from "@/components/TokenForm/TermStep";
import { TokenFormProvider } from "@/components/TokenForm/TokenFormContext";
import TokenInfoStep from "@/components/TokenForm/TokenInfoStep";
import React, { useState } from "react";

enum FormSteps {
  TokenInfo = 1,
  Terms,
  Policy,
  Confirm,
  Success,
}

export default function TokenFormPage() {
  const [step, setStep] = useState(FormSteps.TokenInfo);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <TokenFormProvider>
      <main className="container">
        <div className=" bg-white rounded-2xl flex flex-col items-center gap-24 max-w-3xl mx-auto">
          {step === FormSteps.TokenInfo && (
            <TokenInfoStep onNext={handleNext} onBack={handleBack} />
          )}
          {step === FormSteps.Terms && (
            <TermsStep onNext={handleNext} onBack={handleBack} />
          )}
          {step === FormSteps.Policy && (
            <PolicyStep onNext={handleSubmit} onBack={handleBack} />
          )}
        </div>
      </main>
    </TokenFormProvider>
  );
}
