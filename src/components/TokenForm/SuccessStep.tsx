import React, { Fragment } from "react";
import StepNavigation from "./StepNavigation";
import { useTokenFormContext } from "./TokenFormContext";
import Checkbox from "../Checkbox";
import { FormProvider, useForm } from "react-hook-form";
import Image from "next/image";
import config from "@/config/configuration";
import InfoItem, { InfoType } from "./InfoItem";

const SuccessStep: React.FC<{}> = () => {
  const { formData } = useTokenFormContext();
  const methods = useForm<FormData>();
  const { handleSubmit, formState } = methods;

  const info = [
    {
      label: "Token Full Name",
      value: formData.tokenName,
      type: InfoType.TEXT,
    },
    {
      label: "Token Ticker",
      value: formData.tokenTicker,
      type: InfoType.TEXT,
    },
    {
      label: "Token Icon",
      value: formData.tokenIcon ? URL.createObjectURL(formData.tokenIcon) : "",
      type: InfoType.IMAGE,
    },
    {
      label: "Project Address",
      value: formData.projectAddress,
      type: InfoType.LINK,
    },
    {
      label: "Token Contract Address",
      value: formData.projectAddress,
      type: InfoType.LINK,
    },
  ];

  return (
    <section className="flex flex-col gap-4 w-3/4 mx-auto pt-20 pb-10 ">
      <h1 className="text-5xl font-bold text-success-500 text-center mb-7">
        Congratulations!
      </h1>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-light text-center">
          Your token has been launched.
        </h2>
        <div className="grid grid-cols-[auto_24px_auto] gap-y-4 gap-x-6 px-5 py-4 border-t-[1px]">
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
            <InfoItem
              key={item.label}
              label={item.label}
              value={item.value}
              type={item.type}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStep;
