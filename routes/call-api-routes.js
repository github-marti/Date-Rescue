const { callsController } = require("../controllers");

module.exports = function (app) {
    app.get("/calls/upcoming", callsController.getUpcoming);
    app.post("/calls/outgoing/:phonenumber", callsController.makeCall);
    app.post("/api/dates/:dateid/calls", callsController.create);
    app.route("/api/dates/:dateid/calls/:id")
        .get(callsController.findOne)
        .put(callsController.update)
        .delete(callsController.delete)
}