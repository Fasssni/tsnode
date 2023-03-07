import { configureStore } from "@reduxjs/toolkit";
import { githubApi } from "./github/github.api";
import { mongoApi } from "./mongodb/mongodb.api";

export const store=configureStore({
     reducer:{
        [githubApi.reducerPath]:githubApi.reducer,
        [mongoApi.reducerPath]:mongoApi.reducer,
     },
     middleware: getDefaultMiddleware=>getDefaultMiddleware().concat(githubApi.middleware,mongoApi.middleware)
})