//  JSON: /2.0/?method=user.getrecenttracks&user=rj&api_key=YOUR_API_KEY&format=json
import {fromTrackNode} from "@/business/integrations/lastfm/converters";
import type {Track} from "@/types/types";

const rootUrl = import.meta.env.VITE_API_ROOT;
const apiKey = import.meta.env.VITE_API_KEY;

const limit=10;

export async function fetchLastTracks(): Promise<Track[]>{
  console.log(`fetching with API key: ${apiKey} and baseUrl: ${rootUrl}`);
  const url = new URL(rootUrl);
  url.searchParams.set("method", "user.getrecenttracks");
  url.searchParams.set("user", "proxyamg");
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", `${limit}`);
  console.log(`fetching from url ${url.toString()}`);
  return fetch(url)
      .then(res => res.json())
      .then(data => {console.log(`received data as json hopefully ${data}`); return data; })
      .then(data => data.recenttracks.track)
      .then(tracks => tracks.map((json: any) => fromTrackNode(json)));
}
