<script setup lang="ts">
import { computed } from 'vue'
import type {ImageItem} from "@/models/types.ts";
import type {SpotifyPlaylist} from "@/models/SpotifyModels.ts";


const props = defineProps<{
  playlists: SpotifyPlaylist[]
  n: number // number of columns/rows
}>()

// total cells = n*n
// compute grid positions for each image
const gridWithCoords = computed(() =>
  props.playlists.map((playlist, index) => {
    const row = Math.floor(index / props.n)
    const col = index % props.n
    return { ...playlist, row, col }
  })
)
</script>

<template>
  <div
    class="grid gap-0"
    :style="{
      gridTemplateColumns: `repeat(${n}, 1fr)`
    }"
  >
    <UPopover v-for="(playlistItem, i) in gridWithCoords"
            :key="i"
            :data-row="playlistItem.row"
            :data-col="playlistItem.col"
    >
      <div class="aspect-square overflow-hidden">
        <img
          :src="playlistItem.image"
          alt="playlistItem.name"
          class="w-full h-full object-cover block select-none"
        />
      </div>

      <template #content>
        <iframe
          data-testid="embed-iframe"
          style="border-radius:12px"
          :src="`https://open.spotify.com/embed/playlist/${playlistItem.id}?utm_source=generator`"
          width="100%" height="352" frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </template>
    </UPopover>
  </div>
</template>

<style scoped>
/* remove any default spacing */
.grid {
  border: none;
}
</style>
