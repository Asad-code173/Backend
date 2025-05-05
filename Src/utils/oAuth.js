// import { auth } from 'express-openid-connect';


// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: 'a long, randomly-generated string stored in env',
//   baseURL: 'http://localhost:8000',
//   clientID: '04l7La5GkNZWPZBqoQUijmwSvKWRAMlL',
//   issuerBaseURL: 'https://dev-zc1nrmzxckodlssh.us.auth0.com'
// };

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// // req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });



// To display the user's profile, your application should provide a protected route.

// Add the requiresAuth middleware for routes that require authentication. Any route using this middleware will check for a valid user session and, if one does not exist, it will redirect the user to log in.

// const { requiresAuth } = require('express-openid-connect');

// app.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });
