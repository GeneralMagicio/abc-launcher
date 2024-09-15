import { FactoryType, GetUserArgs } from "@inverter-network/sdk";

export type UserArgs<FT extends FactoryType> = GetUserArgs<
  {
    fundingManager: "FM_BC_Bancor_Redeeming_VirtualSupply_v1";
    authorizer: "AUT_Roles_v1";
    paymentProcessor: "PP_Simple_v1";
  },
  FT
>;
