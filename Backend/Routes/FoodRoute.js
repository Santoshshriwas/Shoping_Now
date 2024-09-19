const express= require("express");
const multer= require("multer");
const Food =require("../Controllers/FoodController")
const router = express.Router()

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
      return cb(null,`${Date.now()}${file.originalname}`);
  }
})
const upload = multer({ storage: storage})
router.get("/alllist",Food.listFood)
router.post("/add",upload.single("image"),Food.addFood)
router.post("remove",Food.removeFood);

module.exports= router;

