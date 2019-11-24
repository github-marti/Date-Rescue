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
    app.get("/api/users/:userid/events", eventsController.getAll);
    app.get("/api/users/:userid/events/:id", eventsController.getOne);
    app.get("/events/:guid", eventsController.getByGUID);
    app.post("/api/events", eventsController.create);
    app.post("/api/events/:id/images/upload", upload.single('image'), eventsController.uploadImage);
    app.put("/api/events/:id", eventsController.update);
    app.delete("/api/events/:id", eventsController.delete);
}