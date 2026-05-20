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
      <div class="navbar-center">
        <router-link to="/" class="nav-link">Accueil</router-link>
        <router-link to="/respiration" class="nav-link active">Ressources</router-link>
        <router-link to="/diagnostic" class="nav-link">Diagnostic</router-link>
        <router-link to="/ressources" class="nav-link"></router-link>
        <router-link to="/informations" class="nav-link highlight">Informations</router-link>
      </div>
      </div>
      <div class="navbar-right">
        <template v-if="user">
          <div class="nav-avatar">
            <div class="avatar-circle">{{ user.prenom.charAt(0).toUpperCase() }}</div>
            <span class="nav-util">{{ user.prenom }}</span>
          </div>
          <span class="divider">|</span>
          <button class="btn-login-nav" @click="handleLogout">Se déconnecter</button>
        </template>
        <template v-else>
          <RouterLink to="/login" class="btn-login-nav">Se connecter</RouterLink>
        </template>
      </div>
    </nav>

    <!-- HERO -->
    <section class="hero" style="height: 260px">
      <div class="hero-overlay"></div>
      <div class="hero-image-bg"></div>
      <div class="hero-content" style="bottom: 40px">
        <h1 class="hero-title">
          Ressources
          <span class="hero-subtitle">Articles et conseils pour mieux gérer votre stress</span>
        </h1>
      </div>
    </section>

    <!-- FILTRES -->
    <div style="padding: 32px 48px 0; display:flex; gap:12px; flex-wrap:wrap">
      <button
        v-for="cat in categories"
        :key="cat.value"
        @click="filtreActif = cat.value"
        :class="['btn-discover', filtreActif === cat.value ? 'filtre-actif' : '']"
      >
        {{ cat.label }}
      </button>
    </div>

    <!-- ARTICLES -->
    <div style="padding: 32px 48px 64px">

      <div v-if="isLoading" style="color:#888; font-size:14px">Chargement...</div>

      <div v-else-if="ressourcesFiltrees.length === 0" style="color:#888; font-size:14px; margin-top:24px">
        Aucun article dans cette catégorie pour le moment.
      </div>

      <div class="features-grid" v-else>
        <div
          class="feature-card"
          v-for="res in ressourcesFiltrees"
          :key="res._id"
          @click="ouvrirArticle(res)"
          style="cursor:pointer; flex-direction:column; align-items:flex-start; gap:12px"
        >
          <!-- Badge catégorie -->
          <span class="history-config">{{ labelCategorie(res.categorie) }}</span>

          <!-- Titre -->
          <h3 style="font-family: Nunito, sans-serif; font-size:17px; font-weight:800; color:#222; line-height:1.3">
            {{ res.titre }}
          </h3>

          <!-- Extrait -->
          <p style="font-size:13px; color:#777; line-height:1.6; flex:1">
            {{ res.contenu.substring(0, 140) }}...
          </p>

          <!-- Footer -->
          <div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-top:auto">
            <span style="font-size:12px; color:#aaa">{{ res.auteur }}</span>
            <span style="font-size:12px; color:#aaa">{{ formatDate(res.createdAt) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL ARTICLE -->
    <div v-if="articleOuvert" class="modal-overlay" @click.self="articleOuvert = null">
      <div class="modal-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px">
          <span class="history-config">{{ labelCategorie(articleOuvert.categorie) }}</span>
          <button @click="articleOuvert = null" style="background:none; border:none; font-size:20px; cursor:pointer; color:#888">✕</button>
        </div>
        <h2 style="font-family: Nunito, sans-serif; font-size:22px; font-weight:800; color:#222; margin-bottom:12px">
          {{ articleOuvert.titre }}
        </h2>
        <p style="font-size:13px; color:#aaa; margin-bottom:20px">
          {{ articleOuvert.auteur }} · {{ formatDate(articleOuvert.createdAt) }}
        </p>
        <p style="font-size:15px; color:#444; line-height:1.8; white-space: pre-line">
          {{ articleOuvert.contenu }}
        </p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { currentUser, logout } from '../stores/auth.js'

const router = useRouter()
const user = computed(() => currentUser.value)
const ressources = ref([])
const isLoading = ref(false)
const filtreActif = ref('tous')
const articleOuvert = ref(null)

const categories = [
  { value: 'tous',       label: 'Tous' },
  { value: 'stress',     label: 'Stress' },
  { value: 'anxiete',    label: 'Anxiété' },
  { value: 'sommeil',    label: 'Sommeil' },
  { value: 'respiration',label: 'Respiration' },
  { value: 'autre',      label: 'Autre' },
]

const ressourcesFiltrees = computed(() => {
  if (filtreActif.value === 'tous') return ressources.value
  return ressources.value.filter(r => r.categorie === filtreActif.value)
})

const labelCategorie = (val) => categories.find(c => c.value === val)?.label || val

const formatDate = (date) => new Date(date).toLocaleDateString('fr-FR', {
  day: 'numeric', month: 'long', year: 'numeric'
})

const ouvrirArticle = (res) => { articleOuvert.value = res }

const fetchRessources = async () => {
  isLoading.value = true
  try {
    const res = await fetch('/api/ressources')
    ressources.value = await res.json()
  } catch {
    console.error('Erreur chargement ressources')
  } finally {
    isLoading.value = false
  }
}

const handleLogout = () => {
  logout()
  router.push('/')
}

onMounted(fetchRessources)
</script>

