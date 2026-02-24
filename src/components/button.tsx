import React from 'react'
import clsx from 'clsx'

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string; 
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({children, onClick, className, disabled}) => {

    const base = "px-16 py-7 font-mono font-bold rounded transition";
    const disabledStyle = "bg-gray-300 text-gray-500 cursor-not-allowed";
    const defaultStyle = "bg-pink-200 text-blue-400 hover:bg-blue-600";

    return (
        <button onClick={onClick} disabled={disabled} className={clsx(base, disabled ? disabledStyle : defaultStyle, className)}>
            {children}
        </button>
    )
}

export default Button;

//<button onClick={onClick} disabled={disabled} className={`${base} ${disabled ? disabledStyle : variantStyles[variant]} ${className || ""}`}>