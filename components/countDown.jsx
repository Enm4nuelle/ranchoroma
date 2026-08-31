"use client";

import { useEffect, useState } from "react";
import TimeCard from "./timeCard";

export const CountDown = (props) => {
    const [timer, setTimer] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calcTimer = () => {
            const [datePart, timePart] = props.data.releaseDate.split(" ");

            const [day, month, year] = datePart.split("/").map(Number);
            const [hours, minutes, seconds] = timePart.split(":").map(Number);

            const releaseDate = new Date(year, month - 1, day, hours, minutes, seconds);
            const now = new Date();
            const diff = releaseDate.getTime() - now.getTime();

            if (diff <= 0) {
                setTimer({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                });
                return;
            }

            const totalSeconds = Math.floor(diff / 1000);

            const days = Math.floor(totalSeconds / 86400);
            const hoursLeft = Math.floor((totalSeconds % 86400) / 3600);
            const minutesLeft = Math.floor((totalSeconds % 3600) / 60);
            const secondsLeft = totalSeconds % 60;

            setTimer({
                days,
                hours: hoursLeft,
                minutes: minutesLeft,
                seconds: secondsLeft
            });
        };

        calcTimer();

        const interval = setInterval(calcTimer, 1000);

        return () => clearInterval(interval);
    }, [props.data.releaseDate]);

    return (
        <section
            className={"countDown " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}
            style={{
                backgroundImage: props.data.imgBackground
                    ? `url(${props.data.imgBackground})`
                    : ""
            }}
        >
            <img
                src={props.data.imgLogo}
                className="countDown-img"
                alt={props.data.title}
            />

            <h1 className="countDown-title">
                {props.data.title}
            </h1>

            <ul className="countDown-cards">
                <TimeCard value={timer.days} label="Días" />
                <TimeCard value={timer.hours} label="Horas" />
                <TimeCard value={timer.minutes} label="Minutos" />
                <TimeCard value={timer.seconds} label="Segundos" />
            </ul>
        </section>
    );
};

export default CountDown;