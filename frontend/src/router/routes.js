import auth from '@/middlewares/auth'
import guest from '@/middlewares/guest'

const routes = [{
        name: "home",
        path: "/",
        component: () => import("@/pages/Index"),
        meta: {
            middleware: [auth],
        },
    },
    {
        name: "login",
        path: "/login",
        component: () => import("@/pages/Login"),
         meta: {
             middleware: [guest],
         },
        
    },
    {
        name: "register",
        path: "/register",
        component: () => import("@/pages/Register"),
         meta: {
             middleware: [guest],
         },
    },
    {
        path: '/:catchAll(.*)*',
        component: () => import('../pages/Error404.vue')
    }
]

export default routes