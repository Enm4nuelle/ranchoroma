"use client";

import React, { useEffect, useState, useRef } from "react";

export const OurMetrics = (props) => {

    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef(null);

    // Detectar cuando el componente entra en pantalla
    useEffect(() => {
        if (!sectionRef.current) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasAnimated(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.3
            }
        );

        observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, []);


    const generateMetric = (metric, index) => {

        // Separar prefijo/sufijo del número
        const match = metric.title.match(/^([^0-9]*)([0-9]+)(.*)$/);

        const prefix = match ? match[1] : "";
        const target = match ? parseInt(match[2], 10) : 0;
        const suffix = match ? match[3] : "";

        return (
            <div className="ourMetrics-metric" key={metric.title + index}>
                <div className="ourMetrics-metric-content">
                    <div className="ourMetrics-metric-header">
                        <i className={"ourMetrics-metric-header-icon " + metric.icon} aria-hidden="true"></i>
                        <MetricCounter
                            prefix={prefix}
                            target={target}
                            suffix={suffix}
                            start={hasAnimated}
                            durationAnimation={props.data.durationAnimation ?? 1200}
                        />
                    </div>
                    <p className="ourMetrics-metric-text-description">
                        {metric.description}
                    </p>
                </div>
            </div>
        );
    };

    const generateDivider = (metric, index) => {
        if (index === props.data.metrics.length - 1) {
            return null;
        }
        return (
            <div className={ "ourMetrics-metric-divider " + (index % 2 ? "ourMetrics-metric-dividerPar ": "")}></div>
        );
    };


    return (
        <section
            ref={sectionRef}
            className={"ourMetrics " + (props.data.isAfterHeader ? "firstOnPageWithHeader": "")}
            style={{
                backgroundImage: props.data.imgBackground ? `url(${props.data.imgBackground})` : "none"
            }}
        >
            {props.data.metrics.map((metric, index) => (
                <React.Fragment key={metric.title + index.toString()}>
                    {generateMetric(metric, index)}
                    {generateDivider(metric, index)}
                </React.Fragment>
            ))}
        </section>
    );
};


const MetricCounter = ({
    prefix,
    target,
    suffix,
    durationAnimation,
    start
}) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) {
            return
        };
        let startTime = null;
        // Duración total de la animación
        const duration = durationAnimation;

        const animate = (currentTime) => {

            if (!startTime) {
                startTime = currentTime;
            }

            const elapsed = currentTime - startTime;

            const progress = Math.min(elapsed / duration, 1);

            // Hace que empiece rápido y termine suavemente
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const currentValue = Math.floor(
                easeOut * target
            );

            setCount(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(target);
            }
        };

        requestAnimationFrame(animate);

    }, [start, target, durationAnimation]);


    return (
        <p className="ourMetrics-metric-header-title">
            <span aria-hidden="true">{prefix}{count}{suffix}</span>
            <span className="sr-only">{prefix}{target}{suffix}</span>
        </p>
    );
};


export default OurMetrics;
