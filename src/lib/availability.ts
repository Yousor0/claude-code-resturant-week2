import { prisma } from "./prisma";

const MAX_CAPACITY = 8;

function normalizeDate(date: Date): Date {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
}

export async function checkAvailability(
  restaurantId: number,
  timeSlotId: number,
  date: Date,
): Promise<{ available: boolean; spotsLeft: number }> {
  const normalizedDate = normalizeDate(date);

  const result = await prisma.booking.aggregate({
    where: {
      restaurantId,
      timeSlotId,
      date: normalizedDate,
      status: { in: ["pending", "confirmed"] },
    },
    _sum: {
      partySize: true,
    },
  });

  const spotsBooked = result._sum.partySize ?? 0;
  const spotsLeft = MAX_CAPACITY - spotsBooked;

  return {
    available: spotsLeft > 0,
    spotsLeft,
  };
}
