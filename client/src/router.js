import { createApp } from "@vue/runtime-dom";
import { createRouter, createWebHashHistory } from "vue-router"
import Login from "./views/Login.vue"
import SignUp from "./views/SignUp.vue"

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/",
    name: "home",
    component: SignUp
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;