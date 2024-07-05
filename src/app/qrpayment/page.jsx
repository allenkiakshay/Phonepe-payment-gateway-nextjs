"use client";

import React from "react";
import axios from "axios";
import QRCode from "qrcode.react";

export default function Page() {
  const size = 128;
  const [qrData, setQrData] = React.useState(null);
  const handleClick = async () => {
    try {
      const response = await axios.post("/api/payqrrequest", {
        merchantTransactionId: "MT7850590068188104",
        merchantUserId: "MUID123",
        mobileNumber: "9999999999",
        amount: 100,
      });

      setQrData(response.data.data.instrumentResponse.intentUrl);
    } catch (error) {
      console.error("Error making API request:", error);
    }
  };

  return (
    <div className="flex flex-col justify-start items-start gap-40">
      <button onClick={handleClick}>Click me</button>
      {qrData && <QRCode value={qrData} size={size} />}

      <a href={qrData} target="_blank">
        Pay Using UPI Apps
      </a>
    </div>
  );
}
