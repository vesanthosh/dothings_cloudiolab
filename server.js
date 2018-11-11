const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');
const items = require("./routes/api/items");

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db_url = require("./config/keys").mongoURI; // Have to implement collections logic seperatly.

// Connect to Mongo
mongoose.connect(db_url, { useNewUrlParser: true }, function (err, db) {
  if (!err) console.log("MongoDB Connected...");
  else console.log(err);
}
);

// User Routes
app.use("/api/items", items);

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