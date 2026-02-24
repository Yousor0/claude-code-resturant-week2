/*
  Warnings:

  - A unique constraint covering the columns `[confirmationCode]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[restaurantId,slotTime]` on the table `TimeSlot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Booking_confirmationCode_key" ON "Booking"("confirmationCode");

-- CreateIndex
CREATE INDEX "Booking_restaurantId_timeSlotId_date_idx" ON "Booking"("restaurantId", "timeSlotId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "TimeSlot_restaurantId_slotTime_key" ON "TimeSlot"("restaurantId", "slotTime");
