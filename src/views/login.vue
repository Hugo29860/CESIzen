<template>
  <div class="login-section">
    <div class="login-bg"></div>
    <div class="login-card">
      <!-- Header -->
      <div class="login-header">
        <span class="login-title"><strong>CESI</strong><span class="zen">Zen</span></span>
        <span class="login-subtitle">Connectez-vous à votre espace</span>
      </div>
      <!-- Body -->
      <div class="login-body">
        <!-- Email -->
        <div class="login-form-group">
          <label class="login-label">Email</label>
          <div class="login-input-group" style="display:flex">
            <input
              v-model="email"
              type="email"
              placeholder="votre@email.com"
              autocomplete="email"
            />
          </div>
        </div>
        <!-- Mot de passe -->
        <div class="login-form-group">
          <label class="login-label">Mot de passe</label>
          <div class="login-input-group" style="display:flex">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              autocomplete="current-password"
              @keyup.enter="handleLogin"
              style="padding-left:12px"
            />
            <button class="btn-ok btn-eye" @click="showPassword = !showPassword">
              {{ showPassword ? '🙈' : '👁' }}
            </button>
          </div>
        </div>
        <!-- Se souvenir / Mot de passe oublié -->
        <div style="display:flex; justify-content:space-between; align-items:center">
          <label class="login-check">
            <input type="checkbox" v-model="rememberMe" />
            Se souvenir de moi
          </label>
          <a href="#" class="login-forgot">Mot de passe oublié ?</a>
        </div>
        <!-- Erreur -->
        <div v-if="errorMsg" class="login-error">{{ errorMsg }}</div>
        <!-- Bouton connexion -->
        <button
          class="btn-ok btn-login-submit"
          @click="handleLogin"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Connexion...' : 'Se connecter' }}
        </button>
        <!-- Séparateur -->
        <div class="login-separator">ou</div>
        <!-- Lien inscription -->
        <RouterLink to="/register" class="login-register-btn btn-save">
          Créer un compte
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../stores/auth.js'

const router       = useRouter()
const email        = ref('')
const password     = ref('')
const rememberMe   = ref(false)
const showPassword = ref(false)
const isLoading    = ref(false)
const errorMsg     = ref('')

const handleLogin = async () => {
  errorMsg.value = ''
  if (!email.value || !password.value) {
    errorMsg.value = 'Veuillez remplir tous les champs.'
    return
  }
  isLoading.value = true
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value }),
    })
    const data = await res.json()
    if (!res.ok) {
      errorMsg.value = data.message || 'Email ou mot de passe incorrect.'
      return
    }
    login(data.user, data.token)

    // Redirection selon le rôle
    if (data.user.role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/')
    }

  } catch (err) {
    errorMsg.value = 'Erreur de connexion. Réessayez plus tard.'
  } finally {
    isLoading.value = false
  }
}
</script>