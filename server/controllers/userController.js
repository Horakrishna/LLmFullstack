import Stripe from "stripe";
import Course from "../models/Course.js";
import { Purchase } from "../models/Purchase.js";
import User from "../models/User.js";
//Get user Data
export const getUserData =async(req,res)=>{

    try {
        const userId = req.auth.userId
        const user = await User.findById(userId)
        if (!user) {
            return res.json({
                success:false,
                message:'User Not found'
            })
        }
        return res.json({
                success:true,
                user
         })
    } catch (error) {
        res.json({
        success:false,
        message: error.message
        })
    }
}
// User Enrolled courses with Lecture Link

export const userEnrolledCourses =async (req,res)=>{
    try {
       const userId = req.auth.userId
       const userData = await User.findById(userId).populate('enrolledCourses')
       res.json({
          success:true,
            enrolledCourses: userData.enrolledCourses
       }) 
    } catch (error) {
         res.json({
        success:false,
        message: error.message
        })
    }
}
// Course Purchased
export const purchaseCourse = async (req,res)=>{
   try {
    //requist to Header
    const { courseId } =  req.body
    const { origin }   =  req.headers

    //Pass user Data and Course Data
    const userId = req.auth.userId
    const userData = await User.findById(userId)
    const courseData = await Course.findById(courseId)

    if (!userData || !courseData) {
         res.json({
        success:false,
        message:"Data Not Found"
        })
    
    }
    const purchaseData = {
        courseId : courseData._id,
        userId,
        amount:(courseData.coursePrice - courseData.discount * courseData.coursePrice/100).toFixed(2),
       
    }
     // Store Purchase Data to db
     const newPurchase = await Purchase.create(purchaseData)
    //  Stripe GateWay Initialize
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)
    const currency = process.env.CURRENCY.toLowerCase()
    // Creating Line steps to Stripe
    const line_items = [{
        price_data:{
            currency,
            product_data:{
                name:courseData.courseTitle
            },
            unit_amount: Math.floor(newPurchase.amount) * 100
        },
        quantity:1
    }]
    // Payment Session
    const session = await stripeInstance.checkout.sessions.create({
        // Loading url
        success_url:`${origin}/loading/my-enrollments`,
        // Cancel Loading Url
        cancel_url:`${origin}`,
        line_items:line_items,
        mode:'payment',
        metadata:{
            purchaseId : newPurchase._id.toString()
        }
    })
    return res.json({
        success:true,
        session_url: session.url
    })
   } catch (error) {
     res.json({
        success:false,
        message: error.message
        })
   } 
}