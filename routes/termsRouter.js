const express = require("express");
const router = express.Router();


router.get("/terms-and-conditions", (req, res) => {
    res.render("terms");
});

module.exports = router;