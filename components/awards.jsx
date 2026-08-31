import Link from "next/link";

export const Awards = (props) => {
    return (
        <div
            className={"awards " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}
            style={{
                backgroundImage: props.data.backgroundImg ? `url(${props.data.backgroundImg})` : "none"
            }}
        >
            <h2 className="awards-title">
                {props.data.title}
            </h2>
            <div className="awards-items">
                {
                    props.data.awards.map((award, index)=>(
                        <div className="awards-item" key={index}>
                            <div className="awards-item-img-container">
                                <img
                                    src={award.imgTitle}
                                    alt={award.altImgTitle ?? "premio"}
                                    className="awards-item-img"
                                />
                            </div>
                            <p className="awards-item-text">
                                {award.description}
                            </p>
                            <div className="awards-item-button-container">
                                <Link
                                    href={award.buttonMoreInformation.href}
                                    className={"awards-item-button " + (award.buttonMoreInformation.type === "primary" ? "buttonPrimary" : "buttonSecondary")}
                                >
                                    {award.buttonMoreInformation.text}
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Awards;