import React from 'react'

interface FormProps {
    className?: string;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    value?: string;
    maxLength?: number;
}

const Form: React.FC<FormProps> = ({className ='w-[70vw] h-[10vh] border-dotted border-5 rounded border-pink-200 items-center justify-center', 
    onSubmit, 
    onChange, 
    placeholder, 
    value, 
    maxLength = 25}) => {
    return(
        <form className={className} onSubmit={onSubmit}>
            <textarea className="w-full h-full p-2 text-center text-4xl text-pink-200 placeholder-pink-200 outline-none resize-none overflow-hidden flex items-center justify-center p-0 leading-[7vh]" 
            placeholder={placeholder} 
            onChange={onChange} 
            value={value}
            maxLength={maxLength}
            />
        </form>
    );
};

export default Form;