import React from "react";
import Link from "next/link";
import ScrollAnimation from "./scrollAnimation";

export const NoFoundProductConsult = (props) => {
    return (
        <ScrollAnimation animation={props.data.typeAnimationComponent} pixelsDisplacement={props.data.pixelsAnimationComponent} duration={props.data.durationAnimationComponent} delay={props.data.delayAnimationComponent}>
            <section className={"noFoundProductConsult " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
                <Link
                    className="noFoundProductConsult-cta"
                    href={props.data.href}
                >
                    <div className="noFoundProductConsult-cta-text">
                        <h2 className="noFoundProductConsult-cta-text-title">
                            {props.data.titleFirstPart}
                            <span className="noFoundProductConsult-cta-text-titleHighlight">{props.data.highLightTitleFirstPart}</span>
                        </h2>
                        <div className="noFoundProductConsult-cta-text-divider" aria-hidden="true"></div>
                        <p className="noFoundProductConsult-cta-text-description">{props.data.description}</p>
                    </div>
                    <div className="noFoundProductConsult-cta-img-container">
                        <img
                            src={props.data.img}
                            alt={props.data.altImg ?? "Producto modelo"}
                            className="noFoundProductConsult-cta-img"
                            loading="lazy"
                        />
                    </div>
                </Link>
                <Link
                    className="noFoundProductConsult-steps"
                    href={props.data.href}
                >
                    <i className={"noFoundProductConsult-steps-iconSuperior " + (props.data.iconArrowDown)} aria-hidden="true"></i>
                    <h3 className="noFoundProductConsult-steps-title">
                        {props.data.titleSecondPart}
                    </h3>
                    <ul className="noFoundProductConsult-steps-container">
                        {
                            props.data.infoRequire.map((info, index)=>(
                                <React.Fragment key={info.title + index}>
                                    <li className="noFoundProductConsult-steps-step-info">
                                        <div className="noFoundProductConsult-steps-step-info-icon">
                                            <i className={info.icon} aria-hidden="true"></i>
                                        </div>
                                        <h4 className="noFoundProductConsult-steps-step-info-title">
                                            {info.title}
                                        </h4>
                                        <p className="noFoundProductConsult-steps-step-info-description">
                                            {info.description}
                                        </p>
                                    </li>
                                    {
                                        index === props.data.infoRequire.length - 1 ?
                                        ""
                                        :
                                        <i className={"noFoundProductConsult-steps-step-iconArrow " + (props.data.iconArrowRight)} aria-hidden="true"></i>
                                    }
                                </React.Fragment>
                            ))
                        }
                    </ul>
                </Link>
            </section>
        </ScrollAnimation>
    )
}
export default NoFoundProductConsult;