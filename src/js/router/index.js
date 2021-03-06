import VueRouter from 'vue-router'
import store from '@store'
let Home = () => import('@components/Home')
let Login = () => import('@components/auth/Login')
let Register = () => import('@components/auth/Register')
let TaskList = () => import('@components/Tasks/TaskList')
let Profile = () => import('@components/Users/Profile')
let Security = () => import('@components/Users/Security')

let router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {auth: false}
    },
    {
      path: '/settings/profile',
      name: 'Profile',
      component: Profile,
      meta: {auth: true}
    },
    {
      path: '/settings/security',
      name: 'Security',
      component: Security,
      meta: {auth: true}
    },
    {
      path: '/app/:status',
      name: 'TaskList',
      component: TaskList,
      meta: {auth: true}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {auth: false}
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {auth: false}
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!store.getters.isLogged && to.meta.auth) {
    return next('/login')
  }

  if (store.getters.isLogged && !to.meta.auth) {
    return next('/app/active')
  }

  next()
})

export default router
