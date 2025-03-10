import type { RouteRecordRaw } from 'vue-router';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import UserFetch from 'src/components/UserFetch.vue';
import ProductForm from 'src/components/ProductForm.vue';
import UpdateProduct from 'src/components/UpdateProduct.vue';
import FetchUpdate from 'src/components/FetchUpdate.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/HomePage.vue'),
      },
      {
        path: 'artikli',
        component: UserFetch,
      },
      {
        path: 'add-product',
        component: ProductForm,
      },
      {
        path: 'update-product',
        component: UpdateProduct,
      },
      {
        path: 'fetch-update-product',
        component: FetchUpdate,
      },
    ],
  },
];

const createHistory = process.env.SERVER
  ? createMemoryHistory
  : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,
  history: createHistory(process.env.VUE_ROUTER_BASE),
});

export default router;
