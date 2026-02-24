import React from 'react';
//import type { Box } from "@/types/game"


interface BoxProps {
    onClick?: () => void;
    hidden?: boolean;
    word?: string;
    color?: string;
}

const BoxStyle: React.FC<BoxProps> = ({hidden, word, color, onClick}) => {
    const boxColor = hidden ? "bg-gray-200" : color;
    const textSize = ((word?.length ?? 0) > 8) ? 'text-base' : 'text-2xl'
    return (
        <div
        onClick={onClick}
        className={`flex justify-center items-center w-32 h-32 rounded shadow-md text-white font-bold cursor-pointer select-none ${textSize} ${boxColor}`}
        >
        {hidden ? "" : word}
        </div>
    )
}

export default BoxStyle;