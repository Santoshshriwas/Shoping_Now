const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const { addCloath, removeCloath, getAllCloaths } = require("../Controllers/CloathController");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Create a unique name
  }
});
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter
});



router.post("/add", upload.single("image"), addCloath);
router.delete("/remove/:id", removeCloath);
router.get("/all", getAllCloaths);

module.exports = router;
