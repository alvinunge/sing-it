'use client'
import { useState } from 'react'
import Button  from '@/components/button'

interface SpotifyProps {
    onSelectTrack: (track: any) => void
}

const SpotifySearch: React.FC<SpotifyProps> = ({onSelectTrack}) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])

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
    <div className="flex flex-col mt-4 items-center justify-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a song..."
        className="border p-2 rounded w-full"
      />
      <Button onClick={searchSpotify} className="mt-2 px-4 py-2 items-center">
        Search
      </Button>

      <div className="mt-4 flex flex-col bg-pink-400 gap-2">
        {results.map((track) => (
          <div key={track.id} className="flex items-center gap-4">
            {track.album.images[0] && <img src={track.album.images[0].url} alt={track.name} width={50} height={50} />}
            <div>
              <div>{track.name}</div>
              <div className="text-sm text-gray-500">{track.artists.map((a: any) => a.name).join(', ')}</div>
            </div>
            <Button
              onClick={() => onSelectTrack(track)}
              className="ml-auto text-white px-2 py-1 rounded"
            >
              Select
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SpotifySearch