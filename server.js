const express=require('express');
const { default: mongoose } = require('mongoose');
const morgan=require('morgan');
const connectDb=require('./config/db');
const userRoute=require('./routes/userRoutes.js');
const categoryRoute= require('./routes/categoryRoute.js')
const newsRoute= require('./routes/newsRoute.js')
const formData=require('express-form-data')


require('dotenv').config();  //why directly using it
require('colors');
const app=express();

if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/users',userRoute);
app.use('/api/category',categoryRoute);
app.use('/api/news',newsRoute);


console.log('calling connect db')
connectDb();
const PORT=process.env.PORT||3000;


app.listen(
    PORT,
    console.log(`The app is connected in ${process.env.NODE_ENV} on port ${PORT}`.cyan)
);


