import express from "express";
import cors from "cors";
import { checkAvailability } from "../lib/availability.ts";
import { createBooking } from "../lib/booking.ts";
import { cancelBooking } from "../lib/cancel.ts";
import { prisma } from "../lib/prisma.ts";

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// GET /api/availability?restaurantId=1&timeSlotId=1&date=2026-06-01
app.get("/api/availability", async (req, res) => {
  const { restaurantId, timeSlotId, date } = req.query;

  if (!restaurantId || !timeSlotId || !date) {
    res
      .status(400)
      .json({ error: "restaurantId, timeSlotId, and date are required." });
    return;
  }

  const result = await checkAvailability(
    Number(restaurantId),
    Number(timeSlotId),
    new Date(String(date)),
  );

  res.json(result);
});

// POST /api/bookings
// Body: { restaurantId, userId, timeSlotId, date, partySize }
app.post("/api/bookings", async (req, res) => {
  const { restaurantId, userId, timeSlotId, date, partySize } = req.body;

  if (!restaurantId || !userId || !timeSlotId || !date || !partySize) {
    res.status(400).json({
      error:
        "restaurantId, userId, timeSlotId, date, and partySize are required.",
    });
    return;
  }

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
});

// DELETE /api/bookings/:id
// Body: { userId }
app.delete("/api/bookings/:id", async (req, res) => {
  const bookingId = Number(req.params.id);
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ error: "userId is required." });
    return;
  }

  const result = await cancelBooking(bookingId, Number(userId));

  if (!result.success) {
    res.status(409).json({ error: result.error });
    return;
  }

  res.json({ success: true });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// GET /api/bookings/lookup?confirmationCode=RES-XXXXXX
app.get("/api/bookings/lookup", async (req, res) => {
  const { confirmationCode } = req.query;

  if (!confirmationCode) {
    res.status(400).json({ error: "confirmationCode is required." });
    return;
  }

  const booking = await prisma.booking.findUnique({
    where: { confirmationCode: String(confirmationCode) },
  });

  if (!booking) {
    res.status(404).json({ error: "Booking not found." });
    return;
  }

  if (booking.status === "cancelled") {
    res.status(409).json({ error: "This booking has already been cancelled." });
    return;
  }

  res.json({ id: booking.id });
});
