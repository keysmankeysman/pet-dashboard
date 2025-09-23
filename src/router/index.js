import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home-view',
    component: () => import('@/views/Dashboard.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue')
  },
  {
    path: '/redactor',
    name: 'Redactor',
    component: () => import('@/views/Redactor.vue')
  },
  {
    path: '/сharts',
    name: 'Charts',
    component: () => import('@/views/Charts.vue')
  },
  {
		path: '/login',
		name: 'Login',
		component: Login,
		meta: {
			isVisibleByDefault: true,
			isDisabledNavigation: true,
			pathName: 'login',
		},
	},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
