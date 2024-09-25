import { type FC } from "react";
import Modal, { BaseModalProps } from "./Modal";
import { Button } from "./Button";

interface MintSucccessModalProps extends BaseModalProps {}

export const MintSuccessModal: FC<MintSucccessModalProps> = (props) => {
  return (
    <Modal {...props} title="Successfully launched" className="max-w-2xl">
      <div className="flex flex-col gap-3 text-xl max-w-2xl">
        <p>Your NFT has been successfully launched.</p>
        <div className="bg-[#F7F7F9;] mt-1 px-6 py-4 rounded-2xl">
          <p>Go to the q/acc knowledge hub to find the</p>
          <a
            href="https://app.charmverse.io/quadratic-accelerator/mint-early-access-nfts-6648690404742075"
            target="_blank"
            rel="noreferrer"
            className="text-pink-600 hover:opacity-85"
          >
            how-to guide for minting your early access NFTs.
          </a>
        </div>
        <div className="flex items-end justify-end pt-3">
          <Button
            type="submit"
            onClick={() => props.onClose()}
            className={`btn btn-primary inline-flex`}
          >
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  );
};
