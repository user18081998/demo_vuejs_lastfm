import {
  type SpotifyUser,
  type SpotifyPlaylist,
  spotifyPlaylistMapper
} from "@/models/SpotifyModels.ts";
import {spotifyUserMapper} from "@/models/SpotifyModels.ts";
const REDIRECT_URL = "https://127.0.0.1:5173/spotify_auth";
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const scopes = [
  'user-read-private',
  'playlist-read-private',
  'user-library-read',
  'playlist-read-private'
]

export async function urlForPermissions() :
  Promise<{
    url: string,
    verifier: string,
  }> {
  const generateCodeVerifier = (length: number) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  const generateCodeChallenge = async (codeVerifier: string) => {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", REDIRECT_URL);
  params.append("scope",  scopes.join(' '));
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);
  const url = `https://accounts.spotify.com/authorize?${params.toString()}`;
  return {
    url: url,
    verifier: verifier
  }
}

export async function getAccessToken(code: string, verifier: string): Promise<string> {
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", REDIRECT_URL);
  params.append("code_verifier", verifier);
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params
  });
  const { access_token } = await result.json();
  return access_token;
}

export async function spotifyFetchPlaylists(token: string) : Promise<SpotifyPlaylist[]> {
  return fetch("https://api.spotify.com/v1/me/playlists?limit=16&offset=0", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => res.json())
    .then(res => res.items)
    .then(items => items.map((item : any)=>spotifyPlaylistMapper(item)))
}

export async function spotifyFetchProfile(token: string) : Promise<SpotifyUser> {
  return fetch("https://api.spotify.com/v1/me", {
                  method: "GET", headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => spotifyUserMapper(data));
}
