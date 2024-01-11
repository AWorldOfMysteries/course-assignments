const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");
// const { Course } = require("../db/index");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        username, 
        password
    });

    res.json({
        message: 'User created successfully'
    });


});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const courseList = await Course.find({});
    console.log(courseList);


    res.json({
        courses: courseList
    });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    try{

        await User.updateOne({
            username: username
        }, {
            "$push": {
                purchasedCourses: courseId
            }
        });
    }
    catch(e){
        console.log(e);
    }    

    res.json({
        message: 'Course purchased successfully'
    });
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;
    const result = await User.findOne({
        username: username
    })
    const idList = result.purchasedCourses;
    const purchasedCourseList = await Course.find({
        _id: {
            "$in": idList
        }
    });

    res.json({
        purchasedCourses: purchasedCourseList
    });
});

module.exports = router