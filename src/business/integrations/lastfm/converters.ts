import type {Track} from "@/types/types";
import {JSONPath} from "jsonpath-plus";

const paths: Record<keyof Track, string> = {
    mbid: '$.mbid',
    artist: '$.artist.#text',
    imageUrl: '$.image[3].#text',
    album: '$.album.#text',
    name: '$.name',
    url: '$.url',
    date: '$.date.#text'
}

export function fromTrackNode(json: any): Track {
    let kv = [];
    for(let [key, jpath] of Object.entries(paths)) {
        const value = JSONPath({path: jpath, json: json})?.[0] ?? null;
        kv.push([key, value]);
    }
    return Object.fromEntries(kv) as Track;
}
