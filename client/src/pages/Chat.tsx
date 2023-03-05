import axios from "axios"
import { useEffect, useState } from "react"
import { Posts } from "./Posts"


export interface MessageType{ 
    message:string, 
    id:string,
}

export const Chat=()=>{
     
    const [message,setMessage]=useState<string>() 
    const [values, setValues]=useState<MessageType[]>([])


    async function subscribe(){
         try{
             const {data}=await axios.get('http://localhost:3000/get-message')
             setValues(prev=>[...prev, data])
             
             await subscribe()
            
         }catch(e){
            setTimeout(()=>{ 
                subscribe()
            },6000)
         }

    }

    async function messageHandler(){
        await axios.post('http://localhost:3000/new-message', {
            message: message,
            id: Date.now()
        })

          

    }
    
    useEffect(()=>{
        subscribe()
       
    },[])

    useEffect(()=>{
        console.log(values)
       
    },[])

    

 
    return  <div className="h-96 w-full flex justify-center flex-col items-center">
                <input className="outline-none border-black border-solid border-2 w-60 mt-2 rounded-1xl"
                       onChange={e=> setMessage(e.target.value)}
                       >
                </input>
                <button className="border-black border-2 mx-2 mt-2 h-7 text-sm  w-40"
                        onClick={()=>messageHandler()}
                        >
                        Send
                </button>

                <div> 
                    {values.map(item=>{
                        return <p key={item.id}>{item.message}</p>
                    })}

                </div>
                
            </div>
}