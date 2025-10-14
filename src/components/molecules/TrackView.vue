<script lang="ts" setup>
import type {Track} from "@/types/types";

defineProps<{
  track: Track
}>()
</script>

<template>
  <article class="track-card" style="display:flex;gap:12px;align-items:center">
    <img :src="track.imageUrl" alt="cover" style="width:96px;height:96px;object-fit:cover;border-radius:6px"/>
    <div>
      <h3 style="margin:0">{{ track.name }}</h3>
      <div style="font-size:0.95rem;color:#555">{{ track.artist }} — <em>{{ track.album }}</em></div>
      <div style="font-size:0.85rem;color:#777;margin-top:6px">{{ track.date }}</div>
      <a :href="track.url" target="_blank" rel="noopener" style="display:inline-block;margin-top:8px">Open</a>
    </div>
  </article>
</template>

<style scoped>

</style>
