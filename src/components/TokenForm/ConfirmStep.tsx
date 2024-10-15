import React, { useEffect, useMemo, useState } from "react";
import StepNavigation from "./StepNavigation";
import { useTokenFormContext } from "./TokenFormContext";
import Checkbox from "../Checkbox";
import { FormProvider, useForm } from "react-hook-form";
import InfoItem, { InfoType } from "./InfoItem";
import { IconArrowRight } from "../Icons/IconArrowRight";
import { useCollateralCheck, useDeploy } from "@/hooks/useDeploy";
import config from "@/config/configuration";
import { addProject } from "@/app/actions/add-project";
import { useAccount, useSwitchChain } from "wagmi";
import { checkWhiteList } from "@/services/check-white-list";
import { toast } from "sonner";
import { Address } from "viem";
import { formatCurrencyAmount } from "@/helpers/currency";
import { usePolTokenPrice } from "@/hooks/usePolTokenPrice";
import { useSwitchChainIfNeeded } from "@/hooks/useSwitchChainIfNeeded";

const ConfirmStep: React.FC<{ onNext: () => void; onBack: () => void }> = ({
  onNext,
  onBack,
}) => {
  const [loading, setLoading] = useState(false);
  const { formData, setFormData } = useTokenFormContext();
  const methods = useForm<FormData>();
  const { address, chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { handleSubmit, formState } = methods;
  const { deploy, prep, requestedModules, inverter } = useDeploy();
  const collateralCheck = useCollateralCheck();
  const polTokenPrice = usePolTokenPrice();
  const collateralAmount = +config.bondingCurveParams.initialCollateralSupply;
  const collateralUsdValueString: string = polTokenPrice.isSuccess
    ? formatCurrencyAmount(collateralAmount * polTokenPrice.data)
    : "-";
  const { switchChainIfNeeded } = useSwitchChainIfNeeded();
  const targetChain = config.SUPPORTED_CHAINS[0].id; // PolygonZkEvm chain ID

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      // Return user to polygonZkEvm after deployed NFT contract on polygon
      const chainSwitched = await switchChainIfNeeded(targetChain);

      // If chain switching failed, stop further execution
      if (!chainSwitched) return;

      const prepData = await prep.mutateAsync();

      if (!address) throw new Error("Address not found");
      const isWhiteListed = await checkWhiteList(address);
      if (!isWhiteListed) throw new Error("Address not whitelisted");

      const isCollateral = await collateralCheck.mutateAsync(
        formData.projectAddress
      );

      if (!isCollateral) {
        throw new Error(
          "Not enough collateral is supplied to you! You are not eligible to launch a token."
        );
      }

      const { transactionHash, orchestratorAddress } = await deploy.mutateAsync(
        {
          prepData,
          userArgs: {
            fundingManager: {
              bondingCurveParams: config.bondingCurveParams,
              collateralToken: config.COLATERAL_TOKEN,
            },
            authorizer: {
              initialAdmin: config.COLATERAL_SUPPLIER || address!,
            },
            issuanceToken: {
              name: formData.tokenName,
              symbol: formData.tokenTicker,
              decimals: 18,
              maxSupply: config.tokenIssueMaxSupply,
            },
            beneficiary: formData.projectAddress,
          },
        }
      );

      if (!inverter) throw new Error("Inverter instance not found");

      await inverter.publicClient.waitForTransactionReceipt({
        hash: transactionHash,
      });
      const workflow = await inverter.getWorkflow({
        orchestratorAddress,
        requestedModules,
      });

      const issuanceTokenAddress =
        await workflow.fundingManager.read.getIssuanceToken.run();
      const fundingManagerAddress = workflow.fundingManager.address;

      // TODO: save in db
      console.log({
        transactionHash,
        orchestratorAddress,
      });

      const res = await addProject({
        tokenName: formData.tokenName,
        tokenTicker: formData.tokenTicker,
        iconHash: formData.tokenIcon?.ipfsHash || "",
        projectAddress: formData.projectAddress,
        transactionHash: transactionHash,
        orchestratorAddress: orchestratorAddress,
        userAddress: address,
        issuanceTokenAddress,
        fundingManagerAddress,
        nftContractAddress: formData.nftContractAddress || "",
        chainId: inverter.publicClient.chain.id,
        policyAcceptTime: formData.policyAcceptTime || new Date(),
      });
      if (res.insertedId) {
        setFormData({
          ...data,
          issuanceTokenAddress,
        });
        onNext();
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

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
      value: formData.tokenIcon?.ipfsHash || "",
      type: InfoType.IPFS_IMAGE,
    },
    {
      label: "Project Address",
      value: formData.projectAddress,
      type: InfoType.LINK,
    },
    {
      label: "NFT Address",
      value: formData.nftContractAddress as Address,
      type: InfoType.LINK,
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
                  value={item.value}
                  type={item.type}
                />
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
          currentStep={5}
          totalSteps={5}
          onBack={onBack}
          nextLabel="Launch my token"
          isFormValid={formState.isValid}
          isNextLoading={loading}
        />
      </form>
    </FormProvider>
  );
};

export default ConfirmStep;
