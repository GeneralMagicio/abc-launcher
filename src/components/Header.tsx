import Image from "next/image";

export const Header = () => {
  return (
    <div className="p-6 flex gap-4 items-center bg-white">
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
  );
};
