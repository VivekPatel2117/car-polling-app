import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/prisma/primsa";
import { bookingRequest, bookingRequested } from "@/lib/booking";

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

export async function POST(req: NextRequest) {
  try {
    const user: User = JSON.parse(req.headers.get("X-User-Id") || "{}");
    if (!user) {
           return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { start_date, end_date, car_id } = await req.json();
    if (!start_date || !end_date || !car_id) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Fetch car details and owner info
    const car = await prisma.car.findUnique({
      where: { id: car_id },
      include: { user: true },
    });

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    // Create booking entry in DB
    const response = await prisma.booking.create({
      data: {
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        car_id: car_id,
        user_id: user.id,
      },
    });
    await prisma.car.update({
      where: { id: car_id }, // Find the car with the provided carId
      data: {
        bookedUserIds: {
          push: user.id, // Add the bookingId to the bookedUserIds array
        },
      },
    });

    // Send email to the requester and car owner
    await Promise.all([
      bookingRequested(
        user.email,        
        user.username,     
        start_date,
        end_date,
        car.company,       
        car.model,         
        Math.ceil((new Date(end_date).getTime() - new Date(start_date).getTime()) / (1000 * 60 * 60 * 24)), // Total days
        car.price,         // Price per day
        car.price * Math.ceil((new Date(end_date).getTime() - new Date(start_date).getTime()) / (1000 * 60 * 60 * 24)) // Total bill
      ),
      bookingRequest(
        car.user.email,    // Car owner's email
        car.user.username, // Car owner's name
        start_date,
        end_date,
        car.company,       // Car name (Company)
        car.model,         // Car model
        Math.ceil((new Date(end_date).getTime() - new Date(start_date).getTime()) / (1000 * 60 * 60 * 24)), // Total days
        car.price,         // Price per day
        car.price * Math.ceil((new Date(end_date).getTime() - new Date(start_date).getTime()) / (1000 * 60 * 60 * 24)) // Total bill
      ),
    ]);

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
