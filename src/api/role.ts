import type { ListResult, RoleCreateRequest, RoleFilter, RoleType } from "./types"
import request from "@/api/request"

const list = (filter: RoleFilter):Promise<ListResult<RoleType>> => {
    return request.get("/roles", {
        params: filter
    })
}

const create = (roleCreateRequest: RoleCreateRequest): Promise<RoleType> => {
    return request.post("/roles", roleCreateRequest)
}

// TODO: remove
const edit = (id:string,roleEditRequest: RoleCreateRequest): Promise<RoleType> => {
    return request.post(`/roles/${id}`, roleEditRequest)
}

export default {
    list,
    create,
    edit
}