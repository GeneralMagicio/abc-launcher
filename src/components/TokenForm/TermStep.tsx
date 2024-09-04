import React from "react";
import StepNavigation from "./StepNavigation";
import { useTokenFormContext } from "./TokenFormContext";
import { FormProvider, useForm } from "react-hook-form";
import { TERMS_AND_CONDITIONS, MessageType } from "@/constants/signAndSubmit";
import { useSignAndSubmit } from "@/hooks/useSignAndSubmit";
import { toast } from "sonner";
import { SignMessageErrorType } from "viem";

interface FormData {
  agreedToTerms: boolean;
}

const TermsStep: React.FC<{ onNext: () => void; onBack: () => void }> = ({
  onNext,
  onBack,
}) => {
  const { formData, setFormData } = useTokenFormContext();
  const methods = useForm<FormData>({
    defaultValues: formData,
    mode: "onChange", // This enables validation on change
  });
  const { signAndSubmit } = useSignAndSubmit();
  const { handleSubmit, formState } = methods;

  const onSubmit = async (data: FormData) => {
    try {
      const res = await signAndSubmit.mutateAsync(
        {
          message: TERMS_AND_CONDITIONS,
          type: MessageType.TermsAndConditions,
        },
        {
          onError: (e) => {
            const err = e as SignMessageErrorType;
            if (e.name === "UserRejectedRequestError") {
              toast.error("You must sign the Terms of Service to continue");
            } else {
              toast.error(err.name);
            }
          },
        }
      );

      if (res) {
        setFormData(data);
        onNext();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 pt-20 w-full"
      >
        <section className="flex flex-col gap-4 w-3/4 mx-auto ">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-7">
            Review Terms of Service
          </h1>
          <p className="max-h-64 overflow-x-hidden overflow-y-auto text-justify">
            {TERMS_AND_CONDITIONS}
          </p>
        </section>
        <StepNavigation
          isNextLoading={signAndSubmit.isPending}
          currentStep={2}
          totalSteps={4}
          onBack={onBack}
          isFormValid
          nextLabel="Sign & Continue"
        />
      </form>
    </FormProvider>
  );
};

export default TermsStep;
