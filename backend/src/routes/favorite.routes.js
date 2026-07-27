const express = require("express");
const router = express.Router();
const { toggleFavorite, getFavorites } = require("../controllers/favorite.controller");
const { verifyJWT, restrictGuest } = require("../middlewares/auth.middleware");

router.post("/toggle", verifyJWT, restrictGuest, toggleFavorite);
router.get("/", verifyJWT, getFavorites);

module.exports = router;
