const db = require("../models");

module.exports = {
    create: function (req, res) {
        db.Locations.create({
            location_name: req.body.location_name,
            location_address: req.body.location_address,
            location_city: req.body.location_city,
            location_state: req.body.location_state,
            location_zip: req.body.location_zip,
            angel_shot: req.body.angel_shot,
            location_like: req.body.location_like,
            location_dislike: req.body.location_dislike
        })
            .then(function () { res.redirect(307, "/api/login") })
            .catch(function (err) { console.log(err); })
    },
    logOut: function (req, res) {
        req.logout();
        res.redirect("/");
    },
    getLocationData: function (req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                email: req.user.email,
                username: req.user.username,
                id: req.user.id
            })
        }
    }
}