import React from "react";
import StepNavigation from "./StepNavigation";
import { useTokenFormContext } from "./TokenFormContext";
import Checkbox from "../Checkbox";
import { FormProvider, useForm } from "react-hook-form";

const ConfirmStep: React.FC<{ onNext: () => void; onBack: () => void }> = ({
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
            Final Confirmation
          </h1>
          <Checkbox
            name="acceptTerms"
            label="I reviewed all parameters and I accept them.."
            rules={{
              required: "You must review and accept the parameters to continue",
            }}
          />
        </section>
        <StepNavigation currentStep={2} totalSteps={4} onBack={onBack} />
      </form>
    </FormProvider>
  );
};

export default ConfirmStep;
