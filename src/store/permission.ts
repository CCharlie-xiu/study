import { defineStore } from "pinia";
import type { RouteRecordName, RouteRecordRaw } from "vue-router";
import {MENU_ROUTE_NAME, routes} from "@/router"

type PermissionState = {
    routes: Array<RouteRecordRaw>
}

const filterRoutes = (routes:Array<RouteRecordRaw>, permissions: Array<string>) => {
    
    return routes.filter(route => {
        if(route.children) {
            route.children = filterRoutes(route.children, permissions)
        }
        return (
            !route.meta || (route.meta && (!route.meta.permission || (route.meta.permission && permissions.includes(route.meta.permission))))
        )
    })
}

const buildPermissionRoutesNamesList = (routes: Array<RouteRecordRaw>) => {
    const nameList: Array<RouteRecordName> = []
    routes.forEach((route:RouteRecordRaw)=> {
        if(route.children) {
            nameList.push(...buildPermissionRoutesNamesList(route.children))
        }
        if(route.name) {
            nameList.push(route.name)
        }
    })
    return nameList
}

export const usePermissionStore = defineStore('permission', {
    state: ():PermissionState => {
        return {
            routes: []
        }
    },
    persist: true,
    actions: {
        generateRoutes(permissions: Array<string>, admin = false) {

            this.routes = admin ? routes : filterRoutes(routes,permissions)
        }
    },
    getters: {
        menuRoutes(): Array<RouteRecordRaw> | undefined {
            return this.routes.find((route: RouteRecordRaw) => route.name === MENU_ROUTE_NAME)?.children
        },
        permissionRouteNamesList(): Array<RouteRecordName> {
            return this.routes ? buildPermissionRoutesNamesList(this.routes) : [];
        }
    },
    
})