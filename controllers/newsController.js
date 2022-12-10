const News=require('../models/newsModel')
const imageToBase64= require('image-to-base64')

const addNews=async(req,res,next)=>{
 
    try{
        console.log(req.query)
        const {title,content,author,category}=req.body
        const baseData= await imageToBase64(req.body.newsImage.path)

        const news=await News.create({
            author,content,addToSlider,category,newsImage:`data:${req.files.newsImage.type};base64,${baseData}`,addedAt:Date.now()
              
        })
        if(news){
            res.status(201).json({
                success:true,
                msg:'News added succesfully.',
                data: news

            })
        }else{
            res.status(400).json({
                success:false,
                msg:'Invalid news data'
                
        })

        }
            

    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            msg:'Internal error occured.'
            
    })
    }
}



const getAllNews=async(req,res,next)=>{
    try{
        const news =await News.find({});
        const  size =req.params.pageSize;
        const pageNo=req.params.pageNo;
        var query={};
        query.skip=size *(pageNo-1);

        
        
    if (category){
        return res.status(401).json({
            success:false,
            msg: 'Category already exists'
        })
    }
    const new_category= await Category.create({category_name});
    res.status(201).json({
        success:true,
        msg:'Category Created',
        data:new_category
    });}catch(error){
        res.status(500).json({
            success:false,
            msg:'Internal error occured.'
            
        })
    }
}
module.exports={
    addNews,
    getAllNews

}