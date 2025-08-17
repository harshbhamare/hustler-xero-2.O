const express = require("express");
const router = express.Router();
const Course = require('../models/courseModel'); 

router.get("/", async (req, res) => {
  try {
    // Fetch all courses from the database
    const allCourses = await Course.find({});

    // Pass the fetched courses to your index.ejs template
    res.render("index", { courses: allCourses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).send("An error occurred while fetching course data.");
  }
});

module.exports = router;