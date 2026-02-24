import React from 'react'
import { TrashIcon } from '@heroicons/react/24/solid'

interface TrashButtonProps {
    onClick: () => void,
    disabled?: boolean,
    className?: string,
};

const TrashButton: React.FC<TrashButtonProps> = ({onClick, disabled, className}) => {

    const color = disabled ? 'bg-transparent cursor-not-allowed' : 'bg-transparent cursor-pointer'
    const style = `${color} w-10 h-10 ${className}`
    return(
        <button onClick={onClick} className={style}>
            <TrashIcon />
        </button>
    )
}

export default TrashButton