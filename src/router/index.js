import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import RespirationPage from '../views/respiration.vue'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/Login.vue'
import CreerCompte from '../views/CreerCompte.vue'
import AdminPage from '../views/AdminPage.vue'
import RessourcesPage from '../views/RessourcesPage.vue'
import DiagnosticPage from '../views/DiagnosticPage.vue'


const routes = [
  { path: '/',             component: Home },
  { path: '/respiration',  component: RespirationPage },
  { path: '/home',         component: HomePage },
  { path: '/login',        component: LoginPage },
  { path: '/register',     component: CreerCompte },
  { path: '/creer-compte', component: CreerCompte },
  { path: '/admin',        component: AdminPage },
  { path: '/ressources',   component: RessourcesPage },
  { path: '/diagnostic',   component: Home },  
  { path: '/informations', component: Home }, 
  { path: '/diagnostic', component: DiagnosticPage },
]

export default createRouter({
  history: createWebHistory(),
  routes
})