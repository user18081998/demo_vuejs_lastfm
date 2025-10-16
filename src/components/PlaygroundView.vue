<script setup lang="ts">
import LastFmScrobbles from './organisms/LastFmScrobbles.vue';
import LastFmHeading from "@/components/organisms/LastFmHeading.vue";
import { ref } from 'vue'
// const SpotifyPlayground = defineAsyncComponent(() =>
//   import("@/components/organisms/SpotifyPlayground.vue")
// )
import SpotifyPlayground from "@/components/organisms/SpotifyPlayground.vue";
import {fetchRssFeed} from "@/business/integrations/goodreads/rssReader.ts";
const username=ref<string>('proxyamg');

function setUsername(newUsername: string) :void {
  username.value = newUsername;
}
fetchRssFeed();
</script>

<template>
    <LastFmHeading @submit="setUsername"/>
    <UContainer class="flex gap-4 min-h-screen py-4">
      <!-- Left Sidebar -->
      <aside class="w-1/4">
        <UCard>
          <LastFmScrobbles
            :username="username"
          />
        </UCard>
      </aside>
      <!-- Main Content -->
      <main class="flex-1">
        <SpotifyPlayground/>
      </main>

      <!-- Right Sidebar -->
      <aside class="w-1/5">
        <UCard>
          <LastFmScrobbles
            :username="username"
          />
        </UCard>
      </aside>
    </UContainer>
</template>


<style scoped>

</style>
