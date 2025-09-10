import React from 'react'
type Props = {
    sx?: string
}
export const Menu = ({ sx }: Props) => {
    return (
        <svg className={`w-12 h-12 p-1 ${sx}`} focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"></path></svg>
    )
}
export const MenuOpen = ({ sx }: Props) => {
    return (
        <svg className={`w-12 h-12 p-1 ${sx}`} focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M3 18h13v-2H3zm0-5h10v-2H3zm0-7v2h13V6zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5z"></path></svg>
    )
}