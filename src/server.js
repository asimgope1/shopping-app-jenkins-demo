const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const IS_BROKEN = true; // 🚨 Rahul accidentally broke the login authentication service

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint for CI/CD checks
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mock user database
const USERS = {
  'rahul@company.com': 'Password123!',
  'asim@company.com': 'TesterPass2026!'
};

// Login API endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Accidental bug simulation introduced by developer (Chapter 6 scenario)
  if (IS_BROKEN) {
    console.error('🚨 SIMULATED BUG: Authentication service is failing due to broken backend code!');
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error: Unexpected token in auth service'
    });
  }

  // Case 3: Empty credentials validation
  if (!email || !email.trim() || !password || !password.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Please enter both email and password.'
    });
  }

  // Case 2 & 1: Credential verification
  const normalizedEmail = email.trim().toLowerCase();
  const validPassword = USERS[normalizedEmail];

  if (!validPassword || validPassword !== password) {
    return res.status(401).json({
      success: false,
      message: 'Invalid username or password'
    });
  }

  // Case 1: Success
  const displayName = normalizedEmail.includes('asim') ? 'Asim Gope (QA Engineer)' : 'Rahul Sharma (Developer)';
  return res.json({
    success: true,
    user: {
      name: displayName,
      email: normalizedEmail,
      role: normalizedEmail.includes('asim') ? 'QA' : 'Developer'
    }
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🛍️ Shopping App running at: http://localhost:${PORT}`);
    if (IS_BROKEN) {
      console.warn('⚠️ WARNING: App is running in BROKEN mode (simulating Rahul\'s bug)!');
    }
  });
}

module.exports = app;
