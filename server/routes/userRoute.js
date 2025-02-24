import express from 'express';
import { addUserRatting, getUserCourseProgress, getUserData, purchaseCourse, updateUserCourseProgress, userEnrolledCourses } from '../controllers/userController.js';

const userRouter =express.Router()

userRouter.get('/data', getUserData)
userRouter.get('/enrolled-courses', userEnrolledCourses)
userRouter.post('/purchase', purchaseCourse)
userRouter.post('/update-course-progress',updateUserCourseProgress)
userRouter.post('/get-course-progress', getUserCourseProgress)
// Rating Route
userRouter.post('/add-rating', addUserRatting)

export default userRouter;