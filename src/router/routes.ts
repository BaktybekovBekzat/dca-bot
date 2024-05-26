export const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/layouts/main.vue'),
    children: [
      {
        path: '/bot',
        name: 'Bots',
        component: () => import('@/pages/bot/index.vue'),
        meta: { auth: true }
      },
      {
        path: '/bot/page/:id?',
        name: 'Bot',
        component: () => import('@/pages/bot/page.vue'),
        meta: { auth: true }
      },
      {
        path: '/cycle',
        name: 'Cycles',
        component: () => import('@/pages/cycle/index.vue'),
        meta: { auth: true }
      },
      {
        path: '/cycle/page/:id',
        name: 'Cycle',
        component: () => import('@/pages/cycle/page.vue'),
        meta: { auth: true }
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/pages/404.vue')
      }
    ],
    redirect: '/bot'
  },
  // auth routes
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/layouts/auth.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/pages/auth/login.vue')
      },
      {
        path: 'registration',
        name: 'Registration',
        component: () => import('@/pages/auth/registration.vue')
      }
    ],
    redirect: '/auth/login'
  }
]
