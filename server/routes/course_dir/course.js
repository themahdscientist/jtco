let express = require('express');
let router = express.Router();
let courseController = require('../controllers/courses.controller');

router
   .route('/')
   .post(courseController.createNewCourse)
   .get(courseController.readAllCourses)
   .put(courseController.updateACourse)
   .delete(courseController.deleteACourse);

router.route('/:id').get(courseController.readACourse);

module.exports = router;
