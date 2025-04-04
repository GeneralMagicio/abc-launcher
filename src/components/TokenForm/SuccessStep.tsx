import React from "react";
import Link from "next/link";
import { useTokenFormContext } from "./TokenFormContext";
import InfoItem, { InfoType } from "./InfoItem";
import { IconArrowRight } from "../Icons/IconArrowRight";
import { Address } from "viem";
import config from "@/config/configuration";
import { formatCurrencyAmount } from "@/helpers/currency";
import { usePolTokenPrice } from "@/hooks/usePolTokenPrice";

const SuccessStep: React.FC<{}> = () => {
  const { formData } = useTokenFormContext();
  const polTokenPrice = usePolTokenPrice();
  const collateralAmount = +config.bondingCurveParams.initialCollateralSupply;
  const collateralUsdValueString: string = polTokenPrice.isSuccess
    ? formatCurrencyAmount(collateralAmount * polTokenPrice.data)
    : "-";
  console.log(formData);

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
      value: formData.icon || "",
      type: InfoType.IPFS_IMAGE,
    },
    // {
    //   label: "Project Address",
    //   value: formData.projectAddress,
    //   type: InfoType.LINK,
    // },
    {
      label: "Token Contract Address",
      value: formData.issuanceTokenAddress as Address,
      type: InfoType.LINK,
    },
    // {
    //   label: "NFT Address",
    //   value: formData.nftContractAddress as Address,
    //   type: InfoType.LINK,
    // },
  ];

  return (
    <section
      className="flex flex-col gap-4 w-3/4 mx-auto pt-20 pb-10"
      style={{
        backgroundImage: `url('/images/token-form/last-step-top.svg'), url('/images/token-form/last-step-down.svg')`,
        backgroundSize: "contain, contain",
        backgroundPosition: "top center, bottom center",
        backgroundRepeat: "no-repeat, no-repeat",
      }}
    >
      <h1 className="text-5xl font-bold text-success-500 text-center mb-7">
        Congratulations!
      </h1>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-light text-center">
          Your token has been launched.
        </h2>
        <div className="grid grid-cols-[auto_24px_auto] gap-y-4 gap-x-6 px-5 py-4 border-t-[1px]">
          <p className="text-lg text-gray-600">Grant size</p>
          <IconArrowRight size={24} />
          <div className="border-2 rounded-md border-success-600 bg-success-100 text-success-700 flex items-start gap-4 px-4 py-1">
            <p className="text-lg font-bold">
              {formatCurrencyAmount(collateralAmount)} POL
            </p>
            <p className="text-xs">${collateralUsdValueString}</p>
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
        <div className="mx-auto py-4">
          <Link
            href={config.gotToDashboardLink}
            className="font-bold text-xs border-none rounded-full py-4 px-10 flex gap-2 text-white bg-pink-500 hover:opacity-85"
            target="_blank"
          >
            <span>Create q/acc account</span>
            <IconArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SuccessStep;
