import { createRouter, createWebHistory } from 'vue-router'
import PlaygroundView from "@/components/PlaygroundView.vue";
import CallbackView from "@/components/CallbackView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', component: PlaygroundView },
    {path: '/spotify_auth', component: CallbackView },
  ],
})

export default router
