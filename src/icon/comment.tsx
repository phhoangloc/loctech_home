import React from 'react'
type Props = {
    sx?: string
}
export const Comment = ({ sx }: Props) => {
    return (
        <svg className={`w-12 h-12 p-1 ${sx}`} focusable="false" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4zM18 14H6v-2h12zm0-3H6V9h12zm0-3H6V6h12z"></path>
        </svg>
    )
}
