import { createBooking } from "./booking";
import { checkAvailability } from "./availability";

async function test() {
  const restaurantId = 1;
  const timeSlotId = 1;
  const date = new Date("2026-06-01");
  const userId = 1;

  // Test 1: Successful booking
  const result1 = await createBooking(
    restaurantId,
    userId,
    timeSlotId,
    date,
    3,
  );
  console.log("Test 1 - Valid booking:", result1);
  // Expected: { success: true, confirmationCode: "RES-XXXXXX" }

  // Test 2: Check spots decreased
  const availability = await checkAvailability(restaurantId, timeSlotId, date);
  console.log("Test 2 - Spots left after booking of 3:", availability);
  // Expected: { available: true, spotsLeft: 5 }

  // Test 3: Party size too large for remaining spots
  const result3 = await createBooking(
    restaurantId,
    userId,
    timeSlotId,
    date,
    6,
  );
  console.log("Test 3 - Party too large for remaining spots:", result3);
  // Expected: { success: false, error: "Only 5 spot(s) left..." }

  // Test 4: Past date
  const result4 = await createBooking(
    restaurantId,
    userId,
    timeSlotId,
    new Date("2020-01-01"),
    2,
  );
  console.log("Test 4 - Past date:", result4);
  // Expected: { success: false, error: "Cannot book a date in the past." }

  // Test 5: Invalid party size
  const result5 = await createBooking(
    restaurantId,
    userId,
    timeSlotId,
    date,
    0,
  );
  console.log("Test 5 - Invalid party size:", result5);
  // Expected: { success: false, error: "Party size must be between 1 and 8." }
}

test().catch(console.error);
