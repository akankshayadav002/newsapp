const express =require('express');
const { 
    addNews, getAllNews

} = require('../controllers/newsController');
const router=express.Router();
const protect=require('../middlewares/authMiddleware.js')


router.route('/addNews').post(addNews);  //TODO: protect add 
router.route('/getAllNews').post(getAllNews); 


module.exports=router;