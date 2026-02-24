'use client'
import Image from "next/image";
import Link from "next/link"
import Button from "@/components/button"
import { useRouter } from "next/navigation"

export default function Home() {

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

      <div className="flex flex-1 justify-center items-center w-full">
        <div className="flex flex-col gap-6">
        <Button className="text-center text-3xl" onClick={() => go(`/play`)}> Play </Button>
        <Button className="text-center text-3xl" onClick={() => go(`/create`)}> Create Game </Button>
        <Button className="text-center text-3xl" onClick={() => go(`/howtoplay`)}> How To Play </Button>
        </div>
      </div>
    </div>
    </>
  );
}
