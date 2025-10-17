<template>
  <UContainer class="flex space-x-4 py-4">
      <header class="flex items-center justify-between p-4 border-b">
        <!-- Left: Heading -->
        <div class="flex items-center space-x-4">

        </div>

        <!-- Right: Input + Button -->
        <div class="flex items-center space-x-4">
          <h1 class="text-2xl font-semibold">Last.fm and stuff</h1>
          <UInput
            v-model="username"
            placeholder="type your username"
            class="w-64"
            @keyup.enter="submitUsername"
          />
          <UButton color="primary" @click="submitUsername">
            Go
          </UButton>
        </div>
      </header>
  </UContainer>

</template>

<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits(['submit'])

const username = ref('')

function submitUsername() {
  if (!username.value.trim()) return;
  emit('submit', username.value)
}

</script>
