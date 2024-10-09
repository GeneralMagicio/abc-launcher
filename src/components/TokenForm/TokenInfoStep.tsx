import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Input from "@/components/Input";
import Checkbox from "@/components/Checkbox";
import StepNavigation from "./StepNavigation";
import { useTokenFormContext } from "./TokenFormContext";
import { Dropzone } from "@/components/DropZone";
import { Address, isAddress } from "viem";
import { tokenExist } from "@/app/actions/tokenExist";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { isSafeOwner } from "@/services/check-safe-owner";

interface FormData {
  tokenName: string;
  tokenTicker: string;
  tokenIcon: { file: File; ipfsHash: string } | null;
  projectAddress: Address;
  addressConfirmed: boolean;
}

const TokenInfoStep: React.FC<{ onNext: () => void; onBack: () => void }> = ({
  onNext,
  onBack,
}) => {
  const router = useRouter();
  const { address } = useAccount();
  const { formData, setFormData } = useTokenFormContext();
  const methods = useForm<FormData>({
    defaultValues: formData,
    mode: "onChange", // This enables validation on change
  });
  const { handleSubmit, setValue, formState } = methods;

  const handleDrop = (file: File, ipfsHash: string) => {
    if (file) {
      setValue("tokenIcon", { file, ipfsHash });
    }
  };

  const onSubmit = (data: FormData) => {
    setFormData(data);
    onNext();
  };

  // if user already launched token redirect to token-exist page
  useEffect(() => {
    if (address) {
      tokenExist({ userAddress: address }).then((project) => {
        if (project) {
          router.push("/token-exist");
        }
      });
    }
  }, [address, router]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-24 pt-20 w-full"
      >
        <section className="flex flex-col gap-4 w-2/4 mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-7">
            Name your Token
          </h1>
          <Input
            name="tokenName"
            label="Token Name"
            placeholder="Enter the name of your Token"
            rules={{ required: "Token Name is required" }}
          />
          <Input
            name="tokenTicker"
            label="Token Ticker"
            placeholder="Enter your Token Ticker"
            rules={{
              required: "Token Ticker is required",
              maxLength: {
                value: 5,
                message: "Token Ticker cannot exceed 4 characters",
              },
            }}
          />
        </section>

        <section className="flex flex-col gap-4 w-2/4 mx-auto">
          <label className="text-4xl font-bold text-gray-800 text-center mb-7">
            Upload Token icon
          </label>
          <Dropzone name="icon" onDrop={handleDrop} />
        </section>

        <section className="flex flex-col gap-4 w-2/4 mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-7">
            Enter Project Address
          </h1>
          <Input
            name="projectAddress"
            label="Project Address"
            placeholder="0x..."
            description="The grant is being sent to this address."
            rules={{
              required: "Project Address is required",
              validate: async (value) => {
                if (isAddress(value)) {
                  const isOwner = await isSafeOwner(value, address);
                  return isOwner || "Address is not a Safe owner address";
                }
                return "Address is not valid";
              }
            }}
          />

          <Checkbox
            name="addressConfirmed"
            label="I confirm I have access to this address."
            rules={{
              required: "You must confirm you have access to this address.",
            }}
          />
        </section>

        <StepNavigation
          currentStep={1}
          totalSteps={5}
          onBack={onBack}
          isFormValid={formState.isValid}
          isNextLoading={formState.isValidating}
        />
      </form>
    </FormProvider>
  );
};

export default TokenInfoStep;
