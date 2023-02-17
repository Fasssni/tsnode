import { ServerResponse } from "http";
import React, { useEffect, useState, useRef,useMemo } from "react";
import { useDebouncer } from "../hooks/useDeboundcer";
import { useSearchUsersQuery } from "../store/github/github.api";

export default function HomePage(){ 
     
     const [search, setSearch]=useState<string>("")
     const [drop,setDrop]=useState(true)
     const debounced=useDebouncer(search)
     const {isLoading, isError, data}=useSearchUsersQuery(debounced, {
                                                          skip: debounced.length<3
     })
    

    useEffect(()=>{
        console.log(search,searchOptions)
         },[debounced])
    
    const searchOptions=useMemo(()=>data?.slice(0,8),[debounced])
    


     
    
    return     <div className="mt-10 mx-5 flex space-between flex-col  items-center" onClick={()=>setDrop(false)}>
                         <div className="flex space-between">   
                            <div className="flex-col flex items-center"
                                 onClick={(e)=>e.stopPropagation()}>
                                <input className="outline-none border-black border-solid border-2 w-60 mt-2 rounded-1xl"
                                       onChange={(e)=>setSearch(e.target.value)}
                                       onClick={()=>setDrop(true)}> 
                                </input>
                                {isLoading&&<p>Loading...</p>}

                                 
                                {drop&&<ul className="list-none shadow-500 w-[100%] shadow-md">
                                        {searchOptions?.map((el,key)=>{
                                        return<li key={el.id} className="shadow-500 text-black-500 hover:bg-sky-700 w-[100%] text-start cursor-pointer">{el.login}</li>
                                        })}
                                        </ul>
                                        }
                                        
                                
                            </div>
                        
                       
                        <button  className="border-black border-2 mx-2 mt-2 h-7 text-sm  w-40">Click</button> 
                        </div>
                        {isError&&<p className="my-2 text-red-600 text-center">Something went wrong with the fetching</p>}
               </div>
    
}

 