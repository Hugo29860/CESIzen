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
      <div class="navbar-right">
        <span class="nav-util">Admin : {{ user?.prenom }}</span>
        <span class="divider">|</span>
        <button class="btn-login-nav" @click="handleLogout">Se déconnecter</button>
      </div>
    </nav>

    <!-- CONTENU ADMIN -->
    <div style="padding: 40px 48px">

      <!-- Titre -->
      <div class="section-header" style="margin-bottom: 24px">
        <h2 style="font-family: Nunito, sans-serif; font-size: 26px; font-weight: 800">
          Panneau d'administration
        </h2>
        <div class="section-line"></div>
      </div>

      <!-- Onglets -->
      <div style="display:flex; gap:0; margin-bottom:36px; border-bottom: 2px solid #eee">
        <button
          @click="onglet = 'exercices'"
          :style="onglet === 'exercices' ? 'border-bottom: 3px solid #f5c800; color:#222' : 'color:#888'"
          style="background:none; border:none; font-family:Nunito,sans-serif; font-size:16px; font-weight:700; padding:12px 24px; cursor:pointer; margin-bottom:-2px"
        >
          Exercices de respiration
        </button>
        <button
          @click="onglet = 'ressources'"
          :style="onglet === 'ressources' ? 'border-bottom: 3px solid #f5c800; color:#222' : 'color:#888'"
          style="background:none; border:none; font-family:Nunito,sans-serif; font-size:16px; font-weight:700; padding:12px 24px; cursor:pointer; margin-bottom:-2px"
        >
          Ressources / Articles
        </button>
      </div>

      <!-- ── ONGLET EXERCICES ── -->
      <div v-if="onglet === 'exercices'">

        <div class="login-card" style="max-width: 600px; margin-bottom: 40px; padding: 28px 32px">
          <h3 style="font-family: Nunito, sans-serif; font-size: 18px; font-weight: 800; margin-bottom: 20px">
            {{ editingId ? '✏️ Modifier l\'exercice' : '➕ Ajouter un exercice' }}
          </h3>
          <div class="login-body" style="padding: 0; gap: 14px">

            <div class="login-form-group">
              <label class="login-label">Nom</label>
              <div class="login-input-group" style="display:flex">
                <input v-model="form.name" type="text" placeholder="Ex: Cohérence cardiaque" style="padding-left:12px"/>
              </div>
            </div>

            <div class="login-form-group">
              <label class="login-label">Description</label>
              <div class="login-input-group" style="display:flex">
                <input v-model="form.description" type="text" placeholder="Ex: Respiration rythmée 5-5" style="padding-left:12px"/>
              </div>
            </div>

            <div class="login-form-group">
              <label class="login-label">Durée totale (secondes)</label>
              <div class="login-input-group" style="display:flex">
                <input v-model.number="form.duration" type="number" placeholder="Ex: 300" style="padding-left:12px"/>
              </div>
            </div>

            <!-- Phases de respiration -->
            <p style="font-size:13px; font-weight:600; color:#444; margin-top:4px">Phases de respiration</p>

            <div class="register-row">
              <div class="login-form-group">
                <label class="login-label">Inspiration (s)</label>
                <div class="login-input-group" style="display:flex">
                  <input v-model.number="form.inspire" type="number" min="1" max="15" placeholder="4" style="padding-left:12px"/>
                </div>
              </div>
              <div class="login-form-group">
                <label class="login-label">Rétention (s)</label>
                <div class="login-input-group" style="display:flex">
                  <input v-model.number="form.hold" type="number" min="0" max="15" placeholder="0" style="padding-left:12px"/>
                </div>
              </div>
            </div>

            <div class="register-row">
              <div class="login-form-group">
                <label class="login-label">Expiration (s)</label>
                <div class="login-input-group" style="display:flex">
                  <input v-model.number="form.expire" type="number" min="1" max="15" placeholder="4" style="padding-left:12px"/>
                </div>
              </div>
              <div class="login-form-group">
                <label class="login-label">Pause (s)</label>
                <div class="login-input-group" style="display:flex">
                  <input v-model.number="form.pause" type="number" min="0" max="15" placeholder="0" style="padding-left:12px"/>
                </div>
              </div>
            </div>

            <div v-if="formError" class="login-error">{{ formError }}</div>
            <div v-if="formSuccess" class="login-success">{{ formSuccess }}</div>

            <div style="display:flex; gap:12px; margin-top:4px">
              <button class="btn-ok btn-login-submit" @click="handleSubmit" :disabled="isSubmitting" style="flex:1">
                {{ isSubmitting ? 'Enregistrement...' : editingId ? 'Mettre à jour' : 'Ajouter' }}
              </button>
              <button v-if="editingId" class="btn-save" @click="resetForm" style="flex:1">Annuler</button>
            </div>

          </div>
        </div>

        <div class="section-header" style="margin-bottom: 20px">
          <h3 style="font-family: Nunito, sans-serif; font-size: 20px; font-weight: 700">
            Exercices existants ({{ exercises.length }})
          </h3>
          <div class="section-line"></div>
        </div>

        <div v-if="isLoading" style="color:#888; font-size:14px">Chargement...</div>
        <div v-else-if="exercises.length === 0" style="color:#888; font-size:14px">Aucun exercice pour le moment.</div>
        <div class="history-grid" v-else>
          <div class="history-card" v-for="ex in exercises" :key="ex._id">
            <div style="display:flex; justify-content:space-between; align-items:flex-start">
              <span style="font-family: Nunito, sans-serif; font-size:16px; font-weight:800; color:#222">{{ ex.name }}</span>
              <span class="history-config">{{ ex.duration }}s</span>
            </div>
            <p style="font-size:13px; color:#666; line-height:1.5; margin: 4px 0 8px">{{ ex.description }}</p>
            <!-- Affichage des phases -->
            <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:12px">
              <span class="history-config">💨 {{ ex.inspire }}s</span>
              <span class="history-config">⏸ {{ ex.hold }}s</span>
              <span class="history-config">💨 {{ ex.expire }}s</span>
              <span class="history-config">⏸ {{ ex.pause }}s</span>
            </div>
            <div style="display:flex; gap:8px">
              <button class="btn-save" @click="startEdit(ex)" style="flex:1; height:36px; font-size:13px">Modifier</button>
              <button class="btn-ok" @click="handleDelete(ex._id)" style="flex:1; height:36px; border-radius:22px; background:#e74c3c; color:white; font-size:13px">Supprimer</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ── ONGLET RESSOURCES ── -->
      <div v-if="onglet === 'ressources'">

        <div class="login-card" style="max-width: 600px; margin-bottom: 40px; padding: 28px 32px">
          <h3 style="font-family: Nunito, sans-serif; font-size: 18px; font-weight: 800; margin-bottom: 20px">
            {{ resEditingId ? '✏️ Modifier l\'article' : '➕ Ajouter un article' }}
          </h3>
          <div class="login-body" style="padding: 0; gap: 14px">

            <div class="login-form-group">
              <label class="login-label">Titre</label>
              <div class="login-input-group" style="display:flex">
                <input v-model="resForm.titre" type="text" placeholder="Ex: Comment gérer le stress au travail" style="padding-left:12px"/>
              </div>
            </div>

            <div class="login-form-group">
              <label class="login-label">Catégorie</label>
              <div class="login-input-group" style="display:flex">
                <select v-model="resForm.categorie" style="flex:1; height:40px; border:none; padding: 0 12px; font-size:14px; background:transparent; outline:none">
                  <option value="stress">Stress</option>
                  <option value="anxiete">Anxiété</option>
                  <option value="sommeil">Sommeil</option>
                  <option value="respiration">Respiration</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
            </div>

            <div class="login-form-group">
              <label class="login-label">Auteur</label>
              <div class="login-input-group" style="display:flex">
                <input v-model="resForm.auteur" type="text" placeholder="Ex: Équipe CESIZen" style="padding-left:12px"/>
              </div>
            </div>

            <div class="login-form-group">
              <label class="login-label">Contenu</label>
              <textarea
                v-model="resForm.contenu"
                placeholder="Rédigez votre article ici..."
                rows="8"
                style="width:100%; border: 1.5px solid #ddd; border-radius:6px; padding:12px; font-size:14px; font-family:Inter,sans-serif; resize:vertical; outline:none; box-sizing:border-box"
              ></textarea>
            </div>

            <div v-if="resFormError" class="login-error">{{ resFormError }}</div>
            <div v-if="resFormSuccess" class="login-success">{{ resFormSuccess }}</div>

            <div style="display:flex; gap:12px; margin-top:4px">
              <button class="btn-ok btn-login-submit" @click="handleResSubmit" :disabled="resIsSubmitting" style="flex:1">
                {{ resIsSubmitting ? 'Enregistrement...' : resEditingId ? 'Mettre à jour' : 'Publier' }}
              </button>
              <button v-if="resEditingId" class="btn-save" @click="resetResForm" style="flex:1">Annuler</button>
            </div>

          </div>
        </div>

        <div class="section-header" style="margin-bottom: 20px">
          <h3 style="font-family: Nunito, sans-serif; font-size: 20px; font-weight: 700">
            Articles publiés ({{ ressources.length }})
          </h3>
          <div class="section-line"></div>
        </div>

        <div v-if="resIsLoading" style="color:#888; font-size:14px">Chargement...</div>
        <div v-else-if="ressources.length === 0" style="color:#888; font-size:14px">Aucun article pour le moment.</div>
        <div class="history-grid" v-else>
          <div class="history-card" v-for="res in ressources" :key="res._id">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px">
              <span style="font-family: Nunito, sans-serif; font-size:15px; font-weight:800; color:#222">{{ res.titre }}</span>
              <span class="history-config">{{ labelCategorie(res.categorie) }}</span>
            </div>
            <p style="font-size:12px; color:#aaa; margin-bottom:6px">{{ res.auteur }}</p>
            <p style="font-size:13px; color:#666; line-height:1.5; margin-bottom:12px">
              {{ res.contenu.substring(0, 100) }}...
            </p>
            <div style="display:flex; gap:8px">
              <button class="btn-save" @click="startResEdit(res)" style="flex:1; height:36px; font-size:13px">Modifier</button>
              <button class="btn-ok" @click="handleResDelete(res._id)" style="flex:1; height:36px; border-radius:22px; background:#e74c3c; color:white; font-size:13px">Supprimer</button>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { currentUser, logout, getToken } from '../stores/auth.js'

