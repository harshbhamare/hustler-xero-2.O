const express = require("express");
const router = express.Router();


router.get("/about-us", (req, res) => {
    res.render("about");
});

module.exports = router;