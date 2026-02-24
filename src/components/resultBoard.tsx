'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'

interface ResultBoardProps {
    team: string
    score: number
    result: 'WINNER' | 'RUNNER-UP' | 'TIED'
}

const COLOR_MAP = {
    WINNER: 'bg-amber-400',
    'RUNNER-UP': 'bg-zinc-200',
    TIED: 'bg-pink-200'
}

const boardVariants: Variants = {
    hidden: { y: 1200, opacity: 0 }, 
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 55 } }
}

const ResultBoard: React.FC<ResultBoardProps> = ({ team, score, result }) => {
    return (
        <motion.div
            variants={boardVariants}
            className="relative flex flex-col items-center w-60 h-[10rem]"
        >
            <div className="absolute rounded bg-black w-60 h-32 top-0"></div>
            <div className="absolute rounded bg-black w-46 h-29 -mt-8 top-0"></div>

            <div className={`absolute rounded ${COLOR_MAP[result]} w-58 h-30 mt-1 top-0`}></div>
            <div className={`absolute flex rounded ${COLOR_MAP[result]} w-44 h-21 -mt-7 items-top justify-center top-0`}>
                <div className="text-xl text-black font-bold">{result}</div>
            </div>

            <div className="absolute rounded bg-black mt-1.5 w-55.5 h-29 top-0"></div>

            <div className="absolute flex flex-col rounded bg-blue-300 mt-2 w-54 h-28 items-center justify-center top-0">
                <div className="text-xl font-bold">{team}: {score}</div>
            </div>

            <div className="absolute top-32 w-5 bg-black z-10 h-300"></div>
            <div className={`absolute top-32 w-3.5 ${COLOR_MAP[result]} z-20 h-300`}></div>
        </motion.div>
    )
}

export default ResultBoard
