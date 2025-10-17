<script setup lang="ts">
  import {useSpotifyTokenStore} from "@/stores/spotifyAuthStore.ts";
  import {ref, computed, watch, onMounted, onBeforeUnmount, nextTick} from "vue";
  import ImageGrid from "@/components/atoms/ImageGrid.vue";
  import type {ImageItem} from "@/models/types.ts";
  import LastFmScrobbles from "@/components/organisms/LastFmScrobbles.vue";

  const store = useSpotifyTokenStore();
  const spotifyDropDownItems = [
    {
      label: 'Reload',
      icon: 'i-lucide-refresh-ccw', //refresh-ccw
      onSelect: () => {store.fetchData()}
    },{
      label: 'Signout',
      icon: 'i-lucide-log-out',
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
  <UContainer class="flex pb-4">
    <aside class="justify-start text-left w-1/3 pl-1">
      <UButton v-if="!store.isConnected" color="primary">
        <a :href="store.urlToAuth??'#'" >Login Spotify</a>
      </UButton>
      <UDropdownMenu v-else :items="spotifyDropDownItems" color="neutral" variant="outline">
        <UUser
          :name="store.user?.display_name ?? 'somebody'"
          description="Music Nerd"
          :avatar="{
              src: store.user?.imagesUrl,
              icon: 'i-lucide-image',
              color: 'blue'
            }"
        />
      </UDropdownMenu>

    </aside>
    <main class="flex-1">MAIN</main>
    <aside class="w-1/6">
    LEFT
    </aside>
  </UContainer>
  <ImageGrid
    :playlists="store.playlists"
    :n="step"
  />

</template>

<style scoped>

</style>
