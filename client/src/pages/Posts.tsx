import axios from "axios"
import "../main.css"

import { useEffect, useState } from "react"


interface PostType{
    author:string,
    title:string, 
    content:string, 
    image:string
}

export const Posts=()=>{

    const [posts, setPosts]=useState<PostType[]>()
    const [error, setError]=useState<unknown|any>()

    console.log("RENDERS")

    const fetchPosts=async ()=>{
       try{
        const {data} = await axios.get('http://localhost:3000/api/test')
        setPosts(data)
        console.log("renders")
       
       }catch(e){ 
           setError(e)
        
       }
    

    }
    
    useEffect(()=>{
        fetchPosts()
    },[])
    

    return <> 

              <div className="post_main">
                 <div className="post_header">
                    <p>You can post your thoughts in here</p>

                 </div>
                 <div className="post_form"> 

                 <div className="post_content">
                    {posts?.map((post)=>{
                        return <div className="post_item">
                                   <div className="post_item_top">
                                        <h2 className="post_item_author">{post.author}</h2>
                                        <h3 className="post_item_title">{post.title}</h3>
                                   </div>
                                   <div className="post_item_foot">
                                        <p className="post_item_content">
                                            {post.content}
                                        </p>
                                   </div>
                                    
                               </div>
                    })}
                 </div>
                 <div className="post_create">

                 </div>
                    
                    
                 </div>
                 

              </div>
           </>
}