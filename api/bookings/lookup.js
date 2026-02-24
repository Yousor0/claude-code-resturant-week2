import { prisma } from "../../src/lib/prisma.ts";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const { confirmationCode } = req.query;

  if (!confirmationCode) {
    res.status(400).json({ error: "confirmationCode is required." });
    return;
  }

  try {
    const booking = await prisma.booking.findUnique({
      where: { confirmationCode: String(confirmationCode) },
    });

    if (!booking) {
      res.status(404).json({ error: "Booking not found." });
      return;
    }

    if (booking.status === "cancelled") {
      res
        .status(409)
        .json({ error: "This booking has already been cancelled." });
      return;
    }

    res.json({ id: booking.id });
  } catch (e) {
    res.status(500).json({ error: "Something went wrong." });
  }
}
