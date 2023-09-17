import { createRouter, createWebHistory } from 'vue-router'
import ProductPage from '../views/ProductPage.vue'
import ShoppingCart from '../views/ShoppingCartPage.vue'
import ProductDetail from '../views/ProductDetailPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ProductPage',
      component: ProductPage
    },
    {
      path: '/cart',
      name: 'ShoppingCart',
      component: ShoppingCart
    },
    {
      path: '/details/:productId',
      name: 'ProductDetail',
      component: ProductDetail
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFoundPage',
      component: NotFoundPage
    }
  ]
})

export default router
