import { checkAvailability } from "./availability";

async function test() {
  // Test with restaurant 1, time slot 1, a future date
  const result = await checkAvailability(1, 1, new Date("2026-06-01"));
  console.log("Availability result:", result);
  // Should print: { available: true, spotsLeft: 8 }
}

test().catch(console.error);
