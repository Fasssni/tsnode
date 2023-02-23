import React,{FC, useState, useEffect} from "react"
import { Item } from "../models/models"
 

 interface ChosenItem{ 
    chosenItem?:Item[]
 }
export const ItemView:FC<ChosenItem>=({chosenItem})=>{
   const [isLoading, setIsLoading]=useState(true)

     useEffect(()=>{
      
          setTimeout(()=>setIsLoading(false),10000)
        
      
      
      }, [chosenItem] )
  
  return <>
            {chosenItem?
                         isLoading? 
                                <p>Loading!!!</p>
                                  :
                                chosenItem.map(item=>{ 
                                                return <div key={item.id} className="flex start flex-col items-start my-10 w-[60vw] border-rgb(170, 168, 168) border-solid border-2 rounded-md ">
                                                            <div className="flex space-between ">
                                                                <img className="rounded-full w-[4rem] m-2" src={item.avatar_url}/>
                                                                  <div className="flex flex-col mt-2 ml-[1rem]">
                                                                    <p className="font-medium text-lg">{item.login}</p>
                                                                    <a href={`https://github.com/users/${item.login}`}>Link</a>
                                                                  </div>
                                                                    
                                                            </div>
                                                      </div>
                                            })
                         :
                         <p className="mt-20">You've not searched for anybody yet! Go ahead & do that!</p>}
         </>


}