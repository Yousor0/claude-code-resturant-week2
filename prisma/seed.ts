import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import * as dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const restaurant1 = await prisma.restaurant.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "The Golden Fork",
      timeSlots: {
        create: [
          { slotTime: "17:00" },
          { slotTime: "17:30" },
          { slotTime: "18:00" },
          { slotTime: "18:30" },
          { slotTime: "19:00" },
          { slotTime: "19:30" },
          { slotTime: "20:00" },
        ],
      },
    },
  });

  const restaurant2 = await prisma.restaurant.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Casa Bella",
      timeSlots: {
        create: [
          { slotTime: "18:00" },
          { slotTime: "18:30" },
          { slotTime: "19:00" },
          { slotTime: "19:30" },
          { slotTime: "20:00" },
          { slotTime: "20:30" },
        ],
      },
    },
  });

  console.log(`Seeded restaurants: ${restaurant1.name}, ${restaurant2.name}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
