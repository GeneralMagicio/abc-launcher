import { type FC } from "react";
import Modal, { BaseModalProps } from "./Modal";
import Link from "next/link";
import { Button } from "./Button";

interface MintErrorModalProps extends BaseModalProps {}

export const MintErrorModal: FC<MintErrorModalProps> = (props) => {
  return (
    <Modal {...props} title="We encountered an issue" className="max-w-2xl">
      <div className="flex flex-col gap-3 text-xl max-w-2xl">
        <p>Sorry, we couldn’t deploy your NFT smart contract.</p>
        <div className="bg-[#F7F7F9;] mt-1 px-6 py-4 rounded-2xl">
          <p>
            Try again, and if there are still issues, please contact{" "}
            <Link
              href="mailto:qacc@giveth.io"
              className="text-pink-600 hover:opacity-85"
            >
              qacc@giveth.io.
            </Link>
          </p>
        </div>
        <div className="flex items-end justify-end pt-3">
          <Button
            type="submit"
            onClick={() => props.onClose()}
            className={`btn btn-primary inline-flex`}
          >
            Try again
          </Button>
        </div>
      </div>
    </Modal>
  );
};
