import { type FC } from "react";
import Modal, { BaseModalProps } from "./Modal";
import Link from "next/link";

import config from "@/config/configuration";
import { IconArrowRight } from "./Icons/IconArrowRight";

interface TokenExistModalProps extends BaseModalProps {}

export const TokenExistModal: FC<TokenExistModalProps> = (props) => {
  return (
    <Modal {...props} title="Hold On!">
      <div className="flex flex-col gap-4 ">
        <p>You already lunched your token.</p>
        <Link
          href={config.gotToDashboardLink}
          className="w-2/4 font-bold text-xs border-none rounded-full py-4 px-10 flex gap-2 text-white bg-pink-500 hover:opacity-85"
          target="_blank"
        >
          <span>Go to My Dashboard</span>
          <IconArrowRight size={16} />
        </Link>
      </div>
    </Modal>
  );
};
