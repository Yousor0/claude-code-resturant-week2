import { createBooking } from "./booking";
import { cancelBooking } from "./cancel";
import { checkAvailability } from "./availability";

async function test() {
  const restaurantId = 1;
  const timeSlotId = 2;
  const date = new Date("2026-06-02");
  const userId = 1;

  // Create a booking to cancel
  const { confirmationCode } = await createBooking(
    restaurantId,
    userId,
    timeSlotId,
    date,
    4,
  );
  console.log("Setup - Created booking:", confirmationCode);

  // Check spots are reduced
  const before = await checkAvailability(restaurantId, timeSlotId, date);
  console.log("Test 1 - Spots before cancel:", before);
  // Expected: { available: true, spotsLeft: 4 }

  // Get the booking id (it'll be the latest one)
  const { PrismaPg } = await import("@prisma/adapter-pg");
  const { PrismaClient } = await import("../../generated/prisma/client");
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  const prisma = new PrismaClient({ adapter });
  const booking = await prisma.booking.findFirst({ orderBy: { id: "desc" } });

  // Test 2: Cancel with wrong user
  const result2 = await cancelBooking(booking!.id, 999);
  console.log("Test 2 - Wrong user:", result2);
  // Expected: { success: false, error: "You do not have permission..." }

  // Test 3: Cancel with correct user
  const result3 = await cancelBooking(booking!.id, userId);
  console.log("Test 3 - Valid cancel:", result3);
  // Expected: { success: true }

  // Test 4: Check spots restored
  const after = await checkAvailability(restaurantId, timeSlotId, date);
  console.log("Test 4 - Spots after cancel:", after);
  // Expected: { available: true, spotsLeft: 8 }

  // Test 5: Cancel already cancelled booking
  const result5 = await cancelBooking(booking!.id, userId);
  console.log("Test 5 - Already cancelled:", result5);
  // Expected: { success: false, error: "Booking is already cancelled." }

  // Test 6: Booking not found
  const result6 = await cancelBooking(99999, userId);
  console.log("Test 6 - Not found:", result6);
  // Expected: { success: false, error: "Booking not found." }
}

test().catch(console.error);
