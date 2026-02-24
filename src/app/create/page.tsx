'use client'
import Image from "next/image";
import Button from "@/components/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from 'react';
import { Game } from '@/types/game'
import TrashButton from "@/components/trashButton";

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

  const handleDelete = (slot: number) => {
    const game = availableGames.find(g => Number(g.slot) === slot);
    if (!game) return;

    const confirmed = window.confirm(`Are you sure you want to delete "${game.name}"?`);
    if (!confirmed) return;

    const updatedGames = availableGames.filter(
      (g) => Number(g.slot) !== slot
    );
    setAvailableGames(updatedGames);
    localStorage.setItem("games", JSON.stringify(updatedGames));
  };

  const slots = [1, 2, 3, 4, 5]
  
  return (
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
            const game = availableGames.find(g => Number(g.slot) === slot);

            return (
              <div key={slot} className="relative w-full">
                  <>
                    <Button
                      className="text-center text-3xl w-full"
                      onClick={() => game ? goToRoundCreation(slot, 1) : goToSlot(slot)}
                    >
                      {game ? game.name : `Slot ${slot}`}
                    </Button>
                    <TrashButton
                      disabled={!game}
                      onClick={() => handleDelete(slot)}
                      className="absolute top-1 right-1 w-8 h-8 p-"
                    >
                    </TrashButton>
                  </>
              </div>
            );
          })}

          <Button
            className="text-center text-3xl w-full"
            onClick={goBack}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
