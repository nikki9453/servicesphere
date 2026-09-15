/* ============================================================
   SERVICE SPHERE — PROVIDER DASHBOARD CONTROLLER (js/provider-dashboard.js)
   Unnao Provider Service Management & Request Dispatch
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initProviderDashboard();
});

let activeProvider = null;

function initProviderDashboard() {
  const currentUser = getCurrentUser();
  const providers = getStoredProviders();

  // Determine active provider profile
  if (currentUser && currentUser.role === "provider") {
    activeProvider = providers.find(p => p.id === currentUser.id) || providers[0];
  } else {
    // Default demo provider for evaluation: Hakim Electricals
    activeProvider = providers[0];
  }

  initProviderSelector(providers);
  renderDashboardHeader();
  renderDashboardStats();
  renderBookingRequests();
  initProfileEditForm();
}

function initProviderSelector(providers) {
  const selector = document.getElementById("active-provider-select");
  if (!selector) return;

  selector.innerHTML = providers.map(p => `
    <option value="${p.id}" ${p.id === activeProvider.id ? 'selected' : ''}>
      ${escapeHtml(p.name)} (${escapeHtml(p.category)})
    </option>
  `).join("");

  selector.addEventListener("change", () => {
    const selectedId = selector.value;
    activeProvider = providers.find(p => p.id === selectedId) || providers[0];

    // Update demo user session
    localStorage.setItem("service_sphere_user", JSON.stringify({
      id: activeProvider.id,
      name: activeProvider.name,
      category: activeProvider.category,
      location: activeProvider.location,
      role: "provider"
    }));

    renderDashboardHeader();
    renderDashboardStats();
    renderBookingRequests();
    initProfileEditForm();
  });
}

function renderDashboardHeader() {
  const nameEl = document.getElementById("dash-provider-name");
  const metaEl = document.getElementById("dash-provider-meta");
  const avatarEl = document.getElementById("dash-provider-avatar");

  if (nameEl) nameEl.textContent = activeProvider.name;
  if (metaEl) metaEl.textContent = `${activeProvider.category} • ${activeProvider.location}`;
  if (avatarEl) avatarEl.textContent = getInitials(activeProvider.name);
}

function renderDashboardStats() {
  const allBookings = getStoredBookings();
  
  // Filter bookings for this provider (or show all if academic prototype demo mode)
  const providerBookings = allBookings.filter(b => b.providerId === activeProvider.id);

  const pendingCount = providerBookings.filter(b => b.status === "Pending").length;
  const confirmedCount = providerBookings.filter(b => b.status === "Confirmed").length;
  const completedCount = providerBookings.filter(b => b.status === "Completed").length;

  const pendingEl = document.getElementById("stat-pending");
  const confirmedEl = document.getElementById("stat-confirmed");
  const completedEl = document.getElementById("stat-completed");
  const totalEl = document.getElementById("stat-total");

  if (pendingEl) pendingEl.textContent = pendingCount;
  if (confirmedEl) confirmedEl.textContent = confirmedCount;
  if (completedEl) completedEl.textContent = completedCount;
  if (totalEl) totalEl.textContent = providerBookings.length;
}

function renderBookingRequests() {
  const container = document.getElementById("provider-requests-container");
  if (!container) return;

  const allBookings = getStoredBookings();
  let providerBookings = allBookings.filter(b => b.providerId === activeProvider.id);

  // If no direct bookings for this provider in demo, check if any demo bookings exist to show
  if (providerBookings.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 32px; margin: 16px 0;">
        <p class="empty-state-title" style="font-size: 1.05rem;">No Active Requests</p>
        <p class="empty-state-desc">You have no pending or confirmed customer requests for ${escapeHtml(activeProvider.name)} at the moment.</p>
        <a href="booking.html?provider=${encodeURIComponent(activeProvider.id)}" class="btn btn-primary btn-sm">Create Demo Booking for this Provider</a>
      </div>
    `;
    return;
  }

  const listHtml = providerBookings.map(b => {
    const isPending = b.status === "Pending";
    const isConfirmed = b.status === "Confirmed";

    return `
      <div class="card" style="margin-bottom: 14px; padding: 18px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; border-bottom: 1px solid var(--border); padding-bottom: 10px;">
          <div>
            <span class="badge badge-accent">ID: ${escapeHtml(b.id)}</span>
            <strong style="margin-left: 8px; font-size: 1rem; color: var(--text-primary);">${escapeHtml(b.service)}</strong>
          </div>
          <div>${formatStatusBadge(b.status)}</div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 12px;">
          <div>
            <strong>Customer:</strong> ${escapeHtml(b.customerName)} (${escapeHtml(b.customerContact)})
          </div>
          <div>
            <strong>Date & Slot:</strong> ${escapeHtml(b.date)} • ${escapeHtml(b.timeSlot)}
          </div>
          <div>
            <strong>Location:</strong> ${escapeHtml(b.address)}
          </div>
        </div>

        ${b.notes ? `
          <div style="font-size: 0.82rem; background-color: var(--surface-alt); padding: 8px 12px; border-radius: var(--radius-sm); margin-bottom: 12px;">
            <strong>Customer Notes:</strong> ${escapeHtml(b.notes)}
          </div>
        ` : ""}

        <div style="display: flex; justify-content: flex-end; gap: 8px; border-top: 1px solid var(--border); padding-top: 10px;">
          ${isPending ? `
            <button type="button" class="btn btn-primary btn-sm" onclick="updateBookingStatus('${escapeHtml(b.id)}', 'Confirmed')">
              Accept Request
            </button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="updateBookingStatus('${escapeHtml(b.id)}', 'Cancelled')">
              Decline
            </button>
          ` : ""}
          ${isConfirmed ? `
            <button type="button" class="btn btn-primary btn-sm" onclick="updateBookingStatus('${escapeHtml(b.id)}', 'Completed')">
              Mark Completed
            </button>
          ` : ""}
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = listHtml;
}

function updateBookingStatus(bookingId, newStatus) {
  const bookings = getStoredBookings();
  const target = bookings.find(b => b.id === bookingId);
  if (target) {
    target.status = newStatus;
    saveBookings(bookings);
    renderDashboardStats();
    renderBookingRequests();
  }
}

function initProfileEditForm() {
  const descInput = document.getElementById("edit-prov-desc");
  const priceInput = document.getElementById("edit-prov-price");
  const locInput = document.getElementById("edit-prov-loc");
  const form = document.getElementById("provider-profile-edit-form");

  if (descInput) descInput.value = activeProvider.description || "";
  if (priceInput) priceInput.value = activeProvider.startingPrice || "";
  if (locInput) locInput.value = activeProvider.location || "";

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();

      const newDesc = descInput.value.trim();
      const newPrice = priceInput.value.trim();
      const newLoc = locInput.value.trim();

      const providers = getStoredProviders();
      const target = providers.find(p => p.id === activeProvider.id);
      if (target) {
        target.description = newDesc;
        target.startingPrice = newPrice ? Number(newPrice) : null;
        if (newLoc) target.location = newLoc;
        saveProviders(providers);
        activeProvider = target;

        renderDashboardHeader();
        alert("Provider profile information updated in local directory!");
      }
    };
  }
}
