'use client'
import React from 'react'
import Button from '@/components/button'
import { useRouter } from 'next/navigation'
import Image from "next/image";


export default function HowToPlay() {

    const router = useRouter()

    const go = (path: string) => {
        router.push(path)
    }

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
        <div className="flex items-center justify-center">
        <Button className="text-center text-3xl" onClick={() => go(`/`)}> Go Back </Button>
        </div>
     </div>

        </>
    );
}