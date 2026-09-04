"use client";

import React from "react";
import { useState, useEffect } from "react";
import ScrollAnimation from "./scrollAnimation";

export const CardsPaymentsList = (props) => {
    const [modalShowed, setModalShowed] = useState(-1);
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                console.log("entra");
                setModalShowed(-1);
            };
        };
        if (modalShowed > -1) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [modalShowed]);

    const intervalAnimationItem = props.data.delayEachAnimationCard ?? 0;
    let delayAnimationItems = [];
    if(props.data.banks){
        for(let i = 0; i < props.data.banks.length; i++){
            delayAnimationItems.push(intervalAnimationItem * (i + 1));
        }
        console.log(delayAnimationItems);
    }
    return (
        <section className={"cardsPaymentsList " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            <div className="cardsPaymentsList-container">
                <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                    <div className="cardsPaymentsList-text">
                        <p className="cardsPaymentsList-text-subTitle">
                            {props.data.subTitle}
                        </p>
                        <h2 className="cardsPaymentsList-text-title">
                            {props.data.title}
                        </h2>
                        <div className="cardsPaymentsList-text-divider" aria-hidden="true"></div>
                    </div>
                </ScrollAnimation>
                <ul className="cardsPaymentsList-cards">
                    {
                        props.data.banks?.map((bank, index)=>(
                            <ScrollAnimation animation={bank.typeAnimation} pixelsDisplacement={bank.pixelsAnimation} duration={props.data.durationAnimationCard} delay={delayAnimationItems[index]} key={index}>
                                {console.log(delayAnimationItems[index])}
                                <li className="cardsPaymentsList-cards-item">
                                    <button
                                        className="cardsPaymentsList-cards-item"
                                        style={{
                                            backgroundColor: bank.backgroundColor
                                        }}
                                        onClick={()=>{setModalShowed(index)}}
                                    >
                                        <div className="cardsPaymentsList-cards-item-img-container">
                                            <img
                                                className="cardsPaymentsList-cards-item-img"
                                                src={bank.img}
                                                alt={bank.altImg ?? "Logo de banco"}
                                            />
                                        </div>
                                        <div className="cardsPaymentsList-cards-item-text">
                                            {
                                                bank.features?.map((feat, indexJ) => {
                                                    const isLast = indexJ === bank.features.length - 1;

                                                    let content = null;

                                                    switch (feat.type) {
                                                        case "normalText":
                                                            content = (
                                                                <p className="cardsPaymentsList-cards-item-text-normalText">
                                                                    {feat.text}
                                                                </p>
                                                            );
                                                            break;

                                                        case "highlightNumber":
                                                            content = (
                                                                <div>
                                                                    <p className="cardsPaymentsList-cards-item-text-regularText">{feat.firstText}</p>
                                                                    <p className="cardsPaymentsList-cards-item-text-highlightText">{feat.number}</p>
                                                                    <p className="cardsPaymentsList-cards-item-text-regularText">{feat.secondText}</p>
                                                                </div>
                                                            );
                                                            break;

                                                        case "smallText":
                                                            content = (
                                                                <div>
                                                                    <p className="cardsPaymentsList-cards-item-text-smallText">{feat.text}</p>
                                                                </div>
                                                            );
                                                            break;

                                                        default:
                                                            return null;
                                                    }

                                                    return (
                                                        <React.Fragment key={indexJ}>
                                                            {content}
                                                            {bank.features.length > 1 && !isLast && (
                                                                <div className="cardsPaymentsList-cards-item-text-smallText-divider" aria-hidden="true"></div>
                                                            )}
                                                        </React.Fragment>
                                                    );
                                                })
                                            }
                                        </div>
                                    </button>
                                </li>
                            </ScrollAnimation>
                        ))
                    }
                </ul>
            </div>
            {
                props.data.banks?.map((bank, index) => (
                    <dialog
                        className="cardsPaymentsList-modal"
                        key={bank.altImg + index}
                        open={modalShowed === index ? true : false}
                        aria-modal="true"
                        aria-hidden={modalShowed !== index}
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setModalShowed(-1);
                            }
                        }}
                    >
                        <div className="cardsPaymentsList-modal-container">
                            <button
                                className="cardsPaymentsList-modal-closeButton"
                                onClick={()=>{setModalShowed(-1);}}
                            >
                                <i
                                    className={"cardsPaymentsList-modal-closeButton-icon " + (props.data.closeIcon ?? "fa fa-solid fa-xmark")}
                                    aria-hidden="true"
                                ></i>
                            </button>
                            <div className="cardsPaymentsList-modal-header">
                                <img
                                    className="cardsPaymentsList-modal-img"
                                    alt={bank.altImg}
                                    loading="lazy"
                                    src={bank.img}
                                />
                            </div>
                            <div className="cardsPaymentsList-modal-body">
                                <ul className="cardsPaymentsList-modal-items">
                                    {
                                        bank.benefits.map((benef, indexJ) => (
                                            <li className="cardsPaymentsList-modal-items-item" key={indexJ}>
                                                <span>-</span>{" " + benef}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </dialog>
                ))
            }
        </section>
    )
}
export default CardsPaymentsList;