const router = useRouter()
const user = computed(() => currentUser.value)
const onglet = ref('exercices')

onMounted(() => {
  if (!user.value || user.value.role !== 'admin') {
    router.push('/')
  }
  fetchExercises()
  fetchRessources()
})

// ── EXERCICES ──
const exercises    = ref([])
const isLoading    = ref(false)
const isSubmitting = ref(false)
const formError    = ref('')
const formSuccess  = ref('')
const editingId    = ref(null)

// ✅ form avec les champs de phases
const form = ref({ name: '', description: '', duration: '', inspire: 4, hold: 0, expire: 4, pause: 0 })

const fetchExercises = async () => {
  isLoading.value = true
  try {
    const res = await fetch('http://localhost:3000/api/exercises')
    exercises.value = await res.json()
  } catch { console.error('Erreur chargement exercices') }
  finally { isLoading.value = false }
}

const handleSubmit = async () => {
  formError.value = ''
  formSuccess.value = ''
  if (!form.value.name || !form.value.inspire || !form.value.expire) {
    formError.value = 'Le nom, l\'inspiration et l\'expiration sont obligatoires.'
    return
  }
  isSubmitting.value = true
  try {
    const url = editingId.value
      ? `http://localhost:3000/api/exercises/${editingId.value}`
      : 'http://localhost:3000/api/exercises'
    const res = await fetch(url, {
      method: editingId.value ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
      body: JSON.stringify(form.value)
    })
    if (!res.ok) throw new Error()
    formSuccess.value = editingId.value ? 'Exercice mis à jour ✅' : 'Exercice ajouté ✅'
    resetForm()
    fetchExercises()
  } catch { formError.value = 'Une erreur est survenue.' }
  finally { isSubmitting.value = false }
}

