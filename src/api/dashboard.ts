import type {  dashboardType,todolistType } from "./types"
import request from "@/api/request"

const dashboard = (username: string):Promise<dashboardType> => {
    return request.post("/userdetail", {username})
}

// const billboard = ():Promise<dashboardType> => {
//     return request.get("/billboard")
// }

const todolist = (username: string):Promise<todolistType> => {
    return request.post("/todolist", {username})
}

const addtodo = (username: string, todoname:string):Promise<string> => {
    return request.post("/createtodo", {username,todoname})
}

const deltodo = (username: string,todoname:string):Promise<string> => {
    return request.post("/deletetodo", {username,todoname})
}

export default {
    dashboard,
    todolist,
    addtodo,
    deltodo
}