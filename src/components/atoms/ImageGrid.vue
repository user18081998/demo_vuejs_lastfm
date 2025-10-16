<script setup lang="ts">
import { computed } from 'vue'

interface ImageItem {
  src: string
}

const props = defineProps<{
  images: ImageItem[]
  n: number // number of columns/rows
}>()

// total cells = n*n
// compute grid positions for each image
const gridWithCoords = computed(() =>
  props.images.map((img, index) => {
    const row = Math.floor(index / props.n)
    const col = index % props.n
    return { ...img, row, col }
  })
)
</script>

<template>
  <div
    class="grid gap-0"
    :style="{
      gridTemplateColumns: `repeat(${n}, 1fr)`
    }"
  >
    <div
      v-for="(item, i) in gridWithCoords"
      :key="i"
      class="aspect-square overflow-hidden"
      :data-row="item.row"
      :data-col="item.col"
    >
      <img
        :src="item.src"
        alt=""
        class="w-full h-full object-cover block select-none"
      />
    </div>
  </div>
</template>

<style scoped>
/* remove any default spacing */
.grid {
  border: none;
}
</style>