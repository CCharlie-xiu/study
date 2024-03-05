
import { createRouter, createWebHashHistory, type RouteRecordName, type RouteRecordRaw } from 'vue-router'
import layoutviews from '@/views/common/layout.vue'
import loginviews from '@/views/login/index.vue'
import pageLayoutviews from '@/views/common/page-layout.vue'
import { useAppStore } from '@/store'
import { PermissionEnum } from '@/config/permission.config';
import notfoundviews from '@/views/error/notfound.vue'
import notallowedviews from '@/views/error/notallowed.vue'
import { usePermissionStore } from '@/store/permission'
declare module 'vue-router' {
    interface RouteMeta extends Record<string | number | symbol, undefined> {
        permission: string;
        icon?: string;
        title?: string;
    }
}

export const MENU_ROUTE_NAME = 'menuRoot'

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        component: loginviews,
        name: "login",
    },{
        path: '/:pathMatch(.*)*',
        component: notfoundviews,
        name: "notfound",
    },{
        path: '/403',
        component: notallowedviews,
        name: "notallowed",
    },{
        path: '/',
        name: MENU_ROUTE_NAME,
        component: layoutviews,
        redirect: 'dashboard',
        children: [
            {
                name: "dashboard",
                path: 'dashboard',
                component: () => import('@/views/dashboard/index.vue'),
                meta: {
                    title: '控制台',
                    permission: PermissionEnum.DASHBOARD,
                    icon: 'dashboard'
                }
            },{
                name: "user",
                path: 'user',
                component: pageLayoutviews,
                meta: {
                    title: '用户管理',
                    permission: PermissionEnum.USER,
                    icon: 'usergroup'
                },
                redirect: {
                    name: 'user-list',     
                },
                children: [
                    {
                        name: 'user-list',
                        path: 'list',
                        component: () => import('@/views/user/index.vue'),
                        meta: {
                            title: '用户列表',
                            permission: PermissionEnum.USER_LIST,
                            icon: 'user'
                        }
                    },{
                        name: 'role-list',
                        path: 'roles',
                        component: () => import('@/views/user/roles.vue'),
                        meta: {
                            title: '角色管理',
                            permission: PermissionEnum.USER_ROLES,
                            icon: 'secured'
                        }
                    }
                ]
            }
        ]
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
    strict: true,
    scrollBehavior: () => (
        {left:0, top:0}
    )
})

const whiteList: Array<RouteRecordName | undefined | null> = ["login","notfound","notallowed"]

router.beforeEach((to,from,next) => {
    const appStore = useAppStore()
    if(!appStore.token) {
        whiteList.indexOf(to.name) !== -1 ? next() : next(`/login?redirect=${to.path}`)
    } 
    if(appStore.token && to.path === '/login') {
        next({ name: "dashboard"})
    }
    if(to.name) {
        const permissionStore = usePermissionStore()
        const hasNoPermission = !permissionStore.permissionRouteNamesList.includes(to.name)
        appStore.token && hasNoPermission && whiteList.indexOf(to.name) !== -1 && next({name:"notallowed"})
    }
    next()
})

export default router