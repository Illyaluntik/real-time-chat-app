import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: () => ({ name: 'channels' })
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('src/layouts/SignIn.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('layouts/SignUp.vue')
  },
  {
    path: '/channels',
    meta: { requiresAuth: true },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/c/:id?', name: 'channels', component: () => import('src/components/ChatWindow.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
