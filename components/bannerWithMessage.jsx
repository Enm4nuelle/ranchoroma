import ScrollAnimation from "./scrollAnimation";

export const BannerWithMessage = (props) => {
    return (
        <section
            className={"bannerWithMessage " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}
            style={{
                backgroundColor: props.data.backgroundColor ?? ""
            }}
        >
            <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                <div className="bannerWithMessage-header">
                    <h2 className="bannerWithMessage-header-title">{props.data.title}</h2>
                    <p className="bannerWithMessage-header-description">{props.data.description}</p>
                </div>
            </ScrollAnimation>
            {
                props.data.buttonContact ?
                <ScrollAnimation animation={props.data.typeAnimationButtonContact} pixelsDisplacement={props.data.pixelsAnimationButtonContact} duration={props.data.durationAnimationButtonContact} delay={props.data.delayAnimationButtonContact}>
                    <div className="bannerWithMessage-buttonContact-container">
                        <a
                            className={"bannerWithMessage-buttonContact " + (props.data.buttonContact.type === "primary" ? "buttonPrimary" : "buttonSecondary")}
                            href={
                                props.data.buttonContact.hrefDestiny === "whatsapp" ?
                                `https://wa.me/${props.data.buttonContact.number}?text=${encodeURIComponent(props.data.buttonContact.defaultMessage)}`
                                :
                                ""
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Contacto Whatsapp"
                        >
                            {props.data.buttonContact.text}
                            <i className={"bannerWithMessage-buttonContact-icon " + props.data.buttonContact.icon}></i>
                        </a>
                    </div>
                </ScrollAnimation>
                :
                ""
            }
        </section>
    )
}
export default BannerWithMessage;