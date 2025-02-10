import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface User {
  id: string;
  username: string;
  email: string;
  profile: string;
}

export async function GET(req: NextRequest) {
  try {
    const user: User = JSON.parse(req.headers.get("X-User-Id") || "{}");
    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userCars = await prisma.car.findMany({
      where: {
        createdBy: user.id,
      },
    });

    return NextResponse.json({ success: true, data: userCars });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: JSON.stringify(error)},
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user: User = JSON.parse(req.headers.get("X-User-Id") || "{}");
    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { carId, newPrice } = await req.json();
    if (!carId || typeof newPrice !== "number" || newPrice <= 0) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const updatedCar = await prisma.car.update({
      where: { id: carId, createdBy: user.id },
      data: { price: newPrice },
    });

    return NextResponse.json({ success: true, data: updatedCar });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
