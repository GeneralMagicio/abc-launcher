"use client";

import { ConnectModal } from "@/components/ConnectModal";
import { HoldModal } from "@/components/HoldModal";
import ConfirmStep from "@/components/TokenForm/ConfirmStep";
import PolicyStep from "@/components/TokenForm/PolicyStep";
import NFTDeploymentStep from "@/components/TokenForm/NFTDeploymentStep";
import SuccessStep from "@/components/TokenForm/SuccessStep";
import TermsStep from "@/components/TokenForm/TermStep";
import { TokenFormProvider } from "@/components/TokenForm/TokenFormContext";
import TokenInfoStep from "@/components/TokenForm/TokenInfoStep";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useAddressWhitelist } from "@/hooks/useAddressWhitelist";

enum FormSteps {
  TokenInfo = 1,
  Terms,
  Policy,
  NFTDeployment,
  Confirm,
  Success,
}

export default function TokenFormPage() {
  const router = useRouter();
  const [step, setStep] = useState(FormSteps.TokenInfo);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showHoldModal, setShowHoldModal] = useState(false);

  const { address } = useAccount();
  const useWhitelist = useAddressWhitelist();

  const handleNext = () => {
    setStep((prevStep) => {
      if (prevStep === FormSteps.Policy) {
        return FormSteps.Confirm; // Skip NFTDeployment and go directly to Confirm
      }
      return prevStep + 1;
    });
  };
  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted");
    handleNext();
  };

  useEffect(() => {
    if (!address) {
      setShowConnectModal(true);
      setShowHoldModal(false);
    } else {
      if (useWhitelist.data || useWhitelist.isLoading) {
        setShowHoldModal(false);
      } else {
        setShowHoldModal(true);
      }
    }
  }, [address, useWhitelist]);

  return (
    <>
      <TokenFormProvider>
        <main className="container">
          <div className="my-20 bg-white rounded-2xl flex flex-col items-center gap-24 max-w-3xl mx-auto">
            {step === FormSteps.TokenInfo && (
              <TokenInfoStep onNext={handleNext} onBack={handleBack} />
            )}
            {step === FormSteps.Terms && (
              <TermsStep onNext={handleNext} onBack={handleBack} />
            )}
            {step === FormSteps.Policy && (
              <PolicyStep onNext={handleNext} onBack={handleBack} />
            )}
            {step === FormSteps.NFTDeployment && (
              <NFTDeploymentStep onNext={handleNext} onBack={handleBack} />
            )}
            {step === FormSteps.Confirm && (
              <ConfirmStep onNext={handleSubmit} onBack={handleBack} />
            )}
            {step === FormSteps.Success && <SuccessStep />}
          </div>
        </main>
      </TokenFormProvider>
      {showConnectModal && (
        <ConnectModal
          isOpen={showConnectModal}
          onClose={() => setShowConnectModal(false)}
        />
      )}
      {showHoldModal && (
        <HoldModal
          isOpen={showHoldModal}
          onClose={() => setShowHoldModal(false)}
        />
      )}
    </>
  );
}
