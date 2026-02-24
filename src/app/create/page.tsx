'use client'
import Image from "next/image";
import Button from "@/components/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from 'react';
import { Game } from '@/types/game'
export default function Create() {
  const router = useRouter()
  const [availableGames, setAvailableGames] = useState<Game[]>([])

  const goToSlot = (slot: number) => {
    router.push(`/create/${slot}/name`)
  };

  const goBack = () => {
    router.push(`/`)
  }

  const goToRoundCreation = (slot: number, nr: number) => {
    router.push(`/create/${slot}/rounds/${nr}`)
  }

  useEffect(() => {
    const storedGames = JSON.parse(localStorage.getItem("games") || "[]");
    const games = storedGames.sort((a: Game, b: Game) => Number(a.slot) - Number(b.slot));
    setAvailableGames(games)

  }, [])

  const slot1Game = availableGames.find(g => g.slot === '1');
  const slot2Game = availableGames.find(g => g.slot === '2');
  const slot3Game = availableGames.find(g => g.slot === '3');
  const slot4Game = availableGames.find(g => g.slot === '4');
  const slot5Game = availableGames.find(g => g.slot === '5');
  
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
        {slot1Game ?
        <Button className="text-center text-3xl" onClick={() => goToRoundCreation(1, 1)}> {slot1Game.name} </Button> 
        : 
        <Button className="text-center text-3xl" onClick={() => goToSlot(1)}> Slot 1 </Button>
        }
        {slot2Game ?
        <Button className="text-center text-3xl" onClick={() => goToRoundCreation(2, 1)}> {slot2Game.name} </Button> 
        : 
        <Button className="text-center text-3xl" onClick={() => goToSlot(2)}> Slot 2 </Button>
        }
        {slot3Game ?
        <Button className="text-center text-3xl" onClick={() => goToRoundCreation(3, 1)}> {slot3Game.name} </Button> 
        : 
        <Button className="text-center text-3xl" onClick={() => goToSlot(3)}> Slot 3 </Button>
        }
        {slot4Game ?
        <Button className="text-center text-3xl" onClick={() => goToRoundCreation(4, 1)}> {slot4Game.name} </Button> 
        : 
        <Button className="text-center text-3xl" onClick={() => goToSlot(4)}> Slot 4 </Button>
        }
        {slot5Game ?
        <Button className="text-center text-3xl" onClick={() => goToRoundCreation(5, 1)}> {slot5Game.name} </Button> 
        : 
        <Button className="text-center text-3xl" onClick={() => goToSlot(5)}> Slot 5 </Button>
        }
        <Button className="text-center text-3xl" onClick={() => goBack()}> Go Back </Button>
        </div>
      </div>
    </div>
    </>
  );
}
