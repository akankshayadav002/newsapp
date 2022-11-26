const User=require('../models/usermodel')
var mailer=require('../utils/mailer')
const generateToken=require('../utils/generatetoken')
const crypto=require('crypto')

const registerUser=async (req,res,next)=>{
    try{
        const {name,email,password} =req.body;
        const userExists= await User.findOne({email})

        if(userExists && userExists.active){
            return res.status(400).json({
                success:false,
                msg:'Entered email is already registered with us. please login to continue with us'

            })}else if(userExists &&!userExists.active){
                return res.status(400).json({
                    sucess:false,
                    msg:'Account created but user is not active. A link is send to your registered mobile no'

                })
            }
            const user=new User({
                name,email,password
            });

            crypto.randomBytes(20,function(err,buf){
                user.activateToken=user._id + buf.toString('hex')
                user.activeExpires =Date.now() +24 *3600*1000;
                var link=process.env.NODE_ENV=='development'? `http://localhost:${process.env.PORT}/api/user/active/${user.activeToken}`
                : `${process.env.api_host}/api/user/active/${user.activeToken}`;
                mailer.send({
                    to:req.body.email,
                    subject:'Welcome',
                    html:'Please click <a href="'+ link + '">here</a> to activate your account'
                })

                user.save(function(err,user){
                    if(err)return next(err);
                    res.status(201).json({
                        success: true,
                        msg:'This activation email has been sent to'+user.email+',please click on the activation link before 24 hours'
                    })
                })
            })
        }catch(error){
            console.log(error);
            res.status(500).json({
                success: false,
                msg:'Server having some issues'
            })
        }
    
}

const activeToken=async(req,res,next)=>{
    User.findOne({
        activeToken:req.params.activeToken,
        activeExpires: {$gt:Date.now()}
    },function (err,user){
        if(!user){
            return res.status(400).json({
                success:false,
                msg: 'Your activation link is invalid'
            })
        }
        if(user.active ==true){
            return res.status(200).json({
                success:false,
                msg:'Your account activated. Go and login to use this app'
            })
        }
        user.active=true;
        user.save(function(err,user){
            if(err) return next(err);

            res.json({
                sucess:true,
                msg:'Activation success'
            })
        })
    })
}

const authUser=async(req,res)=>{
    const {email,password}=req.body;
    const user =await User.findOne({email});
    if(user && (await user.password)){
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            avatar:user.avatar,
            token:generateToken(user._id)
        })
    }else{
        res.status(401).json({
            success:false,
            msg:'Unauthorized user'
        })
    }
}

const getUserProfile=async(req,res)=>{
    const user =await User.findById(req.header._id);
    if(user){
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            avatar:user.avatar,
            token:generateToken(user._id)

        })
    }else{
        res.status(404).json({
            success:false,
            msg:'User not found'
    })
}
}
const updateUserProfile=async(req,res)=>{
    const user=await User.findById(req.header._id);
    if(user){
        user.name=req.body.name || user.name;
        user.email=req.body.email || user.email;
        user.avatar=req.body.avatar || user.avatar;
    
    const updatedUser =await user.save();
    res.json({
        _id: updatedUser._id,
        name:updatedUser.name,
        email: updatedUser.email,
        avatar:updatedUser.avatar,
        token: generateToken(updatedUser._id)
    })}else{
        res.satus(404).json({
            sucess:false,
            msg:'User not found'
        })
    }
}
module.exports={
    registerUser,
    activeToken,
    authUser,
    getUserProfile,
    updateUserProfile
}