import { createRouter, createWebHistory } from 'vue-router'
import RegisterPage from '@/views/RegisterPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import StudentView from '@/views/StudentView.vue'

const routes = [
  { path: '/', component: RegisterPage },
  { path: '/student', component: StudentView },
  { path: '/register', component: RegisterPage }, 
  { path: '/login', component: LoginPage }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
