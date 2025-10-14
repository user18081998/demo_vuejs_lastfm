<script setup lang="ts">
import TrackView from "@/components/molecules/TrackView.vue";
import {Track} from "@/types/types";

defineProps<{
  tracks: Track[]
}>()

</script>

<template>
  <TrackView v-for="scrobble in tracks" :key="scrobble.mbid" class="scrobble"
             :track="scrobble"
  />
</template>

<style scoped>

</style>