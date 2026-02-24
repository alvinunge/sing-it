'use client'
import {useState, useEffect} from 'react'
import { useRouter, useParams } from 'next/navigation'
import Text from '@/components/text'
import Button from '@/components/button'
import ResultBoard from '@/components/resultBoard'
import { motion, Variants } from 'framer-motion'

export default function Score() {
    const router = useRouter();
    const params = useParams();
    const slot = params.slot;
    const [team1, setTeam1] = useState<number>(0);
    const [team2, setTeam2] = useState<number>(0);

    const goBack = () => {
        localStorage.removeItem(`score-${slot}`)
        router.push(`/play`)
    }
  
    useEffect(() => {
      const score = localStorage.getItem(`score-${slot}`);
      const parsed = score ? JSON.parse(score) : {};
      setTeam1(Number(parsed.team1))
      setTeam2(Number(parsed.team2))
    }, [slot])

    const config: Variants = {
      hidden: {},
      show: {
        transition: {
          staggerChildren: 1.0,
        },
      },
    }

return (
    <>
      <div className={'flex flex-col items-center mt-20 justify-center'}>
        <Text> FINAL RESULTS </Text>
      </div>
      {team1 !== team2 ? (
        <>
        <motion.div initial='hidden' animate='show' variants={config}>
          <div className="relative -ml-200 mt-50">
              {team1 > team2 ? (
                <ResultBoard team={'Team 1'} score={team1} result={'WINNER'}/>
              ) : (
                <ResultBoard team={'Team 2'} score={team2} result={'WINNER'}/>
              )}   
          </div>
  
          <div className="relative -mr-200 mt-50">
              {team1 > team2 ? (
                <ResultBoard team={'Team 2'} score={team2} result={'RUNNER-UP'}/>
              ) : (
                <ResultBoard team={'Team 1'} score={team1} result={'RUNNER-UP'}/>
              )}
          </div>
          </motion.div>
        </>
      ) : (
        <>
        <motion.div initial='hidden' animate='show'>
          <div className="relative -ml-200 mt-50">
            <ResultBoard team={'Team 1'} score={team1} result={'TIED'}/>
          </div>
          
          <div className="relative -mr-200 mt-50">
            <ResultBoard team={'Team 2'} score={team2} result={'TIED'}/>
          </div>
          </motion.div>
        </>
      )}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">  
            <Button onClick={() => goBack()}> Go back </Button>
          </div> 
    </>
  ); 
}