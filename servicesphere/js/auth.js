/* ============================================================
   SERVICE SPHERE — AUTHENTICATION CONTROLLER (js/auth.js)
   BCA Minor Project Academic Frontend Prototype
   Dual-role: Customer vs Service Provider (localStorage state)
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initAuthTabs();
  initAuthForms();
  initDemoCredentials();
});

let currentRole = "customer"; // 'customer' or 'provider'
let currentMode = "login";    // 'login' or 'register'

function initAuthTabs() {
  const roleTabs = document.querySelectorAll(".auth-role-tab");
  const modeToggles = document.querySelectorAll(".mode-toggle-link");

  roleTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      roleTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentRole = tab.getAttribute("data-role");
      updateFormVisibility();
    });
  });

  modeToggles.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      currentMode = currentMode === "login" ? "register" : "login";
      updateFormVisibility();
    });
  });

  updateFormVisibility();
}

function updateFormVisibility() {
  const customerLoginForm = document.getElementById("customer-login-form");
  const customerRegisterForm = document.getElementById("customer-register-form");
  const providerLoginForm = document.getElementById("provider-login-form");
  const providerRegisterForm = document.getElementById("provider-register-form");
  const authTitle = document.getElementById("auth-card-title");
  const authSubtitle = document.getElementById("auth-card-subtitle");
  const toggleText = document.getElementById("auth-toggle-prompt");

  // Hide all
  if (customerLoginForm) customerLoginForm.style.display = "none";
  if (customerRegisterForm) customerRegisterForm.style.display = "none";
  if (providerLoginForm) providerLoginForm.style.display = "none";
  if (providerRegisterForm) providerRegisterForm.style.display = "none";

  if (currentRole === "customer") {
    if (currentMode === "login") {
      if (customerLoginForm) customerLoginForm.style.display = "block";
      if (authTitle) authTitle.textContent = "Customer Sign In";
      if (authSubtitle) authSubtitle.textContent = "Access your service requests and booking history in Unnao.";
      if (toggleText) toggleText.innerHTML = `Don't have an account? <a href="#" class="mode-toggle-link">Register here</a>`;
    } else {
      if (customerRegisterForm) customerRegisterForm.style.display = "block";
      if (authTitle) authTitle.textContent = "Customer Registration";
      if (authSubtitle) authSubtitle.textContent = "Create an account to book local professionals in Unnao.";
      if (toggleText) toggleText.innerHTML = `Already registered? <a href="#" class="mode-toggle-link">Sign in here</a>`;
    }
  } else {
    if (currentMode === "login") {
      if (providerLoginForm) providerLoginForm.style.display = "block";
      if (authTitle) authTitle.textContent = "Provider Portal Sign In";
      if (authSubtitle) authSubtitle.textContent = "Manage incoming job requests from Unnao residents.";
      if (toggleText) toggleText.innerHTML = `New service provider in Unnao? <a href="#" class="mode-toggle-link">Register your trade</a>`;
    } else {
      if (providerRegisterForm) providerRegisterForm.style.display = "block";
      if (authTitle) authTitle.textContent = "Register as Service Provider";
      if (authSubtitle) authSubtitle.textContent = "List your local business in the Service Sphere Unnao directory.";
      if (toggleText) toggleText.innerHTML = `Already listed with us? <a href="#" class="mode-toggle-link">Sign in here</a>`;
    }
  }

  // Re-bind click on dynamically created toggle links
  const newToggle = document.querySelector("#auth-toggle-prompt .mode-toggle-link");
  if (newToggle) {
    newToggle.addEventListener("click", (e) => {
      e.preventDefault();
      currentMode = currentMode === "login" ? "register" : "login";
      updateFormVisibility();
    });
  }
}

function initAuthForms() {
  // Customer Login
  const custLoginForm = document.getElementById("customer-login-form");
  if (custLoginForm) {
    custLoginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("cust-login-email").value.trim();
      const password = document.getElementById("cust-login-password").value;

      if (!email || !password) {
        alert("Please enter both email/phone and password.");
        return;
      }

      // Check users in localStorage
      const users = getRegisteredUsers();
      const matched = users.find(u => (u.email === email || u.phone === email) && u.role === "customer");

      const sessionUser = matched || {
        id: "usr-" + Date.now(),
        name: email.split("@")[0] || "Unnao Resident",
        email: email,
        role: "customer",
        locality: "Civil Lines, Unnao"
      };

      localStorage.setItem("service_sphere_user", JSON.stringify(sessionUser));
      window.location.href = "index.html";
    });
  }

  // Customer Register
  const custRegForm = document.getElementById("customer-register-form");
  if (custRegForm) {
    custRegForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("cust-reg-name").value.trim();
      const contact = document.getElementById("cust-reg-contact").value.trim();
      const locality = document.getElementById("cust-reg-locality").value;
      const password = document.getElementById("cust-reg-password").value;

      if (!name || !contact || !password) {
        alert("Please fill in all required fields.");
        return;
      }

      const newUser = {
        id: "usr-" + Date.now(),
        name: name,
        email: contact.includes("@") ? contact : "",
        phone: !contact.includes("@") ? contact : "",
        locality: locality || "Unnao, Uttar Pradesh",
        role: "customer"
      };

      const users = getRegisteredUsers();
      users.push(newUser);
      localStorage.setItem("service_sphere_registered_users", JSON.stringify(users));

      // Auto login
      localStorage.setItem("service_sphere_user", JSON.stringify(newUser));
      alert("Registration successful! Welcome to Service Sphere Unnao.");
      window.location.href = "index.html";
    });
  }

  // Provider Login
  const provLoginForm = document.getElementById("provider-login-form");
  if (provLoginForm) {
    provLoginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("prov-login-email").value.trim();
      const password = document.getElementById("prov-login-password").value;

      if (!email || !password) {
        alert("Please enter credentials.");
        return;
      }

      // Find matching provider from directory
      const providers = getStoredProviders();
      let matchedProvider = providers.find(p => p.name.toLowerCase().includes(email.toLowerCase()) || p.id === email);

      if (!matchedProvider) {
        // Fallback default demo provider: Hakim Electricals
        matchedProvider = providers[0];
      }

      const sessionUser = {
        id: matchedProvider.id,
        name: matchedProvider.name,
        category: matchedProvider.category,
        location: matchedProvider.location,
        role: "provider"
      };

      localStorage.setItem("service_sphere_user", JSON.stringify(sessionUser));
      window.location.href = "provider-dashboard.html";
    });
  }

  // Provider Register
  const provRegForm = document.getElementById("provider-register-form");
  if (provRegForm) {
    provRegForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("prov-reg-name").value.trim();
      const category = document.getElementById("prov-reg-category").value;
      const locality = document.getElementById("prov-reg-locality").value;
      const desc = document.getElementById("prov-reg-desc").value.trim();

      if (!name || !category || !locality) {
        alert("Please complete all required fields.");
        return;
      }

      const newProvider = {
        id: "unn-custom-" + Date.now().toString().slice(-4),
        name: name,
        category: category,
        location: locality.includes("Unnao") ? locality : `${locality}, Unnao`,
        description: desc || `${category} provider serving ${locality} in Unnao.`,
        services: [`General ${category} Services`],
        rating: null,
        reviewCount: null,
        experience: null,
        startingPrice: null,
        isDemo: true
      };

      const providers = getStoredProviders();
      providers.unshift(newProvider);
      saveProviders(providers);

      const sessionUser = {
        id: newProvider.id,
        name: newProvider.name,
        category: newProvider.category,
        location: newProvider.location,
        role: "provider"
      };

      localStorage.setItem("service_sphere_user", JSON.stringify(sessionUser));
      alert("Provider business profile registered successfully!");
      window.location.href = "provider-dashboard.html";
    });
  }
}

function initDemoCredentials() {
  const quickCustomerBtn = document.getElementById("demo-login-customer");
  const quickProviderBtn = document.getElementById("demo-login-provider");

  if (quickCustomerBtn) {
    quickCustomerBtn.addEventListener("click", () => {
      const demoUser = {
        id: "usr-demo-01",
        name: "Pooja Sharma",
        email: "pooja.sharma@example.com",
        phone: "9876543210",
        locality: "Civil Lines, Unnao",
        role: "customer"
      };
      localStorage.setItem("service_sphere_user", JSON.stringify(demoUser));
      window.location.href = "index.html";
    });
  }

  if (quickProviderBtn) {
    quickProviderBtn.addEventListener("click", () => {
      const demoProvider = {
        id: "unn-elec-001",
        name: "Hakim Electricals",
        category: "Electrician",
        location: "Narendra Nagar, Unnao",
        role: "provider"
      };
      localStorage.setItem("service_sphere_user", JSON.stringify(demoProvider));
      window.location.href = "provider-dashboard.html";
    });
  }
}

function getRegisteredUsers() {
  const data = localStorage.getItem("service_sphere_registered_users");
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
  }
  return [];
}
