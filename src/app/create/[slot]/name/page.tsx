'use client'

import React from 'react';
import Form from "@/components/form";
import Button from "@/components/button";
import { Game, Round } from "@/types/game";
import { useRouter, useParams } from "next/navigation";

export default function Name() {

    const [gameName, setGameName] = React.useState("");
    
    const router = useRouter();
    const params = useParams();
    const slot = params?.slot as string;

    const handleSave = () => {

       if (!gameName) return;

       const storedGames: Game[] = JSON.parse(localStorage.getItem("games") || "[]");

       const newGame: Game = {
            id: crypto.randomUUID(),
            name: gameName,
            createdAt: new Date().toISOString(),
            slot: slot,
            rounds: [],
       };

       localStorage.setItem("games", JSON.stringify([...storedGames, newGame]));
       router.push(`/create/`);
    }

    
    return(
            <div className="flex flex-col gap-3 justify-center min-h-screen items-center">
                <Form placeholder="Name your game" value={gameName} onChange={(e) => setGameName(e.target.value)}/>
                <Button onClick={handleSave}> Save </Button>
            </div>
    );
}


