import React, { Fragment } from "react";
import StepNavigation from "./StepNavigation";
import { useTokenFormContext } from "./TokenFormContext";
import Checkbox from "../Checkbox";
import { FormProvider, useForm } from "react-hook-form";
import Image from "next/image";
import config from "@/config/configuration";

const ConfirmStep: React.FC<{ onNext: () => void; onBack: () => void }> = ({
  onNext,
  onBack,
}) => {
  const { formData } = useTokenFormContext();
  const methods = useForm<FormData>();
  const { handleSubmit, formState } = methods;

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
      value: formData.tokenIcon ? URL.createObjectURL(formData.tokenIcon) : "",
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
            <div className="grid grid-cols-[auto_24px_auto] gap-y-4 gap-x-6 px-5 py-4 border-t-[1px] border-b-[1px]">
              <p className="text-lg text-gray-600">Grant size</p>
              <Image
                src="/images/icons/arrow-right.svg"
                alt="logo"
                width={24}
                height={24}
              />
              <div className="border-2 rounded-md border-success-600 bg-success-100 text-success-700 flex items-start gap-4 px-4 py-1">
                <p className="text-lg">65,000 POL</p>
                <p className="text-xs">$50,000</p>
              </div>
              {info.map((item) => (
                <Fragment key={item.label}>
                  <p className="text-lg text-gray-600">{item.label}</p>
                  <div className="flex items-center justify-center">
                    <Image
                      src="/images/icons/arrow-right.svg"
                      alt="logo"
                      width={24}
                      height={24}
                    />
                  </div>
                  {item.label === "Token Icon" ? (
                    <div className="flex items-center gap-4">
                      <Image
                        src={item.value}
                        alt="token icon"
                        width={32}
                        height={32}
                      />
                    </div>
                  ) : item.label === "Project Address" ? (
                    <a
                      href={`${config.SCAN_URL}address/${item.value}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex gap-2 items-center text-lg text-giv-blue text-pink-500"
                    >
                      <span>Open in a new tab</span>
                      <Image
                        src="/images/icons/external-link.svg"
                        alt="external link"
                        width={16}
                        height={16}
                      />
                    </a>
                  ) : (
                    <p className="text-lg text-gray-600 overflow-hidden text-ellipsis">
                      {item.value}
                    </p>
                  )}
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
          currentStep={4}
          totalSteps={4}
          onBack={onBack}
          nextLabel="Launch my token"
          isFormValid={formState.isValid}
        />
      </form>
    </FormProvider>
  );
};

export default ConfirmStep;
