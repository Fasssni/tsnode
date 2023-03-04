
const Router=require('express')
const Post = require('./store/models')


const router=new Router()

router.post("/test",async (req, res)=>{ 
        try{
        const {author,title,content,image}=req.body
        const post= await Post.create({author,title,content,image})
        res.status(200).json(post)
        }catch(e){
            res.status(500).json(e)
    
        }})
    
module.exports=router