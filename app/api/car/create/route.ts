import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Get user ID from middleware-injected headers
    const user = req.headers.get("X-User-Id");
    console.log("USER",user,req)
    // return NextResponse.json(req,{status:201})
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { model, type, company, price, image } = body;

    // Validate required fields
    if (!model || !type || !company || !price || !image) {
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
        createdBy: user, 
      },
    });

    return NextResponse.json({ message: "Car created successfully", car: newCar }, { status: 201 });
  } catch (error) {
    console.error("Error creating car:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
