'use client'
import Image from "next/image";
import Button from "@/components/button"
import Form from '@/components/form'
import { useRouter, useParams } from "next/navigation"
import React from 'react';
import Text from "@/components/text"
import { Game, Round, Box } from "@/types/game";
import BoxStyle from "@/components/box"
import SpotifySearch from "@/components/spotifySearch";
import { SpotifyTrack } from "@/types/spotifytrack";


export default function Rounds() {
  
  const router = useRouter();
  const params = useParams();
  const round = Number(params.nr);
  const slot = (params.slot);
  const nextRound = round + 1;
  const prevRound = round - 1;
  const [currentRound, setCurrentRound] = React.useState<Round>();
  const [currentGame, setCurrentGame] = React.useState<Game>();
  const [rounds, setRounds] = React.useState<Round[]>([]);
  const [currentGameList, setCurrentGameList] = React.useState<Game[]>([]);

  React.useEffect(() => {
    const currentGameList: Game[] = JSON.parse(localStorage.getItem("games") || "[]");
    const currentGame = currentGameList.find(g => g.slot === slot);

    setCurrentRound(currentGame?.rounds?.find(r => r.nr === round));
    setCurrentGame(currentGame);
    setRounds(currentGame?.rounds || []);
    setCurrentGameList(currentGameList || []);
 }, [slot, round]);

  const [songLine, setSongLine] = React.useState("");
  const splitLine = songLine.split(" ").filter(Boolean);
  const [colors, setColors] = React.useState(() => splitLine.map(() => "bg-blue-300"));
  const [song, setSong] = React.useState<SpotifyTrack>();

  React.useEffect(() => {
    if (currentRound) {
      setSongLine(currentRound.line)
      setSong(currentRound.song)
      setColors(currentRound.boxes.map((b) => b.color))
    }
  }, [currentRound])

  const handleSave = () => {

    const boxes: Box[] = splitLine.map((word, index) => ({
       id: crypto.randomUUID(),
       createdAt: new Date().toISOString(),
       word: word,
       color: colors[index] || 'bg-blue-300',
       roundnr: round,
       hidden: true
  }));

    if (!currentRound) {
      const newRound: Round = {
        id: crypto.randomUUID(),
        nr: round,
        gameId: currentGame?.id,
        line: songLine,
        createdAt: new Date().toISOString(),
        boxes: boxes,
        song: song
      }

      const updatedGame = {
        ...currentGame,
        rounds: [...(rounds ?? []), newRound]
      }

      const updatedGames = currentGameList.map((g) => (
        g.id === currentGame?.id ? updatedGame : g
      ))

      localStorage.setItem("games", JSON.stringify(updatedGames))

   } else {

    const updatedRound = {
      ...currentRound,
      boxes: [...(boxes ?? [])],
      line: songLine,
      song: song
    }

    const updatedRounds = (rounds ?? []).map((r => (
      r.nr === round ? updatedRound : r
    )))

    const updatedGame = {
      ...currentGame,
      rounds: updatedRounds
    }

    const updatedGames = currentGameList.map((g) => (
      g.id === currentGame?.id ? updatedGame : g
    ))

    localStorage.setItem("games", JSON.stringify(updatedGames))
   }
  }

  const goToNextRound = (slot: string, nr: number) => {
    handleSave()
    router.push(`/create/${slot}/rounds/${nr}`)
  };

  const goToPrevRound = (slot: string, nr: number) => {
    handleSave()
    router.push(`/create/${slot}/rounds/${nr}`)
  };

  const finish = () => {
    handleSave()
    router.push(`/create`)
  };


  const handleColorRed = (index: number) =>{
    const updated = [...colors];
    updated[index] = "bg-red-400";
    setColors(updated)
  };

  const handleColorBlue = (index: number) =>{
    const updated = [...colors];
    updated[index] = "bg-blue-300";
    setColors(updated)
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center p-8 sm:p-0 gap-5">
        <Image
          src="/singit.png"
          alt="SingIt Logo"
          width={180}
          height={38}
          priority
        />
        <Text>
            Round {round}
        </Text>
        <SpotifySearch currentTrack={song} onSelectTrack={(track) => {
          setSong(track)
        }}/>

        <Form placeholder="Write a line from a song" value={songLine} onChange={(value) => setSongLine(value)} maxLength={51}/>

        <div className={"flex w-full items-center justify-center gap-5"}>
        {splitLine.map((word, index) => (
         // <>
          <div key={index} className={`flex flex-col`}>
            <BoxStyle word={word.toLocaleUpperCase()} color={colors[index] ? colors[index] : "bg-blue-300"}/>
              <div className={`flex flex-row items-center justify-center gap-5`}>
                <button className={`w-4 h-4 bg-blue-300 mt-2`} onClick={() => handleColorBlue(index)}>  </button>
                <button className={`w-4 h-4 bg-red-400 mt-2`} onClick={() => handleColorRed(index)}>  </button>
                </div>
            </div>
          //</>         
        ))}
        </div>
        
        </div>

        <>
        <div className="flex flex-row items-center mt-60 w-full">
  <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-5">
    <Button onClick={() => goToPrevRound(slot as string, prevRound)} disabled={round === 1}>
      &larr;
    </Button>
    <Button onClick={() => goToNextRound(slot as string, nextRound)} disabled={round === 10 || splitLine.length < 1}>
      &rarr;
    </Button>
  </div>

  <div className="ml-auto pr-10">
    <Button onClick={() => finish()}>Finish</Button>
  </div>
</div>
        </>
    </>
  );
}
