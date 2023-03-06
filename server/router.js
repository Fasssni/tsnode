
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

router.get("/test", async (req,res)=>{
    try{
    const posts=await Post.find()
    res.status(200).json(posts)
    }catch(e){
    res.status(500).json(e)
    }
})

router.post('/test-delete', async(req, res)=>{

       try{
       const {id}=req.body
       await Post.findByIdAndDelete(id)
       res.status(200).json('success')
       }catch(e){
         res.status(500).json(e)
       }

})
    
module.exports=router