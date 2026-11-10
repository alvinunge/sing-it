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
  const [error, setError] = useState<string | null>(null)
  const [searching, setSearching] = useState(false)

  const searchSpotify = async () => {
    setSearching(true)
    setError(null)
    try {
      const res = await fetch(`/api/spotify-search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Search failed')
      setResults(data.tracks)
    } catch (err) {
      setResults([])
      setError(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setSearching(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-b from-blue-300 to-pink-300 rounded-xl shadow-md p-4 space-y-4">
      
      <div className="flex gap-2">
        <input
          maxLength={50}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Choose a song..."
          className="flex-1 border rounded-md px-3 py-2 text-sm text-black font-bold focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <Button
          disabled={!query.trim() || searching}
          onClick={searchSpotify}
          className="px-4 py-2 text-sm"
        >
          {searching ? 'Searching...' : 'Search'}
        </Button>
      </div>

      {error && <p className="text-sm font-bold text-red-700">{error}</p>}

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