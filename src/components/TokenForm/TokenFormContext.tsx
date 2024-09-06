import React, { createContext, useContext, useState, ReactNode } from "react";
import { Address } from "viem";

interface FormData {
  tokenName: string;
  tokenTicker: string;
  tokenIcon: { file: File; ipfsHash: string } | null;
  projectAddress: Address;
  agreedToTerms: boolean;
  agreedToPolicy: boolean;
  addressConfirmed: boolean;
  issuanceTokenAddress?: Address;
  nftContractAddress?: Address;
  policyAcceptTime?: Date;
  mintedNft: boolean;
}

interface TokenFormContextType {
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
}

const TokenFormContext = createContext<TokenFormContextType | undefined>(
  undefined
);

export const TokenFormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formData, setFormDataState] = useState<FormData>({
    tokenName: "",
    tokenTicker: "",
    tokenIcon: null,
    projectAddress: "" as Address,
    agreedToTerms: false,
    agreedToPolicy: false,
    addressConfirmed: false,
    policyAcceptTime: undefined,
    mintedNft: false,
  });

  const setFormData = (data: Partial<FormData>) => {
    setFormDataState((prevData) => ({ ...prevData, ...data }));
  };

  return (
    <TokenFormContext.Provider value={{ formData, setFormData }}>
      {children}
    </TokenFormContext.Provider>
  );
};

export const useTokenFormContext = () => {
  const context = useContext(TokenFormContext);
  if (!context) {
    throw new Error(
      "useTokenFormContext must be used within a TokenFormProvider"
    );
  }
  return context;
};
