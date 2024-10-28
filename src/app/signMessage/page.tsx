"use client";
import { TERMS_AND_CONDITIONS_TEXT } from "@/constants/signAndSubmit";
import { useSignAndSubmit } from "@/hooks/useSignAndSubmit";
import React from "react";

export default function SignMessage() {
  const { signAndSubmit } = useSignAndSubmit();
  const haneleSignMessage = async () => {
    const res = await signAndSubmit.mutateAsync({
      message: TERMS_AND_CONDITIONS_TEXT,
      type: "terms",
    });
    console.log(res);
  };
  return (
    <main className="container text-center">
      <div className="p-10 bg-white rounded-2xl shadow-sm flex flex-col items-center gap-4 max-w-3xl mx-auto">
        <button onClick={haneleSignMessage} className="btn btn-primary">
          Sign Message
        </button>
      </div>
    </main>
  );
}
