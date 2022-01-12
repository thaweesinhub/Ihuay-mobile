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
      { path: '/number-memo', name: 'number-memo', component: () => import('pages/Number-memo'), meta: { requiresAuth: true } },
      { path: '/select_game', name: 'select_game', component: () => import('pages/select_room_layout'), meta: { requiresAuth: true } },
      { path: '/playgame', name: 'playgame', component: () => import('pages/play-game'), meta: { requiresAuth: true } },
      { path: '/ticket_summary', name: 'playHistory', component: () => import('pages/Ticket/ticket-summary'), meta: { requiresAuth: true } },
      { path: '/ticket_info', name: 'ticketInfo', component: () => import('pages/Ticket/ticket_info'), meta: { requiresAuth: true } }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
