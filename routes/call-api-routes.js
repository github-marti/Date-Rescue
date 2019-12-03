const { callsController } = require("../controllers");

module.exports = function (app) {
    app.get("/calls/upcoming", callsController.getUpcoming);
    app.post("/calls/outgoing/:phonenumber", callsController.makeCall);
    app.post("/api/dates/:eventid/calls", callsController.create);
    app.route("/api/dates/:eventid/call/:callid")
        .get(callsController.findOne)
        .put(callsController.update)
        .delete(callsController.delete)
}