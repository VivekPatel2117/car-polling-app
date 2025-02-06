import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";
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
    console.error("Error fetching cars:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
