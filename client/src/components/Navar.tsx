import React from "react"

import {Link} from "react-router-dom"


export const NavBar=()=>{

    return <div className="flex justify-between  items-center h-[8vh] px-5 shadow-md bg-gray-500 text-white" >
             <h3>GitSearch</h3>
             <span> 
                 <Link to="/" className="mr-5">Home Page</Link>
                 <Link to="/favpages" className="mr-5">Favorite</Link>
                 <Link to="/chat" className="mr-5">Chat</Link>
             </span>

           </div>
}

