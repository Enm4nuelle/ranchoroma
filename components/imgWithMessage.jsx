"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import ScrollAnimation from "./scrollAnimation";

export const ImgWithMessage = (props) => {
    const intervalAnimationItem = props.data.delayAnimationFooterItems ?? 0;
    let delayAnimationItems = [];
    if(props.data.footerItems){
        for(let i = 0; i < props.data.footerItems.length; i++){
            delayAnimationItems.push(intervalAnimationItem * (i + 1));
        }
    }
    const titleRender = props.data.isMainH1 ?
        (<h1 className="imgWithMessage-text-title">
            {props.data.title}
            <span className="imgWithMessage-text-title-highligh">{props.data.highLightTitle}</span>
        </h1>) :
        (<h2 className="imgWithMessage-text-title">
            {props.data.title}
            <span className="imgWithMessage-text-title-highligh">{props.data.highLightTitle}</span>
        </h2>);
    return (
        <section
            className={"imgWithMessage " +
                (props.data.coverScreen ? "imgWithMessageAllScreen" : props.data.isAfterHeader ? "firstOnPageWithHeader" : "")
            }
        >
            <Image
                src={props.data.img}
                alt={props.data.altImg ?? "Imagen Hero"}
                className="imgWithMessage-img"
                width={1920}
                height={800}
                priority={props.data.isAfterHeader}
                fetchPriority={props.data.isAfterHeader ? "high" : "auto"}
                sizes="100vw"
            />
            <div className="imgWithMessage-text">
                <ScrollAnimation animation={props.data.typeAnimationTitleSection} pixelsDisplacement={props.data.pixelsAnimationTitleSection} duration={props.data.durationAnimationTitleSection} delay={props.data.delayAnimationTitleSection}>
                    {titleRender}
                </ScrollAnimation>
                <ScrollAnimation animation="left" pixelsDisplacement={80} duration={1000}>
                    <p className="imgWithMessage-text-underTitle">{props.data.textUnderTitle}</p>
                </ScrollAnimation>
                <ScrollAnimation animation={props.data.typeAnimationTitleSection} pixelsDisplacement={props.data.pixelsAnimationTitleSection} duration={props.data.durationAnimationTitleSection} delay={props.data.delayAnimationTitleSection}>
                    <p className="imgWithMessage-text-subtitle">
                        {props.data.subTitle}
                        {
                            props.data.subTitle ?
                                <span className="imgWithMessage-text-subtitle-highligh">{props.data.highLightSubTitle}</span>
                            :
                                ""
                        }
                    </p>
                </ScrollAnimation>
                {
                    props.data.subTitle ?
                        <ScrollAnimation animation={props.data.typeAnimationTitleSection} pixelsDisplacement={props.data.pixelsAnimationTitleSection} duration={props.data.durationAnimationTitleSection} delay={props.data.delayAnimationTitleSection}>
                            <div className="imgWithMessage-divider" aria-hidden="true"></div>
                        </ScrollAnimation>
                    :
                        ""
                }
                <ScrollAnimation animation={props.data.typeAnimationDescription} pixelsDisplacement={props.data.pixelsAnimationDescription} duration={props.data.durationAnimationDescription} delay={props.data.delayAnimationDescription}>
                    <p className="imgWithMessage-text-description">{props.data.description}</p>
                </ScrollAnimation>
                {
                    props.data.buttons ?
                    <nav className="imgWithMessage-text-buttons">
                        {
                            props.data.buttons.map((btn, index)=>(
                                <ScrollAnimation animation={btn.typeAnimation} pixelsDisplacement={btn.pixelsAnimation} duration={props.data.durationAnimationButtons} key={btn.text + index}>
                                    <Link
                                        key={"imgWithMessage-buttons " + btn.text + index}
                                        href={btn.href}
                                        scroll={false}
                                        className = {"imgWithMessage-text-buttons-button " +
                                            (btn.type === "primary" ? "buttonPrimary" : "buttonSecondary")
                                        }
                                        onClick={(e) => {
                                            if(btn.linkType === "samePage"){
                                                //console.log("salto a un componente de la pagina", btn.href);
                                                document.getElementById(btn.href)?.scrollIntoView({
                                                    "behavior": "smooth"
                                                });
                                            }
                                            // si es un linktype samePage, solo scrolleamos al elemento con btn.href de id
                                        }}
                                    >
                                        {btn.text}
                                    </Link>
                                </ScrollAnimation>
                            ))
                        }
                    </nav>
                    :
                    ""
                }
            </div>
            {
                props.data.footerItems ?
                <ul className="imgWithMessage-text-footer">
                    <ScrollAnimation animation={props.data.typeAnimationAvatarImg} pixelsDisplacement={props.data.pixelsAnimationAvatarImg} duration={props.data.durationAnimationAvatarImg} delay={props.data.delayAnimationAvatarImg}>
                        <img
                            className="imgWithMessage-text-footer-img"
                            src={props.data.imgAvatar}
                            alt={props.data.altImgAvatar ?? "Avatar de la empresa"}
                        />
                    </ScrollAnimation>
                    {
                        props.data.footerItems.map((item, index)=>(
                            <React.Fragment key={item.title + index}>
                                <ScrollAnimation animation={item.typeAnimation} pixelsDisplacement={item.pixelsAnimation} duration={props.data.durationAnimationFooterItems} delay={delayAnimationItems[index]}>
                                    <li className="imgWithMessage-text-footer-item">
                                        <i className={"imgWithMessage-text-footer-item-icon " + item.icon}></i>
                                        <h3 className="imgWithMessage-text-footer-item-title">{item.title}</h3>
                                        <p className="imgWithMessage-text-footer-item-description">{item.description}</p>
                                    </li>
                                </ScrollAnimation>
                                {
                                    index === props.data.footerItems.length - 1 ?
                                    ""
                                    :
                                    <ScrollAnimation animation={item.typeAnimationDivider} pixelsDisplacement={item.pixelsAnimationDivider} duration={props.data.durationAnimationFooterItems} delay={delayAnimationItems[index]}>
                                        <div className="imgWithMessage-text-footer-separator" aria-hidden="true"></div>
                                    </ScrollAnimation>
                                }
                            </React.Fragment>
                        ))
                    }
                </ul>
                :
                ""
            }
        </section>
    )
}
export default ImgWithMessage;