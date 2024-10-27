"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Address } from "viem";
import { useAccount } from "wagmi";

import { TokenFormProvider } from "@/components/TokenForm/TokenFormContext";
import { IconArrowRight } from "@/components/Icons/IconArrowRight";

import config from "@/config/configuration";
import { formatCurrencyAmount } from "@/helpers/currency";
import { usePolTokenPrice } from "@/hooks/usePolTokenPrice";
import InfoItem, { InfoType } from "@/components/TokenForm/InfoItem";
import { tokenExist } from "../actions/tokenExist";

interface TokenData {
  tokenName: string;
  tokenTicker: string;
  iconHash?: { ipfsHash: string };
  projectAddress: string;
  nftContractAddress: Address;
  issuanceTokenAddress: Address;
}

export default function TokenExistPage() {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const { address } = useAccount();

  const polTokenPrice = usePolTokenPrice();

  const collateralAmount = +config.bondingCurveParams.initialCollateralSupply;
  const collateralUsdValueString: string = polTokenPrice.isSuccess
    ? formatCurrencyAmount(collateralAmount * polTokenPrice.data)
    : "-";

  const info = [
    {
      label: "Token Full Name",
      value: tokenData?.tokenName,
      type: InfoType.TEXT,
    },
    {
      label: "Token Ticker",
      value: tokenData?.tokenTicker,
      type: InfoType.TEXT,
    },
    {
      label: "Token Icon",
      value: tokenData?.iconHash || "",
      type: InfoType.IPFS_IMAGE,
    },
    // {
    //   label: "Project Address",
    //   value: tokenData?.projectAddress,
    //   type: InfoType.LINK,
    // },
    {
      label: "Token Contract Address",
      value: tokenData?.issuanceTokenAddress as Address,
      type: InfoType.LINK,
    },
    {
      label: "NFT Address",
      value: tokenData?.nftContractAddress as Address,
      type: InfoType.LINK,
    },
  ];

  useEffect(() => {
    if (address) {
      tokenExist({ userAddress: address }).then((project) => {
        if (project) {
          const tokenData: TokenData = {
            tokenName: project.tokenName,
            tokenTicker: project.tokenTicker,
            iconHash: project.iconHash,
            projectAddress: project.projectAddress,
            nftContractAddress: project.nftContractAddress,
            issuanceTokenAddress: project.issuanceTokenAddress,
          };
          setTokenData(tokenData);
        }
      });
    }
  }, [address]);

  return (
    <>
      <TokenFormProvider>
        <main className="container">
          <div className="my-20 bg-white rounded-2xl flex flex-col items-center gap-24 max-w-3xl mx-auto">
            <div className="flex flex-col gap-8 w-full">
              <section
                className="flex flex-col gap-4 w-3/4 mx-auto pb-10 pt-14"
                style={{
                  backgroundImage: `url('/images/token-form/last-step-top.svg'), url('/images/token-form/last-step-down.svg')`,
                  backgroundSize: "contain, contain",
                  backgroundPosition: "top center, bottom center",
                  backgroundRepeat: "no-repeat, no-repeat",
                }}
              >
                <h1 className="text-5xl font-bold text-success-500 text-center mb-7 leading-normal">
                  Your token is <br />
                  already launched.
                </h1>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-[auto_24px_auto] gap-y-4 gap-x-6 px-5 py-4 border-t-[1px] border-b-[1px]">
                    <p className="text-lg text-gray-600">Grant size</p>
                    <IconArrowRight size={24} />
                    <div className="border-2 rounded-md border-success-600 bg-success-100 text-success-700 flex items-start gap-4 px-4 py-1">
                      <p className="text-lg  font-bold">
                        {formatCurrencyAmount(collateralAmount)} POL
                      </p>
                      <p className="text-xs">${collateralUsdValueString}</p>
                    </div>
                    {info.map((item) => (
                      <InfoItem
                        key={item.label}
                        label={item.label}
                        value={typeof item.value === "string" ? item.value : ""}
                        type={item.type}
                      />
                    ))}
                  </div>
                  {/* <div className="mx-auto py-4">
                    <Link
                      href={config.gotToDashboardLink}
                      className="font-bold text-xs border-none rounded-full py-4 px-10 flex gap-2 text-white bg-pink-500 hover:opacity-85"
                      target="_blank"
                    >
                      <span>Go to My Dashboard</span>
                      <IconArrowRight size={16} />
                    </Link>
                  </div> */}
                </div>
              </section>
            </div>
          </div>
        </main>
      </TokenFormProvider>
    </>
  );
}
