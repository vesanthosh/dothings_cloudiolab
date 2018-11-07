const express  = require('express');
const mongoose  = require('mongoose');
const bodyParser  = require('body-parser');

const items = require('./routes/api/items');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db_url = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.connect(db_url, {useNewUrlParser: true}, function(err, db) {
    if(!err)
        console.log('MongoDB Connected...');
    else
        console.log(err);
});

// User Routes
app.use('/api/items', items);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log('Server started on port '+port));