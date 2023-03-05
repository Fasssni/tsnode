import axios from "axios"
import "../main.css"

import { SetStateAction, useEffect, useState } from "react"


interface PostType{
    author?:string,
    title:string, 
    content:string, 
    image?:string,
    id?:string
}

export const Posts=()=>{

    const [posts, setPosts]=useState<PostType[]>()
    const [value, setValue]=useState<PostType>({ 
                                                    author:"",
                                                    title:"", 
                                                    content:""
                                                })
    const [error, setError]=useState<unknown|any>()

    console.log("RENDERS")

    const fetchPosts=async ()=>{
        
       try{
        const {data} = await axios.get('http://localhost:3000/api/test')
        setPosts(data)
        console.log("renders")
       
       }catch(e){ 
           setError(e)
           setTimeout(()=>{ 
            fetchPosts()
           },6000)
        
       }
    }
    
    const postHandler=async ()=>{ 
        
        try{ 
        localStorage.setItem("author", JSON.stringify(value.author))
        await axios.post("http://localhost:3000/api/test",value)
        await fetchPosts()

        

        
        }catch(e){
            setError(e)
        }finally{
            setValue(prevValue=>{return {...prevValue,title:"", content:""}})
        }

    }

    const getAuhtor=()=>{
        

    }
    useEffect(()=>{
        fetchPosts()
        const localAuthor=localStorage.getItem("author")
        if(localAuthor){
            setValue({...value,author:JSON.parse(localAuthor)})
        }
        
    },[])

   
    

    return <> 

              <div className="post_main">
                 <div className="post_header">
                    <p>You can post your thoughts in here</p>

                 </div>
                 <div className="post_form"> 

                 <div className="post_content">
                    {posts?.map((post)=>{
                        return <div key={post.id} className="post_item">
                                   <div className="post_item_top">
                                        <h2 className="post_item_author">{post.author}-</h2>
                                        <h3 className="post_item_title">{post.title}:</h3>
                                   </div>
                                   <div className="post_item_foot">
                                        <p className="post_item_content">
                                            "{post.content}"
                                        </p>
                                   </div>
                                    
                               </div>
                    })}
                     {error&&<p style={{color:"red",textAlign:"center"}}>Something went wrong on server: {error.message}</p>}
                 </div>
                 <div className="post_create">
                    <form className="form">
                        <input className="post_input" 
                               placeholder="your name"
                               value={value.author}
                               onChange={(e)=>!localStorage.getItem("author")&&setValue({...value,author:e.target.value})}
                               />
                        <input className="post_input" 
                               placeholder="title"
                               value={value.title}
                               onChange={(e)=>{setValue({...value,title:(e.target.value)})}}
                               />
                        <input className="post_input" 
                               placeholder="content"
                               style={{height:"12vh"}}
                               value={value.content}
                               onChange={(e)=>{setValue({...value,content:e.target.value})}}
                               />
                        <button
                         onClick={(e)=>{e.preventDefault();postHandler()}} 
                         className="btn">POST</button>
                    </form>
                 </div>
        
                    
                 </div>
                 

              </div>
           </>
}