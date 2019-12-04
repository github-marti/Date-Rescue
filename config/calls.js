const db = require('../models');
const accountSid = 'AC7a88ff772388157d0ffe6319140b678b';
const authToken = process.env.TWILIO_KEY;
const client = require('twilio')(accountSid, authToken);

let callTimeout;

const getUpcoming = () => {
    console.log("GETTING UPCOMING!!!!\n\n");
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
            if (results) {
                console.log('RESULTS', results.call_time);
                let upcomingCall = `${results.Event.event_date.split('T')[0]}T${results.call_time}:00.000`;
                let callid = results.id;
                let phoneNumber = results.Event.User.phoneNumber;
                startTimer(upcomingCall, callid, phoneNumber);
            } else {
                console.log('no upcoming calls');
            }
        })
        .catch(err => {
            console.log(err);
        });
};

const startTimer = (upcomingCall, callid, phoneNumber) => {
    console.log("STARTING TIMER!!!\n\n")
    let nextCall = Date.parse(upcomingCall);
    let currentTime = Date.parse(new Date());
    let delta = nextCall - currentTime;
    console.log("DELTA", delta);
    callTimeout = setTimeout(() => {
        client.calls
            .create({
                url: 'http://demo.twilio.com/docs/voice.xml',
                to: `+1${phoneNumber}`,
                from: '+19088420029'
            })
            .then(call => console.log(call.sid))
            .catch(err => console.log(err));
        db.Call.destroy({
            where: {
                id: callid
            }
        });
        getUpcoming();
    }, delta);
};

const updateTimer = (newCall, callid, phoneNumber) => {
    console.log('TIMER TO BE UPDATED', callTimeout);
    clearTimeout(callTimeout);
    console.log('TIMER CLEARED');
    startTimer(newCall, callid, phoneNumber);
    console.log('NEW TIMER STARTED FOR', phoneNumber);
};

module.exports = { getUpcoming, startTimer, updateTimer };