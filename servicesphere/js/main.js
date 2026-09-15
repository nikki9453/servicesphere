/* ============================================================
   SERVICE SPHERE — GLOBAL UTILITIES & THEME ENGINE (js/main.js)
   Unnao, Uttar Pradesh Local Service Discovery Platform
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initThemeEngine();
  initAuthHeader();
  initMobileNavigation();
  highlightActiveNavLink();
});

/* ============================================================
   THEME ENGINE (Sunlit Day vs After Hours Night)
   ============================================================ */
function initThemeEngine() {
  const THEME_KEY = "service_sphere_theme";
  const savedTheme = localStorage.getItem(THEME_KEY) || "day";
  
  applyTheme(savedTheme);

  const toggleButtons = document.querySelectorAll(".theme-toggle-btn");
  toggleButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") === "night" ? "night" : "day";
      const nextTheme = currentTheme === "day" ? "night" : "day";
      applyTheme(nextTheme);
      localStorage.setItem(THEME_KEY, nextTheme);
    });
  });
}

function applyTheme(theme) {
  if (theme === "night") {
    document.documentElement.setAttribute("data-theme", "night");
    updateThemeButtonVisuals("night");
  } else {
    document.documentElement.removeAttribute("data-theme");
    updateThemeButtonVisuals("day");
  }
}

function updateThemeButtonVisuals(theme) {
  const toggleButtons = document.querySelectorAll(".theme-toggle-btn");
  toggleButtons.forEach(btn => {
    const iconSpan = btn.querySelector(".theme-icon");
    const textSpan = btn.querySelector(".theme-text");
    if (theme === "night") {
      if (iconSpan) iconSpan.textContent = "🌙";
      if (textSpan) textSpan.textContent = "Night";
      btn.setAttribute("title", "Switch to Sunlit Day theme");
    } else {
      if (iconSpan) iconSpan.textContent = "☀️";
      if (textSpan) textSpan.textContent = "Day";
      btn.setAttribute("title", "Switch to After Hours Night theme");
    }
  });
}

/* ============================================================
   AUTH HEADER STATE (Academic Demo Authentication)
   ============================================================ */
function getCurrentUser() {
  const userJson = localStorage.getItem("service_sphere_user");
  if (userJson) {
    try {
      return JSON.parse(userJson);
    } catch (e) {
      console.error("Failed to parse user session", e);
    }
  }
  return null;
}

function initAuthHeader() {
  const authContainer = document.getElementById("header-auth-container");
  if (!authContainer) return;

  const currentUser = getCurrentUser();

  if (currentUser) {
    let dashboardLink = "";
    if (currentUser.role === "provider") {
      dashboardLink = `<a href="provider-dashboard.html" class="nav-link">Dashboard</a>`;
    } else {
      dashboardLink = `<a href="bookings.html" class="nav-link">My Bookings</a>`;
    }

    authContainer.innerHTML = `
      <div class="user-session-menu">
        <span class="user-badge">
          ${currentUser.role === "provider" ? "🛠️" : "👤"} ${escapeHtml(currentUser.name)}
        </span>
        <button type="button" class="logout-btn" id="logout-trigger" title="Sign out of demo session">Sign out</button>
      </div>
    `;

    // Also inject role specific link into nav if missing
    const navLinksList = document.querySelector(".nav-links");
    if (navLinksList && !navLinksList.querySelector(`[href="${currentUser.role === 'provider' ? 'provider-dashboard.html' : 'bookings.html'}"]`)) {
      const li = document.createElement("li");
      li.innerHTML = dashboardLink;
      navLinksList.appendChild(li);
    }

    const logoutBtn = document.getElementById("logout-trigger");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("service_sphere_user");
        window.location.reload();
      });
    }
  } else {
    authContainer.innerHTML = `
      <a href="auth.html" class="nav-auth-btn">Sign In</a>
    `;
  }
}

/* ============================================================
   MOBILE NAVIGATION
   ============================================================ */
function initMobileNavigation() {
  const toggleBtn = document.querySelector(".mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (toggleBtn && mainNav) {
    toggleBtn.addEventListener("click", () => {
      mainNav.classList.toggle("open");
      const isExpanded = mainNav.classList.contains("open");
      toggleBtn.setAttribute("aria-expanded", isExpanded);
    });

    // Close nav on click outside
    document.addEventListener("click", (e) => {
      if (!mainNav.contains(e.target) && !toggleBtn.contains(e.target) && mainNav.classList.contains("open")) {
        mainNav.classList.remove("open");
        toggleBtn.setAttribute("aria-expanded", "false");
      }
    });
  }
}

/* ============================================================
   ACTIVE NAVIGATION LINK
   ============================================================ */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/* ============================================================
   REUSABLE UTILITIES
   ============================================================ */
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getInitials(name) {
  if (!name) return "SP";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function formatStatusBadge(status) {
  const s = (status || "pending").toLowerCase();
  switch (s) {
    case "confirmed":
      return `<span class="badge badge-success">Confirmed</span>`;
    case "completed":
      return `<span class="badge badge-accent">Completed</span>`;
    case "cancelled":
      return `<span class="badge badge-danger">Cancelled</span>`;
    case "pending":
    default:
      return `<span class="badge badge-warning">Pending</span>`;
  }
}
