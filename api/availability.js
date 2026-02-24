import { checkAvailability } from "../src/lib/availability.ts";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const { restaurantId, timeSlotId, date } = req.query;

  if (!restaurantId || !timeSlotId || !date) {
    res
      .status(400)
      .json({ error: "restaurantId, timeSlotId, and date are required." });
    return;
  }

  try {
    const result = await checkAvailability(
      Number(restaurantId),
      Number(timeSlotId),
      new Date(String(date)),
    );
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: "Something went wrong." });
  }
}
