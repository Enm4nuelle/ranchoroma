"use client";

import { useMemo, useState, useRef, useCallback, useEffect } from "react";
import ItinerarysJson from "../data/itinerarys.json"
import { usePathname } from "next/navigation";
import Dropdown from "./dropdown";
import EmblaCarrousel from "./emblaCarrousel";
import ScrollAnimation from "./scrollAnimation";
import Link from "next/link";

export const ItinerarysDetail = (props) => {
    const pathname = usePathname();

    const [itinerary, setItinerary] = useState(null);
    let itemsCarousel = <></>;

    const [currentDay, setCurrentDay] = useState(0);
    const [maxDays, setMaxDays] = useState(0);

    const emblaApiRef = useRef(null);
    const handleEmblaReady = useCallback((emblaApi) => {
        emblaApiRef.current = emblaApi;
    }, []);


    useMemo(()=>{
        let auxSlug = pathname.split("/")[2];
        if (!auxSlug) return;
        for(let i = 0; i < ItinerarysJson.itinerarys.length; i++){
            if(ItinerarysJson.itinerarys[i].slug === auxSlug){
                setItinerary(ItinerarysJson.itinerarys[i]);
                setMaxDays(ItinerarysJson.itinerarys[i].daysSchedule.length);
                setCurrentDay(0);
                if (emblaApiRef.current) {
                    emblaApiRef.current.scrollTo(0, true);
                }
                break;
            }
        }
    },[pathname]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const element = document.getElementById(props.data.nameId);
            if (!element) return;

            const previousBehavior = document.documentElement.style.scrollBehavior;
            document.documentElement.style.scrollBehavior = 'auto';

            const headerHeight = props.data.headerHeight;
            const start = window.scrollY;
            const target = element.getBoundingClientRect().top + window.scrollY - headerHeight;
            const distance = target - start;
            const duration = props.data.durationScroll;

            let startTime = null;

            const easeInOut = (t) => {
                return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
            };

            const animateScroll = (currentTime) => {
                if (startTime === null) {
                    startTime = currentTime;
                }
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeInOut(progress);
                window.scrollTo(0, start + distance * easedProgress);
                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                } else {
                    document.documentElement.style.scrollBehavior = previousBehavior;
                }
            };
            requestAnimationFrame(animateScroll);
        }, 100);

        return () => clearTimeout(timer);
    }, [pathname]);

    if(itinerary){
        itemsCarousel = itinerary.daysSchedule?.map((day, index)=>(
            <div className={"itinerarysDetail-travel-item " + (index % 2 === 0 ? "itinerarysDetail-travel-item-top": "itinerarysDetail-travel-item-bottom")} key={index}>
                <div className="itinerarysDetail-travel-item-container">
                    <img
                        className="itinerarysDetail-travel-item-img"
                        src={day.img}
                        alt={day.textActualLocation}
                    />
                    <p className="itinerarysDetail-travel-item-dayText">{props.data.labelDay + " " + (index + 1)}</p>
                    <p className="itinerarysDetail-travel-item-actualLocation">{day.textActualLocation}</p>
                </div>
                <div
                    className={
                        "itinerarysDetail-travel-item-modalText " +
                        (index % 2 === 0 ? "itinerarysDetail-travel-item-modalText-bottom" : "itinerarysDetail-travel-item-modalText-top") +
                        (index === 0 ? " show" : "")
                    }
                    id = {"itinerarysDetail-travel-item-modalText" + index}
                >
                    <p className="itinerarysDetail-travel-item-modalText-text">{day.description}</p>
                </div>
            </div>
        ));
    }else{
        return (
            <></>
        );
    }
    const intervalAnimationItem = props.data.delayEachAnimationBenefitsItem ?? 0;
    let delayAnimationItems = [];
    if(itinerary.benefits){
        for(let i = 0; i < itinerary.benefits.length; i++){
            delayAnimationItems.push(intervalAnimationItem * (i + 1));
        }
    }

    const titleRender = props.data.isMainH1 ?
        (<h1 className="carrouselTravels-text-title">
            {props.data.title}
        </h1>) :
        (<h2 className="carrouselTravels-text-title">
            {props.data.title}
        </h2>);

    const bookHref = (pathname !== props.data.buttonBook.pathForm) ? `/${props.data.buttonBook.pathForm}${props.data.buttonBook.href}` : undefined;

    const buttonBookElement = (
        <Link
            href={bookHref ?? props.data.buttonBook.href}
            scroll={false}
            className="buttonPrimary itinerarysDetail-header-info-buttons-buttonBook"
            onClick={(e) => {
                if(pathname === props.data.buttonBook.pathForm){
                    e.preventDefault();
                    document.getElementById(props.data.buttonBook.href)?.scrollIntoView({ behavior: "smooth" });
                }
            }}
        >
            {props.data.buttonBook.text}
        </Link>
    );

    return (
        <section
            key={itinerary?.idItinerary}
            className={"itinerarysDetail itinerarysDetail-fadeIn" + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}
            id={props.data.nameId}
        >
            <div className="itinerarysDetail-header">
                <div className="itinerarysDetail-header-info">
                    <div className="itinerarysDetail-header-info-text">
                        {titleRender}
                        <p className="itinerarysDetail-header-info-text-dateDuration">{itinerary.dateDuration}</p>
                        <p className="itinerarysDetail-header-info-text-daysDuration">{itinerary.daysDuration}</p>
                    </div>
                    <div className="itinerarysDetail-header-info-buttons">
                        {buttonBookElement}
                        <a
                            className="buttonSecondary itinerarysDetail-header-info-buttons-buttonPdf"
                            href={itinerary.pdfHref}
                            download={itinerary.namePdf}
                        >
                            <i className={"itinerarysDetail-header-info-buttons-buttonPdf-icon " + props.data.buttonDownloadPdf.icon} aria-hidden="true"></i>
                            <span>{props.data.buttonDownloadPdf.text}</span>
                        </a>
                    </div>
                </div>
            </div>
            <div
                className="itinerarysDetail-travel-container"
                style={{
                    background: `#cccccc url(${props.data.backgroundPlane}) no-repeat center / cover`
                }}
            >
                <div className="itinerarysDetail-travel">
                    {
                        <EmblaCarrousel
                            slidesToShow = {props.data.slidesToShow}
                            planeTopRight = {props.data.planeTopRight}
                            componentFather = {"itinerarysDetail"}
                            loop = {props.data.loop}
                            autoplay = {false}
                            delayAutoPlay = {props.delayAutoPlay}
                            iconButtonPrev = {props.iconButtonPrev}
                            iconButtonNext = {props.iconButtonNext}
                            getEmblaApi = {handleEmblaReady}
                            noAllowDrag = {true}
                            showPlane = {true}
                            currentDay = {currentDay}
                            modalBaseId = {"itinerarysDetail-travel-item-modalText"}
                            maxDays = {maxDays}
                            onDayChange = {setCurrentDay}
                        >
                            {itemsCarousel}
                        </EmblaCarrousel>
                    }
                </div>
                <div className="itinerarysDetail-benefits-container">
                    <ScrollAnimation animation={props.data.typeAnimationBenefitsTitle} pixelsDisplacement={props.data.pixelsAnimationBenefitsTitle} duration={props.data.durationAnimationBenefitsTitle} delay={props.data.delayAnimationBenefitsTitle}>
                        <h2 className="itinerarysDetail-benefits-title">{props.data.labelBenefits}</h2>
                    </ScrollAnimation>
                    <ul className="itinerarysDetail-benefits">
                        {
                            itinerary.benefits.map((benef, index)=>(
                                <ScrollAnimation
                                    animation={props.data.typeAnimationBenefitsItem}
                                    pixelsDisplacement={props.data.pixelsAnimationBenefitsItem}
                                    duration={props.data.durationAnimationBenefitsItem}
                                    delay={delayAnimationItems[index]}
                                    key={index}
                                >
                                    <li className="itinerarysDetail-benefits-benefit">
                                        <img
                                            src={benef.img}
                                            alt={"Fotografía de " + benef.description}
                                            className="itinerarysDetail-benefits-benefit-img"
                                        />
                                        <p className="itinerarysDetail-benefits-benefit-description">{benef.description}</p>
                                    </li>
                                </ScrollAnimation>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <ul className="itinerarysDetail-dropdown">
                <ScrollAnimation animation={props.data.typeAnimationIncludes} pixelsDisplacement={props.data.pixelsAnimationIncludes} duration={props.data.durationAnimationIncludes} delay={props.data.delayAnimationIncludes}>
                    <li className="itinerarysDetail-dropdown-includes">
                        <Dropdown
                            title = {props.data.labelIncludes}
                            data = {itinerary?.includes}
                        />
                    </li>
                </ScrollAnimation>
                <ScrollAnimation animation={props.data.typeAnimationTerms} pixelsDisplacement={props.data.pixelsAnimationTerms} duration={props.data.durationAnimationTerms} delay={props.data.delayAnimationTerms}>
                    <li className="itinerarysDetail-dropdown-termsAndConditions">
                        <Dropdown
                            title = {props.data.labelTermsAndConditions}
                            data = {ItinerarysJson.termsAndConditions}
                        />
                    </li>
                </ScrollAnimation>
            </ul>
            <div className="itinerarysDetail-lastPart">
                <ScrollAnimation animation={props.data.typeAnimationLastPartHeader} pixelsDisplacement={props.data.pixelsAnimationLastPartHeader} duration={props.data.durationAnimationLastPartHeader} delay={props.data.delayAnimationLastPartHeader}>
                    <div className="itinerarysDetail-lastPart-text">
                        <h2 className="itinerarysDetail-lastPart-text-title">{props.data.titleLastPart}</h2>
                        <h3 className="itinerarysDetail-lastPart-text-subtitle">{props.data.subTitleLastPart}</h3>
                    </div>
                </ScrollAnimation>
                <ScrollAnimation animation={props.data.typeAnimationLastPartButtons} pixelsDisplacement={props.data.pixelsAnimationLastPartButtons} duration={props.data.durationAnimationLastPartButtons} delay={props.data.delayAnimationLastPartButtons}>
                    <div className="itinerarysDetail-lastPart-buttons">
                        {buttonBookElement}
                        <a
                            className="buttonSecondary itinerarysDetail-header-info-buttons-buttonPdf"
                            href={itinerary.pdfHref}
                            download={itinerary.namePdf}
                        >
                            <i className={"itinerarysDetail-header-info-buttons-buttonPdf-icon " + props.data.buttonDownloadPdf.icon} aria-hidden="true"></i>
                            <span>{props.data.buttonDownloadPdf.text}</span>
                        </a>
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    )
}
export default ItinerarysDetail;