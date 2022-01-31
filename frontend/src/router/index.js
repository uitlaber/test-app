
 import {
     createRouter,
     createWebHistory
 } from "vue-router"
import routes from "./routes";



export default new createRouter({
    history: createWebHistory(),
    routes: routes
});