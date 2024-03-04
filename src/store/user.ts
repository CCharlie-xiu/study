import type { UserType } from "@/api/types";
import user from "@/api/user";
import { defineStore } from "pinia";
import { usePermissionStore } from "./permission";

type UserState = {
    currentUser: UserType | null;
}

export const useUserStore = defineStore('user',
{
    state:(): UserState=> {
        return {
            currentUser: null,
        }
    },
    persist: true,
    actions: {
        async fetchCurrentUser() {
            this.currentUser = await user.me()
            // Todo: , this.currentUser.roles
            usePermissionStore().generateRoutes(this.currentUser.permissions)
        },
    }
})