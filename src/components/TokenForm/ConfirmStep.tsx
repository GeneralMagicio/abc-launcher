import React, { Fragment } from "react";
import StepNavigation from "./StepNavigation";
import { useTokenFormContext } from "./TokenFormContext";
import Checkbox from "../Checkbox";
import { FormProvider, useForm } from "react-hook-form";

const ConfirmStep: React.FC<{ onNext: () => void; onBack: () => void }> = ({
  onNext,
  onBack,
}) => {
  const { formData } = useTokenFormContext();
  const methods = useForm<FormData>();
  const { handleSubmit, setValue } = methods;

  const onSubmit = (data: FormData) => {
    onNext();
  };

  const info = [
    {
      label: "Token Full Name",
      value: formData.tokenName,
    },
    {
      label: "Token Ticker",
      value: formData.tokenTicker,
    },
    {
      label: "Token Icon",
      value: formData.tokenIcon,
    },
    {
      label: "Project Address",
      value: formData.projectAddress,
    },
  ];

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
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-light text-center">
              Please review everything before Launch
            </h2>
            <div className="grid grid-cols-2 gap-y-4 px-5 py-4 border-t-[1px] border-b-[1px]">
              {info.map((item) => (
                <Fragment key={item.label}>
                  <p className="text-lg text-gray-600">{item.label}</p>
                  <p className="text-lg text-gray-600">{item.value}</p>
                </Fragment>
              ))}
            </div>
            <Checkbox
              name="acceptTerms"
              label="I reviewed all parameters and I accept them."
              rules={{
                required:
                  "You must review and accept the parameters to continue",
              }}
            />
          </div>
        </section>
        <StepNavigation
          currentStep={2}
          totalSteps={4}
          onBack={onBack}
          nextLabel="Launch my token"
        />
      </form>
    </FormProvider>
  );
};

export default ConfirmStep;
