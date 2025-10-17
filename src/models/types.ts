interface Track {
    mbid?: string
    artist?: string
    imageUrl?: string
    album?: string
    name?: string
    url?: string
    date?: string
}

export type { Track };

export interface ImageItem {
  src: string
  href?: string
}
