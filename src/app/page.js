"use client";

import React from "react";
import axios from "axios";
import crypto from "crypto-js";

export default function Page() {
  const handleClick = async () => {
    try {
      const data = {
        merchantId: "PGTESTPAYUAT86",
        merchantTransactionId: "MT7850590068188104",
        merchantUserId: "MUID123",
        amount: 100,
        redirectUrl: "https://webhook.site/redirect-url",
        redirectMode: "REDIRECT",
        callbackUrl: "https://webhook.site/callback-url",
        mobileNumber: "9999999999",
        paymentInstrument: {
          type: "PAY_PAGE",
        },
      };

      const data1 = JSON.stringify(data);
      const base64data = Buffer.from(data1).toString("base64");

      const hash = crypto
        .SHA256(
          base64data + "/pg/v1/pay" + "96434309-7796-489d-8924-ab56988a6076"
        )
        .toString(crypto.enc.Hex);
      const verify = hash + "###" + "1";
      console.log("Verify:", verify);
      console.log("Base64 Data:", base64data);

      const apiUrl =
        "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
      const headers = {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": verify,
      };

      const response = await axios.post(
        apiUrl,
        { request: base64data },
        { headers }
      );

      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
