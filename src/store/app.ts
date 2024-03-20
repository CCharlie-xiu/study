import type { TokenRequest } from './../api/types';
import { defineStore } from "pinia";
import tokenApi from "@/api/token"
import { useUserStore } from '.';
import { getCurrentTime } from '@/utils/time';
import user from '@/api/user';

type AppState = {
    token: string;
    menucollapse: boolean;
    loginTime: number | null;
    logoutTime: number | null;
    onlineDuration: number | null;
}

export const useAppStore = defineStore("app",{
    state:():AppState => {
        return {
            token: "",
            menucollapse: false,
            loginTime: null,
            logoutTime: null,
            onlineDuration: null
        }
    },
    persist: true,
    actions: {
        async login(loginForm: TokenRequest): Promise<void> {
            this.token = await tokenApi.createToken(loginForm)
            const currentTime = getCurrentTime(); 
            this.loginTime = currentTime;
        },
        async logout():Promise<void> {
            const currentTime = getCurrentTime();
            this.logoutTime = currentTime;
            const userStore = useUserStore()
            this.token = ""
            this.calculateOnlineDuration(); 
            userStore.$reset()
        },
        async calculateOnlineDuration() {
            if (this.loginTime && this.logoutTime) {
                this.onlineDuration = Math.floor((this.logoutTime - this.loginTime) / 1000);
            }
        },
        async saveOnlineDuration(username: string, onlineDuration: number): Promise<void> {
            try {
                await user.time(username, onlineDuration.toString()); 
            } catch (error) {
                console.error("Failed to save online duration:", error);
            }
        }
    }
})