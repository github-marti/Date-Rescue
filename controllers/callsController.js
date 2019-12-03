const db = require("../models");
const accountSid = 'AC7a88ff772388157d0ffe6319140b678b';
const authToken = process.env.TWILIO_KEY;
const client = require('twilio')(accountSid, authToken);

module.exports = {
    getUpcoming: function(req, res) {
        db.Calls.findAll({ order: [
            ['scheduled_time', 'ASC']
        ]})
        .then(results => console.log(results))
    },
    makeCall: function (req, res) {
        client.calls
            .create({
                url: 'http://demo.twilio.com/docs/voice.xml',
                to: `+${req.params.phonenumber}`,
                from: '+19088420029'
            })
            .then(call => console.log(call.sid))
            .catch(err => console.log(err));
    },
    findOne: function (req, res) {
        db.Calls.findOne({ where: { id: req.params.id, EventId: req.params.dateid } })
            .then(results => res.json(results))
            .catch(err => res.status(422).json(err))
    },
    create: function (req, res) {
        db.Calls.create(req.body)
            .then(results => res.json(results))
            .catch(err => res.status(422).json(err))
    },
    update: function (req, res) {
        db.Calls.update(req.body, { where: { id: req.params.id, EventId: req.params.dateid } })
            .then(results => res.json(results))
            .catch(err => res.status(422).json(err))
    },
    delete: function (req, res) {
        db.Calls.destroy({ where: { id: req.params.id } })
            .then(results => res.json(results))
            .catch(err => res.status(422).json(err))
    }
}