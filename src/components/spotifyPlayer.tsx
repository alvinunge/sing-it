'use client'

import React from 'react'
import { SpotifyTrack } from '@/types/spotifytrack'

interface SpotifyPlayerProps{
    song: SpotifyTrack
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({song}) => {
    return (

        <iframe
            style={{ borderRadius: 12 }}
            src={`https://open.spotify.com/embed/track/${song.id}`}
            width="300"
            height="80"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        )
}

export default SpotifyPlayer