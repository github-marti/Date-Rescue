const express = require("express");
require('dotenv').config();
const session = require("express-session");
const passport = require("./config/passport");
const bodyParser = require("body-parser");
const accountSid = 'AC7a88ff772388157d0ffe6319140b678b';
const authToken = process.env.TWILIO_KEY;
const client = require('twilio')(accountSid, authToken);
const callMiddleware = require('./middleware');

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;

// Requiring our models for syncing
const db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser());

// Check for new calls and compare them with current loaded upcoming call
app.use(callMiddleware());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/call-api-routes")(app);
require("./routes/event-api-routes")(app);
require("./routes/location-api-routes")(app);
require("./routes/text-api-routes")(app);
require("./routes/user-api-routes")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});




