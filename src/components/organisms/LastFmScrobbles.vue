<script lang="ts" setup>
import {onMounted, reactive, ref, watch} from "vue";
import type {Track} from "@/types/types.ts";
import {fetchLastTracks} from "@/business/integrations/lastfm/api.ts";
import TracksView from "@/components/molecules/TracksView.vue";

const props = defineProps({
  username: {
    type: String,
    required: true,
  }
})

const scrobbles = reactive<Track[]>([]);
const fetchOk = ref<boolean>(false);

const fetcher = () => {
  fetchLastTracks(props.username)
    .then(data => {
      scrobbles.splice(0, scrobbles.length);
      scrobbles.push(...data)
    })
    .then(() => fetchOk.value = true);
}

watch(
  () => props.username,
  async (newUsername) => {
    if (!newUsername) return
    fetcher();
  }
)
onMounted(() => {
  fetcher();
})

</script>

<template>
    <div class="table-header-group">Recent scrobbles</div>
    <div v-if="fetchOk">
      <TracksView :tracks="scrobbles" />
    </div>
</template>

<style scoped>

</style>
