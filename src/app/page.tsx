import { Button } from "@/components/Button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container text-center flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-6 py-10">
        <h1 className="text-5xl	font-bold leading-normal">
          Launch your token economy
        </h1>
        <p className="font-semibold text-2xl max-w-[620px]">
          Create your regenerative economy with Augmented Bonding Curves.
        </p>
      </div>
      <div className="flex gap-4">
        <p className="text-2xl font-light">
          Start the process by connecting your wallet
        </p>
        <Image
          src="/images/icons/arrow-right.svg"
          alt="logo"
          width={32}
          height={32}
        />
      </div>
      <Button>Launch Token</Button>
    </main>
  );
}
