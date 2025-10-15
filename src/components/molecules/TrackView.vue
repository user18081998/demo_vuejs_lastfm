<script lang="ts" setup>
import type {Track} from "@/models/types";

defineProps<{
  track: Track
}>()
</script>

<template>
  <li>
      <article class="track-card" style="display:flex;gap:12px;align-items:center">
        <a :href="track.url" target="_blank" rel="noopener" style="display:inline-block;margin-top:8px">
          <img :src="track.imageUrl" alt="cover" style="width:96px;height:96px;object-fit:cover;border-radius:6px"/>
        </a>
        <div>
          <h3 style="margin:0; color:white;">{{ track.name }}</h3>
          <div style="font-size:0.95rem;color:antiquewhite"><em>{{ track.artist }}</em> — <em>{{ track.album }}</em></div>
          <div style="font-size:0.85rem;color:#777;margin-top:6px">{{ track.date }}</div>
        </div>
      </article>
  </li>
</template>

<style scoped>

</style>
