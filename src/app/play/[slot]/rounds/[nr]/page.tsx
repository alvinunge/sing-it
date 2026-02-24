'use client'

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Button from "@/components/button";
import { useRouter, useParams } from "next/navigation";
//import Text from "@/components/text";
import { Game, Round, Box } from "@/types/game";
import { SpotifyTrack } from '@/types/spotifytrack';
import BoxStyle from "@/components/box";
import ScoreBoard from "@/components/scoreBoard";
import TimerBoard from "@/components/timerBoard";
import SpotifyPlayer from '@/components/spotifyPlayer';

export default function Play() {
  
  interface PlayBox extends Box {
    revealed?: boolean;
  }
  const router = useRouter();
  const params = useParams();
  const slot = params.slot;
  const nr = Number(params.nr);
  const nextRound = nr + 1;

  const [startTimer, setStartTimer] = useState(0);
  const [color, setColor] = useState("")
  const [boxes, setBoxes] = useState<PlayBox[]>([]);
  const [loading, setLoading] = useState(true);
  const [finalRound, setFinalRound] = useState<Box[]>([]);
  const [song, setSong] = React.useState<SpotifyTrack>();
  const [revealed, setRevealed] = useState(false)  

  useEffect(() => {
    if (typeof window === 'undefined') return; // safeguard against SSR

    const storedGames = localStorage.getItem("games");
    if (!storedGames) return;

    const currentGameList = JSON.parse(storedGames);
    const currentGame = currentGameList.find((g: Game) => g.slot === slot);
    const rounds = currentGame?.rounds;
    const currentRound = rounds?.find((r: Round) => r.nr === nr);
    const finalRound = rounds.find((r: Round) => r.nr === nextRound);
    setFinalRound({...finalRound?.boxes});
    setSong(currentRound.song)

    const initBoxes = (currentRound.boxes || []).map((b) => ({
        ...b,
        revealed: false
    }))

    setBoxes(initBoxes);
  }, [slot, nr]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer)
  }, [])

  const unHide = (index: number) => {
    setBoxes(prev => prev.map((b, i) => i === index ? {...b, revealed: true} : b))
    const chosen = boxes[index];
    if (chosen?.color === 'bg-blue-300') {
      setStartTimer(prev => prev + 1);
      setColor(chosen?.color)
    }
    else {
      setColor(chosen?.color)
    }
  }

  const goNextRound = (slot: string, nr: number) => {
    router.push(`/play/${slot}/rounds/${nr}`)
  }

  const goScore = (slot: string) => {
    router.push(`/play/${slot}/score`)
  }

  const reveal = () => {
    setRevealed(true)
  }

    return(
        <>

        <div
        className={`flex flex-col items-center justify-center p-8 sm:p-0 gap-5`}
      >
        <Image
          src="/singit.png"
          alt="SingIt Logo"
          width={180}
          height={38}
          priority
          className={`transition-transform transition-opacity duration-500 ${
            loading ? "animate-pulse" : ""
          }`}
        />
      </div>
          
    
        
        <div
        className={`flex flex-col items-center justify-center p-8 sm:p-0 gap-5 transition-opacity duration-200 ${
          loading ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
        }`}
        >
       
      
        <div className="relative z-50 flex items-center justify-center gap-5">
          {boxes.map((box, index) => (
            <div key={index} className="flex flex-col">
              {box.revealed ? (
                <BoxStyle word={box.word.toLocaleUpperCase()} color={box.color} />
              ) : (
                <BoxStyle
                  word={(index + 1).toString()}
                  color="bg-gray-400"
                  onClick={() => unHide(index)}
                />
              )}
            </div>
            ))}
        </div>
        

        {boxes.length > 0 && boxes.every(b => b.revealed) && song || revealed ? (
          <SpotifyPlayer song={song as SpotifyTrack}/>
        ):(
          <div className="w-[300px] h-[80px]" />
        )}
        </div>

        <TimerBoard start={startTimer} color={color}/>
        <ScoreBoard slot={slot as string}/>

        <div className={`flex items-end justify-center gap-4 h-80`}>
        <Button onClick={() => reveal()}> Reveal Song </Button>
        {Object.keys((finalRound)).length > 1 ?
            <Button onClick={() => goNextRound(slot as string, nextRound)}> Next Round </Button>
            :
            <Button onClick={() => goScore(slot as string)}> Finish </Button>
        }
        </div>
        </>

    )

}