/* ============================================================
   SERVICE SPHERE — MY BOOKINGS CONTROLLER (js/bookings.js)
   Unnao Customer Service Requests & History
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  renderMyBookings();
});

function renderMyBookings() {
  const container = document.getElementById("bookings-list-container");
  if (!container) return;

  const bookings = getStoredBookings();

  if (bookings.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div style="font-size: 2.2rem; margin-bottom: 12px;">📋</div>
        <h2 class="empty-state-title">No bookings yet</h2>
        <p class="empty-state-desc">You haven't requested any local services in Unnao yet. Browse our verified plumbers, electricians, cleaners, and technicians.</p>
        <a href="services.html" class="btn btn-primary">Explore Services</a>
      </div>
    `;
    return;
  }

  const listHtml = bookings.map(booking => {
    const statusBadge = formatStatusBadge(booking.status);
    const canCancel = booking.status === "Pending" || booking.status === "Confirmed";

    return `
      <div class="card" style="margin-bottom: 18px; padding: 22px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 14px; border-bottom: 1px solid var(--border); padding-bottom: 12px;">
          <div>
            <span class="badge badge-accent" style="margin-bottom: 6px;">Ref: ${escapeHtml(booking.id)}</span>
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">${escapeHtml(booking.service)} with ${escapeHtml(booking.providerName)}</h3>
          </div>
          <div>${statusBadge}</div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 16px;">
          <div>
            <strong style="color: var(--text-primary); display: block;">Scheduled Date & Time</strong>
            <span>📅 ${escapeHtml(booking.date)} &bull; ${escapeHtml(booking.timeSlot)}</span>
          </div>
          <div>
            <strong style="color: var(--text-primary); display: block;">Customer & Contact</strong>
            <span>👤 ${escapeHtml(booking.customerName)} (${escapeHtml(booking.customerContact)})</span>
          </div>
          <div>
            <strong style="color: var(--text-primary); display: block;">Service Address</strong>
            <span>📍 ${escapeHtml(booking.address)}</span>
          </div>
        </div>

        ${booking.notes ? `
          <div style="font-size: 0.84rem; background-color: var(--surface-alt); padding: 10px 14px; border-radius: var(--radius-sm); margin-bottom: 16px; border: 1px solid var(--border);">
            <strong style="color: var(--text-primary);">Notes / Problem:</strong> ${escapeHtml(booking.notes)}
          </div>
        ` : ""}

        <div style="display: flex; justify-content: flex-end; gap: 10px; border-top: 1px solid var(--border); padding-top: 12px;">
          ${canCancel ? `
            <button type="button" class="btn btn-secondary btn-sm" onclick="cancelBooking('${escapeHtml(booking.id)}')">
              Cancel Request
            </button>
          ` : ""}
          <a href="provider-details.html?id=${encodeURIComponent(booking.providerId)}" class="btn btn-secondary btn-sm">
            View Provider
          </a>
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = listHtml;
}

function cancelBooking(bookingId) {
  if (!confirm(`Are you sure you want to cancel booking ${bookingId}?`)) {
    return;
  }

  const bookings = getStoredBookings();
  const target = bookings.find(b => b.id === bookingId);
  if (target) {
    target.status = "Cancelled";
    saveBookings(bookings);
    renderMyBookings();
  }
}
