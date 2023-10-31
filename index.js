require('dotenv').config();

const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const port = process.env.PORT || 3000;
const crypto = require('crypto');
const OAuth2Strategy = require('passport-oauth2');

// Generate a secure session secret
const sessionSecret = crypto.randomBytes(32).toString('hex');

// Configure Express session for Passport
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

// Serve static files from a 'public' directory
app.use(express.static('public'));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: 'https://auth.immutable.com/login?state=hKFo2SB4VWgyWDU2Sm5DZWZWZXhJcGExeGhFZmVKWlc2aUhZdaFupWxvZ2luo3RpZNkgdHdsZldibUZQZ2hCbVZRRlA1eFNEaFJhTDBRVHRvWU0%3D&client=IMpUPX2P7MOMeJJ5HuAO1ILDFYmZXJRz&protocol=oauth2&scope=openid%20profile%20email%20offline_access%20create%3Acollections%20update%3Acollections%20read%3Acollections%20create%3Aprojects%20read%3Aprojects%20update%3Aprojects%20create%3Acollections%20update%3Acollections%20view%3Apassport%20create%3Aclients%20read%3Aclients%20update%3Aclients%20delete%3Aclients&response_type=code&redirect_uri=https%3A%2F%2Fhub.immutable.com%2Fapi%2Fauth%2Fcallback&audience=platform_api&nonce=8gT2kVgVp8ortiKRZgWdJhWKJBOy5UoNZsdjnDJPc3o&code_challenge=RjbwQ-DO1HCkfVHTmta5k6pnA4ClizSMt2WECyNES84&code_challenge_method=S256',// Updated to the Immutable Passport authorization URL
      tokenURL: 'https://passport.immutable.com/oauth2/token',
      clientID: process.env.CLIENT_ID, // Use your Passport client ID from .env
      clientSecret: process.env.CLIENT_SECRET, // Use your Passport client secret from .env
      callbackURL: 'https://3000-sridurgeshv-zkevmnft-dz55b92uuxq.ws-us105.gitpod.io/callback', // Updated to your provided callback URL
    },
    (accessToken, refreshToken, profile, done) => {
  // Your strategy callback logic
}));

// Passport login route
app.get('/login', passport.authenticate('oauth2'));

// Callback route for after Passport authentication
app.get('/callback', passport.authenticate('oauth2', {
  successRedirect: '/dashboard', // Redirect to the dashboard upon successful login
  failureRedirect: '/login', // Redirect to the login page upon login failure
}));

// Protected route for authenticated users
app.get('/dashboard', (req, res) => {
  // This route is only accessible to authenticated users
  res.send('Welcome to the Dashboard!');
});

// User logout route
app.get('/logout', (req, res) => {
  req.logout(); // Logout the user
  res.redirect('/'); // Redirect to the homepage
});

// Transaction initiation route
app.get('/initiate-transaction', (req, res) => {
  // Check if the user is authenticated before initiating the transaction
  if (req.isAuthenticated()) {
    // In this example, we'll send a placeholder transaction data
    const placeholderTransactionData = "This is a placeholder transaction data.";

    // Use the Passport client to initiate the transaction
    passport.initiateTransaction(placeholderTransactionData, (err, transactionHash) => {
      if (err) {
        // Handle transaction initiation error
        return res.status(500).json({ error: 'Transaction initiation failed' });
      }

      // Transaction initiated successfully, and you have the transaction hash
      res.status(200).json({ transactionHash });
    });
  } else {
    // Redirect to the login page if the user is not authenticated
    res.redirect('/login');
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the Immutable Passport Example App!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
