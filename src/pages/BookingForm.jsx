import { useState } from "react";

const TIME_SLOTS = [
  { id: 1, time: "17:00" },
  { id: 2, time: "17:30" },
  { id: 3, time: "18:00" },
  { id: 4, time: "18:30" },
  { id: 5, time: "19:00" },
  { id: 6, time: "19:30" },
  { id: 7, time: "20:00" },
];

const RESTAURANT_ID = 1;
const USER_ID = 1;

export default function BookingForm() {
  const [screen, setScreen] = useState("booking");
  const [timeSlotId, setTimeSlotId] = useState(1);
  const [date, setDate] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);
  const [cancelCode, setCancelCode] = useState("");
  const [cancelBookingId, setCancelBookingId] = useState(null);

  const today = new Date().toISOString().split("T")[0];
  const selectedSlot = TIME_SLOTS.find((s) => s.id === timeSlotId);

  async function handleCheckAvailability() {
    setLoading(true);
    setError(null);
    setAvailability(null);
    try {
      const res = await fetch(
        `/api/availability?restaurantId=${RESTAURANT_ID}&timeSlotId=${timeSlotId}&date=${date}`,
      );
      const data = await res.json();
      if (!res.ok) setError(data.error || "Something went wrong.");
      else setAvailability(data);
    } catch {
      setError(
        "Unable to check availability. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleBookNow() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantId: RESTAURANT_ID,
          userId: USER_ID,
          timeSlotId,
          date,
          partySize,
        }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Something went wrong.");
      else {
        setBooking({
          confirmationCode: data.confirmationCode,
          date,
          timeSlotId,
          partySize,
        });
        setScreen("confirmation");
      }
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLookupCancel() {
    if (!cancelCode.trim()) {
      setError("Please enter a confirmation code.");
      return;
    }

    const codePattern = /^RES-[A-Z0-9]{6}$/;
    if (!codePattern.test(cancelCode.trim().toUpperCase())) {
      setError("Invalid code format. Expected format: RES-XXXXXX.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/bookings/lookup?confirmationCode=${cancelCode.trim().toUpperCase()}`,
      );
      const data = await res.json();
      if (!res.ok) setError(data.error || "Booking not found.");
      else setCancelBookingId(data.id);
    } catch {
      setError(
        "Unable to reach the server. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmCancel() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/bookings/${cancelBookingId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: USER_ID }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Something went wrong.");
      else setScreen("cancelled");
    } catch {
      setError(
        "Unable to reach the server. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setDate("");
    setTimeSlotId(1);
    setPartySize(2);
    setAvailability(null);
    setBooking(null);
    setError(null);
    setCancelCode("");
    setCancelBookingId(null);
    setScreen("booking");
  }

  function handleDateChange(e) {
    setDate(e.target.value);
    setAvailability(null);
    setError(null);
    setLoading(false);
  }
  function handleSlotChange(id) {
    setTimeSlotId(id);
    setAvailability(null);
    setError(null);
  }
  function handlePartySizeChange(n) {
    setPartySize(n);
    setError(null);
    if (availability && availability.available && n > availability.spotsLeft) {
      setError(
        `Only ${availability.spotsLeft} spot${availability.spotsLeft !== 1 ? "s" : ""} available — please choose a smaller party size.`,
      );
    }
  }

  // --- Cancelled screen ---
  if (screen === "cancelled") {
    return (
      <div style={s.page}>
        <div style={s.card}>
          <div style={s.cardHeader}>
            <p style={s.subtitle}>Reservation Removed</p>
            <h2 style={s.title}>Booking Cancelled</h2>
            <div style={s.divider}>
              <span style={s.dividerIcon}>✦</span>
            </div>
            <p style={s.desc}>
              Your booking has been successfully cancelled. We hope to see you
              another time.
            </p>
          </div>
          <div style={s.cardBody}>
            <button style={s.primaryBtn} onClick={handleReset}>
              Make a New Booking
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Cancel screen ---
  if (screen === "cancel") {
    return (
      <div style={s.page}>
        <div style={s.card}>
          <div style={s.cardHeader}>
            <p style={s.subtitle}>Manage Reservation</p>
            <h2 style={s.title}>Cancel a Booking</h2>
            <div style={s.divider}>
              <span style={s.dividerIcon}>✦</span>
            </div>
          </div>
          <div style={s.cardBody}>
            <div style={s.field}>
              <label style={s.label}>Confirmation Code</label>
              <input
                type="text"
                placeholder="e.g. RES-ABC123"
                style={s.input}
                value={cancelCode}
                onChange={(e) => {
                  setCancelCode(e.target.value);
                  setCancelBookingId(null);
                  setError(null);
                }}
              />
            </div>

            {error && (
              <div style={s.errorBox}>
                <p style={s.errorText}>✕ {error}</p>
              </div>
            )}

            {cancelBookingId && (
              <div style={s.warningBox}>
                <p style={s.warningText}>
                  ⚠ This will permanently cancel your booking. This cannot be
                  undone.
                </p>
              </div>
            )}

            {!cancelBookingId ? (
              <button
                style={{
                  ...s.primaryBtn,
                  opacity: !cancelCode || loading ? 0.5 : 1,
                  cursor: !cancelCode || loading ? "not-allowed" : "pointer",
                }}
                disabled={!cancelCode || loading}
                onClick={handleLookupCancel}
              >
                {loading ? "Looking up..." : "Find Booking"}
              </button>
            ) : (
              <button
                style={{
                  ...s.primaryBtn,
                  background: "#C41E24",
                  opacity: loading ? 0.5 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
                disabled={loading}
                onClick={handleConfirmCancel}
              >
                {loading ? "Cancelling..." : "Confirm Cancellation"}
              </button>
            )}

            <button style={s.ghostBtn} onClick={handleReset}>
              ← Back to Booking
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Confirmation screen ---
  if (screen === "confirmation") {
    return (
      <div style={s.page}>
        <div style={s.card}>
          <div style={s.cardHeader}>
            <p style={s.subtitle}>Reservation Confirmed</p>
            <h2 style={s.title}>You're All Set!</h2>
            <div style={s.divider}>
              <span style={s.dividerIcon}>✦</span>
            </div>
            <p style={s.desc}>
              We look forward to welcoming you to The Golden Dragon.
            </p>
          </div>
          <div style={s.cardBody}>
            <div style={s.codeBox}>
              <p style={s.codeLabel}>Your Confirmation Code</p>
              <p style={s.code}>{booking.confirmationCode}</p>
            </div>
            <div style={s.summaryBox}>
              {[
                ["Restaurant", "The Golden Dragon"],
                ["Date", booking.date],
                ["Time", selectedSlot?.time],
                [
                  "Guests",
                  `${booking.partySize} ${booking.partySize === 1 ? "guest" : "guests"}`,
                ],
              ].map(([key, val]) => (
                <div key={key} style={s.summaryRow}>
                  <span style={s.summaryKey}>{key}</span>
                  <span style={s.summaryVal}>{val}</span>
                </div>
              ))}
            </div>
            <button style={s.primaryBtn} onClick={handleReset}>
              Make Another Booking
            </button>
            <button
              style={s.ghostBtn}
              onClick={() => {
                setScreen("cancel");
                setCancelCode(booking.confirmationCode);
              }}
            >
              Cancel this Booking
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Booking screen ---
  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.cardHeader}>
          <p style={s.subtitle}>Reserve a Table</p>
          <h2 style={s.title}>Golden Dragon</h2>
          <div style={s.divider}>
            <span style={s.dividerIcon}>✦</span>
          </div>
          <p style={s.desc}>Select your date, time, and party size below</p>
        </div>

        <div style={s.cardBody}>
          {/* Date */}
          <div style={s.field}>
            <label style={s.label}>Date</label>
            <input
              type="date"
              style={s.input}
              value={date}
              min={today}
              onChange={handleDateChange}
            />
          </div>

          {/* Time */}
          <div style={s.field}>
            <label style={s.label}>Time</label>
            <div style={s.timeGrid}>
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot.id}
                  style={{
                    ...s.timeBtn,
                    ...(timeSlotId === slot.id ? s.timeBtnActive : {}),
                  }}
                  onClick={() => handleSlotChange(slot.id)}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>

          {/* Party Size */}
          <div style={s.field}>
            <label style={s.label}>
              Party Size — {partySize} {partySize === 1 ? "guest" : "guests"}
            </label>
            <div style={s.partyRow}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <button
                  key={n}
                  style={{
                    ...s.partyBtn,
                    ...(partySize === n ? s.partyBtnActive : {}),
                  }}
                  onClick={() => handlePartySizeChange(n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          {availability && (
            <div style={availability.available ? s.successBox : s.errorBox}>
              <p style={availability.available ? s.successText : s.errorText}>
                {availability.available
                  ? `✓ ${availability.spotsLeft} spot${availability.spotsLeft !== 1 ? "s" : ""} available`
                  : "✕ This time slot is fully booked"}
              </p>
            </div>
          )}

          {error && (
            <div style={s.errorBox}>
              <p style={s.errorText}>✕ {error}</p>
            </div>
          )}

          {!availability || !availability.available ? (
            <button
              style={{
                ...s.primaryBtn,
                opacity: !date || loading ? 0.5 : 1,
                cursor: !date || loading ? "not-allowed" : "pointer",
              }}
              disabled={!date || loading}
              onClick={handleCheckAvailability}
            >
              {loading ? "Checking..." : "Check Availability"}
            </button>
          ) : (
            <button
              style={{
                ...s.primaryBtn,
                opacity: loading ? 0.5 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
              disabled={loading}
              onClick={handleBookNow}
            >
              {loading
                ? "Booking..."
                : `Book Now — ${partySize} ${partySize === 1 ? "Guest" : "Guests"}`}
            </button>
          )}

          <button style={s.ghostBtn} onClick={() => setScreen("cancel")}>
            Cancel an existing booking
          </button>
        </div>
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    background: "#0f0f0f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', sans-serif",
    padding: "2rem",
  },
  card: {
    background: "#1a1a1a",
    border: "1px solid rgba(196, 30, 36, 0.2)",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "480px",
    overflow: "hidden",
  },
  cardHeader: {
    padding: "2.5rem 2.5rem 2rem",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    textAlign: "center",
  },
  cardBody: {
    padding: "2rem 2.5rem 2.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  subtitle: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "4px",
    color: "#F5C518",
    margin: "0 0 0.5rem",
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "2rem",
    fontWeight: 700,
    color: "#fff",
    margin: "0 0 1rem",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    margin: "0 0 1rem",
    position: "relative",
  },
  dividerIcon: {
    fontSize: "1rem",
    color: "#F5C518",
  },
  desc: {
    color: "#aaa",
    fontSize: "0.95rem",
    lineHeight: 1.7,
    margin: 0,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  },
  label: {
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "2px",
    color: "#888",
  },
  input: {
    background: "#111",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "6px",
    color: "#fff",
    padding: "0.75rem 1rem",
    fontSize: "0.95rem",
    fontFamily: "'Inter', sans-serif",
    outline: "none",
    colorScheme: "dark",
    transition: "border-color 0.2s",
  },
  timeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "0.5rem",
  },
  timeBtn: {
    background: "#111",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "6px",
    color: "#888",
    padding: "0.6rem",
    fontSize: "0.85rem",
    fontFamily: "'Inter', sans-serif",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  timeBtnActive: {
    background: "rgba(245, 197, 24, 0.15)",
    border: "1px solid #F5C518",
    color: "#F5C518",
  },
  partyRow: {
    display: "flex",
    gap: "0.5rem",
  },
  partyBtn: {
    background: "#111",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "6px",
    color: "#888",
    width: "44px",
    height: "44px",
    fontSize: "0.9rem",
    fontFamily: "'Inter', sans-serif",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  partyBtnActive: {
    background: "rgba(245, 197, 24, 0.15)",
    border: "1px solid #F5C518",
    color: "#F5C518",
  },
  successBox: {
    background: "rgba(34, 85, 51, 0.3)",
    border: "1px solid rgba(74, 124, 89, 0.5)",
    borderRadius: "6px",
    padding: "0.875rem 1rem",
  },
  successText: {
    margin: 0,
    fontSize: "0.875rem",
    color: "#6fbf8a",
    fontFamily: "'Inter', sans-serif",
  },
  errorBox: {
    background: "rgba(196, 30, 36, 0.15)",
    border: "1px solid rgba(196, 30, 36, 0.4)",
    borderRadius: "6px",
    padding: "0.875rem 1rem",
  },
  errorText: {
    margin: 0,
    fontSize: "0.875rem",
    color: "#e07070",
    fontFamily: "'Inter', sans-serif",
  },
  warningBox: {
    background: "rgba(196, 30, 36, 0.1)",
    border: "1px solid rgba(196, 30, 36, 0.3)",
    borderRadius: "6px",
    padding: "0.875rem 1rem",
  },
  warningText: {
    margin: 0,
    fontSize: "0.875rem",
    color: "#e07070",
    fontFamily: "'Inter', sans-serif",
  },
  primaryBtn: {
    background: "#C41E24",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    padding: "1rem",
    fontSize: "0.8rem",
    letterSpacing: "2px",
    textTransform: "uppercase",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  ghostBtn: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "6px",
    color: "#888",
    padding: "0.875rem",
    fontSize: "0.75rem",
    letterSpacing: "2px",
    textTransform: "uppercase",
    fontFamily: "'Inter', sans-serif",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  codeBox: {
    background: "#111",
    border: "1px solid rgba(196, 30, 36, 0.2)",
    borderRadius: "8px",
    padding: "1.5rem",
    textAlign: "center",
  },
  codeLabel: {
    fontSize: "0.7rem",
    letterSpacing: "3px",
    textTransform: "uppercase",
    color: "#888",
    margin: "0 0 0.5rem",
    fontFamily: "'Inter', sans-serif",
  },
  code: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "2rem",
    color: "#F5C518",
    margin: 0,
    letterSpacing: "0.1em",
  },
  summaryBox: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.75rem 0",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  summaryKey: {
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "2px",
    color: "#888",
    fontFamily: "'Inter', sans-serif",
  },
  summaryVal: {
    fontSize: "0.9rem",
    color: "#fff",
    fontFamily: "'Inter', sans-serif",
  },
};
