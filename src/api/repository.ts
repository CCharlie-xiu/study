import type {  dashboardType } from "./types"
import request from "@/api/request"

const repos = ():Promise<dashboardType> => {
    return request.get("/repos")
}

export default {
    repos,
}