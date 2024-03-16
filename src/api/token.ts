import request from "@/api/request";
import type { RegisterRequest, TokenRequest} from "@/api/types"

const createToken = (tokenRequest: TokenRequest): Promise<string> => {
    return request.post("/tokens", tokenRequest)
}

const registerLogin = (register: RegisterRequest): Promise<string> => {
    return request.post("/register", register)
}

export default {
    createToken,
    registerLogin
}
