import { NextResponse, NextRequest } from "next/server";
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
    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all bookings for the logged-in user
    const bookings = await prisma.booking.findMany({
      where: { user_id: user.id },
      include: { car: true, user: true }, // Include car details
    });

    if (bookings.length === 0) {
      return NextResponse.json({ message: "No bookings found" }, { status: 200 });
    }

    return NextResponse.json({ success: true, bookings }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: JSON.stringify(error) },
      { status: 500 }
    );
  }
}
