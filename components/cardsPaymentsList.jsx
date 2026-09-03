import React from "react";

export const CardsPaymentsList = (props) => {
    const showModal = (bank, index) => {
        
    }
    return (
        <section className={"cardsPaymentsList " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            <div className="cardsPaymentsList-container">
                <div className="cardsPaymentsList-text">
                    <p className="cardsPaymentsList-text-subTitle">
                        {props.data.subTitle}
                    </p>
                    <h2 className="cardsPaymentsList-text-title">
                        {props.data.title}
                    </h2>
                    <div className="cardsPaymentsList-text-divider" aria-hidden="true"></div>
                </div>
                <ul className="cardsPaymentsList-cards">
                    {
                        props.data.banks?.map((bank, index)=>(
                            <li key={index} className="cardsPaymentsList-cards-item">
                                <button
                                    className="cardsPaymentsList-cards-item"
                                    style={{
                                        backgroundColor: bank.backgroundColor
                                    }}
                                    onClick={showModal(bank, index)}
                                >
                                    <div className="cardsPaymentsList-cards-item-img-container">
                                        <img
                                            className="cardsPaymentsList-cards-item-img"
                                            src={bank.img}
                                            alt={bank.altImg ?? "Logo de banco"}
                                        />
                                    </div>
                                    <div className="cardsPaymentsList-cards-item-text">
                                        {
                                            bank.features?.map((feat, indexJ) => {
                                                const isLast = indexJ === bank.features.length - 1;

                                                let content = null;

                                                switch (feat.type) {
                                                    case "normalText":
                                                        content = (
                                                            <p className="cardsPaymentsList-cards-item-text-normalText">
                                                                {feat.text}
                                                            </p>
                                                        );
                                                        break;

                                                    case "highlightNumber":
                                                        content = (
                                                            <div>
                                                                <p className="cardsPaymentsList-cards-item-text-regularText">{feat.firstText}</p>
                                                                <p className="cardsPaymentsList-cards-item-text-highlightText">{feat.number}</p>
                                                                <p className="cardsPaymentsList-cards-item-text-regularText">{feat.secondText}</p>
                                                            </div>
                                                        );
                                                        break;

                                                    case "smallText":
                                                        content = (
                                                            <div>
                                                                <p className="cardsPaymentsList-cards-item-text-smallText">{feat.text}</p>
                                                            </div>
                                                        );
                                                        break;

                                                    default:
                                                        return null;
                                                }

                                                return (
                                                    <React.Fragment key={indexJ}>
                                                        {content}
                                                        {bank.features.length > 1 && !isLast && (
                                                            <div className="cardsPaymentsList-cards-item-text-smallText-divider" aria-hidden="true"></div>
                                                        )}
                                                    </React.Fragment>
                                                );
                                            })
                                        }
                                    </div>
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    )
}
export default CardsPaymentsList;