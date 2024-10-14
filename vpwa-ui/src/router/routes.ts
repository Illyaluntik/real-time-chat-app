import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/c/:id?', name: 'channels', component: () => import('src/components/ChatWindow.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('src/layouts/SignIn.vue')
  },
  {
    path: '/register',
    component: () => import('layouts/SignUp.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
