import Link from "next/link";
import ScrollAnimation from "./scrollAnimation";

export const ListRooms = (props) => {
    return (
        <section className={"listRooms " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                <div className="listRooms-header">
                    {
                        props.data.isMainH1 ?
                        <h1 className="listRooms-header-title">{props.data.title}</h1>
                        :
                        <h2 className="listRooms-header-title">{props.data.title}</h2>
                    }
                    <div className="listRooms-header-divider" aria-hidden="true"></div>
                    <p className="listRooms-header-description">{props.data.description}</p>
                </div>
            </ScrollAnimation>
            <ul className="listRooms-items">
                {
                    props.data.rooms.map((room, index)=>(
                        <ScrollAnimation animation={props.data.typeAnimationItems[index]} pixelsDisplacement={props.data.pixelsAnimationItems} duration={props.data.durationAnimationItems} delay={props.data.delayAnimationItems} key={room.title + index}>
                            <li className="listRooms-items-item">
                                <div className="listRooms-items-item-img-container">
                                    <img
                                        className="listRooms-items-item-img"
                                        src={room.img}
                                        alt={room.altImg}
                                    />
                                </div>
                                <div className="listRooms-items-item-info">
                                    {
                                        props.data.isMainH1 ?
                                        <h2 className="listRooms-items-item-info-title">{room.title}</h2>
                                        :
                                        <h3 className="listRooms-items-item-info-title">{room.title}</h3>
                                    }
                                    <div className="listRooms-items-item-info-basicInfo">
                                        {
                                            room.sizeM2 ?
                                            <p className="listRooms-items-item-info-basicInfo-m2">{room.sizeM2}</p>
                                            :
                                            ""
                                        }
                                        <p className="listRooms-items-item-info-basicInfo-maxPeople">
                                            {room.maxNumPeople}
                                        </p>
                                    </div>
                                    <div className="listRooms-items-item-info-divider" aria-hidden="true"></div>
                                    <div className="listRooms-items-item-info-features">
                                        {
                                            room.featuredAmenities.map((feature, indexJ) =>(
                                                <p className="listRooms-items-item-info-features-text" key={feature.text + indexJ}>
                                                    <i
                                                        className={
                                                            "listRooms-items-item-info-features-icon " + feature.icon
                                                        }
                                                    ></i>
                                                    {feature.text}
                                                </p>
                                            ))
                                        }
                                    </div>
                                    <div className="listRooms-items-item-info-divider" aria-hidden="true"></div>
                                    <div className="listRooms-items-item-info-buttons">
                                        {
                                            props.data.buttonMoreInfoText ?
                                            <Link
                                                className={"buttonSecondary listRooms-items-item-info-buttons-buttonMoreInfo"}
                                                href={room.href}
                                            >
                                                {props.data.buttonMoreInfoText}
                                            </Link>
                                            :
                                            ""
                                        }
                                        {
                                            props.data.buttonBook ?
                                            <a
                                                className={"buttonPrimary listRooms-items-item-info-buttons-buttonWhatsapp"}
                                                href={
                                                    props.data.buttonBook.hrefDestiny === "whatsapp" ?
                                                    `https://wa.me/${props.data.buttonBook.number}?text=${encodeURIComponent(props.data.buttonBook.messageFirstPart + room.title)}`
                                                    :
                                                    ""
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Contacto Whatsapp"
                                            >
                                                {props.data.buttonBook.text}
                                            </a>
                                            :
                                            ""
                                        }
                                    </div>
                                </div>
                            </li>
                        </ScrollAnimation>
                    ))
                }
            </ul>
        </section>
    )
}
export default ListRooms;