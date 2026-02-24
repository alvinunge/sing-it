'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'

interface ResultBoardProps {
    team: string,
    score: number,
    result: 'WINNER' | 'RUNNER-UP' | 'TIED'
}

const COLOR_MAP = {
    'WINNER': 'bg-amber-400',
    'RUNNER-UP': 'bg-zinc-200',
    'TIED': 'bg-pink-200'
}

const config: Variants = {
    hidden: {
        opacity: 0,
        y: 200,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            //duration: 2.6,
            type: 'spring',
            stiffness: 80,
            damping: 55,
        },
    },
}

const ResultBoard: React.FC<ResultBoardProps> = ({team, score, result}) => {
    return(
        <motion.div variants={config} className="relative flex flex-col items-center">
            <div className="absolute rounded bg-black w-60 h-32 "></div>
            <div className="absolute rounded bg-black w-46 h-29 -mt-8"></div>
            <div className={`absolute rounded ${COLOR_MAP[result]} mt-1 w-58 h-30`}></div>
            <div className={`absolute flex rounded ${COLOR_MAP[result]} w-44 h-21 -mt-7 items-top justify-center`}>           
            <div className="text-xl text-black font-bold"> {result} </div>
            </div>
            <div className="absolute rounded bg-black mt-1.5 w-55.5 h-29"></div>
            <div className="absolute flex flex-col rounded bg-blue-300 mt-2 w-54 h-28 items-center justify-center">
            <div className="text-xl font-bold"> {team}: {score} </div>
            </div>
            <div className="absolute top-32 w-5 bg-black -mb-2 z-1" style={{ height: `calc(100vh - 29.25rem)` }}></div>
            <div className={`absolute top-32 w-3.5 ${COLOR_MAP[result]} -mb-2 z-2`} style={{ height: `calc(100vh - 29.25rem)` }} ></div>
        </motion.div>
    )
}

export default ResultBoard