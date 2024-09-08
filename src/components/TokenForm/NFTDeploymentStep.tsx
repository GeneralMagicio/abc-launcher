import React, { useState } from "react";
import Image from "next/image";

import StepNavigation from "./StepNavigation";
import { useTokenFormContext } from "./TokenFormContext";
import { FormProvider, useForm } from "react-hook-form";
import { MintSuccessModal } from "@/components/MintSuccessModal";
import { MintErrorModal } from "@/components/MintErrorModal";
import { useMintNFT } from "@/hooks/useMintNFT";
import { toast } from "sonner";

interface FormData {
  mintedNft?: boolean;
}

const NFTDeploymentStep: React.FC<{
  onNext: () => void;
  onBack: () => void;
}> = ({ onNext, onBack }) => {
  const [showMintSuccessModal, setShowMintSuccessModal] = useState(false);
  const [showMintErrorModal, setShowMintErrorModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const { setFormData } = useTokenFormContext();
  const methods = useForm<FormData>();
  const { handleSubmit, formState } = methods;

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      const receipt = await mintNFT.mutateAsync("0.00000001");

      // If the transaction was successful, show success modal and proceed to the next step
      if (receipt) {
        toast.success("NFT minted successfully!");
        setShowMintSuccessModal(true);

        setFormData({
          ...data,
          mintedNft: true,
        });

        
      }
    } catch (error: any) {
      console.error("Minting failed", error);
      toast.error("Minting failed");
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
