import ScrollAnimation from "./scrollAnimation";

export const OurCompanies = (props) => {
    const intervalAnimationItem = props.data.delayEachAnimationCompany ?? 0;
    let delayAnimationItems = [];
    if(props.data.companies){
        for(let i = 0; i < props.data.companies.length; i++){
            delayAnimationItems.push(intervalAnimationItem * (i + 1));
        }
    }
    return (
        <section
            className={"ourCompanies " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}
            id={props.data.nameId}
            aria-label={props.data.title ?? "Nuestras empresas asociadas"}
        >
            <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                <div className="ourCompanies-text">
                    <p className="ourCompanies-text-subTitle">
                        {props.data.subTitle}
                    </p>
                    <h2 className="ourCompanies-text-title">
                        {props.data.title}
                    </h2>
                    <div className="ourCompanies-text-divider" aria-hidden="true"></div>
                </div>
            </ScrollAnimation>
            <ul className="ourCompanies-companies">
                {props.data.companies?.map((company, index) => {
                    const fullTitle = company.title || `${company.titlePart1 || ''} ${company.titlePart2 || ''}`.trim();
                    return (
                        <ScrollAnimation animation={company.typeAnimation} pixelsDisplacement={company.pixelsAnimation} duration={props.data.durationAnimationCompany} delay={delayAnimationItems[index]} key={company.titlePart1 + index}>
                            <li className="ourCompanies-companies-item">
                                {
                                    company.img && (
                                        <img
                                            src={company.img}
                                            alt={company.altImg ?? ("Servicios y cobertura de " + fullTitle)}
                                            className="ourCompanies-companies-item-bg"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    )
                                }

                                <div className="ourCompanies-companies-item-content">
                                    <div className="ourCompanies-companies-item-text">
                                        <h3 className="ourCompanies-companies-item-text-title">
                                            {fullTitle}
                                        </h3>
                                        <div className="ourCompanies-companies-item-text-divider" aria-hidden="true"></div>
                                    </div>

                                    <div className="ourCompanies-companies-item-information">
                                        {company.price && (
                                            <div className="ourCompanies-companies-item-information-price">
                                                <p>{company.price}</p>
                                            </div>
                                        )}

                                        <a
                                            href={company.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="ourCompanies-companies-item-information-button"
                                            aria-label={`Visitar sitio de ${fullTitle}`}
                                        >
                                            {company.buttonText}
                                        </a>
                                    </div>
                                    <div className="ourCompanies-companies-item-lowPart">
                                        <p>{company.lowText}</p>
                                    </div>
                                </div>
                            </li>
                        </ScrollAnimation>
                    );
                })}
            </ul>
        </section>
    )
}
export default OurCompanies;