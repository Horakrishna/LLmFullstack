import { clerkClient } from '@clerk/express';
import { v2 as cloudinary } from 'cloudinary';
import Course from '../models/Course.js';
import { Purchase } from '../models/Purchase.js';
export const updateRoleToEducator =async(req,res)=>{
    try {
        const userId =req.auth.userId
        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata:{
                role: 'educator'
            }
        })
        res.json({
            success:true,
            message:"you can published a Course now"
        })
    } catch (error) {
         res.json({
            success:false,
            message: error.message
        })
    }
}
// Add Course
export const addCourse =async(req,res)=>{

    try {
     const { courseData } =req.body
     const imageFile =req.file
     const educatorId =req.auth.userId
     if (!imageFile) {
        return res.json({
            success:true,
            message:"Image Not Attached"
        })
     }
     const parsedCourseData = await JSON.parse(courseData)
     parsedCourseData.educator = educatorId
    //  Store Data
    const newCourse = await Course.create(parsedCourseData)
    //add Image
    const imageUpload = await cloudinary.uploader.upload(imageFile.path)
    newCourse.courseThumbnail =imageUpload.secure_url
    await newCourse.save();
     res.json({
        seccess:true,
        message:"Course Added"
     })
    } catch (error) {
         res.json({
        seccess:false,
        message: error.message
     })
    }
}
//Get Educator Courses
export const getEducatorCourses = async(req,res)=>{
      try {
        const educator = req.auth.userId
        // Find The educator Course
        const courses = await Course.find({educator})
         res.json({
        seccess:true,courses
     })
      } catch (error) {
          res.json({
        seccess:false,
        message: error.message
     })
    }
}

// Get Educator Dashboard Data total earning 
export const educatorDashBoardData = async(req,res)=>{

    try {
        const educator = req.auth.userId
        // Find The educator Course
        const courses = await Course.find({educator})
        const totalCourses =courses.length;

        const courseIds =courses.map(course=>course._id)
        // Calculate Total Earning
        const purchases = await Purchase.find({
            courseId: {$in:courseIds},
            status:'completed'

        });
        const totalEarning = purchases.reduce((sum,purchases)=> sum + purchases.amount, 0 );
        // collect unique enrolled student Ids with there course Title
        const enrolledStudentsData = [];
        for (const course of courses) {
            const students = await User.find({
                _id: {$in:course.enrolledStudents}
            },' name imageUrl');
            students.forEach(student => {
                enrolledStudentsData.push({
                    courseTitle: course.courseTitle,
                    student
                })
            });
        }
        res.json({
            success:true,
            dashboardData:{
                totalEarning, enrolledStudentsData,totalCourses
            }
        })
    } catch (error) {
        res.json({
        seccess:false,
        message: error.message
        })
    }
}
//Get Enrolled students data whit purchases data
export const getEnrolledStudentsData =async(req,res)=>{
    try {
       const educator = req.auth.userId;
       const courses =await Course.find({educator});
       const courseIds = courses.map(course=>courseIds)
       const purchases = await Purchase.find({
        courseIds:{ $id:courseIds},
        status: 'Completed'
       }).populate('userId', 'name imageUrl').populate('courseId','courseTitle')
    //    Find Student data
    const enrolledStudents =purchases.map(purchase => ({
        student: purchase.userId,
        courseTitle:purchase.courseId.courseTitle,
        purchaseData:purchase.createdAt
    }))
    res.json({
            success:true,
           enrolledStudents
        })
    } catch (error) {
        res.json({
        seccess:false,
        message: error.message
        })
    }
}