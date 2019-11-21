const { callsController } = require("../controllers");

module.exports = function (app) {
    app.post("/api/dates/:dateid/calls", callsController.create);
    app.route("/api/dates/:dateid/calls/:id")
        .get(callsController.getOne)
        .put(callsController.update)
        .delete(callsController.delete)
}