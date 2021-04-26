import React, { useState } from 'react'

export default function useDebounce() {
    const [typingTimeOut, setTypingTimeOut] = useState("")

    function debounce(func, wait = 1000) {
       // const text = e.target.value;

        clearTimeout(typingTimeOut)

        const timeout = setTimeout(() => func(), wait);

        setTypingTimeOut(timeout)
    }

    return debounce;
}
