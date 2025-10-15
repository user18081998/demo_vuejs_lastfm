<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useSpotifyTokenStore } from '@/stores/spotifyAuthStore.ts'
import { onMounted, ref } from 'vue'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const store = useSpotifyTokenStore()
console.log("before use store in callback view", store.verifier)
onMounted(async () => {
  const code = route.query.code as string
  if (code) {
    await store.exchangeCodeForToken(code)
    await store.fetchData()
    loading.value = false
    router.push('/')
  }
})
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <p v-if="loading">Connecting to Spotify...</p>
<!--    <p v-else-if="user">Welcome, {{ user.display_name }}</p>-->
  </div>
</template>

<style scoped>

</style>
