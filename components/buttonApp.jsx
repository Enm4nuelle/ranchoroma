"use client";

import { useState, useEffect } from "react";

export const ButtonApp = (props) => {
    const [url, setUrl] = useState(props.data.urlAndroid);

    useEffect(() => {
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        setUrl(isIOS ? props.data.urlIphone : props.data.urlAndroid);
    }, [props.data.urlIphone, props.data.urlAndroid]);

    return (
        <div className={"buttonApp " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            <h1 className="buttonApp-title">{props.data.title}</h1>
            <i className={"buttonApp-icon " + props.data.iconArrowDown}></i>
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="buttonApp-img-link"
            >
                <img
                    src={props.data.img}
                    alt={props.data.altImg ?? "Logo de App de We Chat"}
                    className="buttonApp-img"
                />
            </a>
        </div>
    )
}
export default ButtonApp;