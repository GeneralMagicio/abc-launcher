import {
  GetUserArgs,
  PopWalletClient,
  RequestedModules,
  type Inverter,
} from "@inverter-network/sdk";

const requestedModules = {
  fundingManager: "FM_BC_Restricted_Bancor_Redeeming_VirtualSupply_v1",
  authorizer: "AUT_Roles_v1",
  paymentProcessor: "PP_Streaming_v1",
  optionalModules: ["LM_PC_PaymentRouter_v1"],
} as const satisfies RequestedModules;
export const callInverter = async (sdk: Inverter<PopWalletClient>) => {
  const { run } = await sdk.getDeploy(requestedModules);
  const userArgs: GetUserArgs<typeof requestedModules> = {
    fundingManager: {
      bondingCurveParams: {
        formula: "0x3ddE767F9DF9530DDeD47e1E012cCBf7B4A04dd7",
        reserveRatioForBuying: "333333",
        reserveRatioForSelling: "333333",
        buyFee: "0",
        sellFee: "100",
        buyIsOpen: true,
        sellIsOpen: true,
        initialIssuanceSupply: "1",
        initialCollateralSupply: "3",
      },
      issuanceToken: {
        name: "MG Token",
        symbol: "MG",
        decimals: "18",
        maxSupply: "1000000",
      },
      tokenAdmin: "0x5AeeA3DF830529a61695A63ba020F01191E0aECb",
      collateralToken: "0x71bd16Dd7A120a12a27439F5D3767Be795d4A991",
    },
    authorizer: {
      initialAdmin: "0x7AcaF5360474b8E40f619770c7e8803cf3ED1053", // should correspond to your deployer EOA for ease of configuration initially and represents the orchestrator admin
    },
  } as const;

  const txHash = await run(userArgs);
};
