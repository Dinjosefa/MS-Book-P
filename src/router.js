import gql from "graphql-tag";
import { createRouter, createWebHistory } from 'vue-router';
import { setContext } from 'apollo-link-context';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import jwt_decode from "jwt-decode";

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/Home.vue'),
		meta: { title: 'Inicio', requiresAuth: false, requiresAdmin: false },
		props: true
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/Login.vue'),
		meta: { title: 'Iniciar Sesión', requiresAuth: false, requiresAdmin: false }
	},
	{
		path: '/signup',
		name: 'Signup',
		component: () => import('@/views/Signup.vue'),
		meta: { title: 'Registrarse', requiresAuth: false, requiresAdmin: false }
	},
	{
		path: '/book/create',
		name: 'CreateBook',
		component: () => import('@/views/CreateBook.vue'),
		meta: { title: 'Nuevo Registro', requiresAuth: true, requiresAdmin: true }
	},
	{
		path: '/book/:id',
		name: 'OpenBook',
		component: () => import('@/views/ViewBook.vue'),
		meta: { requiresAuth: false, requiresAdmin: false }
	},
	{
		path: '/book/:id/update',
		name: 'UpdateBook',
		component: () => import('@/views/UpdateBook.vue'),
		meta: { title: 'Editar Registro', requiresAuth: true, requiresAdmin: true }
	},
	{
		path: '/books/inventory/page/:id',
		name: 'Inventory',
		component: () => import('@/views/Inventory.vue'),
		meta: { title: 'Inventario de Libros', requiresAuth: true, requiresAdmin: true }
	},
	{
		path: '/books/in-lending/page/:id',
		name: 'InLending',
		component: () => import('@/views/InLending.vue'),
		meta: { title: 'Libros En Prestamo', requiresAuth: true, requiresAdmin: true }
	},
	{
		path: '/user/:id',
		name: 'User',
		component: () => import('@/views/User.vue'),
		meta: { title: 'Datos De Usuario', requiresAuth: true, requiresAdmin: true }
	},
	{
		path: '/user/:id/settings',
		name: 'Settings',
		component: () => import('@/views/UserSettings.vue'),
		meta: { title: 'Configuración De Usuario', requiresAuth: true, requiresAdmin: false }
	},
	{
		path: '/user/:id/loans',
		name: 'Loans',
		component: () => import('@/views/LendingBooks.vue'),
		meta: { title: 'Mis Prestamos', requiresAuth: true, requiresAdmin: false }
	},
	{
		path: '/book/:idBook/loan/:idLoan',
		name: 'PrintLoan',
		component: () => import('@/views/PrintLoan.vue'),
		meta: { title: 'Recibo', requiresAuth: true, requiresAdmin: false }
	},
	{
		path: '/book/:idBook/user/:idUser',
		name: 'ReturnBook',
		component: () => import('@/views/ReturnBook.vue'),
		meta: { title: 'Devolución', requiresAuth: true, requiresAdmin: true }
	},
	{
		path: '/:catchAll(.*)',
		name: 'NotFound',
		component: () => import('@/views/NotFound.vue'),
		meta: { title: 'No se Encontro', requiresAuth: false, requiresAdmin: false }
	},
];
const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

const httpLink = createHttpLink({
	uri: 'https://book-apigateway.herokuapp.com/'
});
const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			"Authorization": localStorage.getItem("tokenAccess") || "",
		}
	}
});
const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})
async function isAuth() {
	if (localStorage.getItem("tokenAccess") === null ||
		localStorage.getItem("tokenRefresh") === null) {
		return false;
	}
	try {
		var result = await apolloClient.mutate({
			mutation: gql`
	mutation ($refresh: String!) {
	refreshToken(refresh: $refresh) {
	access
	}
	}
	`,
			variables: {
				refresh: localStorage.getItem("tokenRefresh"),
			},
		})
		localStorage.setItem("tokenAccess", result.data.refreshToken.access);
		return true;
	} catch {
		localStorage.clear();
		alert("Su sesión expiró, por favor vuelva a iniciar sesión");
		return false;
	}
}
async function isAdmin() {
	let id = jwt_decode(localStorage.getItem("tokenRefresh")).user_id;
	try {
		var result = await apolloClient.mutate({
			mutation: gql`
	 mutation UserDetailById($userId: Int!) {
              userDetailById(userId: $userId) {
                is_superuser
              }
            }
	`,
			variables: {
				userId: parseInt(id),
			},
		})
		localStorage.setItem("isAdmin", (result.data.userDetailById.is_superuser == 1) ? true : false);
		return (result.data.userDetailById.is_superuser == 1) ? true : false;
	} catch (error) {
		console.log(error);
		return false;
	}
}
router.beforeEach(async (to, from, next) => {
	document.title = (to.meta.title == undefined) ? to.params.title : to.meta.title;

	if (to.meta.requiresAuth == false && to.meta.requiresAdmin == false) { next() }
	else if (to.meta.requiresAuth == true && to.meta.requiresAdmin == false) {
		let is_auth = await isAuth();
		if (is_auth) {
			next();
		} else {
			next ({ name: "Home" });
		}
	}
	else if (to.meta.requiresAuth == true && to.meta.requiresAdmin == true) {
		
		let is_auth = await isAuth();
		if (is_auth) {
			let is_admin = await isAdmin();
			if (is_admin) next();
			else {
				next({ name: "Home" });
			}
		} else {
			next({ name: "Home" });
		}

	}
	else {
		next({ name: "Home" });
	}

});

export default router;
