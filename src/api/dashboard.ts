import type {  dashboardType,todolistType } from "./types"
import request from "@/api/request"

const dashboard = ():Promise<dashboardType> => {
    return request.get("/dashboard")
}

const billboard = ():Promise<dashboardType> => {
    return request.get("/billboard")
}

const todolist = (username: string):Promise<todolistType> => {
    return request.post("/todolist", {username})
}


export default {
    dashboard,
    billboard,
    todolist
}