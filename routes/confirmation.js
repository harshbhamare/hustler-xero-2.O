const express = require("express");
const router = express.Router();


router.get("/confirmation-message", (req, res) => {
    res.render("confirm");
});

module.exports = router;