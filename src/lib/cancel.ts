import { prisma } from "./prisma";

export async function cancelBooking(
  bookingId: number,
  userId: number,
): Promise<{ success: boolean; error?: string }> {
  // Find the booking
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  // Check it exists
  if (!booking) {
    return { success: false, error: "Booking not found." };
  }

  // Check it belongs to this user
  if (booking.userId !== userId) {
    return {
      success: false,
      error: "You do not have permission to cancel this booking.",
    };
  }

  // Check it isn't already cancelled
  if (booking.status === "cancelled") {
    return { success: false, error: "Booking is already cancelled." };
  }

  // Cancel it
  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "cancelled" },
  });

  return { success: true };
}
