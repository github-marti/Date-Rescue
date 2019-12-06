const db = require("../../models");
const { updateTimer } = require("../calls");
const shortid = require("shortid");

module.exports = function () {
    return function (req, res, next) {
        if (req.body && req.body.call_time) {
            req.shortid = shortid.generate();
            db.Call.findOne({
                include: [
                    {
                        model: db.Event,
                        attributes: ['event_date'],
                        include: [
                            {
                                model: db.User,
                                attributes: ['phoneNumber']
                            }
                        ]
                    }
                ],
                order: [
                    ['call_time', 'ASC']
                ]
            })
                .then(results => {
                    console.log('req.body', req.body);
                    let newCall = Date.parse(new Date(`${req.body.event_date}T${req.body.call_time}:00.000`));
                    console.log('newCall')
                    let callid = req.shortid;
                    let phoneNumber = req.user.phoneNumber;
                    if (results) {
                        let upcomingCall = Date.parse(new Date(`${results.Event.event_date.split('T')[0]}T${results.call_time}:00.000`));
                        console.log('newcall', newCall, 'upcomingCall', upcomingCall);
                        if (newCall < upcomingCall) {
                            updateTimer(newCall, req.shortid, phoneNumber);
                        }
                    } else {
                        console.log('newcall', newCall);
                        updateTimer(newCall, callid, phoneNumber);
                    }
                });
        };
        next();
    };
};