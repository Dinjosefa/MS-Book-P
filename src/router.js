import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/Home.vue'),
		meta: { title: 'Inicio' },
		props: true
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/Login.vue'),
		meta: { title: 'Iniciar Sesión' }
	},
	{
		path: '/signup',
		name: 'Signup',
		component: () => import('@/views/Signup.vue'),
		meta: { title: 'Registrarse' }
	},
	{
		path: '/book/create',
		name: 'CreateBook',
		component: () => import('@/views/CreateBook.vue'),
		meta: { title: 'Nuevo Registro' }
	},
	{
		path: '/book/:id',
		name: 'OpenBook',
		component: () => import('@/views/ViewBook.vue')
	},
	{
		path: '/book/:id/update',
		name: 'UpdateBook',
		component: () => import('@/views/UpdateBook.vue'),
		meta: { title: 'Editar Registro' }
	},
	{
		path: '/books/inventory/page/:id',
		name: 'Inventory',
		component: () => import('@/views/Inventory.vue'),
		meta: { title: 'Inventario de Libros' }
	},
	{
		path: '/books/in-lending/page/:id',
		name: 'InLending',
		component: () => import('@/views/InLending.vue'),
		meta: { title: 'Libros En Prestamo' }
	},
	{
		path: '/user/:id',
		name: 'User',
		component: () => import('@/views/User.vue'),
		meta: { title: 'Datos De Usuario' }
	},
	{
		path: '/user/:id/settings',
		name: 'Settings',
		component: () => import('@/views/UserSettings.vue'),
		meta: { title: 'Configuración De Usuario' }
	},
	{
		path: '/user/:id/loans',
		name: 'Loans',
		component: () => import('@/views/LendingBooks.vue'),
		meta: { title: 'Mis Prestamos' }
	},
	{
		path: '/tester',
		name: 'test',
		component: () => import('@/views/PrintLoan.vue'),
		meta: {title: 'Recibo'}
	},
	{
	  path: '/:catchAll(.*)',
	  name: 'NotFound',
		component: () => import('@/views/NotFound.vue'),
	  meta:{title:'No se Encontro'}
	},
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
	routes
});
router.beforeEach((to, from, next) => {
	document.title = (to.meta.title == undefined) ? to.params.title : to.meta.title;
	next();
});

export default router;
