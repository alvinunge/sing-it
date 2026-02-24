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
    const games = storedGames?.sort((a, b) => Number(a.slot) - Number(b.slot));
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
      <div className="bg-pink-200 text-blue-400 hover:bg-blue-600 bg-pink-400 text-blue-200"></div>

      <div className="flex flex-1 justify-center items-center w-full">
        <div className="flex flex-col gap-6">
        {availableGames.find((g) => g.slot === '1') ?
        <Button className="text-center text-3xl" onClick={() => goToSlot(1, 1)}> {availableGames.find((g) => g.slot === '1').name} </Button> 
        : 
        <Button className="text-center text-3xl" disabled={true}> Slot 1 </Button>
        }
        {availableGames.find((g) => g.slot === '2') ?
        <Button className="text-center text-3xl" onClick={() => goToSlot(2, 1)}> {availableGames.find((g) => g.slot === '2').name} </Button> 
        : 
        <Button className="text-center text-3xl" disabled={true}> Slot 2 </Button>
        }
        {availableGames.find((g) => g.slot === '3') ?
        <Button className="text-center text-3xl" onClick={() => goToSlot(3, 1)}> {availableGames.find((g) => g.slot === '3').name} </Button> 
        : 
        <Button className="text-center text-3xl" disabled={true}> Slot 3 </Button>
        }
        {availableGames.find((g) => g.slot === '4') ?
        <Button className="text-center text-3xl" onClick={() => goToSlot(4, 1)}> {availableGames.find((g) => g.slot === '4').name} </Button> 
        : 
        <Button className="text-center text-3xl" disabled={true}> Slot 4 </Button>
        }
        {availableGames.find((g) => g.slot === '5') ?
        <Button className="text-center text-3xl" onClick={() => goToSlot(5, 1)}> {availableGames.find((g) => g.slot === '5').name} </Button> 
        : 
        <Button className="text-center text-3xl" disabled={true}> Slot 5 </Button>
        }
        <Button className="text-center text-3xl" onClick={() => goBack()}> Go Back </Button>
        </div>
      </div>
    </div>
    </>
  );
}
