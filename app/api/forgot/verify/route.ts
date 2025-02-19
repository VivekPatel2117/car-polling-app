import { NextResponse, NextRequest } from "next/server";
import sendOtp from "@/lib/sendOtp";

export async function POST(req:NextRequest) {
  try {
     const { otp } = await req.json();
     const returned = await sendOtp.validateOtp(otp);
     if(returned){
        console.log(returned);
        return NextResponse.json({ email:returned.email },{ status: 201});
     }else{
        return NextResponse.json({ success: false },{status: 400});
     }
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
