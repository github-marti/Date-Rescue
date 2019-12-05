const db = require("../../models");
const { updateTimer } = require("../calls");
const shortid = require("shortid");

module.exports = function () {
    return function (req, res, next) {
        if (req.body && req.body.call_time) {
            req.shortid = shortid.generate();
            console.log('initial shortid', req.shortid);
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
                    let newCall = Date.parse(new Date(`${req.body.event_date}T${req.body.call_time}:00.000`));
                    let callid = req.shortid;
                    console.log('shortid after results', callid);
                    let phoneNumber = req.user.phoneNumber;
                    if (results) {
                        let upcomingCall = Date.parse(new Date(`${results.Event.event_date.split('T')[0]}T${results.call_time}:00.000`));
                        if (newCall < upcomingCall) {
                            console.log('need to update timer!');
                            updateTimer(newCall, req.shortid, phoneNumber);
                        }
                    } else {
                        console.log('shortid in else', callid);
                        updateTimer(newCall, callid, phoneNumber);
                    }
                });
        };
        next();
    };
};