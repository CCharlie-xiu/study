import type { ListResult, UserCreateRequest, UserFilter, UserType,PersonType, KeysType } from "./types"
import request from "@/api/request"

const me = (username:string):Promise<UserType> => {
    return request.post("/userdetail",{username})
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
    return request.post("/userdetail", {username})
}

const keys = (username:string, KeysConfirm: string): Promise<KeysType> => {
    return request.post("/userconfirm", {username,KeysConfirm})
}

const time = (username:string, onlineDuration:string): Promise<number> => {
    return request.post("/time", {username,onlineDuration})
}

const updateuser = 
  (userid: number, username: string, realname: string, password: string, idcard: string, KeysConfirm: string): Promise<number> => {
    return request.post("/updateuser", {
      userid: Number(userid), 
      username,
      realname,
      password,
      idcard,
      KeysConfirm
    });
  }


export default {
    me,
    list,
    create,
    edit,
    person,
    keys,
    updateuser,
    time
}