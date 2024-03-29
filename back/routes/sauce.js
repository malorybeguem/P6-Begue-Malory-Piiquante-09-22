//REQUIRES ::
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const sauceCtrl = require('../controllers/sauce');

//ROUTES//
router.get('/', auth, sauceCtrl.getSauces);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.likeSauce);

// EXPORTING ROUTER//
module.exports = router;