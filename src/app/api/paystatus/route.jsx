import { NextResponse } from "next/server";
import sha256 from "crypto-js/sha256";
import axios from "axios";

export async function POST(req) {
  try {
    const data = await req.formData();

    const merchantId = data.get("merchantId");
    const transactionId = data.get("transactionId");
    const amount = data.get("amount");
    const providerReferenceId = data.get("providerReferenceId");

    const st = `/pg/v1/status/${merchantId}/${transactionId}${process.env.NEXT_API_MERCHANT_KEY}`;
    const dataSha256 = sha256(st).toString();
    const checksum = `${dataSha256}###${process.env.NEXT_API_MERCHANT_VERSION}`;

    const options = {
      method: "GET",
      url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${transactionId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": merchantId,
      },
    };

    const response = await axios.request(options);

    if (response.data.code === "PAYMENT_SUCCESS") {
      return NextResponse.redirect(`http://localhost:3000/success?transactionId=${transactionId}&amount=${amount}&providerReferenceId=${providerReferenceId}`, {
        status: 301,
      });
    } else {
      return NextResponse.redirect(`http://localhost:3000/failure?transactionId=${transactionId}&amount=${amount}&providerReferenceId=${providerReferenceId}`, {
        status: 301,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(`http://localhost:3000/failure?transactionId=${transactionId}&amount=${amount}&providerReferenceId=${providerReferenceId}`, { status: 301 });
  }
}
