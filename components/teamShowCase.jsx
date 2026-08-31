import Link from "next/link";
import ScrollAnimation from "./scrollAnimation";

export const TeamShowCase = (props) => {
    const intervalAnimationItem = props.data.delayEachAnimationPeople ?? 0;
    let delayAnimationItems = [];
    if(props.data.people){
        for(let i = 0; i < props.data.people.length; i++){
            delayAnimationItems.push(intervalAnimationItem * (i + 1));
        }
    }
    return (
        <section
            className={"teamShowCase " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}
            id={props.data.nameId}
        >
            <div className="teamShowCase-container">
                <ScrollAnimation animation={props.data.typeAnimationText} pixelsDisplacement={props.data.pixelsAnimationText} duration={props.data.durationAnimationText} delay={props.data.delayAnimationText}>
                    <div className="teamShowCase-text">
                        <p className="teamShowCase-text-subTitle">
                            {props.data.subTitle}
                        </p>
                        {
                            props.data.isMainH1 ?
                            <h1 className="teamShowCase-text-title">
                                <span className="teamShowCase-text-title-highligh">{props.data.titleHighLigh}</span>{props.data.title}
                            </h1>
                            :
                            <h2 className="teamShowCase-text-title">
                                <span className="teamShowCase-text-title-highligh">{props.data.titleHighLigh}</span>{props.data.title}
                            </h2>
                        }
                        <div className="teamShowCase-text-divider" aria-hidden="true"></div>
                        <p className="teamShowCase-text-description">
                            {props.data.description}
                        </p>
                    </div>
                </ScrollAnimation>
                {
                    props.data.peopleDown ?
                    <ScrollAnimation animation={props.data.typeAnimationImgRight} pixelsDisplacement={props.data.pixelsAnimationImgRight} duration={props.data.durationAnimationImgRight} delay={props.data.delayAnimationImgRight}>
                        <div className="teamShowCase-imgRight">
                            <img
                                className="teamShowCase-imgRight-img"
                                alt={props.data.altImgRight ?? props.data.title}
                                src={props.data.imgRight}
                                loading="lazy"
                            />
                        </div>
                    </ScrollAnimation>
                    :
                    <div className="teamShowCase-people">
                        <ScrollAnimation animation={props.data.typeAnimationLine} pixelsDisplacement={props.data.pixelsAnimationLine} duration={props.data.durationAnimationLine} delay={props.data.delayAnimationLine}>
                            <div className="teamShowCase-people-line" aria-hidden="true"></div>
                        </ScrollAnimation>
                        <ul className="teamShowCase-people-imgs" role="list">
                            {
                                props.data.people?.map((people, index)=>(
                                    <ScrollAnimation animation={people.typeAnimation} pixelsDisplacement={people.pixelsAnimation} duration={props.data.durationAnimationPeople} delay={delayAnimationItems[index]} key={people.name + index}>
                                        <li className="teamShowCase-people-imgs-person" role="listitem">
                                            <img
                                                className="teamShowCase-people-imgs-person-img"
                                                alt={people.name}
                                                src={people.img}
                                            />
                                            <h3 className="teamShowCase-people-imgs-person-name">
                                                {people.name}
                                            </h3>
                                            <p className="teamShowCase-people-imgs-person-position">
                                                {people.position}
                                            </p>
                                            <p className="teamShowCase-people-imgs-person-description">
                                                {people.description} 
                                            </p>
                                        </li>
                                    </ScrollAnimation>
                                ))
                            }
                        </ul>
                        {
                            props.data.buttonMoreInformation ?
                            <ScrollAnimation animation={props.data.typeAnimationButton} pixelsDisplacement={props.data.pixelsAnimationButton} duration={props.data.durationAnimationButton} delay={props.data.delayAnimationButton}>
                                <div className="teamShowCase-people-button">
                                    <Link
                                        className={props.data.buttonMoreInformation.type === "primary" ? "buttonPrimary" : "buttonSecondary"}
                                        href={props.data.buttonMoreInformation.href}
                                    >
                                        {props.data.buttonMoreInformation.text}
                                    </Link>
                                </div>
                            </ScrollAnimation>
                            :
                            ""
                        }
                    </div>
                }
            </div>
        </section>
    )
}
export default TeamShowCase;