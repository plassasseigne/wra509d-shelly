import { createRouter, createWebHistory } from 'vue-router'
import LocalView from '../views/LocalView.vue'
import CloudView from '../views/CloudView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'local',
      component: LocalView
    },
    {
      path: '/cloud',
      name: 'cloud',
      component: CloudView
    }
  ]
})

export default router
