"use client";

import { useRef } from "react";

export default function TextInput() {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        if (inputRef.current) {
            console.log("Texto ingresado:", inputRef.current.value);
        }
    };

    return (
        <div className="flex w-full rounded-full border border-gray-300 overflow-hidden">
            <input
                type="text"
                placeholder="Describe el regalo que buscas..."
                className="flex-1 p-3 outline-none text-gray-700"
            />
            <button className="bg-purple-500 text-white p-3 rounded-lg flex items-center justify-center">
                ➜
            </button>
        </div>

    );
}
