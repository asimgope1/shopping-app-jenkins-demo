document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email-input');
  const passwordInput = document.getElementById('password-input');
  const alertBanner = document.getElementById('alert-banner');
  const loginSection = document.getElementById('login-section');
  const dashboardSection = document.getElementById('dashboard-section');
  const welcomeMessage = document.getElementById('welcome-message');
  const userDetails = document.getElementById('user-details');
  const logoutButton = document.getElementById('logout-button');
  const loginButton = document.getElementById('login-button');

  function showAlert(message, isError = true) {
    alertBanner.textContent = message;
    alertBanner.className = isError ? 'alert alert-error' : 'alert alert-success';
    alertBanner.classList.remove('hidden');
  }

  function clearAlert() {
    alertBanner.textContent = '';
    alertBanner.className = 'alert hidden';
  }

  // Handle form submission
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAlert();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Test Case 3 check: Empty credentials display a validation message
    if (!email || !password) {
      showAlert('Please enter both email and password.', true);
      return;
    }

    // Indicate loading state
    loginButton.disabled = true;
    loginButton.style.opacity = '0.7';

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Test Case 1: Correct credentials should allow login
        loginSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
        welcomeMessage.textContent = `Welcome back, ${data.user.name}!`;
        userDetails.textContent = `Active Role: ${data.user.role} • ${data.user.email}`;
      } else {
        // Test Case 2: Incorrect password / invalid credentials rejected
        showAlert(data.message || 'Invalid username or password', true);
      }
    } catch (err) {
      console.error('Network or server error:', err);
      showAlert('Server connection error. Please try again later.', true);
    } finally {
      loginButton.disabled = false;
      loginButton.style.opacity = '1';
    }
  });

  // Logout handler
  logoutButton.addEventListener('click', () => {
    dashboardSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
    emailInput.value = '';
    passwordInput.value = '';
    clearAlert();
  });
});
