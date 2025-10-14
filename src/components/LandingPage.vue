<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {Track} from "@/types/types";
import TrackView from "@/components/molecules/TrackView.vue";
import {fetchLastTracks} from "@/business/integrations/lastfm/api";
import TracksView from "@/components/molecules/TracksView.vue";
import TracksVueStellar from "@/components/molecules/TracksVueStellar.vue";

defineProps({
  username: String
})

const rawResult = reactive<any>({});
const scrobbles = reactive<Track[]>([]);
const fetchOk = ref<boolean>(false);

onMounted(() => {
  fetchLastTracks()
      .then(data => scrobbles.push(...data))
      .then(_ => fetchOk.value = true);
})

</script>

<template>
  <div v-if="fetchOk">
<!--    <TracksView :tracks="scrobbles" />-->
    <TracksVueStellar :tracks="scrobbles" />
  </div>
</template>

<style scoped>

</style>