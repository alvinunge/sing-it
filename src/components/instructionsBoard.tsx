'use client'
import React from 'react'

interface InstructionsBoardProps {
    className?: string
    title?: string
}

const InstructionsBoard: React.FC<InstructionsBoardProps> = ({
    className = '',
    title = "How to Play",
}) => {
    const instructions = [
        "Divide into two teams. Each box contains one word forming a sentence from a real song. Your goal is to guess the song and earn points along the way.",
        "One team goes first and chooses a gray box with a number on it.",
        "If a team chooses a blue box, they have 30 seconds to sing a song containing the word in the box. If the timer runs out, it resets and both teams now have 30 seconds to complete the task.",
        "Successfully singing a song earns the team 1 point and the right to choose the next box. If no one completes it, no points are awarded, and the turn passes to the other team.",
        "If a team opens a red box, no singing is allowed, and the turn immediately passes to the other team.",
        "At any time, a team can guess the song, even if it’s not their turn. Simply raise your hand and sing if you think you know it. A correct guess earns 3 points, plus 1 point for each unopened box. A wrong guess gives 1 point to the opposing team, and the game continues from the same state.",
        "Once the main song is guessed or all boxes are opened, move on to the next round."
      ];
      
    return (
        <div className={`relative w-full max-w-4xl mx-auto p-6 sm:p-8 bg-gradient-to-b from-red-400 to-blue-300 rounded-2xl shadow-lg border-10 border-black ${className}`}>
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">{title}</h2>
            <ul className="list-disc list-inside text-lg font-bold sm:text-xl space-y-2">
                {instructions.map((line, idx) => (
                    <li key={idx}>{line}</li>
                ))}
            </ul>
        </div>
    )
}

export default InstructionsBoard