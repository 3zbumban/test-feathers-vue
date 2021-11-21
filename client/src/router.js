import { createRouter, createWebHashHistory } from "vue-router"
import Login from "./views/Login.vue"
import SignUp from "./views/SignUp.vue"
import Home from "./views/Home.vue"

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      secure: false
    }
  },
  {
    path: "/",
    name: "signUp",
    component: SignUp,
    meta: {
      secure: false
    }
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      secure: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log({to, from});
  if (to.meta.secure && !localStorage.getItem("feathers-jwt")) {
    next("/login")
  } else { 
    next() 
  }
});

export default router;