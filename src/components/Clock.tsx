'use client'

import { useEffect, useState } from "react"

export default function Clock () {
    const [ time, setTime ] = useState(new Date().toLocaleTimeString())
    const date = new Date().toDateString()

    useEffect(() => {
        setTimeout(() => {
            setTime(new Date().toLocaleTimeString())
        }, 1000)
    }, [time])

    return (
        <div className="flex flex-col items-end text-lg">
            <span className="text-right font-semibold" suppressHydrationWarning>{date}</span>
            <span className="w-fit" suppressHydrationWarning>{time}</span>
        </div>
    )
}