<script setup lang="ts">
  import {useSpotifyTokenStore} from "@/stores/spotifyAuthStore.ts";

  const store = useSpotifyTokenStore();

  const ctxMenuItems = [
    {
      label: 'Reload',
      icon: 'reload',
      onSelect: () => {store.fetchData()}
    },{
      label: 'Signout',
      icon: 'signout',
      onSelect: () => {console.log('signout'); store.signout()}
    }
  ];
</script>

<template>
    <UContextMenu :items="ctxMenuItems">
      <UCard>
        <UButton v-if="!store.isConnected" color="primary" class="h-1/5">
          <a :href="store.urlToAuth??'#'" >Login Spotify</a>
        </UButton>
        <UContainer v-else>
          <Placeholder class="h-32" />
          <div>
            Welcome {{store.user?.display_name ?? "somebody" }}
          </div>
          <USkeleton class="h-12 w-12 rounded-full" />
          <div class="grid gap-2">
            <USkeleton class="h-4 w-[250px]" />
            <USkeleton class="h-4 w-[200px]" />
          </div>
        </UContainer>
      </UCard>
  </UContextMenu>

</template>

<style scoped>

</style>
