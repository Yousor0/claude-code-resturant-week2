import { cancelBooking } from "../../src/lib/cancel.ts";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const bookingId = Number(req.query.id);
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ error: "userId is required." });
    return;
  }

  try {
    const result = await cancelBooking(bookingId, Number(userId));

    if (!result.success) {
      res.status(409).json({ error: result.error });
      return;
    }

    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Something went wrong." });
  }
}
