import { createBooking } from "../src/lib/booking.ts";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const { restaurantId, userId, timeSlotId, date, partySize } = req.body;

  if (!restaurantId || !userId || !timeSlotId || !date || !partySize) {
    res.status(400).json({ error: "All fields are required." });
    return;
  }

  try {
    const result = await createBooking(
      Number(restaurantId),
      Number(userId),
      Number(timeSlotId),
      new Date(String(date)),
      Number(partySize),
    );

    if (!result.success) {
      res.status(409).json({ error: result.error });
      return;
    }

    res.status(201).json({ confirmationCode: result.confirmationCode });
  } catch (e) {
    res.status(500).json({ error: "Something went wrong." });
  }
}
