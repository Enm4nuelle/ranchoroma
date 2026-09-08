"use client";

import ScrollAnimation from "./scrollAnimation";
import React from "react";
import RoomsJson from "../data/rooms.json";
import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";

export const ListFeatures = (props) => {
    const pathname = usePathname();
    const [features, setFeatures] = useState([]);
    const [basicInfo, setBasicInfo] = useState([]);
    const [title, setTitle] = useState("");
    const [showMoreFeatures, setShowMoreFeatures] = useState(false);

    useMemo(()=>{
        if(props.data.infoFromJsons || props.data.buttonContact){
            let slug = pathname.split("/")[2];
            if(!slug){
                return;
            }
            for(let i = 0; i < RoomsJson.rooms.length; i++){
                if(slug === RoomsJson.rooms[i].slug){
                    setTitle(RoomsJson.rooms[i].title);
                    if(props.data.infoFromJsons){
                        setFeatures(RoomsJson.rooms[i].features);
                        setBasicInfo(RoomsJson.rooms[i].basicInfo);
                    }else{
                        setFeatures(props.data.features);
                        setBasicInfo(props.data.basicInfo);            
                    }
                }
            }
        }
    }, [pathname]);
    return (
        <section
            className={"listFeatures " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}
            style={{
                backgroundColor: props.data.backgroundColor ?? ""
            }}
        >
            <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                <div className="listFeatures-header">
                    {
                        props.data.isMainH1 ?
                        <h1 className="listFeatures-header-title">{props.data.title}</h1>
                        :
                        <h2 className="listFeatures-header-title">{props.data.title}</h2>
                    }
                    {
                        basicInfo?.length > 0 ? 
                            <div className="listFeatures-basicInfo">
                                {basicInfo.map((info, index) => (
                                    <React.Fragment key={index}>
                                        <p className="listFeatures-basicInfo-text">
                                            {info.text}
                                        </p>
                                        {
                                            (index + 1) < basicInfo.length ?
                                            <span className="listFeatures-basicInfo-separator">{" | "}</span>
                                            :
                                            ""
                                        }
                                    </React.Fragment>
                                ))}
                            </div>
                        :
                        ""
                    }
                </div>
            </ScrollAnimation>
            <ul className="listFeatures-principalFeatures">
                {
                    features.map((feat, index) => {
                        if(index + 1 <= props.data.numBeforeSeeMore){
                            return (
                                <ScrollAnimation animation={props.data.typeAnimationItems} pixelsDisplacement={props.data.pixelsAnimationItems} duration={props.data.durationAnimationItems} delay={props.data.delayAnimationItems} key={feat.text + index}>
                                    <li className="listFeatures-principalFeatures-feature">
                                        <i className={"listFeatures-principalFeatures-feature-icon " + feat.icon} aria-hidden="true"></i>
                                        <p className="listFeatures-principalFeatures-feature-text">{feat.text}</p>
                                    </li>
                                </ScrollAnimation>
                            )
                        }
                    })
                }
            </ul>
            <div className="listFeatures-extraFeatures">
                <div className={"listFeatures-extraFeatures-wrapper " + (showMoreFeatures ? "is-open" : "")}>
                    <div className="listFeatures-extraFeatures-wrapper-inner">
                        <div className="listFeatures-features-divider" aria-hidden="true"></div>
                        <ul className="listFeatures-extraFeatures-list">
                            {features.slice(props.data.numBeforeSeeMore).map((feature, index) => (
                                <li className="listFeatures-principalFeatures-feature" key={index}>
                                    <i className={"listFeatures-principalFeatures-feature-icon " + feature.icon} aria-hidden="true"/>
                                    <p className="listFeatures-principalFeatures-feature-text">
                                        {feature.text}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {
                    features.length > props.data.numBeforeSeeMore ?
                    <button
                        className="listFeatures-extraFeatures-button"
                        onClick={()=>{setShowMoreFeatures(!showMoreFeatures)}}
                    >
                        {props.data.buttonText}
                        <i
                            className={
                                "listFeatures-principalFeatures-button-icon " +
                                (showMoreFeatures ? props.data.buttonIconUp : props.data.buttonIconDown)
                            }
                            aria-hidden="true"
                        ></i>
                    </button>
                    :
                    ""
                }
            </div>
            {
                (props.data.extraIcons && props.data.extraIcons.length > 0)?
                <ScrollAnimation animation={props.data.typeAnimationExtraIcons} pixelsDisplacement={props.data.pixelsAnimationExtraIcons} duration={props.data.durationAnimationExtraIcons} delay={props.data.delayAnimationExtraIcons}>
                    <ul className="listFeatures-extraIcons">
                        {
                            props.data.extraIcons.map((item, index) => (
                                <li className="listFeatures-extraIcons-item" key={item.text + index}>
                                    <i className={"listFeatures-extraIcons-item-icon " + item.icon} aria-hidden="true"></i>
                                    <p className="listFeatures-extraIcons-item-label">{item.label}</p>
                                    <p className="listFeatures-extraIcons-item-text">{item.text}</p>
                                </li>
                            ))
                        }
                    </ul>
                </ScrollAnimation>
                :
                ""
            }
            {
                props.data.buttonContact ?
                <ScrollAnimation animation={props.data.typeAnimationButtonContact} pixelsDisplacement={props.data.pixelsAnimationButtonContact} duration={props.data.durationAnimationButtonContact} delay={props.data.delayAnimationButtonContact}>
                    <div className="listFeatures-buttonContact-container">
                        <a
                            className={"listFeatures-buttonContact " + (props.data.buttonContact.type === "primary" ? "buttonPrimary" : "buttonSecondary")}
                            href={
                                props.data.buttonContact.hrefDestiny === "whatsapp" ?
                                `https://wa.me/${props.data.buttonContact.number}?text=${encodeURIComponent(props.data.buttonContact.defaultMessage + (title || ""))}`
                                :
                                ""
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Contacto Whatsapp"
                        >
                            {props.data.buttonContact.text}
                            <i className={"listFeatures-buttonContact-icon " + props.data.buttonContact.icon}></i>
                        </a>
                    </div>
                </ScrollAnimation>
                :
                ""
            }
        </section>
    )
}
export default ListFeatures;