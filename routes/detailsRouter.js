const express = require("express");
const router = express.Router();
const Course = require('../models/courseModel'); 

router.get("/details/:id", async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).send("Course not found.");
    }

    res.render("details", { course: course });
  } catch (error) {
    console.error("Error fetching course details:", error);
    res.status(500).send("An error occurred while fetching course data.");
  }
});

module.exports = router;
