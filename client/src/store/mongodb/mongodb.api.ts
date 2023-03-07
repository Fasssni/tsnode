import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IRepo, Item, ServerResponse} from "../../models/models";
import { GetType, PostType } from "../../pages/Posts";

export const mongoApi=createApi({
    reducerPath:'mongo/api',
    baseQuery: fetchBaseQuery({
                        baseUrl:"http://localhost:3000/api"
                    }),
    endpoints:build=>({
                      sendPost:build.mutation<any,PostType>({
                        query:(value:PostType)=>({ 
                            url:"/test",
                            method:"POST",
                            body:value,
                        }), 
                        transformErrorResponse:()=>console.log("wefwef")
                       
                      }),
                      getPosts:build.query<GetType[],null>({
                        query:()=>({
                            url:"/test",
                            method:"GET",
                        }),
                        transformResponse:(response:GetType[])=>response
                    
                      }),
                      deletePost:build.mutation<any,object>({
                        query:(id:object)=>({
                            url:"/test-delete",
                            method:"POST",
                            body:id,

                        })
                      })
                    })
})

export const {useSendPostMutation,useLazyGetPostsQuery, useDeletePostMutation}=mongoApi