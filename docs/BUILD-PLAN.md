## Phase 1 — Data & Models

1. Define the booking data model — sketch out the fields you need (restaurant ID, user ID, date/time, party size, status, confirmation code). No code yet, just agree on the shape.
2. Create the database table/schema — write and run the migration. Verify it exists with the correct columns and constraints.
3. Seed some test data — add a few restaurants and time slots so you have something to work with in later steps.

## Phase 2 — Core Logic

1. Build an availability checker — given a restaurant, date, and party size, return whether a slot is open. Test it directly against your seeded data.
2. Build the "create booking" function — inserts a record and returns a confirmation code. Test the happy path and a double-booking attempt.
3. Build the "cancel booking" function — updates status to cancelled and frees the slot. Test that availability reflects the change.

## Phase 3 — API Layer

1. GET /availability?restaurant_id&date&party_size — wire up the checker from step 4. Test with a REST client (Postman, curl, etc.).
2. POST /bookings — wire up the create function. Test success and conflict (409) responses.
3. DELETE /bookings/:id — wire up cancellation. Test that a second fetch of availability shows the slot open again.

## Phase 4 — UI

1. Date/time + party size picker — just the form inputs, no submission yet. Check it renders and feels right.
2. Availability display — call the API on form change and show open slots. Test with both available and fully booked scenarios.
3. Booking confirmation flow — submit the form, call POST /bookings, show the confirmation code. Test the full round trip.
4. Cancellation UI — a "cancel my booking" button on the confirmation or booking history screen. Test that it calls the API and updates the UI.

## Phase 5 — Polish

1. Validation & error states — past dates, party size limits, network errors. Make sure every error shows a helpful message.
2. Confirmation email/notification — trigger a message on successful booking. Test with a real address or a local mail catcher.
