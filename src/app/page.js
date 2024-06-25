"use client";

import React from "react";
import axios from "axios";

export default function Page() {
  const handleClick = async () => {
    try {
      const response = await axios.post("/api/payrequest", {
        merchantTransactionId: "MT7850590068188104",
        merchantUserId: "MUID123",
        mobileNumber: "9999999999",
        amount: 100,
      });

      window.open(
        response.data.data.instrumentResponse.redirectInfo.url,
        "_blank"
      );
    } catch (error) {
      console.error("Error making API request:", error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
