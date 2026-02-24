export interface SpotifyTrack {
    id: string;
    name: string;
    preview_url: string | null;
    album: {
      images: { url: string }[];
    };
    artists: { name: string }[];
  }