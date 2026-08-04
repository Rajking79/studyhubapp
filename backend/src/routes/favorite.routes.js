const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favorite.controller");
const { authenticate, restrictGuest } = require("../middlewares/auth.middleware");

router.use(authenticate);

router.get("/", favoriteController.getFavorites);
router.post("/toggle", restrictGuest, favoriteController.toggleFavorite);

module.exports = router;
