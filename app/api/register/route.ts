import bcrypt from 'bcryptjs';
import { prisma } from '@/prisma/primsa';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    try {
      await prisma.$connect();
      console.log("✅ Prisma successfully connected to MongoDB!");
    } catch (error) {
      console.error("❌ Failed to connect to MongoDB:", error);
    } 
    const { email, password, username, profile } = await request.json();
    // Check if email and password are provided
    if (!email || !password || !username || !profile) {
      return new Response('Email, password, username, and profile are required', { status: 400 });
    }
    // Check if user already exists by email
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // If user already exists
    if (existingUser) {
      return new Response('Email already in use', { status: 409 });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        profile,
      },
    });

    // Return success response with user data (excluding password)
    return new Response(JSON.stringify({ id: user.id, username: user.username, email: user.email, profile: user.profile }), {
      status: 201,
    });
  } catch (error) {
    return new Response(`Internal Server Error ${JSON.stringify(error)}`, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
