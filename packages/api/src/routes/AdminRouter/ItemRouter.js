const router = require("express").Router();
const controller = require("../../controllers/ItemController");
const path = require('path')

// MULTER CONFIG
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..','..','..', "/public/items/images"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.route("/upload").post(upload.array("img", 5), (req, res) => {
  console.log(req.files);
  const paths = req.files.map((file) => file.path.split("public")[1]);
  res.send(paths);
});

router.route("/").post(controller.createItem).get(controller.getAll);

router
  .route("/:itemId")
  .get(controller.getOne)
  .delete(controller.delete)
  .put(controller.edit)
  .patch(controller.edit);

module.exports = router;
