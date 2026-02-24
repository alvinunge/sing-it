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
    console.log(storedGames)
    const games = storedGames.sort((a, b) => Number(a.slot) - Number(b.slot));
    setAvailableGames(games)

  }, [])
  
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
        {availableGames.find((g) => g.slot === '1') ?
        <Button className="text-center text-3xl" onClick={() => goToRoundCreation(1, 1)}> {availableGames.find((g) => g.slot === '1').name} </Button> 
        : 
        <Button className="text-center text-3xl" onClick={() => goToSlot(1)}> Slot 1 </Button>
        }
        {availableGames.find((g) => g.slot === '2') ?
        <Button className="text-center text-3xl" onClick={() => goToRoundCreation(2, 1)}> {availableGames.find((g) => g.slot === '2').name} </Button> 
        : 
        <Button className="text-center text-3xl" onClick={() => goToSlot(2)}> Slot 2 </Button>
        }
        {availableGames.find((g) => g.slot === '3') ?
        <Button className="text-center text-3xl" onClick={() => goToRoundCreation(3, 1)}> {availableGames.find((g) => g.slot === '3').name} </Button> 
        : 
        <Button className="text-center text-3xl" onClick={() => goToSlot(3)}> Slot 3 </Button>
        }
        {availableGames.find((g) => g.slot === '4') ?
        <Button className="text-center text-3xl" onClick={() => goToRoundCreation(4, 1)}> {availableGames.find((g) => g.slot === '4').name} </Button> 
        : 
        <Button className="text-center text-3xl" onClick={() => goToSlot(4)}> Slot 4 </Button>
        }
        {availableGames.find((g) => g.slot === '5') ?
        <Button className="text-center text-3xl" onClick={() => goToRoundCreation(5, 1)}> {availableGames.find((g) => g.slot === '5').name} </Button> 
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
