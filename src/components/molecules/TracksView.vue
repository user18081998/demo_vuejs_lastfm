<script setup lang="ts">
import TrackView from "@/components/molecules/TrackView.vue";
import type {Track} from "@/types/types";

defineProps<{
  tracks: Track[]
}>()

</script>

<template>
  <ul class="space-y-1.5, space-x-0">
    <TrackView v-for="scrobble in tracks" :key="scrobble.mbid" class="scrobble"
               :track="scrobble"
    />
  </ul>
</template>

<style scoped>

</style>
