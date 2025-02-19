import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server'
import { SignJWT } from 'jose';
import { prisma } from "@/prisma/primsa"


const SECRET_KEY = process.env.JWT_SECRET;
export async function POST(request: NextRequest) {
  try {
    try {
      await prisma.$connect();
      console.log("✅ Prisma successfully connected to MongoDB!");
    } catch (error) {
      console.error("❌ Failed to connect to MongoDB:", error);
    } 
    const { email, password } =await request.json();

    // Check if email and password are provided
    if (!email || !password) {
      return new Response('Email and password are required', { status: 400 });
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    // If user doesn't exist
    if (!user) {
      return new Response('Invalid email or password', { status: 401 });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password is incorrect
    if (!isPasswordValid) {
      return new Response('Invalid email or password', { status: 401 });
    }
    const encoder = new TextEncoder();
    const token = await new SignJWT({
      id: user.id,
      username: user.username,
      email:user.email,
      profile: user.profile
    })
    .setProtectedHeader({ alg: 'HS256' }) // Set the algorithm to HS256
    .sign(encoder.encode(SECRET_KEY!)); // Sign using the encoded secret key
  
    return new Response(JSON.stringify({ token: token, profile: user.profile}), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
