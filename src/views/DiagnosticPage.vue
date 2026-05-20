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
        <RouterLink to="/" class="nav-link">Accueil</RouterLink>
        <RouterLink to="/respiration" class="nav-link">Respiration</RouterLink>
        <RouterLink to="/diagnostic" class="nav-link active">Diagnostic</RouterLink>
        <RouterLink to="/ressources" class="nav-link">Ressources</RouterLink>
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

    <!-- NON CONNECTÉ -->
    <div v-if="!user" class="login-section">
      <div class="login-bg"></div>
      <div class="login-card" style="max-width:480px; text-align:center">
        <div class="login-header">
          <span class="login-title">Diagnostic de stress</span>
          <span class="login-subtitle">Connectez-vous pour accéder au test</span>
        </div>
        <div class="login-body">
          <p style="font-size:14px; color:#666; margin-bottom:20px">
            Le diagnostic est réservé aux utilisateurs connectés afin de sauvegarder vos résultats.
          </p>
          <RouterLink to="/login" class="btn-ok btn-login-submit" style="display:block; text-align:center; text-decoration:none">
            Se connecter
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- CONNECTÉ -->
    <div v-else class="breathing-page">

      <!-- Header -->
      <div class="page-header">
        <div class="page-header-inner">
          <h1 class="page-title">Autodiagnostic du stress</h1>
          <p class="page-subtitle">Répondez honnêtement pour obtenir une évaluation personnalisée.</p>
        </div>
      </div>

      <div style="max-width: 720px; margin: 0 auto; padding: 40px 24px 80px">

        <!-- RÉSULTAT -->
        <div v-if="resultat" class="login-card" style="padding: 36px; text-align:center">

          <div :style="{ fontSize: '64px', marginBottom: '16px' }">{{ resultat.emoji }}</div>

          <h2 style="font-family: Nunito, sans-serif; font-size: 24px; font-weight: 800; margin-bottom: 8px">
            {{ resultat.titre }}
          </h2>

          <div style="display:inline-block; padding: 6px 20px; border-radius: 20px; font-size: 14px; font-weight: 700; margin-bottom: 20px"
            :style="{ background: resultat.couleurBg, color: resultat.couleurText }">
            Score : {{ score }} / {{ scoreMax }}
          </div>

          <p style="font-size: 15px; color: #555; line-height: 1.7; margin-bottom: 28px">
            {{ resultat.description }}
          </p>

          <!-- Recommandations -->
          <div style="text-align:left; margin-bottom: 28px">
            <h3 style="font-family: Nunito, sans-serif; font-size: 17px; font-weight: 800; margin-bottom: 14px">
              Nos recommandations
            </h3>
            <div
              v-for="(rec, i) in resultat.recommandations"
              :key="i"
              style="display:flex; gap:12px; align-items:flex-start; margin-bottom:12px"
            >
              <span style="font-size:20px; flex-shrink:0">{{ rec.emoji }}</span>
              <div>
                <p style="font-size:14px; font-weight:600; color:#222; margin-bottom:2px">{{ rec.titre }}</p>
                <p style="font-size:13px; color:#777; line-height:1.5">{{ rec.texte }}</p>
              </div>
            </div>
          </div>

          <div style="display:flex; gap:12px">
            <button class="btn-ok btn-login-submit" @click="recommencer" style="flex:1">
              Recommencer le test
            </button>
            <RouterLink to="/respiration" class="btn-save" style="flex:1; display:flex; align-items:center; justify-content:center; text-decoration:none; height:46px; border-radius:24px; font-size:15px; font-weight:700">
              Exercices de respiration
            </RouterLink>
          </div>

        </div>

        <!-- QUESTIONNAIRE -->
        <div v-else>

          <!-- Barre de progression -->
          <div style="margin-bottom: 32px">
            <div style="display:flex; justify-content:space-between; font-size:13px; color:#888; margin-bottom:8px">
              <span>Question {{ questionIndex + 1 }} sur {{ questions.length }}</span>
              <span>{{ Math.round(((questionIndex) / questions.length) * 100) }}%</span>
            </div>
            <div style="height:6px; background:#eee; border-radius:3px; overflow:hidden">
              <div
                style="height:100%; background:#f5c800; border-radius:3px; transition: width 0.4s ease"
                :style="{ width: ((questionIndex / questions.length) * 100) + '%' }"
              ></div>
            </div>
          </div>

          <!-- Question courante -->
          <div class="login-card" style="padding: 36px; margin-bottom: 24px">
            <p style="font-size:13px; font-weight:600; color:#4a7a58; margin-bottom:12px; text-transform:uppercase; letter-spacing:0.5px">
              {{ questions[questionIndex].categorie }}
            </p>
            <h3 style="font-family: Nunito, sans-serif; font-size: 20px; font-weight: 800; color:#222; line-height:1.4; margin-bottom:28px">
              {{ questions[questionIndex].texte }}
            </h3>

            <div style="display:flex; flex-direction:column; gap:12px">
              <button
                v-for="choix in questions[questionIndex].choix"
                :key="choix.valeur"
                @click="repondre(choix.valeur)"
                class="feature-card"
                style="text-align:left; cursor:pointer; padding:14px 20px; gap:12px; border: 2px solid transparent; transition: all 0.2s"
                :style="reponses[questionIndex] === choix.valeur ? 'border-color: #4a7a58; background: #e8f5e9' : ''"
              >
                <span style="font-size:14px; color:#333; font-weight:500">{{ choix.label }}</span>
              </button>
            </div>
          </div>

          <!-- Navigation -->
          <div style="display:flex; justify-content:space-between; align-items:center">
            <button
              class="btn-save"
              @click="precedent"
              :disabled="questionIndex === 0"
              style="height:44px; padding: 0 24px; font-size:14px"
            >
              ← Précédent
            </button>

            <button
              v-if="questionIndex < questions.length - 1"
              class="btn-ok"
              @click="suivant"
              :disabled="reponses[questionIndex] === undefined"
              style="height:44px; padding: 0 28px; border-radius:22px; font-size:14px; font-weight:700"
            >
              Suivant →
            </button>

            <button
              v-else
              class="btn-ok btn-login-submit"
              @click="calculerScore"
              :disabled="reponses[questionIndex] === undefined"
              style="height:44px; padding: 0 28px; border-radius:22px; font-size:15px"
            >
              Voir mon résultat
            </button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { currentUser, logout } from '../stores/auth.js'

