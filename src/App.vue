<script lang="ts" setup>
import LandingPage from "@/components/LandingPage.vue";
</script>

<!--<template>-->
<!--  <main>-->
<!--    <LandingPage/>-->
<!--  </main>-->
<!--</template>-->
<template>
  <UApp>
    <RouterView />
  </UApp>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
