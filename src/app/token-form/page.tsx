import React, { useState } from "react";
import { useForm } from "react-hook-form";

enum EFromSteps {
  TokenInfo = 1,
  Terms,
  Policy,
}

export default function TokenFormPage() {
  const [step, setStep] = useState(1);
  return (
    <main className="container text-center">
      <div className=" bg-white rounded-2xl flex flex-col items-center gap-24 max-w-3xl mx-auto">
        <div className=" pt-20 flex gap-10 max-w-96">
          <h1 className="text-5xl font-medium">Name your Token</h1>
        </div>
      </div>
    </main>
  );
}
