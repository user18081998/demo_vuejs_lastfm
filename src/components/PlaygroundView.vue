<script setup lang="ts">
import LastFmScrobbles from './organisms/LastFmScrobbles.vue';
</script>

<template>

<!--  <UApp>-->
<!--      <UContainer>-->
<!--        <Placeholder class="h-32"> <UButton label="Button" /> </Placeholder>-->

<!--        <Placeholder class="h-32">-->
<!--          <LastFmScrobbles/>-->
<!--        </Placeholder>-->
<!--      </UContainer>-->
<!--  </UApp>-->

    <UContainer class="flex gap-4 min-h-screen py-4">
      <!-- Left Sidebar -->
      <aside class="w-1/3">
        <UCard>
          <LastFmScrobbles/>
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
