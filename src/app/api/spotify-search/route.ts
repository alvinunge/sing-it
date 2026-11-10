import { NextRequest, NextResponse } from 'next/server'
import { SpotifyTrack } from '@/types/spotifytrack'

const MAX_QUERY_LENGTH = 50
const RESULT_LIMIT = 5

// Cached for the lifetime of the server process; the token never leaves the server.
let cachedToken: { value: string; expiresAt: number } | null = null

async function getAccessToken(): Promise<string> {
    // Refresh a minute early so a token never expires mid-request.
    if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
        return cachedToken.value
    }

    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
    if (!clientId || !clientSecret) {
        throw new Error('SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET is not set')
    }

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
        cache: 'no-store',
    })
    if (!res.ok) {
        throw new Error(`Spotify token request failed with status ${res.status}`)
    }

    const data = await res.json()
    cachedToken = {
        value: data.access_token,
        expiresAt: Date.now() + data.expires_in * 1000,
    }
    return cachedToken.value
}

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get('q')?.trim() ?? ''
    if (!query || query.length > MAX_QUERY_LENGTH) {
        return NextResponse.json(
            { error: `Query must be 1-${MAX_QUERY_LENGTH} characters` },
            { status: 400 }
        )
    }

    try {
        const token = await getAccessToken()
        const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${RESULT_LIMIT}`
        const res = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
            cache: 'no-store',
        })

        if (res.status === 401) cachedToken = null // token revoked early; fetch a new one next time
        if (!res.ok) {
            throw new Error(`Spotify search failed with status ${res.status}`)
        }

        const data = await res.json()
        // Only send the fields the UI uses.
        const tracks: SpotifyTrack[] = (data.tracks?.items ?? []).map((t: SpotifyTrack) => ({
            id: t.id,
            name: t.name,
            preview_url: t.preview_url,
            album: { images: t.album.images.map((img) => ({ url: img.url })) },
            artists: t.artists.map((a) => ({ name: a.name })),
        }))

        return NextResponse.json({ tracks })
    } catch (err) {
        console.error('[spotify-search]', err)
        return NextResponse.json({ error: 'Song search is unavailable right now' }, { status: 502 })
    }
}
