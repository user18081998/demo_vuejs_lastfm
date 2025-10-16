import {JSONPath} from "jsonpath-plus";

export interface SpotifyUser {
    display_name: string,
    country: string,
    url: string,
    imagesUrl: string,
    id: string,
}

const userPaths: Record<keyof SpotifyUser, string> = {
  display_name: "$.display_name",
  country: "$.country",
  url: "$.external_urls.spotify",
  imagesUrl: "$.images[1].url",
  id: "$.id",
}

export async function spotifyUserMapper(json: any): Promise<SpotifyUser> {
  const kv = [];
  for(const [key, jpath] of Object.entries(userPaths)) {
    const value = JSONPath({path: jpath, json: json})?.[0] ?? null
    kv.push([key, value]);
  }
  return Object.fromEntries(kv) as SpotifyUser;
}

export interface SpotifyPlaylist {
  id: string;
  url: string;
  image: string;
  name: string;
  tracksUrl: string;
  tracksCount: number;
}

const playlistPaths: Record<keyof SpotifyPlaylist, string> = {
  id: "$.id",
  url: "$.external_urls.spotify",
  image: "$.images[0].url",
  name: "$.name",
  tracksUrl: "$.tracks.href",
  tracksCount: "$.tracks.total"
}

export function spotifyPlaylistMapper(json: any): SpotifyPlaylist {
  const kv = [];
  for(const [key, jpath] of Object.entries(playlistPaths)) {
    const value = JSONPath({path: jpath, json: json})?.[0] ?? null
    kv.push([key, value]);
  }
  return Object.fromEntries(kv) as SpotifyPlaylist;
}
