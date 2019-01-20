const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');
const passport = require('passport');

// Supplying API routes
const user = require('./routes/api/user');
const profile = require("./routes/api/profile");
const todoItem = require("./routes/api/todoItem");

const app = express();

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: false })); // need to verify and check
app.use(bodyParser.json());

// DB Config
const db_url = require("./config/keys").mongoURI; // Have to implement collections logic seperatly.

// Connect to Mongo
mongoose.connect(db_url, { useNewUrlParser: true }, function (err, db) {
  if (!err) console.log("MongoDB Connected...");
  else console.log(err);
});

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport); // Passing "passport" and it has many authentication strategy such as local, google and jwt like that.

// User Routes
app.use('/api/user', user);
app.use("/api/profile", profile);
app.use("/api/todoItem", todoItem);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {

  // Set statci folder
  app.use(express.static('client/build'));

  // redirecting routes to the default page.
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 3001;
app.listen(port, () => console.log("Server started on port " + port));