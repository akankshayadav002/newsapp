const express =require('express');
const { addCategory, deleteCategories, editCategory, getAllCategories } = require('../controllers/categoryControllers');
const router=express.Router();
const protect=require('../middlewares/authMiddleware.js')


router.route('/addCategory').post(protect,addCategory);
router.route('/deleteCategory/:catId').delete(protect,deleteCategories);
router.route('/getAllCategory').get(getAllCategories);
router.route('/editCategory/:catId').put(protect,editCategory);


module.exports=router;
