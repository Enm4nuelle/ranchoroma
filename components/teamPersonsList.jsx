import ScrollAnimation from "./scrollAnimation";

const obtenerIniciales = (nombre) => {
    return nombre.trim().split(/\s+/).slice(0, 2).map(p => p[0]).join("").toUpperCase();
};

export const TeamPersonsList = (props) => {
    const intervalAnimationItem = props.data.delayEachAnimationPersons ?? 200;
    let delayAnimationItems = [];
    if(props.data.persons){
        for(let i = 0; i < props.data.persons.length; i++){
            delayAnimationItems.push(intervalAnimationItem * (i + 1));
        }
    }
    return (
        <section className={"teamPersonsList " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                <h2 className="teamPersonsList-title">{props.data.title}</h2>
            </ScrollAnimation>                
            <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                <div className="teamPersonsList-divider" aria-hidden="true"></div>
            </ScrollAnimation>
            <ul className="teamPersonsList-container">
                {
                    props.data.persons?.map((person, index)=>(
                        <ScrollAnimation animation={person.typeAnimation} pixelsDisplacement={person.pixelsAnimation} duration={props.data.durationAnimationPersons} delay={delayAnimationItems[index]} key={person.name + index}>
                            <li
                                className="teamShowCase-people-imgs-person"
                                style={{
                                    alignSelf: person.img ? "" : "start"
                                }}
                            >
                                {
                                    person.img ?
                                    <img
                                        className="teamShowCase-people-imgs-person-img"
                                        alt={"Fotografía de " + person.name + " encargado de: " + person.position}
                                        src={person.img}
                                    />
                                    :
                                    <div className="teamShowCase-people-imgs-person-avatar-container">    
                                        <div className="teamShowCase-people-imgs-person-avatar">
                                            {obtenerIniciales(person.name)}
                                        </div>
                                    </div>
                                }
                                <h3 className="teamShowCase-people-imgs-person-name">
                                    {person.name}
                                </h3>
                                <p className="teamShowCase-people-imgs-person-position">
                                    {person.position}
                                </p>
                            </li>
                        </ScrollAnimation>
                    ))
                }
            </ul>
        </section>
    )
}
export default TeamPersonsList;