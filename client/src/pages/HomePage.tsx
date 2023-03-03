import { ServerResponse } from "http";
import React, { useEffect, useState, useRef,useMemo } from "react";
import { ItemView } from "../components/ItemView";
import { Searcher } from "../components/Searcher";
import { useDebouncer } from "../hooks/useDeboundcer";
import { IRepo, Item } from "../models/models";
import { useLazySearchReposQuery, useSearchUsersQuery } from "../store/github/github.api";

export default function HomePage(){ 
     
    const [drop,setDrop]=useState(true)
    const [search, setSearch]=useState<string>("")
    const [userId, setUserId]=useState<any>()
     
    const debounced=useDebouncer(search)

    const debounceSearch=(searched:string):void=>{ 
         setSearch(searched)
         
    }

    const {isLoading, isError, data}=useSearchUsersQuery(debounced, {
        skip: debounced.length<3
        })
    const [fetchRepo,{data:repos,isLoading:areRepos}]=useLazySearchReposQuery()
    
    const getRepos=(username:string):void=>{
        fetchRepo(username)
    } 



  const getItem=(id:any)=>{
      setUserId(id) 
      setDrop(false)
  } 
 
   const chosenItem=useMemo(()=>data?.filter((item)=>item.id===userId),[userId])
   

   useEffect(()=>{
     console.log(chosenItem)
   },[userId])
   
    
    
    return     <div className="mt-10 mx-5 flex space-between flex-col  items-center" onClick={()=>setDrop(false)}>
                         <Searcher  drop= {drop}
                                    setDrop={setDrop} 
                                    debounced={debounced}
                                    isLoading={isLoading}
                                    data={data}
                                    getRepos={getRepos}
                                    setSearch={debounceSearch}
                                    getItem={getItem}
                                    />
                         
                        {isError&&<p className="my-10 text-red-600 text-center">Something went wrong with the fetching</p>}
                         <ItemView chosenItem={chosenItem}
                                    getRepos={getRepos}
                                    areRepos={areRepos}
                                    repos={repos}
                                    />
                         
               </div>
    
}


export interface SearchType{
    data?:Item[],
    isLoading:boolean,
    drop:boolean, 
    debounced:string, 
    getRepos:(username:string)=>void,
    setDrop:(value:boolean)=>void, 
    setSearch:(searched:string)=>void,
    getItem:(id:any)=>void,

}
 
export interface SearchResponse{
    data: Item[], 
    isLoading:boolean, 
    isError: boolean
}


