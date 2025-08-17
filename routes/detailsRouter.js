const express = require("express");
const router = express.Router();
const Course = require('../models/courseModel'); 

router.get("/details/:id", async (req, res) => {
  try {
    // 1. Get the ID from the URL parameters
    const courseId = req.params.id;

    // 2. Find a single course by its ID
    const course = await Course.findById(courseId);

    // 3. Handle the case where no course is found
    if (!course) {
      return res.status(404).send("Course not found.");
    }

    // 4. Pass the single course object to your EJS template
    res.render("details", { course: course });
  } catch (error) {
    // 5. Handle errors (e.g., invalid ID format, database issues)
    console.error("Error fetching course details:", error);
    res.status(500).send("An error occurred while fetching course data.");
  }
});

module.exports = router;
