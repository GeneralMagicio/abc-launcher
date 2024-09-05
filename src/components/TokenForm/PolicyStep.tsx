import React from "react";
import StepNavigation from "./StepNavigation";
import { useForm, FormProvider } from "react-hook-form";
import Checkbox from "../Checkbox";
import { useTokenFormContext } from "./TokenFormContext";
import { POLICY_STATEMENT } from "@/constants/signAndSubmit";

interface FormData {
  agreedToPolicy: boolean;
}

const PolicyStep: React.FC<{ onNext: () => void; onBack: () => void }> = ({
  onNext,
  onBack,
}) => {
  const { formData, setFormData } = useTokenFormContext();
  const methods = useForm<FormData>({
    defaultValues: formData,
    mode: "onChange", // This enables validation on change
  });
  const { handleSubmit, formState } = methods;

  const onSubmit = (data: FormData) => {
    setFormData({
      ...data,
      policyAcceptTime: new Date(),
    });
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
            Review Privacy Policy
          </h1>
          <div
            className="max-h-64 pr-4 overflow-x-hidden overflow-y-auto text-justify"
            dangerouslySetInnerHTML={{ __html: POLICY_STATEMENT }}
          />
          <Checkbox
            name="agreedToPolicy"
            label="I have read and agree to the Privacy Policy."
            rules={{
              required: "You must agree to the Privacy Policy to continue",
            }}
          />
        </section>
        <StepNavigation
          currentStep={3}
          totalSteps={4}
          onBack={onBack}
          isFormValid={formState.isValid}
        />
      </form>
    </FormProvider>
  );
};

export default PolicyStep;
