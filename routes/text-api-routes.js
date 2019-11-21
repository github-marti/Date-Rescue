const { textsController } = require("../controllers");

module.exports = function (app) {
    app.post("/api/dates/:dateid/texts", callsController.create);
    app.route("/api/dates/:dateid/texts/:id")
        .get(textsController.getOne)
        .put(textsController.update)
        .delete(textsController.delete)
}