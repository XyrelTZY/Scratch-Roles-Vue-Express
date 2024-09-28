import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import TeacherDashboard from '../components/TeacherDashboard.vue';
import StudentDashboard from '../components/StudentDashboard.vue';
import AdminDashboard from '../components/AdminDashboard.vue';

const routes = [
    { path: '/', component: Login },
    { path: '/teacher', component: TeacherDashboard, meta: { requiresAuth: true, role: 'teacher' }},
    { path: '/student', component: StudentDashboard, meta: { requiresAuth: true, role: 'student' }},
    { path: '/admin', component: AdminDashboard, meta: { requiresAuth: true, role: 'admin' }},
    // Removed the register route
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (to.meta.requiresAuth && !token) {
        next('/');
    } else if (to.meta.role && to.meta.role !== role) {
        next(`/${role}`);
    } else {
        next();
    }
});

export default router;
