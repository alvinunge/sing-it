import React from 'react'

interface ScoreBoardProps {
    slot: string
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({slot}) => {

    const [team1Score, setTeam1Score] = React.useState<number>(0);
    const [team2Score, setTeam2Score] = React.useState<number>(0);
    const [hydrated, setHydrated] = React.useState(false)


    React.useEffect(() => {
        const stored = localStorage.getItem(`score-${slot}`)
        if (stored) {
            const {team1, team2} = JSON.parse(stored);
            setTeam1Score(Number(team1) || 0);
            setTeam2Score(Number(team2) || 0);
        }
        setHydrated(true)
    }, [slot])

    React.useEffect(() => {
        if (!hydrated) return;
        localStorage.setItem(
            `score-${slot}`, 
            JSON.stringify({team1: team1Score, team2: team2Score})
        );
    }, [slot, team1Score, team2Score, hydrated])

    if (!hydrated) return null

    return(
        <div className="relative flex flex-col -ml-300 mt-50 items-center">
          <div className="absolute rounded bg-black w-60 h-32 "></div>
          <div className="absolute rounded bg-black w-46 h-29 -mt-8"></div>
          <div className="absolute rounded bg-pink-200 mt-1 w-58 h-30"></div>         
          <div className="absolute flex rounded bg-pink-200 w-44 h-21 -mt-7 items-top justify-center">
            <div className="text-xl text-black font-bold">SCOREBOARD </div>
    
          </div>
          <div className="absolute rounded bg-black mt-1.5 w-55.5 h-29"></div>
          <div className="absolute flex flex-col rounded bg-blue-300 mt-2 w-54 h-28 items-center justify-center">
              <div className="text-xl font-bold"> Team 1: {team1Score} <button disabled={team1Score >= 99} className="w-6 rounded bg-black ml-10" onClick={() => setTeam1Score(s => s+1)}> + </button>  <button disabled={team1Score <= 0} className="w-6 rounded bg-black ml-2" onClick={() => setTeam1Score(s => s-1)}> - </button> </div>
              <div className="text-xl font-bold mt-2"> Team 2: {team2Score} <button disabled={team2Score >= 99} className="w-6 rounded bg-black ml-10" onClick={() => setTeam2Score(s => s+1)}> + </button>  <button disabled={team2Score <= 0} className="w-6 rounded bg-black ml-2" onClick={() => setTeam2Score(s => s-1)}> - </button> </div>
          </div>
          <div className="absolute top-32 w-5 bg-black -mb-2 z-1" style={{ height: `calc(100vh - 46rem)` }}> </div>
          <div className="absolute top-32 w-3.5 bg-pink-200 -mb-2 z-2" style={{ height: `calc(100vh - 46rem)` }}> </div>
        </div>
    )
}

export default ScoreBoard