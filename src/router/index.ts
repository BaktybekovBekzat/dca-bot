import { createRouter, createWebHistory } from 'vue-router'
import { AUTH_TOKEN_KEY } from '@/lib/consts'
import { routes } from './routes'
import LocalStorage from '@/plugins/localStorage'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = LocalStorage.get(AUTH_TOKEN_KEY)
  const isAuthRequired = to.matched.some((r) => r.meta.auth)

  if (isAuthRequired && !token) next('/auth')
  else next()
})

export default router
