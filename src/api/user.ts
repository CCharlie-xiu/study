import type { ListResult, UserCreateRequest, UserFilter, UserType } from "./types"
import request from "@/api/request"

const me = ():Promise<UserType> => {
    return request.get("/users/me")
}

const list = (filter: UserFilter):Promise<ListResult<UserType>> => {
    return request.get("/users", {
        params: filter
    })
}

const create = (userCreateRequest: UserCreateRequest): Promise<UserType> => {
    return request.post("/users", userCreateRequest)
}

// TODO: remove
const edit = (id:string,userEditRequest: UserCreateRequest): Promise<UserType> => {
    return request.post(`/users/${id}`, userEditRequest)
}

export default {
    me,
    list,
    create,
    edit
}