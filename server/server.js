import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import connectCloudinary from './configs/cloudinary.js';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js';
import courseRouter from './routes/courseRoute.js';
import educatorRouter from './routes/educatorRoute.js';
import userRouter from './routes/userRoute.js';

//Initialize Express
const app = express()
//connect to database
await connectDB()
await connectCloudinary()

//Middleware
app.use(cors())
app.use(clerkMiddleware())
// Route
app.get('/',(req,res)=> res.send('Api is Working'))
app.post('/clerk',express.json(), clerkWebhooks)
// Educator Route
app.use('/api/educator', express.json(), educatorRouter)
// Course Route
app.use('/api/course', express.json(), courseRouter)
//Api for users
app.use('/api/user',express.json(),userRouter)
// Payment Api
app.use('/stripe',express.raw({ type: 'application/json'}), stripeWebhooks)
//Port
const PORT =process.env.PORT | 5000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})