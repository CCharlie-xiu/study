import type { UserType } from "@/api/types";
import user from "@/api/user";
import { defineStore } from "pinia";
import { usePermissionStore } from "./permission";

type UserState = {
    currentUser: string | null;
}

export const useUserStore = defineStore('user',
{
    state:(): UserState=> {
        return {
            currentUser: "",
        }
    },
    persist: true,
    actions: {
        async fetchCurrentUser(value: string) {
            this.currentUser = value
            // Todo: , this.currentUser.roles
        },
    }
})