import request from "@/api/request";
import type { RegisterRequest, TokenRequest} from "@/api/types"

const createToken = (tokenRequest: TokenRequest): Promise<string> => {
    return request.post("/login", tokenRequest)
}

const registerLogin = (username:string,realname:string,password:string,idcard:string,KeysConfirm:string): Promise<string> => {
    return request.post("/register", {username,realname,password,idcard,KeysConfirm})
}

export default {
    createToken,
    registerLogin
}
