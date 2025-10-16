<script setup lang="ts">
  import {useSpotifyTokenStore} from "@/stores/spotifyAuthStore.ts";

  const store = useSpotifyTokenStore();

  const ctxMenuItems = [
    {
      label: 'Reload',
      icon: 'reload',
      onSelect: () => {store.fetchData()}
    },{
      label: 'Signout',
      icon: 'signout',
      onSelect: () => {console.log('signout'); store.signout()}
    }
  ];
</script>

<template>
    <UContextMenu :items="ctxMenuItems">
      <UCard>
        <UButton v-if="!store.isConnected" color="primary" class="h-1/5">
          <a :href="store.urlToAuth??'#'" >Login Spotify</a>
        </UButton>
        <UContainer py-4 v-else>
<!--          <Placeholder class="h-32" />-->
          <a :href="store.user?.url" target="_blank">
            <UUser
              :name="store.user?.display_name ?? 'somebody'"
              description="Music Nerd"
              :avatar="{
                src: store.user?.imagesUrl,
                icon: 'i-lucide-image',
                color: 'blue'
              }"
            />
          </a>
          <UCard v-for="playlist in store.playlists" :key="playlist.id">
            <template #header>{{ playlist.name }}</template>
            <article class="track-card" style="display:flex;gap:12px;align-items:center">
              <a :href="playlist.url" target="_blank" rel="noopener" style="display:inline-block;margin-top:8px">
                <img :src="playlist.image" alt="cover" style="width:96px;height:96px;object-fit:cover;border-radius:6px"/>
              </a>
<!--              <div>-->
<!--                <h3 style="margin:0; color:white;">{{ track.name }}</h3>-->
<!--                <div style="font-size:0.95rem;color:antiquewhite"><em>{{ track.artist }}</em> — <em>{{ track.album }}</em></div>-->
<!--                <div style="font-size:0.85rem;color:#777;margin-top:6px">{{ track.date }}</div>-->
<!--              </div>-->
            </article>
          </UCard>
        </UContainer>
      </UCard>
  </UContextMenu>

</template>

<style scoped>

</style>
