import Image from "next/image";
import { ConnectButton } from "./ConnectButton/ConnectButton";

export const Header = () => {
  return (
    <nav className="bg-white flex items-center justify-between p-6 gap-4">
      <div className="flex gap-4 items-center">
        <Image
          src="/images/icons/logomark-dark.svg"
          alt="logo"
          width={87}
          height={40}
        />
        <Image src="/images/icons/x.svg" alt="x" height={14} width={14} />
        <Image
          src="/images/icons/giveth.svg"
          alt="giveth-logo"
          height={48}
          width={48}
        />
      </div>
      <ConnectButton />
    </nav>
  );
};
