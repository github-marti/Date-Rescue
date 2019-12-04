module.exports = function () {
    return function (req, res, next) {
        if (req.body) {
            db.Call.findOne({
                include: [
                    { model: db.Event }
                ],
                order: [
                    ['call_time', 'ASC']
                ]
            })
                .then(results => {
                    let upcomingCall = Date.parse(new Date(`${results.dataValues.Event.dataValues.event_date.split('T')[0]}T${results.dataValues.call_time}:00.000`));
                    let newCall = Date.parse(new Date(`${req.body.event_date}T${req.body.call_time}:00.000`));
                    console.log('UPCOMING CALL', upcomingCall);
                    console.log('NEW CALL', newCall);
                });
        };
    };
};