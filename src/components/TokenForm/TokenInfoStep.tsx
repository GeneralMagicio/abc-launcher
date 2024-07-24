import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import Input from "@/components/Input";
import Checkbox from "@/components/Checkbox";
import { Dropzone } from "@/components/Dropzone";
import StepNavigation from "./StepNavigation";
import { useTokenFormContext } from "./TokenFormContext";

interface FormData {
  tokenName: string;
  tokenTicker: string;
  tokenIcon: File | null;
  projectAddress: string;
  addressConfirmed: boolean;
}

const TokenInfoStep: React.FC<{ onNext: () => void; onBack: () => void }> = ({
  onNext,
  onBack,
}) => {
  const { formData, setFormData } = useTokenFormContext();
  const methods = useForm<FormData>({
    defaultValues: formData,
  });
  const { handleSubmit, setValue } = methods;

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setValue("tokenIcon", acceptedFiles[0]);
    }
  };

  const onSubmit = (data: FormData) => {
    setFormData(data);
    onNext();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              value: 4,
              message: "Token Ticker cannot exceed 4 characters",
            },
          }}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Token Icon
          </label>
          <Dropzone onDrop={handleDrop} />
        </div>

        <Input
          name="projectAddress"
          label="Project Address"
          rules={{ required: "Project Address is required" }}
          placeholder="Enter project address"
        />

        <Checkbox
          name="addressConfirmed"
          label="I confirm I have access to this address."
          rules={{
            required: "You must confirm you have access to this address.",
          }}
        />

        <StepNavigation currentStep={1} totalSteps={4} onBack={onBack} />
      </form>
    </FormProvider>
  );
};

export default TokenInfoStep;
