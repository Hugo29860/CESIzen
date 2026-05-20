<template>
  <div class="cesizen">
 
    <!-- NAVBAR -->
    <nav class="navbar">
      <div class="navbar-left">
        <div class="logo-cesl">
          <span>CESL</span>
          <span class="underscore">_</span>
          <div class="logo-subtitle">ÉCOLE D'INGÉNIEURS</div>
        </div>
        <div class="logo-cesizen">
          <span class="brand-name"><strong>CESI</strong><span class="zen">Zen</span></span>
        </div>
      </div>
      <div class="navbar-center">
        <RouterLink to="/" class="nav-link">PRÉSENTATION</RouterLink>
        <a href="#" class="nav-link">FONCTIONNALITÉS</a>
        <a href="#" class="nav-link highlight">RESSOURCES</a>
        <a href="#" class="nav-link">ACTUALITÉS</a>
        <RouterLink to="/faq" class="nav-link">FAQ</RouterLink>
      </div>
      <div class="navbar-right">
        <a href="#" class="nav-util">CONTACT</a>
        <span class="divider">|</span>
        <a href="#" class="nav-util">RECHERCHER</a>
        <span class="divider">|</span>
        <RouterLink to="/login" class="btn-login-nav">Se connecter</RouterLink>
      </div>
    </nav>
 
    <!-- REGISTER SECTION -->
    <section class="login-section">
 
      <div class="login-bg"></div>
 
      <div class="login-card">
 
        <!-- En-tête -->
        <div class="login-header">
          <h1 class="login-title">Créer un compte</h1>
          <p class="login-subtitle">Rejoignez CESIZen et prenez soin de vous</p>
        </div>
 
        <!-- Formulaire -->
        <div class="login-body">
 
          <!-- Prénom + Nom -->
          <div class="register-row">
            <div class="login-form-group">
              <label class="login-label">Prénom</label>
              <div class="input-group login-input-group">
                <span class="search-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="5" r="3" stroke="#9b9b9b" stroke-width="1.4"/>
                    <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="#9b9b9b" stroke-width="1.4" stroke-linecap="round"/>
                  </svg>
                </span>
                <input v-model="prenom" type="text" placeholder="Jean" @keyup.enter="handleRegister" />
              </div>
            </div>
 
            <div class="login-form-group">
              <label class="login-label">Nom</label>
              <div class="input-group login-input-group">
                <span class="search-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="5" r="3" stroke="#9b9b9b" stroke-width="1.4"/>
                    <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="#9b9b9b" stroke-width="1.4" stroke-linecap="round"/>
                  </svg>
                </span>
                <input v-model="nom" type="text" placeholder="Dupont" @keyup.enter="handleRegister" />
              </div>
            </div>
          </div>
 
          <!-- Email -->
          <div class="login-form-group">
            <label class="login-label">Adresse e-mail</label>
            <div class="input-group login-input-group">
              <span class="search-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="3" width="14" height="10" rx="2" stroke="#9b9b9b" stroke-width="1.4"/>
                  <path d="M1 5l7 5 7-5" stroke="#9b9b9b" stroke-width="1.4" stroke-linecap="round"/>
                </svg>
              </span>
              <input v-model="email" type="email" placeholder="votre@email.com" @keyup.enter="handleRegister" />
            </div>
          </div>
 
          <!-- Mot de passe -->
          <div class="login-form-group">
            <label class="login-label">Mot de passe</label>
            <div class="input-group login-input-group">
              <span class="search-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="3" y="7" width="10" height="8" rx="1.5" stroke="#9b9b9b" stroke-width="1.4"/>
                  <path d="M5 7V5a3 3 0 016 0v2" stroke="#9b9b9b" stroke-width="1.4" stroke-linecap="round"/>
                </svg>
              </span>
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                @keyup.enter="handleRegister"
              />
              <button class="btn-ok btn-eye" @click="showPassword = !showPassword" type="button">
                <svg v-if="!showPassword" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="#222" stroke-width="1.4"/>
                  <circle cx="8" cy="8" r="2" stroke="#222" stroke-width="1.4"/>
                </svg>
                <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="#222" stroke-width="1.4"/>
                  <circle cx="8" cy="8" r="2" stroke="#222" stroke-width="1.4"/>
                  <line x1="2" y1="2" x2="14" y2="14" stroke="#222" stroke-width="1.4" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
          </div>
 
          <!-- Confirmer mot de passe -->
          <div class="login-form-group">
            <label class="login-label">Confirmer le mot de passe</label>
            <div class="input-group login-input-group">
              <span class="search-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="3" y="7" width="10" height="8" rx="1.5" stroke="#9b9b9b" stroke-width="1.4"/>
                  <path d="M5 7V5a3 3 0 016 0v2" stroke="#9b9b9b" stroke-width="1.4" stroke-linecap="round"/>
                </svg>
              </span>
              <input
                v-model="confirmPassword"
                :type="showConfirm ? 'text' : 'password'"
                placeholder="••••••••"
                @keyup.enter="handleRegister"
              />
              <button class="btn-ok btn-eye" @click="showConfirm = !showConfirm" type="button">
                <svg v-if="!showConfirm" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="#222" stroke-width="1.4"/>
                  <circle cx="8" cy="8" r="2" stroke="#222" stroke-width="1.4"/>
                </svg>
                <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="#222" stroke-width="1.4"/>
                  <circle cx="8" cy="8" r="2" stroke="#222" stroke-width="1.4"/>
                  <line x1="2" y1="2" x2="14" y2="14" stroke="#222" stroke-width="1.4" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
          </div>
 
          <!-- CGU -->
          <label class="login-check">
            <input type="checkbox" v-model="acceptCGU" />
            <span>J'accepte les <a href="#" class="login-forgot">conditions d'utilisation</a></span>
          </label>
 
          <!-- Erreur -->
          <div v-if="errorMsg" class="login-error">{{ errorMsg }}</div>
 
          <!-- Succès -->
          <div v-if="successMsg" class="login-success">{{ successMsg }}</div>
 
          <!-- Bouton créer -->
          <button class="btn-ok btn-login-submit" @click="handleRegister" :disabled="isLoading">
            <span v-if="!isLoading">Créer mon compte</span>
            <span v-else>Création...</span>
          </button>
 
          <div class="login-separator">
            <span>Déjà un compte ?</span>
          </div>
 
          <RouterLink to="/login" class="btn-discover login-register-btn">
            Se connecter
          </RouterLink>
 
        </div>
      </div>
    </section>
 
  </div>
