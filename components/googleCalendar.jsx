"use client";

import Loading from "./loading";
import { useState } from "react";

export const GoogleCalendar = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <section className={"googleCalendar " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            {
                props.data.isMainH1 ?
                <h1 className="googleCalendar-title">{props.data.title}</h1>
                :
                <h2 className="googleCalendar-title">{props.data.title}</h2>
            }
            <div className="googleCalendar-divider" aria-hidden="true"></div>
            <p className="googleCalendar-subTitle">{props.data.subTitle}</p>
            <div className="googleCalendar-wrapper">
                {isLoading && (
                    <div className="googleCalendar-loader">
                        <Loading
                            color={props.data.colorLoading}
                            loading={isLoading}
                            type = {props.data.typeLoading}
                            size = {80}
                        />
                    </div>
                )}
                <iframe
                    src={props.data.srcCalendar}
                    className="googleCalendar-iframe"
                    scrolling="auto"
                    title={props.data.titleIframe ?? "google calendar"}
                    onLoad={() => setIsLoading(false)}
                ></iframe>
            </div>
        </section>
    )
}
export default GoogleCalendar;