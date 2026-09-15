/* ============================================================
   SERVICE SPHERE — PROVIDERS DIRECTORY CONTROLLER (js/providers.js)
   Features: Search, Category Filter, Locality Filter, Rating Filter, Sort
   Strict Unnao-only focus, compact cards, null handling for unverified data.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initProvidersDirectory();
});

let allProviders = [];

function initProvidersDirectory() {
  allProviders = getStoredProviders();

  // Populate category filter dropdown
  populateFilterDropdowns();

  // Read URL params (e.g. ?category=Electrician or ?location=Civil+Lines)
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get("category");
  const initialSearch = urlParams.get("search");
  const initialLocality = urlParams.get("location");

  const searchInput = document.getElementById("search-input");
  const categoryFilter = document.getElementById("category-filter");
  const localityFilter = document.getElementById("locality-filter");
  const ratingFilter = document.getElementById("rating-filter");
  const sortSelect = document.getElementById("sort-select");
  const resetBtn = document.getElementById("reset-filters-btn");

  if (initialCategory && categoryFilter) {
    categoryFilter.value = initialCategory;
  }
  if (initialSearch && searchInput) {
    searchInput.value = initialSearch;
  }
  if (initialLocality && localityFilter) {
    localityFilter.value = initialLocality;
  }

  // Bind filter events
  if (searchInput) searchInput.addEventListener("input", applyFiltersAndRender);
  if (categoryFilter) categoryFilter.addEventListener("change", applyFiltersAndRender);
  if (localityFilter) localityFilter.addEventListener("change", applyFiltersAndRender);
  if (ratingFilter) ratingFilter.addEventListener("change", applyFiltersAndRender);
  if (sortSelect) sortSelect.addEventListener("change", applyFiltersAndRender);

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (categoryFilter) categoryFilter.value = "all";
      if (localityFilter) localityFilter.value = "all";
      if (ratingFilter) ratingFilter.value = "all";
      if (sortSelect) sortSelect.value = "default";
      applyFiltersAndRender();
    });
  }

  // Initial render
  applyFiltersAndRender();
}

function populateFilterDropdowns() {
  const categoryFilter = document.getElementById("category-filter");
  if (categoryFilter && categoryFilter.options.length <= 1) {
    const categories = Array.from(new Set(allProviders.map(p => p.category))).sort();
    categories.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      categoryFilter.appendChild(opt);
    });
  }

  const localityFilter = document.getElementById("locality-filter");
  if (localityFilter && localityFilter.options.length <= 1) {
    // Extract known Unnao localities
    const unnaoLocalities = [
      "Narendra Nagar",
      "Lok Nagar",
      "Shiv Nagar",
      "Gadan Khera",
      "Moti Nagar",
      "Civil Lines",
      "Fatehullah Nagar",
      "AB Nagar",
      "Gandhi Nagar",
      "Shuklaganj"
    ];

    unnaoLocalities.forEach(loc => {
      const opt = document.createElement("option");
      opt.value = loc;
      opt.textContent = loc;
      localityFilter.appendChild(opt);
    });
  }
}

function applyFiltersAndRender() {
  const searchInput = document.getElementById("search-input");
  const categoryFilter = document.getElementById("category-filter");
  const localityFilter = document.getElementById("locality-filter");
  const ratingFilter = document.getElementById("rating-filter");
  const sortSelect = document.getElementById("sort-select");

  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const selectedCategory = categoryFilter ? categoryFilter.value : "all";
  const selectedLocality = localityFilter ? localityFilter.value : "all";
  const selectedRating = ratingFilter ? ratingFilter.value : "all";
  const selectedSort = sortSelect ? sortSelect.value : "default";

  let filtered = allProviders.filter(provider => {
    // Search match
    if (query) {
      const matchName = provider.name.toLowerCase().includes(query);
      const matchCategory = provider.category.toLowerCase().includes(query);
      const matchLoc = provider.location.toLowerCase().includes(query);
      const matchDesc = provider.description.toLowerCase().includes(query);
      const matchServices = provider.services ? provider.services.some(s => s.toLowerCase().includes(query)) : false;
      if (!matchName && !matchCategory && !matchLoc && !matchDesc && !matchServices) {
        return false;
      }
    }

    // Category match
    if (selectedCategory !== "all" && provider.category !== selectedCategory) {
      return false;
    }

    // Locality match
    if (selectedLocality !== "all") {
      if (!provider.location.toLowerCase().includes(selectedLocality.toLowerCase())) {
        return false;
      }
    }

    // Rating filter (Verified ratings only or 4.0+)
    if (selectedRating === "verified") {
      if (provider.rating === null) return false;
    } else if (selectedRating === "4plus") {
      if (provider.rating === null || provider.rating < 4.0) return false;
    }

    return true;
  });

  // Sorting
  if (selectedSort === "name-asc") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (selectedSort === "name-desc") {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  } else if (selectedSort === "rating-desc") {
    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  renderProvidersGrid(filtered);
  updateResultsCount(filtered.length);
}

function updateResultsCount(count) {
  const countEl = document.getElementById("results-count");
  if (countEl) {
    const text = count === 1 ? "1 service provider in Unnao" : `${count} service providers in Unnao`;
    countEl.innerHTML = `Showing <strong>${count}</strong> ${count === 1 ? "provider" : "providers"} in Unnao, UP`;
  }
}

function renderProvidersGrid(providersList) {
  const container = document.getElementById("providers-grid-container");
  if (!container) return;

  if (providersList.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <h3 class="empty-state-title">No providers found in Unnao</h3>
        <p class="empty-state-desc">Try clearing your filters or searching for another local trade like Electrician, Plumbing, or AC Repair.</p>
        <button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById('reset-filters-btn').click();">Reset Filters</button>
      </div>
    `;
    return;
  }

  const cardsHtml = providersList.map(provider => {
    const initials = getInitials(provider.name);
    
    // Rating rendering: strict requirement - ONLY display when verified
    let ratingHtml = "";
    if (provider.rating !== null && provider.rating !== undefined) {
      ratingHtml = `
        <div class="provider-meta-item">
          <span class="meta-icon" aria-hidden="true">★</span>
          <span class="provider-rating-stars">${provider.rating.toFixed(1)}</span>
          <span class="rating-count">(${provider.reviewCount} ${provider.reviewCount === 1 ? "review" : "reviews"})</span>
        </div>
      `;
    } else {
      ratingHtml = `
        <div class="provider-meta-item">
          <span class="meta-icon" aria-hidden="true">★</span>
          <span class="rating-na">Reviews unavailable</span>
        </div>
      `;
    }

    // Pricing rendering
    let priceHtml = "";
    if (provider.startingPrice !== null && provider.startingPrice !== undefined) {
      priceHtml = `
        <div class="provider-meta-item">
          <span class="meta-icon" aria-hidden="true">₹</span>
          <span class="provider-price">Starts at <strong>₹${provider.startingPrice}</strong></span>
        </div>
      `;
    } else {
      priceHtml = `
        <div class="provider-meta-item">
          <span class="meta-icon" aria-hidden="true">₹</span>
          <span class="provider-price">Contact provider for pricing</span>
        </div>
      `;
    }

    // Location rendering
    const locationDisplay = escapeHtml(provider.location || "Unnao, Uttar Pradesh");

    return `
      <article class="provider-card">
        <div>
          <div class="provider-header">
            <div class="avatar-initials" aria-label="Avatar for ${escapeHtml(provider.name)}">${initials}</div>
            <div class="provider-identity">
              <h2 class="provider-name">${escapeHtml(provider.name)}</h2>
              <span class="provider-category-badge">${escapeHtml(provider.category)}</span>
            </div>
          </div>

          <p class="provider-desc">${escapeHtml(provider.description)}</p>

          <div class="provider-meta-row">
            ${ratingHtml}
            <div class="provider-meta-item">
              <span class="meta-icon" aria-hidden="true">📍</span>
              <span class="provider-location">${locationDisplay}</span>
            </div>
            ${priceHtml}
          </div>
        </div>

        <div class="provider-card-footer">
          <a href="provider-details.html?id=${encodeURIComponent(provider.id)}" class="btn btn-secondary btn-sm">
            View Profile
          </a>
          <a href="booking.html?provider=${encodeURIComponent(provider.id)}" class="btn btn-primary btn-sm">
            Book
          </a>
        </div>
      </article>
    `;
  }).join("");

  container.innerHTML = cardsHtml;
}