const handleDelete = async (id) => {
  if (!confirm('Supprimer cet exercice ?')) return
  try {
    await fetch(`http://localhost:3000/api/exercises/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
    fetchExercises()
  } catch { console.error('Erreur suppression') }
}

const startEdit = (ex) => {
  editingId.value = ex._id
  // ✅ inclut les phases
  form.value = {
    name: ex.name,
    description: ex.description,
    duration: ex.duration,
    inspire: ex.inspire || 4,
    hold: ex.hold || 0,
    expire: ex.expire || 4,
    pause: ex.pause || 0
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const resetForm = () => {
  editingId.value = null
  form.value = { name: '', description: '', duration: '', inspire: 4, hold: 0, expire: 4, pause: 0 }
  formError.value = ''
}

// ── RESSOURCES ──
const ressources      = ref([])
const resIsLoading    = ref(false)
const resIsSubmitting = ref(false)
const resFormError    = ref('')
const resFormSuccess  = ref('')
const resEditingId    = ref(null)
const resForm         = ref({ titre: '', contenu: '', categorie: 'stress', auteur: 'Équipe CESIZen' })

const categories = [
  { value: 'stress',       label: 'Stress' },
  { value: 'anxiete',      label: 'Anxiété' },
  { value: 'sommeil',      label: 'Sommeil' },
  { value: 'respiration',  label: 'Respiration' },
  { value: 'autre',        label: 'Autre' },
]

const labelCategorie = (val) => categories.find(c => c.value === val)?.label || val

const fetchRessources = async () => {
  resIsLoading.value = true
  try {
    const res = await fetch('http://localhost:3000/api/ressources')
    ressources.value = await res.json()
  } catch { console.error('Erreur chargement ressources') }
  finally { resIsLoading.value = false }
}

const handleResSubmit = async () => {
  resFormError.value = ''
  resFormSuccess.value = ''
  if (!resForm.value.titre || !resForm.value.contenu) {
    resFormError.value = 'Le titre et le contenu sont obligatoires.'
    return
  }
  resIsSubmitting.value = true
  try {
    const url = resEditingId.value
      ? `http://localhost:3000/api/ressources/${resEditingId.value}`
      : 'http://localhost:3000/api/ressources'
    const res = await fetch(url, {
      method: resEditingId.value ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
      body: JSON.stringify(resForm.value)
    })
    if (!res.ok) throw new Error()
    resFormSuccess.value = resEditingId.value ? 'Article mis à jour ✅' : 'Article publié ✅'
    resetResForm()
    fetchRessources()
  } catch { resFormError.value = 'Une erreur est survenue.' }
  finally { resIsSubmitting.value = false }
}

const handleResDelete = async (id) => {
  if (!confirm('Supprimer cet article ?')) return
  try {
    await fetch(`http://localhost:3000/api/ressources/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
    fetchRessources()
  } catch { console.error('Erreur suppression') }
}

const startResEdit = (res) => {
  resEditingId.value = res._id
  resForm.value = { titre: res.titre, contenu: res.contenu, categorie: res.categorie, auteur: res.auteur }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const resetResForm = () => {
  resEditingId.value = null
  resForm.value = { titre: '', contenu: '', categorie: 'stress', auteur: 'Équipe CESIZen' }
  resFormError.value = ''
}

const handleLogout = () => {
  logout()
  router.push('/')
}
</script>