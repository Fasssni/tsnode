import React from "react";

interface CardProps{ 
    width?:string;
    height?:string; 
    background?:string;

}

export const Card=({width,height,background}:CardProps)=>{




    return( 
        <div style={{width,height,background}}>
        </div>
    )
}