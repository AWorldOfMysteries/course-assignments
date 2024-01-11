const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { jwtPassword } = require("../../02-jwt");
const router = Router();
const jwt = require("jsonwebtoken");
const { User } = require("../../03-mongo/db");
const { Admin, Course } = require("../db");


// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    // check if user already exists
    await Admin.create({
        username,
        password
    });
    //.then()
    res.json({
        message: 'Admin created successfully'
    });
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.find({
        username,
        password
    });

    if(user){

        const token = jwt.sign({username}, jwtPassword);
        res.json({
            token: token
        });
    }
    else{
        res.status(411).json({
            msg: "Incorrect Email and Password"
        });
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    // zod 
    const newCourse = await Course.create({
        title, 
        description, 
        imageLink, 
        price
    })

    Course.find
    res.json({
        message: 'Course created successfully',
        courseId: newCourse._id
    });
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courseArray = [];
    const courseEntries = await Course.find();

    courseEntries.forEach((entry) => {
        courseArray.push(entry);
    });

    res.json({
        courses: courseArray
    });
});

module.exports = router;