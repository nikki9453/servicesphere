/* ============================================================
   SERVICE SPHERE — SERVICES DIRECTORY CONTROLLER (js/services.js)
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  renderServicesDirectory();
});

function renderServicesDirectory() {
  const container = document.getElementById("services-directory-container");
  if (!container) return;

  const providers = getStoredProviders();

  // Compute live count of providers per category
  const countsByCategory = {};
  providers.forEach(p => {
    countsByCategory[p.category] = (countsByCategory[p.category] || 0) + 1;
  });

  const cardsHtml = SERVICES_DATA.map(service => {
    const providerCount = countsByCategory[service.name] || 0;
    const countLabel = providerCount === 1 ? "1 Verified Provider" : `${providerCount} Verified Providers`;

    return `
      <article class="service-dir-card">
        <div>
          <div class="service-dir-top">
            <div class="service-dir-icon" aria-hidden="true">${service.icon}</div>
            <h2 class="service-dir-title">${escapeHtml(service.name)}</h2>
          </div>
          <p class="service-dir-desc">${escapeHtml(service.description)}</p>
        </div>
        <div class="service-dir-meta">
          <span class="service-provider-count">${countLabel} in Unnao</span>
          <a href="providers.html?category=${encodeURIComponent(service.name)}" class="service-dir-link">
            View Providers &rarr;
          </a>
        </div>
      </article>
    `;
  }).join("");

  container.innerHTML = cardsHtml;
}
