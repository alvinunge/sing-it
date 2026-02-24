import React from 'react'
import { TrashIcon } from '@heroicons/react/24/solid'

interface TrashButtonProps {
    onClick: () => void,
    disabled?: boolean,
    className?: string,
};

const TrashButton: React.FC<TrashButtonProps> = ({onClick, disabled}) => {

    const color = disabled ? 'bg-transparent cursor-not-allowed' : 'bg-transparent cursor-pointer'
    const style = `${color} w-10 h-10`
    return(
        <button onClick={onClick} className={style}>
            <TrashIcon />
        </button>
    )
}

export default TrashButton