const router = useRouter()
const user = computed(() => currentUser.value)

const questionIndex = ref(0)
const reponses = ref({})
const resultat = ref(null)

const questions = [
  {
    categorie: "Travail & pression",
    texte: "Au cours du dernier mois, à quelle fréquence avez-vous été dérangé(e) par des événements inattendus ?",
    choix: [
      { label: "Jamais", valeur: 0 },
      { label: "Presque jamais", valeur: 1 },
      { label: "Parfois", valeur: 2 },
      { label: "Assez souvent", valeur: 3 },
      { label: "Très souvent", valeur: 4 },
    ]
  },
  {
    categorie: "Contrôle",
    texte: "Au cours du dernier mois, vous êtes-vous senti(e) incapable de contrôler les choses importantes de votre vie ?",
    choix: [
      { label: "Jamais", valeur: 0 },
      { label: "Presque jamais", valeur: 1 },
      { label: "Parfois", valeur: 2 },
      { label: "Assez souvent", valeur: 3 },
      { label: "Très souvent", valeur: 4 },
    ]
  },
  {
    categorie: "Nervosité",
    texte: "Au cours du dernier mois, vous êtes-vous senti(e) nerveux(se) ou stressé(e) ?",
    choix: [
      { label: "Jamais", valeur: 0 },
      { label: "Presque jamais", valeur: 1 },
      { label: "Parfois", valeur: 2 },
      { label: "Assez souvent", valeur: 3 },
      { label: "Très souvent", valeur: 4 },
    ]
  },
  {
    categorie: "Confiance",
    texte: "Au cours du dernier mois, vous êtes-vous senti(e) confiant(e) dans votre capacité à gérer vos problèmes personnels ?",
    choix: [
      { label: "Très souvent", valeur: 0 },
      { label: "Assez souvent", valeur: 1 },
      { label: "Parfois", valeur: 2 },
      { label: "Presque jamais", valeur: 3 },
      { label: "Jamais", valeur: 4 },
    ]
  },
  {
    categorie: "Maîtrise",
    texte: "Au cours du dernier mois, avez-vous senti que les choses allaient dans le sens que vous souhaitiez ?",
    choix: [
      { label: "Très souvent", valeur: 0 },
      { label: "Assez souvent", valeur: 1 },
      { label: "Parfois", valeur: 2 },
      { label: "Presque jamais", valeur: 3 },
      { label: "Jamais", valeur: 4 },
    ]
  },
  {
    categorie: "Surcharge",
    texte: "Au cours du dernier mois, avez-vous eu l'impression de ne pas pouvoir faire face à tout ce que vous aviez à faire ?",
    choix: [
      { label: "Jamais", valeur: 0 },
      { label: "Presque jamais", valeur: 1 },
      { label: "Parfois", valeur: 2 },
      { label: "Assez souvent", valeur: 3 },
      { label: "Très souvent", valeur: 4 },
    ]
  },
  {
    categorie: "Énergie",
    texte: "Au cours du dernier mois, avez-vous été capable de contrôler votre énervement ?",
    choix: [
      { label: "Très souvent", valeur: 0 },
      { label: "Assez souvent", valeur: 1 },
      { label: "Parfois", valeur: 2 },
      { label: "Presque jamais", valeur: 3 },
      { label: "Jamais", valeur: 4 },
    ]
  },
  {
    categorie: "Maîtrise de soi",
    texte: "Au cours du dernier mois, avez-vous senti que vous maîtrisiez la situation ?",
    choix: [
      { label: "Très souvent", valeur: 0 },
      { label: "Assez souvent", valeur: 1 },
      { label: "Parfois", valeur: 2 },
      { label: "Presque jamais", valeur: 3 },
      { label: "Jamais", valeur: 4 },
    ]
  },
  {
    categorie: "Colère",
    texte: "Au cours du dernier mois, avez-vous été en colère à cause de choses indépendantes de votre volonté ?",
    choix: [
      { label: "Jamais", valeur: 0 },
      { label: "Presque jamais", valeur: 1 },
      { label: "Parfois", valeur: 2 },
      { label: "Assez souvent", valeur: 3 },
      { label: "Très souvent", valeur: 4 },
    ]
  },
  {
    categorie: "Accumulation",
    texte: "Au cours du dernier mois, avez-vous eu l'impression que les difficultés s'accumulaient au point de ne plus pouvoir les surmonter ?",
    choix: [
      { label: "Jamais", valeur: 0 },
      { label: "Presque jamais", valeur: 1 },
      { label: "Parfois", valeur: 2 },
      { label: "Assez souvent", valeur: 3 },
      { label: "Très souvent", valeur: 4 },
    ]
  },
]

