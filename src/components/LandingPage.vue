<script setup>
import { reactive, ref} from "vue";
import {mapJsonToTrack} from "../types/classes.js";
import TrackView from "@/components/molecules/TrackView.vue";

defineProps({
  username: String
})
const rootUrl = import.meta.env.VITE_API_ROOT;
const apiKey = import.meta.env.VITE_API_KEY;

const limit=10;

const rawResult = reactive({});
const scrobbles = reactive([]);
const fetchOk = ref(false);


//  JSON: /2.0/?method=user.getrecenttracks&user=rj&api_key=YOUR_API_KEY&format=json
const fetchLastTracks = () => {
  console.log(`fetching with API key: ${apiKey} and baseUrl: ${rootUrl}`);
  const url = new URL(rootUrl);
  url.searchParams.set("method", "user.getrecenttracks");
  url.searchParams.set("user", "proxyamg");
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", limit);
  console.log(`fetching from url ${url.toString()}`);
  fetch(url)
      .then(res => res.json())
      .then(data => {console.log(`received data as json hopefully ${data}`); return data; })
      .then(data => {
        Object.assign(rawResult, data);
        return data;
      })
      .then(data => data.recenttracks.track)
      .then(tracks => tracks.map(json => mapJsonToTrack(json)))
      .then(tracks=> {console.log("mapped tracks..", tracks); return tracks;})
      .then(tracks => scrobbles.push(...tracks));
      console.log("scrobbles..", scrobbles)
      fetchOk.value = true;
};
fetchLastTracks();

</script>

<template>
  <div v-if="fetchOk">
    <TrackView v-for="scrobble in scrobbles" :key="scrobble.mbid" class="scrobble"
      :track="scrobble"
    />
  </div>
</template>

<style scoped>

</style>