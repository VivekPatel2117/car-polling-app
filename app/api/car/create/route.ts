import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/prisma/primsa";

interface user {
  id: string;
  username: string;
  emial: string;
  profile: string;
}
export async function POST(req: NextRequest) {
  try {
    try {
      await prisma.$connect();
      console.log("✅ Prisma successfully connected to MongoDB!");
    } catch (error) {
      console.error("❌ Failed to connect to MongoDB:", error);
    } 
    // Get user ID from headers
    const user: user = JSON.parse(req.headers.get("X-User-Id") || "{}");
    console.log("USER:", user);
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body safely
    let body;
    try {
      body = await req.json();
    } catch (error) {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const { model, type, company, price, image, location } = body;
    console.log("BODY:", body);
    // Validate required fields
    if (!model || !type || !company || !price || !image || !location) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Create a new car linked to the user
    const newCar = await prisma.car.create({
      data: {
        model,
        type,
        company,
        price: Number(price),
        image,
        location, 
        createdBy: user.id, // Use the string directly
      },
    });

    return NextResponse.json(
      { message: "Car created successfully", car: newCar },
      { status: 201 }
    );
  } catch (error) {
    // Ensure `error` is always an object
    return NextResponse.json(
      { error: error instanceof Error ? error : "Server error" },
      { status: 500 }
    );
  }
}
