import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from '@/views/DashboardView.vue'
import LessonView from '@/views/LessonView.vue'
import Progress from '@/views/ProgressView.vue'
import Subscription from '@/views/SubscriptionView.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/dashboard', component: Dashboard },
  { path: '/lessons', component: LessonView },
  { path: '/progress', component: Progress },
  { path: '/subscription', component: Subscription },
  { path: '/', redirect: '/dashboard' } // Redirect to dashboard
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
