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
      { path: '/number-memo', name: 'สร้างเลขชุด', component: () => import('pages/Number-memo') },
      { path: '/select_game', name: 'แทงหวย', component: () => import('pages/select_game/select_room_layout') }
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
