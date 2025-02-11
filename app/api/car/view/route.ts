import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
interface user {
  id: string;
  username: string;
  emial: string;
  profile: string;
}
export async function GET(req:NextRequest) {
  try {
     const user: user = JSON.parse(req.headers.get("X-User-Id") || "{}");
     if (!user) {
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
     }
 
    const carsDisplay = await prisma.car.findMany({
      where: {
        createdBy: {
          not: user.id,
        }
      },
    });

    return NextResponse.json({ success: true, data: carsDisplay });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
