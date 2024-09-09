import React, { useState } from "react";
import Image from "next/image";
import { Address } from "viem";

import StepNavigation from "./StepNavigation";
import { useTokenFormContext } from "./TokenFormContext";
import { FormProvider, useForm } from "react-hook-form";
import { MintSuccessModal } from "@/components/MintSuccessModal";
import { MintErrorModal } from "@/components/MintErrorModal";
import { useNFT } from "@/hooks/useNFT";
import { toast } from "sonner";

interface FormData {
  nftContractAddress?: Address;
}

const NFTDeploymentStep: React.FC<{
  onNext: () => void;
  onBack: () => void;
}> = ({ onNext, onBack }) => {
  const [showMintSuccessModal, setShowMintSuccessModal] = useState(false);
  const [showMintErrorModal, setShowMintErrorModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const { formData, setFormData } = useTokenFormContext();
  const methods = useForm<FormData>();
  const { handleSubmit, formState } = methods;
  const { deploy } = useNFT();

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      const nftName = formData.tokenName.trim() + " NFT";
      const nftSymbol = formData.tokenTicker.trim() + "NFT";

      const nftContractAddress = await deploy.mutateAsync({
        name: nftName,
        symbol: nftSymbol,
      });

      if (!nftContractAddress) throw new Error("NFT not deployed");

      // If the transaction was successful, show success modal and proceed to the next step
      if (nftContractAddress) {
        toast.success("NFT deployment successfully!");
        setShowMintSuccessModal(true);

        setFormData({
          ...data,
          nftContractAddress,
        });
      }
    } catch (error: any) {
      console.error("NTF deployment failed", error);
      toast.error("NTF deployment failed");
      setShowMintErrorModal(true); // Show error modal in case of failure
    } finally {
      setLoading(false);
    }
  };

  const closeSuccessModal = () => {
    setShowMintSuccessModal(false);
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
            Get ready to launch
            <br />
            your NFTs
          </h1>
          <div className="overflow-x-hidden text-justify text-xl">
            <p className="mb-6">
              Early access NFTs grant exclusive access to your invited
              supporters. NFT token holders immediately gain access to your
              token-gated chat, and access to acquire tokens during the early
              access window.
            </p>
            <p className="mb-10">
              You are about to deploy the NFT contract for these NFTs! After
              deployment, you will need to mint NFTs for each individual
              supporter you wish to invite. Here is a how-to guide to show you
              how.
            </p>
            <div className="flex items-center justify-center">
              <Image
                src="/images/nft/nft.svg"
                alt="NFT"
                width={398}
                height={397}
              />
            </div>
          </div>
        </section>
        <StepNavigation
          currentStep={4}
          totalSteps={5}
          onBack={onBack}
          isFormValid={formState.isValid}
          isNextLoading={loading}
          nextLabel="Deploy"
        />
      </form>
      {showMintSuccessModal && (
        <MintSuccessModal
          isOpen={showMintSuccessModal}
          onClose={() => closeSuccessModal()}
        />
      )}
      {showMintErrorModal && (
        <MintErrorModal
          isOpen={showMintErrorModal}
          onClose={() => setShowMintErrorModal(false)}
        />
      )}
    </FormProvider>
  );
};

export default NFTDeploymentStep;
