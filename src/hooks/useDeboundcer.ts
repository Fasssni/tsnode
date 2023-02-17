import {useState, useEffect} from "react"
import { clearTimeout } from "timers"


export  function useDebouncer(value:string, delay:number=500): string{
     
    const [debounced,setDebounced]=useState(value)

    useEffect(()=>{
        const handler=setTimeout( ()=>setDebounced(value),delay)
       
    }, [value,delay])



    return debounced
}