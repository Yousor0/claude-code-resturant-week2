import { prisma } from "./prisma";

const MAX_CAPACITY = 8;

function normalizeDate(date: Date): Date {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
}

function generateConfirmationCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const code = Array.from({ length: 6 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length)),
  ).join("");
  return `RES-${code}`;
}

async function createUniqueConfirmationCode(): Promise<string> {
  while (true) {
    const code = generateConfirmationCode();
    const existing = await prisma.booking.findUnique({
      where: { confirmationCode: code },
    });
    if (!existing) return code;
  }
}

export async function createBooking(
  restaurantId: number,
  userId: number,
  timeSlotId: number,
  date: Date,
  partySize: number,
): Promise<{ success: boolean; confirmationCode?: string; error?: string }> {
  // Validate party size
  if (partySize < 1 || partySize > 8) {
    return { success: false, error: "Party size must be between 1 and 8." };
  }

  // Check date is not in the past
  const normalizedDate = normalizeDate(date);
  const today = normalizeDate(new Date());
  if (normalizedDate < today) {
    return { success: false, error: "Cannot book a date in the past." };
  }

  // Generate unique confirmation code before transaction
  const confirmationCode = await createUniqueConfirmationCode();

  try {
    const booking = await prisma.$transaction(async (tx) => {
      // Check availability inside transaction to prevent race conditions
      const result = await tx.booking.aggregate({
        where: {
          restaurantId,
          timeSlotId,
          date: normalizedDate,
          status: { in: ["pending", "confirmed"] },
        },
        _sum: { partySize: true },
      });

      const spotsBooked = result._sum.partySize ?? 0;
      const spotsLeft = MAX_CAPACITY - spotsBooked;

      if (spotsLeft <= 0) {
        throw new Error("No spots available for this time slot.");
      }

      if (partySize > spotsLeft) {
        throw new Error(`Only ${spotsLeft} spot(s) left for this time slot.`);
      }

      return tx.booking.create({
        data: {
          restaurantId,
          userId,
          timeSlotId,
          date: normalizedDate,
          partySize,
          status: "pending",
          confirmationCode,
        },
      });
    });

    return { success: true, confirmationCode: booking.confirmationCode };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
