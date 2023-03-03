import React,{FC, useState, useEffect, useMemo} from "react"
import { IRepo, Item } from "../models/models"


 interface ChosenItem{ 
    chosenItem?:Item[],
    getRepos:(username:string)=>void,
    repos?:IRepo[], 
    areRepos:boolean,
    
 }
export const ItemView:FC<ChosenItem>=({chosenItem,getRepos,repos,areRepos})=>{
   const [isLoading, setIsLoading]=useState<boolean>()


     useEffect(()=>{
       
          setIsLoading(true)     
          setTimeout(()=>setIsLoading(false),1000)
        
      
      
      }, [chosenItem] )

      console.log(chosenItem)
  
  return <>
            {chosenItem?
                         isLoading? 
                                <p>Loading!!!</p>
                                  :
                                chosenItem.map(item=>{ 
                                                return <div>
                                                            <div key={item.id} className="flex start flex-col items-start my-10 w-[60vw] border-rgb(170, 168, 168) border-solid border-2 rounded-md ">
                                                                        <div className="flex space-between ">
                                                                            <img className="rounded-full w-[4rem] m-2" src={item.avatar_url}/>
                                                                              <div className="flex flex-col mt-2 ml-[1rem]">
                                                                                <p className="font-medium text-lg">{item.login}</p>
                                                                                <a  href={`https://github.com/${item.login}`}>Link</a>
                                                                                <p className="font-medium text-sm" 
                                                                                  onClick={()=>getRepos(item.login)}>Fetch Repos</p>
                                                                              </div>
                                                                                
                                                                        </div>
                                                                  </div>
                                                                <div>
                                                                 {areRepos&&<p>Repos are loading..</p>}
                                                                 {repos&&repos.map(repo=>{
                                                                  return <div>

                                                                          </div>
                                                                 })}
                                                                </div>
                                                                
                                                      </div> 
                                            })
                         :
                         <p className="mt-20">You've not searched for anybody yet! Go ahead & do that!</p>}
         </>


}