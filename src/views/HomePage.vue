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
          <div class="logo-icon">
            <img src="../assets/CESIzen logo with meditative figure.png" alt="CESIZen" height="32" />
          </div>
          <span class="brand-name"><strong>CESI</strong><span class="zen">Zen</span></span>
        </div>
      </div>
      <div class="navbar-center">
        <a href="#" class="nav-link active">Accueil</a>
        <a href="#" class="nav-link">FONCTIONNALITÉS</a>
        <RouterLink to="/ressources" class="nav-link highlight">RESSOURCES</RouterLink>
        <a href="#" class="nav-link">ACTUALITÉS</a>
        <a href="#" class="nav-link">FAQ</a>
      </div>
      <div class="navbar-right">
        <a href="#" class="nav-util">CONTACT</a>
        <span class="divider">|</span>
        <a href="#" class="nav-util">RECHERCHER</a>
        <span class="divider">|</span>
        <!-- Connecté : avatar + prénom + déconnexion -->
        <template v-if="user">
          <div class="nav-avatar">
            <div class="avatar-circle">
              {{ user.prenom.charAt(0).toUpperCase() }}
            </div>
            <span class="nav-util">{{ user.prenom }}</span>
          </div>
          <span class="divider">|</span>
          <button class="btn-login-nav" @click="handleLogout">Se déconnecter</button>
        </template>
        <!-- Non connecté : bouton connexion -->
        <template v-else>
          <RouterLink to="/login" class="btn-login-nav">Se connecter</RouterLink>
        </template>
      </div>
    </nav>

    <!-- HERO -->
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="hero-image-bg"></div>
      <div class="hero-content">
        <h1 class="hero-title">
          Bienvenue sur CESIZen,
          <span class="hero-subtitle">Prêt(e) à gérer votre stress et améliorer votre santé mentale&nbsp;?</span>
        </h1>
      </div>

      <!-- Quick Actions Bar -->
      <div class="quick-bar">
        <div class="quick-action">
          <label>Autoévaluer mon niveau de stress</label>
          <div class="input-group">
            <select v-model="selectedDiag">
              <option value="">Faire un autodiagnostic</option>
              <option value="stress">Test de stress</option>
              <option value="anxiete">Test d'anxiété</option>
              <option value="burnout">Test de burnout</option>
            </select>
            <button class="btn-ok" @click="handleDiagnostic">OK</button>
          </div>
        </div>
        <div class="quick-action">
          <label>Explorer les exercices de respiration</label>
          <div class="input-group search">
            <span class="search-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="5" stroke="#9b59b6" stroke-width="1.5"/>
                <path d="M10.5 10.5L14 14" stroke="#9b59b6" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Retrouver le calme avec la cohérence cardiaque"
              @keyup.enter="handleSearch"
            />
            <button class="btn-ok" @click="handleSearch">OK</button>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURES SECTION -->
    <section class="features">
      <div class="section-header">
        <h2>À la découverte de <strong>CESI</strong><span class="zen">Zen</span></h2>
        <div class="section-line"></div>
      </div>

      <div class="features-grid">
        <div class="feature-card" v-for="feature in features" :key="feature.id">
          <div class="feature-icon" :style="{ background: feature.bg }">
            <component :is="feature.icon" />
          </div>
          <div class="feature-body">
            <h3 v-html="feature.title"></h3>
            <p>{{ feature.desc }}</p>
            <RouterLink v-if="feature.id === 3" to="/respiration" class="btn-discover">
              Découvrir
            </RouterLink>
            <button v-else class="btn-discover">Découvrir</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, h, computed } from 'vue'
import { useRouter } from 'vue-router'
import { currentUser, logout } from '../stores/auth.js'

const router       = useRouter()
const selectedDiag = ref('')
const searchQuery  = ref('')

// computed pour que le template réagisse aux changements de currentUser
const user = computed(() => currentUser.value)

const handleLogout = () => {
  logout()  
  window.location.href = '/'
}

const handleDiagnostic = () => {
  if (selectedDiag.value) {
    alert(`Lancement du diagnostic : ${selectedDiag.value}`)
  }
}

const handleSearch = () => {
  router.push('/respiration')
}

const IconClipboard = () => h('svg', { width: 28, height: 28, viewBox: '0 0 28 28', fill: 'none' }, [
  h('rect', { x: 7, y: 5, width: 14, height: 18, rx: 2, stroke: '#5a7a4a', 'stroke-width': 1.5 }),
  h('path', { d: 'M10 5V4a4 4 0 008 0v1', stroke: '#5a7a4a', 'stroke-width': 1.5 }),
  h('path', { d: 'M10 12h8M10 16h5', stroke: '#5a7a4a', 'stroke-width': 1.5, 'stroke-linecap': 'round' }),
  h('path', { d: 'M10 20l1.5-1.5L13 20', stroke: '#7ab648', 'stroke-width': 1.5, 'stroke-linecap': 'round' })
])

const IconEmoji = () => h('svg', { width: 28, height: 28, viewBox: '0 0 28 28', fill: 'none' }, [
  h('circle', { cx: 14, cy: 14, r: 11, stroke: '#5a7a4a', 'stroke-width': 1.5 }),
  h('circle', { cx: 10.5, cy: 12, r: 1.5, fill: '#5a7a4a' }),
  h('circle', { cx: 17.5, cy: 12, r: 1.5, fill: '#5a7a4a' }),
  h('path', { d: 'M10 18c1 2 7 2 8 0', stroke: '#5a7a4a', 'stroke-width': 1.5, 'stroke-linecap': 'round' })
])

const IconBreath = () => h('svg', { width: 28, height: 28, viewBox: '0 0 28 28', fill: 'none' }, [
  h('circle', { cx: 14, cy: 10, r: 5, stroke: '#5a7a4a', 'stroke-width': 1.5 }),
  h('path', { d: 'M14 15v8M10 20l4 4 4-4', stroke: '#5a7a4a', 'stroke-width': 1.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
  h('path', { d: 'M8 12c-2 1-3 3-1 5M20 12c2 1 3 3 1 5', stroke: '#7ab648', 'stroke-width': 1.5, 'stroke-linecap': 'round' })
])

const features = [
  { id: 1, title: 'Autodiagnostic<br>du Stress', desc: 'Questionnaire et score personnalisé', bg: '#f5f0d8', icon: IconClipboard },
  { id: 2, title: 'Suivi des<br>Émotions', desc: "Tracker d'émotions quotidien", bg: '#e8f0eb', icon: IconEmoji },
  { id: 3, title: 'Exercices<br>détente', desc: 'Respiration et relaxation guidée', bg: '#e8f0eb', icon: IconBreath },
]
</script>