'use client'
import { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import { SpotifyTrack } from '@/types/spotifytrack'

interface LyricsPickerProps {
    track: SpotifyTrack
    onPick: (line: string) => void
    maxLength: number
    maxWords: number
}

interface Selection {
    start: number
    end: number | null // null while the host is choosing the last word
}

const LyricsPicker: React.FC<LyricsPickerProps> = ({ track, onPick, maxLength, maxWords }) => {
    const [lines, setLines] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [selection, setSelection] = useState<Selection | null>(null)
    const [hovered, setHovered] = useState<number | null>(null)

    useEffect(() => {
        const controller = new AbortController()
        const params = new URLSearchParams({
            track: track.name,
            artist: track.artists[0]?.name ?? '',
        })

        setLoading(true)
        setError(null)
        setLines([])
        setSelection(null)

        fetch(`/api/lyrics?${params}`, { signal: controller.signal })
            .then(async (res) => {
                const data = await res.json()
                if (!res.ok) throw new Error(data.error ?? 'Could not load lyrics')
                setLines(data.lines)
            })
            .catch((err) => {
                if (controller.signal.aborted) return
                setError(err instanceof Error ? err.message : 'Could not load lyrics')
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false)
            })

        // Ignore the response if the host picks another song before this one loads.
        return () => controller.abort()
    }, [track])

    // All words in song order; a selection may run across line breaks.
    const words = useMemo(() => lines.flatMap((line) => line.split(' ')), [lines])

    // Index of each line's first word, so lines can be rendered with their words' global indices.
    const lineStarts = useMemo(() => {
        let index = 0
        return lines.map((line) => {
            const start = index
            index += line.split(' ').length
            return start
        })
    }, [lines])

    const choosingEnd = selection !== null && selection.end === null

    // Furthest word that can end a line starting at `start` without breaking the word or character limit.
    const lastPossibleEnd = (start: number) => {
        let end = start
        let length = words[start].length
        while (end + 1 < words.length && end + 1 - start < maxWords) {
            const nextLength = length + 1 + words[end + 1].length
            if (nextLength > maxLength) break
            length = nextLength
            end++
        }
        return end
    }
    const maxEnd = choosingEnd ? lastPossibleEnd(selection.start) : -1

    const isEndOption = (i: number) => choosingEnd && i > selection.start && i <= maxEnd

    // Range to highlight: the finished selection, or a preview while choosing the end.
    const highlightEnd = selection
        ? selection.end ?? (hovered !== null && isEndOption(hovered) ? hovered : selection.start)
        : -1
    const isHighlighted = (i: number) => selection !== null && i >= selection.start && i <= highlightEnd

    const handleClick = (i: number) => {
        if (isEndOption(i)) {
            setSelection({ start: selection!.start, end: i })
            onPick(words.slice(selection!.start, i + 1).join(' '))
        } else if (choosingEnd && i === selection.start) {
            setSelection(null) // clicking the first word again cancels
        } else {
            setSelection({ start: i, end: null })
        }
    }

    const hint = choosingEnd
        ? 'Now click the last word of your line (click the first word again to cancel)'
        : 'Click the first word of your line'

    return (
        <div className="w-full max-w-md bg-gradient-to-b from-blue-300 to-pink-300 rounded-xl shadow-md p-4 space-y-2">
            <p className="text-sm font-bold text-black">Lyrics for &quot;{track.name}&quot;</p>
            {lines.length > 0 && <p className="text-xs text-black">{hint}</p>}

            <div className="h-[18rem] overflow-y-auto space-y-1" onMouseLeave={() => setHovered(null)}>
                {loading && <p className="text-sm text-black">Loading lyrics...</p>}
                {error && <p className="text-sm font-bold text-red-700">{error}</p>}

                {lines.map((line, lineIndex) => (
                    <p key={lineIndex} className="text-sm text-black font-medium leading-relaxed">
                        {line.split(' ').map((word, wordIndex) => {
                            const i = lineStarts[lineIndex] + wordIndex
                            return (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => handleClick(i)}
                                    onMouseEnter={() => setHovered(i)}
                                    className={clsx(
                                        'px-0.5 mr-0.5 rounded cursor-pointer transition',
                                        isHighlighted(i)
                                            ? 'bg-pink-500 text-white'
                                            : isEndOption(i)
                                              ? 'bg-white/60 hover:bg-white'
                                              : 'hover:bg-white/50'
                                    )}
                                >
                                    {word}
                                </button>
                            )
                        })}
                    </p>
                ))}
            </div>
        </div>
    )
}

export default LyricsPicker
