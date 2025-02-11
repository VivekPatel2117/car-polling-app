import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/prisma/primsa";

interface User {
  id: string;
  username: string;
  emial: string;
  profile: string;
}

try {
  await prisma.$connect();
  console.log("✅ Prisma successfully connected to MongoDB!");
} catch (error) {
  console.log("❌ Failed to connect to MongoDB:", error);
}

export async function POST(req: NextRequest) {
  try {
    const user: User = JSON.parse(req.headers.get("X-User-Id") || "{}");
    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { start_date, end_date, car_id } = await req.json();
    if (!start_date || !end_date || !car_id) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    const response = await prisma.booking.create({
      data: {
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        car_id: car_id,
        user_id: user.id,
      },
    });
    return NextResponse.json(
      { success: true, booking: response },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: JSON.stringify(error) },
      { status: 500 }
    );
  }
}
