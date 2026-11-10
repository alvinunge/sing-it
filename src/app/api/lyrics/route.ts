import { NextRequest, NextResponse } from 'next/server'

const MAX_PARAM_LENGTH = 200

interface LrclibResult {
    instrumental: boolean
    plainLyrics: string | null
}

// Boxes show one word each, so drop punctuation like "?", "," and "(...)" from lyric lines.
function cleanLine(line: string): string {
    return line
        .replace(/[^\p{L}\p{N}'’\- ]/gu, '')
        .replace(/\s+/g, ' ')
        .trim()
}

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams
    const track = params.get('track')?.trim() ?? ''
    const artist = params.get('artist')?.trim() ?? ''
    if (!track || !artist || track.length > MAX_PARAM_LENGTH || artist.length > MAX_PARAM_LENGTH) {
        return NextResponse.json({ error: 'Track and artist are required' }, { status: 400 })
    }

    try {
        const url = `https://lrclib.net/api/search?track_name=${encodeURIComponent(track)}&artist_name=${encodeURIComponent(artist)}`
        const res = await fetch(url, {
            // LRCLIB asks clients to identify themselves.
            headers: { 'User-Agent': 'sing-it party game' },
            next: { revalidate: 60 * 60 * 24 }, // lyrics rarely change; cache for a day
        })
        if (!res.ok) {
            throw new Error(`LRCLIB search failed with status ${res.status}`)
        }

        const results: LrclibResult[] = await res.json()
        const match = results.find((r) => !r.instrumental && r.plainLyrics)
        if (!match?.plainLyrics) {
            return NextResponse.json({ error: 'No lyrics found for this song' }, { status: 404 })
        }

        // Keep repeated lines: the host can pick words across line breaks, so order must match the song.
        const lines = match.plainLyrics.split('\n').map(cleanLine).filter(Boolean)
        return NextResponse.json({ lines })
    } catch (err) {
        console.error('[lyrics]', err)
        return NextResponse.json({ error: 'Lyrics are unavailable right now' }, { status: 502 })
    }
}
