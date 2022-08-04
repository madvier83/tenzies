import React from "react"

export default function Die(props) {
    return (
        <>
            <div 
            onClick={()=>props.freezeDie()}
            className={`flex items-center justify-center w-12 h-12 rounded-md shadow-md cursor-pointer ${props.isHeld ? "bg-emerald-200": "bg-white"}`}>
                <h1 className="text-2lg font-semibold">{props.value}</h1>
            </div>
        </>
    )
}