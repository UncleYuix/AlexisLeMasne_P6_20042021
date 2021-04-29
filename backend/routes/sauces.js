const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const saucesCtrl = require("../controllers/sauces");

router.get("/", auth, saucesCtrl.getAllsauces);
router.get("/:id", auth, saucesCtrl.getOneSauce);
router.post("/", auth, multer, saucesCtrl.createSauce);
router.put("/:id", auth, multer, saucesCtrl.modifySauce);
// - ça n'a rien a foutre là, le vol c'est mal : router.post("/:id/like", auth, multer, saucesCtrl.likeDislikeSauce);
router.delete("/:id", auth, saucesCtrl.deleteSauce);

module.exports = router;