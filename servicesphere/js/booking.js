/* ============================================================
   SERVICE SPHERE — BOOKING CONTROLLER (js/booking.js)
   Saves bookings to localStorage and confirms with booking ID
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initBookingPage();
});

function initBookingPage() {
  const providers = getStoredProviders();
  const providerSelect = document.getElementById("booking-provider");
  const serviceCategorySelect = document.getElementById("booking-service");
  const dateInput = document.getElementById("booking-date");

  // Prevent past dates
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  // Populate provider dropdown
  if (providerSelect) {
    providerSelect.innerHTML = `<option value="">-- Choose an Unnao Service Provider --</option>` +
      providers.map(p => `
        <option value="${p.id}" data-category="${escapeHtml(p.category)}" data-location="${escapeHtml(p.location)}">
          ${escapeHtml(p.name)} (${escapeHtml(p.category)} - ${escapeHtml(p.location)})
        </option>
      `).join("");
  }

  // Populate service categories dropdown
  if (serviceCategorySelect) {
    serviceCategorySelect.innerHTML = `<option value="">-- Select Service Type --</option>` +
      SERVICES_DATA.map(s => `<option value="${escapeHtml(s.name)}">${escapeHtml(s.name)}</option>`).join("");
  }

  // Check URL param ?provider=...
  const urlParams = new URLSearchParams(window.location.search);
  const providerParam = urlParams.get("provider");
  if (providerParam && providerSelect) {
    providerSelect.value = providerParam;
    const selectedProvider = providers.find(p => p.id === providerParam);
    if (selectedProvider && serviceCategorySelect) {
      serviceCategorySelect.value = selectedProvider.category;
    }
  }

  // When provider changes, sync service category
  if (providerSelect) {
    providerSelect.addEventListener("change", () => {
      const pId = providerSelect.value;
      const selectedProvider = providers.find(p => p.id === pId);
      if (selectedProvider && serviceCategorySelect) {
        serviceCategorySelect.value = selectedProvider.category;
      }
    });
  }

  // Pre-fill user details if logged in
  const currentUser = getCurrentUser();
  if (currentUser) {
    const nameInput = document.getElementById("customer-name");
    const contactInput = document.getElementById("customer-contact");
    const addressInput = document.getElementById("service-address");

    if (nameInput && currentUser.name) nameInput.value = currentUser.name;
    if (contactInput && (currentUser.email || currentUser.phone)) {
      contactInput.value = currentUser.phone || currentUser.email;
    }
    if (addressInput && currentUser.locality) {
      addressInput.value = `${currentUser.locality}, Unnao`;
    }
  }

  // Booking Form Submission
  const form = document.getElementById("service-booking-form");
  if (form) {
    form.addEventListener("submit", handleBookingSubmission);
  }
}

function handleBookingSubmission(e) {
  e.preventDefault();

  const providerId = document.getElementById("booking-provider").value;
  const serviceCategory = document.getElementById("booking-service").value;
  const customerName = document.getElementById("customer-name").value.trim();
  const customerContact = document.getElementById("customer-contact").value.trim();
  const bookingDate = document.getElementById("booking-date").value;
  const timeSlot = document.getElementById("booking-time-slot").value;
  const address = document.getElementById("service-address").value.trim();
  const notes = document.getElementById("booking-notes").value.trim();

  if (!providerId || !serviceCategory || !customerName || !customerContact || !bookingDate || !timeSlot || !address) {
    alert("Please fill in all required fields.");
    return;
  }

  const provider = getProviderById(providerId);
  const providerName = provider ? provider.name : "Service Provider";

  // Generate clean readable Booking ID
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const bookingId = `BK-UNN-${randomSuffix}`;

  const newBooking = {
    id: bookingId,
    providerId: providerId,
    providerName: providerName,
    service: serviceCategory,
    customerName: customerName,
    customerContact: customerContact,
    date: bookingDate,
    timeSlot: timeSlot,
    address: address,
    notes: notes || "No additional instructions provided.",
    status: "Pending", // Pending, Confirmed, Completed, Cancelled
    createdAt: new Date().toISOString()
  };

  const currentBookings = getStoredBookings();
  currentBookings.unshift(newBooking);
  saveBookings(currentBookings);

  // Show Confirmation Modal
  showBookingConfirmationModal(newBooking);
}

function showBookingConfirmationModal(booking) {
  const modal = document.getElementById("booking-confirmation-modal");
  if (!modal) {
    alert(`Booking Confirmed! Your Booking ID is ${booking.id}.`);
    window.location.href = "bookings.html";
    return;
  }

  const contentEl = document.getElementById("modal-booking-summary");
  if (contentEl) {
    contentEl.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="font-size: 2.5rem; margin-bottom: 8px;">✅</div>
        <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">Service Request Submitted</h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary);">Your request has been routed to <strong>${escapeHtml(booking.providerName)}</strong> in Unnao.</p>
      </div>

      <div style="background-color: var(--surface-alt); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 16px; margin-bottom: 20px; font-size: 0.88rem;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; border-bottom: 1px solid var(--border); padding-bottom: 6px;">
          <span style="color: var(--text-muted);">Booking Reference</span>
          <strong style="color: var(--accent);">${escapeHtml(booking.id)}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="color: var(--text-muted);">Service</span>
          <span>${escapeHtml(booking.service)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="color: var(--text-muted);">Scheduled Date</span>
          <span>${escapeHtml(booking.date)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="color: var(--text-muted);">Time Window</span>
          <span>${escapeHtml(booking.timeSlot)}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-muted);">Address</span>
          <span style="max-width: 220px; text-align: right;">${escapeHtml(booking.address)}</span>
        </div>
      </div>
    `;
  }

  modal.classList.add("active");
}
