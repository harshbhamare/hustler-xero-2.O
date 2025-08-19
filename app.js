const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/hustlerXERO';
const router = express.Router();
const cookieParser = require('cookie-parser');

const app = express();

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully!');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    }
};



module.exports = connectDB;

const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());



const registerRouter = require("./routes/studentRegister")
const homeRouter = require("./routes/homeRouter")
const adminRouter = require("./routes/adminRouter")
const courseRoutes = require('./routes/courseRouter');
const aboutRouter = require("./routes/aboutRouter")
const detailsRouter = require("./routes/detailsRouter")
const adminLogin = require("./routes/adminLogin");
const adminSignup = require("./routes/adminSignup");

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

// app.get('*', (req, res) => {
//   res.redirect('/');
// });

connectDB()
app.listen(port, () => {
  console.log(`Admin dashboard is running at http://localhost:${port}`);
});
