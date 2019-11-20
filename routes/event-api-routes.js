const { eventsController } = require("../controllers");

module.exports = function (app) {
    app.get("/api/users/:userid/dates", eventsController.getAll);
    app.get("/api/users/:userid/dates/:id", eventsController.getOne);
    app.get("/dates/:guid", eventsController.getByGUID);
    app.post("/api/dates", eventsController.create);
    app.put("/api/dates/:id", eventsController.update);
    app.delete("/api/data/:id", eventsController.delete);
}