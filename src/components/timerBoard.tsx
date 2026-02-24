'use client'

import React from 'react'

interface TimerBoardProps{
    start: number,
    color: string
}

const TimerBoard: React.FC<TimerBoardProps> = ({start, color}) => {

    const [timerActive, setTimerActive] = React.useState<boolean>(false);
    const [timer, setTimer] = React.useState<number | null>(0);
    const [phase, setPhase] = React.useState< 1 | 2 | null >(null);
    console.log(color)

    React.useEffect(() => {
        if (color !== 'bg-blue-300') {
            setTimerActive(false);
            setTimer(null);
            setPhase(null);
            return;
        }

        setTimerActive(true);
        setTimer(30);
        setPhase(1);
    }, [start, color])

    React.useEffect(() => {
        if (!timerActive || timer === null) return
                
            if (timer <= 0){ 
                if(phase === 1) {
                setTimer(30);
                setPhase(2);
                }
                else {
                    setTimerActive(false);
                    setTimer(null);
                    setPhase(null)
                }
            }
        
    
        const interval = setInterval(() => {
          setTimer(prev => prev !== null ? prev - 1 : null)
        }, 1000)
    
    
        return () => clearInterval(interval)

    }, [timer, timerActive, phase])

    return(
        <div className="relative flex flex-col ml-300 mt-50 items-center">
          <div className="absolute rounded bg-black w-60 h-32"></div>
          <div className="absolute rounded bg-pink-200 mt-1 w-58 h-30"></div>
          <div className="absolute rounded bg-black mt-1.5 w-55.5 h-29"></div>
          <div className="absolute flex rounded bg-blue-300 mt-2 w-54 h-28 items-center justify-center">

          {timerActive && timer !== null && (
            <div className="text-xl font-bold text-center text-white">
              {phase === 1
                ? `Time left: ${timer}s`
                : `Everybody can guess: ${timer}s`}
            </div>
          )}
          </div>
          <div className="absolute bottom-0 w-5 h-200 bg-black -mt-2 z-1"> </div>
          <div className="absolute bottom-0 w-3.5 h-200 bg-pink-200 -mt-2 z-2"> </div>
        </div>
    )
}

export default TimerBoard