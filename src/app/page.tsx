import { Button } from "@/components/Button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container text-center">
      <div className="flex flex-col">
        <div className="inline-block">
          <h1 className="text-5xl font-bold leading-normal whitespace-nowrap">
            Launch your token economy
          </h1>
          <p className="font-bold text-2xl mt-2">
            Create your regenerative economy with Augmented Bonding Curves.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex gap-4">
          <p className="text-2xl">
            Start the process by connecting your wallet
          </p>
        </div>
        <Button>Launch Token</Button>
      </div>
    </main>
  );
}
