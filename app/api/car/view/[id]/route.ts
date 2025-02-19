import { NextResponse } from "next/server";
import { prisma } from "@/prisma/primsa";
interface user {
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
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  try{
        const user: user = JSON.parse(req.headers.get("X-User-Id") || "{}");
             if (!user) {
               return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
             }
         
            const carsDisplay = await prisma.car.findUnique({
                where: { id },
            });
            const bookedUserIds = carsDisplay?.bookedUserIds || [];
            const isUserBooked = bookedUserIds.includes(user.id);
            return NextResponse.json({ success: true, data: carsDisplay,isAlreadyBookedByUser: isUserBooked});
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}