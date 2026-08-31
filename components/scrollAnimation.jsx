"use client";

import { useEffect, useRef, useState } from "react";

const ScrollAnimation = ({
    children,
    animation,
    pixelsDisplacement = 60,
    delay = 0,
    duration = 700,
    threshold = 0.2
}) => {

    const wrapperRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [animationDone, setAnimationDone] = useState(false);

    useEffect(() => {

        if (!wrapperRef.current) return;

        // Como el wrapper es display:contents, no tiene geometría propia;
        // se observa a su hijo real en el DOM.
        const target = wrapperRef.current.firstElementChild ?? wrapperRef.current;

        const observer = new IntersectionObserver(
            ([entry]) => {

                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }

            },
            {
                threshold
            }
        );

        observer.observe(target);

        return () => observer.disconnect();

    }, [threshold]);

    useEffect(() => {
        if (!visible) return;

        const timer = setTimeout(() => {
            setAnimationDone(true);
        }, delay + duration);

        return () => clearTimeout(timer);
    }, [visible, delay, duration]);

    if(animation){
        return (
            <div
                ref={wrapperRef}
                className={[
                    "scrollAnimation",
                    `scrollAnimation-${animation}`,
                    visible ? "scrollAnimation-show" : ""
                ].join(" ")}
                style={{
                    "--animation-displacement": `${pixelsDisplacement}px`,
                    ...(!animationDone && {
                        "--scroll-delay": `${delay}ms`,
                        "--scroll-duration": `${duration}ms`
                    })
                }}
            >
                {children}
            </div>
        );
    }else{
        return children;
    }
};

export default ScrollAnimation;