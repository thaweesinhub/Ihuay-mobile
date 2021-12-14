const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        redirect: '/result-reward'
      },
      { path: '/result-reward', name: 'Result', component: () => import('pages/ResultPage.vue') },
      { path: '/login', name: 'Login', component: () => import('pages/LoginPage.vue') },
      { path: '/number-memo', name: 'Number-memo', component: () => import('pages/Number-memo') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