</template>
 
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../stores/auth.js'

const router          = useRouter()
const prenom          = ref('')
const nom             = ref('')
const email           = ref('')
const password        = ref('')
const confirmPassword = ref('')
const acceptCGU       = ref(false)
const showPassword    = ref(false)
const showConfirm     = ref(false)
const isLoading       = ref(false)
const errorMsg        = ref('')
const successMsg      = ref('')
 
const handleRegister = async () => {
  errorMsg.value   = ''
  successMsg.value = ''
 
  if (!prenom.value || !nom.value || !email.value || !password.value || !confirmPassword.value) {
    errorMsg.value = 'Veuillez remplir tous les champs.'
    return
  }
 
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Les mots de passe ne correspondent pas.'
    return
  }
 
  if (password.value.length < 6) {
    errorMsg.value = 'Le mot de passe doit contenir au moins 6 caractères.'
    return
  }
 
  if (!acceptCGU.value) {
    errorMsg.value = "Veuillez accepter les conditions d'utilisation."
    return
  }
 
  isLoading.value = true
  try {
    const res = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prenom: prenom.value,
        nom: nom.value,
        email: email.value,
        password: password.value,
      }),
    })
 
    if (!res.ok) {
      const data = await res.json()
      errorMsg.value = data.message || 'Une erreur est survenue.'
      return
    }

    // Connexion automatique après inscription
    login({
      prenom: prenom.value,
      nom: nom.value,
      email: email.value,
    })

    successMsg.value = 'Compte créé avec succès ! Redirection...'
    setTimeout(() => router.push('/'), 1500)
 
  } catch (err) {
    errorMsg.value = 'Erreur de connexion. Réessayez plus tard.'
  } finally {
    isLoading.value = false
  }
}
</script>