<script setup lang="ts">
  import {useSpotifyTokenStore} from "@/stores/spotifyAuthStore.ts";
  import {ref, computed, watch, onMounted, onBeforeUnmount, nextTick} from "vue";
  import ImageGrid from "@/components/atoms/ImageGrid.vue";

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
  onMounted(() => {
    if (store.isConnected && store.playlists.length===0) {
      store.fetchData();
    }
  })
  const range = (start : number, stop: number, step: number) =>
    Array.from(
      { length: Math.ceil((stop - start) / step) },
      (_, i) => start + i * step,
    );
  const containerRef = ref<HTMLElement | null>(null);
  const step = ref(3);
</script>

<template>
    <UContextMenu :items="ctxMenuItems">
      <UCard>
        <template #header>
          <UButton v-if="!store.isConnected" color="primary" class="h-1/5">
            <a :href="store.urlToAuth??'#'" >Login Spotify</a>
          </UButton>
          <UContainer v-else ref="containerRef" class="py-4">
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
          </UContainer>
        </template>
        <ImageGrid
          :images="store.playlists.map(p=>new Object({src: p.image}))"
          :n="step"
        />
      </UCard>
  </UContextMenu>

</template>

<style scoped>

</style>
