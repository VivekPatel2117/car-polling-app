import { NextResponse, NextRequest } from "next/server";
import sendOtp from "@/lib/sendOtp";

export async function POST(req:NextRequest) {
  try {
     const { email } = await req.json();
     const returned = await sendOtp.sendOtpForAuthentication(email);
     if(returned !== undefined){
        console.log(returned);
     }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
