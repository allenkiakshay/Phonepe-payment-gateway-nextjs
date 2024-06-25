"use client";

import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();

  return (
    <div>
      <h1>Success</h1>
      <p>Transaction ID: {searchParams.get("transactionId")}</p>
      <p>Amount: {Number(searchParams.get("amount"))/100}</p>
      <p>Provider Reference ID: {searchParams.get("providerReferenceId")}</p>
    </div>
  );
}
