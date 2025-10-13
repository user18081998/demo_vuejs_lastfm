import { JSONPath } from 'jsonpath-plus'
export class Track {
    constructor({
                    mbid = null,
                    artist = '',
                    imageUrl = '',
                    album = '',
                    name = '',
                    url = '',
                    date = ''
                } = {}) {
        Object.assign(this, { mbid, artist, imageUrl, album, name, url, date })
    }
}

const paths = new Object({
    mbid: "$.mbid",
    artist: "$.artist.#text",
    imageUrl: "$.image[0].#text",
    album: "$.album.#text",
    name: "$.name",
    url: "$.url",
    date: "$.date.#text"
})

export function mapJsonToTrack(json) {
    const values = Object.fromEntries(
        Object.entries(paths).map(([key, path]) => [key, JSONPath({ path, json })[0]])
    )
    return new Track(values)
}
