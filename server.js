const express = require("express");
require('dotenv').config();
const session = require("express-session");
const passport = require("./config/passport");
const bodyParser = require("body-parser");

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

// handle time management
function getNextCall() {
  db.Call.findOne({
    include: [
      { model: db.Event}
    ],
    order: [
      ['call_time', 'ASC']
    ]
  })
    .then(results => {
      let upcomingCall = `${results.dataValues.Event.dataValues.event_date.split('T')[0]}T${results.dataValues.call_time}:00.000`;
      let callid = results.dataValues.id;
      makeCall(upcomingCall, callid)
    });
};

function makeCall(upcomingCall, callid) {
  let nextCall = Date.parse(upcomingCall);
  let currentTime = Date.parse(new Date());
  let delta = nextCall - currentTime;
  console.log('DELTA', delta);
  console.log('NEXT CALL', nextCall, 'CURRENT TIME', currentTime)
  setTimeout(() => {
    db.Call.destroy({
      where: {
        id: callid
      }
    });
    getNextCall();
  }, delta);
};

getNextCall();


