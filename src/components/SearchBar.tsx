"use client"

import { InputHTMLAttributes } from "react"

export default function SearchBar(props: InputHTMLAttributes<HTMLInputElement>) {

    return (
        <input {...props} className="w-full h-full shadow-sm shadow-black/25 rounded-md outline-none border border-slate-300 px-2 font-medium text-xl text-slate-600 placeholder:text-slate-400 placeholder:italic" />
    )
}