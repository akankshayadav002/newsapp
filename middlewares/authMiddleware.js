const jwt=require('jsonwebtoken')

const User=require('../models/usermodel')

const protect=async(req,res,next)=>{
    let token;
    
    
    if(req.headers.authorization  && req.headers.authorization.startsWith('bearer')){
        try{
            console.log('Inside try block')
            token =req.headers.authorization.split(' ')[1];
            console.log(token)
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.header= await User.findById(decoded.id).select('-password');
            next();

        }catch(error){
            console.log(error);
            res.status(401).json({
                success:false,
                msg:'Error authorization failed'
            })

        }
    }

    if(!token){
        res.status(401).json({
            sucess:false,
            msg:'Not authorised,no token'
        })
    }
}

module.exports= protect;