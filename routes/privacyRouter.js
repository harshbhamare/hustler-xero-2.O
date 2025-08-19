const express = require("express");
const router = express.Router();


router.get("/privacy-policy", (req, res) => {
    res.render("privacy");
});

module.exports = router;