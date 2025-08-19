const express = require("express");
const router = express.Router();


router.get("/refund-policy", (req, res) => {
    res.render("refund");
});

module.exports = router;