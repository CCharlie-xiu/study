import type {  dashboardType } from "./types"
import request from "@/api/request"

const dashboard = ():Promise<dashboardType> => {
    return request.get("/dashboard")
}

const billboard = ():Promise<dashboardType> => {
    return request.get("/billboard")
}

export default {
    dashboard,
    billboard,
}