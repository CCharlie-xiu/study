import { useAppStore } from '@/store';
import axios from "axios"
import type {AxiosError, AxiosInstance, AxiosResponse} from "axios"
import type { ErrorResponse } from "./types"
import { MessagePlugin } from "tdesign-vue-next"

const BASE_URL:string = "https://mock.apifox.cn/m1/1504786-0-default"
const instance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 60000
})

const tokenPrefix = "Bearer "

instance.interceptors.request.use(
    (request) => {
    const appStore = useAppStore();
    if(appStore.token && request.headers) {
        request.headers["Authorization"] = tokenPrefix + appStore.token
    }
    return request
})

instance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data
    }, async (error:AxiosError<ErrorResponse>) => {
        const responseData: ErrorResponse | undefined = error.response?.data
        responseData && await MessagePlugin.error(responseData.message)
        if (error.response?.status === 401 || error.response?.status === 403) {
            const appStore = useAppStore()
            await appStore.logout()
        }
        return Promise.reject(error)
    }
)

export default instance;