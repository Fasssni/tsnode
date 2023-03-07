import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IRepo, Item, ServerResponse} from "../../models/models";
import { GetType, PostType } from "../../pages/Posts";

export const mongoApi=createApi({
    reducerPath:'mongo/api',
    baseQuery: fetchBaseQuery({
                        baseUrl:"http://localhost:3000/api"
                    }),
    endpoints:build=>({
                      searchPost:build.mutation<any,PostType>({
                        query:(value:PostType)=>({ 
                            url:"/test",
                            method:"POST",
                            body:value,

                        }), 
                        transformErrorResponse:()=>console.log("wefwef")
                       
                      }), 

                      searchRepos:build.query<IRepo[], string>({
                         query:(username:string)=>({
                           url:`users/${username}/repos`

                         })
                      })
                    })
})

export const {useSearchPostMutation}=mongoApi