import { ServerResponse } from "http";
import React, { useEffect, useState, useRef,useMemo } from "react";
import { useDebouncer } from "../hooks/useDeboundcer";
import { SearchType } from "../pages/HomePage";
import { useLazySearchReposQuery, useSearchUsersQuery } from "../store/github/github.api";

export function Searcher({data,setDrop, setSearch, debounced,getRepos,isLoading,drop, getItem}:SearchType){

    
    

     const searchOptions=useMemo(()=>data?.slice(0,8),[data])


    return    <div className="flex space-between">   
                    <div className="flex-col flex items-center"
                        onClick={(e)=>e.stopPropagation()}>
                        <input className="outline-none border-black border-solid border-2 w-60 mt-2 rounded-1xl"
                            onChange={(e)=>setSearch(e.target.value)}
                            onClick={()=>setDrop(true)}> 
                        </input>
                        {isLoading&&<p>Loading...</p>}

                        
                        {drop&&<ul className="list-none shadow-500 w-[100%] shadow-md z-5jhgh0">
                                {searchOptions?.map((el,key)=>{
                                return<li key={el.id} className="shadow-500 text-black-500 hover:bg-sky-700 w-[100%] text-start cursor-pointer"
                                                    onClick={()=>getItem(el.id)}
                                                    >{el.login}
                                                    </li>
                                })}
                                </ul>
                                }
                    </div>


                    <button  className="border-black border-2 mx-2 mt-2 h-7 text-sm  w-40">Click</button> 
                </div>
}