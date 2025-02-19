import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/primsa";

interface User {
  id: string;
  username: string;
  email: string;
  profile: string;
}

try {
  await prisma.$connect();
  console.log("✅ Prisma successfully connected to MongoDB!");
} catch (error) {
  console.log("❌ Failed to connect to MongoDB:", error);
}

export async function GET(req: NextRequest) {
  try {
    const user: User = JSON.parse(req.headers.get("X-User-Id") || "{}");
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userInfo = await prisma.user.findUnique({
      where: { id: user.id },
    });

    return NextResponse.json(userInfo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user: User = JSON.parse(req.headers.get("X-User-Id") || "{}");
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { username, email } = await req.json();
    if (!username || !email) {
      return NextResponse.json(
        { error: "Username and email are required" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        email: email,
        username: username,
      },
    });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Profile updated", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
