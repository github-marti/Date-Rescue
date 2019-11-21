const db = require("../models");

module.exports = {
    
    findAll: function(req, res) {
        db.Locations.findAll({
            where: {
                id: req.params.id
            }
        })
          .sort({ ascend: 1 })
          .then(results => res.json(results))
          .catch(err => res.status(422).json(err));
      },
    filter: function (req, res) {
        db.Locations.find({
            where: {
                id: req.params.id, 
                location_city: req.body.location_city
            }
        })
        .then(results => res.json(results))
        .catch(err => res.status(422).json(err))
    },
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
        .then(results => res.json(results))
        .catch(err => res.status(422).send(err))
    },
    update: function (req, res) {
        db.Locations.put(req.body,
            {where: {
                id: req.params.id,
                location_like: req.body.location_like,
                location_dislike: req.body.location_dislike
            }
        })
        .then(results => res.json(results))
        .catch(err => res.status(422).send(err))
    }
};