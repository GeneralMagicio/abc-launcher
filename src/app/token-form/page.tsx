"use client";

import PolicyStep from "@/components/TokenForm/PolicyStep";
import TermsStep from "@/components/TokenForm/TermStep";
import { TokenFormProvider } from "@/components/TokenForm/TokenFormContext";
import TokenInfoStep from "@/components/TokenForm/TokenInfoStep";
import React, { useState } from "react";

export enum FormSteps {
  TokenInfo = 1,
  Terms,
  Policy,
  Confirm,
  Success,
}

export default function TokenFormPage() {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
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
            <TokenInfoStep onNext={handleNext} />
          )}
          {step === FormSteps.Terms && <TermsStep onNext={handleNext} />}
          {step === FormSteps.Policy && <PolicyStep onSubmit={handleSubmit} />}
        </div>
      </main>
    </TokenFormProvider>
  );
}
