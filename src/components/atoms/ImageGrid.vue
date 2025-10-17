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
        <UCard>
          <template #header>
            <Placeholder class="h-8" />
            <h3><em>{{playlistItem.name}}</em></h3>
          </template>

          <Placeholder class="h-32" />
          <div><em> by {{ playlistItem.ownerName }} </em></div>
          <div><em> Has {{ playlistItem.tracksCount ?? 0 }} tracks</em></div>
          <template #footer>
            <Placeholder class="h-8" />
          </template>
        </UCard>
<!--          <article class="track-card" style="display:flex;gap:12px;align-items:center">-->
<!--            <h3 style="margin:0; color:black;">{{ playlistItem.name }}</h3>-->
<!--            <br>-->
<!--              <em>-->
<!--                <a :href="playlistItem.url" target="_blank" rel="noopener" style="display:inline-block;margin-top:8px">-->
<!--                  spotify-->
<!--                </a>-->
<!--            </em>-->
<!--            <div>-->
<!--              <div style="font-size:0.95rem;color:antiquewhite"><em> Has {{ playlistItem.tracksCount ?? 0 }} tracks</em></div>-->
<!--            </div>-->
<!--          </article>-->
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
