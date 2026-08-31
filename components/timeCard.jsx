import { useEffect, useState } from "react";

export const TimeCard = ({ value, label }) => {
    const formattedValue = String(value).padStart(2, "0");

    const [currentValue, setCurrentValue] = useState(formattedValue);
    const [nextValue, setNextValue] = useState(formattedValue);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const newValue = String(value).padStart(2, "0");

        if (newValue === currentValue) return;

        setNextValue(newValue);
        setAnimate(true);

        const timeout = setTimeout(() => {
            setCurrentValue(newValue);
            setAnimate(false);
        }, 300);

        return () => clearTimeout(timeout);
    }, [value, currentValue]);

    return (
        <li className="timeCard">
            <div className="timeCard-numberContainer">
                <div
                    className={
                        "timeCard-current " +
                        (animate ? "timeCard-current-leave" : "")
                    }
                >
                    {currentValue}
                </div>

                <div
                    className={
                        "timeCard-next " +
                        (animate ? "timeCard-next-enter" : "")
                    }
                >
                    {nextValue}
                </div>
            </div>

            <p className="timeCard-label">
                {label}
            </p>
        </li>
    );
};

export default TimeCard;