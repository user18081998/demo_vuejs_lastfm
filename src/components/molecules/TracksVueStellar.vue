<script setup lang="ts">
import {Track} from "@/types/types";
import {reactive} from "vue";

const props = defineProps<{
  tracks: Track[]
}>();

interface TrackRow extends Track {
  imgHtml?: string;
  href?: string;
}


const columns = [
  {
    key: 'mbid',
    label: 'LFMID',
    class: 'mbid',
  },{
    key: 'imgHtml',
    value: ""
  }, {
    key: 'name',
    label: 'Song',
  }, {
    key: 'artist',
    label: 'Artist'
  }, {
    key: 'album',
    label: 'Album'
  }, {
    key: 'date'
  }, {
    key: 'href',
    value: "goto"
  }
]

const anotherMapper = (track: Track) : TrackRow => new Object({
    ...track,
    imgHtml : `<img src=${track.imageUrl} />`,
    href: `<a href=${track.url}>to lfm</a>`,
});

const rows = reactive<TrackRow[]>(props.tracks.map(t=>anotherMapper(t)));

;

// const tableItems = reactive<Record<string, string>[]>([]);
//
// for(let track of props.tracks) {
//   for(let [key, value] of Object.entries(track)) {
//     const item :Record<string, string> =
//         {label: key, content: value};
//     tableItems.push(item);
//   }
// }

</script>

<template>
  <s-table
      :columns="columns"
      :rows="rows" />
</template>

<style scoped>
.mbid {
  visibility: hidden;
}
</style>