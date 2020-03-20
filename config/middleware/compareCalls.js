const db = require("../../models");
const { updateTimer } = require("../calls");
const shortid = require("shortid");

// middleware for comparing any new scheduled calls with the most recent upcoming call in the database
module.exports = function () {
    return function (req, res, next) {
        if (req.body && req.body.call_utc) {
            req.shortid = shortid.generate();

            // find the upcoming call from the database
            db.Call.findOne({
                include: [
                    {
                        model: db.Event,
                        attributes: ['event_utc'],
                    }
                ],
                order: [
                    ['call_utc', 'ASC']
                ]
            })
                .then(results => {
                    let newCall = req.body.call_utc;
                    let phoneNumber = req.user.phoneNumber;

                    // if an upcoming call was found, compare the upcoming call time with the newly saved call time
                    if (results) {
                        let upcomingCall = results.call_utc;

                        // if the new call is sooner in the future than the upcoming call, update the server-side timer to the new call
                        if (newCall < upcomingCall) {
                            updateTimer(newCall, req.shortid, phoneNumber);
                        }
                    
                    // if there are no upcoming calls, update the server-side time to the new call
                    } else {
                        updateTimer(newCall, req.shortid, phoneNumber);
                    }
                });
        };
        next();
    };
};