import type { ListResult, UserCreateRequest, UserFilter, UserType,PersonType } from "./types"
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

const person = (username:string): Promise<PersonType> => {
    return request.post("/person", {username})
}

const keys = (username:string, keys: string): Promise<KeysType> => {
    return request.post("/keys", {username,keys})
}

export default {
    me,
    list,
    create,
    edit,
    person,
    keys
}