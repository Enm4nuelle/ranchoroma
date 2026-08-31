import ScrollAnimation from "./scrollAnimation";

export const ConnectCountries = (props) => {
    const intervalAnimationItem = props.data.delayEachCountryAnimation ?? 0;
    let delayAnimationItems = [];
    if(props.data.countries){
        for(let i = 0; i < props.data.countries.length; i++){
            delayAnimationItems.push(intervalAnimationItem * (i + 1));
        }
    }
    //console.log(delayAnimationItems);
    return (
        <section className={"connectCountries " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                <div className="connectCountries-header">
                    <h2 className="connectCountries-header-title">{props.data.title}</h2>
                    <div className="connectCountries-divider" aria-hidden="true"></div>
                </div>
            </ScrollAnimation>
            <ul className="connectCountries-countries">
                {
                    props.data.countries.map((country, index)=>(
                        <ScrollAnimation animation={country.typeAnimation} pixelsDisplacement={country.pixelsAnimation} duration={props.data.durationAnimationCountries} delay={delayAnimationItems[index]} key={country.title + index}>
                            <li className="connectCountries-countries-item">
                                <div className="connectCountries-countries-item-images">
                                    <img
                                        src={country.imgBackground}
                                        alt={"Ciudad de " + country.title}
                                        loading="lazy"
                                        className="connectCountries-countries-item-images-background"
                                    />
                                    <img
                                        src={country.imgFlag}
                                        alt={"Bandera de " + country.title}
                                        loading="lazy"
                                        className="connectCountries-countries-item-images-flag"
                                    />
                                </div>
                                <div className="connectCountries-countries-item-text">
                                    <h3
                                        className="connectCountries-countries-item-text-title"
                                        style={{
                                            color: (country.colorTitle ?? "")
                                        }}
                                    >
                                        {country.title}
                                    </h3>
                                    <p className="connectCountries-countries-item-text-description">
                                        {country.description}
                                    </p>
                                </div>
                            </li>
                        </ScrollAnimation>
                    ))
                }
            </ul>
        </section>
    )
}
export default ConnectCountries;