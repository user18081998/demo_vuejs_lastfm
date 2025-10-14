<script setup lang="ts">
import LastFmScrobbles from './organisms/LastFmScrobbles.vue';
import LastFmHeading from "@/components/organisms/LastFmHeading.vue";
import { ref } from 'vue'

const username=ref<string>('proxyamg');

function setUsername(newUsername: string) :void {
  username.value = newUsername;
}

</script>

<template>
    <LastFmHeading @submit="setUsername"/>
    <UContainer class="flex gap-4 min-h-screen py-4">
      <!-- Left Sidebar -->
      <aside class="w-1/3">
        <UCard>
          <LastFmScrobbles
            :username="username"
          />
        </UCard>
      </aside>

      <!-- Main Content -->
      <main class="flex-1">
        <UCard>
          <template #header>Main Content</template>
          <p class="text-gray-600">
            This is your main content area.
          </p>
        </UCard>
      </main>

      <!-- Right Sidebar -->
      <aside class="w-1/5">
        <UCard>
          <template #header>Right Sidebar</template>
          <p class="text-gray-600">
            Additional info or widgets.
          </p>
        </UCard>
      </aside>
    </UContainer>
</template>


<style scoped>

</style>
