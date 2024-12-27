import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'
import userRouter from './route/user.route.js'
import categoryRouter from './route/category.route.js'
import uploadRouter from './route/upload.router.js'
import subCategoryRouter from './route/subCategory.route.js'
import productRouter from './route/product.route.js'
import cartRouter from './route/cart.route.js'
import addressRouter from './route/address.route.js'
import orderRouter from './route/order.route.js'

const app = express()
app.use(cors({
    credentials : true,
    origin : process.env.FRONTEND_URL
}))
// app.use(cors())
app.use(express.json())

// app.use((req, res, next) => {
//     let rawData = '';
//     req.on('data', chunk => {
//       rawData += chunk;
//     });
  
//     req.on('end', () => {
//       try {
//         req.body = JSON.parse(rawData); 
//       } catch (error) {
//         return res.status(400).send('Invalid JSON');
//       }
//       next();
//     });
//   });

app.use(cookieParser())

// const cookies = req.headers.cookie.split('; ').reduce((acc, cookie) => {
//     const [key, value] = cookie.split('=');
//     acc[key] = value;
//     return acc;
//   }, {});

app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy : false
}))

const PORT = 8080 || process.env.PORT 

app.get("/",(request,response)=>{
    ///server to client
    response.json({
        message : "Server is running " + PORT
    })
})

app.use('/api/user',userRouter)
app.use("/api/category",categoryRouter)
app.use("/api/file",uploadRouter)
app.use("/api/subcategory",subCategoryRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/address",addressRouter)
app.use('/api/order',orderRouter)

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is running",PORT)
    })
})

