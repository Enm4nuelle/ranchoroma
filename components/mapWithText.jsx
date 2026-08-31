import ScrollAnimation from "./scrollAnimation";

export const MapWithText = (props) => {
    return (
        <section
            className={"mapWithText " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}
            aria-label={props.data.title + " Ubicación y mapa de contacto"}
        >
            <ScrollAnimation animation={props.data.typeAnimationText} pixelsDisplacement={props.data.pixelsAnimationText} duration={props.data.durationAnimationText} delay={props.data.delayAnimationText}>
                <div className="mapWithText-text">
                    <h2 className="mapWithText-text-title">
                        {props.data.title}
                    </h2>
                    {
                        props.data.address ? 
                            <address className="mapWithText-text-address">
                                {props.data.address}
                            </address>
                        :
                        ""
                    }
                    <img
                        src={props.data.imgLogo}
                        alt={props.data.altImg}
                        className="mapWithText-text-img"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            </ScrollAnimation>
            <ScrollAnimation animation={props.data.typeAnimationMap} pixelsDisplacement={props.data.pixelsAnimationMap} duration={props.data.durationAnimationMap} delay={props.data.delayAnimationMap}>
                <div className="mapWithText-map">
                    <iframe
                        className="mapWithText-map-iframe"
                        src={props.data.directionMap}
                        allowFullScreen
                        loading="lazy"
                        title={props.data.titleIframe}
                        referrerPolicy="strict-origin-when-cross-origin"
                    ></iframe>
                </div>
            </ScrollAnimation>
        </section>
    )
}
export default MapWithText;