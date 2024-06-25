"use server";

import { NextResponse } from "next/server";
import crypto from "crypto-js";
import axios from "axios";

export async function POST(req) {
  try {
    const data = await req.json();
    const apidata = {
      merchantId: process.env.NEXT_API_MERCHANT_ID,
      merchantTransactionId: data.merchantTransactionId,
      merchantUserId: data.merchantUserId,
      amount: data.amount,
      redirectUrl: `http://localhost:3000/api/paystatus`,
      redirectMode: "POST",
      callbackUrl: "http://localhost:3000/api/paystatus",
      mobileNumber: data.mobileNumber,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
    const data2 = JSON.stringify(apidata);
    const base64data = Buffer.from(data2).toString("base64");

    const hash = crypto
      .SHA256(base64data + "/pg/v1/pay" + process.env.NEXT_API_MERCHANT_KEY)
      .toString(crypto.enc.Hex);
    const verify = hash + "###" + process.env.NEXT_API_MERCHANT_VERSION;

    const response = await axios.post(
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
      { request: base64data },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "X-VERIFY": verify,
        },
      }
    );

    return NextResponse.json({ message: "Success", data: response.data.data });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}
