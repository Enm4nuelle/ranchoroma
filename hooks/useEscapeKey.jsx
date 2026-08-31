"use client";

import { useEffect } from "react";

export const useEscapeKey = (callback, enabled = true) => {
    useEffect(()=>{
        if(!enabled){
            return
        }
        const handleKeyDown = (e) => {
            if(e.key === "Escape"){
                callback();
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    },[callback, enabled])
}