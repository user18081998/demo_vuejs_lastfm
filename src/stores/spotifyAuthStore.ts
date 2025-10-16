import { defineStore } from 'pinia'
import {computed, reactive, ref} from 'vue'
import {
  getAccessToken, spotifyFetchPlaylists, spotifyFetchProfile,
  urlForPermissions
} from "@/business/integrations/spotify/ApiSpotifyHelper.ts"
import type {SpotifyUser, SpotifyPlaylist } from "@/models/SpotifyModels.ts";

export const useSpotifyTokenStore =
  defineStore("spotify", () =>{
    const accessToken = ref<string|null>(null);

    const verifier = ref<string|null>(null);
    const urlToAuth = ref<string | null>(null);

    const user = ref<SpotifyUser|null>(null);
    const playlists = reactive<SpotifyPlaylist[]>([]);

    async function makeUrl() {
      console.log("[spotify-store] making url")
      const redirection = await urlForPermissions();
      urlToAuth.value = redirection.url;
      verifier.value = redirection.verifier;
    }

    makeUrl();

    async function exchangeCodeForToken(code: string) {
      const token = await getAccessToken(code,verifier.value??"");
      accessToken.value=token;
    }

    async function fetchData(){
      fetchUserProfile();
      fetchUserPlaylists();
    }

    async function fetchUserProfile(){
      const fetchedUser = await spotifyFetchProfile(accessToken.value??"");
      user.value=fetchedUser;
      console.log("[spotify] User profile found..", fetchedUser);
    }

    async function fetchUserPlaylists() {
      const fetchedPlaylists = await spotifyFetchPlaylists(accessToken.value??"");
      fetchedPlaylists.sort((a,b) => a.id.localeCompare(b.id));
      playlists.splice(0, playlists.length);
      playlists.push(...fetchedPlaylists);
      // limit to 10 playlists
      console.log("[spotify] Playlists count ", playlists.length);

    }

    const isConnected = computed(() => accessToken.value? true : false);

    function signout(){
      accessToken.value=null;
      user.value=null;
      urlToAuth.value=null;
      verifier.value=null;
      makeUrl();
    }

    return {
      // properties
      accessToken, user, verifier, urlToAuth, playlists,
      // private
      makeUrl, fetchUserProfile, fetchUserPlaylists,
      // public
      exchangeCodeForToken, fetchData, signout,
      // computed
      isConnected
    } ;

},{
    // need to persist pinia between landing->spotify auth -> callback
    persist: true
  }
  )

