import axios from "axios"
import "../main.css"

import { SetStateAction, useEffect, useState } from "react"
import { useDeletePostMutation, useLazyGetPostsQuery, useSendPostMutation } from "../store/mongodb/mongodb.api"


export interface GetType{
    author?:string,
    title:string, 
    content:string, 
    image?:string,
    _id:string
}


export interface PostType{
    author?:string,
    title:string, 
    content:string, 
    image?:string,
  
}

export const Posts=()=>{

    
    const [value, setValue]=useState<PostType>({ 
                                                    author:"",
                                                    title:"", 
                                                    content:""
                                                })
    const [error, setError]=useState<unknown|any>()

    const [sendPost, response]=useSendPostMutation()
    const [getPosts,{isLoading,isError,data}]=useLazyGetPostsQuery()
    const [deletePost]=useDeletePostMutation()

    

    console.log("RENDERS")

    const fetchPosts=async ()=>{
        
       try{
        await getPosts(null)
        
        console.log("fetched")
       
       }catch(e){ 
           setError(e)
           setTimeout(()=>{ 
            fetchPosts()
           },6000)
        
       }
    }
   
    
    const postHandler=async ()=>{ 
        if(!value.author||!value.title||!value.content ){
            return alert("Заполни полностью")
        }
        
            else{  try{ 
                    localStorage.setItem("author", JSON.stringify(value.author))
                    await sendPost(value)
                    await fetchPosts()

                    

                    
                    }catch(e){
                        setError(e)
                    }finally{
                        setValue(prevValue=>{return {...prevValue,title:"", content:""}})
                    }}

    }

    const deleteHandler=async(id:object)=>{
        try{
        await deletePost(id)
        await fetchPosts()
        console.log(id)
        }catch(e){ 
            console.log(e)
        }
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
                    {data?.map((post)=>{
                        return <div key={post._id} className="post_item">
                                   <div className="post_item_top">
                                         <div style={{display:"flex"}}>
                                            <h2 className="post_item_author">{post.author}-</h2>
                                            <h3 className="post_item_title">{post.title}:</h3>
                                        </div>
                                        <span style={{color:"red",
                                                      cursor:"pointer", 
                                                      fontWeight:"1000",
                                                      width:"1rem",
                                                      fontSize:"1rem"
                                        }}
                                              onClick={()=>deleteHandler({id:post._id})}>X</span>
                                        
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
                               onChange={(e)=>setValue({...value,author:e.target.value})}
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