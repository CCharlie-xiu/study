import type {  repoType } from "./types"
import request from "@/api/request"

const repos = (username:string):Promise<repoType> => {
    return request.post("/storelist",{username})
}

const createStore = (username:string, storename:string,resume:string):Promise<number> => {
    return request.post("/createstore", {username,storename,resume})
}

const deleteStore = (username:string, storename:string,keysconfirm:string):Promise<number> => {
    return request.post("/deletestore",{username,storename,keysconfirm})
}

export default {
    repos,
    createStore,
    deleteStore
}