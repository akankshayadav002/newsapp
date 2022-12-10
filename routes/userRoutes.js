const express= require('express')
const router= express.Router();
const protect= require('../middlewares/authMiddleware')

const{
    registerUser,
    authUser,
    getUserProfile,
    updateUserProfile
}=require('../controllers/userControllers');

router.route('/').post(registerUser);
router.route('/login').post(authUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)

module.exports=router;