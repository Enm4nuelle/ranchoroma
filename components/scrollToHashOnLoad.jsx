"use client";

import { useEffect } from "react";

export default function ScrollToHashOnLoad() {
    useEffect(() => {
        const hash = window.location.hash;
        if (!hash) return;

        const targetId = hash;

        const timer = setTimeout(() => {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return null; // no renderiza nada, solo ejecuta el efecto
}