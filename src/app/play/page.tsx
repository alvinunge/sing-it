'use client'
import Image from "next/image";
import Button from "@/components/button"
import { useRouter } from "next/navigation"
import { useState, useEffect } from 'react';
import {Game} from '@/types/game';
export default function Create() {
  const router = useRouter()
  const [availableGames, setAvailableGames] = useState<Game[]>([])

  const goToSlot = (slot: number, nr: number) => {
    router.push(`/play/${slot}/rounds/${nr}`)
  };

  const goBack = () => {
    router.push(`/`)
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedGames = JSON.parse(localStorage.getItem("games") || "[]");
    const games = storedGames?.sort((a: Game, b: Game) => Number(a.slot) - Number(b.slot));
    setAvailableGames(games)
  }, [])

  const slots = [1, 2, 3, 4, 5]

  return (
    <>
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-center p-8 sm:p-0">
        <Image
          src="/singit.png"
          alt="SingIt Logo"
          width={180}
          height={38}
          priority
        />
      </div>

      <div className="flex flex-1 justify-center items-center w-full">
        <div className="flex flex-col gap-6">
          {slots.map((slot) => {
            const game = availableGames.find((g: Game) => Number(g.slot) === slot);
            return (
              <div key={slot}>
              <Button className="text-center text-3xl w-full" disabled={(game?.rounds.length) ? false : true} onClick={() => goToSlot(slot, 1)}> {game ? game.name : `Slot ${slot}`} </Button> 
              </div>
            )
          })}

        <Button className="text-center text-3xl" onClick={() => goBack()}> Go Back </Button>
        </div>
      </div>
    </div>
    </>
  );
}
