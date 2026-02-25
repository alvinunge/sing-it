'use client'
import React from 'react'
import Button from '@/components/button'
import { useRouter } from 'next/navigation'
import Image from "next/image";
import BoxStyle from '@/components/box';
import InstructionsBoard from '@/components/instructionsBoard';


export default function HowToPlay() {

    const router = useRouter()
    const line = "I 2 it 4 5";
    const colors = ['bg-blue-300', 'bg-gray-400', 'bg-red-400', 'bg-gray-400', 'bg-gray-400']
    const splitLine = line.split(" ");

    const go = (path: string) => {
        router.push(path)
    }

    return (
    <>
    <div className="flex flex-col min-h-screen gap-4 pt-6">   
        <InstructionsBoard />
        <div className="flex w-full items-center justify-center gap-8">
        {splitLine.map((word, index) =>
            <div key={index}> 
                <BoxStyle word={word.toLocaleUpperCase()} color={colors[index]}/>
            </div>
        )}
        </div>
        <div className="flex-grow"/>
        <div className="flex justify-center pb-6">
            <Button className="text-center text-3xl" onClick={() => go(`/`)}> Go Back </Button>
        </div>
     </div>

        </>
    );
}