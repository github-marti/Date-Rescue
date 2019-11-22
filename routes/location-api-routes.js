const { locationsController } = require("../controllers");

module.exports = function(app) {
    app.get("/api/locations", locationsController.findAll);
    app.get("/api/locations/:id?location_city=", locationsController.find)
    app.post("/api/locations", locationsController.create);
    app.put("/api/locations/:id?like=", locationsController.update);
    app.put("/api/locations/:id?dislike=", locationsController.update);

}