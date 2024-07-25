import React from "react";
import StepNavigation from "./StepNavigation";
import { useTokenFormContext } from "./TokenFormContext";
import Checkbox from "../Checkbox";
import { FormProvider, useForm } from "react-hook-form";

const TermsStep: React.FC<{ onNext: () => void; onBack: () => void }> = ({
  onNext,
  onBack,
}) => {
  const methods = useForm<FormData>();
  const { handleSubmit, setValue } = methods;

  const onSubmit = (data: FormData) => {
    onNext();
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
            The Quadratic Accelerator takes personal privacy very seriously. As
            a general rule, this website does not collect your personal
            information unless you choose to provide that information to us.
            When you choose to provide us with your personal information, you
            are giving Quadratic Accelerator your permission to use that
            information for the stated purposes listed in this privacy policy.
            If you choose not to provide us with that information, it might
            limit the features and services that you can use on this website.
            permission to use that information for the stated purposes listed in
            this privacy policy. If you choose not to provide us with that
            information, it might limit the features and services that you can
            use on this website.
          </p>
          <Checkbox
            name="acceptTerms"
            label="I have read and agree to the Terms of Service."
            rules={{
              required: "You must agree to the Terms of Service to continue",
            }}
          />
        </section>
        <StepNavigation currentStep={2} totalSteps={4} onBack={onBack} />
      </form>
    </FormProvider>
  );
};

export default TermsStep;
