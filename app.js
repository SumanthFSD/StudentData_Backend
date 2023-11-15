const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const routes = require('./routes'); // Import the aggregated routes
const connectDB = require('./config'); // Import the MongoDB connection

const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Set up sessions with MongoStore
const mongoStore = new MongoStore({
  mongooseConnection: connectDB, // Use the existing Mongoose connection
  autoRemove: 'disabled',
});

app.use(
  session({
    secret: 'justSecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: (1000 * 60 * 100)
    },
    store: mongoStore
  })
);

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', (req, res) => {
  // Check if the user is authenticated (logged in)
  if (req.session && req.session.userId) {
    // User is authenticated, render the home page
    res.render('layout');
  } else {
    // User is not authenticated, redirect to the login page
    res.redirect('/login');
  }
});

app.get('/logout', (req, res) => {

  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.sendStatus(500); // Internal Server Error
    } else {
      res.redirect('/login'); // Redirect to the login page after logout
    }
  });
});

app.use(routes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

