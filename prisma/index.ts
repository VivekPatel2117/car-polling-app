import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Prisma successfully connected to MongoDB!");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
