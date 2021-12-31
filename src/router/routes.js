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
      { path: '/number-memo', name: 'number-memo', component: () => import('pages/Number-memo') },
      { path: '/select_game', name: 'select_game', component: () => import('pages/select_room_layout') },
      { path: '/playgame', name: 'playgame', component: () => import('pages/play-game') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
