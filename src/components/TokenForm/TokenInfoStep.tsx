import React from "react";
import { useForm, FormProvider as RHFProvider } from "react-hook-form";
import Input from "@/components/Input";
import { Dropzone } from "@/components/Dropzone";
import { useTokenFormContext } from "./TokenFormContext";

interface FormData {
  tokenName: string;
  tokenTicker: string;
  tokenIcon: File | null;
  projectAddress: string;
}

const TokenInfoStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const { setFormData } = useTokenFormContext();
  const methods = useForm<FormData>();
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
    <RHFProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          name="tokenName"
          label="Token Name"
          rules={{ required: "Token Name is required" }}
        />
        <Input
          name="tokenTicker"
          label="Token Ticker"
          rules={{ required: "Token Ticker is required" }}
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
        />

        <button type="submit" className="btn btn-primary">
          Next
        </button>
      </form>
    </RHFProvider>
  );
};

export default TokenInfoStep;
