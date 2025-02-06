import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.create({
    data: {
      username: "vipul22", // Example username
      email: "vipul@example.com", // Example email
      password: "hashed_password", // Example password (ensure it's hashed)
      profile: "default_profile_url", // Example profile image URL or description
    },
  });

  console.log("New user created:", newUser);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
