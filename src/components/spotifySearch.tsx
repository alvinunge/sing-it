'use client'
import { useState } from 'react'
import Button  from '@/components/button'
import { SpotifyTrack } from '@/types/spotifytrack'
import Image from 'next/image'

interface SpotifyProps {
    onSelectTrack: (track: SpotifyTrack | undefined) => void,
    currentTrack: SpotifyTrack | undefined,
}

const SpotifySearch: React.FC<SpotifyProps> = ({onSelectTrack, currentTrack}) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SpotifyTrack[]>([])

  const searchSpotify = async () => {
    const tokenRes = await fetch('/api/spotify-token')
    const tokenData = await tokenRes.json()
    const token = tokenData.access_token

    const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json()
    setResults(data.tracks.items)
  }

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-b from-blue-300 to-pink-300 rounded-xl shadow-md p-4 space-y-4">
      
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Choose a song..."
          className="flex-1 border rounded-md px-3 py-2 text-sm text-black font-bold focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <Button
          disabled={!query}
          onClick={searchSpotify}
          className="px-4 py-2 text-sm"
        >
          Search
        </Button>
      </div>
  
      <div className="space-y-2 max-h-72 min-h-[18rem] overflow-y-auto">
        {results.map((track) => (
          <div
            key={track.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {track.album.images[0] && (
              <Image
                src={track.album.images[0].url}
                alt={track.name}
                width={40}
                height={40}
                className="rounded"
              />
            )}
  
            <div className="flex-1 min-w-0">
              <div className="text-sm text-black font-medium truncate">
                {track.name}
              </div>
              <div className="text-xs text-black truncate">
                {track.artists.map((a) => a.name).join(', ')}
              </div>
            </div>
  
            <Button
              onClick={() =>
                onSelectTrack(
                  track.id === currentTrack?.id ? undefined : track
                )
              }
              className="text-xs"
            >
              {track.id === currentTrack?.id ? 'Deselect' : 'Select'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
  
}

export default SpotifySearch