const { eventsController } = require("../controllers");
const shortid = require('shortid');
const mime = require('mime');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + shortid.generate() + '.' + mime.getExtension(file.mimetype))
    }
});
const upload = multer({storage: storage});

module.exports = function (app) {
    app.get("/api/users/:userid/dates", eventsController.getAll);
    app.get("/api/users/:userid/dates/:id", eventsController.getOne);
    app.get("/dates/:guid", eventsController.getByGUID);
    app.post("/api/dates", eventsController.create);
    app.post("/api/dates/:id/images/upload", upload.single('image'), eventsController.uploadImage);
    app.put("/api/dates/:id", eventsController.update);
    app.delete("/api/dates/:id", eventsController.delete);
}