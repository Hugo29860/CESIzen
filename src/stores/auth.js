// src/stores/auth.js
import { ref } from 'vue'

// Récupère l'user depuis le localStorage au démarrage
const storedUser = localStorage.getItem('user')
export const currentUser = ref(storedUser ? JSON.parse(storedUser) : null)

export function login(userData, token) {
  currentUser.value = userData
  localStorage.setItem('user', JSON.stringify(userData))
  localStorage.setItem('token', token)
}

export function logout() {
  currentUser.value = null
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}

// Utilitaire pour récupérer le token dans les appels API
export function getToken() {
  return localStorage.getItem('token')
}