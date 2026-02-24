'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Text from '@/components/text'
import Button from '@/components/button'
import ResultBoard from '@/components/resultBoard'
import { motion } from 'framer-motion'

export default function Score() {
    const router = useRouter()
    const params = useParams()
    const slot = params.slot
    const [team1, setTeam1] = useState<number>(0)
    const [team2, setTeam2] = useState<number>(0)

    const goBack = () => {
        localStorage.removeItem(`score-${slot}`)
        router.push(`/play`)
    }

    useEffect(() => {
        const score = localStorage.getItem(`score-${slot}`)
        const parsed = score ? JSON.parse(score) : {}
        setTeam1(Number(parsed.team1))
        setTeam2(Number(parsed.team2))
    }, [slot])

    // stagger config
    const containerVariants = {
        hidden: {},
        show: {
            transition: { staggerChildren: 0.5 }
        }
    }

    return (
        <div className="w-screen h-screen overflow-hidden flex flex-col justify-between items-center px-4 py-6">
            <Text>FINAL RESULTS</Text>

            <motion.div
                className="flex justify-center gap-120 w-full flex-1 items-center"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {team1 !== team2 ? (
                    <>
                        <ResultBoard
                            team={team1 > team2 ? 'Team 1' : 'Team 2'}
                            score={Math.max(team1, team2)}
                            result="WINNER"
                        />
                        <ResultBoard
                            team={team1 > team2 ? 'Team 2' : 'Team 1'}
                            score={Math.min(team1, team2)}
                            result="RUNNER-UP"
                        />
                    </>
                ) : (
                    <>
                        <ResultBoard team="Team 1" score={team1} result="TIED" />
                        <ResultBoard team="Team 2" score={team2} result="TIED" />
                    </>
                )}
            </motion.div>

            <div className="mt-6">
                <Button onClick={goBack}>Go back</Button>
            </div>
        </div>
    )
}
