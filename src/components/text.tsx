import React from 'react';

interface TextProps {
    children: React.ReactNode;
    className?: string;
};

const Text: React.FC<TextProps> = ({children, className = 'text-pink-200 text-6xl font-bold font-mono'}) => {

    return(
    <p className={className}>
        {children}
    </p>
    )
}

export default Text;