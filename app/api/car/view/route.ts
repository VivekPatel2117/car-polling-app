import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req:NextRequest) {
  try {
     // Get user ID from middleware-injected headers
     const user = req.headers.get("X-User-Id");
     console.log("USER",user,req)
     // return NextResponse.json(req,{status:201})
     if (!user) {
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
     }
 
    // Fetch all cars where `createdBy` is null
    const carsDisplay = await prisma.car.findMany({
      where: {
        createdBy: user, // Filtering cars where `createdBy` is NOT set
      },
    });

    return NextResponse.json({ success: true, data: carsDisplay });
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
