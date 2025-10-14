<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import type {Track} from "@/types/types";
import {fetchLastTracks} from "@/business/integrations/lastfm/api";
import TracksView from "@/components/molecules/TracksView.vue";

defineProps({
  username: String
})

const scrobbles = reactive<Track[]>([]);
const fetchOk = ref<boolean>(false);

onMounted(() => {
  fetchLastTracks()
      .then(data => scrobbles.push(...data))
      .then(() => fetchOk.value = true);
})

</script>

<template>
  <div v-if="fetchOk">
    <TracksView :tracks="scrobbles" />
  </div>
</template>

<style scoped>

</style>
