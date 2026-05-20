<template>
  <div class="cesizen">
 
    <!-- NAVBAR -->
    <nav class="navbar">
      <div class="navbar-left">
        <div class="logo-cesl">
          CESi<span class="underscore">_</span>
          <div class="logo-subtitle">ÉCOLE D'INGÉNIEURS</div>
        </div>
        <div class="logo-cesizen">
          <span class="brand-name"><strong>CESI</strong><span class="zen">zen</span></span>
        </div>
      </div>
<<<<<<< HEAD
        <a href="#" class="nav-link active">Accueil</a>
        <a href="#" class="nav-link">FONCTIONNALITÉS</a>
        <router-link to="/" class="nav-link">Accueil</router-link>
        <router-link to="/" class="nav-link">FONCTIONNALITÉS</router-link>
        <RouterLink to="/ressources" class="nav-link highlight">RESSOURCES</RouterLink>
        <a href="#" class="nav-link">ACTUALITÉS</a>
        <a href="#" class="nav-link">FAQ</a>
      <div class="navbar-right">
        <template v-if="currentUser">
          <div class="nav-avatar">
            <div class="avatar-circle">
              {{ currentUser.prenom.charAt(0).toUpperCase() }}
            </div>
            <span class="nav-util">{{ currentUser.prenom }}</span>
          </div>
          <span class="divider">|</span>
          <button class="btn-login-nav" @click="handleLogout">Se déconnecter</button>
        </template>
        <template v-else>
          <a href="#" class="nav-util">Mon compte</a>
          <span class="divider">|</span>
          <RouterLink to="/login" class="btn-login-nav">Se connecter</RouterLink>
        </template>
      </div>
    </nav>
 
    <!-- PAGE CONTENT -->
    <div class="breathing-page">
 
      <!-- En-tête de page -->
      <div class="page-header">
        <div class="page-header-inner">
          <h1 class="page-title">Exercice de respiration</h1>
          <p class="page-subtitle">
            Guidez votre souffle pour réduire le stress et retrouver le calme.
          </p>
        </div>
      </div>
 
      <!-- Zone principale -->
      <div class="exercise-container">
 
        <!-- Colonne gauche : cercle animé -->
        <div class="circle-column">
          <div class="circle-wrapper">
            <div class="circle-bg"></div>
            <div
              class="circle-fill"
              :style="{ transform: `scale(${circleScale})`, transition: circleTransition }"
            ></div>
            <div
              class="circle-ring"
              :style="{ transform: `scale(${circleScale})`, transition: circleTransition }"
            ></div>
            <div class="circle-label">
              <span class="phase-name">{{ phaseName }}</span>
              <span class="phase-count">{{ phaseCountdown }}</span>
            </div>
          </div>
        </div>
 
        <!-- Colonne droite : contrôles -->
        <div class="controls-column">
 
          <p class="preset-label">Choisir un exercice</p>
          <div class="presets">
            <!-- Presets par défaut -->
            <button
              v-for="preset in presets"
              :key="preset.id"
              class="preset-btn"
              :class="{ active: activePreset === preset.id }"
              @click="applyPreset(preset)"
            >
              {{ preset.label }}
            </button>
            <!-- ✅ Exercices de la BDD -->
            <button
              v-for="ex in exercises"
              :key="ex._id"
              class="preset-btn"
              :class="{ active: activePreset === ex._id }"
              @click="applyExercise(ex)"
            >
              {{ ex.name }}
            </button>
          </div>
 
          <div class="phases-config">
            <div class="phase-row" v-for="phase in phaseInputs" :key="phase.key">
              <label>{{ phase.label }}</label>
              <input
                type="range"
                :min="phase.min"
                :max="phase.max"
                v-model.number="config[phase.key]"
                step="1"
                @input="activePreset = null"
              />
              <span>{{ config[phase.key] }}s</span>
            </div>
          </div>
 
          <p class="cycle-info">Durée d'un cycle : {{ cycleDuration }}s</p>
 
          <button
            class="btn-start"
            :class="{ running: isRunning }"
            @click="toggleExercise"
          >
            {{ isRunning ? 'Arrêter' : (sessionTime > 0 ? 'Recommencer' : 'Commencer') }}
          </button>
 
          <div v-if="currentUser && sessionTime > 0 && !isRunning" class="save-zone">
            <button class="btn-save" @click="saveSession" :disabled="isSaving">
              {{ isSaving ? 'Sauvegarde...' : '💾 Sauvegarder cette session' }}
            </button>
            <p v-if="saveSuccess" class="save-success">✅ Session sauvegardée !</p>
            <p v-if="saveError" class="save-error">❌ {{ saveError }}</p>
          </div>
 
          <p v-if="!currentUser && sessionTime > 0 && !isRunning" class="save-hint">
            <RouterLink to="/login" class="save-link">Connectez-vous</RouterLink>
            pour sauvegarder vos sessions.
          </p>
 
        </div>
      </div>
 
      <!-- Statistiques de session -->
      <div class="stats-bar">
        <div class="stat-card">
          <span class="stat-val">{{ stats.cycles }}</span>
          <span class="stat-lbl">Cycles</span>
        </div>
        <div class="stat-card">
          <span class="stat-val">{{ formattedTime }}</span>
          <span class="stat-lbl">Durée</span>
        </div>
        <div class="stat-card">
          <span class="stat-val">{{ stats.breaths }}</span>
          <span class="stat-lbl">Respirations</span>
        </div>
      </div>
 
      <!-- Historique des sessions sauvegardées -->
      <div v-if="currentUser && savedSessions.length > 0" class="history-section">
        <div class="section-header">
          <h2>Mes sessions sauvegardées</h2>
          <div class="section-line"></div>
        </div>
        <div class="history-grid">
          <div class="history-card" v-for="session in savedSessions" :key="session.id">
            <div class="history-date">{{ formatDate(session.date) }}</div>
            <div class="history-stats">
              <span>⏱ {{ session.duree }}</span>
              <span>🔄 {{ session.cycles }} cycles</span>
              <span>🌬 {{ session.respirations }} respirations</span>
            </div>
            <div class="history-config">
              {{ session.inspire }}s / {{ session.hold }}s / {{ session.expire }}s / {{ session.pause }}s
            </div>
          </div>
        </div>
      </div>
 
      <!-- Conseils -->
      <div class="tips-section">
        <div class="section-header">
          <h2>Conseils pour bien respirer</h2>
          <div class="section-line"></div>
        </div>
        <div class="tips-grid">
          <div class="tip-card" v-for="tip in tips" :key="tip.title">
            <div class="tip-icon" :style="{ background: tip.bg }">
              <span>{{ tip.emoji }}</span>
            </div>
            <div class="tip-body">
              <h3>{{ tip.title }}</h3>
              <p>{{ tip.text }}</p>
            </div>
          </div>
        </div>
      </div>
 
    </div>
  </div>
