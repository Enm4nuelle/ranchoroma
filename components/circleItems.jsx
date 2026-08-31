"use client";

import ScrollAnimation from "./scrollAnimation";
import { useState } from "react";

export const CircleItems = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const steps = props.data.steps || [];
    const totalSteps = steps.length;

    const activeStep = steps[activeIndex] || {};
    const { title: titleFocus, description: descriptionFocus, img: imgFocus } = activeStep;

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    const interpolateColor = (colors, percent) => {
        const stops = colors.length - 1;
        const scaledPercent = percent * stops;
        const stopIndex = Math.min(Math.floor(scaledPercent), stops - 1);
        const localPercent = scaledPercent - stopIndex;

        const hexToRgb = (hex) => {
            const bigint = parseInt(hex.replace("#", ""), 16);
            return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
        };

        const [r1, g1, b1] = hexToRgb(colors[stopIndex]);
        const [r2, g2, b2] = hexToRgb(colors[stopIndex + 1]);

        const r = Math.round(r1 + (r2 - r1) * localPercent);
        const g = Math.round(g1 + (g2 - g1) * localPercent);
        const b = Math.round(b1 + (b2 - b1) * localPercent);

        return `rgb(${r}, ${g}, ${b})`;
    };

    const getStepGradient = (colors, index, total) => {
        const spread = 0.25;
        const percent = total > 1 ? index / (total - 1) : 0;
        const startPercent = Math.max(percent - spread / 2, 0);
        const endPercent = Math.min(percent + spread / 2, 1);

        const colorStart = interpolateColor(colors, startPercent);
        const colorEnd = interpolateColor(colors, endPercent);

        return `linear-gradient(90deg, ${colorStart}, ${colorEnd})`;
    };

    const svgRadius = 270;
    const circumference = 2 * Math.PI * svgRadius;
    const progressPercent = totalSteps > 0 ? activeIndex / totalSteps : 0;
    const dashOffset = circumference * (1 - progressPercent);

    const intervalAnimationItem = props.data.delayEachAnimationStep ?? 0;
    const delayAnimationItems = steps.map((_, i) => intervalAnimationItem * (i + 1));

    return (
        <section className={"circleItems " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                <div className="circleItems-header">
                    <h2 className="circleItems-header-title">{props.data.title}</h2>
                    <div className="circleItems-header-divider" aria-hidden="true"></div>
                </div>
            </ScrollAnimation>
            <div className="circleItems-component">
                <ScrollAnimation animation={props.data.typeAnimationCircle} pixelsDisplacement={props.data.pixelsAnimationCircle} duration={props.data.durationAnimationCircle} delay={props.data.delayAnimationCircle}>
                    <ul className="circleItems-component-steps">
                        <svg className="circleItems-track" viewBox="0 0 600 600">
                            <circle className="circleItems-track-bg" cx="300" cy="300" r={svgRadius} />
                            <circle
                                className="circleItems-track-progress"
                                cx="300"
                                cy="300"
                                r={svgRadius}
                                strokeDasharray={circumference}
                                strokeDashoffset={dashOffset}
                            />
                        </svg>
                        {steps.map((step, index) => {
                            const stepGradient = getStepGradient(props.data.brandColors, index, totalSteps);
                            const angle = (360 / totalSteps) * index;
                            return (
                                <li
                                    key={index}
                                    className={
                                        "circleItems-component-steps-button " +
                                        (activeIndex === index ? "circleItems-component-steps-button-active" : "")
                                    }
                                    style={{ "--angle": `${angle}deg`, background: stepGradient }}
                                    onClick={() => handleClick(index)}
                                >
                                    <i className={"circleItems-component-steps-button-icon " + step.icon} aria-hidden="true"></i>
                                    <p className="circleItems-component-steps-button-text">{step.buttonText}</p>
                                </li>
                            );
                        })}
                    </ul>
                </ScrollAnimation>

                <div className="circleItems-component-steps-detail" key={activeIndex}>
                    <div className="circleItems-component-steps-detail-img-container">
                        <img className="circleItems-component-steps-detail-img" src={imgFocus} alt={titleFocus} />
                    </div>
                    <h3 className="circleItems-component-steps-detail-title">{titleFocus}</h3>
                    <p className="circleItems-component-steps-detail-description">{descriptionFocus}</p>
                </div>

                {/*
                  Bloque visualmente oculto (NO display:none) con el contenido completo
                  de TODOS los steps, para que los crawlers/IA lo indexen aunque el usuario
                  solo vea el detalle del step activo. display:none o visibility:hidden
                  hacen que Google lo ignore o le dé menos peso; sr-only lo mantiene
                  accesible en el DOM/HTML mientras se oculta visualmente.
                */}
                <ul className="sr-only">
                    {steps.map((step, index) => (
                        <li key={"seo-" + index}>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                            {step.img && <img src={step.img} alt={step.title} />}
                        </li>
                    ))}
                </ul>
            </div>

            <ul className="circleItems-mobile-list">
                {steps.map((step, index) => {
                    const percent = totalSteps > 1 ? index / (totalSteps - 1) : 0;
                    const stepColor = interpolateColor(props.data.brandColors, percent);
                    return (
                        <ScrollAnimation
                            animation={step.typeAnimation}
                            pixelsDisplacement={step.pixelsAnimation}
                            duration={props.data.durationAnimationSteps}
                            delay={delayAnimationItems[index]}
                            key={step.title + index}
                        >
                            <li className="circleItems-mobile-item" style={{ background: stepColor }}>
                                <i className={"circleItems-mobile-item-icon " + step.icon} aria-hidden="true"></i>
                                <p className="circleItems-mobile-item-text">{step.title}</p>
                            </li>
                        </ScrollAnimation>
                    );
                })}
            </ul>
        </section>
    );
};
export default CircleItems;