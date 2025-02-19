import { sendAdminContact } from '@/lib/sendAdminEmail'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try{
        const { email, name, message } = await request.json();
        await sendAdminContact(email,message,name);
        return NextResponse.json({message: "Support Request Sent"})
    }catch(error){
        console.log(error)
    }
}