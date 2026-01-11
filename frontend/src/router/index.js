import { createRouter, createWebHistory } from 'vue-router'
import RegisterPage from '@/views/RegisterPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import StudentView from '@/views/StudentView.vue'
import TutorView from '@/views/TutorView.vue'
const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  {
    path: "/student",
    component: StudentView,
    meta: { requiresAuth: true, role: "student" },
  },
  {
    path: "/tutor",
    component: TutorView,
    meta: { requiresAuth: true, role: "tutor" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  let user = null;

  try {
    const res = await fetch("http://localhost:3000/api/auth/me", {
      credentials: "include",
    });

    if (res.ok) {
      user = await res.json();
    }
  } catch {
    user = null;
  }

  if (to.meta.requiresAuth) {
    if (!user) {
      return next("/login");
    }

    if (to.meta.role && user.role !== to.meta.role) {
      return next(`/${user.role}`);
    }

    return next();
  }

  if ((to.path === "/login" || to.path === "/register") && user) {
    return next(`/${user.role}`);
  }

  next();
});

export default router
