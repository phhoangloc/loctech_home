'use client'
import React, { useRef, useState } from 'react'
type Props = {
    onChange: (e: string) => void,
    onSubmit?: () => void,
    onFocus?: () => void,
    name: React.ReactNode,
    value: string,
    type?: string,
    disabled?: boolean,
    warn?: string,
    icon1?: React.ReactNode,
    icon2?: React.ReactNode,
    data?: { name: string }[],
    sx?: string
}

export const Input = ({ onChange, name, value, type, disabled, warn, icon1, icon2, sx, onFocus }: Props) => {

    const inputRef = useRef<HTMLInputElement>(null)
    const [_focus, set_focus] = useState<boolean>(false)

    return (
        <div className={`h-12 text-left relative mb-2 ${disabled ? "opacity-50" : ""} ${sx ? sx : ""}`}>
            <p className={` absolute transition-all duration-300 h-max px-2 opacity-75 ${_focus || value ? "top-0 text-sm text-lv-13 opacity-50" : "top-4"}`}
                onClick={() => { if (inputRef.current) { inputRef.current.focus() }; set_focus(true) }}>{name} <span className='text-xs text-red-500 '>{warn}</span></p>
            <input className={`w-full h-full bg-inherit pt-4 px-2 relative z-[1]`}
                ref={inputRef}
                type={type ? type : "text"}
                onChange={(e) => onChange(e.currentTarget.value)}
                defaultValue={value}
                onFocus={(e) => { if (e) { e.currentTarget.style.outline = 'none' }; set_focus(true); if (onFocus) { onFocus() } }}
                onBlur={() => set_focus(false)}
                disabled={disabled}
                style={{ fontFamily: "revert" }}
            />
            <div className='w-max absolute flex right-1 bottom-0 h-12 z-[1]'>
                {icon1}{icon2}
            </div>
            <div className={`w-full h-full absolute z-0 border-b-2 top-0 left-0 border-three/25`}></div>
            <div className={`w-full h-full absolute z-0 border-b-2 top-0 left-0 transition-all duration-300 border-three ${_focus || value ? "scale-x-[100%]" : "scale-x-[0%]"}`}></div>
        </div>
    )
}