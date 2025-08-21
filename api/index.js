const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const router = express.Router();
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();

const dbURI = process.env.MONGO_URI; 

if (!dbURI) {
    console.error('FATAL ERROR: MONGO_URI is not defined in the .env file.');
    process.exit(1);
}

mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
        console.error('MongoDB connection failed:', err);
        process.exit(1);
    });

const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser());

const registerRouter = require("../routes/studentRegister")
const homeRouter = require("../routes/homeRouter")
const adminRouter = require("../routes/adminRouter")
const courseRoutes = require('../routes/courseRouter');
const aboutRouter = require("../routes/aboutRouter")
const detailsRouter = require("../routes/detailsRouter")
const adminLogin = require("../routes/adminLogin");
const adminSignup = require("../routes/adminSignup");
const privacyRouter = require("../routes/privacyRouter")
const termsRouter = require("../routes/termsRouter")
const contactRouter = require("../routes/contactRouter")
const refundRouter = require("../routes/refundRouter")
const confirmRouter = require("../routes/confirmation")

app.use("/", homeRouter)
app.use("/", aboutRouter)
app.use("/register", registerRouter)
app.use("/get-reg-form", registerRouter)
app.use("/dashboard", adminRouter)
app.use('/courses', courseRoutes);
app.use("/", courseRoutes)
app.use("/", detailsRouter)
app.use("/login-admin", adminLogin);
app.use("/signup-admin", adminSignup);
app.use("/", privacyRouter)
app.use("/", termsRouter)
app.use("/", contactRouter)
app.use("/", refundRouter)
app.use("/", confirmRouter)


// app.listen(port, () => {
//   console.log(`Admin dashboard is running at http://localhost:${port}`);
// });

module.exports = app;