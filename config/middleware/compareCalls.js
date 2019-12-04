const db = require("../../models");
const { updateTimer } = require("../calls");

module.exports = function () {
    return function (req, res, next) {
        if (req.body && req.body.call_time) {
            console.log('SAVING A TIME');
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
                    let upcomingCall = Date.parse(new Date(`${results.Event.event_date.split('T')[0]}T${results.call_time}:00.000`));
                    let newCall = Date.parse(new Date(`${req.body.event_date}T${req.body.call_time}:00.000`));
                    console.log('upcomingCall', upcomingCall);
                    console.log('newCall', newCall);
                    let callid = results.id;
                    let phoneNumber = results.Event.User.phoneNumber;
                    if (newCall < upcomingCall) {
                        console.log('need to update timer!');
                        updateTimer(newCall, callid, phoneNumber);
                    }
                });
        };
    next();
    };
};