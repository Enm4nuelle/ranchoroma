"use client";

import { useRouter } from "next/navigation";
import Dropdown from "./dropdown";
import ScrollAnimation from "./scrollAnimation";

export const ImgWithDropdowns = (props) => {
    const router = useRouter();
    const intervalAnimationDropdowns = props.data.delayEachAnimationDropdown ?? 0;
    let delayAnimationDropdowns = [];
    if(props.data.infoDropdown){
        for(let i = 0; i < props.data.infoDropdown.length; i++){
            delayAnimationDropdowns.push(intervalAnimationDropdowns * (i + 1));
        }
    }

    const intervalAnimationInfoChecks = props.data.delayEachAnimationInfoCheck ?? 0;
    let delayAnimationInfoChecks = [];
    if(props.data.infoChecks){
        for(let i = 0; i < props.data.infoChecks.length; i++){
            delayAnimationInfoChecks.push(intervalAnimationInfoChecks * (i + 1));
        }
    }
    return (
        <div className={"imgWithDropdowns " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            <div className="imgWithDropdowns-container">
                <div className="imgWithDropdowns-text">
                    <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                        <h1 className="imgWithDropdowns-text-title">{props.data.title}</h1>
                    </ScrollAnimation>
                    <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                        <div className="imgWithDropdowns-text-divider"></div>
                    </ScrollAnimation>
                    <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                        <p className="imgWithDropdowns-text-description">{props.data.description}</p>
                    </ScrollAnimation>
                    <div className="imgWithDropdowns-text-dropdowns">
                        {
                            props.data.infoDropdown.map((drop, index)=>(
                                <ScrollAnimation animation={drop.typeAnimation} pixelsDisplacement={drop.pixelsAnimation} duration={props.data.durationAnimationDropdowns} delay={delayAnimationDropdowns[index]} key={drop.title + index}>
                                    <div>
                                        <Dropdown
                                            title={drop.title}
                                            data = {[drop.text]}
                                            oneItem = {true}
                                        />
                                    </div>
                                </ScrollAnimation>
                            ))
                        }
                    </div>
                    <div className="imgWithDropdowns-text-title-checks">
                        {
                            props.data.infoChecks.map((item, index)=>(
                                <ScrollAnimation animation={item.typeAnimation} pixelsDisplacement={item.pixelsAnimation} duration={props.data.durationAnimationInfoChecks} delay={delayAnimationInfoChecks[index]} key={index}>
                                    <div className="imgWithDropdowns-text-title-checks-item">
                                        <i className={"imgWithDropdowns-text-title-checks-item-icon " + item.icon}></i>
                                        <p className="imgWithDropdowns-text-title-checks-item-description">{item.text}</p>
                                    </div>
                                </ScrollAnimation>
                            ))
                        }
                    </div>
                    <ScrollAnimation animation={props.data.typeAnimationButton} pixelsDisplacement={props.data.pixelsAnimationButton} duration={props.data.durationAnimationButton} delay={props.data.delayAnimationButton}>
                        <div className="imgWithDropdowns-text-button-container">
                            <button
                                className={
                                    (props.data.buttonContact.type === "primary" ? "buttonPrimary " : "buttonSecondary")
                                    + "imgWithDropdowns-text-button"
                                }
                                onClick={()=>{router.push(props.data.buttonContact.href)}}
                            >
                                {props.data.buttonContact.text}
                            </button>
                        </div>
                    </ScrollAnimation>
                </div>
                <ScrollAnimation animation={props.data.typeAnimationImg} pixelsDisplacement={props.data.pixelsAnimationImg} duration={props.data.durationAnimationImg} delay={props.data.delayAnimationImg}>
                    <div className="imgWithDropdowns-img-container">
                        <img
                            alt={props.data.title}
                            src={props.data.img}
                            className="imgWithDropdowns-img"
                        />
                    </div>
                </ScrollAnimation>
            </div>
        </div>
    )
}
export default ImgWithDropdowns;