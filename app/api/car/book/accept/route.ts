import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/prisma/primsa";
import { bookingAccepted } from "@/lib/booking"; // Import the mail function

try {
  await prisma.$connect();
  console.log("✅ Prisma successfully connected to MongoDB!");
} catch (error) {
  console.log("❌ Failed to connect to MongoDB:", error);
}

export async function POST(req: NextRequest) {
  try {
    const { booking_id } = await req.json();
    if (!booking_id) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    // Fetch booking details
    const booking = await prisma.booking.findUnique({
      where: { id: booking_id },
      include: { car: { include: { user: true } }, user: true },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // Update booking status to accepted
    const updatedBooking = await prisma.booking.update({
      where: { id: booking_id },
      data: {
        accepted: true,
        status: 'accepted',
      },
    });

    // Send email to the user who requested the booking
    await bookingAccepted(
      booking.user.email, 
      booking.user.username,
      booking.start_date.toISOString(),
      booking.end_date.toISOString(),
      booking.car.company,
      booking.car.model,
      Math.ceil((new Date(booking.end_date).getTime() - new Date(booking.start_date).getTime()) / (1000 * 60 * 60 * 24)), // Calculate days
      booking.car.price,
      booking.car.price * Math.ceil((new Date(booking.end_date).getTime() - new Date(booking.start_date).getTime()) / (1000 * 60 * 60 * 24)) // Total bill
    );

    return NextResponse.json(
      { success: true, booking: updatedBooking },
      { status: 200 }
    );
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: JSON.stringify(error) },
      { status: 500 }
    );
  }
}