const scoreMax = questions.length * 4

const score = computed(() => {
  return Object.values(reponses.value).reduce((acc, val) => acc + val, 0)
})

const repondre = (valeur) => {
  reponses.value[questionIndex.value] = valeur
}

const suivant = () => {
  if (questionIndex.value < questions.length - 1) questionIndex.value++
}

const precedent = () => {
  if (questionIndex.value > 0) questionIndex.value--
}

const recommencer = () => {
  reponses.value = {}
  questionIndex.value = 0
  resultat.value = null
}

const calculerScore = () => {
  const s = score.value
  const pct = (s / scoreMax) * 100

  if (pct <= 25) {
    resultat.value = {
      emoji: '😊',
      titre: 'Stress faible',
      couleurBg: '#e8f5e9',
      couleurText: '#2e7d32',
      description: 'Votre niveau de stress est faible. Vous gérez bien les situations du quotidien et vous sentez globalement en contrôle de votre vie. Continuez ainsi !',
      recommandations: [
        { emoji: '🧘', titre: 'Maintenez vos bonnes habitudes', texte: 'Continuez à pratiquer des activités qui vous font du bien.' },
        { emoji: '🌿', titre: 'Prévention', texte: 'Pratiquez la pleine conscience quelques minutes par jour pour rester serein(e).' },
        { emoji: '💪', titre: 'Activité physique', texte: 'Une activité physique régulière renforce votre résistance au stress.' },
      ]
    }
  } else if (pct <= 50) {
    resultat.value = {
      emoji: '😐',
      titre: 'Stress modéré',
      couleurBg: '#fff8e1',
      couleurText: '#f57f17',
      description: 'Votre niveau de stress est modéré. Vous faites face à certaines tensions mais vous parvenez globalement à les gérer. Quelques ajustements peuvent vous aider.',
      recommandations: [
        { emoji: '🌬', titre: 'Exercices de respiration', texte: 'La cohérence cardiaque (5 min, 3 fois par jour) réduit efficacement le stress.' },
        { emoji: '📅', titre: 'Organisation', texte: 'Planifiez vos tâches pour éviter la surcharge et prioriser l\'essentiel.' },
        { emoji: '😴', titre: 'Sommeil', texte: 'Veillez à dormir 7 à 8 heures par nuit pour mieux récupérer.' },
        { emoji: '🚶', titre: 'Pauses régulières', texte: 'Faites des pauses de 5 minutes toutes les heures pour décompresser.' },
      ]
    }
  } else if (pct <= 75) {
    resultat.value = {
      emoji: '😟',
      titre: 'Stress élevé',
      couleurBg: '#fff3e0',
      couleurText: '#e65100',
      description: 'Votre niveau de stress est élevé. Vous ressentez une pression importante qui affecte votre quotidien. Il est important d\'agir maintenant pour éviter l\'épuisement.',
      recommandations: [
        { emoji: '🆘', titre: 'Parlez-en', texte: 'Ne restez pas seul(e) avec votre stress, parlez à un proche ou un professionnel.' },
        { emoji: '🌬', titre: 'Respiration quotidienne', texte: 'Pratiquez la respiration 4-7-8 chaque soir avant de dormir.' },
        { emoji: '📵', titre: 'Déconnexion digitale', texte: 'Réduisez le temps d\'écran, notamment les réseaux sociaux.' },
        { emoji: '🏃', titre: 'Sport', texte: 'L\'activité physique libère des endorphines qui contrebalancent le stress.' },
        { emoji: '📖', titre: 'Journaling', texte: 'Écrivez vos pensées chaque soir pour vider votre mental.' },
      ]
    }
  } else {
    resultat.value = {
      emoji: '😰',
      titre: 'Stress très élevé',
      couleurBg: '#fdecea',
      couleurText: '#c62828',
      description: 'Votre niveau de stress est très élevé. Vous êtes en situation de détresse importante. Il est fortement conseillé de consulter un professionnel de santé.',
      recommandations: [
        { emoji: '🏥', titre: 'Consultez un professionnel', texte: 'Un médecin ou psychologue peut vous aider à traverser cette période difficile.' },
        { emoji: '🆘', titre: 'Entourage', texte: 'Parlez à vos proches, ne restez pas isolé(e).' },
        { emoji: '🌬', titre: 'Respiration d\'urgence', texte: 'En cas de crise, respirez lentement : 4s inspiration, 4s blocage, 4s expiration.' },
        { emoji: '🛌', titre: 'Repos prioritaire', texte: 'Le repos est une priorité médicale, pas un luxe.' },
        { emoji: '🚫', titre: 'Limitez les engagements', texte: 'Apprenez à dire non et réduisez vos obligations non essentielles.' },
      ]
    }
  }
}

const handleLogout = () => {
  logout()
  router.push('/')
}
</script>