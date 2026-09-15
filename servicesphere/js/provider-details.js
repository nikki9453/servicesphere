/* ============================================================
   SERVICE SPHERE — PROVIDER DETAILS & REVIEWS CONTROLLER (js/provider-details.js)
   Unnao, Uttar Pradesh Local Directory Profile
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initProviderDetails();
});

let currentProvider = null;

function initProviderDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const providerId = urlParams.get("id");

  if (!providerId) {
    showProviderNotFound();
    return;
  }

  currentProvider = getProviderById(providerId);

  if (!currentProvider) {
    showProviderNotFound();
    return;
  }

  renderProviderProfile(currentProvider);
  renderProviderReviews(currentProvider.id);
  initReviewForm(currentProvider.id);
}

function showProviderNotFound() {
  const container = document.getElementById("provider-profile-root");
  if (!container) return;

  container.innerHTML = `
    <div class="empty-state">
      <h2 class="empty-state-title">Provider Profile Not Found</h2>
      <p class="empty-state-desc">The requested local service provider could not be found in the Unnao directory.</p>
      <a href="providers.html" class="btn btn-primary">Return to Provider Directory</a>
    </div>
  `;
}

function renderProviderProfile(provider) {
  const container = document.getElementById("provider-profile-root");
  if (!container) return;

  const initials = getInitials(provider.name);
  const locationText = provider.location || "Unnao, Uttar Pradesh";

  // Rating badge or notice
  let ratingBadge = "";
  if (provider.rating !== null && provider.rating !== undefined) {
    ratingBadge = `<span class="badge badge-accent">★ ${provider.rating.toFixed(1)} (${provider.reviewCount} ${provider.reviewCount === 1 ? 'Review' : 'Reviews'})</span>`;
  } else {
    ratingBadge = `<span class="badge">Verified Directory Listing</span>`;
  }

  // Starting price
  const priceDisplay = provider.startingPrice !== null && provider.startingPrice !== undefined
    ? `₹${provider.startingPrice}`
    : "Contact provider for pricing";

  // Services offered list
  const servicesList = (provider.services && provider.services.length > 0)
    ? provider.services.map(s => `
        <div class="service-offering-item">
          <span class="check-icon">✓</span>
          <span>${escapeHtml(s)}</span>
        </div>
      `).join("")
    : `
        <div class="service-offering-item">
          <span class="check-icon">✓</span>
          <span>General ${escapeHtml(provider.category)} Services</span>
        </div>
      `;

  container.innerHTML = `
    <a href="providers.html" class="back-nav-link">&larr; Back to Unnao Providers</a>

    <div class="profile-layout-grid">
      <!-- Main Content Column -->
      <div class="profile-main-col">
        <div class="profile-main-card">
          <div class="profile-head-flex">
            <div class="avatar-initials lg">${initials}</div>
            <div class="profile-head-info">
              <div class="profile-badges-row">
                <span class="badge badge-accent">${escapeHtml(provider.category)}</span>
                ${ratingBadge}
                <span class="badge">Unnao, UP</span>
              </div>
              <h1 class="profile-head-title">${escapeHtml(provider.name)}</h1>
              <p class="provider-location">📍 ${escapeHtml(locationText)}</p>
            </div>
          </div>

          <h2 class="profile-section-title">About this Provider</h2>
          <p class="profile-body-text">${escapeHtml(provider.description)}</p>

          <h2 class="profile-section-title">Available Services & Specializations</h2>
          <div class="services-list-grid">
            ${servicesList}
          </div>

          <div class="alert alert-info">
            <strong>Directory Notice:</strong> This profile is part of the Service Sphere BCA academic prototype for Unnao. Service availability, exact quotes, and doorstep arrival times are coordinated directly with the provider upon booking submission.
          </div>
        </div>

        <!-- Reviews Section -->
        <div class="reviews-container">
          <div class="reviews-header">
            <div>
              <h2 class="profile-section-title" style="margin-bottom: 2px;">Customer Reviews</h2>
              <span class="form-hint">Community feedback from Unnao residents</span>
            </div>
            <a href="#leave-review-form" class="btn btn-secondary btn-sm">Write a Review</a>
          </div>

          <div id="reviews-list-target" class="reviews-list">
            <!-- Rendered by renderProviderReviews() -->
          </div>

          <!-- Leave Review Form -->
          <div class="review-form-card" id="leave-review-form">
            <h3 class="profile-section-title" style="font-size: 1.05rem;">Leave a Review</h3>
            <p class="form-hint" style="margin-bottom: 16px;">Have you hired ${escapeHtml(provider.name)}? Share your feedback for the Unnao community.</p>

            <form id="review-submission-form">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                <div class="form-group">
                  <label class="form-label" for="review-author">Your Name <span class="req">*</span></label>
                  <input type="text" id="review-author" class="form-control" placeholder="e.g. Ramesh Kumar" required>
                </div>
                <div class="form-group">
                  <label class="form-label" for="review-rating">Rating <span class="req">*</span></label>
                  <select id="review-rating" class="form-control" required>
                    <option value="5">★★★★★ (5/5) Excellent</option>
                    <option value="4">★★★★☆ (4/5) Very Good</option>
                    <option value="3">★★★☆☆ (3/5) Average</option>
                    <option value="2">★★☆☆☆ (2/5) Below Average</option>
                    <option value="1">★☆☆☆☆ (1/5) Poor</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="review-comment">Your Review / Experience <span class="req">*</span></label>
                <textarea id="review-comment" class="form-control" placeholder="Describe the service quality, punctuality, and pricing..." required></textarea>
              </div>

              <button type="submit" class="btn btn-primary btn-sm">Submit Review</button>
            </form>
          </div>
        </div>
      </div>

      <!-- Right Sticky Booking Card -->
      <aside class="profile-sidebar-col">
        <div class="profile-sidebar-card">
          <div class="sidebar-price-box">
            <div class="sidebar-price-label">Estimated Starting Rate</div>
            <div class="sidebar-price-value">${priceDisplay}</div>
          </div>

          <div class="sidebar-info-list">
            <div class="sidebar-info-item">
              <span>📍</span>
              <div>
                <strong>Service Area</strong>
                <div>${escapeHtml(locationText)} & nearby Unnao sectors</div>
              </div>
            </div>
            <div class="sidebar-info-item">
              <span>⏱️</span>
              <div>
                <strong>Response Time</strong>
                <div>Typically within 2-4 hours</div>
              </div>
            </div>
            <div class="sidebar-info-item">
              <span>🛡️</span>
              <div>
                <strong>Verification</strong>
                <div>Local Unnao Directory Verified</div>
              </div>
            </div>
          </div>

          <a href="booking.html?provider=${encodeURIComponent(provider.id)}" class="btn btn-primary btn-block" style="margin-bottom: 10px;">
            Book This Provider
          </a>
          <a href="providers.html?category=${encodeURIComponent(provider.category)}" class="btn btn-secondary btn-block btn-sm">
            View More ${escapeHtml(provider.category)}s
          </a>
        </div>
      </aside>
    </div>
  `;
}

function renderProviderReviews(providerId) {
  const target = document.getElementById("reviews-list-target");
  if (!target) return;

  const reviews = getReviewsForProvider(providerId);

  if (reviews.length === 0) {
    target.innerHTML = `
      <div class="empty-state" style="padding: 24px; margin: 12px 0;">
        <p class="empty-state-desc" style="margin-bottom: 0;">No customer reviews submitted yet for this local provider. Be the first to share your experience!</p>
      </div>
    `;
    return;
  }

  target.innerHTML = reviews.map(r => `
    <div class="review-item">
      <div class="review-item-head">
        <div class="reviewer-name">${escapeHtml(r.userName)}</div>
        <div class="review-date">${escapeHtml(r.date)}</div>
      </div>
      <div style="color: #E6A23C; margin-bottom: 6px;">
        ${'★'.repeat(Number(r.rating))}${'☆'.repeat(5 - Number(r.rating))}
      </div>
      <p class="review-comment">${escapeHtml(r.comment)}</p>
    </div>
  `).join("");
}

function initReviewForm(providerId) {
  const form = document.getElementById("review-submission-form");
  if (!form) return;

  // Pre-fill user name if logged in
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.name) {
    const authorInput = document.getElementById("review-author");
    if (authorInput) authorInput.value = currentUser.name;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const author = document.getElementById("review-author").value.trim();
    const rating = document.getElementById("review-rating").value;
    const comment = document.getElementById("review-comment").value.trim();

    if (!author || !comment) {
      alert("Please fill in all required fields.");
      return;
    }

    const reviewObj = {
      id: "rev-" + Date.now(),
      userName: author,
      rating: Number(rating),
      comment: comment,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    };

    saveReviewForProvider(providerId, reviewObj);
    form.reset();

    // Reload view
    currentProvider = getProviderById(providerId);
    renderProviderProfile(currentProvider);
    renderProviderReviews(providerId);
    initReviewForm(providerId);

    alert("Thank you! Your review has been recorded locally.");
  });
}