</template>
 
<script>
import axios from "axios";
import { currentUser, logout } from "../stores/auth.js";
 
export default {
  name: "RespirationPage",
 
  data() {
    return {
      currentUser: currentUser.value,
      exercises: [],
      savedSessions: [],
      isSaving: false,
      saveSuccess: false,
      saveError: "",
      isRunning: false,
      phaseName: "Prêt",
      phaseCountdown: "–",
      circleScale: 0.3,
      circleTransition: "none",
      _phaseTimer: null,
      _sessionTimer: null,
      _currentPhaseIndex: 0,
      config: { inspire: 4, hold: 4, expire: 4, pause: 4 },
      sessionTime: 0,
      stats: { cycles: 0, breaths: 0 },
      activePreset: "box",
      presets: [
        { id: "box",  label: "4-4-4-4", inspire: 4, hold: 4, expire: 4, pause: 4 },
        { id: "478",  label: "4-7-8",   inspire: 4, hold: 7, expire: 8, pause: 0 },
        { id: "calm", label: "6-6",     inspire: 6, hold: 0, expire: 6, pause: 0 },
      ],
      phaseInputs: [
        { key: "inspire", label: "Inspiration", min: 2, max: 10 },
        { key: "hold",    label: "Rétention",   min: 0, max: 10 },
        { key: "expire",  label: "Expiration",  min: 2, max: 12 },
        { key: "pause",   label: "Pause",       min: 0, max: 8  },
      ],
      tips: [
        { emoji: "🧘", bg: "#e8f5e9", title: "Position assise", text: "Installez-vous confortablement, dos droit, pieds à plat sur le sol." },
        { emoji: "👃", bg: "#e3f2fd", title: "Respirez par le nez", text: "Inspirez et expirez par le nez." },
        { emoji: "🔁", bg: "#fff8e1", title: "Régularité", text: "Pratiquez 5 minutes par jour pour des effets durables sur le stress." },
      ],
    };
  },
 
  async mounted() {
    try {
      const res = await axios.get("/api/exercises");
      this.exercises = res.data;
    } catch (err) {
      console.error(err);
    }
    if (this.currentUser) this.loadSessions();
  },
 
  computed: {
    activePhases() {
      return [
        { name: "Inspirez", dur: this.config.inspire, scale: 1   },
        { name: "Retenez",  dur: this.config.hold,    scale: 1   },
        { name: "Expirez",  dur: this.config.expire,  scale: 0.3 },
        { name: "Pause",    dur: this.config.pause,   scale: 0.3 },
      ].filter((p) => p.dur > 0);
    },
    cycleDuration() {
      return this.config.inspire + this.config.hold + this.config.expire + this.config.pause;
    },
    formattedTime() {
      const m = Math.floor(this.sessionTime / 60);
      const s = this.sessionTime % 60;
      return `${m}:${s.toString().padStart(2, "0")}`;
    },
  },
 
  methods: {
    handleLogout() {
      logout();
      this.currentUser = null;
      this.$router.push('/');
    },

    // ✅ Applique un exercice de la BDD
    applyExercise(ex) {
      this.activePreset   = ex._id;
      this.config.inspire = ex.inspire || 4;
      this.config.hold    = ex.hold    || 0;
      this.config.expire  = ex.expire  || 4;
      this.config.pause   = ex.pause   || 0;
      if (this.isRunning) { this.stopExercise(); this.startExercise(); }
    },
 
    applyPreset(preset) {
      this.activePreset   = preset.id;
      this.config.inspire = preset.inspire;
      this.config.hold    = preset.hold;
      this.config.expire  = preset.expire;
      this.config.pause   = preset.pause;
      if (this.isRunning) { this.stopExercise(); this.startExercise(); }
    },
 
    toggleExercise() {
      this.isRunning ? this.stopExercise() : this.startExercise();
    },
 
    startExercise() {
      this.saveSuccess = false;
      this.saveError   = "";
      this.isRunning   = true;
      this.stats.cycles  = 0;
      this.stats.breaths = 0;
      this.sessionTime   = 0;
      this._currentPhaseIndex = 0;
      this._runPhase();
      this._sessionTimer = setInterval(() => this.sessionTime++, 1000);
    },
 
    stopExercise() {
      this.isRunning = false;
      clearTimeout(this._phaseTimer);
      clearInterval(this._sessionTimer);
      this.phaseName      = "Terminé";
      this.phaseCountdown = "–";
      this._animateCircle(0.3, 600);
    },
 
    async saveSession() {
      this.isSaving    = true;
      this.saveSuccess = false;
      this.saveError   = "";
      try {
        await axios.post("http://localhost:3000/api/sessions", {
          email: this.currentUser.email,
          duree: this.formattedTime,
          cycles: this.stats.cycles,
          respirations: this.stats.breaths,
          inspire: this.config.inspire,
          hold: this.config.hold,
          expire: this.config.expire,
          pause: this.config.pause,
          date: new Date().toISOString(),
        });
        this.saveSuccess = true;
        this.loadSessions();
      } catch (err) {
        this.saveError = "Impossible de sauvegarder. Réessayez.";
      } finally {
        this.isSaving = false;
      }
    },
 
    async loadSessions() {
      try {
        const res = await axios.get(`http://localhost:3000/api/sessions?email=${this.currentUser.email}`);
        this.savedSessions = res.data;
      } catch (err) {
        console.error("Impossible de charger les sessions.", err);
      }
    },
 
    formatDate(isoDate) {
      return new Date(isoDate).toLocaleDateString("fr-FR", {
        day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
      });
    },
 
    _runPhase() {
      if (!this.isRunning) return;
      const phase = this.activePhases[this._currentPhaseIndex];
      this._animateCircle(phase.scale, phase.dur * 1000);
      this._tick(phase, phase.dur);
    },
 
    _tick(phase, remaining) {
      this.phaseName      = phase.name;
      this.phaseCountdown = remaining;
      if (remaining > 1) {
        this._phaseTimer = setTimeout(() => this._tick(phase, remaining - 1), 1000);
      } else {
        this._currentPhaseIndex = (this._currentPhaseIndex + 1) % this.activePhases.length;
        if (this._currentPhaseIndex === 0) { this.stats.cycles++; this.stats.breaths++; }
        this._phaseTimer = setTimeout(() => this._runPhase(), 1000);
      }
    },
 
    _animateCircle(targetScale, durationMs) {
      this.circleTransition = `transform ${durationMs}ms ease`;
      this.circleScale      = targetScale;
    },
  },
 
  beforeUnmount() {
    clearTimeout(this._phaseTimer);
    clearInterval(this._sessionTimer);
  },
};
</script>

<style scoped>
@import '../css/Respiration.css';
</style>