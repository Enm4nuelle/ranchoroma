"use client";

import React from "react";
import { useMemo, useState } from "react";
import ScrollAnimation from "./scrollAnimation";
import Dropdown from "./dropdown";
import { usePathname } from "next/navigation";
import PromoJson from "../data/promociones.json";

export const PromoDetail = (props) => {
    const pathname = usePathname();
    const [promo, setPromo] = useState(null);

    useMemo(()=>{
        let auxSlug = pathname.split("/")[2];
        if(!auxSlug){
            return;
        }
        for(let i = 0; i < PromoJson.promotions.length; i++){
            if(PromoJson.promotions[i].slug === auxSlug){
                setPromo(PromoJson.promotions[i]);
                break;
            }
        }
    }, [pathname]);
    

    if(!promo){
        return;
    }
    return (
        <section className={"promoDetail " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                <div className="promoDetail-header">
                    {
                        props.data.isMainH1 ?
                        <h1 className="promoDetail-header-title">{promo.title}</h1>
                        :
                        <h2 className="promoDetail-header-title">{promo.title}</h2>
                    }
                    <div className="promoDetail-header-divider" aria-hidden="true"></div>
                    <p className="promoDetail-header-description">{promo.description}</p>
                </div>
            </ScrollAnimation>
            <ul className="promoDetail-items">
                {
                    promo.options.map((option, index)=>(
                        <React.Fragment key={option.title + index}>
                            <li className={"promoDetail-items-item " + (index % 2 !== 0 ? "promoDetail-items-item-reversed" : "")}>
                                <ScrollAnimation animation={props.data.typeAnimationImgItems[index]} pixelsDisplacement={props.data.pixelsAnimationImgItems} duration={props.data.durationAnimationImgItems} delay={props.data.delayAnimationImgItems}>
                                    <div className="promoDetail-items-item-img-container">
                                        <img
                                            className="promoDetail-items-item-img"
                                            alt={option.altImg}
                                            src={option.img}
                                        />
                                    </div>
                                </ScrollAnimation>
                                <ScrollAnimation animation={props.data.typeAnimationTextItems[index]} pixelsDisplacement={props.data.pixelsAnimationTextItems} duration={props.data.durationAnimationTextItems} delay={props.data.delayAnimationTextItems}>
                                    <div className="promoDetail-items-item-info-container">
                                        {
                                            props.data.isMainH1 ?
                                            <h2 className="promoDetail-items-item-info-duration">
                                                <span>{props.data.labelOption}</span>
                                                {option.title}
                                            </h2>
                                            :
                                            <h3 className="promoDetail-items-item-info-duration">
                                                <span>{props.data.labelOption}</span>
                                                {option.title}
                                            </h3>
                                        }
                                        <p className="promoDetail-items-item-info-price">
                                            <span>{props.data.labelPrice ?? "Precio: "}</span>{option.price}
                                        </p>
                                        <div className="promoDetail-items-item-courtesy-container">
                                            {
                                                (option.courtesys && option.courtesys.length > 0) ?
                                                    props.data.isMainH1 ?
                                                    <h2 className="promoDetail-items-item-courtesy-title">
                                                        {props.data.labelCourtesys}
                                                    </h2>
                                                    :
                                                    <h3 className="promoDetail-items-item-courtesy-title">
                                                        {props.data.labelCourtesys}
                                                    </h3>
                                                :
                                                ""
                                            }
                                            {
                                                (option.courtesys && option.courtesys.length > 0) ?
                                                    option.courtesys.map((court, indexJ) =>(
                                                        <p className="promoDetail-items-item-courtesy-text" key={index.toString() + indexJ.toString()}>
                                                            <span>{"· "}</span>{court}
                                                        </p>
                                                    ))
                                                :
                                                ""
                                            }
                                        </div>
                                        <div className="promoDetail-items-item-includes-container">
                                            {
                                                props.data.isMainH1 ?
                                                <h2 className="promoDetail-items-item-includes-title">
                                                    {props.data.labelIncludes}
                                                </h2>
                                                :
                                                <h3 className="promoDetail-items-item-includes-title">
                                                    {props.data.labelIncludes}
                                                </h3>
                                            }
                                            {
                                                option.includes.map((include, indexJ) =>(
                                                    <p className="promoDetail-items-item-includes-text" key={index.toString() + indexJ.toString()}>
                                                        <span>{"· "}</span>{include}
                                                    </p>
                                                ))
                                            }
                                        </div>
                                        <div className="promoDetail-items-item-divider" aria-hidden="true"></div>
                                        <div className="promoDetail-items-item-checkInfo">
                                            <p className="promoDetail-items-item-checkInfo-checkin">
                                                <span>{props.data.labelCheckin}</span>{option.checkin}
                                            </p>
                                            <p className="promoDetail-items-item-checkInfo-checkout">
                                                <span>{props.data.labelCheckout}</span>{option.checkout}
                                            </p>
                                        </div>
                                        <p className="promoDetail-items-item-condition">{props.data.labelPromoDisponibility}</p>
                                        <div className="promoDetail-items-item-dropdown-container">
                                            <Dropdown
                                                title={props.data.labelTermsConditions}
                                                data={option.termsAndConditiones}
                                                classModifier="promoDetail"
                                            />
                                        </div>
                                    </div>
                                </ScrollAnimation>
                            </li>
                            <div className="promoDetail-items-divider" aria-hidden="true"></div>
                        </React.Fragment>
                    ))
                }
            </ul>
            {
                props.data.buttonBook ?
                <ScrollAnimation animation={props.data.typeAnimationButtonBook} pixelsDisplacement={props.data.pixelsAnimationButtonBook} duration={props.data.durationAnimationButtonBook} delay={props.data.delayAnimationButtonBook}>
                    <div className="promoDetail-buttonBook-container">
                        <a
                            className={"promoDetail-buttonBook " + (props.data.buttonBook.type === "primary" ? "buttonPrimary" : "buttonSecondary")}
                            href={
                                props.data.buttonBook.hrefDestiny === "whatsapp" ?
                                `https://wa.me/${props.data.buttonBook.number}?text=${encodeURIComponent(promo.messageWhatsapp)}`
                                :
                                ""
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Contacto Whatsapp"
                        >
                            {props.data.buttonBook.text}
                            <i className={"promoDetail-buttonBook-icon " + props.data.buttonBook.icon}></i>
                        </a>
                    </div>
                </ScrollAnimation>
                :
                ""
            }
        </section>
    )
}
export default PromoDetail;